<!-- <script>
  let currentIndex = 0;
  let interval;

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function startAutoSlide() {
    interval = setInterval(next, 10000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  startAutoSlide();
</script>

<style>
  .slider-container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 50vw;
    height: 50vh;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }

  .slider-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.1s linear;
  }

  .slider-image.active {
    opacity: 1;
  }

  .buttons {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }

  button {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
</style>

<div class="slider-container" on:mouseenter={stopAutoSlide} on:mouseleave={startAutoSlide}>
  {#each images as img, i}
    <img
      src={img}
      alt="Flipbook slide"
      class="slider-image {i === currentIndex ? 'active' : ''}"
    />
  {/each}
  
  <div class="buttons">
    <button on:click={prev}>◀</button>
    <button on:click={next}>▶</button>
  </div>
</div> -->


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