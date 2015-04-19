'use strict';

describe('Service: ApiService', function () {

  // load the service's module
  beforeEach(module('aratoApp'));

  // instantiate service
  var ApiService;
  beforeEach(inject(function (_ApiService_) {
    ApiService = _ApiService_;
  }));

  it('should do something', function () {
    //expect(!!api).toBe(true);
  });

});
