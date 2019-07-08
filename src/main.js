import registerServiceWorker from './registerServiceWorker';

// styles
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
		this._get('https://api.nasa.gov/planetary/apod?api_key=fY55wHwziYqP2wlbJYyrnJ3uRypjp3eBaP85TZhh')
			.then(response => {
				console.log("[Main.js] Success", response);
				document.getElementsByClassName('app-header')[0].src = response.url;
			})
            .catch(err => {
                console.log("Error", err);
            })
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

// register the service worker
registerServiceWorker();

const main = new Main();
main.initialise();