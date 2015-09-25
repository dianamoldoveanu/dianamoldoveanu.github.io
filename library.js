"use strict";

var bookDB = [];

function newBook (_titlu, _autor,_editura, _nrpag, _imprumutata,_imagine,_modifica,_sterge)
{
  if(searchBook(_titlu)===null)
  {
    var book=
    { titlu:_titlu,
      autor: _autor,
      editura:_editura,
      nrpag:_nrpag,
      imprumutata:_imprumutata,
      imagine:_imagine,
      modifica:_modifica,
      sterge:_sterge  
      };
  bookDB.push(book);
  return true;
  }
else
    return false;
}

function searchBook (titlu)
{
  for(var i=0;i<bookDB.length;i++)
  {
    if(titlu===bookDB[i].titlu)
      return bookDB[i];
  }
  return null;
}

function deleteBook (titlu)
{
  for(var i=0;i<bookDB.length;i++)
    if(titlu===bookDB[i].titlu)
    {
      bookDB.splice(i,1);
      return true;
      }
return false;
}

function sortBook(bookDB){
   var ord;
   do{ord=false;
     for(i=1;i<bookDB.length-1;i++)
          if(bookDB[i].nrpag>bookDB[i+1].nrpag){
                  var auxbook=bookDB[i+1];
                  bookDB[i+1]=bookDB[i];
                  bookDB[i]=auxbook;
                  ord=true;}
    }while(ord);}
