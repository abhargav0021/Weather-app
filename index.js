const tempField = document.querySelector(".temperature")
const cityField = document.querySelector(".time_location p")
const timeField = document.querySelector(".time_location span")
const emojiField = document.querySelector(".Condition img")
const weatherCondField = document.querySelector(".Condition span")
const searchField = document.querySelector(".searchLocation")
const form = document.querySelector("form")

//forcast variables
const dayOfTheWeek1 = document.querySelector("#day1 .weekDay")
const tempField1 = document.querySelector("#day1 .temperature")
const emojiField1 = document.querySelector("#day1 .Condition img")
const weatherCondField1 = document.querySelector("#day1 .Condition span")

const dayOfTheWeek2 = document.querySelector("#day2 .weekDay")
const tempField2 = document.querySelector("#day2 .temperature")
const emojiField2 = document.querySelector("#day2 .Condition img")
const weatherCondField2 = document.querySelector("#day2 .Condition span")

const dayOfTheWeek3 = document.querySelector("#day3 .weekDay")
const tempField3 = document.querySelector("#day3 .temperature")
const emojiField3 = document.querySelector("#day3 .Condition img")
const weatherCondField3 = document.querySelector("#day3 .Condition span")

const dayOfTheWeek4 = document.querySelector("#day4 .weekDay")
const tempField4 = document.querySelector("#day4 .temperature")
const emojiField4 = document.querySelector("#day4 .Condition img")
const weatherCondField4 = document.querySelector("#day4 .Condition span")

const dayOfTheWeek5 = document.querySelector("#day5 .weekDay")
const tempField5 = document.querySelector("#day5 .temperature")
const emojiField5 = document.querySelector("#day5 .Condition img")
const weatherCondField5 = document.querySelector("#day5 .Condition span")
//default target
let target = 'London'
let noOfDaysFor = 6

//Updating taget based on the search result
form.addEventListener('submit',search)

function search(e){
    e.preventDefault()
    target = searchField.value
    getWeatherData(target)
}

async function getWeatherData(target){
    try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=8cc26569680e443096130532231605&q=${target}&days=${noOfDaysFor}&aqi=no&alerts=no`
        const response = await fetch(url)
        const jsonData = await response.json();
        const forecastData = jsonData.forecast.forecastday
        console.log(jsonData)
        console.log(forecastData)
        let temp = jsonData.current.temp_c
        let location = jsonData.location.name
        let timeOfLocation = jsonData.location.localtime 
        let conditionImg = jsonData.current.condition.icon
        let weatherCondition = jsonData.current.condition.text
        updateDOM(temp,location,timeOfLocation,conditionImg,weatherCondition)
        //update forcast values
        console.log(forecastData.length)
        for(let day = 1; day<forecastData.length; day++){
            let forDate = forecastData[day].date
            let forTemp = forecastData[day].day.maxtemp_c
            let forConditionImg = forecastData[day].day.condition.icon
            let forCondition = forecastData[day].day.condition.text
            console.log(forDate +" "+ forTemp+" "+ forConditionImg+" "+ forCondition)
            updateDOMForecast(forDate,forTemp,forConditionImg,forCondition,day)
        }

    } catch (error) {
        console.log(error)
    }
}

//Update function to insert values into main div elements
function updateDOM(temp, loc, time, img, weatherCond,i){

    const exactDate = time.split(" ")[0]
    const exactTime = time.split(" ")[1]
    const day = dayOfTheWeek(new Date(exactDate).getDay())
    tempField.innerText = temp+"°C"
    cityField.innerText = loc
    timeField.innerText = `${day} ${exactDate} ${exactTime}`
    emojiField.src = img
    weatherCondField.innerText = weatherCond
}

//update function to insert values into forecast div elements
function updateDOMForecast(date, temp, conditionImg, condition, day){
    let dayOfWeek = dayOfTheWeek(new Date(date).getDay())
    console.log(dayOfWeek)
    switch(day){
        case 1:
            dayOfTheWeek1.innerText = dayOfWeek
            tempField1.innerText = temp
            emojiField1.src = conditionImg
            weatherCondField1.innerText = condition
            break
        case 2:
            dayOfTheWeek2.innerText = dayOfWeek
            tempField2.innerText = temp
            emojiField2.src = conditionImg
            weatherCondField2.innerText = condition
            break
        case 3:
            dayOfTheWeek3.innerText = dayOfWeek
            tempField3.innerText = temp
            emojiField3.src = conditionImg
            weatherCondField3.innerText = condition
            break
        case 4:
            dayOfTheWeek4.innerText = dayOfWeek
            tempField4.innerText = temp
            emojiField4.src = conditionImg
            weatherCondField4.innerText = condition
            break
        case 5:
            dayOfTheWeek5.innerText = dayOfWeek
            tempField5.innerText = temp
            emojiField5.src = conditionImg
            weatherCondField5.innerText = condition
            break
    }
}

//Function to get the day of the week
function dayOfTheWeek(day){
    switch(day){
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            return "N/A"
    }
}