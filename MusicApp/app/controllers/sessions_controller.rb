class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    # debugger
    @user = User.find_by_credentials(params[:user][:email],
                                      params[:user][:password]) #if doesn't find User, returns nil
    if @user.nil?
      flash[:errors] = ["Incorrect email or password."]
      render :new #with errors
    else
      #login
      session[:session_token] = @user.session_token
      redirect_to user_url(@user) #makes a #show request
    end
  end

  def destroy
    current_user.end_session!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
