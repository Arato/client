'use strict';

describe('Directive: password', function () {

  // load the directive's module
  beforeEach(module('aratoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
//    element = angular.element('<password></password>');
//    element = $compile(element)(scope);
//    expect(element.text()).toBe('this is the password directive');
  }));
});
