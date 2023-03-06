# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  guest_id   :bigint           not null
#  listing_id :bigint           not null
#  num_guests :integer          not null
#  check_in   :datetime         not null
#  check_out  :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord
  validates :guest_id, :listing_id, :num_guests, :check_in, :check_out, presence: true

  belongs_to :guest,
    foreign_key: :guest_id,
    class_name: :User

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing
end
