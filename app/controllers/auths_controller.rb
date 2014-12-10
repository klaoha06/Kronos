class AuthsController < ApplicationController
  # GET /auths
  # GET /auths.json
  def index
    @auths = Auth.all

    render json: @auths
  end

  # GET /auths/1
  # GET /auths/1.json
  def show
    @auth = Auth.find(params[:id])

    render json: @auth
  end

  # POST /auths
  # POST /auths.json
  def create
    @auth = Auth.new(auth_params)

    if @auth.save
      render json: @auth, status: :created, location: @auth
    else
      render json: @auth.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /auths/1
  # PATCH/PUT /auths/1.json
  def update
    @auth = Auth.find(params[:id])

    if @auth.update(auth_params)
      head :no_content
    else
      render json: @auth.errors, status: :unprocessable_entity
    end
  end

  # DELETE /auths/1
  # DELETE /auths/1.json
  def destroy
    @auth = Auth.find(params[:id])
    @auth.destroy

    head :no_content
  end

  private
    
    def auth_params
      params[:auth]
    end
end
