var studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsListController', function StudentsListController($scope, $http){
    $scope.currentPage = 0;
    $scope.viewSize = 5;
    
    $http({
        method: 'GET',
        url: '/list'
    }).then(function (response){
        $scope.students = response.data;
        console.log(response);
    },function (error){
        console.log('Error: ' + error);
    });

    $scope.submitForm = function() {
        const studentsData = $scope.students;
        const dataLength = ('0'+($scope.students.length+1)).slice(-2);
        const newData = {
            id: `S${dataLength}`,
            name: $scope.name,
            dob: $scope.dateOfBirth,
        }
        studentsData.push(newData);
        $scope.students = studentsData;
        $scope.resetForm();
    }

    $scope.resetForm = function() {
        $scope.name = '';
        $scope.dateOfBirth = '';
    }

    $scope.editForm = function(id) {
        const currentItem = $scope.students.find(function(item) {
            return item.id == id;
        });
        $scope.name = currentItem.name;
        $scope.dateOfBirth = currentItem.dob;
    }
});

studentsApp.filter('pagination', function() {
    return function(input, start)
    {
     start = +start;
     return input.slice(start);
    };
});

