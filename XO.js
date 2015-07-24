"use strict";

var matrix = [];
var LINES=3;
var COLUMNS=3;

//creare matrice= un array cu 3 celule, fiecare continand un alt array de 3 celule
for(var i=0; i<LINES; i++) {
    matrix[i] = new Array(COLUMNS);
}

//creare array cu cele 3 cazuri pe celula unui array
var gol = 0;
var zero = 1;
var x = 2;


//fct care returneaza 1 daca exista un castigator(s-a facut o linie), 0 daca nu
function win()
{

  var w=0;

  for(var i=0;i<LINES;i++)
  {
    if( (matrix[i][0]===matrix[i][1]) && (matrix[i][0]===matrix[i][2]) && ( (matrix[i][0]===x) || (matrix[i][0]===zero) ) )w=1;
  }

  for(var j=0;j<COLUMNS;j++)
  {
    if( (matrix[0][j]===matrix[1][j]) && (matrix[0][j]===matrix[2][j]) && ( (matrix[0][j]===x) || (matrix[0][j]===zero) ) ) w=1;
  }

  if( (matrix[0][0]===matrix[1][1]) && (matrix[0][0]===matrix[2][2]) && ((matrix[0][0]===x) || (matrix[0][0]===zero) ) ) w=1;

  if( (matrix[0][2]===matrix[1][1]) && (matrix[0][2]===matrix[2][0]) && ((matrix[0][2]===x) || (matrix[0][2]===zero) ) )w=1;

  return w;

}


var p1;

for(var i=0;i<LINES;i++)
   for(var j=0;j<COLUMNS;j++)matrix[i][j]=gol;


function afisaretab()
{

  $('#tabel').empty();

  for(var i=0;i<LINES;i++)
  {
    $('#tabel').append('<tr class="tab'+i+'"></tr>');
    for(var j=0;j<COLUMNS;j++)
    {
      $('#tabel .tab'+i).append('<td class="tab" data-i="'+i+'" data-j="'+j+'" align="center"><img src="'+matrix[i][j]+'.png" width="80" height="80"></td>');

    }

  //       $('#tabel').append('<tr> <td class="tab" data-n="'+(i*3+1)+'" align="center"><img src="'+matrix[0][0]+'.png" width="80" height="80"></td> <td class="tab" align="center"><img src="'+matrix[0][1]+'.png" width="80" height="80"></td> <td class="tab" align="center"><img src="'+matrix[0][2]+'.png" width="80" height="80"></td></tr>');
        //  $('#tabel').append('<tr> <td class="4" align="center"><img src="'+matrix[1][0]+'.png" width="80" height="80"></td> <td class="5" align="center"><img src="'+matrix[1][1]+'.png" width="80" height="80"></td> <td class="6" align="center"><img src="'+matrix[1][2]+'.png" width="80" height="80"></td></tr>');
        //  $('#tabel').append('<tr> <td class="7" align="center"><img src="'+matrix[2][0]+'.png" width="80" height="80"></td> <td class="8" align="center"><img src="'+matrix[2][1]+'.png" width="80" height="80"></td> <td class="9" align="center"><img src="'+matrix[2][2]+'.png" width="80" height="80"></td></tr>');
  }
  //matrix[i][j] se schimba in fct de click uri

  var w=win();
         if(w===1) {
           if(p1===1)alert("Player 1 is the winner!");
           else if(p1===0) alert("Player 2 is the winner!");
           location.reload();
         }

var cnt=0;
for(var i=0;i<3;i++)
{
     for(var j=0;j<3;j++)
              if((matrix[i][j]===x)||(matrix[i][j]===zero))cnt++;
      }
if(cnt==9)alert("There is no winner!");

         console.log(w);

  $(".tab").click(function(){
    var i=$(this).data('i');
    var j=$(this).data('j');


    if(matrix[i][j]===gol && p1===1)matrix[i][j]=x;
           else matrix[i][j]=zero;


           afisaretab();
    //daca s-a adaugat x = player 1-> show player 2
      if(matrix[i][j]===x){
           $('#p1').hide();
           $('#p3').hide();
           $('#p2').show();p1=0;}//player 1 inactiv
     //altfel s-a adaugat 0= player 2 -> show player 1
      else{
         $('#p2').hide();
         $('#p3').hide();
         $('#p1').show();p1=1;//player 1 activ

    }

  });



      //   $( ".1" ).click(function(){
      //
      //        if(matrix[0][0]===gol && p1===1)matrix[0][0]=x;
      //        else matrix[0][0]=zero;
      //
      //
      //        afisaretab();
      // //daca s-a adaugat x = player 1-> show player 2
      //   if(matrix[0][0]===x){
      //        $('#p1').hide();
      //        $('#p3').hide();
      //        $('#p2').show();p1=0;}//player 1 inactiv
      //  //altfel s-a adaugat 0= player 2 -> show player 1
      //   else{
      //     $('#p2').hide();
      //     $('#p3').hide();
      //     $('#p1').show();p1=1;//player 1 activ
      //
      // }
      //
      //   });
      //
      //
      //   $( ".2" ).click(function(){
      //
      //       if(matrix[0][1]===gol && p1===1)matrix[0][1]=x;
      //       else matrix[0][1]=zero;
      //
      //
      //       afisaretab();
      //
      //         //daca s-a adaugat x = player 1-> show player 2
      //           if(matrix[0][1]===x){
      //                $('#p1').hide();
      //                $('#p3').hide();
      //                $('#p2').show();p1=0;}//player 1 inactiv
      //          //altfel s-a adaugat 0= player 2 -> show player 1
      //           else{
      //             $('#p2').hide();
      //             $('#p3').hide();
      //             $('#p1').show();p1=1;//player 1 activ
      //
      //           }
      //
      //           });
      //
      //
      //   $( ".3" ).click(function(){
      //
      //   if(matrix[0][2]===gol && p1===1)matrix[0][2]=x;
      //     else matrix[0][2]=zero;
      //
      //
      //     afisaretab();
      //
      //           //daca s-a adaugat x = player 1-> show player 2
      //             if(matrix[0][2]===x){
      //                  $('#p1').hide();
      //                  $('#p3').hide();
      //                  $('#p2').show();p1=0;}//player 1 inactiv
      //            //altfel s-a adaugat 0= player 2 -> show player 1
      //             else{
      //               $('#p2').hide();
      //               $('#p3').hide();
      //               $('#p1').show();p1=1;//player 1 activ
      //
      //             }
      //             win();
      //             afisaretab();
      //
      //       });
      //
      //
      // $( ".4" ).click(function(){
      //
      //    if(matrix[1][0]===gol && p1===1)matrix[1][0]=x;
      //           else matrix[1][0]=zero;
      //
      //
      //           afisaretab();
      //           //daca s-a adaugat x = player 1-> show player 2
      //             if(matrix[1][0]===x){
      //                  $('#p1').hide();
      //                  $('#p3').hide();
      //                  $('#p2').show();p1=0;}//player 1 inactiv
      //            //altfel s-a adaugat 0= player 2 -> show player 1
      //             else{
      //               $('#p2').hide();
      //               $('#p3').hide();
      //               $('#p1').show();p1=1;//player 1 activ
      //
      //           }
      //
      //
      //               });
      //
      //               $( ".5" ).click(function(){
      //
      //                  if(matrix[1][1]===gol && p1===1)matrix[1][1]=x;
      //                         else matrix[1][1]=zero;
      //
      //
      //                         afisaretab();
      //                         //daca s-a adaugat x = player 1-> show player 2
      //                           if(matrix[1][1]===x){
      //                                $('#p1').hide();
      //                                $('#p3').hide();
      //                                $('#p2').show();p1=0;}//player 1 inactiv
      //                          //altfel s-a adaugat 0= player 2 -> show player 1
      //                           else{
      //                             $('#p2').hide();
      //                             $('#p3').hide();
      //                             $('#p1').show();p1=1;//player 1 activ
      //
      //                           }
      //
      //
      //                             });
      //         $( ".6" ).click(function(){
      //
      //                      if(matrix[1][2]===gol && p1===1)matrix[1][2]=x;
      //                      else matrix[1][2]=zero;
      //
      //
      //                      afisaretab();
      //
      //                     //daca s-a adaugat x = player 1-> show player 2
      //                     if(matrix[1][2]===x){
      //                             $('#p1').hide();
      //                             $('#p3').hide();
      //                             $('#p2').show();p1=0;}//player 1 inactiv
      //                            //altfel s-a adaugat 0= player 2 -> show player 1
      //                             else{
      //                               $('#p2').hide();
      //                               $('#p3').hide();
      //                               $('#p1').show();p1=1;//player 1 activ
      //
      //                             }
      //
      //                             });
      //             $( ".7" ).click(function(){
      //
      //                             if(matrix[2][0]===gol && p1===1)matrix[2][0]=x;
      //                             else matrix[2][0]=zero;
      //
      //
      //                             afisaretab();
      //
      //                           //daca s-a adaugat x = player 1-> show player 2
      //                           if(matrix[2][0]===x){
      //                                         $('#p1').hide();
      //                                         $('#p3').hide();
      //                                         $('#p2').show();p1=0;}//player 1 inactiv
      //                         //altfel s-a adaugat 0= player 2 -> show player 1
      //                           else{
      //                                         $('#p2').hide();
      //                                         $('#p3').hide();
      //                                         $('#p1').show();p1=1;//player 1 activ
      //
      //                                                 }
      //
      //
      //                                                 });
      //
      //                 $( ".8" ).click(function(){
      //                      if(matrix[2][1]===gol && p1===1)matrix[2][1]=x;
      //                      else matrix[2][1]=zero;
      //
      //
      //                      afisaretab();
      //
      //
      //                           //daca s-a adaugat x = player 1-> show player 2
      //                               if(matrix[2][1]===x){
      //                                           $('#p1').hide();
      //                                           $('#p3').hide();
      //                                           $('#p2').show();p1=0;}//player 1 inactiv
      //                           //altfel s-a adaugat 0= player 2 -> show player 1
      //                               else{
      //                                          $('#p2').hide();
      //                                          $('#p3').hide();
      //                                          $('#p1').show();p1=1;//player 1 activ
      //
      //                                                           }
      //
      //                                           });
      //
      //                 $( ".9" ).click(function(){
      //                    if(matrix[2][2]===gol && p1===1)matrix[2][2]=x;
      //                    else matrix[2][2]=zero;
      //
      //
      //                    afisaretab();
      //
      //                   //daca s-a adaugat x = player 1-> show player 2
      //                     if(matrix[2][2]===x){
      //                                       $('#p1').hide();
      //                                       $('#p3').hide();
      //                                       $('#p2').show();p1=0;}//player 1 inactiv
      //                  //altfel s-a adaugat 0= player 2 -> show player 1
      //                    else{
      //                                       $('#p2').hide();
      //                                      $('#p3').hide();
      //                                      $('#p1').show();p1=1;//player 1 activ
      //
      //                                 }
      //
      //                                                                     });
      //


}


$( document ).ready(function() {

  $('#p2').hide();;
  $('#p3').hide();
  $('#p1').show();//Player 1 activ-> primul-> joaca cu x

p1=1;

afisaretab();


});
