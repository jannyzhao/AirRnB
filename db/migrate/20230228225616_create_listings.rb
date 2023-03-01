class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :owner, foreign_key: {to_table: :users}, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.float :cost, null: false
      t.integer :num_guests, null: false
      t.integer :num_bedrooms, null: false
      t.integer :num_beds, null: false
      t.integer :num_baths, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps
    end
  end
end
