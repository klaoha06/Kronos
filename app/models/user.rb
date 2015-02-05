class User < ActiveRecord::Base
  validates :fb_id, presence: true
  has_one :auth, dependent: :destroy
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

  def get_future_events
    # find current_user's followings
    # retrieve all events created by followings
    followings = self.following.map { |user| user.id }

    Event.where("start >= ?", Time.now).order(:start).map do |event|
      if (followings.include?(event.creator_id))
        user = User.find(event.creator_id)
        { :eventInfo => event, :creatorInfo => user }
      else
        next
      end
    end.compact
  end

  def get_past_events
    followings = self.following.map { |user| user.id }

    Event.where("start < ?", Time.now).order(:start).map do |event|
      if (followings.include?(event.creator_id))
        user = User.find(event.creator_id)
        { :eventInfo => event, :creatorInfo => user }
      else
        next
      end
    end.compact
  end
end
