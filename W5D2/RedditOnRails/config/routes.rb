Rails.application.routes.draw do
  root to: 'subs#index'

  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]
  resources :subs do
    resources :posts, only: [:new, :create]
  end
  resources :posts, except: [:index] do
    resources :comments
  end
  resources :comments

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
