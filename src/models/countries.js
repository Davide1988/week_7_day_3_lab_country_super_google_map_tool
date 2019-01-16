const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Countries = function(){
  this.data = null;

};


Countries.prototype.getData = function () {
    const request = new RequestHelper('https://restcountries.eu/rest/v2/all')
    request.get((data) =>{
      this.data = data;
      PubSub.publish('SelectView:countriesData', this.data)
    })
};


Countries.prototype.bindEvent = function () {
  PubSub.subscribe('Countries:selectedCountryName', (evt) => {
    const nameOfCountry = evt.detail;
    this.skimmer(nameOfCountry)
  })
};

Countries.prototype.skimmer = function (name) {
  const countryObject = this.data.find((country) =>{
    if (country.name === name){
    return country
    }
  })
  this.transfer(countryObject)
};

Countries.prototype.transfer= function (country) {
  PubSub.publish('renderCountryInfo', country)
};


module.exports = Countries
