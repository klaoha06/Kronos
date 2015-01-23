class Follow < ActiveRecord::Base
	belongs_to :following, :class_name => 'User'
	belongs_to :follower, :class_name => 'User'
	validates :follower_id, presence: true
	validates :following_id, presence: true
	validate :cannot_add_self

	private

  def cannot_add_self
    errors.add(:follower_id, 'You cannot add yourself as a friend.') if follower_id == following_id
  end
end
