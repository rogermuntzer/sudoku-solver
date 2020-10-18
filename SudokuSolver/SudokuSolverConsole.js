// Put Values Here ------------------
var rowIn0 = [0,0,0,  0,0,0,  0,0,0];
var rowIn1 = [0,0,0,  0,0,0,  0,0,0];
var rowIn2 = [0,0,0,  0,0,0,  0,0,0];

var rowIn3 = [0,0,0,  0,0,0,  0,0,0];
var rowIn4 = [0,0,0,  0,0,0,  0,0,0];
var rowIn5 = [0,0,0,  0,0,0,  0,0,0];

var rowIn6 = [0,0,0,  0,0,0,  0,0,0];
var rowIn7 = [0,0,0,  0,0,0,  0,0,0];
var rowIn8 = [0,0,0,  0,0,0,  0,0,0];
// ----------------------------------

// Copy and paste in for new board---
/*
var rowIn0 = [0,0,0,  0,0,0,  0,0,0];
var rowIn1 = [0,0,0,  0,0,0,  0,0,0];
var rowIn2 = [0,0,0,  0,0,0,  0,0,0];

var rowIn3 = [0,0,0,  0,0,0,  0,0,0];
var rowIn4 = [0,0,0,  0,0,0,  0,0,0];
var rowIn5 = [0,0,0,  0,0,0,  0,0,0];

var rowIn6 = [0,0,0,  0,0,0,  0,0,0];
var rowIn7 = [0,0,0,  0,0,0,  0,0,0];
var rowIn8 = [0,0,0,  0,0,0,  0,0,0];
*/
// ----------------------------------

// Build the full sudoku array "s"
var s = rowIn0.concat(rowIn1, rowIn2, rowIn3, rowIn4, rowIn5, rowIn6, rowIn7, rowIn8);

// Duplicates the "s" array for a changeable array
var sudoku = [];
for (i=0; i<s.length; i++) {
  sudoku[i] = s[i];
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
    if (sudoku[i] == 0) {
        sudokuDef.push(0)
    } else {
        sudokuDef.push(1)
    }
}

var i = 0;
var percent = 0;

// Works out each answer
for (i=0; i<=80; i++) {

    // Gives you the percentage of solve progress
    if (i>percent) {
        percent++;
        percent100 = Math.trunc((percent/80)*100);
        console.log("Percent Completed: " + percent100)}

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
}

// Formats the output
console.log("")
for (i=0; i<=8; i++) {
    console.log(sudoku[i*9],sudoku[(i*9)+1],sudoku[(i*9)+2] + "   " + sudoku[(i*9)+3],sudoku[(i*9)+4],sudoku[(i*9)+5] + "   " + sudoku[(i*9)+6],sudoku[(i*9)+7],sudoku[(i*9)+8])
    if (i==2 || i==5) { console.log ("")}
}