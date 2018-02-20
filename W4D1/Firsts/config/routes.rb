Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :update, :destroy, :create] do
    resources :artworks, only: [:index]
  end
  resources :artworks, only: [:show, :update, :index, :destroy, :create]
  resources :artwork_shares, only: [:create, :destroy]
  resources :comments, only: [:create, :destroy, :index]
  # get 'users', to: 'users#index', as: "users"
  # get 'users/:id', to: 'users#show', as: 'user'
  # post 'users', to: 'users#create'
  # get 'users/new', to: 'users#new', as: 'new_user'
  # get 'users/:id/edit', to: "users#edit", as: 'edit_user'
  # patch 'users/:id', to: "users#update"
  # put 'users/:id', to: "users#update"
  # delete 'users/:id', to: "users#destroy"
end
