class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      # redirect_to subs_url
    else
      flash[:errors] = ["Invalid login credentials."]
      # render :new
    end
    redirect_to subs_url
  end

  def destroy
    logout!
    redirect_to subs_url
    # redirect_to new_session_url
  end
end