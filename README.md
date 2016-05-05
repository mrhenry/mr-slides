# mr-slides
Basic &amp; flexible slideshow where the logic is in JS &amp; the fun in CSS

## How to use

### Regular HTML/JS/CSS setup

```
<div
  class="mr-slides js-slideshow"
  data-mr-slides-current-idx="0"
  data-mr-slides-interval-delay="3000"
  data-mr-slides-nav="#unique-bullet-nav"
  data-mr-slides-ready-delay="500"
  data-mr-slides-slides=".mr-slides__slide">

  <div class="mr-slides__slide">
    <div class="mr-slides__slide__background"></div>
    <div class="mr-slides__slide__content">
      Slide A
    </div>
  </div>

  <div class="mr-slides__slide">
    <div class="mr-slides__slide__background"></div>
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

### Angular.js

There's an Angular.js port with the same approach.

Import `src/ng/mr-slides`, which exposes an `mr-slides` directive.

#### Basic usage

```
<div mr-slides="gallery.images"></div>
```

In which `gallery.images` is an array of strings that will get passed to `mr-haraway` directive.

#### Custom slides

You can override the default slide template by adding a `<script type="text/ng-template">` tag with an `id` and then passing the same `id` as to `mr-slides` through the `slide-template` argument.

You can also externally control the current index from another controller by passing an reference or number through the `current` attribute.

```
<div ng-init="myExternalCounter = 0">

  <a ng-click="myExternalCounter = myExternalCounter - 1">Previous</a><br />
  Current: {{ myExternalCounter }}<br />
  <a ng-click="myExternalCounter = myExternalCounter + 1">Next</a>

  <script type="text/ng-template" id="my-slide">
    {{ slide.title }}
  </script>

  <div
    mr-slides="[ { title: 'Jan' }, { title: 'Piet' }, { title: 'Joris' }, { title: 'Korneel' } ]"
    slide-template="my-slide"
    current="myExternalCounter"
  ></div>
</div>
```

## Events

On change an event is triggered on the slide elements.

```
/* @param {Object} state
 *
 * {
 *   current: boolean
 * }
 *
 */
$('.mr-slides__slide').on('mrSlides.stateChange', function(e, state) {
  if (state.current) {
    // This slide is now active
  } else {
    // This slide isn't active anymore
  }
});
```

## Angular usage
See [issue #1](https://github.com/mrhenry/mr-slides/issues/1).

## Dev

```
$ npm install
$ gulp
```
