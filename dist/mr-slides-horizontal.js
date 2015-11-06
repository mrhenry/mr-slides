(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', 'mrhenry/mr-slides'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('mrhenry/mr-slides'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.MrSlides);
        global.mrSlidesHorizontal = mod.exports;
    }
})(this, function (exports, module, _mrhenryMrSlides) {
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _MrSlides2 = _interopRequireDefault(_mrhenryMrSlides);

    var MrSlidesHorizontal = (function (_MrSlides) {
        _inherits(MrSlidesHorizontal, _MrSlides);

        function MrSlidesHorizontal() {
            _classCallCheck(this, MrSlidesHorizontal);

            _get(Object.getPrototypeOf(MrSlidesHorizontal.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(MrSlidesHorizontal, [{
            key: 'bind',

            /**
             * Bind drag events
             *
             * @return {Slideshow}
             */
            value: function bind() {
                _get(Object.getPrototypeOf(MrSlidesHorizontal.prototype), 'bind', this).call(this);

                if (this.$slides.length < 2) {
                    return this;
                }

                this.$slides.on('movestart', $.proxy(this.onMoveStart, this));
                this.$slides.on('move', $.proxy(this.onMove, this));
                this.$slides.on('moveend', $.proxy(this.onMoveEnd, this));

                return this;
            }

            /**
             * Move handler
             *
             * @param  {jQuery event} e
             */
        }, {
            key: 'onMove',
            value: function onMove(e) {
                var $slide = $(e.currentTarget);
                var left = 100 * e.distX / $(window).width() / 5;

                $slide.css({
                    transform: 'translateX(' + left + '%)'
                });

                if (e.distX < 0) {
                    $slide.next(this.slidesSelector).css({
                        transform: 'translateX(' + (100 + left) + '%)'
                    });
                }

                if (e.distX > 0) {
                    $slide.prev(this.slidesSelector).css({
                        transform: 'translateX(' + (left - 100) + '%)'
                    });
                }
            }

            /**
             * Move end handler
             *
             * @param  {jQuery event}
             */
        }, {
            key: 'onMoveEnd',
            value: function onMoveEnd(e) {
                this.$slides.css({
                    'transform': ''
                });
            }

            /**
              * Move start handler
              *
              * This prevents that vertical scroll gets blocked
              *
              * @param  {jQuery event} e
              */
        }, {
            key: 'onMoveStart',
            value: function onMoveStart(e) {
                if (Math.abs(e.deltaY) > 3) {
                    e.preventDefault();
                }
            }
        }]);

        return MrSlidesHorizontal;
    })(_MrSlides2['default']);

    module.exports = MrSlidesHorizontal;
});