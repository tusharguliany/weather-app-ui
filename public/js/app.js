const weatherForm = document.querySelector('form');
const search = document.querySelector('#search');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');
const message3 = document.querySelector('#message3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.innerHTML = 'Loading...';
    message2.innerHTML = '';
    message3.innerHTML = '';
    const address = search.value;
    if (!address) {
        const errorString = 'You must provide an address.';
        message1.innerHTML = errorString;
    } else {
        fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.innerHTML = data.error;
                } else {
                    message1.innerHTML = `Time Zone is <b>${data.timezone}</b>.`;
                    message2.innerHTML = `Place is <b>${data.placeName}</b>.`;
                    message3.innerHTML = `It is <b>${data.weather}</b>.<br>Temperature is <b>${data.temperature} degrees out</b>, and feels like <b>${data.feelslike} degrees</b>.`;
                }
            })
        });
    }
})