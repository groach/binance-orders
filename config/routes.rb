Rails.application.routes.draw do

  root 'dashboard#index'

  namespace :ajax, path: 'ajax' do
    get 'establish_connection'
    get 'price'
  end

end
