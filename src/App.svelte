<script>
  import jQuery from "jquery";
  import { onMount } from "svelte";
  export let blackCrewSocksImages;
  export let blackCrewSocksImagesThreePack;
  export let blackCrewSocksImagesFivePack;
  export let blackAnkleSocksImages;
  export let blackAnkleSocksImagesThreePack;
  export let blackAnkleSocksImagesFivePack;
  export let blueCrewSocksImages;
  export let blueAnkleSocksImages;
  let color,
    type,
    quantity,
    size,
    total,
    qty = 1,
    sizechart = false;
  let price = 79;

  color = localStorage.getItem("color");
  type = localStorage.getItem("type");
  quantity = localStorage.getItem("quantity");
  size = localStorage.getItem("size");
  total = localStorage.getItem("total");

  const handleCart = () => {
    localStorage.setItem("color", color);
    localStorage.setItem("type", type);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("size", size);
    localStorage.setItem("total", total);

    total = 79 * quantity * qty;
    window.alert(
      `color : ${color}  , type : ${type}  , quantity : ${quantity}  , size : ${size}  ,  price : ${total}`
    );
  };
  onMount(() => {
    jQuery(".slider-single").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      useTransform: false,
    });

    jQuery(".slider-nav").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: ".slider-single",
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      draggable: false,
    });
          });

  const handleqty = () => {
    qty += 1;
  };
  const handleqtydec = () => {
    if (qty != 1) {
      qty -= 1;
    }
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
  <div style="max-width:1080px" class="w-100">
    <div class="navbar justify-content-end">
      <a href="https://silverlight.store/cart/">
        <li class="cart-item">
          <span class="cart-icon">
            <strong>0</strong>
          </span>
        </li>
      </a>
    </div>
    <div class="container-1080">
      <div class="w-50 socks-slider-wrapper container">
        <div class="black-crew">
          <div class="slider slider-single opacity-100">
            {#each blackCrewSocksImages as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackCrewSocksImages as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-crew-three-pack d-none">
          <div class="slider slider-single opacity-100">
            {#each blackCrewSocksImagesThreePack as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackCrewSocksImagesThreePack as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-crew-five-pack d-none">
          <div class="slider slider-single opacity-100">
            {#each blackCrewSocksImagesFivePack as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackCrewSocksImagesFivePack as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-ankle d-none">
          <div class="slider slider-single opacity-100">
            {#each blackAnkleSocksImages as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackAnkleSocksImages as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-ankle-three-pack d-none">
          <div class="slider slider-single opacity-100">
            {#each blackAnkleSocksImagesThreePack as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackAnkleSocksImagesThreePack as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-ankle-five-pack d-none">
          <div class="slider slider-single opacity-100">
            {#each blackAnkleSocksImagesFivePack as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blackAnkleSocksImagesFivePack as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-crew d-none">
          <div class="slider slider-single opacity-100">
            {#each blueCrewSocksImages as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blueCrewSocksImages as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
        </div>
        <div class="black-ankle d-none">
          <div class="slider slider-single opacity-100">
            {#each blueAnkleSocksImages as image}
              <div class="slider slider-single">
                <img class="opacity-100" src={image.largeImg} alt="" />
              </div>
            {/each}
          </div>
          <div class="slider slider-nav">
            {#each blueAnkleSocksImages as image}
              <div class="thumb-image">
                <img src={image.thumbImg} alt="" />
              </div>
            {/each}
          </div>
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
          >
            <i class="fa-solid fa-star star" />
            <i class="fa-solid fa-star star" />
            <i class="fa-solid fa-star star" />
            <i class="fa-solid fa-star star" />
            <i class="fa-solid fa-star star" />
          </span>
          <span
            class="stamped-badge-caption"
            data-reviews="493"
            data-rating="4.8"
            data-label="reviews"
            aria-label="493 reviews"
            data-version="2">493 <span> reviews</span></span
          ></span
        >
        <span
          ><ul class="socks-description flex">
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
            <li class="text-yellow-400">Includes Wash &amp; Care Guide</li>
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
              <a href="https://silverlight.store/about/#tab_materials"
                >Spandex</a
              >
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
                          class={color === "black" ? "selected" : ""}
                          on:click={() => {
                            color = "black";
                          }}>Black</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class={color === "blue" ? "selected" : ""}
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
                          class={type === "ankle" ? "selected" : ""}
                          on:click={() => {
                            type = "ankle";
                          }}>Ankle</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class={type === "crew" ? "selected" : ""}
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
                  <ul role="radiogroup" aria-label="quantity" class="d-flex">
                    <li>
                      <div class="">
                        <button
                          class={quantity === 1 ? "selected" : ""}
                          on:click={() => {
                            quantity = 1;
                          }}>1 Pack</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class={quantity === 3 ? "selected" : ""}
                          on:click={() => {
                            quantity = 3;
                          }}>3 Pack</button
                        >
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <button
                          class={quantity === 5 ? "selected" : ""}
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
                            class={size === "s" ? "selected" : ""}
                            on:click={() => {
                              size = "s";
                            }}>S</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="borde">
                          <button
                            class={size === "m" ? "selected" : ""}
                            on:click={() => {
                              size = "m";
                            }}>M</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={size === "l" ? "selected" : ""}
                            on:click={() => {
                              size = "l";
                            }}>L</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={size === "xl" ? "selected" : ""}
                            on:click={() => {
                              size = "xl";
                            }}>XL</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={size === "xxl" ? "selected" : ""}
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
          <div class="">
            <div class="d-flex" style="margin:12px 0 15px 0">
              <div class="price-wrapper">
                <p class="price product-page-price">
                  <span class="price"
                    ><span class=""
                      ><del aria-hidden="true">
                        <span class="original-price">
                          <bdi>
                            <span>$</span>
                            96</bdi
                          >
                        </span>
                      </del>
                      <ins
                        ><span class="sale-price"
                          ><bdi><span>$</span>{price}</bdi></span
                        ></ins
                      ></span
                    ></span
                  >
                </p>
                <p class="save">save 18%</p>
              </div>
              <div class="quantity buttons_added d-flex round-pill">
                <input
                  type="button"
                  value="-"
                  class="minus button is-form"
                  on:click={handleqtydec}
                />
                <input
                  type="number"
                  id="quantity_63ef2fbd9a85e"
                  class="input-text qty text"
                  step="1"
                  min="1"
                  max="15"
                  name="quantity"
                  bind:value={qty}
                  title="Qty"
                  size="4"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  aria-labelledby="Silverlight Hiking Socks quantity"
                />
                <input
                  type="button"
                  value="+"
                  class="plus button is-form"
                  on:click={handleqty}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="add-to-cart-button button alt mr-2"
                on:click={handleCart}>ADD TO CART</button
              >
              <button class="checkout-button">
                <a
                  href="https://silverlight.store/checkout/?add-to-cart=6977&amp;quantity=1"
                  class=""
                  >CHECKOUT<i
                    class="fa fa-long-arrow-right mx-2"
                    aria-hidden="true"
                  /></a
                >
              </button>
            </div>
          </div>
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
    {#if sizechart}
      <div class="size-chart-center">
        <p class="text-right m-0" style="cursor: pointer;">
          <span
            class="close-chart"
            on:click={() => {
              sizechart = false;
            }}>X</span
          >
        </p>
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

  .silver-hiking-socks-wrapper {
    padding: 10px 15px 15px;
    line-height: 1.6;
  }

  .silver-hiking-socks-wrapper a {
    text-decoration: none;
  }

  .slider {
    opacity: 1 !important;
  }

  .slider img {
    opacity: 1 !important;
  }

  .slider-nav {
    display: grid;
  }

  .slick-list,
  .draggable {
    padding: 0px 0px !important;
  }

  .slick-track {
    width: 100%;
  }

  .thumb-image {
    min-width: 25%;
  }

  .rating-container {
    color: #777777;
  }

  .star {
    color: gold;
  }

  .socks-description {
    padding: 20px 0;
    color: #777777;
  }

  .socks-description ul {
    padding: 0 20px;
  }

  .socks-description li {
    margin: 0 0 10px 20px;
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

  .close-chart {
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

  .price {
    font-size: 24px;
    margin: 0 5px 0 0;
  }

  .original-price {
    color: #777777;
  }

  .sale-price {
    text-decoration: none;
  }

  .save {
    font-size: 24px;
    color: green;
    margin: 0;
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

  .selected {
    border: 2px solid #000000 !important;
  }

  .navbar li {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    margin: 0 7px;
    transition: background-color 0.3s;
    background-color: transparent;
    border: 2px solid #ffffff;
    width: 30px;
    height: 30px;
    margin: 10px 0 0 0;
    text-align: -webkit-right;
    justify-content: center;
    align-items: center;
  }

  .navbar li:hover {
    background-color: #ffffff;
    color: #777777;
  }

  .navbar a {
    color: #ffffff;
    text-decoration: none;
  }

  .cart-icon strong:after {
    transition: height 0.1s ease-out;
    bottom: 100%;
    margin-bottom: 0;
    margin-left: -7px;
    height: 8px;
    width: 14px;
    left: 50%;
    content: " ";
    position: absolute;
    pointer-events: none;
    border: 2px solid #ffffff;
    border-top-left-radius: 99px;
    border-top-right-radius: 99px;
    border-bottom: 0;
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
