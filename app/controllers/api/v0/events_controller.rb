class Api::V0::EventsController < Api::V0::ApplicationController
  before_action :authenticate, only: [:create, :update]

  # Need to check if the calendar is created by the user
  # if it is then the user is the owner or the creator and he/she can see and edit all the events from that calendar

  
  # if not the owner then is it shared?
  # if it is shared then the user can see but can't edit


  # Need to check if each event in that calendar are created by the owner if so get all user's event in that calendar
  # Then check for events that is not the user's but shared in that calendar

  # GET /events
  # GET /events.json
  def index
    # For now just returning all events in the future and all events in the past
    # We will need to fix this so that only events that this particular user should
    # see actually show up. 
    futureEvents = []
    Event.where("start >= ?", Time.now).order(:start).each do |event|
      user = User.find(event.creator_id)
      futureEvents.push({:eventInfo => event, :creatorInfo => user})
    end
    pastEvents = []
    Event.where("start < ?", Time.now).order(:start).each do |event|
      user = User.find(event.creator_id)
      pastEvents.push({:eventInfo => event, :creatorInfo => user})
    end
    render json: {futureEvents: futureEvents, pastEvents: pastEvents}
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def show_events_by_cal_id
    user_id = Auth.find_by(access_token: request.headers['HTTP_ACCESS_TOKEN']).user_id
    calendar = Calendar.find(params[:id])
    if calendar.creator_id == user_id # if user is the owner of the calendar..
      events = calendar.events
      render json: events
    else # if user is not the owner of the cal
      events = calendar.events.where("creator_id = ? OR share = ?", user_id, true)
      render json: events
    end
  end

  # POST /events
  # POST /events.json
  def create
    params.permit!
    user_id = Auth.find_by(access_token: request.headers['HTTP_ACCESS_TOKEN']).user_id
    event = Event.new(event_params)
    event.creator_id = user_id
    if event.save
      CalendarEvent.create(calendar_id: params[:calendar_id], event_id: event.id)
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def create_from_provider
    if params[:provider] == 'FB'
      fb_base_url = 'www.facebook.com/events/'
    end
    params['events_data'].each do |event_data|
      event = Event.find_by(provider: params[:provider], 
        id_from_provider: event_data['id'], 
        creator_id: params[:user_id])
      if event
        event.update(title: event_data['name'], 
          start: event_data['start_time'], 
          end: event_data['end_time'], 
          location: event_data['location'], 
          time_zone: event_data['timezone'], 
          cover_pic: event_data['cover']['source'], 
          owner_name: event_data['owner']['name'], 
          owner_id: event_data['owner']['id'], 
          description: event_data['description'], 
          my_status: event_data['rsvp_status'], 
          external_uri: (fb_base_url + event_data['id']))
      else
        event = Event.new(
          creator_id: params[:user_id], 
          provider: params[:provider], 
          id_from_provider: event_data['id'], 
          title: event_data['name'], 
          start: event_data['start_time'], 
          end: event_data['end_time'], 
          location: event_data['location'], 
          time_zone: event_data['timezone'], 
          cover_pic: event_data['cover']['source'], 
          owner_name: event_data['owner']['name'], 
          owner_id: event_data['owner']['id'], 
          description: event_data['description'], 
          my_status: event_data['rsvp_status'], 
          external_uri: (fb_base_url + event_data['id']))
      end
      if event.save
        # render json: event, status: :created, location: event
      else
        render json: event.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      head :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    head :no_content
  end

  private
    
    def event_params
      params[:event]
    end
end
