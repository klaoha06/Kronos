require 'rails_helper'

RSpec.describe User, :type => :model do
  before :each do
    @current_user = create(:user_with_calendars)
    @followee = create(:user_with_calendars)
    @event_future = create(:event_future, creator_id: @followee.id)
    @event_past = create(:event_past, creator_id: @followee.id)

    @followee.calendars.first.events << @event_future
    @followee.calendars.first.events << @event_past

    @current_user.following << @followee
  end

  describe '#get_future_events' do
    it "should return all future events for calendar user is following" do
      formatted_future_event = { eventInfo: @event_future, creatorInfo: @followee }
      expect(@current_user.get_future_events).to include formatted_future_event
    end
  end

  describe '#get_past_events' do
    it "should return all past events for calendar user is following" do
      formatted_past_event = { eventInfo: @event_past, creatorInfo: @followee }
      expect(@current_user.get_past_events).to include formatted_past_event
    end
  end
end
