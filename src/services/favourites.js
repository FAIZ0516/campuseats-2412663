import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export function subscribeToFavourites(uid, onData, onError) {
  return onSnapshot(
    doc(db, "favourites", uid),
    // no document yet = no favourites yet
    (snap) => onData(snap.exists() ? (snap.data().itemIds ?? []) : []),
    onError,
  );
}

// merge: true creates the document the first time, and after that only
// changes itemIds. arrayUnion adds the id once (no duplicates).
export function addFavourite(uid, itemId) {
  return setDoc(
    doc(db, "favourites", uid),
    { itemIds: arrayUnion(itemId) },
    { merge: true },
  );
}

export function removeFavourite(uid, itemId) {
  return setDoc(
    doc(db, "favourites", uid),
    { itemIds: arrayRemove(itemId) },
    { merge: true },
  );
}
