<script>
import "../app.css";
let { children } = $props()
</script>

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
main {
  margin-top: var(--headerHeight);
}
</style>