class User < ActiveRecord::Base
	validates :fb_id, presence: true
	has_one :auth
  has_many :calendars, :foreign_key => "creator_id"
  has_many :user_addedcalendars, :foreign_key => "user_id"
  has_many :addedcalendars, :class_name => "Calendar", :through => :user_addedcalendars
  has_many :events, :foreign_key => "creator_id"
  has_many :user_addedevents, :foreign_key => "user_id"
  has_many :addedevents, :through => :user_addedevents
  has_many :user_groups, :foreign_key => "user_id"
  has_many :groups, :class_name => "Group", :through => :user_groups 

  has_many :active_follows, :class_name => 'Follow', :foreign_key => 'follower_id'
  has_many :passive_follows, :class_name => 'Follow', :foreign_key => 'following_id'
  has_many :followers, :through => :passive_follows
  has_many :following, :through => :active_follows, :source => :following

  after_create :create_default_cal

  def create_default_cal
    self.calendars.create(name: 'Main Calendar', main_cal: true)
  end
end
