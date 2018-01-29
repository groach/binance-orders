(function($){

  var d = {

    init: function(){
      $('#btn-connect').click(d.establishConnection);
      $('#trading-pair-select').change(function(){
        $('.pair-data').addClass('hidden');
        d.resetFields();
        d.getPairData();
      });
      $(document).on('click', '#create-limit-order', d.buildOrder);
      $(document).on('click', '#set-stop-limit-order', d.placeOrder);
    },

    placeOrder: function(){
      var symbol = $('#trading-pair-select').val();
      d.generateOrderHtml(symbol);
    },

    buildOrder: function(e){
      var symbol = $('#trading-pair-select').val();
      $('#create-order-box').removeClass('hidden');
    },

    resetFields: function(){
      $('#stop-val').val('');
      $('#limit').val('');
      $('#amount').val('');
    },

    generateOrderHtml: function(symbol){
      var html = "<div class='col-md-2 order-box'><h4>"+symbol+"</h4>";
      html += "<p>stop:"+$('#stop-val').val()+"</p>";
      html += "<p>limit:"+$('#limit').val()+"</p>";
      html += "<p>amount:"+$('#amount').val()+"</p>";
      html += "</div>";
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
        var html = "<option value='"+v+"'>"+v+"</option>";
        $('#trading-pair-select').append(html);
      });
      $.each(data.balances, function(k,v){
        if(v.free != "0.00000000"){
          var html = "<tr><td><strong>"+v.asset+":</strong> "+v.free+"</td></tr>";
          $('#balances-table').append(html);
        }
      });
      $('#balances').removeClass('hidden');
      $('#trading-pair-select').removeClass('hidden');
    }

  }

  $(document).ready(d.init);

})(jQuery);
