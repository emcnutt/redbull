Meteor.methods({
    
	filterCans: function (dateFilter) {
	  console.log(dateFilter);
	  // return Cans.find({createdAt : { $gt : dateFilter }});
	  var cans = Cans.find({createdAt : { $gte : new Date(dateFilter) }});
	  console.log(cans);
	  return cans;
	},

});