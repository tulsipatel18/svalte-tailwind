<script>
  // jQuery(function ($) {
  //   var url = "https://silverlight.store/checkout/?add-to-cart=",
  //     vid = 'input[name="variation_id"]',
  //     pid = 'input[name="product_id"]',
  //     qty = "input.qty",
  //     button = "a.custom-checkout-btn";
  //   cart_pro = "1";

  //   // Once DOM is loaded
  //   setTimeout(function () {
  //     if ($(vid).val() != "" && 0 < cart_pro) {
  //       $(button).attr("href", url + $(vid).val() + "&quantity=0");
  //     } else {
  //       $(button).attr(
  //         "href",
  //         url + $(vid).val() + "&quantity=" + $(qty).val()
  //       );
  //     }
  //   }, 2000);

  //   // On input/change quantity event
  //   $(qty).on("input change", function () {
  //     if ($(vid).val() != "" && 0 < cart_pro) {
  //       $(button).attr("href", url + $(vid).val() + "&quantity=0");
  //     } else {
  //       $(button).attr(
  //         "href",
  //         url + $(vid).val() + "&quantity=" + $(this).val()
  //       );
  //     }
  //   });

  //   // On select attribute field change event
  //   $(".variations_form").on("click", "table.variations select", function () {
  //     setTimeout(function () {
  //       if ($(vid).val() != "" && 0 < cart_pro) {
  //         $(button).attr("href", url + $(vid).val() + "&quantity=0");
  //       } else {
  //         $(button).attr(
  //           "href",
  //           url + $(vid).val() + "&quantity=" + $(qty).val()
  //         );
  //       }
  //     }, 2000);
  //   });
  // });

  // jQuery(function ($) {
  //   $(".xzoom,.xzoom-gallery").xzoom({
  //     zoomWidth: 400,
  //     tint: "#333",
  //     xoffset: "15",
  //   });
  // });

  let color, type, quantity, size, total;
  let sizechart = false;
  $: console.log(sizechart);

  const handleCart = () => {
    total = 79 * quantity;
    window.alert(
      `color : ${color}  , type : ${type}  , quantity : ${quantity}  , size : ${size}  ,  price : ${total}`
    );
  };
</script>

<div class="main-container">
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
  <div class="container-1080">
    <div class="w-50 socks-slider-wrapper container">
      <div class="w-100">
        <div class="w-100 xzoom-container">
          <!-- <img
        src="https://silverlight.store/wp-content/uploads/2020/03/crew-3-pack.jpg"
        alt=""
        xriginal="https://silverlight.store/wp-content/uploads/2020/03/crew-3-pack.jpg"
        class="w-100 d-none"
      /> -->
          <img
            src="./images/crew-1-c.jpg"
            alt=""
            xoriginal="./images/crew-1.jpg"
            class="w-100 xzoom"
          />
        </div>
        <div class="xzoom-thumbs">
          <a href="./images/crew-1.jpg">
            <img
              class="xzoom-gallery"
              src="./images/crew-1-c.jpg"
              xpreview="./images/crew-1-c.jpg"
              alt=""
            /></a
          >
          <a href="./images/crew-2.jpg">
            <img
              class="xzoom-gallery"
              src="./images/crew-2-c.jpg"
              xpreview="./images/crew-2-c.jpg"
              alt=""
            /></a
          >
          <a href="./images/crew-3.jpg">
            <img class="xzoom-gallery" src="./images/crew-3-c.jpg" alt="" /></a
          >
          <a href="./images/crew-4.jpg">
            <img class="xzoom-gallery" src="./images/crew-4-c.jpg" alt="" /></a
          >
          <a href="./images/crew-5.jpg">
            <img class="xzoom-gallery" src="./images/crew-5-c.jpg" alt="" /></a
          >
          <a href="./images/crew-6.jpg">
            <img class="xzoom-gallery" src="./images/crew-6-c.jpg" alt="" /></a
          >
        </div>
        <!-- <div class="d-flex thumb">
      <div class="row">
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2020/03/crew-3-pack-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/crew-2-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/crew-6-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/crew-3-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/crew-4-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="w-25">
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/crew-5-100x100.jpg"
            alt=""
            class="w-100"
          />
        </div>
      </div>
    </div> -->
      </div>
    </div>
    <div class="w-50 silver-hiking-socks-wrapper">
      <h1 class="font-bold" style="font-size: 27.2px; margin-bottom: 20px;">
        SILVERLIGHT HIKING SOCKS
      </h1>
      <span
        class="stamped-badge rating-container"
        data-rating="4.8"
        data-lang=""
        aria-label="Rated 4.8 out of 5 stars 493reviews"
        ><span
          class="stamped-starrating stamped-badge-starrating"
          aria-hidden="true"
          ><i class="stamped-fa stamped-fa-star" aria-hidden="true" /><i
            class="stamped-fa stamped-fa-star"
            aria-hidden="true"
          /><i class="stamped-fa stamped-fa-star" aria-hidden="true" /><i
            class="stamped-fa stamped-fa-star"
            aria-hidden="true"
          /><i class="stamped-fa stamped-fa-star" aria-hidden="true" /></span
        ><span
          class="stamped-badge-caption"
          data-reviews="493"
          data-rating="4.8"
          data-label="reviews"
          aria-label="493 reviews"
          data-version="2">493<span style="display:none;"> reviews</span></span
        ></span
      >
      <span
        ><ul class="socks-description">
          <li>
            <a href="https://silverlight.store/about/#tab_our-technology"
              >Silverlight® Technology</a
            > for odor-free hiking with silver coated threads that never wash out.
          </li>
          <li>
            Blister-Blasting. Fast-Drying. Silky-Smooth Compression Comfort.
            Long-Lasting Durability.
          </li>
          <li>
            For every pair sold, we <a
              href="https://silverlight.store/about/#tab_sustainability"
              >plant a tree</a
            >
          </li>
          <li>
            <a href="https://silverlight.store/about/#tab_lifetime-guarantee"
              >Lifetime Guarantee</a
            >
          </li>
          <li>Includes Wash &amp; Care Guide</li>
          <li>
            40% <a href="https://silverlight.store/about/#tab_materials"
              >Nylon</a
            >, 53%
            <a href="https://silverlight.store/about/#tab_materials"
              >New Zealand Merino Wool</a
            >, 5%
            <a href="https://silverlight.store/about/#tab_materials"
              >Silver Yarn</a
            >, 2%
            <a href="https://silverlight.store/about/#tab_materials">Spandex</a>
          </li>
        </ul>
      </span>
      <div class="">
        <table class="socks-selection" cellspacing="0">
          <tbody>
            <tr>
              <td class=""><label for="pa_color">COLOR</label></td>

              <td class="">
                <ul role="radiogroup" aria-label="Color" class="d-flex">
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          color = "black";
                        }}>Black</button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          color = "blue";
                        }}>Blue</button
                      >
                    </div>
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td class="label"><label for="type">TYPE</label></td>
              <td class="">
                <ul role="radiogroup" aria-label="type" class="d-flex">
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          type = "ankle";
                        }}>Ankle</button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          type = "crew";
                        }}>Crew</button
                      >
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="label"><label for="quantity">QUANTITY</label></td>
              <td class="">
                <select
                  style="display:none"
                  id="quantity"
                  class=""
                  name="attribute_quantity"
                  ><option value="">Choose an option</option><option
                    value="1 Pack">1 Pack</option
                  ><option value="3 Pack" selected="selected">3 Pack</option
                  ><option value="5 Pack">5 Pack</option></select
                >
                <ul role="radiogroup" aria-label="quantity" class="d-flex">
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          quantity = 1;
                        }}>1 Pack</button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          quantity = 3;
                        }}>3 Pack</button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="">
                      <button
                        class=""
                        on:click={() => {
                          quantity = 5;
                        }}>5 Pack</button
                      >
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <div class="d-flex justify-content-between">
              <tr>
                <td class="label"><label for="pa_size">SIZE</label></td>

                <td class="">
                  <ul role="radiogroup" aria-label="Size" class="d-flex">
                    <li>
                      <div class="">
                        <button
                          class=""
                          on:click={() => {
                            size = "s";
                          }}>S</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class=""
                          on:click={() => {
                            size = "m";
                          }}>M</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class=""
                          on:click={() => {
                            size = "l";
                          }}>L</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class=""
                          on:click={() => {
                            size = "xl";
                          }}>XL</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class=""
                          on:click={() => {
                            size = "xxl";
                          }}>XXL</button
                        >
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
              <div class="chart-text">
                <p>
                  <a
                    class="popmake-9356 pum-trigger"
                    href
                    style="cursor: pointer;"
                    on:click|preventDefault={() => {
                      sizechart = !sizechart;
                    }}>Size Chart</a
                  >
                </p>
              </div>
            </div>
          </tbody>
        </table>
      </div>

      <div class="">
        <div class="d-flex my-4">
          <div class="price-wrapper">
            <p class="price product-page-price">
              <span class="price"
                ><span class=""
                  ><del aria-hidden="true">
                    <span class="">
                      <bdi>
                        <span class="">$</span>
                        96</bdi
                      >
                    </span>
                  </del>
                  <ins
                    ><span class=""><bdi><span class="">$</span>79</bdi></span
                    ></ins
                  ></span
                ></span
              >
            </p>
            <p class="save">save 18%</p>
          </div>
          <div class="quantity buttons_added d-flex round-pill">
            <!-- <span class="d-flex border round-pill"> -->
            <!-- <div class=""> -->
            <input type="button" value="-" class="minus button is-form" />
            <!-- </div> -->
            <!-- <div> -->
            <input
              type="number"
              id="quantity_63ef2fbd9a85e"
              class="input-text qty text"
              step="1"
              min="1"
              max="9999"
              name="quantity"
              value="1"
              title="Qty"
              size="4"
              pattern="[0-9]*"
              inputmode="numeric"
              aria-labelledby="Silverlight Hiking Socks quantity"
            />
            <!-- </div> -->
            <!-- <div> -->
            <input type="button" value="+" class="plus button is-form" />
            <!-- </div> -->
            <!-- </span> -->
          </div>
        </div>
        <button
          type="submit"
          class="add-to-cart-button button alt"
          on:click={handleCart}>ADD TO CART</button
        >
        <button class="checkout-button">
          <a
            href="https://silverlight.store/checkout/?add-to-cart=6977&amp;quantity=1"
            class=""
            >CHECKOUT &nbsp;<i
              class="fa fa-long-arrow-right"
              aria-hidden="true"
            /></a
          >
        </button>
      </div>
    </div>
    {#if sizechart}
      <div class="size-chart-center">
        <p class="text-right m-0"><span class="close-chart">X</span></p>
        <img
          src="https://silverlight.store/wp-content/uploads/2019/10/Size-chart2021-510x305.jpg"
          alt=""
        />
      </div>
    {/if}
  </div>
</div>

<style>
  .main-container {
    display: flex;
    justify-content: center;
  }

  .video-bg {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -99;
  }

  .container-1080 {
    display: flex;
    max-width: 1080px;
    background-color: #ffffff;
  }

  .socks-slider-wrapper {
    padding: 0 15px;
  }

  .silver-hiking-socks-wrapper {
    padding: 10px 15px 15px;
    line-height: 1.6;
  }

  .silver-hiking-socks-wrapper a {
    text-decoration: none;
  }

  .rating-container {
    color: #777777;
  }

  .socks-description {
    padding: 20px;
    color: #777777;
  }

  .socks-description a {
    color: #777777;
    text-decoration: none;
  }

  .socks-description a:hover {
    color: #1cb9a2;
    text-decoration: none;
  }

  .socks-selection {
    width: 100%;
  }

  .socks-selection ul {
    padding-left: 7px;
  }

  .socks-selection li {
    list-style: none;
    /* margin: 0 5px; */
    /* padding: 3px; */
    /* border: 1px solid;
    border-radius: 3px; */
    height: 37px;
    align-items: center;
    display: flex;
    min-width: 37px;
    justify-content: center;
  }

  .socks-selection button {
    margin: 0 5px;
    padding: 5px;
    border: 1px solid;
    border-radius: 3px;
    height: 37px;
    align-items: center;
    display: flex;
    min-width: 37px;
    justify-content: center;
  }

  .socks-selection button {
    margin: 0 5px;
    padding: 5px;
    border: 1px solid;
    border-radius: 3px;
    /* width: 40px; */
    background: white;
  }

  .socks-selection li span {
    padding: 0 5px;
  }

  .socks-selection tr {
    display: flex;
    align-items: baseline;
    font-size: 12px;
  }

  .socks-selection label {
    font-weight: 500;
    font-size: 12px;
    min-width: 60px;
  }

  /* .chart-text {
    margin-bottom: 1.5em;
  }

  .chart-text {
    position: absolute;
    right: 12px;
    top: -35px;
    margin: 0;
  } */

  .size-chart-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 0 20px 20px;
    box-shadow: 0 0 10px 0;
  }

  .close-chart{
    font-weight: 700;
    padding: 0 5px;
    position: relative;
    left: 15px;
  }

  .chart-text {
    margin-bottom: 10px;
    display: flex;
    align-items: end;
  }

  .chart-text a {
    color: #1cb9a2;
    font-weight: 600;
  }

  .chart-text a:hover {
    text-decoration: underline;
    color: #1cb9a2;
  }

  .add-to-cart-button {
    border-radius: 25px;
    background-color: black;
    color: #ffffff;
    padding: 5px 20px;
    font-weight: 600;
  }

  .checkout-button {
    border-radius: 25px;
    background-color: #1cb9a2;
    color: #ffffff;
    padding: 5px 20px;
    font-weight: 600;
  }

  .checkout-button a {
    color: #ffffff;
    text-decoration: none;
  }

  .xzoom-thumbs {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--rtwpvg-thumbnail-gap);
    display: grid !important;
    position: relative;
  }

  .xzoom-thumbs img {
    display: inline;
    height: 80px;
    width: 80px;
    /* border: 1px solid #ccc; */
    width: 100%;
    height: auto;
  }

  .price {
    font-size: 24px;
    margin: 0 20px 20px 0;
  }

  .quantity {
    height: 40px;
  }

  .minus {
    border-radius: 99px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .plus {
    border-radius: 99px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .qty {
    background-color: #f0f0f0;
    text-align: center;
    width: 40px;
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media screen and (max-width: 850px) {
    .container-1080 {
      display: block;
    }

    .socks-slider-wrapper {
      width: 100% !important;
    }

    .silver-hiking-socks-wrapper {
      width: 100% !important;
    }
  }
</style>
