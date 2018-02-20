class Cat < ApplicationRecord
  validates :birth_date, :name, :description, presence: true
  validates :color, presence: true, inclusion: {in: %w(gray brown black calico white)}
  validates :sex, presence: true, inclusion: {in: %w(M F)}

  # COLORS = color

  has_many :cat_rental_requests,
  dependent: :destroy

  def age
    if birth_date
      Date.today.year - birth_date.year
    else
      ""
    end
  end

end
