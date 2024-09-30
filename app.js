// Fetch data from JSON file
let countriesData = [];

// Function to fetch country data
async function fetchCountryData() {
    try {
        const response = await fetch('data.json'); // Adjust the path as necessary
        countriesData = await response.json();
        displayCountries(countriesData);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

// Function to display countries
function displayCountries(countries) {
    const countriesContainer = document.querySelector('.countries-container');
    countriesContainer.innerHTML = ''; // Clear existing content

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flag}" alt="${country.name}">
            <h3>${country.name}</h3>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
        `;
        
        // Add click event to display country details
        countryCard.addEventListener('click', () => {
            showCountryDetail(country);
        });

        countriesContainer.appendChild(countryCard);
    });
}

// Function to show country details
function showCountryDetail(country) {
    const detailContainer = document.querySelector('.country-detail');
    detailContainer.innerHTML = `
        <button onclick="goBack()">← Back</button>
        <div class="country-detail-card">
            <img src="${country.flag}" alt="${country.name}">
            <h2>${country.name}</h2>
            <p><strong>Native Name:</strong> ${country.nativeName}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(', ')}</p>
            <p><strong>Currencies:</strong> ${country.currencies.map(curr => curr.name).join(', ')}</p>
            <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
            <div class="border-countries">
                <strong>Border Countries:</strong>
                ${country.borders.length ? country.borders.map(border => `<button class="border-btn">${border}</button>`).join('') : 'None'}
            </div>
        </div>
    `;
    // Hide country list and show details
    document.querySelector('.countries-container').style.display = 'none';
    detailContainer.style.display = 'block';
}

// Function to go back to the country list
function goBack() {
    document.querySelector('.countries-container').style.display = 'grid';
    document.querySelector('.country-detail').style.display = 'none';
}

// Function for search and region filter
function filterCountries() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const regionFilter = document.getElementById('region-filter').value;
    
    const filteredCountries = countriesData.filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchInput);
        const matchesRegion = regionFilter === 'All' || country.region === regionFilter;
        return matchesSearch && matchesRegion;
    });
    
    displayCountries(filteredCountries);
}

// 

// Initialize fetching data
fetchCountryData();

// Add event listeners for search input and region filter
document.getElementById('search-input').addEventListener('input', filterCountries);
document.getElementById('region-filter').addEventListener('change', filterCountries);


// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const countryCards = document.querySelectorAll('.country-card');
const countryDetail = document.querySelector('.country-detail');
const borderButtons = document.querySelectorAll('.border-countries button');

// Check for saved dark mode preference
const darkModePreference = localStorage.getItem('darkMode');
if (darkModePreference === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
    
});



function enableDarkMode() {
    body.classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    searchInput.classList.add('dark-mode');
    regionFilter.classList.add('dark-mode');
    countryCards.forEach(card => card.classList.add('dark-mode'));
    if (countryDetail) {
        countryDetail.classList.add('dark-mode');
    }
    borderButtons.forEach(button => button.classList.add('dark-mode'));
    
    localStorage.setItem('darkMode', 'enabled');  // Save preference
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    document.querySelector('header').classList.remove('dark-mode');
    searchInput.classList.remove('dark-mode');
    regionFilter.classList.remove('dark-mode');
    countryCards.forEach(card => card.classList.remove('dark-mode'));
    if (countryDetail) {
        countryDetail.classList.remove('dark-mode');
    }
    borderButtons.forEach(button => button.classList.remove('dark-mode'));
    
    localStorage.setItem('darkMode', 'disabled');  // Save preference
}
