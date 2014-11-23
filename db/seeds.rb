5.times do
  user = User.create(username: Faker::Internet.user_name, name: Faker::Name.first_name, email: Faker::Internet.email)
  user.calendars.create(name: Faker::Commerce.product_name)
  user.events.create(name: Faker::Commerce.product_name)
end

User.all.each do |user|
  user.addedcalendars << Calendar.where.not(creator_id: user.id).sample
end


User.all.each do |user|
  user.addedevents << Event.where.not(creator_id: user.id).sample
end
