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

  Template.items.events({
  //set 'this' when item is selected
    'click .listRow': function (e) {
       Session.set("itemSelected", this._id);

       var thisRow = e.currentTarget;
       var thisDelete = $(thisRow).children('div');
       $(thisDelete).toggleClass("deleteShow", 200);
    },
    
    'click #delete': function(e) {
      var deleteShow = e.currentTarget;
      var parent = $(deleteShow).parent().attr('id');
      $('#' + parent).toggle("puff", function() {
        Grocery.remove(Session.get("itemSelected"));
      });

      console.log(Grocery.find().fetch());
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
      var currentId = $(this).find('div').attr('id');
      console.log(currentId);
      //$('#' + currentId).toggleClass("deleteShow", 200);
  });

  $('.deleteHide').click(function () {
      var currentParent = $(this).parent().attr('id');
      $('#' + currentParent).toggle("puff");
  });
*/
}

