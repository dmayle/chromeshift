import { Directions, windowsInOrder } from "./helpers";

/**
 * Get all of the selected tabs from the currently focused window, and attach
 * them to the next window over in the direction specified. If no window is
 * found in the specified direction, then no change is made.
 * @param {Directions} direction - The direction to look for the next window
 */
export function attach(direction: Directions) {
  Promise.all([chrome.windows.getLastFocused({ "populate": true }), chrome.windows.getAll({})]
  ).then(([focusedWindow, allWindows]) => {
    let nextWindow: chrome.windows.Window | null = null;
    for (let currentWindow of allWindows) {
      if (currentWindow.id == focusedWindow.id || !windowsInOrder(focusedWindow, currentWindow, direction)) {
        continue;
      }

      if (nextWindow == null) {
        nextWindow = currentWindow;
        continue;
      }

      if (windowsInOrder(nextWindow, currentWindow, direction)) {
        continue;
      }
      nextWindow = currentWindow;
    }

    if (nextWindow == null || nextWindow.id === undefined) {
      console.log("No windows found in direction:", direction);
      return;
    }

    // Collect focused tabs from the current window
    let focusedTabs: number[] = [];
    for (let tab of focusedWindow.tabs || []) {
      if (!tab.highlighted || tab.id === undefined) {
        continue;
      }
      focusedTabs.push(tab.id);
    }

    // Move the tabs to the end of the next Window
    chrome.tabs.move(focusedTabs, { "windowId": nextWindow.id, "index": -1 });

    // Setting a tab as active resets the selection, so we only set the first moved tab as active
    let isFirst = true;
    for (let tabId of focusedTabs) {
      // Make sure it's highlighted and active in the new window
      chrome.tabs.update(tabId, { "highlighted": true, "active": isFirst });
      isFirst = false;
    }

    // Move the focus to the new window
    chrome.windows.update(nextWindow.id, { "focused": true });
  }).catch(error => {
    console.log("Unable to query windows:", error);
  });
}
/**
 * Detaches all selected tabs from the currently focused window, moves them
 * into a new window and ensures that all of the tabs are still selected
 */
export function detachTab() {
  // Detach the first highlighted tab into a window, then move any other
  // highlighted tabs into same window
  chrome.windows.getLastFocused({ "populate": true }
  ).then((focusedWindow) => {
    // Collect focused tabs from the current window
    let focusedTabs: number[] = [];
    for (let tab of focusedWindow.tabs || []) {
      if (!tab.highlighted || tab.id === undefined) {
        continue;
      }
      focusedTabs.push(tab.id);
    }

    if (focusedTabs.length == 0) {
      return;
    }

    // To support detaching multiple tabs, we create a window using the first
    // tab highlighted, then move any extra tabs into that window
    let firstTabId = focusedTabs.shift();
    chrome.windows.create({ "tabId": firstTabId, "focused": true }
    ).then((newWindow) => {
      chrome.tabs.update(firstTabId!, { "highlighted": true, "active": true });

      if (focusedTabs.length == 0) {
        return;
      }

      chrome.tabs.move(focusedTabs, { "windowId": newWindow.id, "index": -1 });
      for (let tabId of focusedTabs) {
        chrome.tabs.update(tabId, { "highlighted": true });
      }
    }).catch(error => {
      console.log("Unable to create new window:", error);
    });
  }).catch(error => {
    console.log("Unable to query windows:", error);
  });
}
