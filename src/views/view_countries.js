const PubSub = require('../helpers/pub_sub.js')

const ViewCountries = function(element){
  this.element = element

};


ViewCountries.prototype.bindEvent = function () {
  PubSub.subscribe('SelectView:countriesData', (evt) =>{
    const countries = evt.detail
    this.populate(countries)
  })
  this.element.addEventListener('change', (targetedCountry) =>{
    const countrySelected = targetedCountry.target.value;
    PubSub.publish('Countries:selectedCountryName', countrySelected)
  })
};


ViewCountries.prototype.populate = function (countries) {
  countries.forEach((country , index) =>{
    const selection = document.createElement('option');
    selection.textContent = country.name;
    selection.name = index;
    this.element.appendChild(selection)
  })
};

module.exports = ViewCountries;
