class CreateUserAddedevents < ActiveRecord::Migration
  def change
    create_table :user_addedevents do |t|
      t.references :user
      t.references :addedevent
      t.timestamps
    end
  end
end
