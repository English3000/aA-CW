require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) {User.create(email: 'me@me.com', password: 'mememe')}

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'User#match?' do
    it 'returns true for matching password' do
      expect(user.match?('mememe')).to be true
    end

    it 'returns false for non-matching password' do
      expect(user.match?('justme')).to be false
    end
  end

  describe 'User#end_session!' do
    it "resets current_user's session_token" do
      expect(user.session_token).not_to eq(user.end_session!)
    end
  end

  describe 'User::find_by_credentials' do
    it "returns nil if email not found" do
      expect(User.find_by_credentials('', 'mememe')).to eq(nil)
    end

    it "returns user if email and password match" do
      expect(User.find_by_credentials('me@me.com', 'mememe')).to eq(user)
    end
  end
end
