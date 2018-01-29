class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def binance_client
    @client ||= cached_client
  end
  helper_method :binance_client

  private

  def cached_client
    Rails.cache.fetch "binance-client" do
      Binance::Client::REST.new api_key: session[:api_key], secret_key: [:api_secret]
    end
  end
end
