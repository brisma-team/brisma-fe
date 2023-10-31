function calculateTimeDifference(createdAt) {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDifference = currentDate - createdDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    console.log("seconds => ", seconds);
    return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes <= 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours <= 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days <= 1 ? "yesterday" : `${days} days ago`;
  } else if (months < 12) {
    return months <= 1 ? "a month ago" : `${months} months ago`;
  } else {
    return years <= 1 ? "a year ago" : `${years} years ago`;
  }
}

export default calculateTimeDifference;
