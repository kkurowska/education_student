(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('CoursesDialogController', CoursesDialogController);

    CoursesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Courses', 'Professors'];

    function CoursesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Courses, Professors) {
        var vm = this;

        vm.courses = entity;
        vm.clear = clear;
        vm.save = save;
        vm.professors = Professors.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.courses.id !== null) {
                Courses.update(vm.courses, onSaveSuccess, onSaveError);
            } else {
                Courses.save(vm.courses, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('educationStudentApp:coursesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
