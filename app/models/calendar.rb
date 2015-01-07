class Calendar < ActiveRecord::Base
	validates :name, presence: true
	has_and_belongs_to_many :events
  belongs_to :creator, :class_name => "User"
  has_many :events
  has_many :user_addedcalendars, :foreign_key => "calendar_id"
  has_many :users, :through => :user_addedcalendars
  has_many :calendar_tags
  has_many :tags, :through => :calendar_tags
  has_many :calendar_groups
  has_many :groups, :through => :calendar_groups
end
