require 'byebug'

class ArtworksController < ApplicationController
  def index
    # @artwork = Artwork.find_by(id: params[:id])

# User.find_by(id: params[:user_id]).get_artworks
    # byebug
    # should put user method in the user model
    @artworks = Artwork.all.where(artist_id: params[:user_id]).to_a +
      User.find_by(id: params[:user_id]).get_artworks
    # User.find_by(id: params[:user_id]).shared_artworks.to_a
    render json: @artworks
    # # render plain: "I'm in the index action!"
  end

  def create
    # render json: params
    @artwork = Artwork.new(artwork_params)
    if @artwork.save
      render json: @artwork
    else
      render json: @artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @artwork = Artwork.find_by(id: params[:id])
    if @artwork
      render json: @artwork
    else
      render json: "Artwork not found ", status: 404
    end
  end

  def update
    @artwork = Artwork.find_by(id: params[:id])
    if @artwork && @artwork.update_attributes(artwork_params)
      render json: @artwork
    else
      render json: @artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @artwork = Artwork.find_by(id: params[:id])
    if @artwork && @artwork.destroy
      render json: @artwork
    else
      render json: "can't"
    end
  end

  private
  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end
end
