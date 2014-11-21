class User < ActiveRecord::Base
  has_many :calendars, :foreign_key => "creator_id"
  has_many :user_subscriptions, :foreign_key => "subscriber_id"
  has_many :subscriptions, :class_name => "Calendar", :through => :user_subscriptions
  has_many :events, :foreign_key => "creator_id"
  has_many :user_events
  has_many :invites, :through => :user_events, :foreign_key => "attendee_id"
end
