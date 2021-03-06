/**
 * @class
 * Slideshow
 */
export default class MrSlides {

    /**
     * @constructor
     *
     * @param  {jQuery element} $el
     */
    constructor($el) {
        this.$el = $el;
        this.slidesSelector = this.$el.data('mr-slides-slides');
        this.$slides = this.$el.find(this.slidesSelector);
        this.navSelector = this.$el.data('mr-slides-nav');
        this.$nav = $(this.navSelector);
        this.nextSelector = this.$el.data('mr-slides-next');
        this.$next = this.$el.find(this.nextSelector);
        this.prevSelector = this.$el.data('mr-slides-prev');
        this.$prev = this.$el.find(this.prevSelector);
        this.intervalDelay = this.$el.data('mr-slides-interval-delay');

        this.bind().init();
    }

    /**
     * Bind event handlers
     *
     * @return {Slideshow}
     */
    bind() {
        if ( this.$slides.length < 2 ) {
            return this;
        }

        this.$nav.on('click.mrSlides', 'a', $.proxy(this.onClickNavItem, this));
        this.$next.on('click.mrSlides', $.proxy(this.onNext, this));
        this.$prev.on('click.mrSlides', $.proxy(this.onPrev, this));
        this.$el.on('swipeleft', $.proxy(this.onNext, this));
        this.$el.on('swiperight', $.proxy(this.onPrev, this));
        this.$el.on('mousedown touchstart', $.proxy(this.onMouseDown, this));
        this.$el.on('mouseup touchend', $.proxy(this.onMouseUp, this));

        return this;
    }

    /**
     * Initialize instance
     *
     * @return {Slideshow}
     */
    init() {
        let activeIdx = this.getCurrentIdx();

        // Set initial first slide
        if ( isNaN(activeIdx) ) {
            this.to(0);

        } else {
            this.to(activeIdx);
        }

        // Set class when not enough slides
        if ( this.$slides.length < 2 ) {
            this.$el.addClass('has-not-enough-slides');
            this.$nav.addClass('has-not-enough-slides');
        }

        // Set ready class with delay
        // Fixes problem when your slides have a transition and you don't want
        // to transition in initialization
        setTimeout(() => {
            this.$el.addClass('is-ready');
        }, this.getReadyDelay());

        if (this.intervalDelay) {
            this.start();
        }

        return this;
    }

    /**
     * Get current index
     *
     * @return {Integer}
     */
    getCurrentIdx() {
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
    getReadyDelay() {
        let delay = parseInt(this.$el.data('mr-slides-ready-delay'), 10);

        if ( isNaN(delay) ) {
            delay = 0;
        }

        return delay;
    }

    /**
     * Click handler nav item
     *
     * @param  {jQuery event} e
     */
    onClickNavItem(e) {
        let $currentTarget = $(e.currentTarget);
        let idx = this.$nav.find('a').index($currentTarget);

        this.stop();
        this.to(idx);

        e.preventDefault();
    }

    /**
     * Handler next
     *
     * @param  {jQuery event} e
     */
    onNext(e = jQuery.Event()) {
        let nextIdx = this.getCurrentIdx() + 1;

        if ( nextIdx > this.$slides.length - 1 ) {
            nextIdx = 0;
        }

        this.to(nextIdx);

        e.preventDefault();
    }

    /**
     * Mouse down handler
     *
     * @param  {jQuery event} e
     */
    onMouseDown(e) {
        this.stop();
        this.$el.addClass('is-grabbing');
    }

    /**
     * Mouse up handler
     *
     * @param  {jQuery event} e
     */
    onMouseUp(e) {
        this.$el.removeClass('is-grabbing');
    }

    /**
     * Handler previous
     *
     * @param  {jQuery event} e
     */
    onPrev(e = jQuery.Event()) {
        let prevIdx = this.getCurrentIdx() - 1;

        if ( prevIdx < 0 ) {
            prevIdx = this.$slides.length - 1;
        }

        this.to(prevIdx);

        e.preventDefault();
    }

    /**
     * Start interval
     */
    start() {
        this.intervalId = setInterval(() => {
            this.onNext();
        }, this.intervalDelay);
    }

    /**
     * Stop interval
     */
    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    /**
     * Go to slide
     *
     * @param  {Integer} idx The index of the image that will become active
     */
    to(idx) {
        // Save current index
        this.$el.data('mr-slides-current-idx', idx);

        // Set nav states
        this.$nav.find('a').removeClass('is-current');
        this.$nav.find('a').eq(idx).addClass('is-current');

        // Set slide states
        this.$slides.removeClass('is-current is-next is-prev is-next-1 is-next-2 is-prev-1 is-prev-2');
        this.$slides.each((slideIdx, slide) => {
            let $slide = $(slide);

            if ( idx === slideIdx ) {
                $slide
                    .addClass('is-current')
                    .trigger('mrSlides.stateChange', { current: true });

                $slide.nextAll()
                    .addClass('is-next')
                    .trigger('mrSlides.stateChange', { current: false });

                $slide.prevAll()
                    .addClass('is-prev')
                    .trigger('mrSlides.stateChange', { current: false });

            } else if ( idx + 1 === slideIdx ||
                        idx + 1 - this.$slides.length === slideIdx ) {
                $slide.addClass('is-next-1');

            } else if ( idx + 2 === slideIdx ||
                        idx + 2 - this.$slides.length === slideIdx) {
                $slide.addClass('is-next-2');

            } else if ( idx - 1 === slideIdx ||
                        idx - 1 + this.$slides.length === slideIdx ) {
                $slide.addClass('is-prev-1');

            } else if ( idx - 2 === slideIdx ||
                        idx - 2 + this.$slides.length === slideIdx) {
                $slide.addClass('is-prev-2');

            }
        });
    }
}
