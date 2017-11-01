class Comment < ApplicationRecord

  belongs_to :author,
  class_name: :User,
  primary_key: :id,
  foreign_key: :user_id

  belongs_to :post
end
