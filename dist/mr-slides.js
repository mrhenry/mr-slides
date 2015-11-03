(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.mrSlides = mod.exports;
    }
})(this, function (exports, module) {
    /**
     * @class
     * Slideshow
     */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var MrSlides = (function () {

        /**
         * @constructor
         *
         * @param  {jQuery element} $el
         */

        function MrSlides($el) {
            _classCallCheck(this, MrSlides);

            this.$el = $el;
            this.slidesSelector = this.$el.data('mr-slides-slides');
            this.$slides = this.$el.find(this.slidesSelector);
            this.navSelector = this.$el.data('mr-slides-nav');
            this.$nav = $(this.navSelector);
            this.nextSelector = this.$el.data('mr-slides-next');
            this.$next = this.$el.find(this.nextSelector);
            this.prevSelector = this.$el.data('mr-slides-prev');
            this.$prev = this.$el.find(this.prevSelector);

            this.bind().init();
        }

        /**
         * Bind event handlers
         *
         * @return {Slideshow}
         */

        _createClass(MrSlides, [{
            key: 'bind',
            value: function bind() {
                if (this.$slides.length < 2) {
                    return this;
                }

                this.$nav.on('click.mrSlides', 'a', $.proxy(this.onClickNavItem, this));
                this.$next.on('click.mrSlides', $.proxy(this.onNext, this));
                this.$prev.on('click.mrSlides', $.proxy(this.onPrev, this));
                this.$el.on('swipeleft', $.proxy(this.onNext, this));
                this.$el.on('swiperight', $.proxy(this.onPrev, this));
                this.$el.on('mousedown', $.proxy(this.onMouseDown, this));
                this.$el.on('mouseup', $.proxy(this.onMouseUp, this));

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
                var _this = this;

                var activeIdx = this.getCurrentIdx();

                // Set initial first slide
                if (isNaN(activeIdx)) {
                    this.to(0);
                } else {
                    this.to(activeIdx);
                }

                // Set class when not enough slides
                if (this.$slides.length < 2) {
                    this.$el.addClass('has-not-enough-slides');
                    this.$nav.addClass('has-not-enough-slides');
                }

                // Set ready class with delay
                // Fixes problem when your slides have a transition and you don't want
                // to transition in initialization
                setTimeout(function () {
                    _this.$el.addClass('is-ready');
                }, this.getReadyDelay);

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
                return parseInt(this.$el.data('mr-slides-current-idx'), 10);
            }

            /**
             * Get ready delay
             *
             * As the delay can be depending on transitions of slide or pane, it's more
             * solid to set this manually.
             *
             * @return {Integer}
             */
        }, {
            key: 'getReadyDelay',
            value: function getReadyDelay() {
                var delay = parseInt(this.$el.data('mr-slides-ready-delay'), 10);

                if (isNaN(delay)) {
                    delay = 0;
                }

                return delay;
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
            value: function onNext() {
                var e = arguments.length <= 0 || arguments[0] === undefined ? jQuery.Event() : arguments[0];

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
            value: function onPrev() {
                var e = arguments.length <= 0 || arguments[0] === undefined ? jQuery.Event() : arguments[0];

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
                var _this2 = this;

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
                    } else if (idx + 1 === slideIdx || idx + 1 - _this2.$slides.length === slideIdx) {
                        $slide.addClass('is-next-1');
                    } else if (idx + 2 === slideIdx || idx + 2 - _this2.$slides.length === slideIdx) {
                        $slide.addClass('is-next-2');
                    } else if (idx - 1 === slideIdx || idx - 1 + _this2.$slides.length === slideIdx) {
                        $slide.addClass('is-prev-1');
                    } else if (idx - 2 === slideIdx || idx - 2 + _this2.$slides.length === slideIdx) {
                        $slide.addClass('is-prev-2');
                    }
                });

                // Save current index
                this.$el.data('mr-slides-current-idx', idx);
            }
        }]);

        return MrSlides;
    })();

    module.exports = MrSlides;
});