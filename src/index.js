import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const BASE_URL = 'https://restcountries.com/v3.1/';

const conteiner = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');
console.log(inputEl);

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(evt) {
  const country = evt.target.value;

  fetch(
    `${BASE_URL}name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(data => {
      const marckup = creatMarckup(data);
      console.log(marckup);
      conteiner.innerHTML = marckup;
    })
    .catch(err => {
      console.log(err);
      conteiner.innerHTML = '';
    });
}

function creatMarckup(arr) {
  return arr
    .map(
      country =>
        `<h2><img src=${country.flags.svg} alt=${country.name.official} />${
          country.name.official
        }</h2>
<h3>Capital: ${country.capital}</h3>
<h3>Population: ${country.population}</h3>
<h3>Languages: ${Object.values(country.languages).join(', ')}</h3>`
    )
    .join('');
}
