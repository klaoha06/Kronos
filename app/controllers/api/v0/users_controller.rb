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
		user = User.find(params[:id])
		current_is_follower = Follow.where(:follower_id => @current_user.id, :following_id => user.id).empty? ? false : true
		follows_current = Follow.where(:follower_id => user.id, :following_id => @current_user.id).empty? ? false : true
		render json: {:user => user, :friendship => {following: current_is_follower, follower: follows_current}}
	end

	def show_user_cals
		user_cals = []
		user_id = Auth.find_by(access_token: request.headers['HTTP_ACCESS_TOKEN']).user_id
		calendars = Calendar.where(creator_id: user_id);
		calendars.each do |cal|
			events = cal.events.where("creator_id = ? OR share = ?", user_id, true)
			user_cals.push({:cal => cal, :events => events})
		end
		render json: user_cals
	end

	def clear_session
		auth = Auth.find_by(access_token: request.headers["HTTP_ACCESS_TOKEN"])
		if auth
		auth.destroy!
		end
	end

	def friendships
		user = User.find(params[:id])
		render json: {followers: user.followers, following: user.following}
	end

	def unfollow
		follow = Follow.find_by(follower_id: @current_user.id, following_id: params[:id])
		follow.destroy! if follow
		render json: User.find(params[:id])
	end

	def follow
		follow = Follow.create(follower_id: @current_user.id, following_id: params[:id])
		render json: follow ? follow : 'error' 
	end

end

