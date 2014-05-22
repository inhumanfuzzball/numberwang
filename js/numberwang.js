var numbers;
var answers;
var ops;
var solution;

var selectedx;
var selectedy;

var givenNumbers;

function getNumberwang(startingTileCount,table){
    createGrid(startingTileCount);
    drawTable(numbers,ops,answers,table);
}

function reveal(table){
    drawTable(solution,ops,answers,table);
}

function drawTable(numberGrid,operationsGrid,answerGrid,table){
    
    table.empty();
    
    $("#success").hide();
    $("#fail").hide();
    
    for(var x = 0; x < 3; x++)
    {
        var val = [];
        var row = "<tr>";
        
        for (var y = 0; y < 3; y++)
        {
            val[y] = numberGrid[x][y];
        }

        row = "<tr><td " + ( val[0] > 0 ? "class=\"not\"" : "class=\"editable\"" ) + " id=\"box"+x+"0\">" + val[0] + "</td>";
        row += "<td>" + operationsGrid[0][x][0]  + "</td>";
        row += "<td " + ( val[1] > 0 ? "class=\"not\"" : "class=\"editable\"" ) + " id=\"box"+x+"1\">" + val[1]  + "</td>";
        row += "<td>" + operationsGrid[0][x][1]  + "</td>";
        row += "<td " + ( val[2] > 0 ? "class=\"not\"" : "class=\"editable\"" ) + " id=\"box"+x+"2\">" + val[2]  + "</td>";
        row += "<td>" + answerGrid[0][x]  + "</td></tr>";

        table.append(row);
        
        if(x < 2){
            row = "<tr><td>" + operationsGrid[1][0][x] + "</td><td class=\"na\">&nbsp</td><td>" + operationsGrid[1][1][x] + "</td><td class=\"na\">&nbsp</td><td>" + operationsGrid[1][2][x] + "</td><td class=\"none\">&nbsp</td></tr>";
            table.append(row);
        }else{
            row = "<tr><td>" + answerGrid[1][0] + "</td><td class=\"none\">&nbsp</td><td>" + answerGrid[1][1] + "</td><td class=\"none\">&nbsp</td><td>" + answerGrid[1][2] + "</td><td class=\"none\">&nbsp</td></tr>";
            table.append(row);
        }
    }
    
    $("td.editable").click(function(event) {
        $("td.editable").removeClass("highlight");
        $(this).addClass( "highlight" );
        selectedx = $(this).attr('id').substr(3,1);
        selectedy = $(this).attr('id').substr(4,1);
    });
}

function createGrid(startingTileCount){
    
    numbers = [ [1,2,3],[4,5,6],[7,8,9] ];
    answers = [ [0,0,0],[0,0,0] ];
    ops = [ [['',''],['',''],['','']] , [['',''],['',''],['','']]];
    numbers = initNumbers();
    
    
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

    $(".numberbutton").removeClass("btn-success btn-warning").addClass("btn-primary");

    givenNumbers = [];
    for(var i = 0; i < 9; i++){
        if(!contains(keepers,i)){
             $("#"+numbers[Math.floor(i/3)][i%3]).removeAttr('disabled');
            numbers[Math.floor(i/3)][i%3] = "";
        }else{
            $("#"+numbers[Math.floor(i/3)][i%3]).addClass("btn-success").attr('disabled','disabled');
            givenNumbers.push(numbers[Math.floor(i/3)][i%3]);
        }
    }

}

function contains(array,check){
    for(var i = 0; i < array.length; i++){
        if(array[i] === check) return true;
    }
    return false;
}

function initNumbers(){
    var numbers = [1,2,3,4,5,6,7,8,9];
    var grid =  [ [0,0,0],[0,0,0],[0,0,0] ];
    for(var x = 0; x < 3; x++){
        for(var y = 0; y < 3; y++){
            var pos = Math.floor(Math.random() * numbers.length);
            var number = numbers[pos];
            numbers.splice(pos, 1);
            grid[x][y] = number;
        }
    }
    
    return grid;
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

function addValue(number){

    if(contains(givenNumbers,number)) return;
    
    if(selectedx !== null && selectedy !== null){

        for(var x = 0; x < 3; x++){
            for(var y = 0; y < 3; y++){
                if(numbers[x][y] === number){
                   numbers[x][y] = "";
                   $("#box"+x+y).text("")
                }
            }
        }
    
        numbers[selectedx][selectedy] = number;
        $("#box"+selectedx+selectedy).text(number);
        $("#"+number).removeClass("btn-primary").addClass("btn-success");
        
        checkVictory();
    }
    
}

function removeValue(){

    if(selectedx !== null && selectedy !== null){
        
        var number = numbers[selectedx][selectedy];
        if(contains(givenNumbers,number)) return;
        
        numbers[selectedx][selectedy] = "";
        $("#box"+selectedx+selectedy).text("");
        $("#"+number).removeClass("btn-success").addClass("btn-primary");
        
        $("#success").hide("slow");
        $("#fail").hide("slow");
    }
}

function checkVictory(){
    
    var filled = true;
    var correct = true;
    for(var x = 0; x < 3; x++){
        for(var y = 0; y < 3; y++){
            if(Number(numbers[x][y]) === 0){
                filled = false;
                correct = false;
                break;
            }else if(numbers[x][y] !== solution[x][y]){
                correct = false;
            }
        }
    }
    
    if(filled && correct){
        $("#success").show("slow");
        $("#fail").hide("slow");
    } 
    else if(filled){
        $("#success").hide("slow");
        $("#fail").show("slow");
    }else{
        $("#success").hide("slow");
        $("#fail").hide("slow");
    }

}