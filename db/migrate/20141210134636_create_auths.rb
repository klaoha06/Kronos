class CreateAuths < ActiveRecord::Migration
  def change
    create_table :auths do |t|
    	t.belongs_to :user
    	t.string :access_token, :fb_id
      t.timestamps
    end
  end
end
