export function getMyDateString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()} at ${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

export function getMyTimeString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

// Berechnung des Stundenunterschieds zwischen 2 Datumsobjekten
// function getTimeDifference(date: Date) {
//   const creationDate = new Date(date);
//   const dateNow = new Date();
//   const diffTimeHours = Math.round(Math.abs(dateNow - creationDate)/(1000 * 60 * 60));
//   console.log("diffTimeHours", diffTimeHours);
//   // return diffTimeHours;
// }

// not working, because hours should be displayed conditionally on whether they are bigger than 0
export function getTimeDifference(date: string) {
  const creationDate: any = new Date(date);
  const dateNow: any = new Date();
  const diffTimeHours = Math.abs(creationDate - dateNow) / (1000 * 60 * 60);
  const hoursRoundedDown = Math.floor(diffTimeHours);
  const minutesRounded = Math.floor((diffTimeHours - hoursRoundedDown) * 60);
  let hoursAndMinutesDifference: string;
  if (hoursRoundedDown === 0 && minutesRounded === 0) {
    hoursAndMinutesDifference = "now";
  } else if (hoursRoundedDown === 0) {
    hoursAndMinutesDifference = `${minutesRounded} minute(s)`;
  } else {
    hoursAndMinutesDifference = `${hoursRoundedDown} hour(s) and ${minutesRounded} minute(s)`;
  }
  return hoursAndMinutesDifference;
}

// getTimeDifference("2024-04-25T10:22:52.562+00:00")
