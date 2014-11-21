class CreateUserSubscriptions < ActiveRecord::Migration
  def change
    create_table :user_subscriptions do |t|
      t.references :subscriber
      t.references :subscription
      t.timestamps
    end
  end
end
