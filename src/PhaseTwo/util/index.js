export const makeCleanString = (string = '') => {
  return string.replace(' ', '').toLowerCase();
};

export const filterSatus = (insurances, filterType) => {
  return insurances.filter((policy) =>
    policy.policies.some(
      (insurer) =>
        makeCleanString(insurer.policyStatus) === makeCleanString(filterType)
    )
  );
};

export const setSyncID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
