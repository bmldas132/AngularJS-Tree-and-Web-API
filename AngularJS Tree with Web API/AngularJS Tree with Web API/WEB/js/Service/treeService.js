/// <reference path="../angular.js" />

app.factory('treeService', function ($http) {
    var treeServiceFactory = {};
    
    var _GetCategory = function (url) {
        return $http.get(url)
    };

    var _PostCategory = function (url,data) {
        return $http.post(url,data)
    };

    var _UpdateCategory = function (url,Id, data) {
        return $http.put(url+'/'+Id, data)
    };

    var _DeleteCategory = function (url, data) {
        return $http.delete(url+"/"+ data)
    };

    treeServiceFactory.GetCategory = _GetCategory;
    treeServiceFactory.PostCategory = _PostCategory;
    treeServiceFactory.UpdateCategory = _UpdateCategory;
    treeServiceFactory.DeleteCategory = _DeleteCategory;

    return treeServiceFactory;
});