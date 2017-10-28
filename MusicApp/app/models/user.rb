# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}
  validates :password_digest, presence: true #not unique b/c pot. for hash collision

  after_initialize :sessionize
  attr_reader :password

  private
  def sessionize
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  public
  def end_session!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save
    self.session_token
  end

  def password=(password) #how would someone change their PW? prob. beyond scope...?
    @password = password                      #v--gen's string
    self.password_digest ||= BCrypt::Password.create(password)
  end

  def match?(password)#v--gen's BCrypt object #v--called on BCrypt OBJECT, not String
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    account = User.find_by(email: email) #ternary logic?
    return nil if account.nil? #not a User!
    account.match?(password) ? account : nil
  end
end
