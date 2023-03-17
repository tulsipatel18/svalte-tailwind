<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  //svelte functions
  import Loader from "./Loader.svelte";

  //components
  import BackgroundVideo from "./components/BackgroundVideo.svelte";
  import Facility from "./components/Facility.svelte";
  import CopyrightFooter from "./components/CopyrightFooter.svelte";

  //utils
  import { CurrencyLogo } from "./components/CurrencyLogo";
  import { currencyValues } from "./currencyValues.js";

  //global variables
  import { cartContents, cartTotal } from "./store";

  //local variables
  let tax = 0;
  let loading = false;
  let currency = "USD";
  let currencyLogo = "$";
  let paypalfee=0;
  let totalcheckout=0;


  if ($cartContents.length != 0) {
    currency = $cartContents[0].currency;

    currencyLogo = $cartContents[0].currencyLogo;
  }

  $: handleCartprice($cartContents);
  $:handleTotalCheckout($cartContents);

  const handleTotalCheckout=()=>{
    paypalfee=($cartTotal*3.65)/100;
    paypalfee=Number(paypalfee.toFixed(2));

    totalcheckout=$cartTotal+paypalfee;
  }

  const handleCartprice = () => {
    let total = 0;
    if ($cartContents) {
      for (let i = 0; i < $cartContents.length; i++) {
        let order = $cartContents[i];
        total += order.discountedprice * order.qty;
      }
    }
    $cartTotal = total;
    
  };

  const handleDelete = (id) => {
    console.log(id);
    $cartContents = $cartContents.filter((order) => order.id !== id);
    
  };

  const handleqty = (id) => {
    if ($cartContents) {
      for (let i = 0; i < $cartContents.length; i++) {
        if ($cartContents[i].id == id) {
          $cartContents[i].qty += 1;
        }
      }
    }
  };

  const handleqtydec = (id) => {
    if ($cartContents) {
      for (let i = 0; i < $cartContents.length; i++) {
        if ($cartContents[i].id == id) {
          if ($cartContents[i].qty != 1) {
            $cartContents[i].qty -= 1;
          }
        }
      }
    }
  };

  const handleCurrency = () => {
    loading = true;
    if ($cartContents) {
      for (let i = 0; i < $cartContents.length; i++) {
        let order = $cartContents[i];
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
        currencyLogo = CurrencyLogo[currency];
        let newprice = currencyValues[currency][type][num];
        $cartContents[i].discountedprice = newprice;
        $cartContents[i].currency = currency;
        $cartContents[i].currencyLogo = currencyLogo;
      }
    }
    loading = false;
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
        <a href="" title="Silverlight - Discover Something New Today">
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
              {#each $cartContents as order}
                <tr class="">
                  <td class="">
                    <div class="d-block mr-1">
                      <button
                        on:click|preventDefault={() => {
                          handleDelete(order.id);
                        }}
                        class="rounded-circle remove-item-button product-delete"
                        >x</button
                      >
                    </div>
                  </td>

                  <td class="product-thumbnail">
                    <div class="product-image">
                      <a href="">
                        <img
                          src={order.img}
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
                          <span>COLOR : {order.color}</span>
                          <span>TYPE : {order.type}</span>
                          <span>QUANTITY : {order.qty==null?0:order.qty} PACK </span>
                          <span>PACK SIZE : {order.size}</span>
                          <div class="show-550">
                            <div
                              class="text-left "
                              style="font-weight: bold; color: #21a921; opacity: 0.8;"
                            >
                              {#if order.discount != 0}
                                <span>Save&nbsp;{order.discount}%</span>
                              {/if}
                            </div>
                            <div class="text-left">
                              <span
                                >{order.currencyLogo} {order.discountedprice}</span
                              >
                            </div>
                            <div class="woocommerce-Price-currencySymbol">
                              {order.currencyLogo} {order.discountedprice}
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
                      {#if order.discount != 0}
                        <span>Save&nbsp;{order.discount}%</span>
                      {/if}
                    </div>

                    <div class="text-left">
                      <span style="font-weight:500"
                        >{order.currencyLogo} {order.discountedprice}</span
                      >
                    </div>
                  </td>

                  <td class="product-quantity" data-title="Quantity">
                    <div class="quantity d-flex round-pill">
                      <input
                        type="button"
                        value="-"
                        class="minus button is-form"
                        on:click={() => {
                          handleqtydec(order.id);
                        }}
                      />

                      <input
                        type="number"
                        class="qty svelte-1oguz22"
                        
                        max="15"
                        name="quantity"
                        title="Qty"
                        size="4"
                        pattern="[0-9]*"
                        inputmode="numeric"
                        style="background-color: rgb(255, 255, 255);"
                        bind:value={order.qty}
                        on:input={() => {
                          console.log(order.qty);
                          if(order.qty<1 && order.qty!=null){
                            order.qty=1;
                          }
                        }}
                        on:focusout={()=>{
                          if(order.qty==null){
                            order.qty=1;
                          }
                        }}
                      />

                      <input
                        type="button"
                        value="+"
                        class="plus button is-form"
                        on:click={() => {
                          handleqty(order.id);
                        }}
                      />
                    </div>
                  </td>

                  <td class="product-subtotal hide-550" data-title="Total">
                    <span
                      class="woocommerce-Price-currencySymbol"
                      style="font-weight:500"
                    >
                      {order.currencyLogo} {order.discountedprice}
                    </span>
                  </td>
                </tr>
              {/each}

              <tr style="border-bottom: none;">
                <td colspan="6" style="padding: 25px 0 15px 0;">
                  <span class="continue-shopping px-2 py-1">
                    <a
                      class=""
                      href="/"
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
                    style="border-bottom: 2px solid rgb(236, 236, 236);"
                  >
                    <div>Subtotal</div>
                    <span style="font-weight:500;color:#000000">
                      {currencyLogo} {$cartTotal}
                    </span>
                  </div>

                  <div
                    class="shipping d-flex justify-content-between py-3 pr-3"
                    style="border-bottom: 2px solid rgb(236, 236, 236);"
                  >
                    <div>Shipping</div>
                    <span style="font-weight:500;font-size: 13px;color:#21a921">
                      Free shipping
                    </span>
                  </div>

                  <div
                    class="tax-total d-flex justify-content-between py-3 pr-3"
                    style="border-bottom: 2px solid rgb(236, 236, 236);"
                  >
                    <div>PayPal Fee</div>
                    <span style="font-weight:500;color:#000000">{currencyLogo} {paypalfee}</span>
                  </div>

                  <div
                    class="tax-total d-flex justify-content-between py-3 pr-3"
                    style="border-bottom: 2px solid rgb(236, 236, 236);"
                  >
                    <div>
                      VAT <small>(estimated for Andorra)</small>
                    </div>
                    <span style="font-weight:500;color:#000000"
                      >{currencyLogo} {tax}</span
                    >
                  </div>

                  <div
                    class="order-total d-flex justify-content-between py-3 pr-3"
                    style="border-bottom: 2px solid rgb(236, 236, 236);"
                  >
                    <div>Total</div>
                    <span style="font-weight:500;color:#000000">
                      {currencyLogo} {totalcheckout + tax}
                    </span>
                  </div>
                </div>
              </div>
              <div class="proceed-to-checkout py-2" style="margin:24px 0">
                <a
                  href=""
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
      <div style="margin:25px -15px">
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

  .product-details-table tr {
    border-bottom: 2px solid rgb(236, 236, 236);
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

  .plus {
    min-width: 25px;
  }

  .minus {
    min-width: 25px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .footer-wrapper {
    padding: 40px 0 40px 0;
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
      padding: 40px 0 40px 0;
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
      padding: 40px 0 40px 0;
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
      padding: 40px 0 40px 0;
    }

    .inner-header-center img {
      width: 100%;
    }
  }
</style>
