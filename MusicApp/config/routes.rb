Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :bands
  resources :albums
  resources :tracks

  root to: 'sessions#new' #route that localhost:3000 defaults to
end
