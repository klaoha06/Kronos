class Api::V0::ApplicationController < ActionController::API
	def popular
		render json: [{name: "popular_list_1"}]
	end
end
