class Event < ActiveRecord::Base
	validates :creator_id, :start, presence: true
	has_many :calendar_events
	has_many :calendars, through: :calendar_events
  belongs_to :creator, :class_name => "User"
  has_many :user_addedevents, :foreign_key => "addedevent_id"
  has_many :users, :through => :user_addedevents
end
