class CatRentalRequestsController < ApplicationController

  def index
    @cat_rental_requests = CatRentalRequest.all

    render :index
  end

  def show
    @cat_rental_request = CatRentalRequest.find_by(id: params[:id])

    if @cat_rental_request
      render :show
    else
      redirect_to cat_rental_requests_url
    end
  end

  def new
    @cat_rental_request = CatRentalRequest.new
    render :new
  end

  def create
    @cat_rental_request = CatRentalRequest.new(cat_rental_request_params)

    if @cat_rental_request.does_not_overlap_approved_request
      @cat_rental_request.save
      redirect_to cat_rental_request_url(@cat_rental_request)
    else
      render json: @cat_rental_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def edit
    @cat_rental_request = CatRentalRequest.find_by(id: params[:id])

    if @cat_rental_request
      render :edit
    else
      redirect_to cat_rental_requests_url
    end
  end

  def update
    @cat_rental_request = CatRentalRequest.find_by(id: params[:id])

   if @cat_rental_request.update_attributes(cat_rental_request_params)
     redirect_to cat_rental_request_url(@cat_rental_request)
   else
     render json: @cat_rental_request.errors.full_messages, status: :unprocessable_entity
   end
  end

  def destroy
    @cat_rental_request = CatRentalRequest.find_by(id: params[:id])

    if @cat_rental_request
      @cat_rental_request.destroy
      render :show
    else
      render json: "CatRentalRequest not found."
    end
  end

  private
  def cat_rental_request_params
    params.require(:cat_rental_request).permit(:cat_id, :start_date, :end_date, :status)
  end

end
