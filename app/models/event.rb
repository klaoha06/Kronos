class Event < ActiveRecord::Base
  belongs_to :creator, :class_name => "User"
  has_many :user_events
  has_many :attendees, :class_name => "User", :through => :user_events
end
