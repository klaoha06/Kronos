class Event < ActiveRecord::Base
  belongs_to :creator, :class_name => "User"
  has_many :user_addedevents, :foreign_key => "event_id"
  has_many :users, :through => :user_addedevents
end
