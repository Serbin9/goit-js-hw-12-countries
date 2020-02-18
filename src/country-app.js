import fetchCountries from './fetch-countries.js';
import countryListItemsTemplate from './coutry-list-items.hbs';
import countryItemTemplate from './/country-item.hbs';
import debounce from 'lodash.debounce';
// import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';

// import "../node_modules/pnotify/dist/PNotifyBrightTheme.css";

const refs = {
  searchInput: document.querySelector('.js-country-search'),
  countriesList: document.querySelector('.js-countries-list'),
  countryContent: document.querySelector('.js-country-content'),
};

// событие на ввод (инпут)
refs.searchInput.addEventListener('input', debounce(searchInputHandler, 800));

function searchInputHandler(e) {
  const input = e.target.value;

  fetchCountry(input);
}
за
function insertListItems(items) {
  const markup = countryListItemsTemplate(items);

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function insertItem(item) {
  const markup = countryItemTemplate(item);

  refs.countryContent.insertAdjacentHTML('afterbegin', markup);
}
// очистка 
function clearList() {
  refs.countriesList.innerHTML = '';
  refs.countryContent.innerHTML = '';
}
// функция для поиска стран 2-10 1 >10 0 нет совпадений + pnotify
function checkCountryListLength(country) {
  if (country.length >= 2 && country.length <= 10) {
    clearList()
    insertListItems(country);
  } else if (country.length === 1) {
    clearList()
    insertItem(country);
  } else if (country.length > 10) {
    clearList()
    PNotify.error({
      title: 'Many result!',
      text: 'Too many mathes found. Please enter a more specific query!',
      delay: 2000
    });
    console.log('много результатов')
  } else {
    clearList()
    PNotify.error({
      title: 'Oh No!',
      text: 'Something terrible happenedNo results were found for your request. Please enter valid data!.',
      delay: 2000
    });
    console.log("ВВедите значение")
  }
}

function fetchCountry(countryName) {
  clearList();

  if(countryName === '') {
    return;
  }

  fetchCountries(countryName)
    .then(countries => checkCountryListLength(countries))
    .catch(error => console.warn(error));
}
