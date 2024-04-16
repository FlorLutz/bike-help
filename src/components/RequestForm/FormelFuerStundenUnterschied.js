// Berechnung des Stundenunterschieds zwischen 2 Datumsobjekten
const date = new Date();
const date2 = new Date("4/15/2024");
const diffTimeHours = Math.abs(date - date2);
console.log("diffTimeHours", diffTimeHours / (1000 * 60 * 60));
