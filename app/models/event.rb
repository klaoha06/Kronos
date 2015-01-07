class Event < ActiveRecord::Base
	has_and_belongs_to_many :calendars
  belongs_to :creator, :class_name => "User"
  has_many :user_addedevents, :foreign_key => "event_id"
  has_many :users, :through => :user_addedevents
end
