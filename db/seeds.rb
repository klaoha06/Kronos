8.times do
  user = User.create(username: Faker::Internet.user_name, name: Faker::Name.first_name, email: Faker::Internet.email, profile_pic: Faker::Avatar.image, fb_id: Faker::Business.credit_card_number.to_s)
  user.calendars.create(name: Faker::Commerce.product_name)
  user.events.create(
    title: Faker::Commerce.product_name,
    start: Faker::Time.forward(rand(20), :morning),
    end: Faker::Time.forward(rand(20)+1, :evening),
    cover_pic: Faker::Avatar.image,
    location: Faker::Address.country,
    description: Faker::Lorem.paragraph
  )
  user.events.create(
    title: Faker::Commerce.product_name,
    start: Faker::Time.between(2.days.ago, Time.now, :morning),
    end: Faker::Time.forward(rand(22)+1, :morning),
    cover_pic: Faker::Avatar.image,
    location: Faker::Address.country,
    description: Faker::Lorem.paragraph
  )
end

User.all.each do |user|
  user.addedcalendars << Calendar.where.not(creator_id: user.id).sample
  user.addedevents << Event.where.not(creator_id: user.id).sample
  begin
    user.followers << User.where.not(id: user.id).sample(5)
  rescue ActiveRecord::RecordNotUnique
    puts 'Tried to add an existing relationship.. Continuing to load'
  rescue ActiveRecord::RecordInvalid
    puts 'Tried to follow self.. Continuing to load'
  end
end

15.times do
  group = Group.create(name: Faker::Commerce.department(1))
  group.calendars << Calendar.all.sample(3)


  User.all.sample(3).each do |user|
    user.groups << group
  end
  User.first.groups << group
end
