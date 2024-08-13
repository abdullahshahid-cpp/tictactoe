function createCircleSVG(size) 
{
    const svgNS = "http://www.w3.org/2000/svg";

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

    // Create circle element
    const radius = size / 2 - 10; // Adjust radius as needed
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", size / 2);
    circle.setAttribute("cy", size / 2);
    circle.setAttribute("r", radius);
    circle.setAttribute("stroke", "rgb(102, 217, 255)");
    circle.setAttribute("stroke-width", "4");
    circle.setAttribute("fill", "none");

    // Append circle to SVG
    svg.appendChild(circle);

    return svg;
}

function createCrossSVG(size) 
{
    const svgNS = "http://www.w3.org/2000/svg";

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

    // Create lines for the cross
    const padding = 10;
    const lineLength = size - 2 * padding;
    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", padding);
    line1.setAttribute("y1", padding);
    line1.setAttribute("x2", size - padding);
    line1.setAttribute("y2", size - padding);
    line1.setAttribute("stroke", "rgb(102, 217, 255)");
    line1.setAttribute("stroke-width", "4");

    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", size - padding);
    line2.setAttribute("y1", padding);
    line2.setAttribute("x2", padding);
    line2.setAttribute("y2", size - padding);
    line2.setAttribute("stroke", "rgb(102, 217, 255)");
    line2.setAttribute("stroke-width", "4");

    // Append lines to SVG
    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}

var displayBoard = document.getElementById("display-board");
var playBtn = document.getElementById("play-btn");
var playersInfoDiv = document.getElementById("players-info");
var gameBoard = document.getElementById("game-board");

var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");

var circleSVG = createCircleSVG(45);
var crossSVG = createCrossSVG(45);

var playerTurn; 

playBtn.addEventListener("click", function () {
    if (player1.value !== "" && player2.value !== "") 
    {
        playerTurn = document.createElement("p");
        playerTurn.appendChild(document.createTextNode(player1.value));
        playerTurn.appendChild(circleSVG);
        playerTurn.className = "name";
        playerTurn.id = "player-turn";

        displayBoard.removeChild(playersInfoDiv);
        gameBoard.style.display = "grid";

        var nameDiv = document.createElement("div");
        nameDiv.id = "name-div";
        nameDiv.appendChild(playerTurn);
        nameDiv.className = "players-name";

        displayBoard.prepend(nameDiv);
    }
});

function addSVG(svg, item) 
{
    item.appendChild(svg.cloneNode(true));
}

function updateBoard(board, turn, box)
{
    if (turn) 
        board[box[4]][box[5]] = 1;
    else
        board[box[4]][box[5]] = 2;
}

function enlighten(grids)
{
    for(let i = 0; i<grids.length; i++)
        gameBoard.childNodes[grids[i]*2 + 1].firstChild.firstChild.setAttribute("stroke", "rgb(2 255 113)")
}

function checkWin(board) 
{
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2])
    {    
        enlighten([0, 1, 2]);
        return true;
    }
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2])
    {    
        enlighten([3, 4, 5]);
        return true;
    }
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2])
    {    
        enlighten([6, 7, 8]);
        return true;
    }
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0])
    {    
        enlighten([0, 3, 6]);
        return true;
    }
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1])
    {    
        enlighten([1, 4, 7]);
        return true;
    }
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2])
    {    
        enlighten([2, 5, 8]);
        return true;
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2])
    {    
        enlighten([0, 4, 8]);
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    {    
        enlighten([2, 4, 6]);
        return true;
    }
    
    return false;
}

function displayResult(board, count) 
{
    if (checkWin(board)) 
    {
        playerTurn.appendChild(document.createTextNode(" wins"))  
        isGameFinished = true;
    } 
    else if (count === 9) 
    {
        while(playerTurn.firstChild)
            playerTurn.removeChild(playerTurn.firstChild);
        
        playerTurn.appendChild(document.createTextNode("Draw"))
        isGameFinished = true;
    }
}

var ticTacToe = [
    [-1, -2, -3],
    [-4, -5, -6],
    [-7, -8, -9],
];

var gridItems = document.querySelectorAll(".grid-item");
var turn = true;
var isGameFinished = false;
var count = 0;

for (let i = 0; i < gridItems.length; i++) 
{
    gridItems[i].addEventListener("click", function () {
        if (!gridItems[i].hasChildNodes() && !isGameFinished) 
        {
            if (turn) 
            {
                addSVG(circleSVG, gridItems[i]);
                updateBoard(ticTacToe, turn, gridItems[i].id);
                count++;

                displayResult(ticTacToe, count);

                turn = !turn;
                if(!isGameFinished)
                {
                    playerTurn.firstChild.textContent = player2.value;
                    playerTurn.removeChild(playerTurn.childNodes[1])
                    playerTurn.appendChild(crossSVG)
                }

            }
            else
            {
                addSVG(crossSVG, gridItems[i]);
                updateBoard(ticTacToe, turn, gridItems[i].id);
                count++;

                displayResult(ticTacToe, count);

                turn = !turn;
                
                if(!isGameFinished)
                {
                    playerTurn.firstChild.textContent = player1.value
                    playerTurn.removeChild(playerTurn.childNodes[1])
                    playerTurn.appendChild(circleSVG)
                }
            }
        }
    });
}