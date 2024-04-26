export function getMyDateString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()} at ${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

export function getMyTimeString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

export function getTimeDifference(date: string) {
  const creationDate: any = new Date(date);
  const dateNow: any = new Date();
  const diffTimeHours = Math.abs(creationDate - dateNow) / (1000 * 60 * 60);
  const hoursRoundedDown = Math.floor(diffTimeHours);
  const minutesRounded = Math.floor((diffTimeHours - hoursRoundedDown) * 60);
  let hoursAndMinutesDifference: string;
  if (hoursRoundedDown === 0 && minutesRounded === 0) {
    hoursAndMinutesDifference = "just now";
  } else if (hoursRoundedDown === 0) {
    hoursAndMinutesDifference = `${minutesRounded} minute(s) ago`;
  } else {
    hoursAndMinutesDifference = `${hoursRoundedDown} hour(s) and ${minutesRounded} minute(s) ago`;
  }
  return hoursAndMinutesDifference;
}
