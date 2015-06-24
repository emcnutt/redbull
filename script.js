if (Meteor.isClient) {

  Session.setDefault('canSize', 75);
  Session.setDefault('dateFilter', 'all');
  var interval;

  Template.home.helpers({
    cans: function() {
      var date = undefined;
      var dateFilter = Session.get('dateFilter');
      
      var startingDate = "2000-01-01T00:00:000Z"

      var currentDate = moment();
      console.log(currentDate);

      if (dateFilter == 'day') {
        date = moment(currentDate).subtract(1, 'days');
      }
      if (dateFilter == 'week') {
        date = moment(currentDate).subtract(1, 'weeks');
      }
      if (dateFilter == 'all') {
        date = moment(currentDate).subtract(1, 'years');
      }

      console.log('date: ' + date);

      var cans = Cans.find({
        createdAt : { $gte : new Date(date) }
      });

      console.log(cans);
      return cans;
      // Meteor.call('filterCans', date, function (error, result) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(results);
      //     return results;
      //   }
      // });

    },

    can_size: function() {
      return Session.get('canSize');
    },
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
      Session.set('currentDate', moment());
    },

    'click .redbull-sugarfree': function () {
      Cans.insert({
        type: 'sugarfree',
        createdAt: new Date() // current time
      });
        Session.set('currentDate', moment());
    },

    'click .redbull-zero': function () {
      Cans.insert({
        type: 'zero',
        createdAt: new Date() // current time
      });
      Session.set('currentDate', moment());
    },

    'mouseover #can-size': function (e) {
      interval = setInterval(function() {
        Session.set('canSize', e.target.value);
        console.log('over');
      }, 50);
    },

    'mouseout #can-size': function (e) {
      clearInterval(interval);
    },

    'change .date-filter-radio': function (e) {
      console.log(e);
      Session.set('dateFilter', e.target.value);
    },

  });

  Template.home.rendered = function(){
    setTimeout(function(){
      $('.banner-container').addClass("rendered");
      $('.top-container').addClass("rendered");
      $('.redbulls').addClass("rendered");
    }, 2000);
  };

  Template.can.helpers({
    can_size_px: function() {
      var canSize = Session.get('canSize');
      return canSize + 'px';
    }
  });

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

  Meteor.methods({
    
    filterCans: function (dateFilter) {
      console.log(dateFilter);
      // return Cans.find({createdAt : { $gt : dateFilter }});
      var cans = Cans.find({createdAt : { $gte : new Date(dateFilter) }});
      console.log(cans);
      return cans;

    }

  });
}