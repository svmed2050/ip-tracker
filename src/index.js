
/* Импортируем стили для карты */
import 'leaflet/dist/leaflet.css'

/* Импортируем библиотеку карты */
import L from 'leaflet';
import icon from '../images/icon-location.svg';



import {addTileLayer, validateIp, getAddress, addOffset} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

/* Создаем карту через L.map */
const map = L.map('leafletmap', {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map)

/* Добавляем маркер на карту */
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 40],
})

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map)


function getData() {
  
  if(validateIp(ipInput.value)) {
    getAddress(ipInput.value) 
    .then(setInfo)
  } 
}

function handleKey(e) {
  if(e.key === 'Enter') {
    getData()
  }
}

function setInfo(mapData) {

  const {lat, lng, country, region, timezone} = mapData.location;

  console.log(mapData);
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng])
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);

  if(matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

async function getCurrentIp() {

  const res = await fetch('https://api.ipify.org?format=json')
  const obj = await res.json();
  getAddress(obj.ip).then(setInfo);
}

document.addEventListener('DOMContentLoaded', getCurrentIp);




