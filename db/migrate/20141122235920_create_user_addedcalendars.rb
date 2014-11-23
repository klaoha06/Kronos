class CreateUserAddedcalendars < ActiveRecord::Migration
  def change
    create_table :user_addedcalendars do |t|
      t.references :user
      t.references :addedcalendar
      t.timestamps
    end
  end
end
