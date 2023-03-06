json.listing do
    json.extract! @listing, 
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