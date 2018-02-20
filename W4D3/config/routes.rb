Rails.application.routes.draw do
<<<<<<< HEAD
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:new, :create] do
    post 'approve', on: :member
    post 'deny', on: :member
  end
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  root to: redirect('/cats')
=======
  root to: 'static_pages#index'
>>>>>>> 851ce0a06a38d747060dbf65d2856f4339d657c9
end
