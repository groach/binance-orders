class GetExchangeInfo < SimpleInteractor

  expected_params :client

  def perform
    json = @client.exchange_info
    balances = @client.account_info["balances"]
    symbols = json["symbols"].map{|s| s["symbol"]}
    limits = json["rateLimits"]
    {
      status: 'ok',
      symbols: symbols,
      balances: balances,
      limits: limits
    }
  end


end
