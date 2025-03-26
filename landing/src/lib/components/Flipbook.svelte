<script>
let images = [
  "https://picsum.photos/1200/800?random=1",
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
  "https://picsum.photos/1200/800?random=4",
  "https://picsum.photos/1200/800?random=5",
  "https://picsum.photos/1200/800?random=6",
  "https://picsum.photos/1200/800?random=7",
  "https://picsum.photos/1200/800?random=8",
  "https://picsum.photos/1200/800?random=9",
  "https://picsum.photos/1200/800?random=10",
];
import {PageFlip} from 'page-flip';
import { onMount } from 'svelte';
onMount(() => {
  const pageFlip = new PageFlip(document.getElementById('book'),
      {
          width: 600, // required parameter - base page width
          height: 400,  // required parameter - base page height
          showCover: true,
          drawShadow: false,
          flippingTime: 500,
      }
  );
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});
</script>

<div id="bg">
  <div id="book">
    {#each images as image}
      <img class="page" src={image} alt="">
    {/each}
  </div>
</div>

<style>
#bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
}
#book {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
}
.page {
  width: 20vw;
  height: auto;
  cursor: pointer;
}
</style>