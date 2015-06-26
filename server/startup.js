Meteor.startup(function () {
    
  // Start cron jobs
  SyncedCron.start();

});