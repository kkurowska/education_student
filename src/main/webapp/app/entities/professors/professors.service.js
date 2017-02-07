(function() {
    'use strict';
    angular
        .module('educationStudentApp')
        .factory('Professors', Professors);

    Professors.$inject = ['$resource'];

    function Professors ($resource) {
        var resourceUrl =  'usermanager/' + 'api/professors/:id';

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
