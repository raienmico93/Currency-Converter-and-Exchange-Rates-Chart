let main = document.getElementById("main")

main.style.display = "none";

async function currencyList() {
    const res = await fetch(`https://api.frankfurter.dev/v2/currencies`);
    const req = await res.json();
    return req;
}

async function dropdown(dropdownID, curr="") {
    try {
        const currencies = await currencyList();

        let options = '';
       
        currencies.forEach(currency => {
            let isSelected = (currency.iso_code === curr) ? 'selected' : '';
            options += `<option value="${currency.iso_code}" ${isSelected}>
                           ${currency.iso_code} (${currency.name})
                        </option>`;
        });
        dropdownID.innerHTML += options; // Use innerHTML once
    } catch(error) {
        console.error(error);
    }
}


async function rates(base='', quote='', date='') {
    let url = "";
    url = `https://api.frankfurter.dev/v2/rates`;

    url += '?';
    let param = []
   
    if(base)  {param.push(`base=${base}`)};
    if(date)  {param.push(`date=${date}`)};
    if(quote) {param.push(`quotes=${quote}`)};
   
    url += param.join("&")

    const res = await fetch(url);
    const req = await res.json();
    return req;
}

async function currencyExchanger(base="", quote="", date="") {
    try {
        let spinner = document.getElementById("spinner");
        let demo = document.getElementById('listsRates');
        demo.innerHTML = '';
       
        const req = await rates(base, quote, date);
        main.style.display = "block";
       
        spinner.innerHTML = "";

        req.forEach(data => {
           demo.innerHTML += `
           <tr>
               <td>1 ${data.base}</td>
               <td>${data.quote}</td>
               <td>${data.rate}</td>
           </tr>`;
        })
    } catch(error) {
        spinner.innerHTML = 'Unable to fetch exchange rates. Please try again later.';
        document.getElementById("main").innerHTML = "";
        console.log(error);
    }
}
currencyExchanger();





async function rate(from, to) {
    let url = '';
    url += `https://api.frankfurter.dev/v2/`

    if(from == to) {
        url += `currency/${from}`
    } else {
        url += `rates?base=${from}&quotes=${to}`
    }
   
    const res = await fetch(url);
    const req = await res.json();
    return req;
}

let currency2 = document.getElementById('from');
let compare2 = document.getElementById('to');

async function currencyConverter(from, to) {
    try {
        let c1Left = document.getElementById('c1Left');
        let c2Right = document.getElementById('c2Right');
       
        const from1 = document.getElementById('fromCurrency');
        const to1 = document.getElementById('toCurrency');
           
        let equivalence = document.getElementById('equivalence');
   
        let exchangeTable1 = document.getElementById("exchange-rate-table-1");
        let exchangeTable2 = document.getElementById("exchange-rate-table-2");

        let req = await rate(from, to);
        let reqReverse = await rate(to, from);

        document.getElementById('caption1').innerHTML = `Convert ${from} to ${to}`;
        document.getElementById('caption2').innerHTML = `Convert ${to} to ${from}`;

        c1Left.innerHTML = from
        c2Right.innerHTML = to
   
        c2Left.innerHTML = to
        c1Right.innerHTML = from

        dropdown(currency2, from);
        dropdown(compare2, to);
       
        exchangeTable1.innerHTML = ''
        exchangeTable2.innerHTML = ''

        let values = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

        if(from !== to) {
            const updateValue = () => {
                to1.value = (req[0].rate*(from1.value)).toFixed(4);
                equivalence.innerHTML = `1 ${from} = ${req[0].rate} ${to}`
            }
            updateValue();
   
            from1.addEventListener('change', updateValue);

            values.forEach(value => {
                exchangeTable1.innerHTML += `<tr>
                    <td>${value} ${from}</td>
                    <td>${(req[0].rate*value).toFixed(3)} ${to}</td>
                </tr>`
                exchangeTable2.innerHTML += `<tr>
                    <td>${value} ${to}</td>
                    <td>${(reqReverse[0].rate*value).toFixed(3)} ${from}</td>
                </tr>`
            })
           
        } else {
            const updateValue = () => {
                to1.value = from1.value;
                equivalence.innerHTML = `1 ${from} = 1 ${to}`
            }
            updateValue();
   
            from1.addEventListener('change', updateValue);

            values.forEach(value => {
                exchangeTable1.innerHTML += `<tr>
                    <td>${value} ${from}</td>
                    <td>${value} ${to}</td>
                </tr>`
                exchangeTable2.innerHTML += `<tr>
                    <td>${value} ${to}</td>
                    <td>${value} ${from}</td>
                </tr>`
            })
        }
       
       
    } catch(error) {
        spinner.innerHTML = 'Unable to fetch exchange rates. Please try again later.';
        document.getElementById("main").innerHTML = "";
        console.log(error)
    }
}
currencyConverter('USD', 'PHP');

let updateCurrency = () => {currencyConverter(currency2.value, compare2.value);}

currency2.addEventListener('change', updateCurrency)
compare2.addEventListener('change', updateCurrency)

document.getElementById("switch1").addEventListener('click', () => {
    const temp = currency2.value;
    currency2.value = compare2.value;
    compare2.value = temp;
   
    updateCurrency();
});





let currencyList1 = document.getElementById('currency');
let compare = document.getElementById('compare');

let switch1 = document.getElementById("switch2")
   
dropdown(currencyList1, 'EUR');
dropdown(compare);
   
let date = document.getElementById("date")
date.value = new Date().toISOString().split('T')[0];
   
let updateUI = () => {
    let base = currencyList1.value;
    let quote = compare.value;
    let date2 = date.value;

    currencyExchanger(base, quote, date2);
}
   
currencyList1.addEventListener('change', updateUI)
compare.addEventListener('change', updateUI)
date.addEventListener('change', updateUI)
   
switch1.addEventListener('click', () => {
    const temp = currencyList1.value;
    currencyList1.value = compare.value;
    compare.value = temp;
   
    updateUI();
});





let cc = document.getElementById("currencyConverter");
let er = document.getElementById("exchangeRates");

// 1. Check for saved tab on page load
const savedTab = localStorage.getItem("activeTab");
if (savedTab === "exchange") {
    showExchange();
} else {
    showConverter(); // Default
}

// 2. Event Listeners
document.getElementById("ccbutton").addEventListener('click', showConverter);
document.getElementById("erbutton").addEventListener('click', showExchange);

// 3. Helper functions to handle display and storage
function showConverter() {
    cc.style.display = "block";
    er.style.display = "none";
    localStorage.setItem("activeTab", "converter");
}

function showExchange() {
    cc.style.display = "none";
    er.style.display = "block";
    localStorage.setItem("activeTab", "exchange");
}
