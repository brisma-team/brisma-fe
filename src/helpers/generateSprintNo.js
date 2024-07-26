const generateSprintNo = (sprints) => {
  sprints.sort((a, b) => a.no - b.no);

  for (let i = 0; i < sprints.length; i++) {
    if (sprints[i].no !== i + 1) {
      return i + 1;
    }
  }

  return sprints.length > 0 ? sprints[sprints.length - 1].no + 1 : 1;
};

export default generateSprintNo;
