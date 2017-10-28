class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :current_band

  def current_user
    return nil unless session[:session_token]
    @user ||= User.find_by(session_token: session[:session_token])
  end

  def current_band
    return nil unless session[:session_token]
    @band ||= Band.find_by(id: params[:id])
  end

  def logged_in?
    !current_user.nil?
  end
end
