const API_KEY = "a05272bd07ab0363440e753f";  // Replace with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const resultText = document.querySelector(".message"); // Add a div or span to display result

// Populate currency dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update country flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; // Convert currency code to country code
    let country = countryCode.toLowerCase();
    let newSrc = `https://flagcdn.com/20x15/${country}.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Fetch exchange rate and update UI
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    
    try{
        let amount = document.querySelector(".amount input");
        let amountVal = amount.value.trim();

        if (amountVal === "" || amountVal <= 0) {
            amountVal = 1;
            amount.value = 1;
        }

        const URL = `${BASE_URL}/${fromCurrency.value}`;
    
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        if (data.conversion_rates && data.conversion_rates[toCurrency.value]) {
            if(amount.value >= 1){
                let exchangeRate = data.conversion_rates[toCurrency.value] * amount.value;
                resultText.innerText = `${amount.value} ${fromCurrency.value} equals ${exchangeRate} ${toCurrency.value}`;
            }
        }
    } catch (error) {
        resultText.innerText = "404 Not Found! Try Again!";
    }

});

const icon = document.querySelector('.fa-solid');

icon.addEventListener('click',() => {
    const fromCurrencyVal = toCurrency.value;
    const toCurrencyVal = fromCurrency.value;
    fromCurrency.value = fromCurrencyVal;
    toCurrency.value = toCurrencyVal;
    
    for (let select of dropdowns) {
        let currCode = select.value;
        let countryCode = countryList[currCode];
        const country = countryCode.toLowerCase();
        let newSrc = `https://flagcdn.com/20x15/${country}.png`;
        let img = select.parentElement.querySelector('img');
        if(img){
            img.src = newSrc;
        }
    }

});

const github = document.getElementById('github');
const email = document.getElementById('email');
const link = document.getElementById('link');

github.addEventListener("click",()=>{
    window.open('https://github.com/DeepSheth2003','_blank');
});
email.addEventListener("click",()=>{
    window.open('mailto:deepsheth56@gmail.com','_blank');
});
link.addEventListener("click",()=>{
    window.open('https://www.linkedin.com/in/deep-sheth-378164344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app','_blank');
});