class Api::V0::UsersController < Api::V0::ApplicationController
	before_action :current_user

	def subscriptions
		render json: @current_user.groups
	end	

	private
	
	def current_user
		#For now just hardcoding the first user as the one 
		#loggedin until we are correctly authenticating
		@current_user = User.first
	end
end

