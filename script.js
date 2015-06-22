if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.home.helpers({
    counter: function () {
      return Session.get('counter');
    },

    cans: function() {
      return Cans.find({});
    }
  });

  Template.home.events({
    
    'click .pop-up': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
