class Tag < ActiveRecord::Base
  has_many :calendar_tags
  has_many :calendars, :through => :calendar_tags
end
