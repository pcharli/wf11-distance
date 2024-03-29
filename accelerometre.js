const $acc = document.querySelector('.acc')

const acl = new Accelerometer({ frequency: 10 });
acl.addEventListener("reading", () => {
  $acc.innerText = `Acceleration along the X-axis ${acl.x}`
  console.log(`Acceleration along the Y-axis ${acl.y}`);
  console.log(`Acceleration along the Z-axis ${acl.z}`);
});

acl.start();