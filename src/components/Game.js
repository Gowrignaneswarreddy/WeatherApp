import React, { useState } from 'react';
import './Game.css'
const Game = () => {
    const initialCells = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const [cells, setCells] = useState(initialCells);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let line of lines) {
            if (cells[line[0]] !== " " && cells[line[0]] === cells[line[1]] && cells[line[0]] === cells[line[2]]) {
                return cells[line[0]];
            }
        }
        return null;
    };

    const tic = (index) => {
        if (winner || cells[index] !== " ") return;

        const newCells = [...cells];
        newCells[index] = isXNext ? "X" : "O";
        setCells(newCells);
        setIsXNext(!isXNext);
        
        const win = checkWinner();
        if (win) {
            setWinner(win);
        }
    };

    const renderCell = (index) => (
        <td
            key={index}
            className={cells[index] === "X" ? "X" : cells[index] === "O" ? "O" : ""}
            onClick={() => tic(index)}
        >
            {cells[index]}
        </td>
    );

    return (
        <div className="table-container">
            <h2>{winner ? `${winner} Wins!` : `Now Player: ${isXNext ? "X" : "O"}`}</h2>
            <table border={2}>
                <tbody>
                    <tr>
                        {renderCell(0)}
                        {renderCell(1)}
                        {renderCell(2)}
                    </tr>
                    <tr>
                        {renderCell(3)}
                        {renderCell(4)}
                        {renderCell(5)}
                    </tr>
                    <tr>
                        {renderCell(6)}
                        {renderCell(7)}
                        {renderCell(8)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Game;