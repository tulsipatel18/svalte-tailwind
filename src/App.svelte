
<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import jQuery from "jquery";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import SimpleGallery from "./components/SimpleGallery.svelte";
  import { beforeUpdate, afterUpdate } from "svelte";
  
  

  export let blackCrewSocksImages;
  export let blackCrewSocksImagesThreePack;
  export let blackCrewSocksImagesFivePack;
  export let blackAnkleSocksImages;
  export let blackAnkleSocksImagesThreePack;
  export let blackAnkleSocksImagesFivePack;
  export let blueCrewSocksImages;
  export let blueAnkleSocksImages;

  let color,
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

  color = localStorage.getItem("color");
  type = localStorage.getItem("type");
  quantity = localStorage.getItem("quantity");
  size = localStorage.getItem("size");

  color = localStorage.getItem("color");
  type = localStorage.getItem("type");
  quantity = localStorage.getItem("quantity");
  size = localStorage.getItem("size");

  $: orders = JSON.parse(localStorage.getItem("orders"));
  $: localStorage.setItem("orders", JSON.stringify(orders));
  $: handleprice(type, quantity);
  $: handlephotos(color, type, quantity);
  $: handlecarttotal(orders);
  $: handleimg(color, type,quantity);

  const handleimg = () => {
    if (color == "BLACK") {
      if (type == "ANKLE") {
        if(quantity==1){
          img = blackAnkleSocksImages[0].thumbImg;
        }
        if(quantity==3){
          img=blackAnkleSocksImagesThreePack[0].thumbImg;
          
        }
        if(quantity==5){
          img=blackAnkleSocksImagesFivePack[0].thumbImg;
        }

       
      }
      if (type == "CREW") {
        if(quantity==1){
          img = blackCrewSocksImages[0].thumbImg;
        }
        if(quantity==3){
          img=blackCrewSocksImagesThreePack[0].thumbImg;
          
        }
        if(quantity==5){
          img=blackCrewSocksImagesFivePack[0].thumbImg;

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
    console.log(currentimageid),
    console.log(orders);
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

    window.alert(
      `color : ${color}  , type : ${type}  , quantity : ${quantity}  , size : ${size}  ,  price : ${total}`
    );
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
  
</script>

<!-- svelte-ignore missing-declaration -->











<div class="main-container" >
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
  <div style="max-width:1080px" class="w-100 ">
    
    <div class="navbar justify-content-end">
      <a href="" class="d1">
        <li class="cart-item">
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
          <div class="p-4">
           

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
                      
                        <div class="text-left" style="font-weight: bold; color: green; opacity: 0.8;" class:d-none={order.discount==0}>
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
    </div>
    <div class="container-1080">
      <div class="w-50 socks-slider-wrapper container">
        <div class="">
          <div
            transition:fade={{ duration: 10 }}
            class="slider slider-single opacity-100"
          >
            {#each photos as image}
              <!-- {#if currentimageid==image.id} -->
              <!-- in:fade out:fade -->
              <div class="slider slider-single" on:click|preventDefault={() => {
                currentimageid = image.id;
              }} >
                <!-- <img  class="opacity-100 w-100"  src={image.largeImg} alt="" /> -->

                <div class="pswp-gallery tmp" id={galleryID}>
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
                  <img
                  class="opacity-100 w-100 tmp slider-nav"
                  src={image.largeImg}
                  alt=""
                  />
                  
                </div>
              </div>
              <!-- {/if} -->
            {/each}
          </div>

          <div class="slider slider-nav" class:d-none={color == "BLUE"}>
            {#each photos as image}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
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
              <div class="d-flex justify-content-between">
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
          <div class="">
            <div class="d-flex" style="margin:12px 0 15px 0">
              <div class="price-wrapper">
                <p class="price product-page-price">
                  <span class="price"
                    ><span class=""
                      ><del aria-hidden="true">
                        <span class="">
                          {#if discount != 0}
                            <span><span class="">$</span>{fprice}</span>
                          {/if}
                        </span>
                      </del>
                      <ins style="text-decoration: none;"
                        ><span
                          ><span><span class="">$</span>{discountedprice}</span
                          ></span
                        ></ins
                      ></span
                    ></span
                  >
                </p>

                {#if discount != 0}
                  <p class="save">Save {discount}%</p>
                {/if}
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
        <div transition:fade={{ duration: 200 }} class="size-chart-center">
          <p class="text-right m-0"><span class="close-chart">X</span></p>
          <img
            src="https://silverlight.store/wp-content/uploads/2019/10/Size-chart2021-510x305.jpg"
            alt=""
          />
        </div>
      {/if}
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
</div>

<style>
  .d2::before {
    content: "A";
    color: #DEE2E6;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -5px;
    background-color: #DEE2E6;
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

  /* .slider {
    opacity: 1 !important;
  } */

  /* .slider img {
    opacity: 1 !important;
  } */

  .slider-single img {
    opacity: 1 !important;
  }

  .slider-nav {
    display: grid;
  }

  /* .slider-nav img{
    opacity: 0.5 !important;
  } */

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
    top: 30px;
    color: #000000;
    background: #FFFFFF;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-track {
    width: 100%;
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

  .cart-container img{
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
