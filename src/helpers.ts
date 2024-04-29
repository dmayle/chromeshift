/** The cardinal directions supported by this extension */
export enum Directions {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

/**
 * Gets all of this extension's commands from Chrome, and checks to make sure
 * that extensions are configured
 * */
export function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts: string[] = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === '' && name !== undefined) {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      console.log("Not all shortcuts were registered!", missingShortcuts);
    }
  });
}

/**
 * Helper function to return which direction is 90 degrees clockwise from the
 * supplied direction.
 */
function clockwise(direction: Directions) {
  switch (direction) {
    case Directions.UP:
      return Directions.RIGHT;
    case Directions.DOWN:
      return Directions.LEFT;
    case Directions.LEFT:
      return Directions.UP;
    case Directions.RIGHT:
      return Directions.DOWN;
    default:
      console.log("Unsupported direction:", direction);
      return Directions.UP;
  }
}

/**
 * Checks if the second window is in the direction specified from the point of
 * view of the first window. If checkRotated is specified (which it is by
 * default), and the two windows have the same edge in the direction specified
 * (e.g. for Directions.RIGHT, they have the same right edge), then we will
 * check to see if secondWindow is in the clockwise direction from the point of
 * view of the first. This design decision allows us cycle though multiple
 * stacked windows without having to change which attach shortcut is being
 * used.
 */
export function windowsInOrder(firstWindow: chrome.windows.Window, secondWindow: chrome.windows.Window, direction: Directions, checkRotated = true): boolean {
  let firstEdge: number | undefined, secondEdge: number | undefined;
  if (firstWindow.top === undefined || firstWindow.height === undefined || firstWindow.left === undefined || firstWindow.width === undefined) {
    throw new TypeError("First window passed to windowsInOrder is invalid!");
  }
  if (secondWindow.top === undefined || secondWindow.height === undefined || secondWindow.left === undefined || secondWindow.width === undefined) {
    throw new TypeError("First window passed to windowsInOrder is invalid!");
  }
  switch (direction) {
    case Directions.UP:
      firstEdge = firstWindow.top;
      secondEdge = secondWindow.top;
      break;
    case Directions.DOWN:
      firstEdge = firstWindow.top + firstWindow.height;
      secondEdge = secondWindow.top + secondWindow.height;
      break;
    case Directions.LEFT:
      firstEdge = firstWindow.left;
      secondEdge = secondWindow.left;
      break;
    case Directions.RIGHT:
      firstEdge = firstWindow.left + firstWindow.width;
      secondEdge = secondWindow.left + secondWindow.width;
      break;
    default:
      console.log("Unsupported direction:", direction);
      return false;
  }

  if (firstEdge == secondEdge) {
    return checkRotated && windowsInOrder(firstWindow, secondWindow, clockwise(direction), false);
  }

  switch (direction) {
    case Directions.UP:
    case Directions.LEFT:
      return firstEdge > secondEdge;
    case Directions.DOWN:
    case Directions.RIGHT:
      return firstEdge < secondEdge;
    default:
      console.log("Unsupported direction:", direction);
  }
  return false;
}

