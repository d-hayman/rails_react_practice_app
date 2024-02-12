Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  root to: proc { [404, {}, ["Not found."]] }

  #Dev routes - leave disabled
  #root "articles#index"
  #resources :articles do
  #  resources :comments
  #end

  #API routes
  namespace :api do
    namespace :v1 do
      resources :permissions, only: [:index, :show]
      resources :users, only: [:index, :show, :create] do 
        post 'set_permissions', on: :member
      end
      resources :articles, only: [:index, :show, :create, :update, :destroy]
      get 'search/articles'
      resources :auth, only: [:create, :destroy]
      match "auth", to: "auth#destroy", via: "delete", defaults: { id: nil }
    end
  end
end
