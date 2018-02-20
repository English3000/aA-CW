# == Schema Information
#
# Table name: artwork_shares
#
#  id         :integer          not null, primary key
#  artwork_id :integer          not null
#  viewer_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ArtworkShare < ApplicationRecord
  validates :viewer_id, presence: true, uniqueness: {
    scope: :artwork_id, message: "Already shared with this viewer"
  }
  validates :artwork_id, presence: true

  belongs_to :viewer,
  class_name: :User,
  primary_key: :id,
  foreign_key: :viewer_id

  belongs_to :artwork,
  class_name: :Artwork,
  primary_key: :id,
  foreign_key: :artwork_id
end
