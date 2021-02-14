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
        "https://firebasestorage.googleapis.com/v0/b/code-teams-2a209.appspot.com/o/default-avatar.jpg?alt=media&token=dadc7e68-4fbb-45f3-85ec-364e38841846",
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

  // Insert new project with all todos in database
  function createNewProjectInDb(projectObj) {
    const projectsRef = firestore.collection("projects");
    let projectId = null;
    projectsRef.add(projectObj).then((res) => {
      projectId = res.id;
      // When added, pick an id and add it too
      projectsRef.doc(projectId).update({ id: projectId });
      // Create an array which will contain todos ids
      const todosArr = [];
      // If project has some todos, add them too
      if (projectObj.todos.length > 0) {
        // For each todo
        projectObj.todos.forEach((todo) => {
          const todoObj = {
            project: res.id,
            name: todo,
            completed: false,
            solves: [],
          };
          // Create todos collection
          const todosRef = firestore.collection("todos");
          // Add todo as document to collection and set its id
          todosRef.add(todoObj).then((res) => {
            todosRef.doc(res.id).update({ id: res.id });
            todosArr.push(res.id);
            projectsRef.doc(projectId).update({ todos: todosArr });
          });
        });
      }
    });
  }

  // Insert new blank project in database
  function createNewTeamInDb(teamObj) {
    const teamsRef = firestore.collection("teams");
    teamsRef.add(teamObj).then((res) => {
      teamsRef.doc(res.id).update({ id: res.id });
    });
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

  // Find an team from firestore by passed id
  async function getTodosByProjectId(id) {
    // Wait for data to be fetched (search for users with same id)
    const data = await firestore
      .collection("todos")
      .where("project", "==", id)
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
    getTeams,
    deleteTeamFromDb,
    getTeamById,
    insertNewAvatar,
    removeUserFromTeam,
    addUserToTeam,
    createNewProjectInDb,
    createNewTeamInDb,
    deleteProjectFromDb,
    getProjectsByTeamId,
    getTodosByProjectId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
