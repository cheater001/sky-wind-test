Ctrl.$inject = ['$scope'];
function Ctrl($scope) {
    this.clear = function(place) {
        delete place.car;
    }
}

module.exports = Ctrl;