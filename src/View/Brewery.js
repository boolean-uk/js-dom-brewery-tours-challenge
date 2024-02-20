
import { postBreweryToVisitList } from '../Helpers/VisitApi.js';

export function createItem(brewery) {
    const li = document.createElement('li');
  
    const h2 = document.createElement('h2');
    h2.textContent = brewery.name;
    li.appendChild(h2);
  
    const div = document.createElement('div');
    div.classList.add('type');
    div.textContent = brewery.brewery_type;
    li.appendChild(div);
  
    const addressSection = document.createElement('section');
    addressSection.classList.add('address');
  
    const addressHeading = document.createElement('h3');
    addressHeading.textContent = 'Address:';
    addressSection.appendChild(addressHeading);
  
    const addressP1 = document.createElement('p');
    addressP1.textContent = brewery.postal_code + " " + brewery.street;
    addressSection.appendChild(addressP1);
  
    const addressP2 = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = brewery.city + ", " + brewery.state;
    addressP2.appendChild(strong);
    addressSection.appendChild(addressP2);
  
    li.appendChild(addressSection);
  
    const phoneSection = document.createElement('section');
    phoneSection.classList.add('phone');
  
    const phoneHeading = document.createElement('h3');
    phoneHeading.textContent = 'Phone:';
    phoneSection.appendChild(phoneHeading);
  
    const phoneP = document.createElement('p');
    phoneP.textContent = brewery.phone;
    phoneSection.appendChild(phoneP);
  
    li.appendChild(phoneSection);
  
    const linkSection = document.createElement('section');
    linkSection.classList.add('link');
  
    const link = document.createElement('a');
    link.href = brewery.website_url;
    link.target = '_blank';
    link.textContent = 'Visit Website';
    linkSection.appendChild(link);
  
    li.appendChild(linkSection);
  
    const button = document.createElement('button');
    button.classList.add('add-to-visit-list');
    button.textContent = 'Add to visit list';
    button.addEventListener('click', async () => {
        button.textContent = 'Add to visit list';
      const result = await postBreweryToVisitList(brewery);
      button.textContent = result;
    });
    li.appendChild(button);
  
    return li;
  }