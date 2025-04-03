<script>
import { materials } from '$lib/materials.js';
import Footer from "$lib/components/Footer.svelte";
import { enhance, applyAction } from '$app/forms';
import { register } from 'swiper/element/bundle';
register();

// import { TinyPDF } from 'svelte-tiny-pdf';
import Flipbook from '$lib/components/Flipbook.svelte';
let showFlipbook = $state(false);
const pdfUrl = "/download/insideContract-portfolio_2025.pdf";

let isSubmitted = $state(false);
let isSubmitting = $state(false);
let isErrorous = $state(false);
let isEmpty = $state(false);
let isEmptyEmail = $state(false);
let isEmptyMessage = $state(false);

let innerHeight = $state(0);
let innerWidth = $state(0);
let scrollY = $state(0);
let contact = $state(null);
let payoff = $state(null);
let activeMaterials = $state([])

function handleClickPayoff() {
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--headerHeight')) || 0;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 0;
  scrollY = payoff.getBoundingClientRect().top + scrollY - (innerHeight - payoff.offsetHeight) + headerHeight*fontSize;
}

function handleClickContact() {
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--headerHeight')) || 0;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 0;
  scrollY = contact.getBoundingClientRect().top + scrollY - headerHeight*fontSize;
  console.log(contact);
}

function updateActiveMaterials() {
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--headerHeight')) || 0;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 0;
  const threshold = headerHeight * fontSize;

  const materialElements = document.querySelectorAll(".material");
  
  for (let i = 0; i < materialElements.length; i++) {
    const rect = materialElements[i].getBoundingClientRect();
    
    // Only push the element index if it's not already in the activeMaterials array
    if (rect.top <= threshold && rect.bottom >= threshold && !activeMaterials.includes(i)) {
      activeMaterials.push(i);
    }
    
    // Remove the element index if it's out of the viewport (check it is currently in activeMaterials)
    else if (rect.top > threshold || rect.bottom < threshold) {
      const index = activeMaterials.indexOf(i);
      if (index !== -1) {
        activeMaterials.splice(index, 1); // Remove the index if it exists in the array
      }
    }
  }
}


const handleEnhance = ({ formElement, formData, action, cancel }) => {
  return async ({ result }) => {
    console.log(result);
    if (result.data.success) {
      isSubmitted = true;
      formElement.reset()
    } else if (!result.data.success) {
      if (result.data.empty) {
        isEmpty = true
        if (result.data.emptyFields.includes('email')) {
          isEmptyEmail = true
        }
        if (result.data.emptyFields.includes('message')) {
          isEmptyMessage = true
        }
      } else {
        isErrorous = true;
      }
    }
    isSubmitting = false
    await applyAction(result);
  };
};

const resetFormStates = () => {
  setTimeout(() => {
    isSubmitted = false;
    isSubmitting = false;
    isErrorous = false;
    isEmpty = false
  }, 5000);
};

$effect(() => {
  if (isSubmitted || isErrorous || isEmpty) resetFormStates();
});
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollY onscroll={updateActiveMaterials}></svelte:window>

{#if showFlipbook}
  <Flipbook />
{/if}

<section id="hero" class="bg-ivory">
  <img class="left" src="/img/insideContract-all.webp" alt="">
  <div class="right p-1">
    <h2>I—C è un’azienda specializzata nella realizzazione di progetti di interior contract. Fondata negli anni ’80 in Toscana, un territorio di eccellenza artigianale da sempre sensibile alla qualità atmosferica dello spazio, è impegnata nella produzione di arredi e soluzioni su misura in ambito residenziale, hospitality e retail. </h2>
    <div class="ctas">
      <button onclick={() => handleClickPayoff()}>↓&#8194;Scopri di più</button>
      <button onclick={() => handleClickContact()}>↓&#8194;Richiedi informazioni</button>
      <!-- <a href="ISSUU">↓&#8194;Vedi il portfolio 2025</a> -->
      <!-- <button onclick={() => showFlipbook = true}>↓&#8194;Vedi il portfolio 2025</button> -->
    </div>
  </div>
</section>

<section id="payoff" class="bg-warm-gray" bind:this={payoff}>
  <p>Ogni progetto è su misura, <br class="mobile-only">ogni dettaglio conta</p>
</section>

<section id="services" class="bg-cool-gray">
  <div class="services">
    <h4>Services</h4>
    <h3 class="service desktop-only"><span>①</span>Partner</h3>
    <h3 class="service desktop-only"><span>②</span>Develop</h3>
    <h3 class="service desktop-only"><span>③</span>Furnish</h3>
  </div>
  <div class="description p-1 desktop-only">
    <p>I-C supporta architetti, aziende e privati nell'esecuzione dei progetti più esigenti. Allineandosi alla visione e alle aspettative condivise dalla committenza, I-C lavora nel rispetto dei vincoli posti dal capitolato e dalle tempistiche di consegna, rimanendo in ascolto delle richieste che emergono durante tutte le fasi del cantiere.</p>
    <p>I-C mette la qualità al centro di ogni tappa del progetto. Grazie all'expertise consolidata dei propri reparti produttivi, I-C orienta e combina lavorazioni artigianali e di alta tecnologia, offrendo un riscontro cosbg-tante sulle opzioni disponibili ed indirizzando le metodologie alle necessità di ogni realizzazione.</p>
    <p>I-C è anche una rete consolidata di fornitori specializzati in grado di rispondere alle richieste più specifiche e di nicchia. Seguendo un approccio sartoriale, I-C fa appello ai migliori professionisti di settore per trasformare la cura di ogni dettaglio in una soluzione integrata, capace di restituire bellezza nel tempo.</p>
  </div>
  <swiper-container
  class="mobile-only"
  slides-per-view="1.3"
  speed="500"
  loop={true}
  space-between="20"
  slides-offset-before="10"
  slides-offset-after="10"
  >
    <swiper-slide>
      <h3 class="service"><span>①</span>Partner</h3>
      <p>I-C supporta architetti, aziende e privati nell'esecuzione dei progetti più esigenti. Allineandosi alla visione e alle aspettative condivise dalla committenza, I-C lavora nel rispetto dei vincoli posti dal capitolato e dalle tempistiche di consegna, rimanendo in ascolto delle richieste che emergono durante tutte le fasi del cantiere.</p>
    </swiper-slide>
    <swiper-slide>
      <h3 class="service"><span>②</span>Develop</h3>
      <p>I-C mette la qualità al centro di ogni tappa del progetto. Grazie all'expertise consolidata dei propri reparti produttivi, I-C orienta e combina lavorazioni artigianali e di alta tecnologia, offrendo un riscontro cosbg-tante sulle opzioni disponibili ed indirizzando le metodologie alle necessità di ogni realizzazione.</p>
    </swiper-slide>
    <swiper-slide>
      <h3 class="service"><span>③</span>Furnish</h3>
      <p>I-C è anche una rete consolidata di fornitori specializzati in grado di rispondere alle richieste più specifiche e di nicchia. Seguendo un approccio sartoriale, I-C fa appello ai migliori professionisti di settore per trasformare la cura di ogni dettaglio in una soluzione integrata, capace di restituire bellezza nel tempo.</p>
    </swiper-slide>
  </swiper-container>
</section>

<section id="materials" class="bg-warm-gray">
  <h4>Materials</h4>
  <div class="materials">
    {#each materials as material, i}
      <div class="material" class:active={innerWidth <= 900 && activeMaterials.includes(i)}>
        <img class="desktop-only" src="/img/insideContract-{material.image}.webp" alt={material.name} />
        <img class="mobile-only" src="/img/insideContract-{material.imageMobile}.webp" alt={material.name} />
        <div class="info p-1">
          <h3>{material.name}</h3>
          <ul class="kinds">
            {#each material.kinds as kind}
              <li>{kind}</li>
            {/each}
          </ul>
          <ul class="works">
            {#each material.works as work}
              <li>{work}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</section>

<section id="contact" class="bg-ivory" bind:this={contact}>
  <h4>Contact</h4>
  <form class="p-1"
  id="form"
  action="?/create"
  method="POST"
  use:enhance={handleEnhance}
  onsubmit={() => isSubmitting = true}
  >
    <div>
      <p>Contattaci tramite il form<br>oppure scrivendo a <a href="mailto:info@insidecontract.it">info@insidecontract.it</a></p>
      <div class="inputs">
        <input class="p-1 bg-white" type="text" name="name" id="name" placeholder="Nome">
        <input class="p-1 bg-white" type="text" name="company" id="company" placeholder="Società">
        <input class="p-1 bg-white" type="text" name="email" id="email" required placeholder="Email*">
      </div>
    </div>
    <div>
      <textarea rows="12" class="p-1 bg-white" name="message" id="message" required placeholder="Buongiorno&#13;Sono..."></textarea>
      <button class="p-1" type="submit">
        {#if isSubmitted}
          Inviato
        {:else if isSubmitting}
          Invio in corso
        {:else if isErrorous}
          Errore al momento dell'invio. Riprova!
        {:else if isEmpty}
          {#if isEmptyEmail}
            Email mancante o non valida
          {:else if isEmptyMessage}
            Messaggio mancante
          {/if}
        {:else}
          Invia messaggio
        {/if}
      </button>
    </div>
  </form>
</section>

<!-- <section id="download" class="bg-cool-gray">
  <a href={pdfUrl} target="_blank" rel="noopener noreferrer"><p>↓ Download ↓</p><p>I–C Portfolio 2025</p></a>
</section> -->

<Footer/>


<style>
/* Common */
section {
  position: relative;
}
section:not(#materials):not(#services) {
  position: sticky;
  top: var(--headerHeight);
}
@media screen and (max-width: 900px) {
  section:not(#materials):not(#services) {
    position: relative;
    top: unset;
  }
}

/* Hero */
#hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
#hero .left {
  width: 100%;
  height: calc(100vh - var(--headerHeight));
  object-fit: cover;
}
#hero .right {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
#hero .ctas {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 900px) {
  #hero {
    grid-template-columns: repeat(1, 1fr);
  }
  #hero .left {
    grid-row: 2;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  #hero .right {
    gap: 2em;
  }
  #hero .ctas {
    display: flex;
    flex-direction: column;
  }
}

/* Payoff */
#payoff {
  padding: 7.4rem 0;
  text-align: center;
}

/* Services */
#services .services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--gutter);
  padding: 0;
}
#services h4 {
  grid-row: 1;
  grid-column: 1 / span 3;
  position: sticky;
  top: var(--headerHeight);
  text-align: center;
  padding: var(--headerHeight) 0 calc(var(--headerHeight)*2 + 3.6rem);
}
#services .service:nth-child(2) {
  margin-top: calc(var(--headerHeight)/-2);
}
#services .service {
  text-align: center;
  padding-bottom: calc(var(--headerHeight) + 1.2rem);
  position: sticky;
  top: calc(var(--headerHeight)*3 + 1.2em);
}
.service span {
  display: block;
  font-feature-settings: "salt";
}
#services .service:nth-child(2) {
  grid-row: 2;
  grid-column: 1;
}
#services .service:nth-child(3) {
  grid-row: 3;
  grid-column: 2;
}
#services .service:nth-child(4) {
  grid-row: 4;
  grid-column: 3;
}
#services .description {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--gutter);
  padding-top: 0;
}
@media screen and (max-width: 900px) {
  #services h4 {
    padding: var(--headerHeight) 0;
  }
  #services .services {
    padding: 0;
  }
  #services .service {
    text-align: left;
    padding: 0;
    position: relative;
    top: unset;
  }
  swiper-container {
    display: block;
    padding-bottom: .7rem;
  }
  swiper-slide h3 {
    margin-bottom: 2em;
  }
}

/* Materials */
#materials h4 {
  grid-column: 1 / span 2;
  position: sticky;
  top: var(--headerHeight);
  padding-top: var(--headerHeight);
  margin-bottom: .6rem;
  text-align: center;
  width: 100%;
  z-index: 1;
}
#materials .materials {
  margin-top: calc(var(--headerHeight)*-1 - 1.8rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
#materials .material {
  position: relative;
  height: calc(100vh - var(--headerHeight));
  height: calc(100vh);
}
#materials .material img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#materials .material:hover img {
  opacity: 0;
}
#materials .material:hover .info {
  opacity: 1;
}
#materials .info {
  position: absolute;
  top: 0;
  padding-top: 8rem;
  display: flex;
  opacity: 0;
  flex-wrap: wrap;
  align-content: space-between;
  height: 100%;
}
#materials ul {
  list-style: none;
  padding: 0;
}
#materials h3 {
  width: 30%;
}
#materials .kinds {
  width: 70%;
}
#materials .works {
  width: 100%;
}
#materials img {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 900px) {
  #materials h4 {
    position: relative;
    top: 0;
  }
  #materials .materials {
    display: block;
  }
  #materials .material {
    height: auto;
    min-height: 70vh;
    max-height: calc(100vh - var(--headerHeight));
    overflow: hidden;
  }
  #materials .material img {
    display: block;
    min-height: 70vh;
  }
  #materials .material:hover img {
    opacity: 1;
  }
  #materials .material:hover .info {
    opacity: 0;
  }
  #materials .material.active img {
    opacity: 0 !important;
  }
  #materials .material.active .info {
    opacity: 1 !important;
  }
  #materials .info {
    padding-top: 2rem;
  }
  #materials .material:first-child .info {
    padding-top: calc(var(--headerHeight) + 3.2rem);
  }
}

/* Contact */
#contact h4 {
  padding-top: var(--headerHeight);
  text-align: center;
  width: 100%;
  z-index: 1;
}
#contact form {
  padding-top: var(--headerHeight);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gutter);
  padding-bottom: var(--gutter);
}
#contact form div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
#contact .inputs {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
#contact input,
#contact textarea {
  border-radius: 5px;
  border: none;
}
#contact input::placeholder,
#contact textarea::placeholder {
  color: var(--black);
  opacity: 1;
}
#contact input:focus,
#contact textarea:focus {
  outline: 2px solid var(--black);
}
#contact textarea {
  resize: none;
  border-radius: 5px;
  border: none;
  text-indent: 0;
  padding-bottom: 2.4rem;
}
#contact button {
  position: relative;
  margin-top: -3rem;
  height: fit-content;
}
@media screen and (max-width: 900px) {
  #contact form {
    grid-template-columns: repeat(1, 1fr);
    gap: .7rem;
  }
  #contact form div:nth-child(1) {
    gap: .7rem;
  }
  #contact form div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  #contact .inputs {
    gap: .7rem;
  }
}

/* Download */
#download {
  padding: 7.4rem 0;
  text-align: center;
}
</style>