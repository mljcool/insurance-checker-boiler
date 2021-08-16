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
