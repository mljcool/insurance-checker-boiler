$(function() {
  // developer_mode();
  //   console.log('developer_mode');
  console.log(
    '%c MyCRM insurance checker is Running on Production ',
    'color: #bada55'
  );
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
