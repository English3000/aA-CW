class AlbumsController < ApplicationController
  def new
    @new_album = Album.new
    render :new
  end

  def create
    @new_album = Album.new(album_params)
    if @new_album.save
      redirect_to band_url(current_band)
    else
      flash[:errors] = @new_album.errors.full_messages
      render :new
    end
  end

  def show
    @album = current_album
    render :show
  end

  def destroy
    current_album.delete
    redirect_to band_url(current_band)
  end

  def edit
    @album = current_album
    render :new
  end

  def update
    if current_album.update(album_params)
      redirect_to band_url(band_user)
    else
      flash[:errors] = current_album.errors.full_messages
      render :new
    end
  end

  # def index
  #   @albums = Album.all
  #   render :index
  # end

  private
  def album_params
    params.require(:album).permit(:title, :year, :band_id, :live?, :description)
  end
end
