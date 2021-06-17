export const filterInsurance = (insurerList, data) => {
  return insurerList.map((insurer) => {
    insurer.isConnected = data.some(
      (insurance) => insurance.insurerId === insurer.id
    );
    return insurer;
  });
};

export const zeroConnections = (insurerListRef) =>
  insurerListRef.filter((insurance) => insurance.isConnected).length === 0;
