class Api::V0::UsersController < Api::V0::ApplicationController
	before_action :authenticate, :except => ['sessioning_user']

	def sessioning_user
	  params.permit!
	  user = User.find_by(fb_id: params[:fb_id])
	  if user
	    user.update(name: params[:name], email: params[:email], profile_pic: params[:profilePic])
	    user.auth.destroy! if user.auth
	    user.save
	  else
	    user = User.new(name: params[:name], email: params[:email], profile_pic: params[:profilePic], fb_id: params[:fb_id])
	    user.save
	  end

	  Auth.create(user_id: user.id, access_token: request.headers['HTTP_ACCESS_TOKEN'], fb_id: params[:fb_id])

	  render json: user.id
	end

	def clear_session
		auth = Auth.find_by(access_token: request.headers["HTTP_ACCESS_TOKEN"])
		auth.destroy!
		# render text: "logout successful!"
	end

	def subscriptions
		render json: @current_user.groups
	end

	private

	def authenticate
		auth = Auth.find_by(access_token: request.headers['HTTP_ACCESS_TOKEN'])
		if auth
			if (Time.now - auth.created_at < 11000)
				# User In Session
				return true
			else
				# Session Time Out
				auth.destroy!
				head status: 408
				return false
			end
		else
			# Not found
			head status: 404
			return false
		end
	end

end

