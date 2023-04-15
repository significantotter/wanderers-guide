/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

window.socket = io();

window.g_activeBuild = null;

window.g_featMap = null;
window.g_itemMap = null;
window.g_spellMap = null;
window.g_allLanguages = null;
window.g_allConditions = null;
window.g_allTags = null;
window.g_skillMap = null;

// ~~~~~~~~~~~~~~ // Run on Load // ~~~~~~~~~~~~~~ //
export function initBuildsPage(viewBuildID, buildTabName){

  $('.category-tabs li a').click(function() {
    $('#browseTab').parent().removeClass("is-active");
    $('#userContentTab').parent().removeClass("is-active");
    $(this).parent().addClass("is-active");
  });

  $('#browseTab').click(function() {
    openBuildsBrowse();
  });

  $('#userContentTab').click(function() {
    openUserContent();
  });
  if(viewBuildID != '' || buildTabName != '') {
    if(viewBuildID != ''){
      $('#browseTab').parent().addClass('is-active');
      openBuildView(viewBuildID);
    } else if(buildTabName != ''){
      switch(buildTabName) {
        case 'BROWSE': $('#browseTab').trigger("click"); break;
        case 'CONTENT': $('#userContentTab').trigger("click"); break;
        default: break;
      }
    }
  } else {
    $('#browseTab').trigger("click");
  }

};

/*
socket.on("returnHomebrewBundle", function(REQUEST_TYPE, homebrewBundle){
  if(homebrewBundle != null){
    if(REQUEST_TYPE === 'EDIT') {
      $('#userContentTab').parent().addClass("is-active");
      openBundleEditor(homebrewBundle);
    } else if(REQUEST_TYPE === 'VIEW') {
      $('#browseTab').parent().addClass("is-active");
      openBundleView(homebrewBundle);
    }
  }
});
*/