class User < ActiveRecord::Base
  has_many :calendars, :foreign_key => "creator_id"
  has_many :user_addedcalendars
  has_many :addedcalendars, :through => :user_addedcalendars
  has_many :events, :foreign_key => "creator_id"
  has_many :user_addedevents
  has_many :addedevents, :through => :user_addedevents
end
