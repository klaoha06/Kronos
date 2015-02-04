require 'rails_helper'

RSpec.describe User, :type => :model do
  describe '#get_future_events' do
    it "should return all future events for calendar user is following" do
      p User.create(username: "hadchi", name: "haha", fb_id: "fb_id");
      p User.first
    end
  end

  describe '#get_past_events' do
    it "should return all past events for calendar user is following" do
    end
  end
end
