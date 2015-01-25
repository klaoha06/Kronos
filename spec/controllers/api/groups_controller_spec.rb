require 'rails_helper'

RSpec.describe Api::V0::GroupsController do
  describe '#find_group' do
    it 'assigns group based on id' do
      group = Group.create
      controller.params[:id] = group.id
      controller.send(:find_group)
      expect(assigns(:group)).to eq(group)
    end
  end
end
