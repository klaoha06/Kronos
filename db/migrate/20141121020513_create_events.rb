class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :creator
      t.datetime :start_time, :end_time
      t.string :name, :location, :time_zone, :cover_pic, :provider, :owner_name, :owner_id
      t.text :description
      t.timestamps
    end
  end
end
