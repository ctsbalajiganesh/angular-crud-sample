var studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsListController', function StudentsListController($scope){
    $scope.currentPage = 0;
    $scope.viewSize = 5;
    $scope.students = [
        {
            id: 'S01',
            name: 'Ben',
            dob: '01/19/1994',
        },
        {
            id: 'S02',
            name: 'Jack',
            dob: '12/15/1995',
        },
        {
            id: 'S03',
            name: 'Mary',
            dob: '05/25/1994',
        },
        {
            id: 'S04',
            name: 'Tiffany',
            dob: '03/02/1996',
        },
        {
            id: 'S05',
            name: 'Beth',
            dob: '08/12/1995',
        },
        {
            id: 'S06',
            name: 'Tim',
            dob: '10/30/1995',
        },
    ];

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

