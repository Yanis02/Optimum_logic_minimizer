//Cette partie du code concerne l'implémentation des algorithmes du simplifications ainsi que la réalisation de la trace
//Pour pouvoire lire la description de chaque fonction veuillez ouvrire la fonction et lire les commentaires , Merci pour votre compréhension!

var tPremier = []; //Tableau globale pour enregistrer la 2eme etape de la trace
var tGroupe = []; //Tableau globale pour enregistrer la 1ere etape de la trace
//Fonctions nécéssaires pour l'implémentation de l'algorithme de Petrick et la préparation des mintermes dans le cas littérale
function prec(c) {
  if (c == "*") return 3;
  else if (c == ".") return 2;
  else if (c == "+") return 1;
  else return -1;
}
function infixToPostfix(s) {
  let st = []; //For stack operations, we are using C++ built in stack
  let result = "";

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    // If the scanned character is
    // an operand, add it to output string.
    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
      result += c;
      if (i + 1 < s.length && s[i + 1] == "'") {
        result += "'";
        i++;
      }
    }
    // If the scanned character is an
    // (, push it to the stack.
    else if (c == "(") st.push("(");
    // If the scanned character is an ‘)’,
    // pop and to output string from the stack
    // until an ‘(‘ is encountered.
    else if (c == ")") {
      while (st[st.length - 1] != "(") {
        result += st[st.length - 1];
        st.pop();
      }
      st.pop();
    }
    //If an operator is scanned
    else {
      while (st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
        result += st[st.length - 1];
        st.pop();
      }
      st.push(c);
    }
  }
  // Pop all the remaining elements from the stack
  while (st.length != 0) {
    result += st[st.length - 1];
    st.pop();
  }
  return result;
}
function OR(ch1, ch2) {
  //Effectuer le OU logique entre 2 opérendes
  return ch1 + "+" + ch2;
}
function AND(ch1, ch2) {
  //Effectuer le AND logique entre 2 opérendes
  let tab1 = [];
  let tab2 = [];
  let Expression = "";
  let minterm = "";
  for (let i = 0; i < ch1.length; i++) {
    if (ch1[i] != "+") {
      minterm = minterm + ch1[i];
    } else {
      tab1.push(minterm);
      minterm = "";
    }
  }
  tab1.push(minterm);
  minterm = "";
  for (let i = 0; i < ch2.length; i++) {
    if (ch2[i] != "+") {
      minterm = minterm + ch2[i];
    } else {
      tab2.push(minterm);
      minterm = "";
    }
  }
  tab2.push(minterm);
  for (let i = 0; i < tab1.length; i++) {
    for (let j = 0; j < tab2.length; j++) {
      Expression = Expression + tab1[i] + "." + tab2[j];
      if (!(i + 1 >= tab1.length && j + 1 >= tab2.length)) Expression += "+";
    }
  }
  return Expression;
}

function HASH(ch1) {
  //Enlever les redendants dans les minterms  ex: A.B.C.D.A-->A.B.C.D
  tab1 = [];
  tab1.length = 26;
  let result = "";
  for (let i = 0; i < ch1.length; i++) {
    if (isOperand(ch1[i])) {
      let indice = ch1[i].charCodeAt() - "A".charCodeAt();
      if (tab1[indice] == 1) {
        if (i + 1 < ch1.length && ch1[i + 1] == "'") return "";
      }
      if (tab1[indice] == -1) {
        if ((i + 1 < ch1.length && ch1[i + 1] != "'") || i + 1 >= ch1.length)
          return "";
      }
      tab1[indice] = 1;
      if (i + 1 < ch1.length && ch1[i + 1] == "'") tab1[indice] = -1;
    }
  }
  for (let i = 0; i < tab1.length; i++) {
    if (tab1[i] == 1 || tab1[i] == -1) {
      result += String.fromCharCode("A".charCodeAt() + i);
      if (tab1[i] == -1) result += "'";
      result += ".";
    }
  }
  return result.slice(0, result.length - 1);
}
function isOperand(x) {
  //Voir si x est une opérande
  return (x >= "a" && x <= "z") || (x >= "A" && x <= "Z");
}
function OPERATION(operand1, operand2, ch) {
  //Effectuer une opération Or ou AND
  if (ch == "+") {
    return OR(operand1, operand2);
  }
  if (ch == ".") {
    return AND(operand1, operand2);
  }
}
function getInfix(exp) {
  let s = [];

  for (let i = 0; i < exp.length; i++) {
    // Push operands
    if (isOperand(exp[i])) {
      let ch = "";
      ch = exp[i];
      if (i + 1 < exp.length) {
        if (exp[i + 1] == "'") {
          ch += "'";
          i++;
        }
      }
      s.push(ch);
    }
    // We assume that input is
    // a valid postfix and expect
    // an operator.
    else {
      let op1;
      op1 = s.pop();
      if (exp[i] != "*") {
        let op2 = s.pop();
        s.push(OPERATION(op2, op1, exp[i]));
      } else s.push(Not(op1));
    }
  }
  // There must be a single element
  // in stack now which is the required
  // infix.
  return s[s.length - 1];
}
function Not(expression) {
  //Effectuer la négation d'une expression logique
  let ch = "(";
  for (let i = 0; i < expression.length; i++) {
    if (isOperand(expression[i])) {
      ch += expression[i];
      if (i + 1 < expression.length) {
        if (expression[i + 1] != "'") {
          ch += "'";
        }
      } else ch += "'";
    } else {
      if (expression[i] == "+") ch += ")" + "." + "(";
      else if (expression[i] == ".") ch += "+";
    }
  }
  ch += ")";
  ch = infixToPostfix(ch);
  ch = getInfix(ch);
  return ch;
}
function Disjonctive(expression) {
  //Mettre une expression logique sous la forme disjonctive
  let expr = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] == ")") {
      expr += expression[i];
      if (i + 1 < expression.length && expression[i + 1] == "'") {
        expr += "*";
        i++;
      }
    } else expr += expression[i];
  }
  expr = infixToPostfix(expr);
  expr = getInfix(expr);
  return expr;
}
function splitt(exp) {
  let tab = [];
  let conc = "";
  for (let i = 0; i < exp.length; i++) {
    let element = exp[i];
    conc += element;
    if (element === "+") {
      conc = conc.slice(0, -1);
      tab.push(conc);
      conc = "";
    }
  }
  tab.push(conc);
  return tab;
}
function hashExpression(tab) {
  let tab2 = [];
  let a;
  for (let i = 0; i < tab.length; i++) {
    a = HASH(tab[i]);
    if (a !== "") {
      tab2.push(HASH(tab[i]));
    }
  }
  return tab2;
}
function theHash(exp) {
  let tab = splitt(exp);
  tab = hashExpression(tab);
  let text = tab.join("+");
  return text;
}
function disjonctiveTransform(exp) {
  exp = Disjonctive(exp);
  let expr = theHash(exp);
  expr = expr.split(".");
  expr = expr.join("");
  return expr;
}
function finalshow_lit(result, variables) {
  //Fonction pour afficher la fonction finale pour le cas littérale
  //Afficher la derniére fonction simplifiée
  if (result == null || result.length == 0) return "";
  str = "";
  for (let i = 0; i < result.Minterm2.length; i++) {
    let ch = result.Minterm2[i];
    for (let j = 0; j < variables.length; j++) {
      if (ch[j] == "1") {
        str = str + variables[j];
      }
      if (ch[j] == "0") {
        str = str + variables[j] + "'";
      }
    }
    str = str + " +";
  }
  str = str.slice(0, str.length - 1);

  return str;
}
function primeshow_lit(result, variables) {
  //Fonction pour afficher la fonction finale pour le cas littérale
  //Afficher la derniére fonction simplifiée
  if (result == null || result.length == 0) return "";
  str = "";
  for (let i = 0; i < result.Minterm2.length; i++) {
    let ch = result.Minterm2[i];
    for (let j = 0; j < ch.length; j++) {
      if (ch[j] == "1") {
        str = str + variables[j];
      }
      if (ch[j] == "0") {
        str = str + variables[j] + "'";
      }
    }
    str = str + " ,";
  }
  str = str.slice(0, str.length - 1);

  return str;
}
function variables(str) {
  //Fonction qui récupère toutes les variables qui apparaissent dans une expression logique
  let variables = [];

  for (let i = 0; i < str.length; i++) {
    if ((str[i] >= "A" && str[i] <= "Z") || (str[i] >= "a" && str[i] <= "z")) {
      if (!variables.includes(str[i])) {
        variables.push(str[i]);
      }
    }
  }
  variables.sort();
  return variables;
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}
function allVariables(expression) {
  var listDesChars = expression.split("");
  var VarsInExp = [];
  for (var i in listDesChars) {
    if (isLetter(listDesChars[i]) && !VarsInExp.includes(listDesChars[i])) {
      VarsInExp.push(listDesChars[i]);
    }
  }
  return VarsInExp;
}
function main(expression) {
  function comparaison(binOriginal, indices, generatedBin) {
    var listeDesIndices = indices;
    listeDesIndices;
    var rien = 0;
    for (var k = 0; k < listeDesIndices.length; k++) {
      listeDesIndices;
      rien = binOriginal[Number(listeDesIndices[k])];
      rien = generatedBin[Number(listeDesIndices[k])];
      rien;

      if (
        binOriginal[Number(listeDesIndices[k])] !=
        generatedBin[Number(listeDesIndices[k])]
      ) {
        return false;
      } else {
      }
    }
    return true;
  }

  function generateBinaire(minterme) {
    //minterme = "a'bc'de'";
    var listeMinterme = [];

    var BinaryMintermeEnArray = new Array(NumberOfVars);
    BinaryMintermeEnArray;

    for (var g = 0; g < BinaryMintermeEnArray.length; g++) {
      BinaryMintermeEnArray[g] = "0";
    }

    var BinaryMinterme;
    BinaryMintermeEnArray;
    listeMinterme = minterme.split("");
    listeMinterme;
    var index = 0;
    var sortedARR;

    for (var g = 0; g < listeMinterme.length; g++) {
      if (listeMinterme[g] != "'") {
        chhhh = listeMinterme[g];

        TempContientTouteVariables;
        sortedARR = TempContientTouteVariables.split("");
        sortedARR = sortedARR.sort();
        sortedARR;
        TempContientTouteVariables = sortedARR.join("");
        console.log(TempContientTouteVariables);
        if (isLetter(listeMinterme[g]) && listeMinterme[g + 1] == "'") {
          index = TempContientTouteVariables.indexOf(listeMinterme[g]);
          index;
          BinaryMintermeEnArray[index] = "0";
        } else {
          index = TempContientTouteVariables.indexOf(listeMinterme[g]);
          index;
          BinaryMintermeEnArray[index] = "1";
        }
      }
    } // fin du grande boocle .
    BinaryMinterme = BinaryMintermeEnArray.join("");
    BinaryMinterme;
    return BinaryMinterme;
  }

  function removeSpaces(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
    }
  }

  function allVariables(expression) {
    var listDesChars = expression.split("");
    var VarsInExp = [];
    for (var i in listDesChars) {
      if (isLetter(listDesChars[i]) && !VarsInExp.includes(listDesChars[i])) {
        VarsInExp.push(listDesChars[i]);
      }
    }
    return VarsInExp;
  }

  function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }
  var tabDesMintermes = expression.split("+");
  tabDesMintermes;
  removeSpaces(tabDesMintermes);
  tabDesMintermes;
  var listDesChar = [];
  var allVArs = [];
  allVArs.push(allVariables(expression)); // [allVariables(expression),order]
  allVArs.sort();
  var nbrOfMonomes = tabDesMintermes.length;
  var fixedExpression = tabDesMintermes.join("+");
  console.log(fixedExpression);
  var TempContientTouteVariables = allVArs[0].join("");
  TempContientTouteVariables;
  var all = TempContientTouteVariables.length; // to be used later.
  all;
  nbrOfMonomes;
  //  #### to be used later nchlh :: ####   TempContientTouteVariables.indexOf("a");
  var NumberOfVars = allVArs[0].length; // numero des variables .
  NumberOfVars;
  tabDesMintermes;

  var minterme;
  var MintermeEnArray = [];
  //for (var i in tabDesMintermes) {  // boucle pour chaque minterme le put in a liste. // for (var i in tabDesMintermes)
  minterme = tabDesMintermes[0];

  MintermeEnArray = minterme.split("");

  MintermeEnArray;
  minterme = "a'c'd";
  var BinaryMintermeOfficiel;
  BinaryMintermeOfficiel = generateBinaire(minterme);
  BinaryMintermeOfficiel;

  function extracteIndices(minterm) {
    var LesIndicesImp = []; // var qui contient les indices de chaque minterme.
    var listeDeMintermeWithoutApostroph = allVariables(minterm);
    for (var k in listeDeMintermeWithoutApostroph) {
      LesIndicesImp.push(
        TempContientTouteVariables.indexOf(listeDeMintermeWithoutApostroph[k])
      );
      LesIndicesImp;
    }
    return LesIndicesImp;
  }
  var binary = "100000";
  var digit = parseInt(binary, 2);
  digit;

  var arrayDesBinaires = [];

  finalBoss(arrayDesBinaires);

  function finalBoss(arrayDesBinaires) {
    var IterMinterme = "b'cd";
    var iterbinaireMin;
    var iterIndices;
    //var temp ;
    var digit;
    var iterBinaireNum;
    var islam = [];
    for (var m = 0; m < tabDesMintermes.length; m++) {
      IterMinterme = tabDesMintermes[m];
      iterbinaireMin;
      iterbinaireMin = generateBinaire(IterMinterme);
      console.log(tabDesMintermes[m]);
      iterbinaireMin;
      iterIndices = extracteIndices(IterMinterme);
      iterIndices;
      digit = parseInt(iterbinaireMin, 2);
      digit;
      for (var i = digit; i <= Math.pow(2, NumberOfVars) - 1; i++) {
        //console.log(i)
        i;
        iterBinaireNum = i.toString(2);

        while (iterBinaireNum.length < NumberOfVars) {
          iterBinaireNum = "0" + iterBinaireNum;
        }

        if (comparaison(iterbinaireMin, iterIndices, iterBinaireNum)) {
          arrayDesBinaires.push(iterBinaireNum);
          islam.push(i);
        } else {
        }
      } // boucle des i=0 jusque 2**n des canonical functs .
    }
    // main boocle for : that goes once for each minterme .
    islam = islam.sort();
    console.log(islam);
  } // fin fonction
  arrayDesBinaires;
  var nbbb = arrayDesBinaires.length;
  nbbb;
  console.log(arrayDesBinaires);
  // remove duplicates from .
  let cleanArrayOfMintermesEnBinaires = [...new Set(arrayDesBinaires)];
  // section pour les tests.
  //
  //
  //
  // ab + c'd ==>  abcd , abc'd' , a'b'c'd , ab'c'd , a'bc'd , abc'd
  //expression = " ab + c'd ";
  /////////////////////////////////////////////////////////////////
  cleanArrayOfMintermesEnBinaires;
  console.log(cleanArrayOfMintermesEnBinaires);
  digit = cleanArrayOfMintermesEnBinaires.length;
  digit;

  //
  //
  //

  return cleanArrayOfMintermesEnBinaires;
}

function displayInput(str) {
  //Fonction pour afficher la fonction entrée par l'utilisateur
  let input = document.createElement("div");
  input.id = "entree";
  let expr = str.replace(/.{60}/g, "$& ");
  input.innerText = `${expr}`;
  document.querySelector(".fonction").appendChild(input);
}
//******************************************************** */
//Implémentation de Quine McClusky-------------------------------------------------
function sum(arr) {
  //Fonction qui calcule le nombre des bits à "1" dans un minterm
  //C'est juste
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "1") sum++;
  }
  return sum;
}
class Groupe {
  //La structure de données utilisée pour construire les groupes
  Minterm2 = []; //tableau des minterms en base 2 (chaines de caractères)
  Minterm10 = []; //tableau des minterms en base 10 (chaines de caractères)
  PrimeImplicant = []; //tableau des booleens pou indiquer si le minterm est un premier impliquant ou non
  Esum = []; //champ supplémentaire qui aide dans l'optimisation
}
class PrimeChart {
  //La structure de données utilisée pour stocker les premiers impliquants et faire les simplifications (Essential/row/column)
  minterms; //Les minterms
  CorrespondingPrimes = []; //Tableau de booleens pour identifier les minterms qui sont des premiers impliquants
}
function Creation(str, dontcares) {
  //Creer les groupes pour faire les comparaisons
  if (dontcares != null && dontcares.length > 0) {
    for (let i = 0; i < dontcares.length; i++) {
      if (!str.includes(dontcares[i])) {
        str.push(dontcares[i]);
      }
    }
  }

  let Tab2 = [];
  for (let i = 0; i < str.length; i++) {
    let k = sum(str[i]);
    if (Tab2[k] == null) {
      let g = new Groupe();
      let m1 = [];
      m1.push(parseInt(str[i], 2));
      g.Minterm2.push(str[i]);
      g.Minterm10.push(m1);
      g.PrimeImplicant.push(false);
      g.Esum.push(0);
      Tab2[k] = g;
    } else {
      Tab2[k].Minterm2.push(str[i]);
      let m1 = [];
      m1.push(parseInt(str[i], 2));
      Tab2[k].Minterm10.push(m1);
      Tab2[k].PrimeImplicant.push(false);
      Tab2[k].Esum.push(0);
    }
  }
  m1 = null;
  let gr = new Array();
  for (i = 0; i < Tab2.length; i++) {
    if (Tab2[i] != null) gr.push(Tab2[i]);
  }
  Tab2 = null;
  return gr;
}
function isPowerofTwo(n) {
  if (n == 0) return false;
  if ((n & ~(n - 1)) == n) return true;
  return false;
}
function Comparer2(m1, m2) {
  //Effectuer la comparaison entre les tableaux qui contient les bits (Minterm2)
  let ch = "";
  let differ = 0;
  for (let i = 0; i < m1.length; i++) {
    if (m1[i] != m2[i]) {
      if (differ > 1) {
        return null;
      }
      ch += "_";
      differ++;
    } else ch += m1[i];
  }
  if (differ == 1) {
    return ch;
  }
  return null;
}
function Comparer(g1, g2) {
  //Effectuer la comparaison entre 2 groupes
  let correspond;
  let result = null;
  let m10 = [];
  let m2 = [];
  let prime2 = 0;
  for (let i = 0; i < g1.Minterm10.length; i++) {
    let gm1 = g1.Minterm10[i];
    for (let j = 0; j < g2.Minterm10.length; j++) {
      let gm2 = g2.Minterm10[j];
      if (g1.Esum[i] == g2.Esum[j] && isPowerofTwo(gm2[0] - gm1[0])) {
        m2 = Comparer2(g1.Minterm2[i], g2.Minterm2[j]);
        if (m2 != null) {
          if (result == null) {
            result = new Groupe();
          }
          result.Minterm2.push(m2);
          g1.PrimeImplicant[i] = true;
          g2.PrimeImplicant[j] = true;
          arr3 = g1.Minterm10[i].concat(g2.Minterm10[j]);
          result.Minterm10.push(arr3);
          result.PrimeImplicant.push(false);
          result.Esum.push(g1.Esum[i] + gm2[0] - gm1[0]);
        }
      }
    }
    if (g1.PrimeImplicant[i] == false) {
      if (PremierImpliquant == null) {
        PremierImpliquant = new Groupe();
      }
      PremierImpliquant.Minterm2.push(g1.Minterm2[i]);
      PremierImpliquant.Minterm10.push(g1.Minterm10[i]);
      PremierImpliquant.Esum.push(g1.Esum[i]);
      prime2++;
      /* g1.PrimeImplicant.splice(i, 1);
      g1.Minterm10.splice(i, 1);
      g1.Minterm2.splice(i, 1);
      g1.Esum.splice(i, 1);
      i--;*/
    }
  }
  correspond = prime2 == g1.Minterm2.length;
  if (result != null) {
    for (let i = 0; i < result.Minterm10.length; i++) {
      for (let j = i + 1; j < result.Minterm10.length; j++) {
        if (
          result.Esum[i] == result.Esum[j] &&
          result.Minterm10[i][0] == result.Minterm10[j][0] &&
          result.Minterm10[i][result.Minterm10[i].length - 1] ==
            result.Minterm10[j][result.Minterm10[j].length - 1]
        ) {
          result.Minterm10.splice(j, 1);
          result.Esum.splice(j, 1);
          result.PrimeImplicant.splice(j, 1);
          result.Minterm2.splice(j, 1);
          j--;
        }
      }
    }
    prime2 = null;
    g1.Minterm2 = result.Minterm2;
    g1.Minterm10 = result.Minterm10;
    g1.PrimeImplicant = result.PrimeImplicant;
    g1.Esum = result.Esum;
  }
  return !correspond;
}
function comparer(m1, m2) {
  //comparer entre 2 objets
  for (let i = 0; i < m1.length; i++) {
    if (m1[i] != m2[i]) return false;
  }
  return true;
}
function Prime_implicants(minterms, dontcares) {
  //La fonction principale qui génére les premiers implicants
  if (minterms == null || minterms.length == 0) {
    //alert("Please enter the minterms");
    return;
  }
  let gr = new Array();
  let prime = 0;
  let cpt = 0;
  gr = Creation(minterms, dontcares);
  if (cpt < 3 && gr.length) {
    let gr1 = [];
    for (let i = 0; i < gr.length; i++) {
      let gm2 = [...gr[i].Minterm2];
      let gm10 = [...gr[i].Minterm10];
      let g = { gm2, gm10 };
      gr1.push(g);
    }
    tGroupe.push(gr1);
    cpt++;
  }

  let possible = true;
  let correspond;
  while (possible) {
    for (let i = 0; i < gr.length - 1; i++) {
      correspond = Comparer(gr[i], gr[i + 1]);
      if (!correspond) {
        prime++;
      }
    }
    if (prime == gr.length - 1) {
      possible = false;
    }
    for (let i = 0; i < gr[gr.length - 1].Minterm2.length; i++) {
      if (gr[gr.length - 1].PrimeImplicant[i] == false) {
        if (PremierImpliquant == null) {
          PremierImpliquant = new Groupe();
        }
        PremierImpliquant.Minterm2.push(gr[gr.length - 1].Minterm2[i]);
        PremierImpliquant.Minterm10.push(gr[gr.length - 1].Minterm10[i]);
        PremierImpliquant.Esum.push(gr[gr.length - 1].Esum[i]);
      }
    }
    gr.pop();
    //let newGroupement = false;
    if (possible && cpt < 3) {
      //bodyComponent(gr);
      let gr1 = [];
      for (let i = 0; i < gr.length; i++) {
        let gm2 = [...gr[i].Minterm2];
        let gm10 = [...gr[i].Minterm10];
        let g = { gm2, gm10 };
        gr1.push(g);
      }

      tGroupe.push(gr1);
      cpt++;
    }
    prime = 0;
  }
  gr = null;
  PremierImpliquant.Esum = null;
  let output1 = document.createElement("div");
  output1.id = "premier";

  let premiers = primeshow(PremierImpliquant);
  output1.innerText = ` ${premiers}`;
  let output2 = document.createElement("div");
  output2.innerText = ` ${premiers}`;
  output2.id = "premier";
  document.querySelector(".premier").appendChild(output1);
  document.querySelector(".premierT").appendChild(output2);
  return PremierImpliquant;
}
function Prime_implicants_lit(exp, minterms, dontcares) {
  //La fonction principale qui génére les premiers implicants pour le mode littérale
  if (minterms == null || minterms.length == 0) {
    //alert("Please enter the minterms");
    return;
  }
  let gr = new Array();
  let prime = 0;
  let cpt = 0;
  gr = Creation(minterms, dontcares);
  if (cpt < 3 && gr.length) {
    let gr1 = [];
    for (let i = 0; i < gr.length; i++) {
      let gm2 = [...gr[i].Minterm2];
      let gm10 = [...gr[i].Minterm10];
      let g = { gm2, gm10 };
      gr1.push(g);
    }
    tGroupe.push(gr1);
    cpt++;
  }

  let possible = true;
  let correspond;
  while (possible) {
    for (let i = 0; i < gr.length - 1; i++) {
      correspond = Comparer(gr[i], gr[i + 1]);
      if (!correspond) {
        prime++;
      }
    }
    if (prime == gr.length - 1) {
      possible = false;
    }
    for (let i = 0; i < gr[gr.length - 1].Minterm2.length; i++) {
      if (gr[gr.length - 1].PrimeImplicant[i] == false) {
        if (PremierImpliquant == null) {
          PremierImpliquant = new Groupe();
        }
        PremierImpliquant.Minterm2.push(gr[gr.length - 1].Minterm2[i]);
        PremierImpliquant.Minterm10.push(gr[gr.length - 1].Minterm10[i]);
        PremierImpliquant.Esum.push(gr[gr.length - 1].Esum[i]);
      }
    }
    gr.pop();
    //let newGroupement = false;
    if (possible && cpt < 3) {
      //bodyComponent(gr);
      let gr1 = [];
      for (let i = 0; i < gr.length; i++) {
        let gm2 = [...gr[i].Minterm2];
        let gm10 = [...gr[i].Minterm10];
        let g = { gm2, gm10 };
        gr1.push(g);
      }

      tGroupe.push(gr1);
      cpt++;
    }
    prime = 0;
  }
  gr = null;
  PremierImpliquant.Esum = null;
  let output1 = document.createElement("div");
  output1.id = "premier";

  let premiers = primeshow_lit(PremierImpliquant, variables(exp));
  output1.innerText = ` ${premiers}`;
  let output2 = document.createElement("div");
  output2.innerText = ` ${premiers}`;
  output2.id = "premier";
  document.querySelector(".premier").appendChild(output1);
  document.querySelector(".premierT").appendChild(output2);
  return PremierImpliquant;
}
function Chart(dontcares) {
  //Qui génére la matrice (Minterms;Premiers implicants)
  if (PremierImpliquant == null) return;
  let minterms = [];
  chart = [];
  //A fin de récupérer tous les mintermes
  for (let j = 0; j < PremierImpliquant.Minterm10.length; j++) {
    for (let k = 0; k < PremierImpliquant.Minterm10[j].length; k++) {
      if (!minterms.includes(PremierImpliquant.Minterm10[j][k])) {
        let found = false;
        //Pour supprimer tous les dontcares
        if (dontcares != null && dontcares.length > 0) {
          for (let l = 0; l < dontcares.length; l++) {
            if (
              parseInt(dontcares[l], 2) == PremierImpliquant.Minterm10[j][k]
            ) {
              found = true;
              break;
            }
          }
        }
        if (!found) minterms.push(PremierImpliquant.Minterm10[j][k]);
      }
    }
  }
  for (let i = 0; i < minterms.length; i++) {
    mint = new PrimeChart();
    mint.minterms = minterms[i];
    for (let j = 0; j < PremierImpliquant.Minterm2.length; j++) {
      if (PremierImpliquant.Minterm10[j].includes(minterms[i])) {
        mint.CorrespondingPrimes.push(true);
      } else mint.CorrespondingPrimes.push(false);
    }
    chart.push(mint);
  }
  minterms = null;
}
function EssentielPrimeImplicants() {
  //Générer les implicants essentielles d'aprés la matrice
  let Essentiel = false;
  let indice = -1;
  for (let i = 0; i < chart.length; i++) {
    let findingessentiel = 0;
    for (let j = 0; j < chart[i].CorrespondingPrimes.length; j++) {
      if (chart[i].CorrespondingPrimes[j] == true) {
        if (findingessentiel == 1) {
          findingessentiel++;
          break;
        }
        findingessentiel++;
        indice = j;
      }
    }
    if (findingessentiel == 1) {
      //On est tombé sur un implicant essentielle
      //colorier
      Essentiel = true;
      if (finalfunction == null) finalfunction = new Groupe();
      finalfunction.Minterm2.push(PremierImpliquant.Minterm2[indice]);
      finalfunction.Minterm10.push(PremierImpliquant.Minterm10[indice]);
      for (let k = 0; k < chart.length; k++) {
        if (PremierImpliquant.Minterm10[indice].includes(chart[k].minterms)) {
          chart.splice(k, 1);
          if (k <= i) i--;
          k--;
        } else {
          chart[k].CorrespondingPrimes.splice(indice, 1);
        }
      }
      PremierImpliquant.Minterm2.splice(indice, 1);
      PremierImpliquant.Minterm10.splice(indice, 1);
    }
  }
  return Essentiel;
}
function deleteEssentiel(tab) {
  //Simplifier la charte des premiers impliquants en utilisant essentiel à la fois
  console.log(tab);
  for (let i = 0; i < tab.length; i++) {
    if (finalfunction == null) finalfunction = new Groupe();
    finalfunction.Minterm2.push(PremierImpliquant.Minterm2[tab[i].indice]);
    finalfunction.Minterm10.push(PremierImpliquant.Minterm10[tab[i].indice]);
    for (let k = 0; k < chart.length; k++) {
      if (
        PremierImpliquant.Minterm10[tab[i].indice].includes(chart[k].minterms)
      ) {
        chart.splice(k, 1);
        k--;
      } else {
        chart[k].CorrespondingPrimes.splice(tab[i].indice, 1);
      }
    }
    for (let k = i + 1; k < tab.length; k++) {
      if (tab[k].indice > tab[i].indice) tab[k].indice--;
      else {
        if (tab[k].indice == tab[i].indice) {
          tab.splice(k, 1);
          k--;
        }
      }
      if (tab[k].i >= tab[i].i) tab[k].i--;
    }
    PremierImpliquant.Minterm2.splice(tab[i].indice, 1);
    PremierImpliquant.Minterm10.splice(tab[i].indice, 1);
  }
  return tab.length > 0;
}
function deleteRow(tab) {
  //Simplifier la charte des premiers impliquants en utilisant row dominance en supprimants toutes les lignes adéquates  à la fois
  for (let i = 0; i < tab.length; i++) {
    chart.splice(tab[i], 1);
    for (let j = i + 1; j < tab.length; j++) {
      if (tab[j] >= tab[i]) tab[j]--;
    }
  }
  return tab.length > 0;
}
function deleteColumn(tab) {
  //Simplifier la charte des premiers impliquants en utilisant column dominance en supprimants toutes les colonnes adéquates  à la fois
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < chart.length; j++) {
      chart[j].ColumnDominance.splice(tab[i], 1);
    }
    for (let j = i + 1; j < tab.length; j++) {
      if (tab[j] >= tab[i]) tab[j]--;
    }
  }
  return tab.length > 0;
}
function PrimeChartMinimization(type, exp) {
  //Simplification de la charte en utilisants essential row dominance et column dominance
  //Réduire la taille de la matrice générer , en appliquant (Row+Column)Dominance
  if (PremierImpliquant == null || chart == null) return;
  let essentiel = true;
  let column = true;
  let row = true;
  let cpt1 = 0;
  let cpt2 = 0;
  let cpt3 = 0;
  while (essentiel || column || row) {
    let some = findingUniqueMinterms();
    if (some.length > 0 && cpt1 < 10) {
      if (chart.length > 0) {
        let chart2 = [];
        let g = [];
        for (let i = 0; i < chart.length; i++) {
          let g1 = [...chart[i].CorrespondingPrimes];
          g.push(g1);
          let g5 = { ...chart[i] };
          chart2.push(g5);
        }
        //let chart2 = [...chart];
        let s = [...some];
        let p = [...PremierImpliquant.Minterm2];
        let id = "essentiel";

        tPremier.push({ p, chart2, s, g, id });

        cpt1++;
      }
    }
    essentiel = EssentielPrimeImplicants();
    let some1 = findingRowIndices();
    if (some1.length > 0 && cpt2 < 10) {
      if (chart.length > 0) {
        let g = [];
        let chart2 = [];
        for (let i = 0; i < chart.length; i++) {
          let g1 = [...chart[i].CorrespondingPrimes];
          g.push(g1);
          let g2 = { ...chart[i] };
          chart2.push(g2);
        }
        let s = [...some1];
        let p = [...PremierImpliquant.Minterm2];
        let id = "row";
        tPremier.push({ p, chart2, s, g, id });
        cpt2++;
      }
    }
    row = RowDominance();
    let some2 = findingColumnIndices();
    if (some2.length > 0 && cpt3 < 10) {
      if (chart.length > 0) {
        let g = [];
        let chart2 = [];
        for (let i = 0; i < chart.length; i++) {
          let g1 = [...chart[i].CorrespondingPrimes];
          g.push(g1);
          let g7 = { ...chart[i] };
          chart2.push(g7);
        }
        let s = [...some2];
        let p = [...PremierImpliquant.Minterm2];
        let id = "column";
        tPremier.push({ p, chart2, s, g, id });
        cpt3++;
      }
    }
    column = ColumnDominance();
  }
  if (chart.length == 0) {
    if (type == "lit") {
      res = finalshow_lit(finalfunction, variables(exp));
    } else res = finalshow(finalfunction);

    console.log(res);
    localStorage.setItem("exp", res.replace(/\s/g, ""));
    let resultat = document.createElement("div");
    resultat.id = "resultat";
    resultat.innerText = ` ${res}`;
    document.querySelector(".resultat").appendChild(resultat);

    let result = document.createElement("div");
    result.id = "resultat";
    result.innerText = ` ${res}`;
    document.querySelector(".fonctionT").appendChild(result);
    let output1 = document.createElement("div");
    output1.id = "premier";
    let ess;
    if (type == "lit") {
      ess = primeshow_lit(finalfunction, variables(exp));
    } else ess = primeshow(finalfunction);
    output1.innerText = ` ${ess}`;
    let output2 = document.createElement("div");
    output2.innerText = ` ${ess}`;
    output2.id = "premier";
    document.querySelector(".essentiel").appendChild(output1);
    document.querySelector(".essentielT").appendChild(output2);
  } else {
    //alert("On Applique l'Algorithme de Petrick");
    //primeTrace(PremierImpliquant.Minterm2, chart, "Prime implicants chart");
    res = Petrick2();
    console.log("we are after petrick");
    localStorage.setItem("exp", res.replace(/\s/g, ""));
    let resultat = document.createElement("div");
    resultat.id = "resultat";
    console.log(res);
    resultat.innerText = `${res}`;
    document.querySelector(".resultat").appendChild(resultat);
    let result = document.createElement("div");
    result.id = "resultat";
    result.innerText = ` ${res}`;
    document.querySelector(".fonctionT").appendChild(result);
    let output1 = document.createElement("div");
    output1.id = "premier";
    //let ess = primeshow(finalfunction);
    output1.innerText = ` ${res}`;
    let output2 = document.createElement("div");
    output2.innerText = ` ${res}`;
    output2.id = "premier";
    document.querySelector("#etape3").querySelector("h5").innerText =
      "Les impliquants essentiels par Petrick :";
    document.querySelector(".essentiel").appendChild(output1);
    document.querySelector(".essentielT").appendChild(output2);
  }
}
function RowDominance() {
  //Appliquer la dominance des lignes
  let row = false;
  for (let i = 0; i < chart.length; i++) {
    for (let j = i + 1; j < chart.length; j++) {
      if (Row(i, j)) {
        //on supprime j
        //colorer la jeme ligne

        row = true;
        chart.splice(j, 1);
        j--;
      } else {
        if (Row(j, i)) {
          //colorer ieme ligne

          row = true;
          chart.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
  return row;
}

function Row(i, j) {
  //Utiliser pour Appliquer la dominance des lignes
  let correspond = false;
  for (let k = 0; k < chart[i].CorrespondingPrimes.length; k++) {
    if (chart[i].CorrespondingPrimes[k] == true) {
      correspond = true;
      if (chart[j].CorrespondingPrimes[k] == false) return false;
    }
  }
  if (correspond) return true;
  return false;
}
function ColumnDominance() {
  //Appliquer la dominance des colonnes
  column = false;
  for (let j = 0; j < PremierImpliquant.Minterm2.length; j++) {
    for (let k = j + 1; k < PremierImpliquant.Minterm2.length; k++) {
      if (Column(j, k)) {
        //on supprime j
        //colorer la jeme colonne

        column = true;
        for (let l = 0; l < chart.length; l++) {
          chart[l].CorrespondingPrimes.splice(j, 1);
        }
        PremierImpliquant.Minterm2.splice(j, 1);
        PremierImpliquant.Minterm10.splice(j, 1);
        j--;
        break;
      } else {
        //colorer la keme colonne
        if (Column(k, j)) {
          column = true;
          for (let l = 0; l < chart.length; l++) {
            chart[l].CorrespondingPrimes.splice(k, 1);
          }
          PremierImpliquant.Minterm2.splice(k, 1);
          PremierImpliquant.Minterm10.splice(k, 1);
          k--;
        }
      }
    }
  }
  return column;
}
function Column(j, k) {
  //Utiliser pour Appliquer la dominance des colonnes
  let correspond = false;
  for (let i = 0; i < chart.length; i++) {
    if (chart[i].CorrespondingPrimes[j] == true) {
      correspond = true;
      if (chart[i].CorrespondingPrimes[k] == false) return false;
    }
  }
  if (correspond) return true;
  return false;
}
//****************************************************** */
// Implémentation de l'algorithme de Petrick-----------------------------------------
function Petrick() {
  //L'algorithme de Petrick
  let P = [];
  let p = "";
  let finalresult = [];
  for (
    let i = 0;
    i < chart.length;
    i++ //Constructing P function P=(p1,p2,p3,p4,...,pn)
  ) {
    for (let j = 0; j < chart[i].CorrespondingPrimes.length; j++) {
      if (chart[i].CorrespondingPrimes[j] == true) {
        p += "P" + j + "+";
      }
    }
    P.push(p.slice(0, p.length - 1));
    p = "";
  }
  console.log(P);
  let more = true;
  while (more) {
    // Applying  (X+Z).(X+Y)=(X+Y.Z)
    more = false;
    for (let i = 0; i < P.length; i++) {
      for (let j = i + 1; j < P.length; j++) {
        let result = Petrick_Comparaison(P[i], P[j]);
        if (result != null) {
          more = true;
          P[i] = PetrickHash(result);
          P.splice(j, 1);
          j--;
        }
      }
    }
  }
  p = P[0];
  for (let i = 1; i < P.length; i++) {
    try {
      p = AND(p, P[i]);
    } catch (err) {
      return Petrick2();
    }
  }
  for (
    let i = 0;
    i < P.length;
    i++ //Eliminate a.b+a.b=a.b
  ) {
    for (let j = i + 1; j < P.length; j++) {
      if (P[i] == P[j]) {
        P.splice(j, 1);
        j--;
      }
    }
  }
  let minimum = Number.MAX_SAFE_INTEGER;
  for (
    let i = 0;
    i < P.length;
    i++ //Finding the minimum cost for the function
  ) {
    if (numberofoperands(P[i]) < minimum) minimum = numberofoperands(P[i]);
  }
  let result = [];
  for (let i = 0; i < P.length; i++) {
    if (numberofoperands(P[i]) == minimum) {
      result.push(P[i]);
    }
  }
  P = null;
  for (
    let i = 0;
    i < result.length;
    i++ //Get the final implicants
  ) {
    finalresult.push(Petrickgetimplicant(result[i]));
  }
  finalresult = numberofvariables(finalresult);
  console.log(finalresult);
  let smth = "";
  let ch = finalshow(finalresult[0]);
  if (finalfunction != null) ch = finalshow(finalfunction) + "+" + ch;
  smth += ch;
  //console.log(Petrick2())
  return smth;
}
function Petrick2() {
  // Implémentation d'un algorithme de petrick optimisé
  let tab = [];
  let finalresult = [];
  let chart2 = [];
  tab.length = PremierImpliquant.Minterm2.length;
  tab.fill(0, 0, tab.length);
  //filling the array
  for (let i = 0; i < chart.length; i++) {
    for (let j = 0; j < chart[i].CorrespondingPrimes.length; j++) {
      if (chart[i].CorrespondingPrimes[j] == true) {
        tab[j]++;
      }
    }
  }
  let stop = false;
  while (!stop) {
    console.log(tab.toString());
    let tab1 = PetrickMax(tab);
    let max = tab1[0];
    let maxin = tab1[1];
    console.log(max);
    console.log(maxin);
    console.log(PremierImpliquant.Minterm2[maxin]);
    if (max == 0) {
      stop = true;
    } else {
      for (let i = 0; i < chart.length; i++) {
        if (chart[i].CorrespondingPrimes[maxin] == true) {
          for (let k = 0; k < chart[i].CorrespondingPrimes.length; k++) {
            if (chart[i].CorrespondingPrimes[k] == true) {
              tab[k]--;
            }
          }
          chart.splice(i, 1);
          i--;
        } else chart[i].CorrespondingPrimes.splice(maxin, 1);
      }
      finalresult.push(PremierImpliquant.Minterm2[maxin]);
      PremierImpliquant.Minterm2.splice(maxin, 1);
      PremierImpliquant.Minterm10.splice(maxin, 1);
      tab.splice(maxin, 1);
    }
  }
  console.log(finalresult.toString());
  let ch = "";
  if (finalfunction != null) ch = finalshow(finalfunction) + "+";
  ch += PetrickShow(finalresult);
  return ch;
}
function PetrickShow(result) {
  //Affichage de la fonction simplifiée dans le cas ou on utilise petrick
  let ch = "";
  let funct = "";
  for (let i = 0; i < result.length; i++) {
    ch = result[i];
    for (let j = 0; j < ch.length; j++) {
      if (ch[j] == "1" || ch[j] == "0") {
        funct += String.fromCharCode("A".charCodeAt() + j);
        if (ch[j] == "0") funct += "'";
      }
    }
    if (i + 1 < result.length) funct += "+";
  }
  return funct;
}
function PetrickMax(tab) {
  let max = 0;
  let maxind = -1;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] > 0 && tab[i] == max) {
      let ch1 = Petricknumofvargate(PremierImpliquant.Minterm2[i]);
      let ch2 = Petricknumofvargate(PremierImpliquant.Minterm2[maxind]);
      {
        if (ch1[0] < ch2[0]) maxind = i;
        else {
          if (ch1[0] == ch2[0] && ch1[1] < ch2[1]) maxind = i;
        }
      }
    } else {
      if (tab[i] > max) {
        max = tab[i];
        maxind = i;
      }
    }
  }
  return [max, maxind];
}
function Petricknumofvargate(ch) {
  let varia = 0;
  let gates = 0;
  for (let i = 0; i < ch.length; i++) {
    if (ch[i] == "1" || ch[i] == "0") {
      varia++;
      if (ch[i] == "0") gates++;
    }
  }
  gates += varia - 1;
  return [varia, gates];
}
function numberofvariables(finalresult) {
  //Pour Trouver l'expression minimale avec minimum de variables et de portes logiques.
  let minimalvar = Number.MAX_SAFE_INTEGER;
  let minimalgates = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < finalresult.length; i++) {
    obj = finalresult[i];
    let numofgates = 0;
    let numberofvar = 0;
    for (let l = 0; l < obj.Minterm2.length; l++) {
      let ch = obj.Minterm2[l];
      for (let k = 0; k < ch.length; k++) {
        if (ch[k] == "1" || ch[k] == "0") {
          numberofvar++;
          if (ch[k] == "0") numofgates++;
        }
      }
    }
    if (numberofvar > 1) numofgates += numberofvar - 1;
    if (numberofvar < minimalvar) {
      //Priority is given to the number of variables
      minimalvar = numberofvar;
      minimalgates = numofgates;
    } else {
      if (numberofvar > minimalvar) {
        finalresult.splice(i, 1);
        i--;
      } else {
        if (numofgates < minimalgates) minimalgates = numofgates;
        else {
          if (numofgates > minimalgates) {
            finalresult.splice(i, 1);
            i--;
          }
        }
      }
    }
  }
  for (
    let i = 0;
    i < finalresult.length;
    i++ //Vérification
  ) {
    let obj = finalresult[i];
    let numofgates = 0;
    let numberofvar = 0;
    for (let l = 0; l < obj.Minterm2.length; l++) {
      let ch = obj.Minterm2[l];
      for (let k = 0; k < ch.length; k++) {
        if (ch[k] == "1" || ch[k] == "0") {
          numberofvar++;
          if (ch[k] == "0") numofgates++;
        }
      }
    }
    if (numberofvar > 1) numofgates += numberofvar - 1;
    if (numberofvar > minimalvar) {
      finalresult.splice(i, 1);
      i--;
    } else {
      if (numofgates > minimalgates) {
        finalresult.splice(i, 1);
        i--;
      }
    }
  }
  return finalresult;
}
function numberofoperands(ch) {
  //Basice one
  let num = 0;
  for (let i = 0; i < ch.length; i++) {
    if (isOperand(ch[i])) num++;
  }
  return num;
}
function Petrick_Comparaison(P1, P2) {
  //Effectuer la comparaison dans l'algorithme de Petrick
  // Lorsque c'est possible,on effectue (X+Y).(X+Z)=(X+Y.Z)
  let tab1 = P1.split("+");
  let tab2 = P2.split("+");
  let essentiel = "";
  let p1 = "";
  let p2 = "";
  for (let i = 0; i < tab1.length; i++) {
    if (tab2.includes(tab1[i])) {
      essentiel += tab1[i] + "+";
      tab2.splice(tab2.indexOf(tab1[i]), 1);
      tab1.splice(i, 1);
      i--;
    }
  }
  if (essentiel.length == 0) return null;
  for (let i = 0; i < tab1.length; i++) {
    p1 += tab1[i] + "+";
  }
  p1 = p1.slice(0, p1.length - 1);
  for (let i = 0; i < tab2.length; i++) {
    p2 += tab2[i] + "+";
  }
  p2 = p2.slice(0, p2.length - 1);
  essentiel += AND(p1, p2);
  return essentiel;
}
function Petrick_getimplicant(ch) {
  //Récupérer l'implicant qui correspond (Relative à Petrick)
  let obj = new Groupe();
  for (let j = 0; j < ch.length; j++) {
    if (isOperand(ch[j])) {
      let indice = ch[j].charCodeAt() - "A".charCodeAt();
      obj.Minterm2.push(PremierImpliquant.Minterm2[indice]);
      obj.Minterm10.push(PremierImpliquant.Minterm10[indice]);
    }
  }
  return obj;
}
function Petrickgetimplicant(ch) {
  let obj = new Groupe();
  let tab = ch.split("P");
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] != "") {
      let indice = parseInt(tab[i], 10);
      obj.Minterm2.push(PremierImpliquant.Minterm2[indice]);
      obj.Minterm10.push(PremierImpliquant.Minterm10[indice]);
    }
  }
  return obj;
}
function PetrickHash(s) {
  let tab = s.split(".");
  for (let i = 0; i < tab.length; i++) {
    for (let j = i + 1; j < tab.length; j++) {
      if (tab[i] == tab[j]) {
        tab.splice(j, 1);
        j--;
      }
    }
  }
  /*const sortAlphanum=(a, b)=>a.localeCompare(b,'en',{numeric:true})
  tab=tab.sort(sortAlphanum)*/

  return tab.toString().replaceAll(",", "");
}
//**************************************************** */
//La trace-------------------------------------------------
function tableComponent() {
  //Creer un tableau dynamiquement
  var newDiv = document.createElement("div");
  var newTable = document.createElement("table");
  var newTr = document.createElement("tr");
  var newTh = document.createElement("th");
  var newTd = document.createElement("td");
  newDiv.appendChild(newTable);
  newTable.appendChild(newTr);
  newTr.appendChild(newTh);
  newTr.appendChild(newTd);
  newTh.innerHTML = "Groupes";
  newTd.innerHTML = "Mintermes";
  return newDiv;
}
function rowComponent(val) {
  //Creer une ligne avec la valeur val
  var newTr = document.createElement("tr");
  var newTh = document.createElement("th");
  var newTd = document.createElement("td");
  newTr.appendChild(newTh);
  newTr.appendChild(newTd);
  newTh.innerHTML = `Groupe ${val}`;
  return newTr;
}
function bodyComponent(gr) {
  //Dessiner le tableau de la 1ere etape
  var tables = document.getElementById("tables");
  var newDiv = tableComponent();
  var table = newDiv.getElementsByTagName("table")[0];
  tables.appendChild(newDiv);
  for (let j = 0; j < gr.length; j++) {
    table.appendChild(rowComponent(j));
    var td = table
      .getElementsByTagName("tr")
      [j + 1].getElementsByTagName("td")[0];
    for (let i = 0; i < gr[j].gm2.length; i++) {
      if (i > 0) {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = "<br/>";
        td.appendChild(newSpan);
      }
      td.appendChild(mintermComponent(`${gr[j].gm2[i]}`, gr[j].gm10[i]));
    }
  }
}
function mintermComponent(val, i) {
  //Creer les cases qui contient les minterms dans le tableau de la 1ere etape
  var newDiv = document.createElement("div");
  var newDiv1 = document.createElement("div");
  var newDiv2 = document.createElement("div");
  newDiv.appendChild(newDiv1);
  newDiv.appendChild(newDiv2);
  newDiv.className = "indice-binaire";
  newDiv1.className = "indice";
  newDiv2.className = "binaire";
  newDiv1.innerHTML = `M${i}`;
  newDiv2.innerHTML = val;
  return newDiv;
}
function rowDominanceTrace(tab1, tab2, tab3, txt, tab4) {
  //Creer le tableau qui s'affiche dans le cas ou on applique row dominance
  //tab1:tableau des implicants tab2:tableau des noms des implicants ex:M01,M02...
  let tab = document.createElement("div");
  tab.id = "primesTable";
  let table = createTable(txt);
  tab.appendChild(table);
  let firstLine = premiereLigne(tab1);
  table.getElementsByClassName("scroll")[0].appendChild(firstLine);
  for (let i = 0; i < tab2.length; i++) {
    let colonne = colonnes(tab2[i].minterms, tab1.length, tab4[i]);
    for (let k = 0; k < tab3.length; k++) {
      if (i === tab3[k]) {
        colonne.style.backgroundColor = "pink";
      }
      table.getElementsByClassName("scroll")[0].appendChild(colonne);
    }
  }
  document.getElementById("impliquantsEssentiels").appendChild(tab);
}

function columnDominanceTrace(tab1, tab2, tab3, txt, tab4) {
  //Creer le tableau qui s'affiche dans le cas ou on applique column dominance
  //tab1:tableau des implicants tab2:tableau des noms des implicants ex:M01,M02...
  let tab = document.createElement("div");
  tab.id = "primesTable";
  let table = createTable(txt);
  tab.appendChild(table);
  let firstLine = premiereLigne(tab1);
  table.getElementsByClassName("scroll")[0].appendChild(firstLine);
  for (let i = 0; i < tab2.length; i++) {
    let colonne = colonnesForColumnDominanceTrace(
      tab2[i].minterms,
      tab1.length,
      tab4[i],
      tab3
    );
    table.getElementsByClassName("scroll")[0].appendChild(colonne);
  }
  document.getElementById("impliquantsEssentiels").appendChild(tab);
}

function colonnesForColumnDominanceTrace(val, nb, tab, tab3) {
  //Creer une colonne colorée
  //creer une colonne avec nb cases
  let tr = document.createElement("tr");

  let table = document.createElement("td");
  tr.appendChild(table);
  let mintermes = document.createElement("div");
  mintermes.classList.add("minterms");
  table.appendChild(mintermes);
  let div = document.createElement("div");
  div.classList.add("minterm");
  div.innerText = `M${val}`; //le numero du minterm ex: M01
  mintermes.appendChild(div);
  for (let i = 0; i < nb; i++) {
    let x = document.createElement("td");
    for (let k = 0; k < tab3.length; k++) {
      if (i === tab3[k]) {
        x.style.backgroundColor = "#5c38ff";
      }
      if (tab[i] == true) {
        x.innerText = "X";
      }
      tr.appendChild(x);
    }
  }
  return tr;
}

function premiereLigne(tab) {
  //Creer la première ligne du tableau qui contient les premiers impliquants/les impliquants essentiels
  //creer la premiere ligne avec tab.length implicants
  let table = document.createElement("tr");
  let mintermes = document.createElement("th");
  table.appendChild(mintermes);
  mintermes.innerText = "Minterms";
  for (let i = 0; i < tab.length; i++) {
    let td = document.createElement("td");
    td.classList.add("td");
    let newDiv = document.createElement("div");
    newDiv.classList.add("primeImplicants");
    let div = document.createElement("div");
    div.classList.add("primeImplicant");
    div.innerText = tab[i];
    newDiv.appendChild(div);
    td.appendChild(newDiv);
    table.appendChild(td);
  }
  return table;
}
function colonnes(val, nb, tab) {
  //Creer une colonne avec nb cases et une valeur val
  //creer une colonne avec nb cases
  let tr = document.createElement("tr");

  let table = document.createElement("td");
  tr.appendChild(table);
  let mintermes = document.createElement("div");
  mintermes.classList.add("minterms");
  table.appendChild(mintermes);
  let div = document.createElement("div");
  div.classList.add("minterm");
  div.innerText = `M${val}`; //le numero du minterm ex: M01
  mintermes.appendChild(div);

  for (let i = 0; i < nb; i++) {
    let x = document.createElement("td");
    if (tab[i] == true) {
      x.innerText = "X";
    }
    tr.appendChild(x);
  }
  return tr;
}
function createTable(txt) {
  //Creer le composant Tableau dynamiquement
  let div = document.createElement("div");
  let newDiv = document.createElement("div");
  newDiv.classList.add("message");
  newDiv.innerText = txt;
  let t = document.createElement("table");
  t.classList.add("primesTable");
  div.appendChild(newDiv);
  div.appendChild(t);
  let b = document.createElement("tbody");
  b.classList.add("scroll");
  t.appendChild(b);
  return div;
}
function primeTrace(tab1, tab2, txt, tab3) {
  // Creation du Tableau des impliquants essentiels (sans colorer les impliquants essentiels)
  //tab1:tableau des implicants tab2:tableau des noms des implicants ex:M01,M02...
  let tab = document.createElement("div");
  tab.id = "primesTable";
  let table = createTable(txt);
  tab.appendChild(table);
  let firstLine = premiereLigne(tab1);
  table.getElementsByClassName("scroll")[0].appendChild(firstLine);
  for (let i = 0; i < tab2.length; i++) {
    let colonne = colonnes(tab2[i].minterms, tab1.length, tab3[i]);
    table.getElementsByClassName("scroll")[0].appendChild(colonne);
  }
  document.getElementById("impliquantsEssentiels").appendChild(tab);
}
function colonnesEssentiel1(val, nb, tab, tab3, l) {
  //Colorer les impliquants essentiels
  //creer une colonne avec nb cases
  let tr = document.createElement("tr");

  let table = document.createElement("td");
  tr.appendChild(table);
  let mintermes = document.createElement("div");
  mintermes.classList.add("minterms");
  table.appendChild(mintermes);
  let div = document.createElement("div");
  div.classList.add("minterm");
  div.innerText = `M${val}`; //le numero du minterm ex: M01
  mintermes.appendChild(div);
  for (let i = 0; i < nb; i++) {
    let x = document.createElement("td");
    if (tab[i] == true) {
      x.innerText = "X";
      console.log(l.length);
      if (l.length != 0) {
        for (let k = 0; k < l.length; k++) {
          if (tab3[l[k]].indice == i) {
            x.style.backgroundColor = "#63C884";
          }
        }
      }
    }
    tr.appendChild(x);
  }
  return tr;
}
function colonnesEssentiel2(val, nb, tab) {
  //une 2eme fonction pour colorer les impliqunats essentiels
  //creer une colonne avec nb cases
  let tr = document.createElement("tr");

  let table = document.createElement("td");
  tr.appendChild(table);
  let mintermes = document.createElement("div");
  mintermes.classList.add("minterms");
  table.appendChild(mintermes);
  let div = document.createElement("div");
  div.classList.add("minterm");
  div.innerText = `M${val}`; //le numero du minterm ex: M01
  mintermes.appendChild(div);
  for (let i = 0; i < nb; i++) {
    let x = document.createElement("td");
    if (tab[i] == true) {
      x.innerText = "X";
    }
    tr.appendChild(x);
  }
  return tr;
}
function essentielTrace(tab1, tab2, tab3, txt, tab4) {
  //Creer le tableau qui contient les impliquants essentiels (avec coloriage des impliqunats essentiels)
  //tab1:tableau des implicants tab2:tableau des noms des implicants ex:M01,M02...
  var possible = false;
  let tab = document.createElement("div");
  tab.id = "primesTable";
  let table = createTable(txt);
  tab.appendChild(table);
  let firstLine = premiereLigne(tab1);
  table.getElementsByClassName("scroll")[0].appendChild(firstLine);
  for (let k = 0; k < tab2.length; k++) {
    possible = false;
    for (let j = 0; j < tab3.length; j++) {
      if (tab3[j].i == k) {
        var l = [];
        l.push(j);
        possible = true;
      }
    }
    if (possible) {
      var colonne = colonnesEssentiel1(
        tab2[k].minterms,
        tab1.length,
        tab4[k],
        tab3,
        l
      );
    } else {
      var colonne = colonnesEssentiel2(tab2[k].minterms, tab1.length, tab4[k]);
    }
    table.getElementsByClassName("scroll")[0].appendChild(colonne);
  }
  document.getElementById("impliquantsEssentiels").appendChild(tab);
}
function findingRowIndices() {
  //Rechercher tout les indices des lignes ou row dominance va s'appliquée (optimisation de la trace)
  let rowIndice = [];
  for (let i = 0; i < chart.length; i++) {
    for (let j = i + 1; j < chart.length; j++) {
      if (Row(i, j)) {
        rowIndice.push(j);
        break;
      } else {
        if (Row(j, i)) {
          rowIndice.push(i);
          break;
        }
      }
    }
  }

  return rowIndice;
}
function findingColumnIndices() {
  //Rechercher tout les indices des colonnes ou column dominance va s'appliquée (optimisation de la trace)
  let columnIndice = [];
  for (let i = 0; i < PremierImpliquant.Minterm2.length; i++) {
    for (let j = i + 1; j < PremierImpliquant.Minterm2.length; j++) {
      if (Column(i, j)) {
        columnIndice.push(i);
        break;
      } else {
        if (Column(j, i)) {
          columnIndice.push(j);
          break;
        }
      }
    }
  }
  return columnIndice;
}
function Trace() {
  //Afficher la trace de la 1ere etape
  for (let i = 0; i < tGroupe.length; i++) {
    bodyComponent(tGroupe[i]);
  }
  tGroupe = null;
}
function trace() {
  //Afficher la trace de la 2eme etape
  let i = 0;
  primeTrace(
    tPremier[0].p,
    tPremier[0].chart2,
    "La charte des premiers impliquants",
    tPremier[0].g
  );
  while (i < tPremier.length) {
    switch (tPremier[i].id) {
      case "essentiel":
        primeTrace(
          tPremier[i].p,
          tPremier[i].chart2,
          "La charte actuelle",
          tPremier[i].g
        );
        //primeTrace2(tPremier[i].p, tPremier[i].chart2, "msg");
        essentielTrace(
          tPremier[i].p,
          tPremier[i].chart2,
          tPremier[i].s,
          "charte des impliquants essentiels",
          tPremier[i].g
        );
        tPremier[i] = null;
        break;
      case "row":
        if (tPremier[i].chart2.length < 350) {
          primeTrace(
            tPremier[i].p,
            tPremier[i].chart2,
            "La charte actuelle",
            tPremier[i].g
          );
          rowDominanceTrace(
            tPremier[i].p,
            tPremier[i].chart2,
            tPremier[i].s,
            "Appliquons la dominance des lignes",
            tPremier[i].g
          );
          tPremier[i] = null;
        }

        break;
      case "column":
        primeTrace(
          tPremier[i].p,
          tPremier[i].chart2,
          "La charte actuelle",
          tPremier[i].g
        );
        columnDominanceTrace(
          tPremier[i].p,
          tPremier[i].chart2,
          tPremier[i].s,
          "Appliquons la dominance des colonnes",
          tPremier[i].g
        );
        tPremier[i] = null;

        break;
    }
    i++;
  }
}

function findingUniqueMinterms() {
  //Rechercher tout les indices des lignes et des colonnes ou essentiel  va s'appliquée (optimisation de la trace)
  let indice = -1;
  let implicantsTab = [];
  for (let i = 0; i < chart.length; i++) {
    let findingessentiel = 0;
    for (let j = 0; j < chart[i].CorrespondingPrimes.length; j++) {
      if (chart[i].CorrespondingPrimes[j] == true) {
        if (findingessentiel == 1) {
          findingessentiel++;
          break;
        }
        findingessentiel++;
        indice = j;
      }
    }
    if (findingessentiel == 1) {
      implicantsTab.push({ i, indice });
      //On est tombé sur un implicant essentielle
    }
  }
  return implicantsTab;
}

function primeshow(result) {
  //Afficher la derniére fonction  avec des virgules (pour l'affichage des premiers impliquants)
  if (result == null || result.length == 0) return "";
  str = "";
  for (let i = 0; i < result.Minterm2.length; i++) {
    let ch = result.Minterm2[i];
    for (let j = 0; j < ch.length; j++) {
      if (ch[j] == "1") {
        str = str + String.fromCharCode("A".charCodeAt() + j);
      }
      if (ch[j] == "0") {
        str = str + String.fromCharCode("A".charCodeAt() + j) + "'";
      }
    }
    str = str + " ,";
  }
  str = str.slice(0, str.length - 1);

  return str;
}
function show() {
  //Afficher les premiers implicants générés
  str = "";
  alert("Your prime implicants are:");
  for (let i = 0; i < PremierImpliquant.Minterm2.length; i++) {
    let ch = PremierImpliquant.Minterm2[i];
    for (let j = 0; j < ch.length; j++) {
      if (ch[j] == "1") {
        str = str + String.fromCharCode("A".charCodeAt() + j);
      }
      if (ch[j] == "0") {
        str = str + String.fromCharCode("A".charCodeAt() + j) + "'";
      }
    }
    str = str + " | ";
  }
  alert(str);
}
function finalshow(result) {
  //Afficher la derniére fonction simplifiée
  if (result == null || result.length == 0) return "";
  str = "";
  for (let i = 0; i < result.Minterm2.length; i++) {
    let ch = result.Minterm2[i];
    for (let j = 0; j < ch.length; j++) {
      if (ch[j] == "1") {
        str = str + String.fromCharCode("A".charCodeAt() + j);
      }
      if (ch[j] == "0") {
        str = str + String.fromCharCode("A".charCodeAt() + j) + "'";
      }
    }
    str = str + " +";
  }
  str = str.slice(0, str.length - 1);

  return str;
}
function remove_duplicate() {
  //Supprimer les redondants
  if (PremierImpliquant == null) return;
  for (let i = 0; i < PremierImpliquant.Minterm2.length; i++) {
    for (let j = i + 1; j < PremierImpliquant.Minterm2.length; j++) {
      if (
        comparer(PremierImpliquant.Minterm2[i], PremierImpliquant.Minterm2[j])
      ) {
        PremierImpliquant.Minterm2.splice(j, 1);
        PremierImpliquant.Minterm10.splice(j, 1);
        j--;
      }
    }
  }
}
//**************************************************** */
///Fonction pour récupérer l 'expression simplifiée du backend
const getExp = (exp) => {
  //Récupérer la fonction simplifiée du backend dans le cas ou on utilise espresso
  fetch("https://polar-ravine-24612.herokuapp.com/espresso", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    //mode: 'no-cors',
    body: JSON.stringify({
      exp: `${exp}`,
    }),
  }).then(async (data) => {
    const result = await data.json();
    const simp = result.exp;
    //const innerdiv = document.getElementById("result")
    //innerdiv.innerText = Your result is ${result.exp}
    localStorage.setItem("exp", simp.replace(/\s/g, ""));
    let resultat = document.createElement("div");
    resultat.id = "resultat";
    resultat.innerText = `${simp}`;
    document.querySelector(".resultat").appendChild(resultat);
    //console.log(result)
  });
};
//************************************************ */
//Préparation des minterms (cas numérique)
function get(k) {
  //Préparer les minterms entrées par l'utilisateur dans le cas numérique
  const myArray = k.split(",");
  var MinTerms = [];
  for (var i = 0; i < myArray.length; i++) {
    let x = myArray[i];
    let y = parseInt(x);
    //alert(y);
    let m = y.toString(2);
    //alert(m);
    MinTerms.push(m);
  }
  MinTerms.sort((a, b) => a.length - b.length);

  let nb = MinTerms[MinTerms.length - 1].length;
  for (let i = 0; i < MinTerms.length; i++) {
    while (MinTerms[i].length < nb) {
      MinTerms[i] = "0" + MinTerms[i];
    }
  }

  return MinTerms;
}
function get2(k, l) {
  //Préparer les minterms entrées par l utilisateur (pour les dontCares)
  const myArray = k.split(",");
  var MinTerms = [];

  for (var i = 0; i < myArray.length; i++) {
    let x = myArray[i];
    let y = parseInt(x);
    //alert(y);
    let m = y.toString(2);
    //alert(m);
    MinTerms.push(m);
  }
  MinTerms.sort((a, b) => a.length - b.length);

  let nb = l;
  for (let i = 0; i < MinTerms.length; i++) {
    while (MinTerms[i].length < nb) {
      MinTerms[i] = "0" + MinTerms[i];
    }
  }

  return MinTerms;
}
function get3(array1, array2) {
  //Une autre façon pour préparer les minterms dans le cas numérique
  let nb = 0;
  array1.sort((a, b) => a.length - b.length);
  array2.sort((a, b) => a.length - b.length);
  if (array1[array1.length - 1].length < array2[array2.length - 1].length) {
    nb = array2[array2.length - 1].length;
  } else {
    nb = array1[array1.length - 1].length;
  }
  for (let i = 0; i < array1.length; i++) {
    while (array1[i].length < nb) {
      array1[i] = "0" + array1[i];
    }
  }
  for (let i = 0; i < array2.length; i++) {
    while (array2[i].length < nb) {
      array2[i] = "0" + array2[i];
    }
  }
}
//********************************************* */
//La fonction Main qui sera exécutée pour simplifier la fonction logique---------------
function getResult() {
  PremierImpliquant = null;
  chart = null; //Qui contient la matrice (Minterms(ligne),Corresponding Prime Implicants(colonne))
  finalfunction = null; //Qui contient le résultat final

  let str = localStorage.getItem("fonction"); //(A+B).(B+C)+A'.B+C+(A.(B+C)').C.D
  console.log("str = " + str);

  displayInput(str); //Affichage de la fonction en entré
  if (str[0] >= "A" || str[0] === "(") {
    //On est dans le cas littérale + simplification avec McClusky et Petrick SANS ESPRESSO
    let exp = disjonctiveTransform(str);
    const allVars = allVariables(exp);
    if (allVars.length < 10) {
      let tableau = main(exp); //Transformation en canonique
      Prime_implicants_lit(exp, tableau);
      allVariables(exp);
      remove_duplicate();
      Chart();
      PrimeChartMinimization("lit", exp);
    } else {
      getExp(exp); // cas d'espresso
      document.getElementById("trace").style.display = "none";
      document.querySelector(".premier").style.display = "none";
      document.querySelector(".essentiel").style.display = "none";
    }
  } else {
    let DN = localStorage.getItem("dontcare");
    if (DN !== "") {
      DN = get(DN);
      let tableau = get(str);
      get3(tableau, DN);
      Prime_implicants(tableau, DN);
      //remove_duplicate();
      Chart(DN);
      PrimeChartMinimization("num", "");
    } else {
      let tableau = get(str);
      Prime_implicants(tableau);
      //remove_duplicate();
      Chart();
      //alert("Elhamdulah 1");
      PrimeChartMinimization("num", "");
      //alert("Elhamdulah 2");
      //console.log(Petrick2());
    }
  }
}
//************************************************* */
function addpoint(s) {
  // Fonction pour ajouter des points . (ET) à la fonction simplifiée , elle sera utile dans le dessin du logigramme
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] != " ") {
      result += s[i];
      if ((s[i] >= "A" && s[i] <= "Z") || (s[i] >= "a" && s[i] <= "z")) {
        if (i + 1 < s.length) {
          if (
            (s[i + 1] >= "A" && s[i + 1] <= "Z") ||
            (s[i + 1] >= "a" && s[i + 1] <= "z") ||
            s[i + 1] == "("
          ) {
            result += ".";
          }
        }
      } else {
        if (s[i] == "'" && i + 1 < s.length) {
          if (
            (s[i + 1] >= "A" && s[i + 1] <= "Z") ||
            (s[i + 1] >= "a" && s[i + 1] <= "z") ||
            s[i + 1] == "("
          ) {
            result += ".";
          }
        } else {
          if (s[i] == ")") {
            if (i + 1 < s.length) {
              if (
                (s[i + 1] >= "A" && s[i + 1] <= "Z") ||
                (s[i + 1] >= "a" && s[i + 1] <= "z")
              ) {
                result += ".";
              }
            }
          }
        }
      }
    }
  }
  return result;
}
//Implémentation du logigramme (version GO Js)
function logigramme(s) {
  s = s.trim();
  let ix = -1000;
  let iy = -1000;
  let xi = ix;
  let yi = iy;
  let or = false;
  let result =
    '{ "class": "go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":[';
  let andg = 1;
  let org = 1;
  let not = 0;
  let x = [];
  let y = [];
  let tab = [];
  tab.length = 26;
  const pas = 10;
  let here = true;
  for (let i = 0; i < s.length; i++) {
    if ((s[i] >= "A" && s[i] <= "Z") || (s[i] >= "a" && s[i] <= "z")) {
      tab[s[i].charCodeAt() - "A".charCodeAt()] = 1;
    }
  }
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] == 1) {
      result += '{"category":"input","key":"';
      result +=
        String.fromCharCode("A".charCodeAt() + i) +
        '","loc":"' +
        (xi - 500) +
        " " +
        (yi - 100) +
        '"},';
      yi += 100;
      xi -= 30;
    }
  }
  yi = iy;
  xi = ix;
  //Construction des portes logiques(leur positionnement)
  for (let i = 0; i < s.length; i++) {
    if (s[i] == ".") {
      result +=
        '{"category":"and","key":"and' +
        andg +
        '","loc":"' +
        xi +
        " " +
        yi +
        '"}';
      if (i + 2 < s.length || or) result += ",";
      xi += 300;
      andg++;
    } else {
      if (s[i] == "+") {
        x.push(xi - 300);
        y.push(yi);
        if (or) {
          result +=
            '{"category":"or", "key":"or' +
            org +
            '","loc":"' +
            (Math.max(x[0], x[1]) + 100) +
            " " +
            ((y[0] + y[1]) / 2 + 30) +
            '"},';
          org++;
          x.splice(0, 1);
          y.splice(0, 1);
        }
        xi = ix;
        yi += 200;
        or = true;
        here = true;
      } else {
        if (s[i] == "'") {
          if (i - 2 >= 0 && s[i - 2] == "+") {
            result +=
              '{"category":"not","key":"not' +
              not +
              '","loc":"' +
              (xi - 300) +
              " " +
              (yi - 50) +
              '"}';
          } else {
            if (i - 2 >= 0 && s[i - 2] == ".") {
              if (here) {
                result +=
                  '{"category":"not","key":"not' +
                  not +
                  '","loc":"' +
                  (xi - 450) +
                  " " +
                  (yi - pas + 50) +
                  '"}';
                here = false;
              } else {
                here = true;
                result +=
                  '{"category":"not","key":"not' +
                  not +
                  '","loc":"' +
                  (xi - 450) +
                  " " +
                  (yi + 50) +
                  '"}';
              }
            } else {
              if (i - 2 < 0 && i + 1 < s.length) {
                if (s[i + 1] == ".") {
                  result +=
                    '{"category":"not","key":"not' +
                    not +
                    '","loc":"' +
                    (xi - 150) +
                    " " +
                    (yi - 50) +
                    '"}';
                } else {
                  if (s[i + 1] == "+") {
                    result +=
                      '{"category":"not","key":"not' +
                      not +
                      '","loc":"' +
                      (xi - 300) +
                      " " +
                      (yi - 50) +
                      '"}';
                  }
                }
              }
            }
          }
          if (i + 2 < s.length || or) result += ",";
          not++;
        }
      }
    }
  }
  if (or) {
    x.push(xi - 300);
    y.push(yi);
    result +=
      '{"category":"or", "key":"or' +
      org +
      '","loc":"' +
      (Math.max(x[0], x[1]) + 100) +
      " " +
      ((y[0] + y[1]) / 2 + 30) +
      '"},';
    result +=
      '{"category":"output", "key":"output1' +
      '","loc":"' +
      (Math.max(x[0], x[1]) + 200) +
      " " +
      ((y[0] + y[1]) / 2 + 30) +
      '"}';
    x = [];
    y = [];
  } else {
    if (andg > 1 || not > 0) result += ",";
    result +=
      '{"category":"output", "key":"output1' +
      '","loc":"' +
      xi +
      " " +
      yi +
      '"}';
  }
  //Faire les liaisons entre les portes
  result += "]";
  result += ',"linkDataArray":[';
  let firstand = true;
  let firstor = true;
  let ngates = 0;
  let rgates = 0;
  not = 0;
  for (
    let i = 0;
    i < s.length;
    i++ //the input
  ) {
    if (s[i] == "+" || s[i] == "." || s[i] == "'") {
      if (s[i] == "'") {
        result += '{"from":"';
        result += s[i - 1];
        result += '","fromPort":"out","to":"not' + not + '","toPort":"in"},';
        not++;
      } else {
        if (s[i] == ".") {
          if (i - 2 >= 0) {
            if (s[i - 2] == "+") {
              result += '{"from":"';
              result += s[i - 1];
              result +=
                '","fromPort":"out","to":"and' +
                (ngates + 1) +
                '","toPort":"in1"},';
            } else {
              if (s[i - 2] == ".") {
                result += '{"from":"';
                result += s[i - 1];
                result +=
                  '","fromPort":"out","to":"and' +
                  ngates +
                  '","toPort":"in2"},';
              }
            }
          } else {
            result += '{"from":"';
            result += s[i - 1];
            result +=
              '","fromPort":"out","to":"and' +
              (ngates + 1) +
              '","toPort":"in1"},';
          }
          ngates++;
        } else {
          if (s[i] == "+") {
            if (i - 2 >= 0) {
              if (s[i - 2] == ".") {
                result += '{"from":"';
                result += s[i - 1];
                result +=
                  '","fromPort":"out","to":"and' +
                  ngates +
                  '","toPort":"in2"},';
              } else {
                if (s[i - 2] == "+") {
                  result += '{"from":"';
                  result += s[i - 1];
                  result +=
                    '","fromPort":"out","to":"or' +
                    rgates +
                    '","toPort":"in2"},';
                }
              }
            } else {
              result += '{"from":"';
              result += s[i - 1];
              result +=
                '","fromPort":"out","to":"or' +
                (rgates + 1) +
                '","toPort":"in1"},';
            }
            rgates++;
          }
        }
      }
    }
  }
  if ((s.length - 2 > 0 && s[s.length - 2] == "+") || s[s.length - 2] == ".") {
    if (s[s.length - 2] == "+") {
      result += '{"from":"';
      result += s[s.length - 1];
      result += '","fromPort":"out","to":"or' + rgates + '","toPort":"in2"},';
    } else if (s[s.length - 2] == ".") {
      result += '{"from":"';
      result += s[s.length - 1];
      result += '","fromPort":"out","to":"and' + ngates + '","toPort":"in2"},';
    }
  }
  ngates = 0;
  rgates = 1;
  not = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == ".") {
      if (!firstand) {
        result +=
          '{"from":"and' +
          ngates +
          '","fromPort":"out","to":"and' +
          (ngates + 1) +
          '","toPort":"in1"},';
      } else firstand = false;
      ngates++;
    } else {
      if (s[i] == "+") {
        if (!firstor) {
          if (ngates > 0 && !firstand)
            result +=
              '{"from":"and' +
              ngates +
              '","fromPort":"out","to":"or' +
              rgates +
              '","toPort":"in2"},';
          rgates++;
        } else {
          if (ngates > 0 && !firstand)
            result +=
              '{"from":"and' +
              ngates +
              '","fromPort":"out","to":"or' +
              rgates +
              '","toPort":"in1"},';
          firstor = false;
        }
        firstand = true;
      } else {
        if (s[i] == "'") {
          result += '{"from":"not' + not + '","fromPort":"out","to":';
          if (i - 2 >= 0) {
            if (s[i - 2] == ".") {
              //join avec and
              result += '"and' + ngates + '","toPort":"in2"},';
            } else {
              if (s[i - 2] == "+") {
                if (i + 1 < s.length) {
                  if (s[i + 1] == "+") {
                    //join avec ou
                    result += '"or' + rgates + '","toPort":"in2"},';
                  } else {
                    if (s[i + 1] == ".") {
                      //join avec and+1
                      result += '"and' + (ngates + 1) + '","toPort":"in1"},';
                    }
                  }
                } else {
                  //join avec ou
                  result += '"or' + rgates + '","toPort":"in2"},';
                }
              }
            }
          } else {
            if (i + 1 < s.length) {
              if (s[i + 1] == "+") {
                //join avec ou
                result += '"or' + rgates + '","toPort":"in1"},';
              } else {
                if (s[i + 1] == ".") {
                  //join avec and+1
                  result += '"and' + (ngates + 1) + '","toPort":"in1"},';
                }
              }
            } else {
              result += '"output1","toPort":""}';
            }
          }
          not++;
        }
      }
    }
  }
  let orgates = 1;
  while (orgates < org) {
    result +=
      '{"from":"or' +
      orgates +
      '","fromPort":"out","to":"or' +
      (orgates + 1) +
      '","toPort":"in1"},';
    orgates++;
  }
  if (!firstor) {
    result +=
      '{"from":"or' +
      orgates +
      '","fromPort":"out","to":"output1' +
      '","toPort":""}';
    if (!firstand)
      result +=
        ',{"from":"and' +
        ngates +
        '","fromPort":"out","to":"or' +
        org +
        '","toPort":"in2"}';
  } else {
    if (!firstand)
      result +=
        '{"from":"and' +
        ngates +
        '","fromPort":"out","to":"output1' +
        '","toPort":""}';
  }
  result += "]}";
  return result;
}
window.addEventListener("DOMContentLoaded", () => {
  // Le code qui sera exécuté lorsque la page sera préte
  getResult(); //Effectuer la simplification
  //---------------Initialisations des variables d'affichages les bouttons , les menus...etc
  let afficher = false;
  let tr = false;
  let body = document.getElementById("body");
  let trac = document.getElementById("trace");
  let cacher = document.getElementById("cacher");
  let sidemenu = document.querySelectorAll(".btn");

  cacher.addEventListener("click", () => {
    // An event pour cacher le menu de la trace
    body.style.display = "none";
    cacher.style.display = "none";
    afficher = false;
    for (let i = 0; i < sidemenu.length; i++) {
      sidemenu[i].style.display = "none";
    }
  });
  trac.addEventListener("click", () => {
    // Pour afficher la trace onClick
    if (tr == false) {
      Trace();

      trace();
      tr = true;
      tPremier = null;
    }

    body.style.display = "block";
    afficher = true;
    if (afficher == true) {
      for (let i = 0; i < sidemenu.length; i++) {
        sidemenu[i].style.display = "block";
      }
    } else
      for (let i = 0; i < sidemenu.length; i++) {
        sidemenu[i].style.display = "none";
      }
  });
});
