Rails.application.routes.draw do
  resources :users
  resources :sessions, only: [:create, :destroy]
  resources :pages
  resources :settings, only: [:create]
  root :to => 'pages#index'
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'
end
