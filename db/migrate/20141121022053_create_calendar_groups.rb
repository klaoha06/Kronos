class CreateCalendarGroups < ActiveRecord::Migration
  def change
    create_table :calendar_groups do |t|
      t.references :calendar
      t.references :group
      t.timestamps
    end
  end
end
