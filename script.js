console.log("Welcome to tic tak toe");
// Intializing all the variables

// To store the current turn 
let turn = "X";  
// To store audio to use when player clicks the box
let audioTurn = new Audio( "songs/turn.wav");
audioTurn.volume = 0.5;
// To check if the game is over or not
let gameover = false;
// To select reset button
let resetButton = document.querySelector("#reset");


// To change the turn variable to the current turn player sign
function changeTurn () {
    return turn === "X"?"O":"X";
}
// To check for win and playing animation of the line 
function checkwin() {
    // To select the text span of the html dom which places X and O
    let boxTexts = document.getElementsByClassName("text");
    
    let win = [
        // First three index are to check for the win combination and the three are to make the line animation on the screen after win
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,-45]

    ]
    // To go throught each array index and in that index array check for the combination of the first three index to be matched with a X or O to declare that player won
    win.forEach(e => {
        if((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[1]].innerText === boxTexts[e[2]].innerText) && boxTexts[e[0]].innerText !== ""){
           // To make text info to the winning player
            document.getElementsByClassName("info")[0].innerText = boxTexts[e[0]].innerText + " Won";
            gameover = true;
            // For the animation for the line after the win
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
        }
    })
}


// game Logic
// To select all the elements of the class box
let box = document.getElementsByClassName("box");
// To make that html collection to an array we use array.from() method and forEach loop go throught each and every element in the html elements array
Array.from(box).forEach(element => {
    // To select the text area in the box which is currently going in the for each loop
    let boxText = element.querySelector(".text");
    // To listen for the click event on the current element going in the for each loop
 element.addEventListener("click",  ()=> {
    // To check the innerText of the boxText of the current element
    if(boxText.innerText === ''){
        // To change the inner text of the current element to turn
        boxText.innerText = turn;
        // To update turn to the opposite sign
        turn = changeTurn();
        // To play turn audio
        audioTurn.play();
        // To check the win
        checkwin();
        // To change the info status to the current playing sign
        if(!gameover){

            document.getElementsByClassName("info")[0].innerText = "Turn of " + turn;
        }

    }
 })
}) 

// To Reset the game by listening to click event on the reset button
resetButton.addEventListener("click",  ()=> {
    // To set all the values to default
   let resetText = document.querySelectorAll(".text");
   Array.from(resetText).forEach(element => {
    element.innerText = "";
   })
    document.getElementsByClassName("info")[0].innerText = "Turn of X" ;
    document.querySelector(".line").style.width = "";
})