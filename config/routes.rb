Rails.application.routes.draw do
	root "articles#index"
  resources :articles do
    resources :comments
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  #API routes
  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index, :show, :create, :destroy]
      resources :auth, only: [:create, :destroy]
    end
  end
end
