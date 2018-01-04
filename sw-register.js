if ('serviceWorker' in navigator){
  // console.log('working')
  navigator.serviceWorker.register('sw.js',
    {scope:'/'})
      .then((registration) => {
        console.log('Service worker registation completed')
      }
      )}else{console.log('no serviceWorker in navigator')}