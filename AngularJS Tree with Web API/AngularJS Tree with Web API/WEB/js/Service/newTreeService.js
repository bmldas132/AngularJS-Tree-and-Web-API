/// <reference path="../angular.js" />

newapp.factory('newTreeService', function ($http) {
    var treeServiceFactory = {};

    var _GetCategory = function (url) {
        return $http.get(url)
    };

    treeServiceFactory.GetCategory = _GetCategory;
    return treeServiceFactory;
});