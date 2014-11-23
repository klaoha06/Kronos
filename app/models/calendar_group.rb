class CalendarGroup < ActiveRecord::Base
  belongs_to :calendar
  belongs_to :group
end
