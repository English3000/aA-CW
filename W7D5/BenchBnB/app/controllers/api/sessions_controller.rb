class Api::SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def destroy
    render status: 404 unless logged_in?
    logout
    render json: {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

    if @user
      login(@user)
      render json: @user
    else
      render json: ["Invalid login credentials"], status: 422
    end
  end
end
