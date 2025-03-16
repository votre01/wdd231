
// Store the selected elements that we are going to use. 
const mainnav = document.querySelector('.navigation');
const hambuttom = document.querySelector('#menu');
const welcomeMessage = document.querySelector('#welcomeMessage');
const currentDate = new Date();
const msToDays = 84600000;

const currentYear = document.querySelector('#year');
const lastModified = document.querySelector('#lastModified');

const closeAd = document.querySelector('#closeAd');
const banner = document.querySelector('#bann');
const currentEvents = document.querySelector('#currentEvents');


const userTitle = document.querySelector('#title');
const titleMessage = document.querySelector('#titleMessage');
const regex = /^[a-zA-Z\s-]{7,}$/;

const directory = document.querySelector('#directory');
const membersUrl = 'https://votre01.github.io/wdd231/chamber/data/members.json';
const dirToggle = document.querySelector('#dirToggle');

const spotSelection = document.querySelector('#spotSelection');


// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambuttom.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambuttom.classList.toggle('show');
});

// Check if title matches regex
// userTitle.addEventListener("focusout", checkSame);

function checkSame() {
	if (!regex.test(userTitle.value)) {
		titleMessage.textContent = "*Title should contain at least 7 alpha characters!";
		titleMessage.style.color = "red";
		titleMessage.style.visibility = "show";
		userTitle.style.backgroundColor = "#fff0f3";
		userTitle.value = "";
		userTitle.focus();
	} else {
		titleMessage.style.display = "none";
		userTitle.style.backgroundColor = "#fff";
		userTitle.style.color = "#000";
	}
}

// Close ad banner

if (closeAd)
    closeAd.addEventListener('click', closeAdBanner);

function closeAdBanner() {
    bann.classList.remove('banner');
    bann.classList.add('hideBanner');
    currentEvents.classList.remove('info');
    currentEvents.classList.add('infoExpand');
}

// Get weather
const weatherInfo = document.querySelector('#weatherInfo');
const forecastInfo = document.querySelector('#forecastInfo');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-17.83&lon=31.05&units=imperial&appid=4eb999e92d892ed7069e6c7aec3abf13';

const forecastUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-17.83&lon=31.05&exclude=curent,minutely&appid=4eb999e92d892ed7069e6c7aec3abf13';

async function fetchWeatherApi(url, placement) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data, placement);
      console.log(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

const displayResults = (weather, placement) => {
    placement.innerHTML = `<img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="${weather.weather[0].main}"> <span>${weather.main.temp}&#8457; - ${weather.weather[0].description}</span>`;
};

fetchWeatherApi(url, weatherInfo);
fetchWeatherApi(forecastUrl, forecastInfo);

// Get member data
async function getMemberData(url) {
    const response = await fetch(membersUrl);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayMembers(data.members, directory);
        spotlight(data.members);
    }
}


function spotlight(members) {
    spotlightMembers = [];
    members.forEach(member => {
        if (member.membershipLevel == 'Silver' || member.membershipLevel == 'Gold') {
            spotlightMembers.push(member);
        }        
    });
    console.log(spotlightMembers);
    const selection1 = assignSelection(spotlightMembers);
    const selection2 = assignSelection(spotlightMembers);

    const selectedMembers = [spotlightMembers[selection1], spotlightMembers[selection2]];
    displaySpotlight(selectedMembers);
}

const assignSelection = (members) => {
    let memberIndex = Math.floor(Math.random() * members.length-1) + 1;

    const selection = memberIndex;
    console.log(selection);

    return selection;
}

const displaySpotlight = (members) => {
    const msg1 = 'Honesty is the best policy';
    const msg2 = 'Respect your employees and customers';
    const msg3 = 'Be transparent in your business practices';
    const msg4 = 'Be fair in all dealings';
    const spotlightMsg = [msg1, msg2, msg3, msg4];

    members.forEach((member) => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('card');

        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.profilePic}" title="${member.name}">
            <p><span>Daily tip: </span>${spotlightMsg[Math.floor(Math.random() * spotlightMsg.length-1) + 1]}</p>
            <p>⭐${member.membershipLevel}⭐</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>`;        
        
        if (spotSelection) {
            spotSelection.append(spotlightCard);
        }
    });
};


const displayMembers = (members) => {    
    members.forEach((member) => {
        const directoryCard = document.createElement('div');
        directoryCard.innerHTML = `
            <img src="${member.profilePic}" title="${member.name}">
            <h3>${member.name}</h3>
            <p>⭐${member.membershipLevel}⭐</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">🌐Website</a>`;
        if (directory) {       
            directory.append(directoryCard);
        }
    });
};


getMemberData(membersUrl);

// Toggle List/Grid view directory
if (dirToggle) {
    dirToggle.addEventListener('click', toggleDirectoryView);
}

function toggleDirectoryView() {
    if (dirToggle.textContent == 'List View') {
        directory.classList.remove('dirGrid');
        directory.classList.add('dirList');
        dirToggle.textContent = 'Grid View';        
    } else {
        directory.classList.remove('dirList');        
        directory.classList.add('dirGrid');
        dirToggle.textContent = 'List View';
    }
}

// Local Storage
const now = new Date();
const timestampField = document.querySelector("#timestamp");
if (timestampField)
    timestampField.value = now.toISOString();

// Store latest visit date on local storage
/*if (!localStorage.getItem('lastV')) {
    welcomeMessage.textContent = 'Welcome! Let us know if you have any questions.';
    localStorage.setItem('lastV', JSON.stringify(currentDate));

} else {   
    let lastVisited = new Date(getLastVisitDate());    
    let daysSinceVisit = (Date.now() - lastVisited.getTime()) / msToDays;
    console.log(lastVisited);
    console.log(currentDate);

    
    if (welcomeMessage) {
        if (daysSinceVisit < 1) {
            welcomeMessage.textContent = 'Back so soon! Awesome!';        
        } else {
            welcomeMessage.textContent = `You last visited ${daysSinceVisit} days ago.`;
        }
    }
      
    localStorage.setItem('lastV', (currentDate));
}

function getLastVisitDate() {
    return localStorage.getItem('lastV');
}*/

currentYear.innerText = new Date().getFullYear();
lastModified.innerText = `Last modified: ${document.lastModified}`;