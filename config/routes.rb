Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root to: "home#index"
  namespace :v1 do
    resources :scores, only: [:create, :index]
    resources :groups, only: [:index]
  end

  resources :scores, only: [:index, :edit, :new]
  resources :stats, only: [:index]
end
