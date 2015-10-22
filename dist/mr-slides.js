'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('skatejs/src/skate');

/**
 * Skate module
 */
skate('js-slideshow', {
    attached: function attached(el) {
        new Slideshow($(el));
    },
    type: skate.type.CLASSNAME
});

/**
 * @class
 * Slideshow
 */

var Slideshow = (function () {

    /**
     * @constructor
     *
     * @param  {jQuery element} $el
     */

    function Slideshow($el) {
        _classCallCheck(this, Slideshow);

        this.$el = $el;
        this.slidesSelector = this.$el.data('slideshow-slides');
        this.$slides = this.$el.find(this.slidesSelector);
        this.navSelector = this.$el.data('slideshow-nav');
        this.$nav = $(this.navSelector);
        this.nextSelector = this.$el.data('slideshow-next');
        this.$next = this.$el.find(this.nextSelector);
        this.prevSelector = this.$el.data('slideshow-prev');
        this.$prev = this.$el.find(this.prevSelector);

        // Ratio of distance over target finger must travel to be
        // considered a swipe.
        // https://github.com/stephband/jquery.event.swipe/blob/master/js/jquery.event.swipe.js#L13
        jQuery.event.special.swipe.settings.threshold = 0.1;

        this.bind().init();
    }

    /**
     * Bind event handlers
     *
     * @return {Slideshow}
     */

    _createClass(Slideshow, [{
        key: 'bind',
        value: function bind() {
            this.$nav.on('click.slideshow', 'a', $.proxy(this.onClickNavItem, this));
            this.$next.on('click.slideshow', $.proxy(this.onNext, this));
            this.$prev.on('click.slideshow', $.proxy(this.onPrev, this));
            this.$el.on('swipeleft', $.proxy(this.onNext, this));
            this.$el.on('swiperight', $.proxy(this.onPrev, this));
            this.$el.on('mousedown', $.proxy(this.onMouseDown, this));
            this.$el.on('mouseup', $.proxy(this.onMouseUp, this));
            //        this.$el.on('move', function(e) {
            //            console.log(e.startX, e.deltaX);
            //        });

            return this;
        }

        /**
         * Initialize instance
         *
         * @return {Slideshow}
         */
    }, {
        key: 'init',
        value: function init() {
            var activeIdx = this.getCurrentIdx();

            if (isNaN(activeIdx)) {
                this.to(0);
            } else {
                this.to(activeIdx);
            }

            return this;
        }

        /**
         * Get current index
         *
         * @return {Integer}
         */
    }, {
        key: 'getCurrentIdx',
        value: function getCurrentIdx() {
            return parseInt(this.$el.data('slideshow-current-idx'), 10);
        }

        /**
         * Click handler nav item
         *
         * @param  {jQuery event} e
         */
    }, {
        key: 'onClickNavItem',
        value: function onClickNavItem(e) {
            var $currentTarget = $(e.currentTarget);
            var idx = this.$nav.find('a').index($currentTarget);

            this.to(idx);

            e.preventDefault();
        }

        /**
         * Handler next
         *
         * @param  {jQuery event} e
         */
    }, {
        key: 'onNext',
        value: function onNext(e) {
            var nextIdx = this.getCurrentIdx() + 1;

            if (nextIdx > this.$slides.length - 1) {
                nextIdx = 0;
            }

            this.to(nextIdx);

            e.preventDefault();
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            this.$el.addClass('is-grabbing');
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            this.$el.removeClass('is-grabbing');
        }

        /**
         * Handler previous
         *
         * @param  {jQuery event} e
         */
    }, {
        key: 'onPrev',
        value: function onPrev(e) {
            var prevIdx = this.getCurrentIdx() - 1;

            if (prevIdx < 0) {
                prevIdx = this.$slides.length - 1;
            }

            this.to(prevIdx);

            e.preventDefault();
        }

        /**
         * Go to slide
         *
         * @param  {Integer} idx The index of the image that will become active
         */
    }, {
        key: 'to',
        value: function to(idx) {
            var _this = this;

            // Set nav states
            this.$nav.find('a').removeClass('is-current');
            this.$nav.find('a').eq(idx).addClass('is-current');

            // Set slide states
            this.$slides.removeClass('is-current is-next is-prev is-next-1 is-next-2 is-prev-1 is-prev-2');
            this.$slides.each(function (slideIdx, slide) {
                var $slide = $(slide);

                if (idx === slideIdx) {
                    $slide.addClass('is-current');
                    $slide.nextAll().addClass('is-next');
                    $slide.prevAll().addClass('is-prev');
                } else if (idx + 1 === slideIdx || idx + 1 - _this.$slides.length === slideIdx) {
                    $slide.addClass('is-next-1');
                } else if (idx + 2 === slideIdx || idx + 2 - _this.$slides.length === slideIdx) {
                    $slide.addClass('is-next-2');
                } else if (idx - 1 === slideIdx || idx - 1 + _this.$slides.length === slideIdx) {
                    $slide.addClass('is-prev-1');
                } else if (idx - 2 === slideIdx || idx - 2 + _this.$slides.length === slideIdx) {
                    $slide.addClass('is-prev-2');
                }
            });

            // Save current index
            this.$el.data('slideshow-current-idx', idx);
        }
    }]);

    return Slideshow;
})();

exports['default'] = Slideshow;
module.exports = exports['default'];