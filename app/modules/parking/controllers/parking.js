Ctrl.$inject = ['$scope', 'Parking', 'Car'];
function Ctrl($scope, Parking, Car) {
    $scope.$watch(function() {
        return Parking.getMap();
    }, function(map) {
        var place,
            free = 0,
            occupied = 0;

        if (!map) {
            return;
        }
        
        $scope.total = map.length;
        
        for (var i = 0; i < map.length; ++i) {
            place = map[i]; 
            
            if (place.car) {
                ++occupied;
            } else {
                ++free;
            }
            
            $scope.free = free;
            $scope.occupied = occupied;
        }

        localStorage.setItem('parkingMap', JSON.stringify(map));
    }, true);

    this.create = function(isNew) {
        $scope.map = Parking.createMap(isNew);
    };
    
    this.park = function(type) {
        var place,
            map = Parking.getMap(),
            car = Car.create(type);

        for (var i = 0; i < map.length; ++i) {
            place = map[i];

            if (!place.car && place.restrict.indexOf(car.type) != -1) {
                place.car = car;
                return;
            }
        }

        console.warn('Car type ' + car.type + ' was not parked.');
    };
}

module.exports = Ctrl;