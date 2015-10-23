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
        this.slidesSelector = this.$el.data('slideshow-slides');
        this.$slides = this.$el.find(this.slidesSelector);
        this.navSelector = this.$el.data('slideshow-nav');
        this.$nav = $(this.navSelector);
        this.nextSelector = this.$el.data('slideshow-next');
        this.$next = this.$el.find(this.nextSelector);
        this.prevSelector = this.$el.data('slideshow-prev');
        this.$prev = this.$el.find(this.prevSelector);

        this.bind().init();
    }

    /**
     * Bind event handlers
     *
     * @return {Slideshow}
     */
    bind() {
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
    init() {
        let activeIdx = this.getCurrentIdx();

        if ( isNaN(activeIdx) ) {
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
    getCurrentIdx() {
        return parseInt(this.$el.data('slideshow-current-idx'), 10);
    }

    /**
     * Click handler nav item
     *
     * @param  {jQuery event} e
     */
    onClickNavItem(e) {
        let $currentTarget = $(e.currentTarget);
        let idx = this.$nav.find('a').index($currentTarget);

        this.to(idx);

        e.preventDefault();
    }

    /**
     * Handler next
     *
     * @param  {jQuery event} e
     */
    onNext(e) {
        let nextIdx = this.getCurrentIdx() + 1;

        if ( nextIdx > this.$slides.length - 1 ) {
            nextIdx = 0;
        }

        this.to(nextIdx);

        e.preventDefault();
    }

    onMouseDown(e) {
        this.$el.addClass('is-grabbing');
    }

    onMouseUp(e) {
        this.$el.removeClass('is-grabbing');
    }

    /**
     * Handler previous
     *
     * @param  {jQuery event} e
     */
    onPrev(e) {
        let prevIdx = this.getCurrentIdx() - 1;

        if ( prevIdx < 0 ) {
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
    to(idx) {
        // Set nav states
        this.$nav.find('a').removeClass('is-current');
        this.$nav.find('a').eq(idx).addClass('is-current');

        // Set slide states
        this.$slides.removeClass('is-current is-next is-prev is-next-1 is-next-2 is-prev-1 is-prev-2');
        this.$slides.each((slideIdx, slide) => {
            let $slide = $(slide);

            if ( idx === slideIdx ) {
                $slide.addClass('is-current');
                $slide.nextAll().addClass('is-next');
                 $slide.prevAll().addClass('is-prev');

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

        // Save current index
        this.$el.data('slideshow-current-idx', idx);
    }
}
