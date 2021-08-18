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
    chrome.notifications.clear('ON', (status) => {});
    chrome.notifications.clear('SYNC_STATUS', (status) => {});
    clearTimeout(mySetTimeout);
  }, 1600);
};

export const createNotify = (message) => {
  const opt = {
    type: 'basic',
    title: 'Insurance Checker',
    message,
    priority: 1,
    iconUrl: 'img/icons/icon48.png',
  };
  chrome.notifications.create('ON', opt, (id) => {
    clearStatusNotifications();
  });
};
