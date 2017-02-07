(function() {
    'use strict';
    angular
        .module('educationStudentApp')
        .factory('Deanery', Deanery);

    Deanery.$inject = ['$resource'];

    function Deanery ($resource) {
        var resourceUrl =  'usermanager/' + 'api/deaneries/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
