(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('DeaneryDeleteController',DeaneryDeleteController);

    DeaneryDeleteController.$inject = ['$uibModalInstance', 'entity', 'Deanery'];

    function DeaneryDeleteController($uibModalInstance, entity, Deanery) {
        var vm = this;

        vm.deanery = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Deanery.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
