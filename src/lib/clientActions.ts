export function getMyDateString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()} at ${creationDate.getHours()}:${creationDate.getMinutes()}`;
}

export function getMyTimeString(date: string) {
  const creationDate = new Date(date);
  return `${creationDate.getHours()}:${creationDate.getMinutes()}`;
}
