(function() {
    'use strict';
    angular
        .module('educationStudentApp')
        .factory('Students', Students);

    Students.$inject = ['$resource'];

    function Students ($resource) {
        var resourceUrl =  'usermanager/' + 'api/students/:id';

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
