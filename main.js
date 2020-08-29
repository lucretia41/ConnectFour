// thanks to Matt Zamora for helping me figure out some of the issues with table, alert and draw fucntion and especially colormatching function


let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let tableSlot = document.querySelectorAll('.slot');

const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

for (let index = 0; index < tableCell.length; index++) {
    tableCell[index].addEventListener('click', (event) => {
        console.log(`${event.target.parentElement.rowIndex}, ${event.target.cellIndex}`)
    })
}

while (!player1) {
    var player1 = prompt('PlayerOne: Enter Your Name. You Are Red');

}

player1Color = 'red';

while (!player2) {
    var player2 = prompt('Player Two Enter Your Name. You are Yellow');
}

player2Color = 'yellow';

let currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`;


Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(event) {
    let column = event.target.cellIndex;
    let row = [];

    for (let index = 5; index > -1; index--) {
        if (tableRow[index].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[index].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if (horizontalCheck() || veritcalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player1}wins!`;
                    playerTurn.style.color = player1Color;
                    return (alert(`${player1} Wins!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = 'Draw!';
                    return alert('DRAW');
                } else {
                    playerTurn.textContent = `${player2}'s turn! `;
                    return currentPlayer = 2;
                }

            } else {
                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = `${player1}'s turn!`
                if (horizontalCheck() || veritcalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player2} wins!`;
                    playerTurn.style.color = player1Color;
                    return (alert(`${player2} Wins!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = 'Draw!';
                    return alert('DRAW');
                } else {
                    playerTurn.textContent = `${player1}'s turn! `;
                    return currentPlayer = 1;

                }

            }
        }
    }
    function colorMatchCheck(one, two, three, four) {
        return (one == two && one === three && one === four && one !== 'white');
    }

    function horizontalCheck() {
        for (let row = 0; row < tableRow.length; row++) {
            for (let col = 0; col < 4; col++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor, tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }
    };
    function veritcalCheck() {
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor, tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor)) {
                    return true;

                }
            }
        }
    }

    function diagonalCheck1() {
        for (let col = 0; col < 4; col++) {
            for (row = 0; row < 3; row++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor, tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }
    }
    function diagonalCheck2() {
        for (let col = 0; col < 4; col++) {
            for (row = 5; row > 2; row--) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor, tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }
    }

    function drawCheck() {
        let fullSlot = [];
        for (let index = 0; index < tableCell.length; index++) {
            if (tableCell[index].style.backgroundColor !== 'white') {
                fullSlot.push(tableCell[index]);
            }
        }
        if (fullSlot.length === tableCell.length) {
            return true;
        }
    }


}
reset.addEventListener('click', () => {
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = 'white';

    });
    playerTurn.style.Color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
})
