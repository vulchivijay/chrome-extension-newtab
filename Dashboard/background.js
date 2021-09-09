// background.js

const green = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ green });
  console.log('Default background color set to %cgreen', `color: ${green}`);
});