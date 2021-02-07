import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Team({ activeUser }) {
  const [userTeams, setUserTeams] = useState();
  const { getTeams } = useAuth();

  // On component first time render get all users and save them in array "allUsers"
  // useEffect(() => {
  //   if (activeUser) {
  //     getTeams(activeUser).then((res) => setUserTeams(res));
  //   }
  // }, []);

  // console.log(userTeams);

  return <div className="d-inline-block">team</div>;
}
