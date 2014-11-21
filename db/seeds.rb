5.times do
  user = User.create(username: Faker::Internet.user_name, name: Faker::Name.first_name, email: Faker::Internet.email)
  user.calendars.create(name: Faker::Commerce.product_name)
end

User.all.each do |user|
  user.subscriptions << Calendar.where.not(creator_id: user.id).sample
end