require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "GET #new" do
    it "renders the new template" do #even this isn't working
      get :new, {}
      expect(response).to render_template("new")
    end
  end

  describe "POST #create" do
    context "with invalid params" do
      it "validates the presence of the user's email and password" do
        post :create, params: { user: {email: 'me@co.me', password: 'friendly'}}
        expect(response).to validate_presence_of(:email)
        expect(response).to validate_presence_of(:password)
      end

      it "validates that the password is at least 6 characters long" do
        post :create, params: { user: {email: 'me@co.me', password: 'friendly'}}
        expect(response).to validate_length_of(:password).is_at_least(6)
      end
    end

    context "with valid params" do
      it "redirects user to bands index on success" do #treating hash as 2 arg's
        post :create, params: { user: {email: 'me@co.me', password: 'friendly'}}
        expect(response).to redirect_to(bands_url)
      end
    end
  end
end
