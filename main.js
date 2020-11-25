const input = document.querySelector('input');
const submit = document.querySelector('button');
const card = document.querySelector('.card-header');

const getData = () => {
  let unit = 'imperial';

  const fer = document.querySelector('.fer');
    if (!fer.checked) {
      unit = 'metric';
    }
  
  async function grabData() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=3c7d6427cc530acb8f1150c4ef40467d&units=${unit}`);
      const data = await response.json();
      getTemp(data);
      getHiTemp(data);
      getLoTemp(data);
      getConditions(data);
    } catch {
      alert(`${input.value} is not a valid city`)
    }
  }
  grabData();
  /*
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=3c7d6427cc530acb8f1150c4ef40467d&units=${unit}`)
    .then((response) => {
      return response.json()
    }).then((response) => {
      getTemp(response);
      getHiTemp(response);
      getLoTemp(response);
      getConditions(response);
    }).catch(err => alert(`${input.value} is not a valid city`))
    */ 
}

const getImage = async (input) => {
  try {
    const response = await fetch(('https://api.giphy.com/v1/gifs/translate?api_key=OkMu3nKncE7z53jpRPW5qhTT9C3qKqQl&s=' + input), { mode: 'cors' });
    const data = await response.json();
    card.style['background'] = `no-repeat center url(${data.data.images.original.url})`;
  } catch {
    card.style['background'] = 'white';
  }
  

  
  /*
  fetch(('https://api.giphy.com/v1/gifs/translate?api_key=OkMu3nKncE7z53jpRPW5qhTT9C3qKqQl&s=' + input), { mode: 'cors' })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      card.style['background'] = `no-repeat center url(${response.data.images.original.url})`;
    }).catch(card.style['background'] = 'white');
    */
}

const getTemp = (x) => {
  const temp = document.querySelector('.temp');

  temp.textContent = x.main.temp;
}
 
const getHiTemp = (x) => {
  const hiTemp = document.querySelector('.hi-temp');

  hiTemp.textContent = x.main.temp_max;
}

const getLoTemp = (x) => {
  const loTemp = document.querySelector('.lo-temp');

  loTemp.textContent = x.main.temp_min;
}

const getConditions = (x) => {
  const conditions = document.querySelector('.conditions');
  const weather = x.weather.map(y => y.description);
  
  conditions.textContent = weather.join(', ');
  getImage(x.weather[0].description)
}

// init value for load
input.value = 'chicago';
getData();


submit.addEventListener('click', getData);