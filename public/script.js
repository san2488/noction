var socket = io.connect();

function setHighestBid(amount) {
   $("#highestBidAmount").html(amount);
}

function bid() {
   if ($('#bidAmount').val() != "")
   {
      socket.emit('bid', $('#bidAmount').val());
      // addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
      $('#bidAmount').val('');
   }
}

function addItem() {
   if ($("#itemName").val() != "")
   {
        var data = $("#itemName").val();
        socket.emit('addItem', data);

        // Can't add any more items for auction
        $("#itemInfo").html(data);
        $("div#addItemInfo").hide();
        
        // Host cannot bid but can see highest bid
        $("#bidControls").hide();
        $("#highestBid").show();

        $("#itemName").val('');
   }
}

function showItem(data) {
    if(data !== undefined) {
        $("#itemInfo").html(data);
        $("div#addItemInfo").hide();

        // Show bidding controls and auction item only when Item is added
        $("div#biddingFor").show();
        $("#bidControls").show();
        $("#highestBid").show();
    }
}

socket.on('setHighestBid', setHighestBid);

socket.on('showItem', function(data) {
    showItem(data);
})

$(function() {
    $("#highestBid").hide();
    $("#bidControls").hide();
    $("div#biddingFor").hide();
    $("#addItem").click(function() {addItem()});
    $("#submit").click(function() {bid();});
});