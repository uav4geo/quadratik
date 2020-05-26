import App from './App.vue';

window.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#app',
        render: h => h(App)
    });

    if (window.location.href.indexOf("localhost") !== -1 ||
        window.location.href.indexOf("192.168.") !== -1 ||
        window.location.href.indexOf("127.0.0.1") !== -1){
        const livereload = document.createElement("script");
        livereload.src = `${window.location.protocol}//${window.location.hostname}:35731/livereload.js`;
        document.body.appendChild(livereload);
    }
});