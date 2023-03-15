<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import jQuery from "jquery";
  import { onMount } from "svelte";
  import { fade, slide, fly } from "svelte/transition";
  import TopHeader from "./components/TopHeader.svelte";
  import { currencyValues } from "./currencyValues.js";
  
  import { blackCrewSocksImages } from "./images";
  import { blackCrewSocksImagesThreePack } from "./images";
  import { blackCrewSocksImagesFivePack } from "./images";
  import { blackAnkleSocksImages } from "./images";
  import { blackAnkleSocksImagesThreePack } from "./images";
  import { blackAnkleSocksImagesFivePack } from "./images";
  import { blueCrewSocksImages } from "./images";
  import { blueAnkleSocksImages } from "./images";
  import Loader from "./Loader.svelte";
  
  import { navigate } from "svelte-routing";
  import BackgroundVideo from "./components/BackgroundVideo.svelte";
  import Facility from "./components/Facility.svelte";
  import ProductSection from "./components/ProductSection.svelte";
  import CustomerReviews from "./components/CustomerReviews.svelte";
  import Testimonial from "./components/Testimonial.svelte";
  import CopyrightFooter from "./components/CopyrightFooter.svelte";
  
  let loading = false;
  let color,
    canvas = false,
    fprice = 25,
    discount = 0,
    discountedprice = 25,
    type,
    quantity,
    size,
    total,
    qty = 1,
    sizechart = false;
  let photos = blackCrewSocksImages;
  let totalprice = 0;
  let currentimageid = 1;
  let img;
  let currency = "USD";
  let leftSidebar = false;
  let leftSidebar2 = false;
  let currencyLogo = "$";
  let scroll = 0;

  window.addEventListener("scroll", () => {
    scroll = window.pageYOffset;
  });

  color = localStorage.getItem("color");
  type = localStorage.getItem("type");
  quantity = localStorage.getItem("quantity");
  size = localStorage.getItem("size");
  currency = localStorage.getItem("currency");
  if (currency == undefined) {
    currency = "USD";
  }

  $: orders = JSON.parse(localStorage.getItem("orders"));
  $: localStorage.setItem("orders", JSON.stringify(orders));

  $: handleprice(type, quantity, currency);

  $: handlephotos(color, type, quantity);

  $: handlecarttotal(orders);

  $: handleimg(color, type, quantity);

  $: handlecurrencychange(currency);

  const handlecurrencychange = () => {
    localStorage.setItem("currency", currency);
  };

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

  const handleCurrency = () => {
    loading = true;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        let type = order.type;
        let q = order.quantity;
        let num;
        if (q == 1) {
          num = 0;
        } else if (q == 3) {
          num = 1;
        } else {
          num = 2;
        }

        let newprice = currencyValues[currency][type][num];
        orders[i].discountedprice = newprice;
      }
    }

    loading = false;
  };

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
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 25;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 25;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 38;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 28;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 41;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 35;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 176.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 260.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 260.0;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 112;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 112;
        }
      }
      if (quantity == 3) {
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 75;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 74;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 114;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 66;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 123;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 105;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 528.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 791.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 781.0;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 73;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 143;
        }
      }
      if (quantity == 5) {
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 125;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 123;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 190;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 110;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 206;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 175;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 879.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 1318.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 1302.0;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 122;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 429;
        }
      }
    }
    if (type !== "undefined" && type == "CREW") {
      if (quantity == 1) {
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 32;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 31;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 49;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 28;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 53;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 45;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 225.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 337.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 333;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 31;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 143;
        }
      }
      if (quantity == 3) {
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 96;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 94;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 146;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 69;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 158;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 134;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 675.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 1012.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 1000.0;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 94;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 429;
        }
      }
      if (quantity == 5) {
        if (currency == "USD") {
          currencyLogo = "$";
          fprice = 160;
        }
        if (currency == "EUR") {
          currencyLogo = "€";
          fprice = 157;
        }
        if (currency == "AUD") {
          currencyLogo = "A$";
          fprice = 243;
        }
        if (currency == "GBP") {
          currencyLogo = "£";
          fprice = 140;
        }
        if (currency == "NZD") {
          currencyLogo = "NZ$";
          fprice = 263;
        }
        if (currency == "CAD") {
          currencyLogo = "C$";
          fprice = 224;
        }
        if (currency == "DKK") {
          currencyLogo = "kr.";
          fprice = 1126.0;
        }
        if (currency == "SEK") {
          currencyLogo = "kr";
          fprice = 1687.0;
        }
        if (currency == "NOK") {
          currencyLogo = "kr";
          fprice = 1667.0;
        }
        if (currency == "CHF") {
          currencyLogo = "$";
          fprice = 156;
        }
        if (currency == "PLN") {
          currencyLogo = "$";
          fprice = 714;
        }
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
      orders = [...orders, newOrder];
    } else {
      orders = [newOrder];
    }
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
    if (color == undefined) {
      color = "BLACK";
    }
    if (type == undefined) {
      type = "CREW";
    }
    if (quantity == undefined) {
      quantity = "3";
    }
    if (size == undefined) {
      size = "M";
    }

    // Load the YouTube IFrame Player API script
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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


  const handleViewCart = () => {
    navigate("/cart");
  };
</script>

<!-- svelte-ignore missing-declaration -->
<div class:blur={loading}>
  <div class="loader" style={loading ? "display:block" : "display:none"}>
    <!-- Loader component here -->
    <Loader />
  </div>

  <div class="main-container">
    <BackgroundVideo />
    {#if scroll >= 300}
      <div
        class="bg-white fixed-header-container"
        style="height:70px"
        transition:slide={{ duration: 200 }}
      >
        <div
          class="fixed-header  header w-100 d-flex justify-content-between align-items-center"
          style="max-width:1080px;margin:auto"
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
                <a href="https://app.silverlight.store" class="">HIKE-TO-EARN</a
                >
              </li>
              <li class="">
                <a href="https://silverlight.store/about/" class="">ABOUT</a>
              </li>
              <li class="">
                <a href="https://silverlight.store/blog/" class="">BLOG</a>
              </li>
            </ul>
          </div>

          <div class="inner-header-center d-flex align-items-center">
            <a
              href="https://silverlight.store/"
              title="Silverlight - Discover Something New Today"
            >
              <img
                width="150"
                height="41"
                src="https://silverlight.store/wp-content/uploads/2020/03/Silverlight_Logo_dark-grey.png"
                class="header-logo-dark"
                alt="Silverlight"
              />
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div style="max-width:1080px" class="w-100 m-auto position-relative">
    <!-- TOP Header -->
    {#if scroll >= 300}
      <div
        class="bg-white fixed-header-container"
        style="height:70px"
        transition:slide={{ duration: 200 }}
      >
        <div
          class="fixed-header  header w-100 d-flex justify-content-between align-items-center "
          style="max-width:1080px;margin:auto"
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
                <a href="https://app.silverlight.store" class="">HIKE-TO-EARN</a
                >
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
              on:click|preventDefault={() => {
                leftSidebar2 = !leftSidebar2;
              }}
              class="fa-solid fa-bars "
              style="font-size: 25px;margin-top:5px"
            />
          </div>
          {#if leftSidebar2}
            <div class="left-sidebar text-white">
              <button
                on:click|preventDefault={() => {
                  leftSidebar2 = !leftSidebar2;
                }}
              >
                x
              </button>
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
                  <a
                    href="https://silverlight.store/about/"
                    class="nav-top-link">ABOUT</a
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
          {/if}

          <div class="inner-header-center d-flex align-items-center">
            <a
              href="https://silverlight.store/"
              title="Silverlight - Discover Something New Today"
            >
              <img
                width="150"
                height="41"
                src="https://silverlight.store/wp-content/uploads/2020/03/Silverlight_Logo_dark-grey.png"
                class="header-logo-dark"
                alt="Silverlight"
              />
            </a>
          </div>

          <div class="inner-header-right  position-relative">
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
              <li class="fixed-cart-box py-2 d1">
                <a
                  href=""
                  class="py-2"
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
                    <div class="fixed-d2">
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
                            Subtotal: {currencyLogo}{totalprice}.00
                          </h6>
                        </div>
                        <div class="d-flex flex-column mt-3">
                          <button
                            on:click|preventDefault={() => {
                              handleViewCart();
                            }}
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
              <li class="html custom html_top_right_text ">
                <select
                  class="select-currency 2"
                  bind:value={currency}
                  on:change={() => {
                    handleCurrency();
                  }}
                >
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
    {/if}

    <div style="max-width:1080px" class="w-100 m-auto position-relative">
      <!-- TOP Header -->
      <div class="">
        <TopHeader />

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
                <a href="https://app.silverlight.store" class="">HIKE-TO-EARN</a
                >
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
              on:click|preventDefault={() => {
                leftSidebar = !leftSidebar;
              }}
              class="fa-solid fa-bars text-white"
              style="font-size: 25px;margin-top:5px"
            />
          </div>
          {#if leftSidebar}
            <div class="left-sidebar  text-white">
              <button
                on:click|preventDefault={() => {
                  leftSidebar = !leftSidebar;
                }}
              >
                x
              </button>
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
                  <a
                    href="https://silverlight.store/about/"
                    class="nav-top-link">ABOUT</a
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
          {/if}

          <div class="inner-header-center d-flex align-items-center">
            <a
              href="https://silverlight.store/"
              title="Silverlight - Discover Something New Today"
            >
              <img
                width="150"
                height="41"
                src="https://silverlight.store/wp-content/uploads/2022/05/silverlight-logo-white.svg"
                class="header-logo-dark"
                alt="Silverlight"
              />
            </a>
          </div>

          <div class="inner-header-right ">
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
              <li class="cart-box py-2 d1">
                <a
                  href=""
                  class="py-2"
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
                                      >{order.qty} x {currencyLogo}{order.discountedprice}.00</span
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
                            Subtotal: {currencyLogo}{totalprice}.00
                          </h6>
                        </div>
                        <div class="d-flex flex-column mt-3">
                          <button
                            on:click|preventDefault={() => {
                              handleViewCart();
                            }}
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
                <select
                  class="select-currency 3"
                  bind:value={currency}
                  on:change={() => {
                    handleCurrency();
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="NZD">NZD</option>
                  <option value="CAD">CAD</option>
                  <option value="DKK">DKK</option>
                  <option value="SEK">SEK</option>
                  <option value="NOK">NOK</option>
                  <option value="CHF">CHF</option>
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
                      <div
                        class="text-left"
                        style="font-size:12px; line-height:1"
                      >
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
                          >{order.qty} x {currencyLogo}{order.discountedprice}.00</span
                        >
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
                Subtotal: {currencyLogo}{totalprice}.00
              </h6>
            </div>
            <div class="d-flex flex-column mt-3">
              <button
                on:click|preventDefault={() => {
                  handleViewCart();
                }}
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
            <h1
              class="font-bold"
              style="font-size: 27.2px; margin-bottom: 20px;"
            >
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
                  Blister-Blasting. Fast-Drying. Silky-Smooth Compression
                  Comfort. Long-Lasting Durability.
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
                    <td class="label"><label for="quantity">QUANTITY</label></td
                    >
                    <td class="">
                      <ul
                        role="radiogroup"
                        aria-label="quantity"
                        class="d-flex"
                      >
                        <li>
                          <div class="">
                            <button
                              class={quantity == 1 ? "selected" : ""}
                              on:click={() => {
                                (quantity = "1"), (currentimageid = 1);
                              }}>1 Pack</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="">
                            <button
                              class={quantity == 3 ? "selected" : ""}
                              on:click={() => {
                                (quantity = "3"), (currentimageid = 1);
                              }}>3 Pack</button
                            >
                          </div>
                        </li>
                        <li>
                          <div class="">
                            <button
                              class={quantity == 5 ? "selected" : ""}
                              on:click={() => {
                                (quantity = "5"), (currentimageid = 1);
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
                                <span
                                  ><span class="">{currencyLogo}</span
                                  >{fprice}</span
                                >
                              {/if}
                            </span>
                          </del>
                          <ins style="text-decoration: none;">
                            <span>
                              {currencyLogo}{discountedprice}
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
        <Facility />

        <!-- HOW SILVERLIGHT SOCKS COMPARE TO THE COMPETITION -->
        <ProductSection />

        <!-- CUSTOMER REVIEWS -->
        <CustomerReviews />

        <!-- PEOPLE LOVE US -->
        <Testimonial />
        <!-- <div class="video-popup-conf">{"video_url":"true"}</div> -->
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
      <CopyrightFooter />

      <!-- <a
      href="#top"
      class="back-to-top button icon invert plain fixed bottom z-1 is-outline circle active"
      id="top-link"><i class="icon-angle-up" /></a
    > -->
    </footer>
    {#if scroll >= 200}
      <div
        class="fixed-socks-selection fixed-bottom d-flex justify-content-around flex-wrap"
        transition:fade={{ duration: 200 }}
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
            <div
              class="d-flex flex-wrap"
              style="padding-left:10px; font-size:14px"
            >
              <span style="margin-left: 10px;">
                {#if discount != 0}
                  <del>
                    <span style="color:#777777"> {currencyLogo}{fprice} </span>
                  </del>
                  <span style="font-weight: 700"
                    >{currencyLogo}{discountedprice}</span
                  >
                {:else}
                  <span style="color:#777777"> {currencyLogo}{fprice} </span>
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
              <option value="1">1 Pack</option>
              <option value="3">3 Pack</option>
              <option value="5">5 Pack</option>
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
                style="background-color: #FFFFFF;"
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
    {/if}
  </div>
</div>

<style>
  .blur {
    filter: blur(0.35px);
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .main-container {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .bar-icon {
    display: none;
  }
  .fixed-header-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 500;
  }

  .fixed-header {
    display: flex;
    color: #777777;
    height: 70px !important;
  }

  .fixed-header img {
    height: 20px;
  }

  .fixed-header li a {
    color: #777777;
  }

  .fixed-cart-box li strong {
    color: #777777;
  }

  .fixed-header li select {
    color: #777777;
  }

  .fixed-cart-box li {
    display: flex;
    list-style: none;
    padding: 0;
    position: relative;
    margin: 0 7px;
    transition: background-color 0.3s;
    background-color: transparent;
    border: 2px solid #777777;
    width: 30px;
    height: 30px;
    text-align: -webkit-right;
    justify-content: center;
    align-items: center;
  }

  .fixed-cart-box li:hover {
    background-color: #000000;
    color: #ffffff !important;
  }

  .fixed-cart-box li a:hover {
    color: #ffffff;
  }

  .fixed-cart-box li:hover strong {
    color: #777777;
  }

  .fixed-cart-box li a:hover {
    color: #ffffff;
  }

  .fixed-cart-box li:hover strong {
    color: #ffffff;
  }

  .fixed-cart-box li:hover .cart-icon strong:after {
    height: 10px;
  }

  .fixed-cart-box li strong:after {
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
    border: 2px solid #777777;
    border-top-left-radius: 99px;
    border-top-right-radius: 99px;
    border-bottom: 0;
  }

  .fixed-socks-selection {
    background-color: #ffffff;
    padding: 10px 20px;
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
    bottom: 0;
    display: none;
    z-index: 499 !important;
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

  .zoomy img {
    cursor: auto;
    width: 100%;
    height: auto;
    backface-visibility: hidden;
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
    right: 95px;
    z-index: -1;
  }

  .fixed-d2::before {
    content: "A";
    color: #dee2e6;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -5px;
    background-color: #dee2e6;
    transform: rotateY(0deg) rotate(45deg);
    right: 95px;
    z-index: -1;
  }

  .d2 {
    display: none;
  }

  .fixed-d2 {
    display: none;
  }

  .d1:hover .d2 {
    display: block;
    background-color: white;
    border: 1px solid #777777a4;
    color: black;
    position: absolute;
    width: 300px;
    margin-top: 8px;
    right: 5px;
    text-align: center;
  }

  .d1:hover .fixed-d2 {
    display: block;
    background-color: white;
    border: 1px solid #777777a4;
    color: black;
    position: absolute;
    width: 300px;
    margin-top: 8px;
    right: -25px;
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
    cursor: pointer;
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
    max-width: 1080px;
    background-color: #ffffff;
    padding: 15px;
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
    border: 2.4px solid #000000 !important;
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

  .cart-box li:hover .cart-icon strong:after {
    height: 10px;
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

  .sidebar {
    display: none;
  }

  .footer-wrapper {
    padding: 40px 0 110px 0;
    font-size: 14px;
  }

  @media screen and (max-width: 850px) {
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
      display: block !important;
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
      z-index: 1200;
      bottom: 0;
      overflow: scroll;
      scroll-behavior: smooth;
    }

    .fixed-d2 {
      display: none !important;
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

    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 130px 0;
    }
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 620px) {
    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 165px 0;
    }
  }

  @media screen and (max-width: 480px) {
    .silver-hiking-socks-wrapper h1 {
      font-size: 22px !important;
      text-align: center;
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
