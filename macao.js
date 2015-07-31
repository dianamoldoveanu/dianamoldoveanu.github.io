"use strict";

var array= [];
var players=2; //2 players

//creare matrice = un array cu celule=playeri,(maxim 6) fiecare continand un alt array de 5 celule= nr de carti

for(var i=0; i<players; i++) {
  array[i] = new Array();
}

var desk=[];//array cu cartile de pe masa

var cards=[];//array cu setul initial de carti=54 celule, din care se impart 5 pt fiecare player si una pt desk(pe masa)

function amestec(array){

  var index;
  var aux;
  var counter=array.length;

  while (counter>0) //cat timp mai sunt elem in array
    {
      index=Math.floor(Math.random() * counter);//alege un index intre 0 si cards.length
      counter--;
      //interschimba cele 2 elem
      aux=array[counter];
      array[counter]= array[index] ;
      array[index]=aux;
    }
 return array;
}

//atribute carte= nr + semn
var nr=2; //nr merge de la 2 la 14 = nr de pe carti
var semn=['clubs','diamonds','hearts','spades']
var s=0;//trece prin elementele semn
var verifica=0;
var gamer;//arata indexul playerului
var cnt;//contorizeaza cate carti de 2/3 vor fi luate de playerul final
var cont=1, ace, val, sign, takecards, ok;

//for care atribuie nr+semn fiecarei carti
for(var i=0;i<52;i++)
    {
      cards[i]={nr:nr, semn:semn[s]};
      console.log(nr+' '+s+' '+cards[i].semn);//afiseaza fiecare nr, s si valoarea semn din cards
      if(s<3)s++;
      else s=0;

      if(nr<14)nr++;
      else nr=2;
    }

//cards[52]='joker.black';
//cards[53]='joker.red';


amestec(cards);


//imparte 5 carti fiecarui player

for(var i=0; i<players; i++)
{
  for(var j=0;j<5;j++)
  {
    var card=cards.pop();
    array[i].push(card);

  }
}

//o carte e pusa pe masa
desk[0]=cards.pop();


function changeplayer()
{
 gamer++;

 if(gamer<=players)
     {
         $('p').remove();
         $('#line').after('<p>Player '+gamer+' is active...</p>');
       }
 else
         {
      gamer=1;
      $('p').remove();
      $('#line').after('<p>Player '+gamer+' is active...</p>');
         }
}


function afisaretabs()
{


  $('#tabel').empty();

  var i=0;
  while(i<players)
    {
      $('#tabel').append('<tr class="tab'+i+'"><td><div id="text'+i+'" style="width: 130px;"> Player '+(i+1)+':</div><button class="btn btn-default" id="but'+i+'" style="display:none;">Skip turn</button></td></tr>');
      for(var j=0;j<array[i].length;j++)
      {
        $('#tabel .tab'+i).append('<td class="tab" data-i="'+i+'" data-j="'+j+'" align="center"><img src="'+array[i][j].nr+'.'+array[i][j].semn+'.png" width="100" height="140"></td>');

      }
     i++;
     }

  $('#line').empty();
  $('#line').append('<img class="desk" src="'+desk[desk.length-1].nr+'.'+desk[desk.length-1].semn+'.png" width="100" height="140"><img class="cards" src="deck-cards1.jpg" width="200" height="180">');



//de fiecare data cand se da click pe cards->pop cards->push player actual->afisaretabs->trecere la urm player
$('.cards').off();

$('.cards').click(function()
{

  //daca mai sunt carti in cards muta o carte in array
  if(cards.length!=0) array[gamer-1].push(cards.pop());
  //daca nu -> cartile din desk (fara ultima) sunt mutate in cards pt a se continua jocul,
  else {
    alert("There are no more cards to take.They will be replaced with the cards on the table!");
    var aux=desk[desk.length-1];//se retine ultima carte
    for(var i=0;i<desk.length-1;i++)
      {
        cards[i]=desk[i];
      }
    desk=[];//desk devine un array gol
    desk[0]=aux;
       }

//verifica daca este ultimul player, daca da trece la primul, daca nu trece la urmatorul si afiseaza playerul actual

changeplayer();

afisaretabs();

});

$('#text'+(gamer-1)).css({"color":"#E60000","font-weight": "bold"});

//de fiecare data cand se da click pe o carte
$('.tab').click(function()
{

   var i=$(this).data('i');
   var j=$(this).data('j');


   //verifica daca playerul actual nu mai are carti->a castigat
   if(array[gamer-1].length===0)
     {
       alert('Player '+gamer+' is the winner!');
       location.reload();
     }

if(ace===1)
  {
    if(array[i][j].semn===sign)val= sign;
  }
else val=desk[desk.length-1].semn;

if(i===gamer-1)
{
 if (cont===0)
     {
       if(array[i][j].nr!==4)
         {
           if(confirm("Please put a 4 card on the table or skip turn!")===true)
               {
                   $('#but'+(gamer-1)).show();
                   $('button').click(function()
                       {
                           changeplayer();
                           cont=1;
                           afisaretabs();
                       });
               }
          }
       else if(array[i][j].nr===4)
           {
             cont=1;
             afisaretabs();
           }
     }

 // verifica daca cartea pe care se da click e Ace ->prompt, se ia semnul si se schimba in desk
 else if (array[i][j].nr===11)
     {
      sign=prompt("In which sign do you prefer to change the card?");
      if(sign!==null)
         {
            desk.push(array[i][j]);
            array[i].splice(j,1);
            ace=1;//verifica daca s-a gasit un as

            changeplayer();
            afisaretabs();
         }
     }

  //verifica daca cartea pe care s-a dat click e de acelasi nr sau semn cu cartea de pe masa=ultima carte din desk-> push carte in desk, splice carte din array+afisaretabs
 else  if( (array[i][j].nr===desk[desk.length-1].nr || array[i][j].semn===val ) || (verifica===1))
    {
      ace=0;

      if((array[i][j].nr===2)||(array[i][j].nr===3))
         {
          //verifica daca urm player are 2/3, daca da trecem la urmatorul->mutam carti, pana cand unul din playeri nu mai are -> mutam cartea din array in desk + luam din desk atatea carti cat au dat ambii playeri si il dam celui din urma
          ok=0;
          takecards=0;
          cnt= cnt+ array[i][j].nr;
          if(i===players-1)var v=0;
          else var v=i+1;  //v parcurge urmatorul player si verifica daca exista carti de 2 sau 3
          for(var k=0;k<array[v].length;k++)
              {
                if(array[v][k].nr===2||array[v][k].nr===3)ok=1;
                }
          if(ok===1)
             {

               if (confirm('The next player should put a 2 or 3 card on the table, if cancel he will take the cards!')===true) takecards=0;
               else takecards=1;

                changeplayer();

                if(takecards===1)
                  {
                     ok=0;
                   }

                else
                  {
                    desk.push(array[i][j]);
                    array[i].splice(j,1);
                    i++;//daca player-ul nu vrea sa ia carti=apasa ok->se trece la urm player din array
                    verifica=1;//daca verifica = 1 <=> se continua cautarea pt carti de 2/3 ->intra in if fara sa fie de aceleasi semn sau nr cartile, ci doar de 2 sau 3
                    afisaretabs();
                  }
              }

          //altfel dam playerului urmator cate carti au dat playerii di-nainte cu cnt
          if(ok===0)
              {
                     alert("The next player will take "+cnt+" cards!");
                     desk.push(array[i][j]);
                     array[i].splice(j,1);
                     for(var m=0;m<cnt;m++)
                       {
                         array[v].push(cards.pop());
                       }
                    changeplayer();
                    cnt=0;//cnt 0 pt a nu se memora valorile anterioare data viitoare cand se da o carte de 2 sau 3
                    verifica=0;
                    afisaretabs();
               }
           }

    //altfel verifica daca cartea pe care se da click e 4 -> se activeaza skip turn pt urm player= trece la urm jucator->mutare carte in desk + afisare tab
    else if (array[i][j].nr===4&&cont===1)
      {

        desk.push(array[i][j]);
        array[i].splice(j,1);
         cont=0;
         changeplayer();
         $('#but'+i).hide();
         if (gamer===1)
            {
               $('#but'+0).show();
               $('#text'+i).css({"color":"black","font-weight": "normal"});
               $('#text'+0).css({"color":"#E60000","font-weight": "bold"});
               alert('Player '+gamer+' can choose to skip his turn or to put a 4 card on the table!');
            }
         else
            {
               $('#but'+(gamer-1)).show();
               $('#text'+i).css({"color":"black","font-weight": "normal"});
               $('#text'+(gamer-1)).css({"color":"#E60000","font-weight": "bold"});
               alert('Player '+gamer+' can choose to skip his turn or to put a 4 card on the table!');
            }



        $('button').click(function()
            {
              changeplayer();
              cont=1;
              afisaretabs();

            });

        }

  else
    {
        desk.push(array[i][j]);
        array[i].splice(j,1);
        changeplayer();
        afisaretabs();
     }
  }


else {
      if(cont!=0)alert("The card you have chosen is not valid.Try again!");
      afisaretabs();
     }
   }

else
   {
      alert('Please click for the right player!');
      afisaretabs();
    }
});
  }


$( document ).ready(function()
{
  alert("You're ready to start macao game!");
  gamer=1;
  cnt=0;

  afisaretabs();

});
