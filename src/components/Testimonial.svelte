<script>
  let player;
  let showVideo = function () {
    let videoOverlay = document.getElementById("video-overlay");
    videoOverlay.style.display = "flex";
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: "uxyMqq6Puuw",
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onStateChange: function (event) {
          if (event.data == YT.PlayerState.ENDED) {
            hideVideo();
          }
        },
      },
    });
  };

  let hideVideo = function () {
    if (player) {
      player.pauseVideo();
      player.destroy();
      player = null;
    }
    let videoOverlay = document.getElementById("video-overlay");
    videoOverlay.style.display = "none";
  };
</script>

<div>
  <h2 style="text-align: center;font-size:25px;color:#555555">
    PEOPLE LOVE US
  </h2>
  <div class="testimonial-slider d-flex">
    <div id="" class="testimonial-container" style="padding-right:15px;">
      <div class="author-image">
        <img
          src="https://silverlight.store/wp-content/uploads/2020/01/Deanna-Vickers-optimized.jpg"
          alt=""
        />
        <span class="tool">Testimonial 3</span>
      </div>

      <div class="testimonials-text flex-grow-1">
        <p>
          "The fit and feel is just what I was hoping for. I have worn them to
          the gym twice and 2 hikes of around 5-7 miles each. They smell and
          feel as fresh as when I received them. On a scale of 1- to 10 with 10
          being best I would give them an 11! <span class="il">Love</span
          >&nbsp;<span class="il">everything</span> about this sock."
        </p>
      </div>
      <div class="author-name">
        <strong>Deana Vickers</strong>
      </div>

      <div class="testimonial-rate">
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
      </div>
    </div>
    <div id="" class="testimonial-container" style="padding:0 7.5px 0 7.5px;">
      <div class="author-image">
        <img
          src="https://silverlight.store/wp-content/uploads/2020/01/Andy-Politz-optimized.jpg"
          alt=""
        />
        <span class="tool">Testimonial 2</span>
      </div>
      <div class="testimonials-text flex-grow-1">
        <p>
          "I'm not sure if I had ever had a sock match a walker's needs so well:
          stay in place, cushioning, comfort... In my 45 years of adventure
          activities. They are a highly valued innovation and will be on my feet
          from here on out. I have a new favorite gift for friends!"
        </p>
      </div>
      <div class="author-name">
        <strong>Andy Politz</strong>
      </div>

      <div class="testimonial-rate">
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
      </div>
    </div>
    <div id="" class="testimonial-container" style="padding-left:15px;">
      <div class="author-image">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src="https://silverlight.store/wp-content/uploads/2020/01/Guy-Vennero-optimizied.jpg"
          alt="img"
          on:click|preventDefault={showVideo}
          class="image-testimonial"
        />
        <div id="video-overlay" class="overlay">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span id="close-button" on:click|preventDefault={hideVideo}>X</span>
          <div id="player" />
        </div>

        <span class="play-icon">
          <img src="./images/play-icon.png" alt="" />
        </span>
        <!-- </a> -->
        <span class="tool">Testimonial 1</span>
      </div>
      <div class="testimonials-text flex-grow-1">
        <p>
          "I wore them every single days for 7 days on the trail. I never washed
          them and they do not smell. I'm a fan, I think these are great socks.
          They were pretty dry most of the time and they dry out quick if we had
          to go through stream, so good job. I love them."
        </p>
      </div>
      <div class="author-name">
        <strong>Guy Vennero</strong>
      </div>

      <div class="testimonial-rate">
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
        <i class="fa-sharp fa-solid fa-star" />
      </div>
    </div>
  </div>
</div>

<style>
  .testimonial-slider {
    margin-top: 40px;
  }

  .testimonial-container {
    width: 33.33%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .author-image {
    position: relative;
  }

  .author-image img {
    width: 100%;
  }

  .testimonials-text {
    padding: 20px 0;
    font-size: 15px;
    color: #777777;
  }

  .testimonials-text p {
    margin: 0;
  }

  .author-name {
    font-size: 16px;
  }

  .testimonial-rate {
    color: gold;
    padding: 10px 0;
  }

  .testimonial-rate i {
    width: 16px;
    height: 16px;
  }

  .play-icon {
    position: absolute;
    background: url(https://silverlight.store/wp-content/uploads/2019/10/play-icon.png)
      center center no-repeat;
    background-size: 50px 50px !important;
    top: 0;
    width: 50px;
    height: 50px;
    left: 50%;
    margin-left: -25px;
    top: 50%;
    margin-top: -25px;
  }

  .play-icon img {
    max-width: 50px;
    max-height: 50px;
  }

  .tool {
    visibility: hidden;
    font-size: 10px;
    position: absolute;
    right: 10%;
    top: 80%;
    border: 1px solid;
    background: #ffffff;
    padding: 5px;
    text-decoration: none;
  }

  .author-image:hover .tool {
    visibility: visible;
  }

  .image-testimonial {
    cursor: pointer;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
  }

  #player {
    width: 640px;
    height: 360px;
  }

  #close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

   @media screen and (max-width: 620px) {
    .testimonial-slider {
      display: block !important;
    }
    .testimonial-container {
      width: 100%;
    }
  }
</style>
