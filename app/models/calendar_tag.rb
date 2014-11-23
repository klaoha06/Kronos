class CalendarTag < ActiveRecord::Base
  belongs_to :calendar
  belongs_to :tag
end
