$(function ready(){

  getListings();

  function validateForm ( orderInfo ) {
    console.log('order', orderInfo);

    if( orderInfo.name == '' || orderInfo.type == '' || orderInfo.address == '' || orderInfo.price == '' || orderInfo.description == '' ){
      return false
    }else{
      return true;
    }
  }

  console.log('property!')

  $( "#listings" ).submit(function( event ) {
    event.preventDefault();

    var propertyInfo = JSON.stringify({
      name: $('input[name="name"]').val(),
      type: $('select[name="type"]').val(),
      address: $('input[name="address"]').val(),
      price: $('input[name="price"]').val(),
      rentals: $('input[name="rentals"]:checked').val(),
      description: $('textarea[name="description"]').val()
    });

    console.log( propertyInfo );
    // return;

    if( !validateForm( propertyInfo ) ){
       $('#message').removeClass();
       $('#message').addClass( 'alert alert-danger' );
       $('#message').html('Fields cannot be empty');

       return;

    }else{

      $.ajax({
        url: '/api/listings',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data : propertyInfo,
        success : function(json, status, request) {
          $('#message').removeClass();
          $('#message').addClass( 'alert alert-success');
          $('#message').html('Your property has been submitted');
          console.log('json:',json);
          console.log('request:', request);

          getListings();
        },
        error : function(json, request, status){
          $('#message').removeClass();
          $('#message').addClass( 'alert alert-danger' );
          $('#message').html(json.responseJSON.message);
          console.log('Request failed : ', json);
        }
      });
    }


  }); // end form submit

  function getListings() {
    // $('#property-list').html('listings here');

    $.getJSON('/api/listings', function (data) {
      data.forEach(function (item) {
        var rentals = '';

        if ( item.rentals == 'on'){
          rentals = 'Yes';
        }else{
          rentals = 'No';
        }

        var newProperty = '<tr>' +
          '<td>' + item.name + '</td>' +
          '<td>' + item.dateListed + '</td>' +
          '<td>$' + item.price + '</td>' +
          '<td>' + item.type + '</td>' +
          '<td>' + item.address + '</td>' +
          '<td>' + rentals + '</td>' +
          '<td>' + item.description + '</td>' +
          '</tr>';

        $(newProperty).prependTo('#property-list');

      });
    });
  }
});