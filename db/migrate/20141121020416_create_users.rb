class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :name, :email, :fb_id, :profile_pic
      t.timestamps
    end
  end
end
