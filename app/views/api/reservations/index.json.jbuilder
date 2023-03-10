@reservations.each do |reservation|
    json.set! reservation.id do 
        json.extract! reservation,
            :id,
            :guest_id,
            :listing_id,
            :num_guests,
            :check_in,
            :check_out
    end
end