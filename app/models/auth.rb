class Auth < ActiveRecord::Base
	validates :fb_id, :access_token, :user_id, presence: true
	belongs_to :user
end
