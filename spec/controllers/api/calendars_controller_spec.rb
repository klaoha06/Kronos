require 'rails_helper'

RSpec.describe Api::V0::CalendarsController do
  describe '#show' do
    it 'sets the calendar based on the id' do
      calendar = Calendar.create(name: "my calendar")
      get :show, id: calendar.id
      expect(assigns(:calendar)).to eq(calendar)
      expect(response.status).to eq(200)
    end
  end
end
