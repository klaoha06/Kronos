class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.integer :age_range, :default_time_zone, :fb_id
      t.string :username, :name, :first_name, :last_name, :gender, :email, :profile_pic
      t.datetime :birthday
      t.timestamps
    end
  end
end
