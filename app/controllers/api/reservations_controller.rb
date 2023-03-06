class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all
    render :index
  end

  def show
    render :show
  end

  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      render :show
    else
      render json: { errors: @reservation.errors.full_messages }, status: 422
    end
  end

  def update
    if @reservation.update(reservation_params)
      render :show
    else
      render json: { errors: @reservation.errors.full_messages }, status: 422
    end
  end

  def destroy
    @reservation.destroy
  end

  private
  def reservation_params
    params.require(:reservation).permit(
      :guest_id,
      :listing_id,
      :num_guests,
      :check_in,
      :check_out
    )
  end
end
