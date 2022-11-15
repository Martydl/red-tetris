import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectionSlice } from "./store/ConnectionReducer";
import { RootReducerState } from "./store/RootReducer";

// function parseHash(hash: string): [string | undefined, string | undefined] {
//   if (/^#[[:alnum:]]+\[[[:alnum:]]+\]$/.test(hash)) {
//     const ret = hash.match(/\d+/g);
//     if (ret) {
//       return [ret[0], ret[1]];
//     }
//   } else return [undefined, undefined];
// }

function route() {
  const dispatch = useDispatch();
  const isConnectedToRoom = useSelector(
    (state: RootReducerState) => state.connection.isConnectedToRoom
  );
  const hash = window.location.hash;

  console.log("ici:", hash);
  // if (/^#[[:alnum:]]+\[[[:alnum:]]+\]$/.test(hash)) {
  //   const ret = hash.match(/\d+/g);
  //   console.log("ret: ", ret);
  // } else console.log("Echec");
  // const [newRoomName, newPlayerName] = parseHash(hash);
  // const [newRoomName, newPlayerName] = [undefined, undefined];

  // if (newRoomName) {
  //   if (newPlayerName)
  //     dispatch(connectionSlice.actions.setPlayerName(newPlayerName));
  //   if (isConnectedToRoom) dispatch(connectionSlice.actions.roomDisconnect());
  //   dispatch(connectionSlice.actions.startConnectingToRoom(newRoomName));
  // }
}

export default function setRouting() {
  route();
  // window.addEventListener("hashchange", () => {
  //   route();
  // });
}
