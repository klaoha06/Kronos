class Group < ActiveRecord::Base
  has_many :calendar_groups
  has_many :calendars, :through => :calendar_groups

  has_many :user_groups, :foreign_key => "group_id"
  has_many :users, :class_name => "User", :through => :user_groups
end
