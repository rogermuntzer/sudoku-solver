// Sets the shorthand functions ---------------------------------------------
function $(i) {return document.getElementById(i);}
function _(i) {return eval("$('" + i + "').value")}

// Declares the initial "rowIn" variables as empty arrays -------------------
var rowIn0, rowIn1, rowIn2, rowIn3, rowIn4, rowIn5, rowIn6, rowIn7, rowIn8;
rowIn0 = rowIn1 = rowIn2 = rowIn3 = rowIn4 = rowIn5 = rowIn6 = rowIn7 = rowIn8 = [];

//Starts the function when the button is pushed -----------------------------
function sudokuSolverFunction() {

    // Sets up the rows with whatever has been typed in the boxes -----------
    rowIn0.push(_(0),_(1),_(2),_(3),_(4),_(5),_(6),_(7),_(8));
    rowIn1.push(_(9),_(10),_(11),_(12),_(13),_(14),_(15),_(16),_(17));
    rowIn2.push(_(18),_(19),_(20),_(21),_(22),_(23),_(24),_(25),_(26));
    rowIn3.push(_(27),_(28),_(29),_(30),_(31),_(32),_(33),_(34),_(35));
    rowIn4.push(_(36),_(37),_(38),_(39),_(40),_(41),_(42),_(43),_(44));
    rowIn5.push(_(45),_(46),_(47),_(48),_(49),_(50),_(51),_(52),_(53));
    rowIn6.push(_(54),_(55),_(56),_(57),_(58),_(59),_(60),_(61),_(62));
    rowIn7.push(_(63),_(64),_(65),_(66),_(67),_(68),_(69),_(70),_(71));
    rowIn8.push(_(72),_(73),_(74),_(75),_(76),_(77),_(78),_(79),_(80));

    // Build the initial array "s" ------------------------------------------
    var s = rowIn0.concat(rowIn1, rowIn2, rowIn3, rowIn4, rowIn5, rowIn6, rowIn7, rowIn8);

    // Duplicates the "s" array for a changeable array "sudoku" -------------
    var sudoku = [];
    for (i=0; i<s.length; i++) {
      sudoku[i] = s[i];

      // Also changes the border of the "set" values ------------------------
    //   if (sudoku[i] != "") {$(i).style.cssText = "border-color: black;"}
    //   else {continue}
    }
    // Creates the "columnArray" variable
    var cAInit = [0,1,2,3,4,5,6,7,8];
    var columnArray = cAInit.concat(cAInit,cAInit,cAInit,cAInit,cAInit,cAInit,cAInit,cAInit);
    
    // Creates the "squareArray" variable
    var sAInit1 = [0,0,0,1,1,1,2,2,2]
    var sAInit2 = [3,3,3,4,4,4,5,5,5]
    var sAInit3 = [6,6,6,7,7,7,8,8,8]
    var squareArray = sAInit1.concat(sAInit1,sAInit1,sAInit2,sAInit2,sAInit2,sAInit3,sAInit3,sAInit3)
    
    // Creates an array of 1 and 0 for which boxes are already filled in
    var sudokuDef = [];
    for (i=0; i<=80; i++) {
        if (sudoku[i] == "") {
            sudokuDef.push(0)
        } else {
            sudokuDef.push(1)
        }
    }
    var i = 0;
    var percent = 0;
    
    // Works out each answer
    for (i=0; i<=80; i++) {  

        // Skips the boxes with numbers already inside
        if (sudokuDef[i] == 1) {continue};
        
        // Builds the rows
        for (p=0; p<=8; p++) {
            eval('var row' + p + ' = [' + sudoku[p*9] + ',' + sudoku[(p*9)+1] + ',' + sudoku[(p*9)+2] + ',' + sudoku[(p*9)+3] + ',' + sudoku[(p*9)+4] + ',' + sudoku[(p*9)+5] + ',' + sudoku[(p*9)+6] + ',' + sudoku[(p*9)+7] + ',' + sudoku[(p*9)+8] + ']');
        }
    
        // Builds the columns    
        for (p=0; p<=8; p++) {
            eval('var column' + p + ' = [' + sudoku[p] + ',' + sudoku[p+9] + ',' + sudoku[p+18] + ',' + sudoku[p+27] + ',' + sudoku[p+36] + ',' + sudoku[p+45] + ',' + sudoku[p+54] + ',' + sudoku[p+63] + ',' + sudoku[p+72] + ']');
        }
    
        // Builds the squares
        var z = 0;
        for (p=0; p<=2; p++) {
            var y = p * 27;
            for (x=0; x<=2; x++) {
                eval('var squ' + z + ' = [' + sudoku[y+(x*3)] + ',' +  sudoku[y+((x*3)+1)] + ',' + sudoku[y+((x*3)+2)] + ',' + sudoku[y+(9+(x*3))] + ',' + sudoku[y+(9+((x*3)+1))] + ',' + sudoku[y+(9+((x*3)+2))] + ',' + sudoku[y+(18+(x*3))] + ',' + sudoku[y+(18+((x*3)+1))] + ',' + sudoku[y+(18+((x*3)+2))] + ']');
                z++;
            }
        }
    
        // Creates the "check" variable
        var check = [];
    
        // Puts the values in the correct row into the "check" variable
        var rowNum = Math.trunc(i/9);
        var check = check.concat(eval('row' + rowNum));
    
        // Puts the values in the correct column into the "check" variable
        var columnNum = columnArray[i];
        var check = check.concat(eval('column' + columnNum));
    
        // Puts the values in the correct square into the "check" variable
        var squareNum = squareArray[i];
        var check = check.concat(eval('squ' + squareNum));
    
        // Creates a test value
        var test = sudoku[i];
        if (test=="") {test=1}
        if (test==0) {test++}
        var backtrack = 0;
    
        // Trys values in this box until one works, then puts it in
        for (n=1; n<=10; n++) {
            if (test==10) {
                backtrack = 1
                break;
            }
            if (check.includes(test)) {
                test++;
                continue}
            else {
                sudoku[i] = test;
                break;
            }
        }
    
        // Backtracks if the "n" loop reaches 10
        if (backtrack == 1) {
            sudoku[i] = 0;
            i--;
            for (n=0; n<=80; n++) {
                if (sudokuDef[i] == 1) {
                    i--;
                    continue }
                else { 
                    i--;
                    break }
            }
        }

        // Formats the output
        var outputFormatter1 = "";
        var outputFormatter2 = "";

        eval(outputFormatter1 = "'" + sudoku[i] + "'");
        eval(outputFormatter2 = "'" + i + "'");
        eval("$(" + outputFormatter2 + ").value = +" + outputFormatter1);
    }
    rowIn0 = [];
    rowIn1 = [];
    rowIn2 = [];
    rowIn3 = [];
    rowIn4 = [];
    rowIn5 = [];
    rowIn6 = [];
    rowIn7 = [];
    rowIn8 = [];    
}