/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

/* Dice Loader */
window.g_diceLoaderPercentage = 0;

window.startDiceLoader = function () {
  $(".ldBar").removeClass("is-hidden");

  $(".dice-pageloader").removeClass("fadeout");
  $("html").addClass("is-clipped");

  $(".ldBar-message").text("Initializing Load");
  setDiceLoaderPercentage(5);

  socket.off("updateLoadProgess");
  socket.on("updateLoadProgess", function (data) {
    updateDiceLoader(data.message, data.upVal);
  });

  simulateDiceLoading();
};

window.updateDiceLoader = function (message, upVal) {
  $(".ldBar-message").text(message + "...");
  setDiceLoaderPercentage(g_diceLoaderPercentage + upVal);
};

window.setDiceLoaderPercentage = function (percentage) {
  let bar = new ldBar(".ldBar");
  bar.set(percentage, true);
  g_diceLoaderPercentage = percentage;
};

window.getDiceLoaderPercentage = function () {
  return g_diceLoaderPercentage;
};

window.stopDiceLoader = function () {
  updateDiceLoader("Finalizing", 100);
  $(".dice-pageloader").addClass("fadeout");
  $("html").removeClass("is-clipped");
};

/* Spinner Loader */
window.startSpinnerLoader = function () {
  $(".pageloader").removeClass("is-hidden");
};

window.stopSpinnerLoader = function () {
  setTimeout(() => {
    $(".pageloader").addClass("is-hidden");
  }, 500); // After 1/2 second
};

/* Spinner Sub-Loader */
window.startSpinnerSubLoader = function (loaderClass = null) {
  if (loaderClass != null) {
    $("." + loaderClass).removeClass("is-hidden");
  } else {
    $(".subpageloader").removeClass("is-hidden");
  }
};

window.stopSpinnerSubLoader = function (loaderClass = null) {
  setTimeout(() => {
    if (loaderClass != null) {
      $("." + loaderClass).addClass("is-hidden");
    } else {
      $(".subpageloader").addClass("is-hidden");
    }
  }, 500); // After 1/2 second
};

/* ------ Fake - Increase Diceloader Percentage Overtime ------ */
// With switching away from sockets for large loads, it makes getting realtime load progress updates far more difficult. As a result, the loading state will now have to be fake updates for the time being :(
window.simulateDiceLoading = function () {
  let randNum = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  updateDiceLoader("Opening Books", 2);

  setTimeout(function () {
    if (g_diceLoaderPercentage >= 100) {
      return;
    }
    updateDiceLoader("Gathering Skills", 2);

    setTimeout(function () {
      if (g_diceLoaderPercentage >= 100) {
        return;
      }
      updateDiceLoader("Indexing Traits", 5);

      setTimeout(function () {
        if (g_diceLoaderPercentage >= 100) {
          return;
        }
        updateDiceLoader("Understanding Feats", 23);

        setTimeout(function () {
          if (g_diceLoaderPercentage >= 100) {
            return;
          }
          updateDiceLoader("Bartering for Items", 20);

          setTimeout(function () {
            if (g_diceLoaderPercentage >= 100) {
              return;
            }
            updateDiceLoader("Discovering Spells", 15);

            setTimeout(function () {
              if (g_diceLoaderPercentage >= 100) {
                return;
              }
              updateDiceLoader("Determining Skills", 6);

              setTimeout(function () {
                if (g_diceLoaderPercentage >= 100) {
                  return;
                }
                updateDiceLoader("Finding Languages", 3);

                setTimeout(function () {
                  if (g_diceLoaderPercentage >= 100) {
                    return;
                  }
                  updateDiceLoader("Finding Conditions", 14);

                  setTimeout(function () {
                    updateDiceLoader("Finalizing", 100);
                  }, 300 * randNum(0.5, 2));
                }, 300 * randNum(0.5, 2));
              }, 300 * randNum(0.5, 2));
            }, 800 * randNum(0.5, 2));
          }, 800 * randNum(0.5, 2));
        }, 1000 * randNum(0.5, 2));
      }, 800 * randNum(0.5, 2));
    }, 100 * randNum(0.5, 2));
  }, 500 * randNum(0.5, 2));
};
