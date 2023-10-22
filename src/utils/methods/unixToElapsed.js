export const getElapsedTime = timestampWithMilliseconds => {
  const now = new Date().getTime(); // Current time in milliseconds

  const timestamp = Math.floor(timestampWithMilliseconds / 1000000); // Convert to seconds

  const timeDifference = now - timestamp; // Time difference in milliseconds

  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 0) {
    return `a few seconds ago`;
  }
  // if (seconds < 60) {
  //   return `${seconds}s`;
  // }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60 && seconds > 0) {
    return `${minutes}min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }

  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
};
