class GetPrice < SimpleInteractor

  expected_params :client, :symbol

  def perform
    @client.price(symbol: @symbol)
  end

end
