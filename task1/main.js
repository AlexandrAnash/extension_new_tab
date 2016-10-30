console.log('Before');
asyncForEach([1, 2, 3], function(item, index, next) {
  console.log('Item %s at %s', item, index);
  setTimeout(next, 10);
}).then(function() {
  console.log('Done');
});
console.log('After');