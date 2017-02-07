(function() {
    'use strict';
    angular
        .module('educationStudentApp')
        .factory('Courses', Courses);

    Courses.$inject = ['$resource'];

    function Courses ($resource) {
        var resourceUrl =  'gradesmanager/' + 'api/courses/:id';

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
