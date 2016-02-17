import {Component, Inject} from 'fd-angular-core';
import TMPL from './mr-slides-angular.html!';

@Component({
    templateUrl: TMPL,
    replace: true,
    restrict: 'A',
    scope: {
        hasNavigation: '@',
        hasPagination: '@',
        images: '='
    }
})
@Inject('$scope')
export class MrSlidesController {
    constructor ($scope) {
        this.$scope = $scope;

        this.$scope.images = this.images;
        this.$scope.hasNavigation = !!(this.hasNavigation !== undefined);
        this.$scope.hasPagination = !!(this.hasPagination !== undefined);

        this.$scope.currentIndex = 0;

        this.$scope.setCurrentIndex = (newIndex) => {
            if (newIndex < 0) {
                newIndex = 0;
            }

            if (newIndex >= this.images.length) {
                newIndex = this.images.length - 1;
            }

            this.$scope.currentIndex = newIndex;
        }

        this.$scope.next = () => {
            this.$scope.setCurrentIndex(this.$scope.currentIndex + 1);
        }

        this.$scope.previous = () => {
            this.$scope.setCurrentIndex(this.$scope.currentIndex - 1);
        }
    }
}
