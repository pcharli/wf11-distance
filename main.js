// Exemple d'utilisation de la géolocalisation
const $sortie = document.querySelector('.sortie')
let previousAccelerometre = null
let actualAccelerometre = null
if (navigator.geolocation) {
  let previousPosition = null;
  let totalDistance = 0;

    const options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
  
    navigator.geolocation.watchPosition(function(position) {
      $sortie.innerHTML = `<p>Position : ${position.coords.latitude}</p>`
      //console.log(position)
      if (previousPosition) {
        //$sortie.innerText = previousPosition
        if(actualAccelerometre != previousAccelerometre) {
          const distance = getDistance(previousPosition.coords, position.coords)
          totalDistance += distance
          $sortie.innerHTML += `<p>Position précédente : ${previousPosition.coords.latitutde}</p>`
          $sortie.innerHTML += `<p>Distance parcourue : ${Math.floor(totalDistance*1000)} m.</p>`
        }
      }
      previousPosition = position
      previousAccelerometre = actualAccelerometre
    }, function(error) {
        $sortie.innerText ='Erreur de géolocalisation :', error.message
    }, options)
  }

  function getDistance(coords1, coords2) {
    const R = 6371 // Rayon de la Terre en km
    const dLat = deg2rad(coords2.latitude - coords1.latitude) //diff de latitude
    const dLon = deg2rad(coords2.longitude - coords1.longitude) //diff de longitude
    //formule de la haversine, couramment utilisée dans la navigation et la cartographie pour mesurer la distance entre deux points sur une sphère, comme la Terre.
    const a =
    //calculer la haversine des moitiés des différences de latitude et de longitude.
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coords1.latitude)) * Math.cos(deg2rad(coords2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      //convertit la différence angulaire en radians entre les deux points en distance le long de la surface de la sphère.
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }
  //Une fonction qui convertit une valeur d'angle de degrés en radians.
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  //accéléromètre
const acl = new Accelerometer({ frequency: 10 });
acl.addEventListener("reading", () => {
  actualAccelerometre = acl.x
});

acl.start();