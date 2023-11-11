
let board:number[][];
let score = 0;
let rows = 4;
let columns = 4


window.onload = function (){
    setGame();
}

function setGame(){
board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {

        let tile = document.createElement('div')
        tile.id = r.toString() + "-"+ c.toString();
        let num:any = board[r][c]
        updateTile(tile,num)
        document.getElementById("board")!.append(tile);
    }    
}

setTwo()
setTwo()

}


function hasEmptyTile(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true
            }
        }
    }
    return false
}


function setTwo(){

if (!hasEmptyTile()) {
    return
}

    let found = false
    while (!found){
        let r = Math.floor(Math.random()* rows)
        let c = Math.floor(Math.random()* columns)

        if(board[r][c] == 0 ){
            board[r][c] = 2
            let tile = document.getElementById(r.toString() + "-" + c.toString()) 
            tile!.innerText = "2"
            tile!.classList.add("x2")
            found = true
        }
    }
}




function updateTile(tile:HTMLDivElement,num:any){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0 ) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+ num.toString())
        }else{
            tile.classList.add("x8192")
        }

    }
}
document.addEventListener("keyup", (e)=> {
    if (e.code == "ArrowLeft") {
        slideLeft()
        setTwo()

    }
    else if (e.code == "ArrowRight") {
        slideRight()
        setTwo()

    }
    else if (e.code == "ArrowUp") {
        slideUp()
        setTwo()

    }
    else if (e.code == "ArrowDown") {
        slideDown()
        setTwo()
    }
    document.getElementById("score")!.innerText = score.toString() 
})


function filterZero(row:any){
    return row.filter((num:number) => num != 0 )
}

function slide(row:any){
    // [0,2,2,2]
    row = filterZero(row)//[2,2,2]

    //slide
    for (let i = 0; i < row.length-1; i++) {
       //check every 2
       if (row[i] == row[i+1]) {
        row[i] *= 2
        row[i+1]= 0
        score += row[i]
       }
        
    }
    row = filterZero(row)//[4,2]

//add zero like [4,2,0,0]
while (row.length < columns) {
    row.push(0)
}

return row

}


function slideLeft(){
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row = slide(row)
        board[r] = row


        for (let c = 0 ; c < columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLDivElement
            let num = board[r][c]
            if (tile !== null){
                updateTile(tile,num)
            }
        }
    }
}


function slideRight(){
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row.reverse()
        row = slide(row)
        row.reverse()
        
        board[r] = row


        for (let c = 0 ; c < columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLDivElement
            let num = board[r][c]
            if (tile !== null){
                updateTile(tile,num)
            }
        }
    }
}


function slideUp(){
    for (let c = 0; c < columns; c++) {
        let row = [ board[0][c], board[1][c], board[2][c], board[3][c] ]
        row = slide(row)
        board[0][c] = row[0]
        board[1][c] = row[1]
        board[2][c] = row[2]
        board[3][c] = row[3]

        for (let r = 0 ; r < rows ; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLDivElement
            let num = board[r][c]
            if (tile !== null){
                updateTile(tile,num)
            }
        }

    }
}



function slideDown(){
    for (let c = 0; c < columns; c++) {
        let row = [ board[0][c], board[1][c], board[2][c], board[3][c] ]
        row.reverse()
        row = slide(row)
        row.reverse()

        board[0][c] = row[0]
        board[1][c] = row[1]
        board[2][c] = row[2]
        board[3][c] = row[3]

        for (let r = 0 ; r < rows ; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLDivElement
            let num = board[r][c]
            if (tile !== null){
                updateTile(tile,num)
            }
        }

    }
}






///reset 
function resetGame() {
    // Reset the board, score, and update the UI
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    score = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLDivElement;
            updateTile(tile, 0);

        }
    }

    // Add new tiles to the board
    setTwo();
    setTwo();

    // Update the score display
    document.getElementById("score")!.innerText = score.toString();
}

const resetButton = document.getElementById("repeat");
resetButton!.addEventListener("click", resetGame);










//[popup]
type Popup = HTMLElement | null;
function hide() {
    const popup: Popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('hidden');
    }
}
function show() {
    const popup: Popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('hidden');
    }
}
const crossButton: HTMLElement | null = document.getElementById('cross');
crossButton!.addEventListener('click', hide)




const iBtn: HTMLElement | null = document.getElementById('info')
iBtn!.addEventListener('click', show)



//win loose 
function isWin(): boolean {
    for (const row of board) {
        for (const tile of row) {
            if (tile === 2048) {
                return true;
            }
        }
    }
    return false;
}

function isLoss(): boolean {
    // Check if there are any empty tiles
    if (hasEmptyTile()) {
        return false;
    }

    // Check for adjacent matching tiles in rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1]) {
                return false;
            }
        }
    }

    // Check for adjacent matching tiles in columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }

    return true;
}
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
        checkWinLoss();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
        checkWinLoss();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
        checkWinLoss();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
        checkWinLoss();
    }
    document.getElementById("score")!.innerText = score.toString();
});

function checkWinLoss() {
    if (isWin()) {
        console.log("Congratulations! You've won!");
        const pop = document.getElementById("popup-for-win")
        pop!.addEventListener('click',function (){
pop!.classList.remove("hidden")
        })

    }

    if (isLoss()) {
        alert("Game over! You've lost.");
        const loose = document.getElementById("popup-for-loose")
        loose!.addEventListener('click',function (){
            loose!.classList.remove("hidden")
                    })
    }
}
