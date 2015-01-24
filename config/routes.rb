Rails.application.routes.draw do
  resources :auths, except: [:new, :edit]
  namespace :api do
    namespace :v0 do 

      resources :auths  

      resources :calendars do
        member do
          get 'events', :controller => :events, to: :show_events_by_cal_id
        end
      end
      resources :events, :except => :index

      resources :groups, :except => :index do
        collection do
          get 'popular', :to => :popular
        end
      end

      resources  :users do
        collection do
           # User Auth
           post 'sessioning_user', to: :sessioning_user
           get 'current_user', to: :current_user
           get 'clear_session', to: :clear_session
        end
        member do
          get 'calendars', to: :show_user_cals
          get 'friendships', to: :friendships
          post 'unfollow', to: :unfollow
          post 'follow', to: :follow
        end
          resources :events, :only => :index do
            collection do
              post 'provider', to: :create_from_provider
            end
          end
        resources :groups, :only => [:index]
        delete 'unsubscribe_group', to: 'group#unsubscribe_group'
      end

    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
