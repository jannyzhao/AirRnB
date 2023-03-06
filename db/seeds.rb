# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating listings..."
  # Seed listings
  # 5.times do 
    Listing.create!({
      owner_id: 1,
      title: "Private room in San Francisco", 
      description: "Beautiful room built in 1900s. This is located in the heart of San Francisco with ease of access to downtown.", 
      address: "101 Polk Street", 
      city: "San Francisco", 
      state: "CA", 
      cost: 150, 
      num_guests: 4, 
      num_bedrooms: 1, 
      num_beds: 2, 
      num_baths: 1,
      latitude: 37.72339,
      longitude: -122.454
    })

      Listing.create!({
        owner_id: 2,
        title: "Private home in Bodega Bay", 
        description: "Perfect home for a weekend getaway! Wake up with the sun and bask in the warmth of the ocean.", 
        address: "109 Ocean View", 
        city: "Bodega Bay", 
        state: "CA", 
        cost: 195, 
        num_guests: 8, 
        num_bedrooms: 4, 
        num_beds: 6, 
        num_baths: 3,
        latitude: 37.77619,
        longitude: -122.438
    })


      Listing.create!({
        owner_id: 3,
        title: "Dome in Saratoga", 
        description: "Gorgeous dome in Saratoga. The dome is located in the forest, a perfect private getaway from the city life!", 
        address: "367 Dome Blvd", 
        city: "Saratoga", 
        state: "CA", 
        cost: 220, 
        num_guests: 2, 
        num_bedrooms: 1, 
        num_beds: 1, 
        num_baths: 0,
        latitude: 37.77619,
        longitude: -122.438
    })
    
    #   Listing.create!({
    #     owner_id: 3,
    #     title: Faker::Lorem.sentence(word_count: 3),
    #     description: Faker::Lorem.paragraph(sentence_count: 2),
    #     address: Faker::Address.street_address,
    #     city: Faker::Address.city,
    #     state: Faker::Address.state_abbr,
    #     cost: rand(50..500),
    #     num_guests: rand(1..10),
    #     num_bedrooms: rand(1..5),
    #     num_beds: rand(1..5),
    #     num_baths: rand(1..3),
    #     latitude: Faker::Address.latitude,
    #     longitude: Faker::Address.longitude
    # })

  puts "Done!"
end