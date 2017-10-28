# == Schema Information
#
# Table name: bands
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  manager_id  :integer          not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Band < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :manager_id, presence: true
end
