class Api::V0::UsersController < Api::V0::ApplicationController
	before_action :authenticate, :except => ['sessioning_user', 'user']

	def sessioning_user
	  user = User.find_by(fb_id: params[:fb_id])
	  if user
	    user.auth.destroy! if user.auth
	    user.update(
	    	name: params[:name], 
	    	first_name: params[:first_name], 
	    	last_name: params[:last_name], 
	    	birthday: params[:birthday], 
	    	age_range: params[:age_range], 
	    	default_time_zone: params[:timezone], 
	    	gender: params[:gender], 
	    	email: params[:email], 
	    	profile_pic: params[:profilePic]
	    	)
	  else
	    user = User.new(
	    	name: params[:name], 
	    	first_name: params[:first_name], 
	    	last_name: params[:last_name], 
	    	gender: params[:gender], 
	    	birthday: params[:birthday], 
	    	age_range: params[:age_range], 
	    	default_time_zone: params[:timezone], 
	    	email: params[:email], 
	    	profile_pic: params[:profilePic], 
	    	fb_id: params[:fb_id]
	    	)
	  end

	  if user.save
	  	Auth.create(user_id: user.id, access_token: request.headers['HTTP_ACCESS_TOKEN'], fb_id: params[:fb_id])
	  	render json: user.id
	  else
	  	render json: user.errors, status: :unprocessable_entity
	  end

	end

	def show
		user = User.find(params[:id].to_i)
		render json: user
	end

	def show_user_cals
		calendars = Calendar.where(creator_id: request.headers["HTTP_USER_ID"]);
		render json: calendars
	end

	def clear_session
		auth = Auth.find_by(access_token: request.headers["HTTP_ACCESS_TOKEN"])
		if auth
		auth.destroy!
		end
	end



end

