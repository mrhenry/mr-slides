import MrSlides from 'mrhenry/mr-slides';

export default class MrSlidesHorizontal extends MrSlides {

    bind() {
        super.bind();

        this.$slides.on('movestart', function(e) {
            // Fixes slide drag with link
        });
        this.$slides.on('move', $.proxy(this.onMove, this));
        this.$slides.on('moveend', $.proxy(this.onMoveEnd, this));

        return this;
    }

    onMove(e) {
        let $slide = $(e.currentTarget);
        let left = 100 * e.distX / $(window).width() / 5;

        $slide.css({
            transform: 'translateX(' + left + '%)'
        });

        if (e.distX < 0) {
            $slide.next().css({
                transform: 'translateX(' + (100 + left) + '%)'
            });
        }

        if (e.distX > 0) {
            $slide.prev().css({
                transform: 'translateX(' + (left - 100) + '%)'
            });
        }
    }

    onMoveEnd() {
        this.$slides.css({
            'transform': ''
        });
    }
}
