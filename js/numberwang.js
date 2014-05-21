var numbers;
var answers;
var ops;
var solution;

function getNumberwang(startingTileCount,table){
    createGrid(startingTileCount);
    drawTable(numbers,ops,answers,table);
}

function reveal(table){
    drawTable(solution,ops,answers,table);
}

function drawTable(numberGrid,operationsGrid,answerGrid,table){
    
    table.empty();
    
    for(var x = 0; x < 3; x++)
    {
        var val = [];
        var row = "<tr>";
        
        for (var y = 0; y < 3; y++)
        {
            val[y] = numberGrid[x][y];
        }

        row = "<tr><td>" + val[0] + "</td><td>" + operationsGrid[0][x][0]  + "</td><td>" + val[1]  + "</td><td>" + operationsGrid[0][x][1]  + "</td><td>" + val[2]  + "</td><td>" + answerGrid[0][x]  + "</td></tr>";
        table.append(row);
        
        if(x < 2){
            row = "<tr><td>" + operationsGrid[1][0][x] + "</td><td class=\"na\">&nbsp</td><td>" + operationsGrid[1][1][x] + "</td><td class=\"na\">&nbsp</td><td>" + operationsGrid[1][2][x] + "</td><td class=\"none\">&nbsp</td></tr>";
            table.append(row);
        }else{
            row = "<tr><td>" + answerGrid[1][0] + "</td><td class=\"none\">&nbsp</td><td>" + answerGrid[1][1] + "</td><td class=\"none\">&nbsp</td><td>" + answerGrid[1][2] + "</td><td class=\"none\">&nbsp</td></tr>";
            table.append(row);
        }
    }
}

function createGrid(startingTileCount){
    
    numbers = [ [1,2,3],[4,5,6],[7,8,9] ];
    answers = [ [0,0,0],[0,0,0] ];
    ops = [ [['',''],['',''],['','']] , [['',''],['',''],['','']]];
    numbers = initNumbers(numbers);
    
    
    //accross
    for(var x = 0; x < 3; x++)
    {
        var val1 = numbers[x][0];
        var val2 = numbers[x][1];
        var val3 = numbers[x][2];
        
        var op1 = getOp(val1,val2);
        var calc1 = calc(val1,val2,op1);
        var op2 = getOp(calc1,val3);
       
        answers[0][x] = calc(calc1,val3,op2);
        ops[0][x][0] = op1;
        ops[0][x][1] = op2;
    }
    
    for(var y = 0; y < 3; y++)
    {
        var val1 = numbers[0][y];
        var val2 = numbers[1][y];
        var val3 = numbers[2][y];
        
        var op1 = getOp(val1,val2);
        var calc1 = calc(val1,val2,op1);
        var op2 = getOp(calc1,val3);

        answers[1][y] = calc(calc1,val3,op2);
        ops[1][y][0] = op1;
        ops[1][y][1] = op2;
    }
    
    solution = $.extend(true, [], numbers);
    
    var keepers = [];
    while(keepers.length < startingTileCount){
        var pos = Math.floor(Math.random() * 9);
        if(contains(keepers,pos)) continue;
        keepers.push(pos);
    }

    for(var i = 0; i < 9; i++){
        if(!contains(keepers,i)){
            numbers[Math.floor(i/3)][i%3] = "";
        }
    }

}

function contains(array,check){
    for(var i = 0; i < array.length; i++){
        if(array[i] === check) return true;
    }
    return false;
}

function initNumbers(o){
    var numbers = [1,2,3,4,5,6,7,8,9];
    
    for(var x = 0; x < 3; x++){
        for(var y = 0; y < 3; y++){
            var pos = Math.floor(Math.random() * numbers.length);
            var number = numbers[pos];
            numbers.splice(pos, 1);
            o[x][y] = number;
        }
    }
    
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getOp(num1,num2){
    //÷
    var op= '+-×';
    if(num1%num2 === 0)
    {
        op = op + '÷';
    }
    
    var pos = Math.floor(Math.random() * op.length);
    op = op.substring(pos,pos+1);

    return op;
}

function calc(num1,num2,op){
    switch(op){
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '÷':
            return num1 / num2;
        case '×':
            return num1 * num2;
    }
};