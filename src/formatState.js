const formatState = (selectState) => {
  const lowerCaseState = selectState.toLowerCase();
  if (lowerCaseState.includes(" ")) {
    return lowerCaseState.replace(" ", "_");
  }
  return lowerCaseState;
};

export default formatState;
