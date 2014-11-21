class CreateCalendarTags < ActiveRecord::Migration
  def change
    create_table :calendar_tags do |t|
      t.references :calendar
      t.references :tag
      t.timestamps
    end
  end
end
