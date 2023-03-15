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
  </div>

  <!-- <div style="max-width:1080px" class="w-100 m-auto position-relative"> -->
  <div style="max-width:1080px" class="w-100 m-auto position-relative">
    <div class="header w-100 d-flex justify-content-between align-items-center">
      <div class="d-flex inner-header-left">
        <ul class="align-items-center d-none">
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
      <div class="bar-icon d-none">
        <i
          on:click|preventDefault={() => {
            leftSidebar = !leftSidebar;
          }}
          class="fa-solid fa-bars"
          style="font-size: 25px;margin-top:5px"
        />
      </div>

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

    <div class="container-1080">
      <div class="sub-container-1080">
        <div class="product-container">
          <table class="product-details-table">
            <thead class="product-details-heading">
              <tr>
                <th
                  class="product-name"
                  colspan="3"
                  style="padding:12px 18px 12px 0">PRODUCT</th
                >

                <th class="product-price hide-550" style="padding:12px 18px"
                  >PRICE</th
                >

                <th class="product-quantity" style="padding:12px 18px"
                  >QUANTITY</th
                >

                <th
                  class="product-subtotal hide-550"
                  style="padding:12px 0 12px 18px">TOTAL</th
                >
              </tr>
            </thead>

            <tbody>
              <tr class="">
                <td class="">
                  <div class="d-block mr-1">
                    <button
                      class="rounded-circle remove-item-button product-delete"
                      >x</button
                    >
                  </div>
                </td>

                <td class="product-thumbnail">
                  <div class="product-image">
                    <a
                      href="https://silverlight.store/product/silverlight-socks/?attribute_pa_color=black&amp;attribute_type=Crew&amp;attribute_quantity=3+Pack&amp;attribute_pa_size=medium"
                    >
                      <img
                        src="https://silverlight.store/wp-content/uploads/2020/03/crew-3-pack-247x296.jpg"
                        class="w-100"
                        alt="Silverlight Crew Socks 3 Pack"
                      />
                    </a>
                  </div>
                </td>

                <td class="product-name" data-title="Product">
                  <div
                    class="cart-container d-flex justify-content-between"
                    style="margin-left: -15px;margin-top:10px"
                  >
                    <div
                      class="d-flex flex-column align-items-start"
                      style="color:#777777;margin-bottom: 10px;margin:0 10px"
                    >
                      <div
                        class="text-left silverlight-socks"
                        style="color:#777777;font-weight:600;line-height:1.2"
                      >
                        <a href="">Silverlight Hiking Socks</a>
                      </div>
                      <div
                        class="text-left d-flex flex-column"
                        style="font-size:12px;margin:6px 0;color:#666666;line-height:1.3"
                      >
                        <span>COLOR : BLACK</span>
                        <span>TYPE : CREW</span>
                        <span>QUANTITY : 3 PACK </span>
                        <span>PACK SIZE : XL</span>
                        <div class="show-550">
                          <div
                            class="text-left "
                            style="font-weight: bold; color: #21a921; opacity: 0.8;"
                          >
                            <span>Save&nbsp;15%</span>
                          </div>
                          <div class="text-left">
                            <span>$300.00</span>
                          </div>
                          <div class="woocommerce-Price-currencySymbol">
                            A$488.00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="product-price hide-550" data-title="Price">
                  <div
                    class="text-left"
                    style="font-weight: bold; color: #21a921; opacity: 0.8;"
                  >
                    <span>Save&nbsp;15%</span>
                  </div>

                  <div class="text-left">
                    <span>$300.00</span>
                  </div>
                </td>

                <td class="product-quantity" data-title="Quantity">
                  <div class="quantity d-flex round-pill">
                    <input
                      type="button"
                      value="-"
                      class="minus button is-form"
                      on:click={handleqtydec}
                    />

                    <input
                      type="number"
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
                    />
                    <input
                      type="button"
                      value="+"
                      class="plus button is-form"
                      on:click={handleqty}
                    />
                  </div>
                </td>

                <td class="product-subtotal hide-550" data-title="Total">
                  <span class="woocommerce-Price-currencySymbol">
                    A$488.00
                  </span>
                </td>
              </tr>

              <tr>
                <td colspan="6" style="padding: 25px 0 15px 0;">
                  <span class="continue-shopping px-2 py-1">
                    <a
                      class=""
                      href="/product/silverlight-socks/"
                      style="margin:0 14px 14px 0;font-size:12px"
                    >
                      <i class="fa fa-long-arrow-left mx-2" />
                      CONTINUE SHOPPING
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cart-total-container">
          <div class="cart-sidebar col-inner">
            <div class="cart_totals">
              <div
                style="padding:12px 0;letter-spacing:.8px;color:#777777;font-weight:500;border-bottom: 3px solid #ececec;font-size:14px"
              >
                CART TOTALS
              </div>

              <div
                cellspacing="0"
                class="shop_table shop_table_responsive"
                style="font-size: 14px;color:#777777;line-height:1.05"
              >
                <div>
                  <div
                    class="cart-subtotal d-flex justify-content-between py-3 pr-3"
                  >
                    <div>Subtotal</div>
                    <span> A$488.00 </span>
                  </div>

                  <div
                    class="shipping d-flex justify-content-between py-3 pr-3"
                  >
                    <div>Shipping</div>
                    <span style="font-size: 13px;color:#21a921">
                      Free shipping
                    </span>
                  </div>

                  <div
                    class="tax-total d-flex justify-content-between py-3 pr-3"
                  >
                    <div>
                      VAT <small>(estimated for Andorra)</small>
                    </div>
                    <span>A$0.00</span>
                  </div>

                  <div
                    class="order-total d-flex justify-content-between py-3 pr-3"
                  >
                    <div>Total</div>
                    <span> A$488.00 </span>
                  </div>
                </div>
              </div>
              <div class="proceed-to-checkout py-2" style="margin:24px 0">
                <a
                  href="https://silverlight.store/checkout/"
                  class="checkout-button button alt wc-forward wp-element-button"
                >
                  PROCEED TO CHECKOUT</a
                >
              </div>
            </div>

            <form class="checkout_coupon mb-0" method="post">
              <div class="coupon">
                <h6
                  class="widget-title"
                  style="margin:0 0 15px 0;padding:0 0 10px 0;color:#777777"
                >
                  <i
                    class="fa-solid fa-tag"
                    style="color:#55555559;transform:rotate(90deg)"
                  /> Coupon
                </h6>
                <input
                  type="text"
                  name="coupon_code"
                  class="input-text w-100"
                  style="margin:0 0 15px 0"
                  id="coupon_code"
                  value=""
                  placeholder="Coupon code"
                />
                <button class="w-100" style="margin:0 15px 15px 0;color:#777777"
                  >Apply coupon</button
                >
              </div>
            </form>

            <div class="cart-sidebar-content relative" />
          </div>
        </div>
      </div>
      <!--- Facility Container --->
      <div style="margin:25px 0">
        <Facility />
      </div>
    </div>
  </div>

  <footer class="footer-wrapper">
    <CopyrightFooter />
  </footer>
</div>

<!-- </div> -->
<style>
  .blur {
    filter: blur(0.35px);
  }

  .bar-icon {
    color: transparent;
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

  .header {
    padding: 0 28px;
    height: 100px;
  }

  /* .inner-header-left ul {
    padding: 0;
    margin: 0;
  } */

  .inner-header-right ul {
    padding: 0;
    margin: 0;
  }

  /* .inner-header-left li {
    list-style: none;
    margin: 0 5px;
    color: #ffffff;
  } */

  /* .inner-header-left a {
    color: #ffffff;
    text-decoration: none;
    opacity: 0.8;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
  } */

  /* .inner-header-left a:hover {
    opacity: 1;
  } */

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

  .container-1080 {
    max-width: 1080px;
    background-color: #ffffff;
    padding: 15px 30px;
  }

  .sub-container-1080 {
    display: flex;
  }

  .product-container {
    width: 60%;
    padding: 0 30px 0 15px;
    margin-top: 20px;
  }

  .product-details-table td {
    padding: 15px 6px;
  }

  .product-details-heading {
    padding: 15px 0px;
    letter-spacing: 0.8px;
    color: rgb(119, 119, 119);
    border-bottom: 3px solid rgb(236, 236, 236);
  }

  .product-details-heading th {
    padding: 15px 0;
    font-weight: 500;
    font-size: 14px;
  }

  .product-image {
    min-width: 60px;
    max-width: 90px;
    width: 90px;
  }

  .silverlight-socks a {
    text-decoration: none;
    color: #777777;
    font-size: 13px;
  }

  .silverlight-socks a:hover {
    color: #1cb9a2;
  }

  .cart-total-container {
    width: 40%;
    padding: 0 15px 0 30px;
    margin-top: 20px;
  }

  .product-delete {
    display: block;
    width: 25px;
    height: 25px;
    font-size: 15px !important;
    line-height: 1.9px !important;
    border-radius: 100%;
    color: #ccc;
    font-weight: bold;
    text-align: center;
    border: 2px solid currentColor;
    align-items: center;
  }

  .product-delete:hover {
    color: #000000;
  }

  .continue-shopping {
    border: 2px solid #1cb9a2;
    font-weight: 500;
  }

  .continue-shopping:hover {
    border: 2px solid #1cb9a2;
    background-color: #1cb9a2;
    color: #ffffff;
    font-weight: 500;
  }

  .continue-shopping:hover a {
    color: #ffffff;
  }

  .continue-shopping a {
    color: #1cb9a2;
    margin: 0 14px 14px 0;
    text-decoration: none;
  }

  .show-550 {
    display: none;
  }

  .proceed-to-checkout {
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    font-weight: 500;
  }

  .proceed-to-checkout a {
    text-decoration: none;
    color: #ffffff;
  }

  .qty {
    background-color: #f0f0f0;
    text-align: center;
    width: 40px;
    outline: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .footer-wrapper {
    padding: 40px 0 110px 0;
    font-size: 14px;
  }

  @media screen and (max-width: 850px) {
    .header {
      background-color: #2b6079;
    }
    .inner-header-left {
      display: none !important;
    }

    .bar-icon {
      display: block !important;
      flex: 0.5;
    }

    .inner-header-center {
      flex: 1;
    }

    .container-1080 {
      display: block;
      width: 100%;
    }

    .sub-container-1080 {
      display: block;
    }

    .product-details-table {
      width: 100%;
    }

    .product-container {
      width: 100%;
      padding: 0 15px;
    }

    .cart-total-container {
      width: 100%;
      padding: 0 15px;
    }

    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 130px 0;
    }
  }

  @media screen and (max-width: 768px) {
    .container-1080 {
      padding: 15px;
    }

    .product-container {
      margin-top: 0;
      padding: 0;
    }

    .cart-total-container {
      margin-top: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: 620px) {
    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 165px 0;
    }
  }

  @media screen and (max-width: 550px) {
    .hide-550 {
      display: none;
    }

    .show-550 {
      display: block;
    }
  }

  @media screen and (max-width: 420px) {
  }

  @media screen and (max-width: 370px) {
    .footer-wrapper {
      background-color: #000000;
      padding: 40px 0 200px 0;
    }

    .inner-header-center img {
      width: 100%;
    }
  }
</style>
