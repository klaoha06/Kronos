class CreateCalendars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.references :creator 
      t.string :name
      t.timestamps
    end
  end
end
