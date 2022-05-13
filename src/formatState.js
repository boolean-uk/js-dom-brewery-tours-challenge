const formatState = (selectState) => {
  const lowerCaseState = selectState.toLowerCase();
  return lowerCaseState.includes(" ")
    ? lowerCaseState.replace(" ", "_")
    : lowerCaseState;
};

export default formatState;
