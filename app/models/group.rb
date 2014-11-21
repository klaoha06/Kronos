class Group < ActiveRecord::Base
  has_many :calendar_groups
  has_many :calendars, :through => :calendar_groups
end
