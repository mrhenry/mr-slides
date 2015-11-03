# mr-slides
Basic &amp; flexible slideshow where the logic is in JS &amp; the fun in CSS

## How to use

```
<div
  class="mr-slides js-slideshow"
  data-mr-slides-current-idx="0"
  data-mr-slides-ready-delay="500"
  data-mr-slides-nav="#unique-bullet-nav"
  data-mr-slides-slides=".mr-slides__slide">

  <div class="mr-slides__slide">
    <div clss="mr-slides__slide__background"></div>
    <div class="mr-slides__slide__content">
      Slide A
    </div>
  </div>

  <div class="mr-slides__slide">
    <div clss="mr-slides__slide__background"></div>
    <div class="mr-slides__slide__content">
      Slide B
    </div>
  </div>
</div>

<div id="unique-bullet-nav" class="bullet-nav">
  <ul class="bullet-nav__list">
    <li class="bullet-nav__item">
      <a href="#">
        go to a
      </a>
    </li>
    <li class="bullet-nav__item">
      <a href="#">
        go to b
      </a>
    </li>
  </ul>
</div>
```

## Angular usage
See [issue #1](https://github.com/mrhenry/mr-slides/issues/1).

## Dev

```
$ npm install
$ gulp
```
