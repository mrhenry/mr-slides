import { Component, Inject } from 'fd-angular-core';
import TMPL from './mr-slides.html!';
import TMPL_FALLBACK from './mr-slides-slide.html!';

@Component({
    templateUrl: TMPL,
    replace: true,
    scope: {
        slides: '=mrSlides',
        slideTemplate: '@',
        currentIndex: '=?current',
        _hasNavigation: '@?hasNavigation',
        _hasPagination: '@?hasPagination',
    },
    restrict: 'A',
})
@Inject('$element', '$timeout', '$scope')
class MrSlidesController {

    constructor($element, $timeout, $scope) {
        this.$element = $element;
        this.$scope = $scope;

        if (typeof this.currentIndex !== 'number') {
            this.currentIndex = 0;
        }
    }

    get hasNavigation() {
        return !(typeof this._hasNavigation === 'undefined');
    }

    get hasPagination() {
        return !(typeof this._hasPagination === 'undefined');
    }

    get className() {
        return (this.slideTemplate === TMPL_FALLBACK) ? 'default' : this.slideTemplate;
    }

    get slides() {
        return this._slides;
    }

    set slides(slides) {
        this._slides = slides;
    }

    get slideTemplate() {
        return this._slideTemplate || TMPL_FALLBACK;
    }

    set slideTemplate(to) {
        if (!!to && typeof to === 'string') {
            this._slideTemplate = to;
        }
    }

    get currentIndex() {
        return this._currentIndex;
    }

    set currentIndex(to) {
        if (typeof to === 'number') {
            if (to < 0) {
                to = this.slides.length - 1;
            } else if (to >= this.slides.length) {
                to = 0;
            }

            this._currentIndex = to;
        }
    }

}
