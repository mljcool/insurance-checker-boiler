console.log('Content scripts has loaded');

$(function() {
   // developer_mode();
   console.log('developer_mode');
   setTimeout(() => {
      interceptMyCRM();
   }, 2500);
});

$(window).bind('hashchange', function() {
   console.log('hashchange');
   setTimeout(() => {
      interceptMyCRM();
   }, 1000);
});
