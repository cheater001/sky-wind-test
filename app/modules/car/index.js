var _ = require('lodash');

angular.module('car', [])
    .factory('Car', carFactory);

function carFactory() {
    var types = ['disabled', 'sedan', 'truck'];

    return {
        create: function(type) {
            var car = {
                type: type || types[_.random(0, 2)]
            };

            console.log('Created Car type: ' + car.type, car);

            return car;
        }
    }
}

module.exports = 'car';