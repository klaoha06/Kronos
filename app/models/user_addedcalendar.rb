class UserAddedcalendar < ActiveRecord::Base
  belongs_to :user
  belongs_to :addedcalendar, :class_name => "Calendar"
end
