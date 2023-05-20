const tempField = document.querySelector(".temperature")
const cityField = document.querySelector(".time_location p")
const timeField = document.querySelector(".time_location span")
const emojiField = document.querySelector(".Condition img")
const weatherCondField = document.querySelector(".Condition span")
const searchField = document.querySelector(".searchLocation")
const form = document.querySelector("form")
//default target
let target = 'London'
// console.log(searchField.value)
//Updating taget based on the search result
form.addEventListener('submit',search)

function search(e){
    e.preventDefault()
    target = searchField.value
    getWeatherData(target)
}

async function getWeatherData(target){
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=8cc26569680e443096130532231605&q=${target}&aqi=no`
        const response = await fetch(url)
        const jsonData = await response.json();
        // console.log(jsonData)
        let temp = jsonData.current.temp_c
        let location = jsonData.location.name
        let timeOfLocation = jsonData.location.localtime 
        let conditionImg = jsonData.current.condition.icon
        let weatherCondition = jsonData.current.condition.text
        console.log(jsonData)
        updateDOM(temp,location,timeOfLocation,conditionImg,weatherCondition)
    } catch (error) {
        console.log(error)
    }
}

//Update function to insert values into elements
function updateDOM(temp, loc, time, img, weatherCond){

    const exactDate = time.split(" ")[0]
    const exactTime = time.split(" ")[1]
    const day = dayOfTheWeek(new Date(exactDate).getDay())
    tempField.innerText = temp
    cityField.innerText = loc
    timeField.innerText = `${day} ${exactDate} ${exactTime}`
    emojiField.src = img
    weatherCondField.innerText = weatherCond
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