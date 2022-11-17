import React from "react";

export default function PrintScore(props: {
  score: number;
  level: number;
}): JSX.Element {
  return (
    <div className="scorePanel">
      <div className="score">score: {props.score}</div>
      <div className="level">level: {props.level}</div>
    </div>
  );
}
