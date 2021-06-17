export const filterInsurance = (insurerList, data) => {
  return insurerList.map((insurer) => {
    insurer.isConnected = data.some(
      (insurance) => insurance.insurerId === insurer.id
    );
    return insurer;
  });
};

export const filterizeConnections = (insurerListRef) => {
  return insurerListRef.filter((insurance) => insurance.isConnected);
};

export const zeroConnections = (insurerListRef) =>
  filterizeConnections(insurerListRef).length === 0;

export const checkBeforeForProceed = ({ clientList, isZeroConnections }) => {
  return !!(clientList.length && !isZeroConnections);
};
