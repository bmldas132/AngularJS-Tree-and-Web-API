/// <reference path="../angular.js" />

app.controller('treeController', ['$scope','$window', 'treeService', function ($scope,$window, treeService) {

    $scope.newNode = {};
    $scope.editNode = {};
    var url = "/api/Tables";
    $scope.res = [];

    $scope.GetCategory = function () {
        treeService.GetCategory(url).then(function (data) {
            $scope.response = data.data;
            $scope.res = $scope.getNestedChildren($scope.response, "00000000-0000-0000-0000-000000000000");
        }, function () {
            $window.alert("Could not load the data.");
        });
    };

    $scope.GetCategory();

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

    $scope.Select = function (target) {
        $scope.selectedItem = target;
    };

    $scope.CopySelectedItem = function () {
        $scope.editNode = {
            Id:$scope.selectedItem.Id,
            Name: $scope.selectedItem.Name,
            ParentId: $scope.selectedItem.ParentId
        };
    };

    $scope.AddNode = function () {
        if ($scope.IsToParent == true) {
            $scope.newNode = {
                ParentId: "00000000-0000-0000-0000-000000000000",
                Name: $scope.newNode.Name
            };
        }
        else {
            $scope.newNode = {
                ParentId: $scope.selectedItem.Id,
                Name: $scope.newNode.Name
            };
        };

        //console.log($scope.newNode);
        var postUrl = "/api/Tables";
        treeService.PostCategory(postUrl,$scope.newNode).then(function () {
            swal("Success!", "Added Successfully!", "success");
            $scope.GetCategory();
        }, function () {
            swal("Failed!", "Please try again", "error");
        });
        
    };

    $scope.UpdateNode = function () {
        
        console.log($scope.newNode);
        var updateUrl = "/api/Tables";
        treeService.UpdateCategory(updateUrl,$scope.editNode.Id, $scope.editNode).then(function () {
            swal("Success!", "Updated Successfully!", "success");
            $scope.GetCategory();
        }, function () {
            swal("Failed!", "Please try again", "error");
        });
    };

    $scope.DeleteNode = function () {

        console.log($scope.newNode);
        var deleteUrl = "/api/Tables";
        treeService.DeleteCategory(deleteUrl, $scope.selectedItem.Id).then(function () {
            swal("Success!", "Deleted Successfully!", "success");
            $scope.GetCategory();
        }, function () {
            swal("Failed!", "Please try again", "error");
        });

    };

}]);