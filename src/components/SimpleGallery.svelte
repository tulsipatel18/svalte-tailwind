<script>
    import { onMount } from "svelte";
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import 'photoswipe/style.css';
    export let galleryID;
    export let photos;
    
    
    onMount(() => {
        let lightbox = new PhotoSwipeLightbox({
          gallery: '#' + galleryID,
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
    })
      </script>
    
        <div class="pswp-gallery" id={galleryID}>
        {#each photos as image}
        <a
              href={image.largeImg}
              data-pswp-width={1875}
              data-pswp-height={2000}
              target="_blank"
              rel="noreferrer"
            >
              <!-- <img src={image.thumbImg} alt="" /> -->
              </a>
        {/each}
        </div>
    