<script>
import "../app.css";
let { children } = $props()

// Seo
const seoTitle = "Inside Contract"
const seoDescription = "Description" // Todo
const seoUrl = "canonicUrl" // Todo
const seoImg = "/img/insideContract-all.webp"
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription}>
  <link rel="canonical" href={seoUrl}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content={seoTitle}>
  <meta property="og:description" content={seoDescription}>
  <meta property="og:image" content={seoImg}>
  <meta property="og:url" content={seoUrl}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content={seoTitle}>
</svelte:head>

<header>
  <h1><a class="logo" href="/"><span class="straight">InsideContr</span>a<span class="straight">ct</span></a></h1>
</header>

<main>
  {@render children()}
</main>

<style>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-bottom: solid 3.5px var(--black);
  position: fixed;
  top: 0;
  z-index: 2;
}
.logo {
  font-size: 1.5rem;
}
main {
  margin-top: var(--headerHeight);
}
</style>