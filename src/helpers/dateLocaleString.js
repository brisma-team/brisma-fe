const dateLocaleString = (params, withTime = false, toGMTPlus7 = true) => {
  // Create a Date object by parsing the input string
  const date = new Date(params);

  if (toGMTPlus7) {
    const gmtPlus7Time = date.getTime() + 7 * 60 * 60 * 1000;
    date.setTime(gmtPlus7Time);
  }

  // Define options for formatting the date
  const options = {
    weekday: "long", // Displays the full weekday name (e.g., "Wednesday")
    day: "2-digit", // Displays the day of the month as two digits (e.g., "02")
    month: "long", // Displays the full month name (e.g., "August")
    year: "numeric", // Displays the full year (e.g., "2023")
  };

  if (withTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  // Format the date according to the options
  const formattedDate = date.toLocaleDateString("id-ID", options);

  return formattedDate;
};

export default dateLocaleString;
