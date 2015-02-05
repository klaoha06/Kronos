require 'rails_helper'

RSpec.describe Api::V0::EventsController do
  describe '#index' do
    it 'sets future and past events' do
      future_events = ["future event"]
      past_events = ["past event"]
      allow(controller).to receive(:get_future_events).and_return(future_events)
      allow(controller).to receive(:get_past_events).and_return(past_events)
      response_json = { futureEvents: future_events, pastEvents: past_events }

      get :index, user_id: 1
      expect(response.body).to eq(response_json.to_json)
    end
  end

  describe '#show' do
    it 'sets event based on id' do
      event = Event.create(creator_id: 1, start: Time.now)
      get :show, id: event.id
      expect(assigns(:event)).to eq(event)
    end
  end

  describe '#get_x_events' do
    before :each do
      @current_user = create(:user_with_calendars)
      @followee = create(:user_with_calendars)
      @event_future = create(:event_future, creator_id: @followee.id)
      @event_past = create(:event_past, creator_id: @followee.id)

      @followee.calendars.first.events << @event_future
      @followee.calendars.first.events << @event_past
      @current_user.following << @followee
      allow(User).to receive(:find_by_id).and_return(@current_user)
    end

    context 'future events' do
      it 'returns events that start after current time' do
        response = [{ :eventInfo => @event_future, :creatorInfo => @followee }]
        expect(controller.send(:get_future_events)).to eq(response)
      end
    end

    context 'past events' do
      it 'returns events that already started' do
        response = [{ :eventInfo => @event_past, :creatorInfo => @followee }]
        expect(controller.send(:get_past_events)).to eq(response)
      end
    end
  end

  describe '#destroy' do
    it 'destroys the event specified by id' do
      event = Event.create(creator_id: 1, start: Time.now)
      expect { post :destroy, id: event.id }.to change { Event.count }.by(-1)
    end
  end
end
