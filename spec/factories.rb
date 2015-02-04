FactoryGirl.define do
  factory :event do
    title Faker::Commerce.product_name

    factory :event_future do
      title "future event"
      start { Faker::Time.forward(rand(20), :morning) }
    end

    factory :event_past do
      title "past event"
      start { Faker::Time.between(2.days.ago, 1.days.ago, :morning) }
    end
  end

  factory :calendar do
    name Faker::Commerce.product_name
  end

  factory :user do
    fb_id "fb_id"

    factory :user_with_calendars do
      transient { calendars_count 2 }

      after(:create) do |user, evaluator|
        create_list(:calendar, evaluator.calendars_count, creator_id: user.id)
      end
    end
  end
end
