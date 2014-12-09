class Api::V0::GroupsController < Api::V0::ApplicationController
	before_filter :find_group

	def show
		render json: {name: @group.name, calendars: @group.calendars}
	end

	def find_group
		@group = Group.find(params[:id])
	end

end
