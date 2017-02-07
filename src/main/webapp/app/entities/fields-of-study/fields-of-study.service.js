(function() {
    'use strict';
    angular
        .module('educationStudentApp')
        .factory('Fields_of_study', Fields_of_study);

    Fields_of_study.$inject = ['$resource'];

    function Fields_of_study ($resource) {
        var resourceUrl =  'usermanager/' + 'api/fields-of-studies/:id';

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
