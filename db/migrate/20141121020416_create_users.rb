class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :name, :first_name, :last_name, :gender, :default_timezone, :email, :fb_id, :profile_pic
      t.timestamps
    end
  end
end
