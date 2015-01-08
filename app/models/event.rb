class Event < ActiveRecord::Base
	has_many :calendar_events
	has_many :calendars, through: :calendar_events
  belongs_to :creator, :class_name => "User"
  has_many :user_addedevents, :foreign_key => "event_id"
  has_many :users, :through => :user_addedevents
end
