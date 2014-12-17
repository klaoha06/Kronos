class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :creator
      t.integer :id_from_provider
      t.datetime :start_time, :end_time
      t.string :name, :location, :time_zone, :cover_pic, :provider, :external_uri, :owner_name, :owner_id, :my_status
      t.text :description
      t.timestamps
    end
  end
end
