const PubSub = require('../helpers/pub_sub.js')


const RenderCountryInfo = function(space) {
  this.space = space

};

RenderCountryInfo.prototype.bindEvent = function () {
  PubSub.subscribe('renderCountryInfo', (evt) =>{
    const countryObj = evt.detail;
    this.render(countryObj)
  })
};

RenderCountryInfo.prototype.render = function (object) {
  console.log(object);

  this.space.innerHTML = " "
  const name = document.createElement('h1');
  name.textContent = `Country : ${object.name}`
  this.space.appendChild(name)

  const pic = document.createElement('img')
  pic.src = object.flag
  this.space.appendChild(pic)

  const region = document.createElement('h3')
  region.textContent = `Region : ${object.region}`
  this.space.appendChild(region)

  const list = document.createElement('ul')
  list.textContent = `Lenguages : `
  object.languages.forEach((lenguage) => {
  const li = document.createElement('li')
  li.textContent = lenguage.name
  return list.appendChild(li)
})
this.space.appendChild(list);


const link = document.createElement('a')
console.log(link);
const lat = object.latlng[0]
const long = object.latlng[1]
link.href = `https://www.google.com/maps/@${lat},${long},6z?hl=en`
link.textContent = 'Look me up on Goole Map'
this.space.appendChild(link)
};


module.exports = RenderCountryInfo;
