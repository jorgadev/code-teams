import React, { useContext, useState, useEffect } from "react";
// Auth module that is created in firebase.js file
import { auth, storage, firestore } from "../firebase";

// Create context to be able to access current user and other info anywhere in app
const AuthContext = React.createContext();

// Hook that has access to Auth Context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  // By default load new user
  const [loading, setLoading] = useState(true);
  const [userObj, setUserObj] = useState({});

  // Firebase functions that return promise which can be used in Signup, Login, Logout etc. components
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  // Insert default user on signup
  function insertDefaultUser(user) {
    let userObj = {
      id: user.uid,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/code-teams.appspot.com/o/default-avatar.jpg?alt=media&token=71dff050-cf42-439a-9902-d01b1564a14b",
      username: user.email.split("@")[0],
    };
    firestore.collection("users").doc(user.uid).set(userObj);
  }

  // Find an user from firestore by passed id
  async function getActiveUser(id) {
    // Wait for data to be fetched (search for users with same id)
    const data = await firestore
      .collection("users")
      .where("id", "==", id)
      .get();
    // Get data from each user fetched from db
    return data.docs.map((d) => d.data());
  }

  // Find all users from db
  async function getAllUsers() {
    const data = await firestore.collection("users").get();
    // Get data from each user fetched from db
    return data.docs.map((d) => d.data());
  }

  // Insert new team in database
  function createBlankTeam() {
    return firestore.collection("teams").add({});
  }

  // Find an user from firestore by passed id
  async function getTeams(creator) {
    // Wait for data to be fetched (search for users with same id)
    const data = await firestore
      .collection("teams")
      .where("members", "array-contains", creator.id)
      .get();
    // Get data from each user fetched from db
    return data.docs.map((d) => d.data());
  }

  // Function insert data into new team by passed id
  function createNewTeam(teamObj) {
    firestore.collection("teams").doc(teamObj.id).set(teamObj);
  }

  // Delete team document from db by passed id
  async function deleteTeamFromDb(id) {
    return await firestore.collection("teams").doc(id).delete();
  }

  // Find an team from firestore by passed id
  async function getTeamById(id) {
    // Wait for data to be fetched (search for users with same id)
    const data = await firestore
      .collection("teams")
      .where("id", "==", id)
      .get();
    // Get data from each user fetched from db
    return data.docs.map((d) => d.data());
  }

  // Insert new user avatar
  function insertNewAvatar(id, url) {
    firestore.collection("users").doc(id).set(
      {
        avatar: url,
      },
      { merge: true }
    );
  }

  // Delete user from team
  function removeUserFromTeam(teamId, filteredArray) {
    firestore.collection("teams").doc(teamId).set(
      {
        members: filteredArray,
      },
      { merge: true }
    );
  }

  // Add user to team
  async function addUserToTeam(teamId, filteredArray) {
    firestore.collection("teams").doc(teamId).set(
      {
        members: filteredArray,
      },
      { merge: true }
    );
  }

  // Create new default project in db
  async function createNewProjectInDb(projectObj) {
    return firestore.collection("projects").doc(projectObj.id).set(projectObj);
  }

  // Insert new blank project in database
  function createBlankProject() {
    return firestore.collection("projects").add({});
  }

  // Delete project doc from db by passed id
  async function deleteProjectFromDb(id) {
    return await firestore.collection("projects").doc(id).delete();
  }

  // Find an team from firestore by passed id
  async function getProjectsByTeamId(id) {
    // Wait for data to be fetched (search for users with same id)
    const data = await firestore
      .collection("projects")
      .where("team", "==", id)
      .get();
    // Get data from each user fetched from db
    return data.docs.map((d) => d.data());
  }

  // When component is mounted onAuthStateChanged recognizes when state changes and set user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Provides all of the information
  const value = {
    currentUser,
    userObj,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    insertDefaultUser,
    getActiveUser,
    getAllUsers,
    createBlankTeam,
    createNewTeam,
    getTeams,
    deleteTeamFromDb,
    getTeamById,
    insertNewAvatar,
    removeUserFromTeam,
    addUserToTeam,
    createNewProjectInDb,
    createBlankProject,
    deleteProjectFromDb,
    getProjectsByTeamId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
