const checkStatusSprint = (data) => {
  if (!data?.length) return 0;

  for (let sprint of data) {
    if (sprint.start_date_real === null || sprint.end_date_real === null) {
      return sprint.no;
    }
  }
  return data[data.length - 1].no;
};

export default checkStatusSprint;
