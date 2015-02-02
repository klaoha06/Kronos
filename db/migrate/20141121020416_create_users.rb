class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.integer :age_range, :default_time_zone
      t.string :username, :name, :first_name, :last_name, :gender, :email, :profile_pic, :fb_id
      t.datetime :birthday
      t.timestamps
    end
  end
end
