/// <reference path="../angular.js" />

newapp.controller('newTreeController', ['$scope', '$window', 'newTreeService', function ($scope, $window, newTreeService) {

    var url = "/api/Tables";
    $scope.res = [];

    newTreeService.GetCategory(url).then(function (data) {
        $scope.response = data.data;
        $scope.res = $scope.getNestedChildren($scope.response, "00000000-0000-0000-0000-000000000000");
    }, function () {
        $window.alert("Could not load the data.");
    });



    $scope.getNestedChildren = function (arr, parent) {
        var out = []
        for (var i in arr) {
            if (arr[i].ParentId == parent) {
                var children = $scope.getNestedChildren(arr, arr[i].Id)

                if (children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
    };

    $scope.Detail = function (data) {
        $scope.table = data;
    };

}]);