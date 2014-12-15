class Api::V0::ApplicationController < ActionController::API

	def popular
        render json: Group.select("groups.*, COUNT(users.id) AS users_count").joins(:users).group("groups.id").order("users_count DESC").limit(5)
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
