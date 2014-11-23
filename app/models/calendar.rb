class Calendar < ActiveRecord::Base
  belongs_to :creator, :class_name => "User"
  has_many :events
  has_many :user_addedcalendars, :foreign_key => "addedcalendar_id"
  has_many :users, :through => :user_addedcalendars
  has_many :calendar_tags
  has_many :tags, :through => :calendar_tags
end
