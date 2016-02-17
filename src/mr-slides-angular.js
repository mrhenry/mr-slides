import {Component, Inject} from 'fd-angular-core';
import TMPL from './mr-slides-angular.html!html';

@Component({
    templateUrl: TMPL,
    replace: true,
    restrict: 'A',
    scope: {
        hasNavigation: '@',
        hasPagination: '@',
        intervalDelay: '=',
        images: '='
    }
})
@Inject('$scope')
export class MrSlidesController {
    constructor ($scope) {
        this.intervalId = null;
        this.$scope = $scope;

        this.$scope.images = this.images;
        this.$scope.hasNavigation = !!(this.hasNavigation !== undefined);
        this.$scope.hasPagination = !!(this.hasPagination !== undefined);
        this.$scope.intervalDelay = this.intervalDelay || false;

        this.$scope.currentIndex = 0;

        this.$scope.setCurrentIndex = (newIndex) => {
            if (newIndex < 0) {
                newIndex = this.images.length - 1;
            }

            if (newIndex >= this.images.length) {
                newIndex = 0;
            }

            this.$scope.currentIndex = newIndex;
        }

        this.$scope.next = () => {
            this.$scope.setCurrentIndex(this.$scope.currentIndex + 1);
        }

        this.$scope.previous = () => {
            this.$scope.setCurrentIndex(this.$scope.currentIndex - 1);
        }

        /**
         * Start interval
         */
        this.$scope.start = () => {
            this.intervalId = setInterval(() => {
                this.$scope.next();
            }, this.intervalDelay);
        }

        /**
         * Stop interval
         */
        this.$scope.stop = () => {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if (this.$scope.intervalDelay) {
            this.$scope.start();
        }
    }
}
