@listings.each do |listing|
    json.set! listing.id do 
        json.extract! listing,
            :id,
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
            :num_baths
    end
end