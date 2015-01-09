class Calendar < ActiveRecord::Base
	has_many :calendar_events
	has_many :events, through: :calendar_events
	validates :name, presence: true
  belongs_to :creator, :class_name => "User"
  has_many :user_addedcalendars, :foreign_key => "calendar_id"
  has_many :users, :through => :user_addedcalendars
  has_many :calendar_tags
  has_many :tags, :through => :calendar_tags
  has_many :calendar_groups
  has_many :groups, :through => :calendar_groups
end
