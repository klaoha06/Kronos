class Api::V0::UsersController < Api::V0::ApplicationController
	# before_action :authenticate

	def sessioning_user
	  params.permit!
	  p params
	  access_token = request.headers["access_token"]
	  p access_token
	  user = User.find_by(fb_id: params[:fb_id])
	  if user
	    user.update(name: params[:name], email: params[:email], profile_pic: params[:profilePic])
	    user.auth.destroy
	    user.save
	  else
	    user = User.create(name: params[:name], email: params[:email], profile_pic: params[:profilePic], fb_id: params[:userId])
	  end

	  user.auth.create(access_token: access_token, fb_id: params[:fb_id])

	  p user
	  p user.auth

	  render json: user.id
	end

	def authenticate(access_token)
		# Check for access_token
		user = User.auth.find_by(access_token: access_token)

		if user
			if (Time.now - user.auth.updated_at < 11000)
				# User In Session
				return true
			else
				# Session Time Out
				user.auth.destroy
				return false
			end
		else
			# Not found
			return false
		end

	end

	def subscriptions
		if self.current_user
		render json: @current_user.groups
		end
	end

	def clear_session
		access_token = request.headers["access_token"]
		user = User.auth.find_by(access_token: access_token)
		user.auth.destroy
	end
	
end

