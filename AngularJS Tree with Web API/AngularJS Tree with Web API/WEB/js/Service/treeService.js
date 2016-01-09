/// <reference path="../angular.js" />

app.factory('treeService', function ($http) {
    var treeServiceFactory = {};
    
    var _GetCategory = function (url) {
        return $http.get(url)
    };

    treeServiceFactory.GetCategory = _GetCategory;
    return treeServiceFactory;
});