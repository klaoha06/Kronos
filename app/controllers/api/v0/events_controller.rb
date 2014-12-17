class Api::V0::EventsController < Api::V0::ApplicationController
  before_action :authenticate
  # GET /events
  # GET /events.json
  def index
    @events = Event.all

    render json: @events
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])

    render json: @event
  end

  # POST /events
  # POST /events.json
  def create
    
  end

  def create_from_provider
    if params[:provider] == 'FB'
      external_uri = 'www.facebook.com/events/'
    end
    params['events_data'].each do |event_data|
      event = Event.find_by(provider: params[:provider], id_from_provider: event_data['id'], creator_id: params[:user_id])
      if event
        event.update(name: event_data['name'], start_time: event_data['start_time'], end_time: event_data['end_time'], location: event_data['location'], time_zone: event_data['timezone'], cover_pic: event_data['cover']['source'], owner_name: event_data['owner']['name'], owner_id: event_data['owner']['id'], description: event_data['description'], my_status: event_data['rsvp_status'], external_uri: (external_uri + event_data['id']))
      else
        event = Event.new(creator_id: params[:user_id], provider: params[:provider], id_from_provider: event_data['id'], name: event_data['name'], start_time: event_data['start_time'], end_time: event_data['end_time'], location: event_data['location'], time_zone: event_data['timezone'], cover_pic: event_data['cover']['source'], owner_name: event_data['owner']['name'], owner_id: event_data['owner']['id'], description: event_data['description'], my_status: event_data['rsvp_status'], external_uri: (external_uri + event_data['id']))
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
