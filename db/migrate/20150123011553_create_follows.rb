class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
    	t.references :following
    	t.references :follower

    	t.timestamps
    end

    add_index :follows, :following_id
    add_index :follows, :follower_id
    add_index :follows, [:following_id, :follower_id], unique: true
  end
end
