class UsersController < ApplicationController
  def create
    @new_user = User.new(user_params) #.new b/c .create would throw error
    # debugger
    if @new_user.save
      #login
      session[:session_token] = @new_user.session_token
      redirect_to user_url(@new_user) #makes new request, forgets @user
      #^-for consistency
      # @user = @new_user
      # render :show
    else
      flash[:errors] = @new_user.errors.full_messages
      redirect_to new_session_url
    end
  end

  def show
    if current_user.nil?
      render json: "Invalid URL."
    else
      render :show
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
