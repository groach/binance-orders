(function($){

  var d = {

    init: function(){
      $('#btn-connect').click(d.establishConnection);
      $('#trading-pair-select').change(function(){
        d.getPairData();
      });
      $(document).on('click', '#create-limit-order', d.createOrder);
    },

    createOrder: function(e){
      var symbol = $('#trading-pair-select').val();
      $('#create-order-box').removeClass('hidden');
      // d.generateOrderHtml(symbol);
    },

    generateOrderHtml: function(symbol){
      var html = "<div class='col-md-3 order-box'><h4>"+symbol+"</h4></div>";
      $('.orders-container').append(html);
    },

    getPairData: function(){
      var symbol = $('#trading-pair-select').val();
      $.ajax({
        url: '/ajax/price',
        data: {symbol: symbol},
        success: function(data){
          $('#symbol').text(data.symbol);
          $('#price').text(data.price);
          $('#create-limit-order').attr('data-symbol', data.symbol);
          $('.pair-data').removeClass('hidden');
        }
      });
    },

    establishConnection: function(){
      var key = $('#api-key').val();
      var secret = $('#api-secret').val();
      $.ajax({
        url: '/ajax/establish_connection',
        data: {key: key, secret: secret},
        success: d.processConnection
      });
    },

    processConnection: function(data){
      if (data.status === 'ok'){
        $('#btn-connect').text('Connected!');
        $('#api-connection-box').slideUp();
        $('#active-orders-box').removeClass('hidden');
        d.populateDashData(data);
      }else{
        alert('connection error');
      }
    },

    populateDashData: function(data){
      $.each(data.symbols, function(k,v){
        var html = "<option value='"+v+"'>"+v+"</option>"
        $('#trading-pair-select').append(html)
      });
      $('#trading-pair-select').removeClass('hidden');
    }

  }

  $(document).ready(d.init);

})(jQuery);
