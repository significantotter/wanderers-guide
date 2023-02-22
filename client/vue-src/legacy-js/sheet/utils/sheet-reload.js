/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

window.g_reloadingSheet = false;

window.reloadCharSheet=function(){
  if(!g_reloadingSheet) {
    setDelayToReloadSheet();
  }
}

window.setDelayToReloadSheet=function(){
  g_reloadingSheet = true;
  setTimeout(() => {
    loadCharSheet();
    g_reloadingSheet = false;
  }, 175);
}