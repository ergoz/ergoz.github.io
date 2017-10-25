importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '914082810772'
});

const messaging = firebase.messaging();
var audio = new Audio('https://ergoz.github.io/serviceworker/icq.mp3');


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: 'https://ergoz.github.io/serviceworker/175x175bb.jpg'
    };
    audio.play();
    audio.play();
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});



messaging.onMessage(function(payload){
    audio.play();
	console.log('onMessage',payload);
})
                      
self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }
    
        return clients.openWindow(target);
    }));
});
