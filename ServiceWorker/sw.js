'use strict';

// Array di configurazione del service worker
var config = {
  //versione del service-worker
  version: "version:0",
  // Risorse da inserire in cache immediatamente - Precaching
  staticCacheItems: [
    './',
    'index.html',
    //Qui vanno le risorse usate da index.html
    './res/js/index.js',
    './res/img/Copertine-Facebook-gratis.jpg',
    './res/img/google-immagini.jpg',
    './res/js/registration_sw.js',
    './res/css/index.css'
  ]
};

function getResFromPage(){
  var imgs = document.getElementsByTagName("img");
  var scripts = document.getElementsByTagName("script");
  var links = document.getElementsByTagName("link");
  var il = imgs.length;
  var sl = scripts.length;
  var ll = links.length;

  for(var i=0; i<il; i++){
    config.staticCacheItems.push(imgs[i].src);
  }
  for(var j=0; j<sl; j++){
    config.staticCacheItems.push(scripts[j].src);
  }
  for(var k=0; k<ll; k++){
    config.staticCacheItems.push(links[k].src);
  }

  return config.staticCacheItems;
}

/*config.staticCacheItems = getResFromPage();
config.staticCacheItems.push('./');*/

// Funzione che restituisce una stringa da utilizzare come chiave(nome) per la cache
function cacheName(key, opts) {
  return key+"#"+opts.version;
}

// Evento install
self.addEventListener('install', event => {
  //Error: document not defined
  //getResFromPage();
  event.waitUntil(
   //console.log(getResFromPage());

   // Inserisco in cache le URL configurate in config.staticCacheItems
   caches.open(cacheName('MIIDM', config)).then(cache => cache.addAll(config.staticCacheItems))
   // self.skipWaiting() evita l'attesa, il che significa che il service worker si attiverà immediatamente non appena conclusa l'installazione
   .then( () => self.skipWaiting() )
 );
 console.log("Service Worker Installato");
});

// Evento activate
self.addEventListener('activate', event => {

 // Questa funzione elimina dalla cache tutte le risorse la cui chiave non contiene il nome della versione
 // impostata sul config di questo service worker
 function clearCacheIfDifferent(event, opts) {
   return caches.keys().then(cacheKeys => {
     var oldCacheKeys = cacheKeys.filter(key => {
       return (key.indexOf(opts.version) < 0);
     });
     var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
     return Promise.all(deletePromises);
   });
 }

event.waitUntil(
 // Se la versione del service worker cambia, svuoto la cache
 clearCacheIfDifferent(event, config)
 // Con self.clients.claim() consento al service worker di poter intercettare le richieste (fetch) fin da subito piuttosto che attendere il refresh della pagina
 .then( () => self.clients.claim() )
 );
 console.log("Service Worker Avviato");
});

// Evento fetch
self.addEventListener('fetch', event => {
  console.log("Richiesta URL: "+event.request.url);
  event.respondWith(
    //provo a fare il fetch della richiesta
    fetch(event.request).then(response => {
      //se va a bun fine:
      //1) faccio il caching della request
      var r1 = response.clone();
      var stato = response.status;
      //2) verifico se la risorsa è disponibile
      if(stato == 200){
        console.log("Lo stato è "+stato+" :)");
        caches.open(cacheName('MIIDM', config)).then(cache => {
          cache.put(event.request, r1);
        });
        //2.1) la Promise va a fullfill con il return della response
        return response;
      }
      console.log("Lo stato è "+stato+" :(");
      //1.err) se non è disponibile return vuoto
      return Promise.reject(new Error('not 200'));
    }).catch(value => {
      //se il fatch ha fallito la Promise sarà Pending
      //provo a fare un match nella mia cache
      console.log("1 reject:",value);
      return caches.open(cacheName('MIIDM', config)).then(cache => {
        var cr = cache.match(event.request);
        console.log("cache.match:",cr);
        return cr;
      }).catch( value => {
        //se il match nella cache fallisce genererà un errore e la Promise sarà rejected
        console.error("Fatch error:",value);
      });
      })
     );
 });
