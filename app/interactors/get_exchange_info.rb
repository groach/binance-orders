class GetExchangeInfo < SimpleInteractor

  expected_params :client

  def perform
    json = @client.exchange_info
    symbols = json["symbols"].map{|s| s["symbol"]}
    limits = json["rateLimits"]
    {
      status: 'ok',
      symbols: symbols,
      limits: limits
    }
  end


end
