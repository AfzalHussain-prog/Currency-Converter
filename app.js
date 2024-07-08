const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const h1 = document.querySelector("h1");
const fromCon = document.querySelector(".from select");
const toCon = document.querySelector(".to select");
let msg=document.querySelector(".msg");
const btn = document.querySelector("button");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amount.value = "1";
        amtVal = 1;
    }
    const fromCurrency = fromCon.value.toLowerCase();
    const toCurrency = toCon.value.toLowerCase();
    // console.log(fromCurrency,toCurrency);
    const URL = `${Base_URL}/${fromCurrency}.json`;
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurrency][toCurrency];
        // console.log(rate);
        let result = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurrency} = ${result} ${toCurrency}`
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
});
