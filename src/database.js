// Database module
import { db } from "./firebase";

export default function insertIntoDb(obj) {
  const usersRef = db.ref("Users");
  usersRef.push(obj.data);
  usersRef.on("value", (snap) => console.log(snap.val()));
}
