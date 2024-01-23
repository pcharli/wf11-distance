// Exemple d'utilisation de la géolocalisation
const $sortie = document.querySelector('.sortie')
if (navigator.geolocation) {

    const options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
  
    navigator.geolocation.watchPosition(function(position) {
      $sortie.innerText = position.coords.latitude
      console.log(position)
    }, function(error) {
        $sortie.innerText ='Erreur de géolocalisation :', error.message
    }, options);
  }