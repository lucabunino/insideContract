<footer class="bg-tan-brown p-1">
  <p class="company">Inside Contact srl</p>
  <div class="adress">
    <p><a href="#" target="_blank" rel="noopener noreferrer">Via Della Pari, 64/A<span class="tablet-only">{@html ", "}</span><br class="small-only">51017 Pescia (PT) - Italy</a></p>
    <p><span class="contact-mode">t.</span><a href="tel:+390572477901">+39.0572.47.79.01</a></p>
    <p><span class="contact-mode">e.</span><a href="mailto:info@insidecontract.it">info@insidecontract.it</a></p>
  </div>
  <div class="triple">
    <p>Partner</p>
    <p>Develop</p>
    <p>Furnish</p>
  </div>
  <div class="codes">
    <p>REA: PT-190258</p>
    <p>P.IVA: 01912000476</p>
  </div>
</footer>

<style>
footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: var(--headerHeight);
  position: relative;
}
footer .adress {
  grid-column: 2 / span 1;
}
footer .adress .contact-mode {
  display: inline-block;
  width: 10%;
}
footer .triple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 2;
  justify-content: space-between;
  row-gap: 8em;
}
footer .triple p:nth-child(1) {
  text-align: left;
  grid-column: 1;
  grid-row: 1;
}
footer .triple p:nth-child(2) {
  text-align: center;
  grid-column: 2;
  grid-row: 2;
}
footer .triple p:nth-child(3) {
  text-align: right;
  grid-column: 3;
  grid-row: 3;
}
footer .codes {
  margin-top: -2.4em;
  grid-column: 1 / span 2;
}
@media screen and (max-width: 600px) {
  footer .company {
    grid-column: 1 / span 2;
  }
  footer .adress {
    grid-column: 1 / span 2;
    padding: var(--headerHeight) 0;
  }
}
</style>