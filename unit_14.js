let today = new Date();
let curr_day = today.getDay();
console.log(curr_day);  // log current day
let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];  // will be returned if today.getDay()=0;
let option = document.querySelector('#city');   // selected city
let activeDay = 0;  // active day in forecast for 7 days
//  Query params
let key = '7becdea7366249f09276831d7a11165a';
let cityId = 0;

//pushes a day name from its index to arr[];
function putDayName(idx, arr) {
    switch (idx) {
        case 0:
            arr.push('ВС');
            break;
        case 1:
            arr.push('ПН');
            break;
        case 2:
            arr.push('ВТ');
            break;
        case 3:
            arr.push('СР');
            break;
        case 4:
            arr.push('ЧТ');
            break;
        case 5:
            arr.push('ПТ');
            break;
        case 6:
            arr.push('СБ');
            break;
    }
}
//returns an arr of next current day+ 6 next days 
function getDays(fromDay) {
    let nextDays = [];
    if (fromDay > 0) {
        for (let i = fromDay; i < 7; i++) {
            putDayName(i, nextDays);
        }
        for (let k = 0; nextDays.length < 7; k++) {
            putDayName(k, nextDays);
        }
    }
    else
        return days;

    console.log(`Next daysIdx: ${nextDays}`);
    return nextDays;
}

let next_days = getDays(curr_day); // array of days from current day + 6
let dayBtns = document.querySelectorAll('.days .day'); // days btn-s 
// assign days to dayBtns[i]
for (let i = 0; i < dayBtns.length; i++) {
    dayBtns[i].textContent = next_days[i];
}
//changing an active day, getting forecast
function setActiveDay() {
    for (let i = 0; i < dayBtns.length; i++) {
        dayBtns[i].onclick = () => {
            // setActiveDay();
            for (let i = 0; i < dayBtns.length; i++) {
                if (dayBtns[i].classList.contains('active')) {
                    dayBtns[i].classList.remove('active');
                }
            }
            dayBtns[i].classList.add('active');
            activeDay = i;
            console.log(`active day index: ${i}`);
            getForecast();
        }
    }
}

setActiveDay(); // forecast won't show because the def city is '0'
// it hasn't been changed yet 
getForecast(); // so we call getForecast();


// getForecast 
function getForecast() {
    cityId = option.value;  // getting city ID
    console.log(cityId);
    let requestStr = `https://api.weatherbit.io/v2.0/forecast/daily?city_id=${cityId}&lang=ru&days=7&key=${key}`;
    fetch(requestStr)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            document.querySelector('.city-name').textContent = data.city_name;  //city name
            document.querySelector('.grad').innerHTML = `${data.data[activeDay].temp}&deg;C`;   //current temperature
            document.querySelector('.max').innerHTML = `${data.data[activeDay].max_temp}&deg;C`; // max temperature
            document.querySelector('.min').innerHTML = `${data.data[activeDay].min_temp}&deg;C`;// min temperature
            document.querySelector('.curr-weatherImg').innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${data.data[activeDay].weather.icon}.png">`;
            document.querySelector('.description').innerHTML = `<p class="text-center">${data.data[activeDay].weather.description}</p>`; // weather description in RUS
        })
        .catch(function () {
            // catch any errors
        });
}
// getting forecast when city changed
// setting active day to '0'
option.onchange = () => {
    for (let i = 0; i < dayBtns.length; i++) {
        if (dayBtns[i].classList.contains('active')) {
            dayBtns[i].classList.remove('active');
        }
    }
    dayBtns[0].classList.add('active');
    activeDay = 0;
    console.log(`active day index: ${activeDay}`);
    // getting forecast
    getForecast();

};






