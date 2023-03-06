<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import jQuery from "jquery";
  import { onMount } from "svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { beforeUpdate, afterUpdate } from "svelte";
  import Accordion from "./Accordion.svelte";

  export let blackCrewSocksImages;
  export let blackCrewSocksImagesThreePack;
  export let blackCrewSocksImagesFivePack;
  export let blackAnkleSocksImages;
  export let blackAnkleSocksImagesThreePack;
  export let blackAnkleSocksImagesFivePack;
  export let blueCrewSocksImages;
  export let blueAnkleSocksImages;

  let color,
    canvas = false,
    fprice = 25,
    discount = 0,
    discountedprice = 25,
    type,
    quantity = 1,
    size,
    total,
    qty = 1,
    sizechart = false;
  let photos = blackCrewSocksImages;
  let totalprice = 0;
  let currentimageid = 1;
  let img;

  color = localStorage.getItem("color");
  type = localStorage.getItem("type");
  quantity = localStorage.getItem("quantity");
  size = localStorage.getItem("size");

  $: orders = JSON.parse(localStorage.getItem("orders"));
  $: localStorage.setItem("orders", JSON.stringify(orders));
  $: handleprice(type, quantity);
  $: handlephotos(color, type, quantity);
  $: handlecarttotal(orders);
  $: handleimg(color, type, quantity);

  const handleimg = () => {
    if (color == "BLACK") {
      if (type == "ANKLE") {
        if (quantity == 1) {
          img = blackAnkleSocksImages[0].thumbImg;
        }
        if (quantity == 3) {
          img = blackAnkleSocksImagesThreePack[0].thumbImg;
        }
        if (quantity == 5) {
          img = blackAnkleSocksImagesFivePack[0].thumbImg;
        }
      }
      if (type == "CREW") {
        if (quantity == 1) {
          img = blackCrewSocksImages[0].thumbImg;
        }
        if (quantity == 3) {
          img = blackCrewSocksImagesThreePack[0].thumbImg;
        }
        if (quantity == 5) {
          img = blackCrewSocksImagesFivePack[0].thumbImg;
        }
      }
    }
    if (color == "BLUE") {
      if (type == "ANKLE") {
        img = blueAnkleSocksImages[0].thumbImg;
      }
      if (type == "CREW") {
        img = blueCrewSocksImages[0].thumbImg;
      }
    }
  };

  $: {
    console.log(orders), console.log(quantity);
  }

  beforeUpdate(() => {});

  afterUpdate(() => {});

  const handlecarttotal = () => {
    let total = 0;
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        total += order.discountedprice * order.qty;
      }
    }
    totalprice = total;
  };

  const handlephotos = () => {
    if (color == "BLACK") {
      if (type == "CREW") {
        if (quantity == 1) {
          photos = blackCrewSocksImages;
        }
        if (quantity == 3) {
          photos = blackCrewSocksImagesThreePack;
        }
        if (quantity == 5) {
          photos = blackCrewSocksImagesFivePack;
        }
      }
      if (type == "ANKLE") {
        if (quantity == 1) {
          photos = blackAnkleSocksImages;
        }
        if (quantity == 3) {
          photos = blackAnkleSocksImagesThreePack;
        }
        if (quantity == 5) {
          photos = blackAnkleSocksImagesFivePack;
        }
      }
    }
    if (color == "BLUE") {
      if (type == "CREW") {
        photos = blueCrewSocksImages;
      }
      if (type == "ANKLE") {
        photos = blueAnkleSocksImages;
      }
    }
  };

  const handleprice = () => {
    if (quantity == 1) {
      discount = 0;
    }
    if (quantity == 3) {
      discount = 21;
    }
    if (quantity == 5) {
      discount = 26;
    }
    if (type !== "undefined" && type == "ANKLE") {
      if (quantity == 1) {
        fprice = 25;
      }
      if (quantity == 3) {
        fprice = 75;
      }
      if (quantity == 5) {
        fprice = 125;
      }
    }
    if (type !== "undefined" && type == "CREW") {
      if (quantity == 1) {
        fprice = 32;
      }
      if (quantity == 3) {
        fprice = 96;
      }
      if (quantity == 5) {
        fprice = 160;
      }
    }
    discountedprice = fprice - (fprice * discount) / 100;
    discountedprice = Math.floor(discountedprice);
  };
  const handleCart = () => {
    localStorage.setItem("color", color);
    localStorage.setItem("type", type);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("size", size);
    //write calculation function again
    total = 0;
    let newOrder = {
      color,
      type,
      quantity,
      size,
      total,
      qty,
      img,
      discount,
      discountedprice,
      id: Math.random(),
    };
    let flag = false;

    if (orders) {
      // for (let i = 0; i < orders.length; i++) {
      //   let order = orders[i];
      //   if (
      //     order.color == color &&
      //     order.type == type &&
      //     order.quantity == quantity &&
      //     order.size == size
      //   ) {
      //     flag = true;
      //     order.qty += qty;
      //   }
      //   order = { ...order, id: Math.random() };
      // }
      // if (!flag) {
      // orders = [...orders, newOrder];
      // }
      orders = [...orders, newOrder];
    } else {
      orders = [newOrder];
    }

    // window.alert(
    //   `color : ${color}  , type : ${type}  , quantity : ${quantity}  , size : ${size}  ,  price : ${total}`
    // );
  };

  const handleDelete = (id) => {
    console.log(id);
    orders = orders.filter((order) => order.id !== id);
  };

  const handleqty = () => {
    qty += 1;
  };
  const handleqtydec = () => {
    if (qty != 1) qty -= 1;
  };

  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import "photoswipe/style.css";
  let galleryID = "my-test-gallery";

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

    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });

  import { initZoomy } from "./initZoomy";

  document.addEventListener("DOMContentLoaded", function () {
    var options = {
      zoomFactor: 2,
      class: "zoomy",
      direction: "both",
      cursor: true,
    };
    initZoomy(options);
  });
</script>

<!-- svelte-ignore missing-declaration -->

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

  <div style="max-width:1080px" class="w-100 m-auto">
    <!-- TOP Header -->
    <div class="">
      <div class="top-header">
        <ul class="text-center">
          <li class="text-white decoration-none">
            <a href="" class="text-white">Worldwide Free Shipping</a>
            ｜
            <a href="" class="text-white">Lifetime Guarantee</a>
          </li>
        </ul>
      </div>

      <div
        class="header w-100 d-flex justify-content-between align-items-center"
      >
        <div class="d-flex inner-header-left">
          <ul class="d-flex align-items-center">
            <li class="">
              <a
                href="https://silverlight.store/product/silverlight-socks/"
                class="">SOCKS</a
              >
            </li>
            <li class="">
              <a href="https://app.silverlight.store" class="">HIKE-TO-EARN</a>
            </li>
            <li class="">
              <a href="https://silverlight.store/about/" class="">ABOUT</a>
            </li>
            <li class="">
              <a href="https://silverlight.store/blog/" class="">BLOG</a>
            </li>
          </ul>
        </div>
        <div class="bar-icon">
          <i
            class="fa-solid fa-bars text-white"
            style="font-size: 25px;margin-top:5px"
          />
        </div>
        <div class="left-sidebar text-white">
          <button> x </button>
          <ul class="p-0">
            <li>
              <a
                href="https://silverlight.store/product/silverlight-socks/"
                class="nav-top-link">SOCKS</a
              >
            </li>
            <li>
              <a href="https://app.silverlight.store/" class="nav-top-link"
                >HIKE-TO-EARN</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/about/" class="nav-top-link"
                >ABOUT</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/help/" class="nav-top-link"
                >FAQ</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/blog/" class="nav-top-link"
                >BLOG</a
              >
            </li>
            <li>
              <a
                href="https://silverlight.store/account/"
                class="nav-top-link nav-top-not-logged-in"
              >
                <span class="header-account-title"> Login </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="inner-header-center d-flex align-items-center">
          <a
            href="https://silverlight.store/"
            title="Silverlight - Discover Something New Today"
          >
            <!-- <img
              width="150"
              height="100"
              src="https://silverlight.store/wp-content/uploads/2022/05/silverlight-logo-white.svg"
              class=""
              alt="Silverlight"
            /> -->
            <img
              width="150"
              height="41"
              src="https://silverlight.store/wp-content/uploads/2022/05/silverlight-logo-white.svg"
              class="header-logo-dark"
              alt="Silverlight"
            />
          </a>
        </div>

        <div class="inner-header-right">
          <ul class="d-flex align-items-center">
            <li class="">
              <a href="https://silverlight.store/help/#tab_faq">
                <i class="fa-regular fa-circle-question hide-icon" />
              </a>
            </li>
            <li class="">
              <a href="https://silverlight.store/account/" class="">
                <i class="fa-solid fa-user hide-icon" />
              </a>
            </li>
            <li class="cart-box py-2">
              <a
                href=""
                class="d1 py-2"
                on:click|preventDefault={() => (canvas = true)}
              >
                <li
                  class="cart-item"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <span class="cart-icon">
                    {#if orders}
                      <strong>{orders.length}</strong>
                    {:else}
                      <strong>{0}</strong>
                    {/if}
                  </span>
                </li>

                {#if totalprice != 0}
                  <div class="d2">
                    <div class="p-4 offcanvas-body">
                      <div style="max-height:500px;overflow-y:scroll">
                        {#each orders as order}
                          <div
                            class="cart-container d-flex justify-content-between"
                            style="margin-left: -15px;border-bottom: 1px solid #dee2e6;margin-top:10px"
                          >
                            <div>
                              <img
                                style="max-width: 100px;max-hight:100px"
                                src={order.img}
                                alt=""
                              />
                            </div>
                            <div
                              class="d-flex flex-column align-items-start"
                              style="color:#777777"
                            >
                              <div style="margin-bottom: 10px;margin:0 10px">
                                <div class="text-left">
                                  <h6>Silverlight Hiking Socks</h6>
                                </div>
                                <div class="text-left" style="font-size:13px">
                                  <span>COLOR : {order.color}</span>
                                  <span>TYPE : {order.type}</span>
                                  <span>QUANTITY : {order.quantity} </span>
                                  <span>PACK SIZE : {order.size}</span>
                                </div>

                                <div
                                  class="text-left"
                                  style="font-weight: bold; color: green; opacity: 0.8;"
                                  class:d-none={order.discount == 0}
                                >
                                  <span>Save {order.discount}%</span>
                                </div>

                                <div class="text-left">
                                  <span
                                    >{order.qty} x ${order.discountedprice}.00</span
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="d-block mr-1">
                              <button
                                class="rounded-circle remove-item-button"
                                on:click|preventDefault={() =>
                                  handleDelete(order.id)}>x</button
                              >
                            </div>
                          </div>
                        {/each}
                      </div>

                      <div
                        class="border border-right-0 border-left-0"
                        style="color:#777777"
                      >
                        <h6 style="padding:15px 0;margin:0">
                          Subtotal: ${totalprice}.00
                        </h6>
                      </div>
                      <div class="d-flex flex-column mt-3">
                        <button
                          class="text-light bg-dark font-weight-bold"
                          style="letter-spacing:1px">VIEW CART</button
                        >
                        <button
                          class="mt-2 text-light font-weight-bold"
                          style="background-color: {'#1cb9a2'}; letter-spacing:1px"
                          >GO TO CHECKOUT <i
                            class="fa fa-long-arrow-right mx-2"
                            aria-hidden="true"
                          /></button
                        >
                      </div>
                    </div>
                  </div>
                {/if}
              </a>
            </li>
            <li class="html custom html_top_right_text">
              <select class="select-currency">
                <option valuse="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option valuse="AUD">AUD</option>
                <option value="NZD">NZD</option>
                <option value="CAD">CAD</option>
                <option valuse="DKK">DKK</option>
                <option value="SEK">SEK</option>
                <option value="NOK">NOK</option>
                <option valuse="CHF">CHF</option>
                <option value="PLN">PLN</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="header w-100 d-flex justify-content-between align-items-center"
      >
        <div class="d-flex inner-header-left">
          <ul class="d-flex align-items-center">
            <li class="">
              <a
                href="https://silverlight.store/product/silverlight-socks/"
                class="">SOCKS</a
              >
            </li>
            <li class="">
              <a href="https://app.silverlight.store" class="">HIKE-TO-EARN</a>
            </li>
            <li class="">
              <a href="https://silverlight.store/about/" class="">ABOUT</a>
            </li>
            <li class="">
              <a href="https://silverlight.store/blog/" class="">BLOG</a>
            </li>
          </ul>
        </div>
        <div class="bar-icon">
          <i
            class="fa-solid fa-bars text-white"
            style="font-size: 25px;margin-top:5px"
          />
        </div>
        <div class="left-sidebar text-white">
          <button> x </button>
          <ul class="p-0">
            <li>
              <a
                href="https://silverlight.store/product/silverlight-socks/"
                class="nav-top-link">SOCKS</a
              >
            </li>
            <li>
              <a href="https://app.silverlight.store/" class="nav-top-link"
                >HIKE-TO-EARN</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/about/" class="nav-top-link"
                >ABOUT</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/help/" class="nav-top-link"
                >FAQ</a
              >
            </li>
            <li>
              <a href="https://silverlight.store/blog/" class="nav-top-link"
                >BLOG</a
              >
            </li>
            <li>
              <a
                href="https://silverlight.store/account/"
                class="nav-top-link nav-top-not-logged-in"
              >
                <span class="header-account-title"> Login </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="inner-header-center d-flex align-items-center">
          <a
            href="https://silverlight.store/"
            title="Silverlight - Discover Something New Today"
          >
            <!-- <img
              width="150"
              height="100"
              src="https://silverlight.store/wp-content/uploads/2022/05/silverlight-logo-white.svg"
              class=""
              alt="Silverlight"
            /> -->
            <img
              width="150"
              height="41"
              src="https://silverlight.store/wp-content/uploads/2022/05/silverlight-logo-white.svg"
              class="header-logo-dark"
              alt="Silverlight"
            />
          </a>
        </div>

        <div class="inner-header-right">
          <ul class="d-flex align-items-center">
            <li class="">
              <a href="https://silverlight.store/help/#tab_faq">
                <i class="fa-regular fa-circle-question hide-icon" />
              </a>
            </li>
            <li class="">
              <a href="https://silverlight.store/account/" class="">
                <i class="fa-solid fa-user hide-icon" />
              </a>
            </li>
            <li class="cart-box py-2">
              <a
                href=""
                class="d1 py-2"
                on:click|preventDefault={() => (canvas = true)}
              >
                <li
                  class="cart-item"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <span class="cart-icon">
                    {#if orders}
                      <strong>{orders.length}</strong>
                    {:else}
                      <strong>{0}</strong>
                    {/if}
                  </span>
                </li>

                {#if totalprice != 0}
                  <div class="d2">
                    <div class="p-4 offcanvas-body">
                      <div style="max-height:500px;overflow-y:scroll">
                        {#each orders as order}
                          <div
                            class="cart-container d-flex justify-content-between"
                            style="margin-left: -15px;border-bottom: 1px solid #dee2e6;margin-top:10px"
                          >
                            <div>
                              <img
                                style="max-width: 100px;max-hight:100px"
                                src={order.img}
                                alt=""
                              />
                            </div>
                            <div
                              class="d-flex flex-column align-items-start"
                              style="color:#777777"
                            >
                              <div style="margin-bottom: 10px;margin:0 10px">
                                <div class="text-left">
                                  <h6>Silverlight Hiking Socks</h6>
                                </div>
                                <div class="text-left" style="font-size:13px">
                                  <span>COLOR : {order.color}</span>
                                  <span>TYPE : {order.type}</span>
                                  <span>QUANTITY : {order.quantity} </span>
                                  <span>PACK SIZE : {order.size}</span>
                                </div>

                                <div
                                  class="text-left"
                                  style="font-weight: bold; color: green; opacity: 0.8;"
                                  class:d-none={order.discount == 0}
                                >
                                  <span>Save {order.discount}%</span>
                                </div>

                                <div class="text-left">
                                  <span
                                    >{order.qty} x ${order.discountedprice}.00</span
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="d-block mr-1">
                              <button
                                class="rounded-circle remove-item-button"
                                on:click|preventDefault={() =>
                                  handleDelete(order.id)}>x</button
                              >
                            </div>
                          </div>
                        {/each}
                      </div>

                      <div
                        class="border border-right-0 border-left-0"
                        style="color:#777777"
                      >
                        <h6 style="padding:15px 0;margin:0">
                          Subtotal: ${totalprice}.00
                        </h6>
                      </div>
                      <div class="d-flex flex-column mt-3">
                        <button
                          class="text-light bg-dark font-weight-bold"
                          style="letter-spacing:1px">VIEW CART</button
                        >
                        <button
                          class="mt-2 text-light font-weight-bold"
                          style="background-color: {'#1cb9a2'}; letter-spacing:1px"
                          >GO TO CHECKOUT <i
                            class="fa fa-long-arrow-right mx-2"
                            aria-hidden="true"
                          /></button
                        >
                      </div>
                    </div>
                  </div>
                {/if}
              </a>
            </li>
            <li class="html custom html_top_right_text">
              <select class="select-currency">
                <option valuse="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option valuse="AUD">AUD</option>
                <option value="NZD">NZD</option>
                <option value="CAD">CAD</option>
                <option valuse="DKK">DKK</option>
                <option value="SEK">SEK</option>
                <option value="NOK">NOK</option>
                <option valuse="CHF">CHF</option>
                <option value="PLN">PLN</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- HOME / SOCKS -->
    <div class="home-socks">
      <a class="text-white" href="https://silverlight.store">HOME</a>
      <span class="divider text-white">/</span>
      <a
        class="text-white"
        href="https://silverlight.store/product-category/socks/">SOCKS</a
      >
    </div>
    {#if totalprice != 0 && canvas == true}
      <div
        transition:fly={{ x: 200, duration: 200 }}
        class="sidebar offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header d-flex align-items-center">
          <div class="w-100 text-center">
            <h5
              class="offcanvas-title"
              id="offcanvasRightLabel"
              style="letter-spacing: 1px;"
            >
              CART
            </h5>
            <div class="is-divider mr-auto ml-auto" />
          </div>
        </div>
        <button
          on:click|preventDefault={() => {
            canvas = false;
          }}
          type="button"
          class="btn-close sidebar-close d-flex align-items-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close">X</button
        >
        <div class="offcanvas-body">
          <div>
            {#each orders as order}
              <div
                class="cart-container d-flex justify-content-between"
                style="border-bottom: 1px solid #dee2e6;margin: 10px 10px 0 0;"
              >
                <div>
                  <img
                    style="max-width: 60px;max-height:60px"
                    src={order.img}
                    alt=""
                  />
                </div>
                <div
                  class="d-flex flex-column align-items-start"
                  style="color:#777777"
                >
                  <div style="margin-bottom: 10px;margin:0 10px">
                    <div class="text-left">
                      <h6>Silverlight Hiking Socks</h6>
                    </div>
                    <div class="text-left" style="font-size:13px">
                      <span>COLOR : {order.color}</span>
                      <span>TYPE : {order.type}</span>
                      <span>QUANTITY : {order.quantity} </span>
                      <span>PACK SIZE : {order.size}</span>
                    </div>

                    <div
                      class="text-left"
                      style="font-weight: bold; color: green; opacity: 0.8;"
                      class:d-none={order.discount == 0}
                    >
                      <span>Save {order.discount}%</span>
                    </div>

                    <div class="text-left">
                      <span>{order.qty} x ${order.discountedprice}.00</span>
                    </div>
                  </div>
                </div>
                <div class="d-block mr-1">
                  <button
                    class="rounded-circle remove-item-button"
                    on:click|preventDefault={() => handleDelete(order.id)}
                    >x</button
                  >
                </div>
              </div>
            {/each}
          </div>

          <div
            class="border border-right-0 border-left-0"
            style="color:#777777"
          >
            <h6 style="padding:15px 0;margin:0">
              Subtotal: ${totalprice}.00
            </h6>
          </div>
          <div class="d-flex flex-column mt-3">
            <button
              class="text-light bg-dark font-weight-bold"
              style="letter-spacing:1px">VIEW CART</button
            >
            <button
              class="mt-2 text-light font-weight-bold d-flex align-items-center justify-content-center"
              style="background-color: {'#1cb9a2'}; letter-spacing:1px"
            >
              GO TO CHECKOUT
              <i class="fa fa-long-arrow-right ml-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    {/if}
    <div class="container-1080">
      <div class="socks-container">
        <div class="w-50 socks-slider-wrapper container">
          <div class="">
            <div
              transition:fade={{ duration: 10 }}
              class="slider slider-single opacity-100"
            >
              {#each photos as image}
                <div
                  class="slider slider-single"
                  on:click|preventDefault={() => {
                    currentimageid = image.id;
                  }}
                >
                  <div class="pswp-gallery tmp " id={galleryID}>
                    <a
                      href={image.largeImg}
                      data-pswp-width={1875}
                      data-pswp-height={2000}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span class="magnifier">
                        <i class="fa-solid fa-magnifying-glass" />
                      </span>
                    </a>
                    <figure class="zoomy zoom-image">
                      <img
                        class="opacity-100 w-100 tmp slider-nav "
                        src={image.largeImg}
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              {/each}
            </div>

            <div class="slider slider-nav" class:d-none={color == "BLUE"}>
              {#each photos as image}
                <div
                  class="thumb-image"
                  on:click|preventDefault={() => {
                    currentimageid = image.id;
                  }}
                >
                  <img
                    class="opactiy-50"
                    class:slider-nav-img={currentimageid == image.id}
                    src={image.thumbImg}
                    alt=""
                  />
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
                > for odor-free hiking with silver coated threads that never wash
                out.
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
                <a
                  href="https://silverlight.store/about/#tab_lifetime-guarantee"
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
                            class={color == "BLACK" ? "selected" : ""}
                            on:click={() => {
                              (color = "BLACK"), (currentimageid = 1);
                            }}>Black</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={color == "BLUE" ? "selected" : ""}
                            on:click={() => {
                              (color = "BLUE"), (currentimageid = 1);
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
                            class={type == "ANKLE" ? "selected" : ""}
                            on:click={() => {
                              (type = "ANKLE"), (currentimageid = 1);
                            }}>Ankle</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={type == "CREW" ? "selected" : ""}
                            on:click={() => {
                              (type = "CREW"), (currentimageid = 1);
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
                            class={quantity == 1 ? "selected" : ""}
                            on:click={() => {
                              (quantity = 1), (currentimageid = 1);
                            }}>1 Pack</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={quantity == 3 ? "selected" : ""}
                            on:click={() => {
                              (quantity = 3), (currentimageid = 1);
                            }}>3 Pack</button
                          >
                        </div>
                      </li>
                      <li>
                        <div class="">
                          <button
                            class={quantity == 5 ? "selected" : ""}
                            on:click={() => {
                              (quantity = 5), (currentimageid = 1);
                            }}>5 Pack</button
                          >
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
                <div class="d-flex justify-content-between size-div">
                  <tr>
                    <td class="label"><label for="pa_size">SIZE</label></td>

                    <td class="">
                      <ul role="radiogroup" aria-label="Size" class="d-flex">
                        <li>
                          <div class="">
                            <button
                              class={size == "S" ? "selected" : ""}
                              on:click={() => {
                                (size = "S"), (currentimageid = 1);
                              }}>S</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="borde">
                            <button
                              class={size == "M" ? "selected" : ""}
                              on:click={() => {
                                (size = "M"), (currentimageid = 1);
                              }}>M</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="">
                            <button
                              class={size == "L" ? "selected" : ""}
                              on:click={() => {
                                (size = "L"), (currentimageid = 1);
                              }}>L</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="">
                            <button
                              class={size == "XL" ? "selected" : ""}
                              on:click={() => {
                                (size = "XL"), (currentimageid = 1);
                              }}>XL</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="">
                            <button
                              class={size == "XXL" ? "selected" : ""}
                              on:click={() => {
                                (size = "XXL"), (currentimageid = 1);
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
            <div class="price-container">
              <div
                class="d-flex price-sub-container"
                style="margin:12px 0 15px 0"
              >
                <div class="price-wrapper ">
                  <p class="price product-page-price">
                    <span class="price">
                      <span class="">
                        <del aria-hidden="true">
                          <span class="">
                            {#if discount != 0}
                              <span><span class="">$</span>{fprice}</span>
                            {/if}
                          </span>
                        </del>
                        <ins style="text-decoration: none;">
                          <span>
                            ${discountedprice}
                          </span>
                        </ins>
                      </span>
                    </span>
                  </p>

                  {#if discount != 0}
                    <p class="save">Save {discount}%</p>
                  {/if}
                </div>
                <div class="quantity d-flex round-pill">
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
      </div>

      {#if sizechart}
        <div transition:fade={{ duration: 200 }} class="size-chart-center">
          <p class="text-right m-0"><span class="close-chart">X</span></p>
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/Size-chart2021-510x305.jpg"
            alt=""
          />
        </div>
      {/if}

      <!-- Facility container -->
      <div
        class="facility-container d-flex justify-content-between align-items-center"
      >
        <div
          class="single-facility d-flex justify-content-center align-items-center"
          style="padding:0 15px 15px"
        >
          <div class="facility-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background:new 0 0 512 512;"
              xml:space="preserve"
              width="512px"
            >
              <path
                d="M512,281.26l-47.73-75.66H352v102.54h-26.75V128.72h-24.82c6.4-13.91,5.85-30.7-2.94-44.57    c-6.67-10.55-17.06-17.86-29.24-20.6c-12.18-2.73-24.69-0.56-35.24,6.12c-4.42,2.81-11.22,8.57-21.85,26.18    c-10.63-17.61-17.43-23.37-21.85-26.18c-10.55-6.68-23.06-8.85-35.24-6.12c-12.18,2.74-22.57,10.05-29.25,20.6    c-8.78,13.87-9.33,30.66-2.94,44.57H97.07v179.42H0v88.46h31.28c-0.02,0.5-0.03,1-0.03,1.5c0,28.4,23.1,51.5,51.5,51.5    s51.5-23.1,51.5-51.5c0-0.5-0.01-1-0.03-1.5h243.56c-0.02,0.5-0.03,1-0.03,1.5c0,28.4,23.1,51.5,51.5,51.5    c28.4,0,51.5-23.1,51.5-51.5c0-0.5-0.01-1-0.03-1.5H512V281.26z M295.25,158.72v149.42H254V158.72H295.25z M249.06,95.01    c2.71-1.71,5.78-2.6,8.92-2.6c1.23,0,2.47,0.14,3.7,0.41c4.36,0.98,8.08,3.6,10.47,7.38c1.75,2.77,2.59,5.87,2.59,8.93    c0,5.54-2.75,10.98-7.78,14.16c-4.17,2.58-19.96,4.59-38.58,5.27c-0.16-0.35-0.33-0.71-0.51-1.08    C236.42,111.02,244.94,97.67,249.06,95.01z M198.317,158.72H224v149.42h-25.683V158.72z M150.17,100.2    c2.39-3.78,6.11-6.4,10.47-7.38c4.36-0.98,8.84-0.2,12.62,2.19c4.11,2.66,12.63,16.01,21.18,32.49c-0.17,0.37-0.34,0.72-0.51,1.07    c-18.6-0.68-34.4-2.69-38.58-5.28C147.56,118.35,145.23,108,150.17,100.2z M127.07,158.72h41.247v149.42H127.07V158.72z     M82.75,419.6c-11.85,0-21.5-9.64-21.5-21.5c0-0.5,0.02-1,0.06-1.5c0.76-11.16,10.09-20,21.44-20s20.68,8.84,21.44,20    c0.04,0.5,0.06,1,0.06,1.5C104.25,409.96,94.6,419.6,82.75,419.6z M352,366.6H123.47c-9.43-12.16-24.17-20-40.72-20    s-31.29,7.84-40.72,20H30v-28.46h322V366.6z M429.25,419.6c-11.85,0-21.5-9.64-21.5-21.5c0-0.5,0.02-1,0.06-1.5    c0.76-11.16,10.09-20,21.44-20c11.35,0,20.68,8.84,21.44,20c0.04,0.5,0.06,1,0.06,1.5C450.75,409.96,441.1,419.6,429.25,419.6z     M482,366.6h-12.03c-9.43-12.16-24.17-20-40.72-20s-31.29,7.84-40.72,20H382v-50.5h68.607v-30H382v-50.5h65.73L482,289.94V366.6z"
                fill="#323f48"
              />
            </svg>
          </div>

          <div class="facility-title">
            <h6>Free Shipping</h6>
          </div>
        </div>
        <div
          class="single-facility d-flex justify-content-center align-items-center"
          style="padding:0 15px 15px"
        >
          <div class="facility-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="512px"
              viewBox="0 0 79.292 79.292"
              style="enable-background:new 0 0 79.292 79.292;"
              xml:space="preserve"
            >
              <path
                d="M8.958,51.52c-0.896-2.912-1.345-6.049-1.345-9.184c0-13.664,9.185-25.312,21.952-29.121v3.809l16.802-8.512L29.566,0    v6.048C13.214,10.304,0.894,24.864,0.894,42.336c0,2.463,0.225,4.928,0.672,7.168l0.672-3.584L8.958,51.52z"
                fill="#323f48"
              />
              <path
                d="M63.837,47.711l-1.12,18.816l15.681-10.303l-5.15-3.139c1.119-3.357,1.566-6.941,1.566-10.752    c0-16.126-10.527-29.791-24.863-34.943l2.688,2.016l-8.062,3.36c13.437,3.136,23.518,15.232,23.518,29.567    c0,2.465-0.448,4.928-0.896,7.168L63.837,47.711z"
                fill="#323f48"
              />
              <path
                d="M60.253,62.719c-5.602,6.049-13.439,9.857-22.399,9.857c-8.063,0-15.456-3.361-20.832-8.512l3.36-1.793L4.703,51.967    l1.119,18.816l5.152-3.137c6.72,7.168,16.353,11.646,26.88,11.646c9.185,0,17.474-3.358,23.968-8.959l-2.688,0.896L60.253,62.719z    "
                fill="#323f48"
              />
              <path
                d="M35.39,21.28v4.928c-5.6,1.121-8.736,4.705-8.736,9.185c0,4.928,3.809,7.616,9.185,9.407    c3.808,1.347,5.375,2.466,5.375,4.48s-2.017,3.137-4.927,3.137c-3.36,0-6.272-1.121-8.513-2.24l-1.567,6.05    c2.016,1.119,5.376,2.016,8.735,2.237v4.931h5.152v-5.377c5.823-1.119,9.184-4.929,9.184-9.408c0-4.703-2.464-7.394-8.512-9.631    c-4.479-1.568-6.271-2.688-6.271-4.479c0-1.345,1.119-2.912,4.479-2.912c3.809,0,6.048,1.121,7.393,1.793l1.567-5.824    c-1.792-0.896-4.032-1.568-7.393-1.793v-4.479L35.39,21.28L35.39,21.28z"
                fill="#323f48"
              />
            </svg>
          </div>
          <div class="facility-title">
            <h6>Free Returns</h6>
          </div>
        </div>
        <div
          class="single-facility d-flex justify-content-center align-items-center"
          style="padding:0 15px 15px"
        >
          <div class="facility-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background:new 0 0 512 512;"
              xml:space="preserve"
              width="512px"
            >
              <path
                d="M511.918,226.455c-0.436-4.146-2.568-7.927-5.891-10.444l-40.557-30.721l14.756-48.69    c1.209-3.99,0.713-8.302-1.371-11.912c-2.085-3.61-5.571-6.196-9.63-7.144l-49.548-11.569l-6.325-50.482    c-0.519-4.136-2.726-7.874-6.098-10.324c-3.372-2.451-7.607-3.394-11.702-2.61l-49.968,9.584L319.27,8.598    c-2.156-3.567-5.693-6.084-9.77-6.95c-4.078-0.867-8.333-0.007-11.752,2.375L256,33.103L214.251,4.023    c-3.421-2.382-7.675-3.242-11.753-2.375s-7.614,3.382-9.77,6.951l-26.311,43.546l-49.968-9.584    c-4.093-0.783-8.33,0.159-11.703,2.61c-3.372,2.451-5.58,6.187-6.098,10.324l-6.325,50.482l-49.548,11.569    c-4.06,0.948-7.545,3.534-9.63,7.144c-2.085,3.611-2.581,7.922-1.372,11.911l14.754,48.691L5.974,216.012    c-3.323,2.517-5.455,6.297-5.891,10.443c-0.435,4.146,0.865,8.287,3.592,11.44l33.281,38.481l-24.554,44.56    c-2.011,3.651-2.422,7.972-1.134,11.937c1.288,3.963,4.16,7.218,7.934,8.989l46.056,21.616l-4.309,50.696    c-0.353,4.154,1.029,8.269,3.819,11.367c2.789,3.098,6.737,4.902,10.904,4.986l50.87,1.014l16.681,48.064    c1.367,3.938,4.303,7.136,8.111,8.831c3.809,1.695,8.149,1.738,11.99,0.12l46.885-19.763l34.791,37.124    c2.85,3.042,6.833,4.768,11.002,4.768s8.151-1.726,11.002-4.768l34.791-37.124l46.882,19.763c3.841,1.617,8.181,1.575,11.99-0.12    c3.809-1.696,6.745-4.891,8.111-8.83l16.684-48.065l50.867-1.014c4.169-0.083,8.116-1.888,10.905-4.986    c2.789-3.098,4.172-7.212,3.819-11.367l-4.309-50.696l46.059-21.616c3.773-1.771,6.646-5.026,7.934-8.99    c1.288-3.963,0.878-8.285-1.135-11.937l-24.557-44.559l33.284-38.481C511.053,234.742,512.353,230.601,511.918,226.455z     M443.562,281.733l21.86,39.667l-41.001,19.242c-5.713,2.682-9.152,8.639-8.617,14.927l3.836,45.128l-45.282,0.903    c-6.31,0.126-11.874,4.168-13.944,10.13l-14.852,42.788l-41.734-17.594c-5.816-2.452-12.543-1.022-16.858,3.583L256,473.553    l-30.97-33.047c-2.911-3.107-6.92-4.769-11.006-4.769c-1.97,0-3.96,0.387-5.853,1.185l-41.736,17.594l-14.85-42.787    c-2.07-5.963-7.633-10.006-13.944-10.131l-45.285-0.903l3.836-45.128c0.535-6.288-2.904-12.245-8.617-14.927l-40.998-19.243    l21.858-39.668c3.046-5.528,2.326-12.367-1.801-17.141l-29.627-34.255l36.102-27.347c5.031-3.811,7.156-10.351,5.326-16.392    l-13.134-43.345l44.107-10.298c6.146-1.435,10.747-6.547,11.533-12.809l5.63-44.938l44.481,8.531    c6.198,1.19,12.481-1.609,15.745-7.011l23.422-38.763l37.165,25.886c5.179,3.607,12.057,3.607,17.235,0l37.163-25.886    l23.424,38.764c3.263,5.401,9.543,8.2,15.745,7.01l44.481-8.531l5.63,44.938c0.785,6.262,5.387,11.374,11.533,12.809    l44.107,10.298l-13.136,43.344c-1.831,6.04,0.294,12.582,5.325,16.393l36.104,27.347l-29.629,34.255    C441.235,269.364,440.515,276.205,443.562,281.733z"
                fill="#323f48"
              />

              <path
                d="M256,111.722c-79.556,0-144.278,64.723-144.278,144.277S176.446,400.277,256,400.277S400.278,335.554,400.278,256    S335.555,111.722,256,111.722z M256,370.122c-62.927,0-114.122-51.195-114.122-114.122S193.073,141.878,256,141.878    S370.122,193.073,370.122,256S318.927,370.122,256,370.122z"
                fill="#323f48"
              />

              <path
                d="M315.114,213.039c-5.89-5.889-15.437-5.889-21.325,0l-53.938,53.937l-21.639-21.638c-5.888-5.889-15.435-5.887-21.323,0    c-5.887,5.888-5.887,15.435,0.001,21.323l32.301,32.3c2.944,2.944,6.803,4.416,10.661,4.416c3.859,0,7.718-1.473,10.661-4.416    l64.6-64.599C321.001,228.475,321.001,218.927,315.114,213.039z"
                fill="#323f48"
              />
            </svg>
          </div>

          <div class="facility-title">
            <h6>Lifetime Guarantee</h6>
          </div>
        </div>
        <div
          class="single-facility d-flex justify-content-center align-items-center"
          style="padding:0 15px 15px"
        >
          <div class="facility-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-34 0 512 512"
              width="512px"
              ><path
                d="m277.128906 180.507812c0-30.367187-24.703125-55.070312-55.070312-55.070312-30.367188 0-55.070313 24.703125-55.070313 55.070312v13.03125h-10.273437v116.945313h130.6875v-116.945313h-10.273438zm-79.957031 0c0-13.722656 11.164063-24.886718 24.886719-24.886718s24.886718 11.164062 24.886718 24.886718v13.03125h-49.773437zm60.046875 99.792969h-70.320312v-56.574219h70.320312zm0 0"
                fill="#323f48"
              /><path
                d="m433.992188 98.1875c-42.003907-14.644531-75.199219-46.894531-91.074219-88.476562l-3.707031-9.710938h-234.308594l-3.703125 9.710938c-15.875 41.582031-49.070313 73.828124-91.074219 88.476562l-10.125 3.527344v69.488281c0 68.113281 18.722656 134.867187 54.136719 193.042969 35.417969 58.183594 86.121093 105.46875 146.625 136.746094l21.296875 11.007812 21.292968-11.007812c60.507813-31.277344 111.207032-78.5625 146.625-136.742188 35.417969-58.179688 54.140626-124.933594 54.140626-193.046875v-69.488281zm-20.0625 73.015625c0 128.070313-70.671876 244.160156-184.4375 302.972656l-7.433594 3.84375-7.433594-3.84375c-113.765625-58.808593-184.441406-174.902343-184.441406-302.972656v-48.386719c42.398437-17.675781 76.34375-50.707031 95.183594-92.632812h193.378906c18.84375 41.925781 52.785156 74.957031 95.183594 92.632812zm0 0"
                fill="#323f48"
              /><path
                d="m304.484375 67.496094-4.425781-7.125h-156l-4.425782 7.125c-17.859374 28.742187-42.695312 53.011718-71.832031 70.183594l-7.429687 4.378906v29.144531c0 54.542969 14.265625 108.183594 41.257812 155.113281 26.914063 46.804688 65.929688 85.996094 112.828125 113.339844l7.601563 4.429688 7.601562-4.429688c46.898438-27.34375 85.914063-66.535156 112.832032-113.335938 26.988281-46.933593 41.253906-100.570312 41.253906-155.117187v-29.144531l-7.429688-4.378906c-29.136718-17.171876-53.976562-41.441407-71.832031-70.183594zm49.078125 103.707031c0 98.015625-48.984375 186.25-131.503906 237.785156-82.523438-51.535156-131.503906-139.769531-131.503906-237.785156v-12.085937c27.734374-17.75 51.738281-41.222657 70.109374-68.5625h122.789063c18.371094 27.339843 42.375 50.8125 70.109375 68.5625zm0 0"
                fill="#323f48"
              /></svg
            >
          </div>

          <div class="facility-title">
            <h6>Secure Checkout</h6>
          </div>
        </div>
      </div>

      <!-- HOW SILVERLIGHT SOCKS COMPARE TO THE COMPETITION -->
      <div class="product-section">
        <div class="">
          <div class="">
            <div class="">
              <h2 style="text-align: center">
                HOW SILVERLIGHT SOCKS COMPARE TO THE COMPETITION
              </h2>
              <p>
                <img
                  style="width:100%"
                  src="https://silverlight.store/wp-content/uploads/2019/10/Competitor-Comparison-5-pack.jpg"
                  alt="Competitor-Comparison-5-pack"
                />
              </p>
              <h2>
                <img
                  style="width:100%;margin-bottom:50px"
                  src="https://silverlight.store/wp-content/uploads/2020/03/10th-Options-optimized.jpg"
                  alt="men and women hiking socks"
                />
              </h2>
              <div>
                <div class="advantages-container">
                  <ul class="advantage-list">
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon1.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Stink—free feet</h3>
                          <p>
                            Silver ionss kill bacteria preventing odor from ever
                            having a chance
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon3.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Form Fits to the Shape of Your Foot</h3>
                          <p>
                            Keep the sock in place when youre taking on
                            challenging terrain - like side-hills. No more
                            slippage! No more bunching!
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon2.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>A Gentle Massage for Your Feet</h3>
                          <p>
                            The combination of merino wool softly caressing your
                            feet mixed with seamless stitching creates the
                            ultimate comfort on the trail. Your foot wont even
                            notice the seams even after 6 hours of hiking.
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon7.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Blister Blasting Tech</h3>
                          <p>
                            The entire sock is designed to prevent all the major
                            causes of blisters on the trail.
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon4.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Take Control of Foot Moisture</h3>
                          <p>
                            Soft, moisture wicking, static free, temperature
                            regulating.
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon8.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Two Socks in One</h3>
                          <p>
                            Dual layer construction ensure the best of all
                            worlds while hiking.
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon6.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>Taking Care of Your Feet On The Trail</h3>
                          <p>Support in all the right spots</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div class="advantage-image-icon">
                          <img src="./images/icon5.png" alt="" />
                        </div>
                        <div class="content-area">
                          <h3>No More Holes</h3>
                          <p>
                            High strength merino wool fibers expertly blended
                            for maximum durability make sure your pair stay hole
                            free and dont wear thin. Keeps the same compression,
                            form, and fit after many many miles hiked and many
                            hand/machine washes.
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon1.png"
                      alt="stink free feet icon"
                    />
                  </div>
                  <div class="text-area">
                    <h3>STINK-FREE FEET</h3>
                    <p>
                      Silver ions kills bacteria preventing odor from ever
                      having a chance.
                    </p>
                  </div>
                </div>
                <div style="color:#777777">
                  The same tech used by astronauts and medical professionals to
                  prevent bacteria build up and growth is in Silverlight hiking
                  socks. Not only does bacteria cause the odor that’s starting
                  to develop when you hike, but it also is a leading cause of
                  foot-rot. With Silverlight socks we’re creating a
                  bacteria-free zone around your feet for blister-free hiking
                  bliss without the bad smell.
                </div>
                <p>&nbsp;</p>
              </div>
              <div>
                <img
                  style="width:100%;margin-bottom:32px"
                  class="alignnone wp-image-21732 size-full"
                  src="https://silverlight.store/wp-content/uploads/2020/03/17th-Silver-thread-1-optimized.jpg"
                  alt="Silverlight silver yarn"
                />
              </div>
              <div id="icon4" class="heading-area">
                <div class="img-sec">
                  <img
                    class=""
                    src="./images/icon7.png"
                    alt="blister prevention icon"
                  />
                </div>
                <div class="text-area">
                  <h3>BLISTER BLASTING TECH</h3>
                  <p>
                    The entire sock is designed to prevent all the major causes
                    of blisters on the trail.
                  </p>
                </div>
              </div>
              <div style="color:#777777">
                To prevent blisters from having a chance, you need a sock that
                dries fast &amp; wicks sweat, doesn’t ever move (no bunching,
                slipping, rubbing), has support and padding and keeps bacteria
                away from your feet. With Silverlight socks we are the first to
                be able to solve all this problems at once in a single sock. By
                creating a padded-dual-layer sock with compression to prevent
                movement, with silver yarns to keep bacteria at bay and
                sweat-wicking and faster drying time than traditional merino
                wool hiking socks, thanks to a deliberate balance of a merino
                wool and silver yarn inner layer and nylon and spandex outer
                layer.
              </div>
              <div />
              <p>&nbsp;</p>
              <div style="color:#777777">
                Gone are the days of taking your socks off after a days hike –
                to give your feet a rest – only to reveal painful blisters. Our
                struggle in creating the Silverlight socks was in creating a
                sock that could do all the work in preventing blisters from ever
                having the chance to form. We are proud to say that Silverlight
                socks completely eliminate every major cause of blisters,
                whether you’re running or hiking.
              </div>
              <div />
              <div />
              <div>
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon2.png"
                      alt="gentle massage icon"
                    />
                  </div>
                  <div class="text-area">
                    <h3>A GENTLE MASSAGE FOR YOUR FEET</h3>
                    <p>
                      The combination of merino wool softly caressing your feet
                      mixed with seamless stitching creates the ultimate comfort
                      on the trail. Your foot will feel comfortable throughout,
                      even after 6 hours of hiking or treks that last for a
                      week.
                    </p>
                  </div>
                </div>
                <p style="color:#777777">
                  Seamless stitching in the toe box reduces rubbing in sensitive
                  areas keeping your skin free of painful blisters that can
                  throw off your hiking schedule. And, no more hard hits on the
                  trail, our light padding provides just enough cushion to make
                  long hikes barely noticeable on your feet.
                </p>
                <!-- <p>&nbsp;</p> -->
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon5.png"
                      alt="no more holes"
                    />
                  </div>
                  <div class="text-area">
                    <h3>NO MORE HOLES</h3>
                    <p>
                      High strength merino wool fibers expertly blended for
                      maximum durability makes sure your pair stay hole free and
                      don’t wear thin. Keeps the same compression, form, and fit
                      after many miles hiked and many hand/machine washes.
                    </p>
                  </div>
                </div>
                <p style="color:#777777">
                  We used the Martindale Wear and Abrasion tester to measure the
                  strength, durability, and longevity of the Silverlight sock
                  fabric. After being rubbed by the device (simulating stepping)
                  for 100’s upon 100’s of miles the Silverlight sock did not
                  give in or show signs of wear. We passed the top 1% of sock
                  durability. Then we had to stop the machine to give it a
                  break.
                </p>
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon6.png"
                      alt="tacking care of your feet on the trail"
                    />
                  </div>
                  <div id="icon7" class="text-area">
                    <h3>TAKING CARE OF YOUR FEET ON THE TRAIL</h3>
                    <p>Support in all the right places.</p>
                  </div>
                </div>
                <p style="color:#777777">
                  With 3 core areas of support. Your heel, toe, and mid-foot are
                  amply fortified for long hikes on the trail. A slight
                  breathable compression around the midsection that lifts up,
                  holds the arch. Padding in both the heel and the toe that
                  stays soft and cushioned after 1000’s of miles. Ankle socks
                  are great for warm weather, trail running and when wearing
                  trail runners and other lighter footwear, while the crew socks
                  are designed to be worn with hiking boots.
                </p>
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon8.png"
                      alt="two socks in one"
                    />
                  </div>
                  <div id="icon6" class="text-area">
                    <h3>TWO SOCKS IN ONE</h3>
                    <p>
                      Dual layer construction for compression &amp; moisture
                      wicking
                    </p>
                  </div>
                </div>
                <p style="color:#777777">
                  To elevate the traditional hiking sock it was clear we had to
                  double up to get the best of both worlds, compression AND
                  moisture-wicking technology. The challenge here was creating a
                  dual layer sock that was thin enough to not cause pain from
                  overcrowding in the shoe and at the same time constructed to
                  exacting standards that both layers would work in tandem to
                  support, aerate, and comfort the foot. We’re happy to say
                  after hundreds of hours of testing with some serious time on
                  the trail we have custom designed that perfect balance.
                </p>
                <div class="img-sec1">
                  <img
                    style="width: 100%;"
                    class=""
                    src="https://silverlight.store/wp-content/uploads/2019/10/20th-Double-layers_newphoto_Angle.gif"
                    alt="dual layer hiking socks"
                  />
                </div>
                <p>&nbsp;</p>
                <div class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon4.png"
                      alt="take control of foot moisture on the trail"
                    />
                  </div>
                  <div id="icon5" class="text-area">
                    <h3>TAKE CONTROL OF FOOT MOISTURE ON THE TRAIL</h3>
                    <p>Soft, moisture wicking, and temperature regulating.</p>
                  </div>
                </div>
                <p style="color:#777777">
                  The Silverlight socks inner layer uses Merino Wool sourced
                  from Australian merino sheep. The wool from this unique sheep
                  has an incredible capability to pull moisture (including
                  sweat) away from the skin and bring it to the surface of the
                  sock. Keeping your foot dry and closer to being completely
                  blister free. Thanks to the outer Nylon layer, Silverlight
                  socks dry faster than hiking socks available from competitors.
                  Thanks to the compression they also feel more comfortable
                  while they are wet than comparable hiking socks.
                </p>
                <div id="icon2" class="heading-area">
                  <div class="img-sec">
                    <img
                      class=""
                      src="./images/icon3.png"
                      alt="form fits to the shape of your foot"
                    />
                  </div>
                  <div class="text-area">
                    <h3>FORM FITS TO THE SHAPE OF YOUR FOOT</h3>
                    <p>
                      Keep the sock in place when you’re taking on challenging
                      terrain – like side-hills.<br />
                      No more slippage! No more bunching!
                    </p>
                  </div>
                </div>
                <p style="color:#777777">
                  We applied a gentle blend of spandex to the outer nylon layer
                  of the Silverlight socks. This provides much-needed arch
                  support (great for people with Plantar Fasciitis) but it also
                  serves the purpose of keeping your sock in place and provides
                  light compression for those long days of hiking on the trail.
                  Snug on your foot and no more slippage or bunching up inside
                  the shoe causing discomfort on the trail.
                </p>
              </div>
              <p style="color:#777777">
                We believe 100% in the quality of the products we make, that’s
                why we have a crazy return guarantee. If for any reason at all
                you’re not satisfied with your Silverlight socks, we’ll replace
                them or give you a refund.
              </p>
              <p>
                <img
                  style="width: 100%;"
                  class="crop-border alignnone wp-image-21730 size-full"
                  src="https://silverlight.store/wp-content/uploads/2020/03/Guarantee-2-optimized.jpg"
                  alt="Lifetime Guarantee"
                />
              </p>
              <h2 style="text-align: center;">FREQUENTLY ASKED QUESTIONS</h2>
              <!-- accordian -->
              <Accordion>
                <span slot="head">Where are they made?</span>
                <div slot="details">
                  <p>
                    There are very few factories in the world who are able to
                    work with silver yarns and can produce dual-layer socks with
                    compression at the same time. It requires state of the art
                    machinery, that’s just been available in the last few years
                    as well as knowledge how to blend silver yarns into the
                    socks, a delicate process.
                  </p>
                  <p>
                    We have been testing factories throughout the world and we
                    found only one that was able to produce Silverlight socks in
                    the quality we require, a small specialized factory in
                    China. Out of 15 factories, 8 of them in China, we were left
                    only with one who is able to produce the socks that so many
                    of our customers fell in love with. For a more detailed
                    explanation, we wrote a blog post about <a
                      style="color:#1cb9a2;text-decoration:none"
                      href="https://silverlight.store/made-in-china/"
                      >Why Silverlight socks are made in China</a
                    ><br />
                  </p>
                </div>
              </Accordion>
              <Accordion>
                <span slot="head"
                  >Why are Silverlight socks slightly more expensive than other
                  hiking sock brands?</span
                >
                <div slot="details">
                  <p>
                    Our production price is about twice as high as for socks
                    that don’t contain silver. Silver is a very expensive
                    material, but we believe strongly that to make the best
                    hiking socks possible, silver yarn has to be part of the
                    equation. Unlike most other brands we offer free worldwide
                    shipping even for the first pair. By utilizing a direct to
                    consumer (DTC) model without middlemen and savings for
                    shipping when sending multiple pairs in one package, we are
                    able to offer our socks for a similar price as other
                    high-end hiking sock brands, for purchases of 3 pairs, even
                    though we have much higher production cost. We sell 5-packs
                    at an even greater discount, keeping pricing aligned with
                    our true cost.<br />
                  </p>
                </div>
              </Accordion>
              <Accordion>
                <span slot="head"
                  >What makes them different from the brand I'm wearing now?</span
                >
                <div slot="details">
                  <p>
                    Our socks are the only dual-layer compression hiking socks
                    with silver yarns on the market. Compared to most hiking
                    socks available, this is how Silverlight socks are
                    different:
                  </p>
                  <ul>
                    <li>
                      They dry faster, thanks to the dual-layer blend of merino
                      wool and nylon/spandex
                    </li>
                    <li>
                      They don’t smell. Merino wool is naturally anti-bacterial,
                      however it doesn’t actively kill bacteria like silver
                      does.
                    </li>
                    <li>
                      They fit snug and never move, because of the outer
                      compression layer.
                    </li>
                    <li>
                      Silverlight socks are designed to prevent blisters better
                      than any other sock.
                    </li>
                  </ul>
                </div>
              </Accordion>
              <Accordion>
                <span slot="head"
                  >How to recognize which sock is for left and which is for
                  right?</span
                >
                <div slot="details">
                  <p>
                    Silverlight socks have a different text inside the rib top
                    front for left and right socks. “Venture” on left socks and
                    “Out” for the right side.
                  </p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
    {#if sizechart}
      <div transition:fade={{ duration: 200 }} class="size-chart-center">
        <div
          class="text-right m- d-flex justify-content-between"
          style="cursor: pointer;"
        >
          <div class="w-100 text-center"><strong>SIZE CHART</strong></div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="close-chart"
            on:click={() => {
              sizechart = false;
            }}>X</span
          >
        </div>
        <img
          src="https://silverlight.store/wp-content/uploads/2019/10/Size-chart2021-510x305.jpg"
          alt=""
        />
      </div>
    {/if}
  </div>

  <footer class="footer-wrapper">
    <div class="copyright-footer text-center text-white">
      <div class="social-icon">
        <a
          href="https://www.facebook.com/shopsilverlight"
          data-label="Facebook"
        >
          <i class="fa-brands fa-facebook-f" />
        </a>
        <a
          href="https://www.instagram.com/shopsilverlight"
          rel="noopener noreferrer nofollow"
        >
          <i class="fa-brands fa-instagram" />
        </a>
        <a href="https://twitter.com/shopsilverlight" data-label="Twitter">
          <i class="fa-brands fa-twitter" />
        </a>
        <a href="https://pinterest.com/shopsilverlight" data-label="Pinterest">
          <i class="fa-brands fa-pinterest" />
        </a>
        <a href="https://discord.gg/9kuEeHEp4Y" data-label="Discord">
          <i class="fa-brands fa-discord" />
        </a>
        ｜ <span class="text-white">Download App:</span>
        <a
          href="https://play.google.com/store/apps/details?id=com.silverlight.store.silverlight"
          data-label="Android"
        >
          <img
            style="width:16px;height:16px"
            src="./images/Android-icon.svg"
            alt=""
          />
        </a>
        <a
          href="https://apps.apple.com/us/app/silverlight-hike-to-earn/id1634733743"
          data-label="Apple"
        >
          <i class="fa-brands fa-apple" />
        </a>
      </div>
      <a href=" https://silverlight.store/legal/#tab_privacy">Privacy</a>｜
      <a href=" https://silverlight.store/legal/#tab_terms">Terms</a>｜
      <a href=" https://silverlight.store/help/#tab_contact">Contact</a>｜
      <a href=" https://silverlight.store/help/#tab_faq">Shipping</a>｜
      <a href=" https://silverlight.store/help/#tab_faq">Returns</a>｜
      <a href="https://silverlight.store/community/#tab_affiliates"
        >Affiliates</a
      >
      <div class="payment-logos">
        <img src="./images/paypal.svg" alt="" />
        <img src="./images/visa.svg" alt="" />
        <img src="./images/mastercard.svg" alt="" />
        <img src="./images/discover.svg" alt="" />
        <img src="./images/amex.svg" alt="" />
      </div>
      <span class="text-white"> © 2023 Silverlight</span>
    </div>

    <!-- <a
      href="#top"
      class="back-to-top button icon invert plain fixed bottom z-1 is-outline circle active"
      id="top-link"><i class="icon-angle-up" /></a
    > -->
  </footer>

  <div
    class="fixed-socks-selection fixed-bottom d-flex justify-content-around flex-wrap"
  >
    <div class="d-flex">
      <div
        class="d-flex left-socks-selection justify-content-center align-items-center"
      >
        <div style="width:48px; height:48px">
          <img src=".././images/crew-1.jpg" alt="" class="w-100" />
        </div>
        <div style="margin-left:10px; font-size:14px">
          <div>Silverlight Hiking Socks</div>
        </div>
      </div>
      <div class="center-socks-selection d-flex align-items-center">
        <div class="d-flex flex-wrap" style="padding-left:10px; font-size:14px">
          <span style="margin-left: 10px;">
            {#if discount != 0}
              <del>
                <span style="color:#777777"> ${fprice} </span>
              </del>

              <span style="font-weight: 700">${discountedprice}</span>
            {:else}
              <span style="color:#777777"> ${fprice} </span>
            {/if}
          </span>
          {#if discount != 0}
            <span
              class="save d-flex"
              style="margin-left:10px; font-size:14px; font-weight:700"
              >Save {discount}%
            </span>
          {/if}
        </div>
      </div>
    </div>
    <div
      class="right-socks-selection d-flex align-items-center justify-content-center flex-wrap "
    >
      <div
        class="d-flex justify-content-center flex-wrap"
        style="font-size: 14px;"
      >
        <select bind:value={color}>
          <option disabled>Color</option>
          <option value="BLACK">Black</option>
          <option value="BLUE">Blue</option>
        </select>
        <select bind:value={type}>
          <option disabled>Type</option>
          <option value="ANKLE">Ankle</option>
          <option value="CREW">Crew</option>
        </select>
        <select bind:value={quantity}>
          <option disabled>Quantity</option>
          <option value={1}>1 Pack</option>
          <option value={3}>3 Pack</option>
          <option value={5}>5 Pack</option>
        </select>
        <select bind:value={size}>
          <option disabled>Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      <div class="" style="margin:0 5px">
        <div class="quantity d-flex round-pill">
          <input type="button" value="-" class="" on:click={handleqtydec} />
          <input
            type="number"
            class="qty"
            style="background-color: #ffffff;"
            step="1"
            min="1"
            max="15"
            name="quantity"
            bind:value={qty}
            title="Qty"
            size="4"
            pattern="[0-9]*"
            inputmode="numeric"
          />
          <input type="button" value="+" class="" on:click={handleqty} />
        </div>
      </div>
      <div class="d-flex">
        <button
          type="submit"
          class="add-to-cart-button button alt mr-2"
          on:click={handleCart}>ADD TO CART</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .main-container {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .bar-icon {
    display: none;
  }

  .fixed-socks-selection {
    background-color: #ffffff;
    padding: 10px 20px;
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
    bottom: 0;
    display: none;
  }

  .right-socks-selection select {
    margin: 0 3px;
    border-radius: 3px;
    outline: none;
  }

  .right-socks-selection button {
    animation: wiggle 5s infinite;
    min-width: 145px;
  }

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    90% {
      transform: rotate(0deg);
    }
    93% {
      transform: rotate(5deg);
    }
    96% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .zoomy {
    overflow: hidden;
    cursor: auto;
  }

  .zoomy span {
    cursor: auto;
  }

  .zoomy img {
    cursor: auto;
    width: 100%;
    height: auto;
    backface-visibility: hidden;
  }

  .image-zoom {
    height: 100% !important;
  }

  .d2::before {
    content: "A";
    color: #dee2e6;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -5px;
    background-color: #dee2e6;
    transform: rotateY(0deg) rotate(45deg);
    right: 98px;
    z-index: -1;
  }

  .d2 {
    display: none;
  }

  .d1:hover .d2 {
    display: block;
    background-color: white;
    border: 1px solid #777777a4;
    color: black;
    position: absolute;
    width: 30%;
    margin-top: 8px;
    right: -78px;
    text-align: center;
  }

  .remove-item-button {
    width: 25px;
    height: 26px;
    align-items: center;
    display: flex;
    font-size: 13px;
    justify-content: center;
  }

  .video-bg {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -99;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .top-header ul {
    margin: 0;
  }

  .top-header li {
    list-style: none;
  }

  .top-header a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 100;
    opacity: 0.8;
  }

  .top-header a:hover {
    opacity: 1;
  }

  .header {
    padding: 0 28px;
    height: 100px;
  }

  .inner-header-left ul {
    padding: 0;
    margin: 0;
  }

  .inner-header-right ul {
    padding: 0;
    margin: 0;
  }

  .inner-header-left li {
    list-style: none;
    margin: 0 5px;
    color: #ffffff;
  }

  .inner-header-left a {
    color: #ffffff;
    text-decoration: none;
    opacity: 0.8;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .inner-header-right a {
    color: #ffffff;
    text-decoration: none;
    opacity: 0.8;
  }

  .inner-header-left a:hover {
    opacity: 1;
  }

  .inner-header-right a:hover {
    opacity: 1;
  }

  .inner-header-right li {
    list-style: none;
    margin: 0 5px;
    color: #ffffff;
  }

  .select-currency {
    background-color: transparent;
    border: none;
    color: #ffffff;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select-currency option {
    color: #303e48;
    background-color: #ffffff !important;
  }

  .select-currency option:hover {
    color: #000000;
    background: none;
  }

  .home-socks {
    padding: 20px 28px 0;
    font-size: 18px;
  }

  .home-socks a {
    text-decoration: none;
  }

  .container-1080 {
    /* display: flex; */
    max-width: 1080px;
    background-color: #ffffff;
    padding: 15px;
    /* margin-bottom: 150px; */
  }

  .socks-container {
    display: flex;
    padding: 15px 0 40px;
  }

  .silver-hiking-socks-wrapper {
    padding: 10px 15px 15px;
    line-height: 1.6;
  }

  .silver-hiking-socks-wrapper a {
    text-decoration: none;
  }

  .left-sidebar {
    display: none;
  }

  .slider-single img {
    opacity: 1 !important;
  }

  .slider-nav {
    display: grid;
    margin-bottom: 25px;
  }

  .slider-nav-img {
    opacity: 1 !important;
  }

  .slick-list,
  .draggable {
    padding: 0px 0px !important;
  }

  .magnifier {
    z-index: 1;
    position: absolute;
    right: 30px;
    top: 15px;
    color: #000000;
    background: #ffffff;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tmp {
    opacity: 1 !important;
  }

  .thumb-image {
    min-width: 25%;
  }

  .thumb-image img {
    opacity: 0.5;
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

  .cart-container img {
    width: 100px;
    height: 100px;
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

  .size-chart-center img {
    padding: 20px;
  }
  .size-chart-center strong {
    font-size: 20px;
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

  .cart-box li {
    display: flex;
    list-style: none;
    padding: 0;
    position: relative;
    margin: 0 7px;
    transition: background-color 0.3s;
    background-color: transparent;
    border: 2px solid #ffffff;
    width: 30px;
    height: 30px;
    text-align: -webkit-right;
    justify-content: center;
    align-items: center;
  }

  .cart-box li:hover {
    background-color: #ffffff;
    color: #777777;
  }

  .hide {
    display: block;
    color: red;
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

  .cart-box li:hover .cart-icon strong:after {
    height: 10px;
  }

  .sidebar {
    display: none;
  }

  .facility-container {
    padding: 0 15px 15px;
    width: 100%;
  }

  .single-facility {
    width: 25%;
  }

  .facility-icon svg {
    width: 50px;
    height: 53px;
    width: 100%;
  }

  .facility-icon path {
    fill: #777777;
  }

  .facility-title h6 {
    margin-left: 10px;
    margin-bottom: 0;
    opacity: 0.8;
  }

  .advantage-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  .advantage-list li {
    width: 49%;
    display: inline-block;
    padding: 5px;
    transition: 0.1s;
    padding-left: 20px;
    position: relative;
    margin: 5px;
    overflow: hidden;
    background: #f2f2f2;
  }

  .advantage-list li:hover {
    transform: scale(1.01);
  }

  .advantage-list li:hover:before {
    background: #303e48 !important;
  }

  .advantage-list li:before {
    content: "";
    background: #1cb9a2;
    width: 40px;
    height: 100px;
    left: -21px;
    top: -40px;
    position: absolute;
    transform: rotate(22deg);
  }

  .advantage-list li:nth-child(odd) {
    margin: 0;
    margin-right: 5px;
    margin-bottom: 10px;
  }

  .advantage-list li:nth-child(even) {
    margin: 0;
    margin-left: 5px;
    margin-bottom: 10px;
  }

  .advantage-image-icon {
    float: left;
  }

  .advantage-image-icon img {
    width: 100px;
    height: 100px;
    padding: 15px;
  }

  .advantage-list li a {
    text-decoration: none;
  }

  .product-section {
    padding: 0 13px;
  }

  .content-area h3 {
    color: #1cb9a2;
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 700;
    line-height: 1.6;
  }

  .content-area p {
    color: #5e646b;
    font-size: 14px;
    margin-top: 0;
  }

  .heading-area {
    background: url(../images/bg-image.jpeg);
    background-repeat: no-repeat;
    border-radius: 10px px 10px 0 0;
    background-position: right;
    margin: 20px 0;
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .img-sec {
    width: 8%;
  }

  .img-sec img {
    width: 100%;
    margin: 0 !important;
    background: #fff;
    border: 4px solid #fff;
  }

  .text-area {
    padding-left: 15px;
    width: 92%;
  }

  .text-area h3 {
    color: #fff;
    margin-top: 0;
    margin: 0;
    line-height: normal;
    font-size: 26px;
  }

  .text-area p {
    color: #fff;
    font-size: 1vw;
    margin: 0;
    line-height: 1.2vw;
  }

  .footer-wrapper {
    padding: 40px 0 110px 0;
    font-size: 14px;
  }

  .copyright-footer a {
    color: #ffffff;
    text-decoration: none;
  }

  .social-icon a {
    margin: 0 5px;
  }

  .social-icon img {
    margin-bottom: 2px;
  }

  .payment-logos img {
    margin: 10px 5px;
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

    .left-sidebar {
      display: block;
      width: 260px;
      height: 100vh;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #000000;
      z-index: 1111;
      opacity: 0.95;
    }

    .left-sidebar button {
      font-size: 30px;
      padding: 0 10px;
      background: #000000;
      color: #ffffff;
      border: none;
      /* margin-left: 10px; */
      outline: none;
    }

    .left-sidebar li {
      list-style: none;
      padding: 15px 0 15px 20px;
      border-bottom: 1px solid #ffffff42;
      font-size: 12px;
    }

    .left-sidebar a {
      text-decoration: none;
      color: #ffffff;
    }

    .inner-header-left {
      display: none !important;
    }

    .bar-icon {
      flex: 1;
    }

    .inner-header-center {
      flex: 1;
    }

    .hide-icon {
      display: none !important;
    }

    .home-socks {
      text-align: center;
    }

    .sidebar {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      padding: 20px;
      width: 260px;
      background-color: rgba(255, 255, 255, 0.95);
      z-index: 1;
      bottom: 0;
      overflow: scroll;
      scroll-behavior: smooth;
    }

    .is-divider {
      height: 3px;
      display: block;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 1em 0 1em;
      width: 100%;
      max-width: 30px;
    }

    .sidebar-close {
      width: 25px;
      height: 25px;
      position: fixed;
      top: 10px;
      right: 15px;
      border: none;
      background: none;
      font-size: 25px;
      font-weight: 500;
      cursor: pointer;
      outline: none;
    }

    .d2 {
      display: none !important;
    }

    .container-1080 {
      display: block;
      width: 100%;
    }

    .container {
      padding: 0;
      margin: 0;
      width: 100% !important;
    }

    .socks-container {
      display: block;
    }

    .socks-slider-wrapper {
      width: 100% !important;
    }

    .silver-hiking-socks-wrapper {
      width: 100% !important;
      padding: 0;
    }

    .thumb-image img {
      width: 100%;
    }

    .price-sub-container {
      flex-direction: column;
    }

    .quantity {
      margin: 10px 0;
    }

    /* .single-facility {
      flex-direction: column;
    } */

    /* .facility-title {
      font-size: 14px;
    } */

    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 130px 0;
    }
  }

  @media screen and (max-width: 768px) {
    .single-facility {
      flex-direction: column;
      text-align: center;
    }

    .facility-title h6 {
      font-size: 12px;
      margin-top: 10px;
      margin-left: 0;
    }
  }

  @media screen and (max-width: 620px) {
    .single-facility {
      width: 50% !important;
    }

    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 165px 0;
    }
  }

  @media screen and (max-width: 480px) {
    .facility-container {
      flex-wrap: wrap;
    }

    .advantage-list {
      display: none;
    }

    .silver-hiking-socks-wrapper h1 {
      font-size: 22px !important;
      text-align: center;
    }

    .product-section h2 {
      font-size: 20px;
    }

    .product-section h3 {
      font-size: 14px;
    }

    .heading-area p {
      font-size: 13px;
    }

    .text-area p {
      line-height: normal;
    }
  }

  @media screen and (max-width: 420px) {
    .socks-selection ul {
      padding-left: 0px;
    }

    .socks-selection button {
      margin: 0 1px;
      padding: 5px;
    }
  }

  @media screen and (max-width: 370px) {
    .size-div {
      display: block !important;
    }

    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 200px 0;
    }

    .inner-header-center img {
      width: 100%;
    }
  }
</style>
