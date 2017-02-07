(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('StudentsDialogController', StudentsDialogController);

    StudentsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Students', 'Field_of_study'];

    function StudentsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Students, Field_of_study) {
        var vm = this;

        vm.students = entity;
        vm.clear = clear;
        vm.save = save;
        vm.field_of_studies = Field_of_study.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.students.id !== null) {
                Students.update(vm.students, onSaveSuccess, onSaveError);
            } else {
                Students.save(vm.students, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('educationStudentApp:studentsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
