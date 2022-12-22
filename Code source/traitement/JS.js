// FUNCTION 1 ;
function allVariables(expr) {
  var listDesChars = expr.split("");
  var VarsInExp = [];
  for (var i in listDesChars) {
    if (isLetter(listDesChars[i]) && !VarsInExp.includes(listDesChars[i])) {
      VarsInExp.push(listDesChars[i]);
    }
  }
  return VarsInExp;
} // END OF FUNCTION 1 .
// *************************************************
// FUNCTION 2 :
function isLetter(c) {
  if (c == "+") return false;
  if (c != "'") return true;
  return c.toLowerCase() != c.toUpperCase();
} // END OF FUNCTION 2 ;

//***************************************** */
function setup() {
  var myCanvas = createCanvas(4000, 12200);
  //myCanvas.parent("myDiagramDiv")
  // max area is =67105500 px moraba3.
  // 4000, 12000
  // max (5500*12201).
}
//******************************* */
var allVArs = [];
//   var expression =
// "a'b+f+a'bc'+abcd+abcde+abcdef+a'b'cdefg+f'+abcdefghi+abcdefghij+abcdefghijk+b'";
//   var expression = "a'b'c'd'eijklmn+abcdei+abcd+abcde+a'b'c'deil'+abcde'i'j'";
// var expression =
//   "a'b'efghi+abcfghjikl+abcdefghi+abcdefghikl+abcdeagcdefg+ab'cd'ef+abcdefg+abcdefgh+abcdefghi+abcdefghijk+abcdefghijkl+abcdefghijklm+abcdefghijklmn+abcdefghijklmno+abcdefghijklmnop+abcdefghijkl+abcdefghijkl+abcdefghijkl+abcdefghijkl+abcdefghijkl+abcdefghijkl+abcdefghijkl+abc";
// var expression =
//   "a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz+a'b'cdefghijklmnopqurstvwxyz+a'b'cdefg'hijk'lmn'op'qu'rs'tvwxyz";
//*   TODO : nrigle le cas si une seule lettres >than 0
// ?
// **
// todo : nrigle le cas d'une mintermes comme : abcdefghijklmnopqrstuvwxyz avec les choix (2,8,3)
// expression = "abcdefghijklmno+abcdefghijk+ab+ab+ab";
// expression = "a+abcdefghijklmnopqrstuvwxyz+a'bcd'ef'ghi'j'klmnop";
// var expression =
// "a+ab+abc+abcd+abcdef+abcdefg+abcdefgh+abcdefghi+abcdefghijk+abcdefghijkl+abcdefghijklm+abcdefghiklmn+abcdefghiklmno+abcdefghiklmnop+abcdefghiklmnopq+abcdefghiklmnopqr+abcdefghiklmnopqrs+abcdefghiklmnopqrst+abcdefghiklmnopqrstu+abcdefghiklmnopqrstuv+abcdefghiklmnopqrstuvw+abcdefghiklmnopqrstuvwx+abcdefghiklmnopqrstuvwy+abcdefghijklmnopqrstuvwyz+z+o+a+b+c+d+e+f";
// var expression =
// "abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+abcdefghijklmnopqrstuvwxyz+a'lmnopqrstuvwxyz";
// expression =
// "ab+abcdef+a'+cd'+ailk+z+a+s+w+e+r+abcdefghi+iljkynm+piou+qwer+xnmvc+akj+ae'c'f'ghi'+b'+abcde'f'h'i'jk'x'";
// var fh = generateComb(expression, [2]);
expression = localStorage.getItem("exp");
allVArs.push(allVariables(expression));
const allVarss = allVariables(expression);

var TempContientTouteVariables = allVArs[0].join("");
allVArs = TempContientTouteVariables;
var nbVars = allVArs.length;

var listeMintermes = [];
listeMintermes = expression.split("+");
var tota = listeMintermes.length;
tota;
var bnb = generateComb(listeMintermes[0], [2, 3, 8]);
bnb;
// draw();
function draw() {
  noLoop();
  expression = expression;
  var listeMintermes = [];
  listeMintermes = expression.split("+");
  background(256);
  fill(1);
  stroke(00);
  var choix = [2, 3, 4, 8];

  var W = width;
  var H = height;
  var strtx = 20,
    strty = 20;
  var finx = strtx;
  var tol;

  textFont("Helvetica");
  textStyle(BOLDITALIC);
  fill(0);
  noFill();
  textSize(20);
  text(expression, 0.75 * W, 0.95 * H);

  fill(0);
  // boucle pour dessiner les traits 3amoudiya ;
  for (var k = 0; k < nbVars; k++) {
    text(allVArs[k], strtx - 1, 15);
    line(strtx, strty, finx, height);
    strtx += 25;
    finx += 25;
  } // fin de drawing of 5tot lwa9fine,

  fill(255);
  noFill();

  stroke(250, 20, 200);
  stroke("black");
  // parti juste pour les variables qu'on l'est besoin.
  var cordsEachComb = [];
  var CordsforORGates = [];
  var GateSize;
  var splices = [];
  var eachMintCombi = [];
  var maxXcombin = 799;
  var startX, startY;
  var once = 0;
  var OldTol = 0;
  // var expression = "abc+abge+abefgh+ab+aefgh": thats it.
  // var expression = "abcdefghi+abge+abefgh+ab+aefgh"
  startY = 100;
  for (let index = 0; index < listeMintermes.length; index++) {
    // (main) du chaque mintermes
    var minterme = listeMintermes[index];

    if (minterme.length == 1 || (minterme.length == 2 && minterme[1] == "'")) {
      // // fin connection .
      stroke("black");
      // y += H / nbrAnds;
      startX = genX(minterme[0]);
      // todo : remove number of "/'" and that's it .

      line(startX, startY, 720, startY - 8);
      circle(startX, startY, 6);
      // todo : this is the last task i think .
      CordsforORGates.push([700, startY]);

      if (minterme.length == 2 && minterme[1] == "'") {
        var poz = 630;
        startY -= 8;
        fill("black");

        triangle(poz + 30, startY - 7, poz + 45, startY, poz + 30, startY + 7);

        circle(680, startY, 8);
        startY += 10;
      }
      startY += 35;
    } else {
      eachMintCombi = generateComb(minterme, choix);
      // todo : generate biggest
      splices = eachMintCombi[eachMintCombi.length - 1]; // contains what to draw at first couche .
      for (const key in splices) {
        var subterme = splices[key];

        // console.log(" key is equal to : " + typeOf(key));
        // OldTol = parseInt(key);
        // if (OldTol != 0) OldTol--;

        console.log(" la valeur du tolodl is = " + OldTol);
        var lDeltrs = subterme.split("");
        // startY = 200; // always ybdaw mn mya z3ma ;
        for (const ltr in lDeltrs) {
          // boucle pour chaque lettre.
          const lettre = lDeltrs[ltr];
          if (lettre != "'") {
            startX = genX(lettre);

            fill(0);

            // line(260, 230, 300, 300);

            circle(startX, startY, 6);
            if (subterme != lettre) {
              // todo note : the problem was herereeee !!!!!
              line(startX, startY, 720, startY);
            }

            startY += 10;
          }

          if (lDeltrs[parseInt(ltr) + 1] == "'") {
            startY -= 10;
            var poz = 630;
            triangle(
              poz + 30,
              startY - 7,
              poz + 45,
              startY,
              poz + 30,
              startY + 7
            );
            once = 1;
            circle(680, startY, 8);
            startY += 10;
          }
        }
        // now draw the and gate :
        if (
          subterme.length > 1 &&
          !(subterme.length == 2 && subterme[1] == "'")
        ) {
          subterme = allVariables(subterme).join("");
          stroke("white");
          square(
            700,
            startY - 10 * subterme.length - 5,
            10 * subterme.length,
            0,
            4 * subterme.length,
            4 * subterme.length,
            0
          );
          stroke("black");
          // TODO : problem is here !!!!!  !!!
          var toooll = splices[0].length;
          var clean = allVariables(splices[0]).join("");
          console.log(" splices0 " + clean);

          if (toooll > choix[choix.length - 1])
            toooll = choix[choix.length - 1];
          // if (too)
          // stroke("red")
          // if (toooll)
          line(
            700 + 0.5,
            startY - 5 * subterme.length - 5,
            700 + clean.length * 10 - 5,
            startY - 5 * subterme.length
          );
        } else {
          if (once == 0) {
            stroke("black");
            line(startX, startY - 10, 700 + clean.length * 10, startY - 6 + 1);
          }
        }
        startY += 10; // 5 is randomly.
        once = 0;
        tol = 10 * subterme.length;
        //* **************** */

        // here save all the coordinates of the ends of gates .

        var temp = [0];
        // temp[0] = 150 + 10 * subterme.length;
        temp[0] = 700 + 0;
        temp.push(startY - 5 * subterme.length - 5);
        cordsEachComb.push(temp);

        //**  ************** */
      } // end of the splices : official .

      if (eachMintCombi.length == 2) {
        // temp = [];
        // temp[0] = 500;
        cordsEachComb.pop();

        // temp.push(startY - 5 * subterme.length - 5);
        CordsforORGates.push(temp);
      }

      // now connect the rest of the combinaisons ??:
      var first;
      eachMintCombi;
      var xOfCombin = 900; // check this later. //  it begins from 350 and adds 200 each time.
      // x does not assembel a problem.
      // first = 1 ;
      for (let k = 1; k < eachMintCombi.length - 1; k++) {
        var combino = eachMintCombi[k]; // combino as example == 221 // 22 /
        //   cordsEachComb=cordsEachComb[0];

        for (var v = 0; v < combino.length; v++) {
          set = combino[v];
          // if (set == 1){
          //   stroke(0);

          //        stroke ("red");
          // }
          // set == 2 || 2 || 1 as example .
          cordsEachComb;
          var a = [];
          Ys = [];
          // a = generateListDesY(cordsEachComb, Ys, set);

          if (set <= cordsEachComb.length) {
            a = generateListDesY(cordsEachComb, Ys, set);
          } else {
            set = cordsEachComb.length;
            a = generateListDesY(cordsEachComb, Ys, set);
          }

          var Moy = generateMoyY(a);

          // la moyeen du square.

          for (var b = 0; b < set; b++) {
            // todo : check the editing of this line under this one .
            var jcp = splices[0];
            jcp = allVariables(jcp).join("");
            var axx, ayy;
            axx = cordsEachComb[b][0] - 12;
            // axx = 400
            // ayy = 600
            ayy = cordsEachComb[b][1] - 11;

            //  if ( first ){

            //  }

            if (set == 1) {
              // first =-1 ;
              // square(200,200 , 40)
              if (k == 1) {
                // todo : i commented this line li lteht and i do not know it's effect .
                // line(axx + jcp.length * 10 + 3, ayy + 6, xOfCombin + 20, Moy);
                // ? go back to this line affffterr .
                // stroke("red");
                line(axx, ayy + 6, axx + 90, ayy + 6);
                stroke("black");
                // if (k > 1) {
                //   first = 0;
                // }
              } else {
                // todo : there is a problem hre toooo .
                line(axx + set * 10 + 30, ayy + 6, xOfCombin + 20, Moy);
              }
            }

            if (k == 1) {
              line(axx + jcp.length * 10 + 3, ayy + 6, xOfCombin + 16, Moy - 5);
              if (k > 1) {
                first = 0;
              }
              // first =0;
            } else {
              line(axx + set * 10, ayy + 6, xOfCombin, Moy);
              Moy += 5;
            }
          }

          // first = 0 ;

          // likidi(splices)
          if (set != 1) {
            stroke("white");
            square(
              xOfCombin - 1,
              Moy - 7.5 * set,
              10 * set,
              0,
              5 * set,
              5 * set,
              0
            );
            console.log(" x of combine inside la boucle  = " + xOfCombin);
            var iNeed = xOfCombin;
            stroke("black");
          }
          temp = [];
          temp.push(xOfCombin);
          //  if( iNeed == xOfCombin){
          //    square(200,200,200)
          //  }

          console.log(" x of combine = " + temp);
          // temp[0] = xOfCombin - 20;
          console.log("temp0 " + temp[0]);
          temp.push(Moy);
          likidi(cordsEachComb, set);
          console.log(" cords each combin : ");
          console.log(cordsEachComb);
          if (cordsEachComb.length != 0) {
            cordsEachComb.push(temp);
          } else {
            CordsforORGates.push(temp);
          }
        }
        xOfCombin += 250;
        if (maxXcombin < xOfCombin) {
          maxXcombin = xOfCombin;
        }
        // first = 0 ;
      }

      startY += 25; // end of the mintermes for :
    }
  }
  // here we anded all the And gates : now we draw the OR gates .

  CordsforORGates;
  CordsforORGates;
  var listeVide = [];
  var ListDesYDeOr = [];
  ListDesYDeOr = generateListDesY(
    CordsforORGates,
    listeVide,
    CordsforORGates.length
  );
  var biggeset = ListDesYDeOr.sort()[ListDesYDeOr.length - 1];
  biggeset = maxXcombin;

  for (const key in CordsforORGates) {
    const element = CordsforORGates[key];

    line(element[0] + 15, element[1] - 8, biggeset + 38, element[1] - 4);

    CordsforORGates[key] = [biggeset, element[1]];
  }

  xOfCombin += 100;
  maxXcombin += 100;

  var GATEOr = generateMIntermeOr(listeMintermes.length);
  GATEOr;
  eachMintCombi = generateComb(GATEOr, choix);
  eachMintCombi;
  for (let k = 0; k < eachMintCombi.length - 1; k++) {
    var combino = eachMintCombi[k]; // combino as example == 221 // 22 /
    //   cordsEachComb=cordsEachComb[0];
    combino;
    // line(260, 230, 300, 300);
    for (var v = 0; v < combino.length; v++) {
      set = combino[v];

      // }
      // set == 2 || 2 || 1 as example .
      cordsEachComb;
      var a = [],
        Ys = [];
      // a = generateListDesY(cordsEachComb, Ys, set);

      if (set <= CordsforORGates.length) {
        a = generateListDesY(CordsforORGates, Ys, set);
      } else {
        set = CordsforORGates.length;
        a = generateListDesY(CordsforORGates, Ys, set);
      }

      a;
      // stoke("")
      var Moy = generateMoyY(a);
      Moy;
      // la moyeen su // line.

      for (var b = 0; b < set; b++) {
        var axx, ayy;
        axx = CordsforORGates[b][0] - 12;
        // axx = 400
        // ayy = 600
        ayy = CordsforORGates[b][1] - 11;

        if (set == 1) {
          line(CordsforORGates[b][0] + 20, ayy + 5, maxXcombin + 60, Moy + 5);
        }

        line(axx + 50, ayy + 7, maxXcombin, Moy);
        line(maxXcombin, Moy, maxXcombin + 5, Moy);

        Moy += 8;
      }
      if (set != 1) {
        // square(xOfCombin, Moy - 8 * set, 10 * set, 0, 5 * set, 5 * set, 0);
        drawOrGate(maxXcombin + 8, Moy - 8 * set, set);
        // line(xOfCombin, Moy - 8 * set, 10 * set, 0, 5 * set, 5 * set, 0);
      }
      temp = [];
      temp[0] = maxXcombin + 20;
      if (set == 8) {
        Moy -= 20;
      }
      temp.push(Moy);
      likidi(CordsforORGates, set);
      console.log(CordsforORGates[1]);

      if (CordsforORGates.length != 0) {
        CordsforORGates.push(temp);
      } else {
        // CordsforORGates.push(temp) ;
      }
    }
    maxXcombin += 250;
  }
} //  end of the draw() function .

//******************** */

testtt = generateMIntermeOr(53);
testtt;

function generateMIntermeOr(nbr) {
  nbr;
  var striiinggou = "";
  var alphabet =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789!@#$%^&_*<>?~.,;æÌíþýëüúçÔâÎćĉĭĸŏœŦťţŕŶŴŲżźŸ";
  console.log(alphabet.length);
  var i = 0;
  while (i < nbr) {
    striiinggou += alphabet[i];
    i++;
  }
  return striiinggou;
}
// drawOrGate(200, 200, 5);
/*** draw and gate function  */
// drawOrGate(1, 2, 3);
function drawOrGate(x, y, size) {
  if (size == 8) {
    y += 15;
    x += 5;
  }
  var x1, x2, y1, y2;
  y -= 20;
  x -= 12;
  stroke("blue");
  fill(255);
  noFill();
  // fill("blue")
  bezier(
    x,

    y,
    x + 80,

    y + 20,
    x + 80,

    y + 50,
    x,
    y + 70
  );

  bezier(
    x,

    y,
    x + 20,

    y + 20,
    x + 20,

    y + 50,
    x,
    y + 70
  );
  stroke("black");
}

//****************** */
function generateListDesY(lista, listb, nbr) {
  for (var i = 0; i < nbr; i++) {
    i;
    listb.push(lista[i][1]);
    var gh = lista[i][1];
  }
  listb;
  return listb;
}

// var ghghghg = generateListDesY(
//   [
//     [10, 66],
//     [20, 30],
//     [20, 30],
//   ],
//   [],
//   3
// );
// ghghghg = generateMoyY(ghghghg);
// ghghghg;

function generateMoyY(list) {
  var moyenne = 0;
  for (let index = 0; index < list.length; index++) {
    const y = list[index];
    moyenne += y;
  }

  return moyenne / list.length;
}

function likidi(element, nbr) {
  for (var i = 0; i < nbr; i++) {
    element.shift();
    element;
  }
}

var ghghghg = [1, 2, 3, 4, 5, 6, 7];
likidi(ghghghg, 4);

ghghghg;

function genX(lettre) {
  var indexLetre = allVArs.indexOf(lettre);
  var strtx = 20,
    strty = 20;
  var finx = strtx;
  // boucle pour dessiner les traits 3amoudiya ;
  for (var k = 0; k < indexLetre; k++) {
    // line(strtx, strty, finx, height-20);
    strtx += 25;
    finx += 25;
  }
  return strtx;
}

function genY() {
  //var indexLetre = allVArs.indexOf(lettre);
  var y = (height - nbrAnds * 60) / (2 * nbrAnds);
  //  tol= 10*nbVars  ;
  //console.log("height " + gateNbr);
  var g = 10;
  for (var i = 0; i < gateNbr - 1; i++) {
    stroke(0, 0, 0);

    y += height / nbrAnds;
  }

  return y;
}

function generateComb(minterme, ch) {
  var notCleanest = minterme;

  notCleanest.length;
  // all vars are here :
  console.log(minterme.length);
  var cleanest = allVariables(minterme).join("");
  console.log(cleanest);

  minterme = cleanest;

  var listComb = []; // list des comb en strings.
  var comb = "";
  var ch1 = ch.sort();
  var smallestgate = ch[0];
  ch = ch1.reverse();
  var length = minterme.length;
  var nextmint = minterme;
  var splices = [];
  var once = 1;
  ch;
  minterme;
  console.log(notCleanest);
  // (minterme.includes(".") ) ;

  // code starts from here :
  while (minterme.length > 1) {
    nextmint = "";

    for (var i = 0; i < ch.length; i++) {
      console.log(ch[i]);
      while (length >= ch[i]) {
        comb += ch[i];
        length -= ch[i];
        nextmint += "c";
      } // while loop
    } // for loop
    if (length == 1) {
      comb += "1";
      nextmint += "c";
    }

    if (comb == "" && once == 1) {
      comb += smallestgate;
      once = 0;
      splices.push(minterme);
    }

    listComb.push(comb);

    // genere les premiers splices :

    if (once == 1) {
      for (var v = 0; v < comb.length; v++) {
        var size = comb[v];
        size;

        // size+= notCleanest.length - cleanest.length ;
        size;

        // var splity = minterme.subsring(0 , size)
        splity = splitt(notCleanest, size);
        splices.push(splity[0]);
        notCleanest = splity[1];
      }
      once = 0;
    }

    comb = "";

    // second combinaison :
    minterme = nextmint;
    length = minterme.length;
  } // end of while loop .
  listComb.push(splices);
  splices;
  ch = ch1.reverse();
  ch;
  return listComb;
}

// if (minterme.length< smallestgate)

function splitt(str, index) {
  var result;
  var khra = index;

  //         console.log(str)
  var sansApostroph;
  do {
    result = [str.slice(0, index), str.slice(index)];
    sansApostroph = allVariables(result[0]).join("");

    index++;
  } while (sansApostroph.length < khra);

  if (result[1][0] == "'") {
    result = [str.slice(0, index), str.slice(index)];
  }
  return result;
}

var cordsEachComb = [
  [200, 200],
  [200, 300],
];

var ghghghg = generateComb("abcdeff", [2, 3]);
