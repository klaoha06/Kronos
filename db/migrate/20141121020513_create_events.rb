class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :creator
      t.datetime :start_time, :end_time
      t.string :name, :location
      t.timestamps
    end
  end
end
