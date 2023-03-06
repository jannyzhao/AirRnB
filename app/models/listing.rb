# == Schema Information
#
# Table name: listings
#
#  id           :bigint           not null, primary key
#  owner_id     :bigint           not null
#  title        :string           not null
#  description  :text             not null
#  address      :string           not null
#  city         :string           not null
#  state        :string           not null
#  cost         :float            not null
#  num_guests   :integer          not null
#  num_bedrooms :integer          not null
#  num_beds     :integer          not null
#  num_baths    :integer          not null
#  latitude     :float            not null
#  longitude    :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Listing < ApplicationRecord
  validates :owner_id, :title, :description, :address, :city, :state, :cost, :num_guests, :num_bedrooms, :num_beds, :num_baths, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :reservations,
    foreign_key: :listing_id,
    class_name: :Reservation,
    dependent: :destroy
end
