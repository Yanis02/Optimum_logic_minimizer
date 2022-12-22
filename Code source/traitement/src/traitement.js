//Cette partie du code concerne les intérations du l'utilisateur avec la page du traitement ainsi que la vérification syntaxique
//Pour pouvoire lire la description de chaque fonction veuillez ouvrire la fonction et lire les commentaires , Merci pour votre compréhension!

/******Variables globales */
//La prise des éléments de la page
const inp = document.getElementById("fonction");
const simplify = document.querySelector("#simplifier");
const ou = document.getElementById("ou");
const et = document.getElementById("et");
const non = document.getElementById("non");
//Variables pour faire intéragir les bouttons ou/et/non
var focus1 = false;
var focus2 = false;
//Creation d'un evénement "input"
var evt = new Event("input");
//Creation et initialisation de la variable qui contient un message d'erreur
var e = document.createElement("p");
document.querySelector(".container").appendChild(e);
e.style.display = "none";

//***************Clear button */
//Creation du boutton Clear pur le 1er champ
inp.addEventListener("input", clearfunc);
function clearfunc() {
  const clr = document.querySelector(".clearfunc");
  if (inp.value.length > 0) {
    clr.style.display = "inline";
    console.log("afficher");
    clr.addEventListener("click", () => {
      inp.value = "";
      clr.style.display = "none";
      e.style.display = "none";
    });
  } else {
    clr.style.display = "none";
    console.log("cacher");
  }
}
//Creation du boutton Clear pur le 2eme champ (dontcare)

const dont = document.getElementById("dontcare");
dont.addEventListener("input", cleardont);
function cleardont() {
  const clr = document.querySelector(".cleardont");
  if (dont.value.length > 0) {
    clr.style.display = "inline";
    console.log("afficher");
    clr.addEventListener("click", () => {
      dont.value = "";
      clr.style.display = "none";
      e.style.display = "none";
    });
  } else {
    clr.style.display = "none";
    console.log("cacher");
  }
}

/*****verification syntaxique */
// Le mode littérale
function isOperand(c) {
  //Verifier si un caractère est une opérande ou pas
  if (c.charCodeAt() >= "A".charCodeAt() && c.charCodeAt() <= "Z".charCodeAt())
    return true;
  if (c.charCodeAt() >= "a".charCodeAt() && c.charCodeAt() <= "z".charCodeAt())
    return true;
  return false;
}
function isOperator(c) {
  //Verifier si un caractère est un opérateur ou pas
  if (c == "+" || c == "." || c == "(" || c == ")" || c == "'") return true;
  return false;
}
function without_blank(input) {
  //Fonction qui supprime tout les espaces dans l'expression donnée
  input2 = "";
  for (i = 0; i < input.length; i++) {
    if (input.charAt(i) == " ") continue;
    input2 = input2 + input.charAt(i);
  }
  return input2;
}
//Fonctions du NAND et NOR à ajouter si on aura le temps
function NAND(ch1, ch2) {
  //Effectuer le NAND logique
  return Not(AND(ch1, ch2));
}
function NOR(ch1, ch2) {
  //Effectuer le NAND logique
  return Not(OR(ch1, ch2));
}
function traitement_algebrique1(input) {
  // Le main de la vérification syntaxique littérale
  if (input == null || input.length == 0) return false;
  let parentheses = 0;
  let input2 = input;
  if (input2.length == 0) return false;
  if (!isOperand(input.charAt(0)) && input.charAt(0) != "(") {
    e.innerText = "Commencez avec une opérende !";
    return false;
  }
  for (let i = 0; i < input2.length; i++) {
    if (isOperand(input2.charAt(i)) || isOperator(input2.charAt(i))) {
      if (isOperand(input2.charAt(i))) {
        if (
          i + 1 < input2.length &&
          (!isOperator(input2.charAt(i + 1)) || input2.charAt(i + 1) == "(")
        ) {
          if (!isOperator(input2.charAt(i + 1))) {
            e.innerText = "Entrez un opérateur ou enlevez l'espace!";
            return false;
          }

          if (input2.charAt(i + 1) == "(") {
            e.innerText = "Entrez un opérateur avant le parenthèse !";
            return false;
          }
          return false;
        }
      } else {
        if (i + 1 < input2.length) {
          if (
            input2.charAt(i) == "+" &&
            !(isOperand(input2.charAt(i + 1)) || input2.charAt(i + 1) == "(")
          ) {
            e.innerText = "Entrez une opérande ou enlevez l'espace! !";
            return false;
          }
          if (
            input2.charAt(i) == "." &&
            !(isOperand(input2.charAt(i + 1)) || input2.charAt(i + 1) == "(")
          ) {
            e.innerText = "Entrez une opérande ou enlevez l'espace! !";
            return false;
          }

          if (
            input2.charAt(i) == "'" &&
            (!isOperator(input2.charAt(i + 1)) ||
              input2.charAt(i + 1) == "'" ||
              input2.charAt(i + 1) == "(")
          ) {
            e.innerText = "Entrez une opérande ou enlevez l'espace! !";

            return false;
          }

          if (input2.charAt(i) == "(") {
            if (
              !(isOperand(input2.charAt(i + 1)) || input2.charAt(i + 1) == "(")
            ) {
              e.innerText = "Format non autorisé !";

              return false;
            }

            parentheses++;
          }
          if (input2.charAt(i) == ")") {
            if (
              !isOperator(input2.charAt(i + 1)) ||
              input2.charAt(i + 1) == "("
            ) {
              e.innerText = "Format non autorisé !";

              return false;
            }
            parentheses--;
          }
        } else {
          if (
            isOperator(input2.charAt(i)) &&
            input2.charAt(i) != ")" &&
            input2.charAt(i) != "'"
          ) {
            e.innerText = "";
            return false;
          }

          if (
            !(
              input2.charAt(i) == ")" ||
              input2.charAt(i) == "'" ||
              isOperator(input2.charAt(i))
            )
          ) {
            e.innerText =
              "Supprimez le dernier caractère ou ajoutez une opérande !";
            return false;
          } else if (input2.charAt(i) == ")") parentheses--;
        }
      }
    } else return false;
  }
  if (parentheses != 0) {
    e.innerText = "Parenthèse non fermé !";
    return false;
  }
  return true;
}
//Le mode numérique
function isNumber(c) {
  //Vérifier si un caractère est un chiffre
  if (c.charCodeAt() >= "0".charCodeAt() && c.charCodeAt() <= "9".charCodeAt())
    return true;

  return false;
}
function isSeparator(c) {
  //Vérifier si un caractère est un séparateur
  if (c == ",") return true;
  return false;
}

function traitement_numerique(input) {
  //Le main de la vérification syntaxique numérique
  if (input == null || input.length == 0) return false;
  if (!isNumber(input.charAt(0))) {
    e.innerText = "Commencez avec un minterm";
    return false;
  }
  let input2 = input;
  if (input2.length == 0) return false;
  for (let i = 0; i < input2.length; i++) {
    if (isNumber(input2.charAt(i)) || isSeparator(input2.charAt(i))) {
      if (isNumber(input2.charAt(i))) {
        if (
          i + 1 < input2.length &&
          !isNumber(input2.charAt(i + 1)) &&
          !isSeparator(input2.charAt(i + 1))
        ) {
          e.innerText = "Caractère non autorisé !";
          return false;
        }
      } else {
        if (i + 1 < input2.length) {
          if (
            isSeparator(input2.charAt(i)) &&
            !isNumber(input2.charAt(i + 1))
          ) {
            e.innerText = "Entrez un minterm !";
            return false;
          }
        }
      }
    } else {
      e.innerText = "Format non autorisé !";
      return false;
    }
  }
  if (!isNumber(input2[input2.length - 1])) {
    e.innerText = "";
    return false;
  }
  return true;
}

/***********Implémentation de la vérification syntaxique dans la page (affichage du message d'erreur) */

function validation_numerique(target) {
  //Pour le cas numérique
  if (!traitement_numerique(target.value)) {
    if (target.value.length != 0) {
      if (target.id == "fonction") {
        e.id = "errorF";
      } else {
        e.id = "errorD";
      }
      e.style.display = "inline";
    } else {
      e.style.display = "none";
    }
  } else {
    e.style.display = "none";
  }
}
function validation_algebrique(target) {
  //Pour le cas littérale
  if (!traitement_algebrique1(target.value)) {
    if (target.value.length != 0) {
      if (target.id == "fonction") {
        e.id = "errorF";
      } else {
        e.id = "errorD";
      }
      e.style.display = "inline";
    } else {
      e.style.display = "none";
    }
  } else {
    e.style.display = "none";
  }
}
//************Verification si l'utilisateur a entré des dontCares qui n'existent pas dans la fonction (cette fonction n'a pas été utilisée) */
function formNum() {
  let tab = inp.value.split(",");
  let tab2 = dont.value.split(",");
  for (let i = 0; i < tab2.length; i++) {
    if (!tab.includes(tab2[i])) {
      return false;
    }
  }
  return true;
}
function formLit() {
  let exp = Disjonctive(inp.value);
  let dc = Disjonctive(dont.value);
  let tab = exp.split("+");
  let tab1 = dc.split("+");
  for (let i = 0; i < tab1.length; i++) {
    if (!tab.includes(tab1[i])) {
      return false;
    }
  }
  return true;
}

function Disjonctive(expression) {
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
function OPERATION(operand1, operand2, ch) {
  if (ch == "+") {
    return OR(operand1, operand2);
  }
  if (ch == ".") {
    return AND(operand1, operand2);
  }
}
function Not(expression) {
  //Provide the negation of an expression
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
function OR(ch1, ch2) {
  return ch1 + "+" + ch2;
}
function AND(ch1, ch2) {
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
    // ‘(‘, push it to the stack.
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
function prec(c) {
  if (c == "*") return 3;
  else if (c == ".") return 2;
  else if (c == "+") return 1;
  else return -1;
}
/////************************************************************ */
let input = document.getElementById("fonction");
let dontc = document.getElementById("dontcare");
//***************Load des fonctionalitées de la page*/
window.addEventListener("DOMContentLoaded", function () {
  //-----------------------------------------
  //mode par defaut (littérale)
  const clr = document.querySelector(".clearfunc");
  const clr2 = document.querySelector(".cleardont");

  inp.addEventListener("input", () => {
    validation_algebrique(inp);
  });
  dont.addEventListener("input", () => {
    validation_algebrique(dont);
  });

  simplify.addEventListener("click", Get_lit);
  function Get_lit() {
    var expression = document.getElementById("fonction").value;
    var dontcare = document.getElementById("dontcare").value;
    if (
      (traitement_algebrique1(expression) &&
        traitement_algebrique1(dontcare)) ||
      (traitement_algebrique1(expression) && dontcare.length == 0)
    ) {
      localStorage.setItem("fonction", expression);
      localStorage.setItem("dontcare", dontcare);
      location.href = "trace.html";
      e.style.display = "none";
    } else {
      if (expression.length == 0) {
        console.log("vide");
        e.id = "errorF";
        e.innerText = "Expression vide !";
        e.style.display = "inline";
      } else if (!traitement_algebrique1(expression)) {
        e.id = "errorF";
        e.style.display = "inline";

        console.log("gg");
        e.innerText = "Dernier caractère non autorisé";
      } else if (!traitement_algebrique1(dontcare) && dontcare.length != 0) {
        e.id = "errorD";
        e.style.display = "inline";

        e.innerText = "Dernier caractère non autorisé";
      }
    }
  }
  inp.addEventListener("input", () => {
    validation_algebrique(inp);
  });
  dont.addEventListener("input", () => {
    validation_algebrique(dont);
  });

  //mode numerique
  document.getElementById("numerique").addEventListener("click", () => {
    document.querySelector(".logicbtn").style.display = "none";
    document.getElementById("simplifier").style.marginLeft = "37%";
    document.getElementById("simplifier").style.width = "26%";
    e.style.display = "none";

    input.style.border = "2px solid #5c38ff";
    dontc.style.border = "2px solid #5c38ff";

    simplify.addEventListener("click", Get_num);
    function Get_num() {
      var expression = document.getElementById("fonction").value;
      var dontcare = document.getElementById("dontcare").value;
      if (
        (traitement_numerique(expression) && traitement_numerique(dontcare)) ||
        (traitement_numerique(expression) && dontcare.length == 0)
      ) {
        localStorage.setItem("fonction", expression);
        localStorage.setItem("dontcare", dontcare);
        location.href = "trace.html";
        e.style.display = "none";
      } else {
        if (expression.length == 0) {
          console.log("vide");
          e.id = "errorF";
          e.innerText = "Expression vide !";
          e.style.display = "inline";
        } else if (!traitement_numerique(expression)) {
          e.id = "errorF";
          e.style.display = "inline";
          e.innerText = "Dernier caractère non autorisé";
        } else if (!traitement_numerique(dontcare) && dontcare.length != 0) {
          e.id = "errorD";
          e.style.display = "inline";

          e.innerText = "Dernier caractère non autorisé";
        }
      }
    }
    inp.addEventListener("input", () => {
      validation_numerique(inp);
    });
    dont.addEventListener("input", () => {
      validation_numerique(dont);
    });

    document.querySelector("#fonction").placeholder = "Expression numérique"; //modifier le placeholder de l'input
    document.querySelector("#fonction").value = "";
    document.querySelector("#dontcare").value = "";
    clr.style.display = "none";
    clr2.style.display = "none";

    document.querySelector("h5").classList.add("h5num");
    document.querySelector(".choix").classList.add("choixnum");
  });

  //mode littérale
  document.getElementById("litterale").addEventListener("click", () => {
    document.querySelector(".logicbtn").style.display = "inline";
    document.getElementById("simplifier").style.marginLeft = "";
    document.getElementById("simplifier").style.width = "40%";
    e.style.display = "none";
    input.style.border = "2px solid #e33e5a";
    dontc.style.border = "2px solid #e33e5a";

    simplify.addEventListener("click", Get_lit);
    function Get_lit() {
      var expression = document.getElementById("fonction").value;
      var dontcare = document.getElementById("dontcare").value;
      if (
        (traitement_algebrique1(expression) &&
          traitement_algebrique1(dontcare)) ||
        (traitement_algebrique1(expression) && dontcare.length == 0)
      ) {
        localStorage.setItem("fonction", expression);
        localStorage.setItem("dontcare", dontcare);
        location.href = "trace.html";
        e.style.display = "none";
      } else {
        if (expression.length == 0) {
          console.log("vide");
          e.id = "errorF";
          e.innerText = "Expression vide !";
          e.style.display = "inline";
        } else if (!traitement_algebrique1(expression)) {
          e.id = "errorF";
          e.style.display = "inline";

          console.log("gg");
          e.innerText = "Dernier caractère non autorisé";
        } else if (!traitement_algebrique1(dontcare) && dontcare.length != 0) {
          e.id = "errorD";
          e.style.display = "inline";

          e.innerText = "Dernier caractère non autorisé";
        }
      }
    }
    inp.addEventListener("input", () => {
      validation_algebrique(inp);
    });
    dont.addEventListener("input", () => {
      validation_algebrique(dont);
    });

    document.querySelector("#fonction").placeholder = "Expression littérale";
    document.querySelector("#fonction").value = "";
    document.querySelector("#dontcare").value = "";
    clr.style.display = "none";
    clr2.style.display = "none";

    document.querySelector("h5").classList.remove("h5num");
    document.querySelector(".choix").classList.remove("choixnum");
  });

  //Interaction des bouttons avec la page
  inp.addEventListener("focus", () => {
    focus1 = true;
    focus2 = false;
    console.log("inFocus1");
    if (inp.value.length > 0) {
      clr.style.display = "inline";
    }
  });

  dont.addEventListener("focus", () => {
    focus2 = true;
    focus1 = false;
    if (dont.value.length > 0) {
      clr2.style.display = "inline";
    }
    console.log("inFocus2");
  });

  ou.addEventListener("click", () => {
    if (focus1 == true) {
      inp.value += "+";
      inp.dispatchEvent(evt);
    } else if (focus2 == true) {
      dont.value += "+";
      dont.dispatchEvent(evt);
    }
  });

  et.addEventListener("click", () => {
    if (focus1 == true) {
      inp.value += ".";
      inp.dispatchEvent(evt);
    } else if (focus2 == true) {
      dont.value += ".";
      dont.dispatchEvent(evt);
    }
  });
  non.addEventListener("click", () => {
    if (focus1 == true) {
      inp.value += "'";
      inp.dispatchEvent(evt);
    } else if (focus2 == true) {
      dont.value += "'";
      dont.dispatchEvent(evt);
    }
  });
});
