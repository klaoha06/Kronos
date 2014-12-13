10.times do
  user = User.create(username: Faker::Internet.user_name, name: Faker::Name.first_name, email: Faker::Internet.email, fb_id: Faker::Business.credit_card_number)
  user.calendars.create(name: Faker::Commerce.product_name)
  user.events.create(name: Faker::Commerce.product_name)
end

User.all.each do |user|
  user.addedcalendars << Calendar.where.not(creator_id: user.id).sample
end


User.all.each do |user|
  user.addedevents << Event.where.not(creator_id: user.id).sample
end

3.times do 
	group = Group.create(name: Faker::Commerce.department(1))
	group.calendars << Calendar.all.sample(3)


	User.all.sample(3).each do |user|
		user.groups << group
	end
	User.first.groups << group
end