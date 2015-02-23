require 'rails_helper'

RSpec.describe Api::V0::UsersController do
  let(:user) { User.create(fb_id: 1) }
  let(:auth) { Auth.create }

  describe '#sessioning_user' do
    it 'should update the current user if exists' do
      expect(User).to receive(:find_by).and_return(user)
      expect(user).to receive(:auth).twice.and_return(auth)
      expect(user).to receive(:update).and_return(true)
      expect(auth).to receive(:destroy!).and_return(true)
      expect(Auth).to receive(:create).and_return(true)
      get :sessioning_user, { fb_id: 1 }
    end

    it 'should create a new user if does not exist' do
      expect(User).to receive(:find_by).and_return(nil)
      expect(User).to receive(:new).and_return(user)
      expect(user).to receive(:save).and_return(true)
      expect(Auth).to receive(:create).and_return(true)
      get :sessioning_user, { fb_id: 1 }
    end
  end

  describe '#suggestions' do
    # need to change once actual algorithm for action is implemented
    it 'should return all users not being followed' do
    end
  end
end
