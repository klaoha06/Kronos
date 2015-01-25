require 'rails_helper'

RSpec.describe Api::V0::ApplicationController do
  describe '#authenticate' do
    it 'sets current user if authenticated' do
      auth = instance_double("Auth", :user_id => 1, :created_at => Time.now)
      allow(Auth).to receive(:find_by).and_return(auth)
      allow(User).to receive(:find).and_return("user")
      controller.send(:authenticate)
      expect(assigns(:current_user)).to eq("user")
    end
  end
end
