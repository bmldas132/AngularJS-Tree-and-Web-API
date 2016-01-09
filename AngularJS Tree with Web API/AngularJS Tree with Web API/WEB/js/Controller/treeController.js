/// <reference path="../angular.js" />

app.controller('treeController', ['$scope','$window', 'treeService', function ($scope,$window, treeService) {

    var url = "/api/Tables";
    $scope.res = [];

    treeService.GetCategory(url).then(function (data) {
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

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    $scope.toggleIcon = function (event, childrenCount) {
        if (childrenCount == undefined || childrenCount == 0 || childrenCount == null) {
            return
        };
        //alert($(event.target).attr('aria-expanded'));
        if ($(event.target).attr('aria-expanded') === 'false' || $(event.target).attr('aria-expanded') == undefined) {
            //alert($(event.target).attr('aria-expanded'));
            $(event.target).removeClass('glyphicon-plus');
            $(event.target).addClass('glyphicon-minus');
        }
        else if ($(event.target).attr('aria-expanded') === 'true') {
            //alert($(event.target).attr('aria-expanded'));
            $(event.target).removeClass('glyphicon-minus');
            $(event.target).addClass('glyphicon-plus');
        };
        //$(event.target).toggleClass('glyphicon-minus', 'glyphicon-plus');
        //console.log(event);
        //alert($(event.target).attr('aria-expanded'));
        //$(event.target).removeClass('glyphicon-plus');
        //$(event.target).addClass('glyphicon-minus');
        
    };
}]);