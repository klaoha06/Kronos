class Api::V0::UsersController < Api::V0::ApplicationController
	before_action :authenticate, :except => ['sessioning_user']

	def sessioning_user
	  user = User.find_by(fb_id: params[:fb_id])
	  if user
	    user.auth.destroy! if user.auth
	    user.update(name: params[:name], first_name: params[:first_name], last_name: params[:last_name], gender: params[:gender], email: params[:email], profile_pic: params[:profilePic])
	    user.save
	  else
	    user = User.new(name: params[:name], first_name: params[:first_name], last_name: params[:last_name], gender: params[:gender], default_time_zone: params[:timezone], email: params[:email], profile_pic: params[:profilePic], fb_id: params[:fb_id])
	    user.save
	  end

	  Auth.create(user_id: user.id, access_token: request.headers['HTTP_ACCESS_TOKEN'], fb_id: params[:fb_id])
	  render json: user.id
	end

	def clear_session
		auth = Auth.find_by(access_token: request.headers["HTTP_ACCESS_TOKEN"])
		auth.destroy!
	end

	def subscriptions
		user = User.find(params[:user_id])
		render json: user.groups
	end

end

