"use strict";

angular.module('config', [])
    .constant('ENV', {
        name        : 'testing',
        apiEndpoint : 'http://arato.local:8000',
        nodePush    : 'http://127.0.0.1:5000'
    });