export function getMyDateString(date) {
  const creationDate = new Date(date);
  return `${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()} at ${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

export function getMyTimeString(date) {
  const creationDate = new Date(date);
  return `${creationDate.getHours()}:${creationDate.getMinutes()}`;
}
