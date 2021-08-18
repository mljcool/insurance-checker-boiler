import { insurerList } from '../../constant/insurers';
import * as browser from 'webextension-polyfill';

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

export const getInsurerName = (insurerId) => {
  const { providerName } = insurerList.find((ins) => ins.id === insurerId);
  return providerName;
};

export const getInsurerNameAPIFormat = (insurerId) => {
  const { providerNameLowerCases } = insurerList.find(
    (ins) => ins.id === insurerId
  );
  return providerNameLowerCases;
};

export const clearStatusNotifications = () => {
  let mySetTimeout = null;

  mySetTimeout = setTimeout(() => {
    const clearing = browser.notifications.clear('ON');
    clearing.then(() => {
      console.log('cleared');
    });
    clearTimeout(mySetTimeout);
  }, 3000);
};

export const createNotify = (message) => {
  const opt = {
    type: 'basic',
    title: 'Insurance Checker Re-fetching ',
    message,
    priority: 1,
    iconUrl: './icons/icon48.png',
  };

  browser.notifications.create('ON', opt);
  clearStatusNotifications();
};
