/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

window.openConditionQuickview=function(data) {
    addBackFunctionality(data);

    $('#quickViewTitle').html('Condition - '+capitalizeWords(data.Condition.name));
    let qContent = $('#quickViewContent');

    qContent.append(processText(data.Condition.description, true, true, 'MEDIUM', false));

}