// ------------------- //
// ----- HELPERS ----- //
// ------------------- //
Template.can.helpers({
  can_size_px: function() {
    var canSize = Session.get('canSize');
    return canSize + 'px';
  }
});

// ------------------ //
// ----- EVENTS ----- //
// ------------------ //
Template.can.events({ 
  'click .redbull-can-overlay': function () {
      Cans.remove(this._id);
    },
});