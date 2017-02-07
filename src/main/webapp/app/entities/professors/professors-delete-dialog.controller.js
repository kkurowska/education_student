(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('ProfessorsDeleteController',ProfessorsDeleteController);

    ProfessorsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Professors'];

    function ProfessorsDeleteController($uibModalInstance, entity, Professors) {
        var vm = this;

        vm.professors = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Professors.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
