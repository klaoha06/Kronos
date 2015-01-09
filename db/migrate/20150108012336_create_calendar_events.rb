class CreateCalendarEvents < ActiveRecord::Migration
  def change
    create_table :calendar_events do |t|
    	t.belongs_to :calendar, index: true
    	t.belongs_to :event, index: true
    end
  end
end
