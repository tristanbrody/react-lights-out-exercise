import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  console.log(`board is `);
  console.dir(board);
  console.log(board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < ncols; i++) {
      initialBoard.push([]);
      for (let j = 0; j < nrows; j++) {
        initialBoard[i].push(randomCellValue());
      }
    }
    return initialBoard;
  }

  function randomCellValue() {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    return randomNum <= 5 ? true : false;
  }

  const hasWon = () => {
    return board.every(row => {
      return row.every(cell => cell === false);
    });
  };

  function flipCellsAround(coord) {
    console.log(`coord is ${coord}`);
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy

      const boardCopy = _.cloneDeep(oldBoard);
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      return boardCopy;
    });
  }

  if (hasWon()) return "You won!";

  // if player hasn't won, make table board
  return (
    <div className="Board">
      {board.map((y, indx) => {
        let row = [];
        for (let x = 0; x < y.length; x++) {
          row.push(
            <Cell
              isLit={y[x]}
              flipCellsAroundMe={evt => flipCellsAround(`${indx}-${x}`)}
            />
          );
        }
        return <div>{row}</div>;
      })}
    </div>
  );
}
export default Board;
