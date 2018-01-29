class AjaxController < ApplicationController

  def establish_connection
    session[:api_key] = params[:key]
    session[:api_secret] = params[:secret]
    info = GetExchangeInfo.perform(binance_client)

    if info[:symbols].present?
      response = info
    else
      session[:api_key] = nil
      session[:api_secret] = nil
      response = {status: 'error'}
    end

    render json: response
  end

  def price
    render json: GetPrice.perform(binance_client, params[:symbol])
  end

end
