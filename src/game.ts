export type Player = "PlayerX" | "PlayerO";
export type MoveResult = "GameFinished" | "WaitingForMove" | "SquareFilled" | "GameAlreadyOver";
export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CellState = "X" | "O" | "EMPTY";
export type WinningPlayer = Player | "DrawnGame" | undefined;

export class TicTacToeGame {
  #currentPlayer: Player;
  #winningPlayer: WinningPlayer;
  #board: CellState[];

  constructor() {
    this.#board = new Array<CellState>(9).fill("EMPTY");
    this.#currentPlayer = "PlayerX";
    this.#winningPlayer = undefined;
  }

  public get currentPlayer(): Player {
    return this.#currentPlayer;
  }

  public get winningPlayer(): WinningPlayer {
    return this.#winningPlayer;
  }

  public get board(): ReadonlyArray<CellState> {
    return this.#board;
  }

  public makeMove(cellNum: CellNumber): [MoveResult, TicTacToeGame] {
    const updatedGame = new TicTacToeGame();
    updatedGame.#currentPlayer = this.currentPlayer;
    updatedGame.#winningPlayer = this.winningPlayer;
    updatedGame.#board = this.#board.map((element) => element);

    if (updatedGame.#board[cellNum] !== "EMPTY") {
      return ["SquareFilled", updatedGame];
    }

    if (updatedGame.winningPlayer) {
      return ["GameAlreadyOver", updatedGame];
    }

    if (updatedGame.currentPlayer === "PlayerX") {
      updatedGame.#board[cellNum] = "X";
    } else {
      updatedGame.#board[cellNum] = "O";
    }

    updatedGame.checkForEnd();
    if (updatedGame.winningPlayer) {
      return ["GameFinished", updatedGame];
    }

    if (updatedGame.currentPlayer === "PlayerX") {
      updatedGame.#currentPlayer = "PlayerO";
    } else {
      updatedGame.#currentPlayer = "PlayerX";
    }
    return ["WaitingForMove", updatedGame];
  }

  private checkForEnd(): void {
    const lines = [
      [this.#board[0], this.#board[1], this.#board[2]],
      [this.#board[3], this.#board[4], this.#board[5]],
      [this.#board[6], this.#board[7], this.#board[8]],

      [this.#board[0], this.#board[3], this.#board[6]],
      [this.#board[1], this.#board[4], this.#board[7]],
      [this.#board[2], this.#board[5], this.#board[8]],

      [this.#board[0], this.#board[4], this.#board[8]],
      [this.#board[2], this.#board[4], this.#board[6]],
    ];

    for (const line of lines) {
      if (line.every((cell) => cell === "X")) {
        this.#winningPlayer = "PlayerX";
        return;
      } else if (line.every((cell) => cell === "O")) {
        this.#winningPlayer = "PlayerO";
        return;
      }
    }

    // check for draw
    if (this.#board.every((cell) => cell !== "EMPTY")) {
      this.#winningPlayer = "DrawnGame";
      return;
    }

    this.#winningPlayer = undefined; // no winning player detected
  }
}
