class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :creator
      t.integer :id_from_provider
      t.datetime :start, :end
      t.string :title, :location, :time_zone, :cover_pic, :provider, :external_uri, :owner_name, :owner_id, :my_status
      t.text :description
      t.boolean :important, :favorite, :share, default: false
      t.timestamps
    end
  end
end
