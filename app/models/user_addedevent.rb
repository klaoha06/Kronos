class UserAddedevent < ActiveRecord::Base
  belongs_to :user
  belongs_to :addedevent, :class_name => "Event"
end
