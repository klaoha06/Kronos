class Api::V0::CalendarsController < Api::V0::ApplicationController
  # before_action :authenticate

  def show
    @calendar = Calendar.find(params[:id])
    render json: @calendar
  end

  def create
    params.permit!
    user_id = request.headers['HTTP_USER_ID']
    calendar = Calendar.new(calendar_params)
    calendar.creator_id = user_id
    if calendar.save
      render json: calendar
    else
      render json: calendar.errors, status: :unprocessable_entity
    end
  end

  private

  def calendar_params
    params[:calendar]
  end
end
