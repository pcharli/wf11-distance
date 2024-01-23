// Exemple d'utilisation de la géolocalisation
const $sortie = document.querySelector('.sortie')
if (navigator.geolocation) {
    let previousPosition = null;
    let totalDistance = 0;

    const options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
  
    navigator.geolocation.watchPosition(function(position) {
      if (previousPosition) {
        $sortie.innerText = previousPosition
        const distance = getDistance(previousPosition.coords, position.coords);
        totalDistance += distance;
        $sortie.innerText = 'Distance parcourue :', totalDistance;
      }
  
      previousPosition = position;
    }, function(error) {
        $sortie.innerText ='Erreur de géolocalisation :', error.message
    }, options);
  }
  
  function getDistance(coords1, coords2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = deg2rad(coords2.latitude - coords1.latitude);
    const dLon = deg2rad(coords2.longitude - coords1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coords1.latitude)) * Math.cos(deg2rad(coords2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }