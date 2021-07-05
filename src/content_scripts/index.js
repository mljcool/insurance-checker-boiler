$(function() {
  console.log(
    '%c MyCRM insurance checker is Running on Production ',
    'color: #bada55'
  );
  setTimeout(() => {
    interceptMyCRM();
  }, 2500);
});

$(window).bind('hashchange', function() {
  setTimeout(() => {
    interceptMyCRM();
  }, 1000);
});
