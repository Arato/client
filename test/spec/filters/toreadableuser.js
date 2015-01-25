'use strict';

describe('Filter: toReadableUser', function () {

  // load the filter's module
  beforeEach(module('aratoApp'));

  // initialize a new instance of the filter before each test
  var toReadableUser;
  beforeEach(inject(function ($filter) {
    toReadableUser = $filter('toReadableUser');
  }));

  it('should return the input prefixed with "toReadableUser filter:"', function () {
//    var text = 'angularjs';
    //expect(toReadableUser(text)).toBe('toReadableUser filter: ' + text);
  });

});
