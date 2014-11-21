class Calendar < ActiveRecord::Base
  belongs_to :creator, :class_name => "User"
  has_many :events
  has_many :user_subscriptions, :foreign_key => "subscription_id"
  has_many :subscribers, :class_name => "User", :through => :user_subscriptions
  has_many :calendar_tags
  has_many :tags, :through => :calendar_tags
end
