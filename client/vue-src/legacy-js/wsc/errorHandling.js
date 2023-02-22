/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

window.errorMessages = [];
window.socket = io();

window.displayError=function(message){
  console.warn('Traced Error: '+message);
  console.error('Traced Error: '+message);
}

window.processError=function(message){
  errorMessages.push(message);
  reloadErrorMessages();
}

console.error = (message) => {
  processError(message);
}
window.onerror = function(e, url, line) {
  processError(`${e} (${url}:${line})`);
};

window.clearErrorMessages=function() {
  errorMessages = [];
}

window.reloadErrorMessages=function(){
    if(errorMessages.length > 0) {
        let errorHTML = '<p class="subtitle is-marginless has-text-weight-bold">Errors</p>';
        for(let errMsg of errorMessages){
            errorHTML += '<p class="has-txt-value-number">'+errMsg+'</p>';
        }
        $('#errorMessage').html(errorHTML);
        $('#errorDisplay').removeClass('is-hidden');
    } else {
        $('#errorMessage').html('');
        $('#errorDisplay').addClass('is-hidden');
    }
}

socket.on("returnErrorMessage", function(message){
  displayError(message);
});