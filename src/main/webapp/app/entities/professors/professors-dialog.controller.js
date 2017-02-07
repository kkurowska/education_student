(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('ProfessorsDialogController', ProfessorsDialogController);

    ProfessorsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Professors'];

    function ProfessorsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Professors) {
        var vm = this;

        vm.professors = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.professors.id !== null) {
                Professors.update(vm.professors, onSaveSuccess, onSaveError);
            } else {
                Professors.save(vm.professors, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('educationStudentApp:professorsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
