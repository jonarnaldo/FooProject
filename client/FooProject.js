if (Meteor.isClient) {
  
  Template.addGrocery.events({
    'click .submit': function () {
      Grocery.insert({
        itemName: $('#nameInput').val(),
      })

      $('#itemName').val('');
      $('#nameInput').val('');
    }
  })

  //set 'this' when item is selected
  Template.items.events({
    'click .listRow': function () {
       Session.set("itemSelected", this._id);
       console.log(Session.get("itemSelected"));
    }
  })

  Template.items.events({
    'click #remove': function() {
      Grocery.remove(Session.get("itemSelected"));
    }
  })

//populate groceryList with items
  Template.groceryList.item = function () {
    return Grocery.find({}, {sort:{ itemName: 1}});
  }

  Template.items.itemSelected = function() {
    var item = Grocery.findOne(Session.get("itemSelected"));
    return (item && item.itemName);
  }
/*
  $(".listRow").click(function () {
      var currentId = $(this).find('span').attr('id');
      $('#' + currentId).toggleClass("deleteShow", 200);
  });


  $('.deleteHide').click(function () {
      var currentParent = $(this).parent().attr('id');
      $('#' + currentParent).toggle("puff");
  });
*/
}

