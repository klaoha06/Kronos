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
    let(:user) { User.create(fb_id: 1) }
    let(:future_event) { Event.create(creator_id: 1, start: Time.new(Time.now.year + 1)) }
    let(:past_event) { Event.create(creator_id: 1, start: Time.new(Time.now.year - 1)) }

    context 'future events' do
      it 'returns events that start after current time' do
        expect(User).to receive(:find).and_return(user)
        response = [{ :eventInfo => future_event, :creatorInfo => user }]
        expect(controller.send(:get_future_events)).to eq(response)
      end
    end

    context 'past events' do
      it 'returns events that already started' do
        expect(User).to receive(:find).and_return(user)
        response = [{ :eventInfo => past_event, :creatorInfo => user }]
        expect(controller.send(:get_past_events)).to eq(response)
      end
    end
  end

  describe '#destroy' do
    it 'destroys the event specified by id' do
      event = Event.create(creator_id: 1, start: Time.now)
      expect(Event).to receive(:find).and_return(event)
      expect { post :destroy, id: 1 }.to change { Event.count }.by(-1)
    end
  end
end
