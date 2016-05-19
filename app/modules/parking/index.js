var _ = require('lodash');

require('./stylesheets/index.sass');

angular.module('parking', [])
    .directive('parking', parkingDirective)
    .directive('place', placeDirective)
    .factory('Parking', parkingFactory);

function parkingDirective() {
    return {
        restrict: 'A',
        template: require('./templates/parking.html'),
        link: postLink,
        controller: require('./controllers/parking'),
        require: 'parking'
    };

    function postLink(scope, element, attrs, ParkingCtrl) {
        ParkingCtrl.create();

        scope.onPlaceClick = function(place) {
        };
        
        scope.create = function() {
            ParkingCtrl.create(true);
        };
        scope.park = function() {
            ParkingCtrl.park();
        };
        scope.parkMyCar = function(type) {
            ParkingCtrl.park(type);
        };
    }
}

function placeDirective() {
    return {
        restrict: 'A',
        template: require('./templates/place.html'),
        link: postLink,
        controller: require('./controllers/place'),
        require: 'place'
    };

    function postLink(scope, element, attrs, PlaceCtrl) {
        scope.clear = function() {
            PlaceCtrl.clear.apply(null, arguments);
        }
    }
}

function parkingFactory() {
    var map;

    return {
        createMap: function(isNew) {
            if (isNew) {
                localStorage.removeItem('parkingMap');
            }

            return map = JSON.parse(localStorage.getItem('parkingMap')) || createRandomMap();
        },
        getMap: function() {
            return map;
        }
    };

    function createRandomMap() {
        var map = [],
            total = 10,
            disabled = 2,
            place,
            places = [
                function() {
                    this.name = 'disabled';
                    this.restrict = ['disabled'];
                },
                function() {
                    this.name = 'sedan';
                    this.restrict = ['disabled', 'sedan'];
                },
                function() {
                    this.name = 'truck';
                    this.restrict = ['disabled', 'truck', 'sedan'];
                }
            ];

        while (total) {
            if (disabled) {
                place = new places[_.random(0, 2)]();
            } else {
                place = new places[_.random(1, 2)]();
            }

            if (place.name == 'disabled') {
                --disabled;
            }

            map.push(place);

            --total;
        }

        console.log(map);

        return map;
    }
}

module.exports = 'parking';