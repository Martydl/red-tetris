# red-tetris

Online and multiplayer Tetris clone made with TypeScript, React/Redux, NodeJS and SocketIO.

## The Game

The game is based on the original Tetris but is played between several players.
Each player has his own playing field, all players undergo the same series of pieces.

As soon as a player destroys lines on his ground, the opposing players receive n - 1 lines
in penalty, then indestructible, which fit at the bottom of their playground.

You can visualize your opponents grids with their associated spectrum, which is a grid that shows the highest fixed block for each column.

Last player alive is the winner.

## _Alt mode:_

In solo mode, acceleration is enabled by default which means that the more lines you destroy, the faster pieces will drop.

Your goal is now to get the highest score.

_Hint: try to destroy more than one line at once_

## Commands

- ← move piece left
- → move piece right
- ↓ move piece down
- ↑ rotate clockwise
- "Space" place piece
- "S" swap current piece with queue

## Start game

```bash
npm install
npm run build
npm run start
```

The game is now running at `localhost:3000`.
