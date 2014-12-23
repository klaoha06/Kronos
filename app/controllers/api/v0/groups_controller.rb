class Api::V0::GroupsController < Api::V0::ApplicationController
	before_filter :find_group, :except => [:popular, :index]
	before_filter :authenticate, :only => [:index, :unsubscribe_group]

	def show
		render json: {name: @group.name, calendars: @group.calendars}
	end

	def find_group
		@group = Group.find(params[:id])
	end

	def popular
        render json: Group.select("groups.*, COUNT(users.id) AS users_count").joins(:users).group("groups.id").order("users_count DESC").limit(5)
	end

	def index
		render json: Group.joins(:user_groups).where(:user_groups => {user_id: params[:user_id]})
	end


	def unsubscribe_group
		UserGroup.find_by(:group_id => params[:group_id], :user_id => params[:user_id]).destroy
	end
end
