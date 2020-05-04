console.log('Client Side JS is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#search');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    const address = search.value;
    if (!address) {
        const errorString = 'You must provide an address.';
        message1.textContent = errorString;
    } else {
        fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error;
                } else {
                    message1.textContent = data.placeName;
                    message2.textContent = data.weather + `\nTemperature : ${data.temperature}`;
                }
            })
        });
    }
})