(function () {  
    document.addEventListener('DOMContentLoaded', function () {  
        var els = document.querySelectorAll('[data-track-btn]');  
        els.forEach(function (el) {  
            el.addEventListener('click', function () {  
                navigator.sendBeacon(  
                    'https://haribackend-mitj.onrender.com/track/click',  
                    new Blob(  
                        [JSON.stringify({ btn: el.dataset.trackBtn, ref: document.referrer, ts: Date.now() })],  
                        { type: 'application/json' }  
                    )  
                );  
            });  
        });  
    });  
})();  
