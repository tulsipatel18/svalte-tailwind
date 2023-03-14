<video
  class="video-bg"
  preload="playsinline"
  autoplay
  muted="muted"
  loop
  style="opacity: 1;"
  id="video"
>
  <source
    src="https://silverlight.store/wp-content/uploads/2019/01/mountainclip-bg720p-final.mp4"
    type="video/mp4"
  />
</video>

<style>
  .video-bg {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -99;
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media screen and (max-width: 850px) {
    .video-bg {
      background: -webkit-linear-gradient(
        top,
        #2b6079 50%,
        #000 50%
      ) !important;
      background-image: linear-gradient(
        to bottom,
        #2b6079,
        #2b6079 50%,
        black 50%
      ) !important;
    }
  }
</style>
