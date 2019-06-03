import './styles.scss';

export default class Main {

	constructor()
	{
		console.log("Main App Started");
	}

    /**
	 * Initialise the main app
     * @private
     */
	initialise()
	{
		this._registerServiceWorker();

		this._get('https://api.nasa.gov/planetary/apod?api_key=fY55wHwziYqP2wlbJYyrnJ3uRypjp3eBaP85TZhh')
			.then(response => {
				console.log("Success", response);
				document.getElementsByClassName('app-header')[0].src = response.url;
			})
            .catch(err => {
                console.log("Error", err);
            })
	}

    /**
	 * Register the service worker
     * @private
     */
	_registerServiceWorker()
	{
        console.log('Registering Service Worker');

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('./src/service-worker.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
	}

    /**
	 * Function to perform HTTP request
     * @param url
     * @private
     */
	_get(url)
	{
	   return new Promise(function (resolve, reject) {

	   		let xhr = new XMLHttpRequest();
	   		xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						let result = xhr.responseText;
						result = JSON.parse(result);
						resolve(result);
					} else {
						reject(xhr);
					}
				}
			};

			xhr.open("GET", url, true);
			xhr.send();
	   });
	}
}

const main = new Main();
main.initialise();