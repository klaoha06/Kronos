class Api::V0::ApplicationController < ActionController::API

	def popular
        render json: Group.select("groups.*, COUNT(users.id) AS users_count").joins(:users).group("groups.id").order("users_count DESC").limit(5)
	end

end
