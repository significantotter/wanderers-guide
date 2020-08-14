/* Copyright (C) 2020, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

function processAddText(code, locationID){
  if(code == null || locationID == null) {return;}

  let allStatements = code.split(/\n/);
  for(let statementRaw of allStatements){
    if(statementRaw.includes("ADD-TEXT")){ // ADD-TEXT=Anything, will be parsed like a description field

      // Test/Check Statement for Expressions //
      let statement = testExpr(statementRaw);
      if(statement === null) {continue;}
      if(!statement.includes("ADD-TEXT")){continue;}
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

      let text = statement.split('=')[1];
      let centerStyle = '';
      $('#'+locationID).append('<div class="py-1 '+centerStyle+'">'+processText(text, false, true, 'MEDIUM')+'</div>');

    }
  }

}