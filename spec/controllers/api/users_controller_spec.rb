require 'rails_helper'

RSpec.describe Api::V0::UsersController do
  let(:user) { User.create(fb_id: 1) }
  let(:auth) { Auth.create(user_id: 1, created_at: Time.now) }

  describe '#sessioning_user' do
    it 'updates the current user if exists' do
      expect(User).to receive(:find_by).and_return(user)
      expect(user).to receive(:auth).twice.and_return(auth)
      expect(user).to receive(:update).and_return(true)
      expect(auth).to receive(:destroy!).and_return(true)
      expect(Auth).to receive(:create).and_return(true)
      get :sessioning_user, { fb_id: 1 }
    end

    it 'creates a new user if does not exist' do
      expect(User).to receive(:find_by).and_return(nil)
      expect(User).to receive(:new).and_return(user)
      expect(user).to receive(:save).and_return(true)
      expect(Auth).to receive(:create).and_return(true)
      get :sessioning_user, { fb_id: 1 }
    end
  end

  describe '#suggestions' do
    # need to change once actual algorithm for action is implemented
    it 'returns all users not being followed' do
      user2 = User.create(fb_id: 2)
      user3 = User.create(fb_id: 3)
      expect(User).to receive(:find).and_return(user)
      expect(Auth).to receive(:find_by).and_return(auth)

      get :suggestions
      response_json = JSON.parse(response.body)
      expect(response_json[0]['id']).to eq(user2.id)
      expect(response_json[1]['id']).to eq(user3.id)
    end
  end

  describe '#show' do
    it 'shows user if followed or following' do
      user4 = User.create(fb_id: 4)
      user.following << user4
      user.followers << user4
      expect(User).to receive(:find).and_return(user)
      expect(Auth).to receive(:find_by).and_return(auth)
      expect(User).to receive(:find).and_return(user4)
      get :show, id: user4.id
      expect(response.body).to eq({
        user: user4, friendship: { following: true, follower: true }
      }.to_json)
    end

    it 'shows user if not followed or following' do
      user4 = User.create(fb_id: 4)
      expect(User).to receive(:find).and_return(user)
      expect(Auth).to receive(:find_by).and_return(auth)
      expect(User).to receive(:find).and_return(user4)
      get :show, id: user4.id
      expect(response.body).to eq({
        user: user4, friendship: { following: false, follower: false }
      }.to_json)
    end
  end

  describe '#clear_session' do
    it 'destroys auth object if exists' do
      expect(User).to receive(:find).and_return(user)
      expect(Auth).to receive(:find_by).and_return(auth)
      expect(auth).to receive(:destroy!)
      get :clear_session
    end
  end

  describe '#friendships' do
    it 'renders all followers and following for current user' do
      expect(User).to receive(:find).twice.and_return(user)
      expect(Auth).to receive(:find_by).and_return(auth)
      get :friendships, id: 1
      expect(response.body).to eq({ user: user, followers: [], following: [] }.to_json)
    end
  end
end
