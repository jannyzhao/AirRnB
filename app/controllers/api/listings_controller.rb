class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.all
    render :index
  end

  def create
    @listing = Listing.new(listing_params)

    if @listing.save
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def show
    @listing = Listing.find_by_id(params[:id])
    render :show
  end

  private

  def listing_params
    params.require(:listing).permit(
      :owner_id,
      :title,
      :description, 
      :address, 
      :city, 
      :state, 
      :cost, 
      :num_guests, 
      :num_bedrooms, 
      :num_beds, 
      :num_baths,
      :latitude,
      :longitude
    )
  end
end
