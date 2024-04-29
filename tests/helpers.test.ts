import { Directions, windowsInOrder } from "../src/helpers";
import { strict as assert } from 'assert';
import { describe, test } from 'node:test';
/**
 * Non-overalapping Test Cases
 *
 * Each of these test cases requires a well defined ordering in all directions.
 * While some orderings make less sense (e.g. Top-To-Bottom when the two
 * windows are Left-To-Right), it is possible for that configuration to exist
 * in between two other windows which *do* have a clear ordering in the desired
 * direction. In these cases, the user expects to be able to navigate in the
 * logical direction and be able to pass the windows that exist between them.
 */

describe('Testcase ONE', () => {
/**
 * #############
 * #     #     #
 * #  A  #  B  #
 * #     #     #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase TWO', () => {
/**
 *       #######
 *       #     #
 * #######  B  #
 * #     #     #
 * #  A  #######
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase THREE', () => {
/**
 * #############
 * #     #     #
 * #     #  B  #
 * #  A  #     #
 * #     #######
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase FOUR', () => {
/**
 * #######
 * #     #
 * #     #######
 * #     #     #
 * #  A  #  B  #
 * #     #     #
 * #     #######
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 40,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase FIVE', () => {
/**
 * #######
 * #     #
 * #     #######
 * #  A  #     #
 * #     #  B  #
 * #     #     #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase SIX', () => {
/**
 * #######
 * #     #
 * #  A  #######
 * #     #     #
 * #######  B  #
 *       #     #
 *       #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase SEVEN', () => {
/**
 *       #######
 *       #     #
 * #######     #
 * #     #     #
 * #  A  #  B  #
 * #     #     #
 * #######     #
 *       #     #
 *       #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase EIGHT', () => {
/**
 * #######
 * #     #
 * #  A  #
 * #     #
 * #######
 * #     #
 * #  B  #
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase NINE', () => {
/**
 *    #######
 *    #     #
 *    #  A  #
 *    #     #
 * ##########
 * #     #
 * #  B  #
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 20,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase TEN', () => {
/**
 * ###########
 * #         #
 * #    A    #
 * #         #
 * ###########
 * #     #
 * #  B  #
 * #     #
 * #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase ELEVEN', () => {
/**
 * #############
 * #           #
 * #     A     #
 * #           #
 * #############
 *    #     #
 *    #  B  #
 *    #     #
 *    #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 30,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase TWELVE', () => {
/**
 * ###########
 * #         #
 * #    A    #
 * #         #
 * ###########
 *     #     #
 *     #  B  #
 *     #     #
 *     #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase THIRTEEN', () => {
/**
 * #######
 * #     #
 * #  A  #
 * #     #
 * ##########
 *    #     #
 *    #  B  #
 *    #     #
 *    #######
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase FOURTEEN', () => {
/**
 *    #######
 *    #     #
 *    #  A  #
 *    #     #
 * #############
 * #           #
 * #     B     #
 * #           #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 30,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
  });
});

describe('Testcase FIFTEEN', () => {
/**
 * #############
 * #     #     #
 * #     #  B  #
 * #     #     #
 * #  A  #######
 * #     #     #
 * #     #  C  #
 * #     #     #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const windowC: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
    assert(windowsInOrder(windowB, windowC, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowC, windowB, Directions.LEFT));
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowB, windowC, Directions.DOWN));
    assert(windowsInOrder(windowC, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowC, windowA, Directions.UP));
    assert(windowsInOrder(windowA, windowB, Directions.UP));
  });
});

describe('Testcase SIXTEEN', () => {
/**
 * #############
 * #     #     #
 * #  A  #     #
 * #     #     #
 * #######  C  #
 * #     #     #
 * #  B  #     #
 * #     #     #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowC: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowA, windowC, Directions.RIGHT));
    assert(windowsInOrder(windowC, windowB, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowC, windowB, Directions.LEFT));
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowC, Directions.DOWN));
    assert(windowsInOrder(windowC, windowB, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.UP));
    assert(windowsInOrder(windowA, windowC, Directions.UP));
  });
});

describe('Testcase SEVENTEEN', () => {
/**
 * #############
 * #           #
 * #     A     #
 * #           #
 * #############
 * #     #     #
 * #  B  #  C  #
 * #     #     #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowC: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert(windowsInOrder(windowB, windowA, Directions.RIGHT));
    assert(windowsInOrder(windowA, windowC, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    assert(windowsInOrder(windowC, windowB, Directions.LEFT));
    assert(windowsInOrder(windowB, windowA, Directions.LEFT));
  });
  test('Top-to-Bottom Ordering', () => {
    assert(windowsInOrder(windowA, windowC, Directions.DOWN));
    assert(windowsInOrder(windowC, windowA, Directions.DOWN));
  });
  test('Bottom-to-Top Ordering', () => {
    assert(windowsInOrder(windowB, windowC, Directions.UP));
    assert(windowsInOrder(windowC, windowA, Directions.UP));
  });
});

describe('Testcase EIGHTEEN', () => {
/**
 * #############
 * #     #     #
 * #  A  #  B  #
 * #     #     #
 * #############
 * #           #
 * #     C     #
 * #           #
 * #############
 */
  const windowA: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const windowB: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const windowC: chrome.windows.Window = {
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    // assert(windowsInOrder(windowA, windowB, Directions.RIGHT));
    // assert(windowsInOrder(windowB, windowC, Directions.RIGHT));
  });
  test('Right-to-Left Ordering', () => {
    // assert(windowsInOrder(windowB, windowA, Directions.LEFT));
    // assert(windowsInOrder(windowB, windowC, Directions.LEFT));
  });
});
