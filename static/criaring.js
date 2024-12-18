class WebRing extends HTMLElement {
  connectedCallback() {
    fetch("https://criar.ing/webring.json")
      .then((response) => response.json())
      .then((sites) => {
        const name = window.location.href.split('/').filter(part => part.includes('.'))[0];
        const index = sites.findIndex(site => site.url.includes(`/${name}`));
        const next = (index + 1) % sites.length;
        const prev = (index + (sites.length - 1)) % sites.length;
        const random = Math.floor(Math.random() * sites.length);
        const template = document.createElement("template");
        template.innerHTML = `
        <div class="criaring">
          <a class="criaring-next" href="${sites[next].url}">next</a>
          <a class="criaring-previous" href="${sites[prev].url}">previous</a>
          <a class="criaring-random" href="${sites[random].url}">random</a>
        </div>
        `
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      });
  }
}

window.customElements.define("webring-css", WebRing);
