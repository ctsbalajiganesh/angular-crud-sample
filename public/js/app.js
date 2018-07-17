var studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsListController', function StudentsListController($scope, $http){
    $scope.currentPage = 0;
    $scope.viewSize = 5;
    $scope.editFormFlag = false;
    $scope.editId = '';
    $scope.displayId = '';
    
    $scope.getStudentsList = function() {
        $http({
            method: 'GET',
            url: '/list'
        }).then(function (response){
            $scope.students = response.data;
        },function (error){
            console.log('Error: ' + error);
        });
    }

    $scope.submitForm = function() {

        if ($scope.editFormFlag) {
            const updateData = {
                _id: $scope.editId,
                displayId: $scope.displayId,
                name: $scope.name,
                dob: $scope.dateOfBirth,
            }
            $http({
                method: 'POST',
                url: '/list/update',
                data: updateData,
            }).then(function (response){
                if (response.status === 204) {
                    $scope.getStudentsList();
                }
            },function (error){
                console.log('Error: ' + error);
            });
            $scope.editFormFlag = false;
        } else {
            const studentsData = $scope.students;
            const dataLength = ('0'+($scope.students.length+1)).slice(-2);
            const newData = {
                displayId: `S${dataLength}`,
                name: $scope.name,
                dob: $scope.dateOfBirth,
            }
            studentsData.push(newData);
            $scope.students = studentsData;
        }
        $scope.resetForm();
    }

    $scope.resetForm = function() {
        $scope.name = '';
        $scope.dateOfBirth = '';
    }

    $scope.editForm = function(id) {
        const currentItem = $scope.students.find(function(item) {
            return item._id == id;
        });
        $scope.name = currentItem.name;
        $scope.dateOfBirth = currentItem.dob;
        $scope.editFormFlag = true;
        $scope.editId = currentItem._id;
        $scope.displayId = currentItem.displayId;
    }

    $scope.deleteItem = function(id) {
        const deleteData = {
            body: {
                id,
            }
        }
        $http({
            method: 'DELETE',
            url: '/list/' + id,
        }).then(function (response){
            if (response.status === 204) {
                $scope.getStudentsList();
            }
        },function (error){
            console.log('Error: ' + error);
        });
    }

    $scope.getStudentsList();
});

studentsApp.filter('pagination', function() {
    return function(input, start)
    {
     start = +start;
     return input.slice(start);
    };
});

