export default () => {
    console.log('Registering Service Worker');

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker
            .register('./src/service-worker.js', {scope: './src/'})
            .then(function (registration) {
                console.log("Service Worker Registered", registration.scope);
            })
            .catch(function (err) {
                console.log("Service Worker Failed to Register", err);
            })
    }
}