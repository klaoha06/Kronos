class CreateCalendars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.references :creator 
      t.string :name, :cover_pic
      t.text :description
      t.boolean :share, default: false
      t.boolean :main_cal, default: false
      t.timestamps
    end
  end
end
