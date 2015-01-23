# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150108012336) do

  create_table "auths", force: true do |t|
    t.integer  "user_id"
    t.string   "access_token"
    t.string   "fb_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "calendar_events", force: true do |t|
    t.integer "calendar_id"
    t.integer "event_id"
  end

  add_index "calendar_events", ["calendar_id"], name: "index_calendar_events_on_calendar_id"
  add_index "calendar_events", ["event_id"], name: "index_calendar_events_on_event_id"

  create_table "calendar_groups", force: true do |t|
    t.integer  "calendar_id"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "calendar_tags", force: true do |t|
    t.integer  "calendar_id"
    t.integer  "tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "calendars", force: true do |t|
    t.integer  "creator_id"
    t.string   "name"
    t.string   "cover_pic"
    t.text     "description"
    t.boolean  "share",       default: false
    t.boolean  "main_cal",    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.integer  "creator_id"
    t.integer  "id_from_provider"
    t.datetime "start"
    t.datetime "end"
    t.string   "title"
    t.string   "location"
    t.string   "time_zone"
    t.string   "cover_pic"
    t.string   "provider"
    t.string   "external_uri"
    t.string   "owner_name"
    t.string   "owner_id"
    t.string   "my_status"
    t.text     "description"
    t.boolean  "important",        default: false
    t.boolean  "favorite",         default: false
    t.boolean  "share",            default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_addedcalendars", force: true do |t|
    t.integer  "user_id"
    t.integer  "addedcalendar_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_addedevents", force: true do |t|
    t.integer  "user_id"
    t.integer  "addedevent_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_groups", force: true do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.integer  "age_range"
    t.integer  "default_time_zone"
    t.integer  "fb_id"
    t.string   "username"
    t.string   "name"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "gender"
    t.string   "email"
    t.string   "profile_pic"
    t.datetime "birthday"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
