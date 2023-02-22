/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

window.sheetStateActiveMap = null;

window.initSheetStates=function(){

  sheetStateActiveMap = new Map();
  for(const sheetState of g_sheetStatesArray){
    sheetStateActiveMap.set(sheetState.id, false);
  }

}


window.getSheetStateByID=function(stateID){
  return g_sheetStatesArray.find(sheetState => {
    return sheetState.id == stateID;
  });
}

window.getSheetStateByName=function(stateName){
  return g_sheetStatesArray.find(sheetState => {
    return sheetState.name.toUpperCase() == stateName.toUpperCase();
  });
}

window.isSheetStateActive=function(stateID){
  return sheetStateActiveMap.get(stateID);
}

window.setSheetStateActive=function(stateID, toggle){
  sheetStateActiveMap.set(stateID, toggle);
}


window.getSheetStates=function(){

  let stateArray = [];
  for(let sheetStates of g_sheetStatesArray){
    sheetStates.isActive = isSheetStateActive(sheetStates.id);
    stateArray.push(sheetStates);
  }

  return stateArray.sort(
    function(a, b) {
      return a.name > b.name ? 1 : -1;
    }
  );

}