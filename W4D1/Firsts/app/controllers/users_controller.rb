class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
    # render plain: "I'm in the index action!"
  end

  def create
    # render json: params
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end

    # user.save!
    # render json: user
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render json: @user
    else
      render json: "User not found "
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && @user.update_attributes(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user && @user.destroy
      render json: @user
    else
      render json: "can't"
    end
  end

  private
  def user_params
    params.require(:user).permit(:username)
  end
end
