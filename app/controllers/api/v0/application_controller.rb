class Api::V0::ApplicationController < ActionController::API

	private

	def authenticate
		auth = Auth.find_by(access_token: request.headers['HTTP_ACCESS_TOKEN'])
		if auth
			if (Time.now - auth.created_at < 11000)
				# User In Session
				return true
			else
				# Session Time Out
				p '---' * 20
				p 'Session Time Out!!'
				p '---' * 20
				auth.destroy!
				head status: 408
				return false
			end
		else
			# Not found
			p '---' * 20
			p 'Auth Key Not Found!!'
			p '---' * 20
			head status: 404
			return false
		end
	end

end
