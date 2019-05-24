import ServiceWorker from './sw';
import './styles.scss';

function init() {
	console.log('Registering Service Worker');
	console.log('process.env.VERSION', process.env.VERSION);
	console.log('process.env.PLATFORM', process.env.PLATFORM);
	console.log('process.env.NODE_ENV', process.env.NODE_ENV);

	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register(ServiceWorker).then(function(registration) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function(err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});
		});
	}
}

init();