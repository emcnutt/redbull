if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.home.helpers({
    cans: function() {
      return Cans.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.home.events({
    
    'click .pop-up': function () {
      $('.overlay').removeClass("hidden");
    },

    'click .overlay': function () {
      $('.overlay').addClass("hidden");
    },

    'click .redbull-regular': function () {
      Cans.insert({
        type: 'regular',
        createdAt: new Date() // current time
      });
    },

    'click .redbull-sugarfree': function () {
      Cans.insert({
        type: 'sugarfree',
        createdAt: new Date() // current time
      });
    },

    'click .redbull-zero': function () {
      Cans.insert({
        type: 'zero',
        createdAt: new Date() // current time
      });
    },

  });

  Template.home.rendered = function(){
    setTimeout(function(){
      $('.banner-container').addClass("rendered");
      $('.top-container').addClass("rendered");
      $('.redbulls').addClass("rendered");
    }, 2000);
  };

  Template.can.events({ 
    'click .redbull-can-overlay': function () {
      Cans.remove(this._id);
    },
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}