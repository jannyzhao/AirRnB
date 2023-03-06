class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :guest, foreign_key: {to_table: :users}, null: false
      t.references :listing, null: false, foreign_key: true
      t.integer :num_guests, null: false
      t.datetime :check_in, null: false
      t.datetime :check_out, null: false

      t.timestamps
    end
  end
end
