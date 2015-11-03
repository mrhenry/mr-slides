import MrSlides from 'mrhenry/mr-slides';

export default class MrSlidesHorizontal extends MrSlides {

    /**
     * Bind drag events
     *
     * @return {Slideshow}
     */
    bind() {
        super.bind();

        if ( this.$slides.length < 2 ) {
            return this;
        }

        this.$slides.on('movestart', () => {
            // Fixes slide drag when element is a link
        });
        this.$slides.on('move', $.proxy(this.onMove, this));
        this.$slides.on('moveend', $.proxy(this.onMoveEnd, this));

        return this;
    }

    /**
     * Move handler
     *
     * @param  {jQuery event} e
     */
    onMove(e) {
        let $slide = $(e.currentTarget);
        let left = 100 * e.distX / $(window).width() / 5;

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
    onMoveEnd(e) {
        this.$slides.css({
            'transform': ''
        });
    }
}
