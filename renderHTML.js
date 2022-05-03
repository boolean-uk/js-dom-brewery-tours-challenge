import { state } from "./app.js";
import { breweriesContainer } from "./app.js";

export function renderHTML(from, to) {
  state.brewers.slice(from, to).forEach((brewer) => {
    const html = `<li data-id=${brewer.id}>
        <h2>${brewer.name}</h2>
        <div class="type">${brewer.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${brewer.street ? brewer.street : "N/A"}</p>
          <p>
            <strong>${brewer.city}, ${brewer.postal_code}</strong>
          </p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewer.phone ? brewer.phone : "N/A"}</p>
        </section>
        <section class="link">
          <a href="${brewer.website_url}" target="_blank">
            Visit Website
          </a>
        </section>
        <button class="btn-delete hide">Delete</button>
      </li><button class="btn-add-to-visit">Add to visit</button>
    
      `;
    breweriesContainer.insertAdjacentHTML("afterbegin", html);
  });
}
