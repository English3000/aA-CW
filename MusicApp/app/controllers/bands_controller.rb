class BandsController < ApplicationController
  def new
    @band = Band.new
    render :new #form to create band
  end

  def create
    @new_band = Band.new(band_params)

    if @new_band.save
      redirect_to user_url(current_user)
    else
      flash[:errors] = @new_band.errors.full_messages
      render :new
    end
  end

  def edit
    @band = current_band
    render :new
  end

  def update
    @band = current_band
    @band.name, @band.description = params[:band][:name], params[:band][:description]
    @band.save
    redirect_to user_url(current_user)
  end

  def destroy
    @band = current_band
    @band.delete
    redirect_to user_url(current_user)
  end

  def show
    @band = current_band
    render :show
  end

  private
  def band_params
    params.require(:band).permit(:name, :manager_id, :description)
  end
end
