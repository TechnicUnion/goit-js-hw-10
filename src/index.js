import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(evt) {
  const country = evt.target.value;

  // fetch(
  //   `${BASE_URL}name/${country}?fields=name,capital,population,flags,languages`
  // )
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     return response.json();
  //   })
  fetchCountries(country)
    .then(data => {
      if (data.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = creatMarckup(data);
      } else if (data.length > 1 && data.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = creatCountryList(data);
      } else {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
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

function creatCountryList(arr) {
  return arr
    .map(
      country =>
        `<li><img src=${country.flags.svg} alt=${country.name.official} />${country.name.official}</li>`
    )
    .join('');
}
