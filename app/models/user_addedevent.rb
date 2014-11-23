class UserAddedevent < ActiveRecord::Base
  belongs_to :user
  belongs_to :event, :class_name => "Event"
end
