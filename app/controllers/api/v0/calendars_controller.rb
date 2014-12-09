class Api::V0::CalendarsController < Api::V0::ApplicationController
	before_filter :find_calendar

	def show
		render json: @calendar
	end

	def find_calendar
		@calendar = Calendar.find(params[:id])
	end

end
