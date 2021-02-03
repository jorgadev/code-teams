import { db } from "./firebase";

import React from "react";

export function dbInsert(obj) {
  if ((obj.type = "blankUser")) {
    db.ref("Users").push(obj.data);
  }
  return <></>;
}
