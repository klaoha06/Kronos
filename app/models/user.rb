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

  after_create :create_default_cal

  def create_default_cal
    self.calendars.create(name: 'Main')
  end
end
