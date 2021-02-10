import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Modal, Button, Form, Badge, Alert } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

// Recieve props from CreateTeam component
export default function TeamsModal(props) {
  // Members are all users from database (needed for suggestions)
  const members = props.users;
  // User that is now logged in and will be creator of team
  const activeUser = props.activeUser;
  // Array where all clicked suggestions (members of team) will be stored while creating
  const [selectedUsers, setSelectedUsers] = useState([activeUser]);

  // Text typed into suggestions input
  const [value, setValue] = useState("");
  // All suggestions - usernames from database
  const [suggestions, setSuggestions] = useState([]);
  // Team name
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  // Get function which creates new team from context
  const {
    createBlankTeam,
    createNewTeam,
    deleteTeamFromDb,
    getTeams,
  } = useAuth();

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : members.filter(
          (member) =>
            member.username.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.username;

  // Render suggestions into divs
  const renderSuggestion = (suggestion) => (
    <div className="member-container">
      <img className="member-avatar" src={suggestion.avatar} alt="Avatar" />
      <p>{suggestion.username}</p>
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    getMembers(newValue, suggestions[0]);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Start typing member's username..",
    value,
    onChange: onChange,
  };

  // Check if user typed in or chosen exists and push to "selectedUsers" array
  const getMembers = (value, suggestion) => {
    if (
      members.map((user) => user.username).includes(value) &&
      !selectedUsers.map((user) => user.username).includes(value)
    ) {
      selectedUsers.push(suggestion);
      setValue("");
    }
  };

  // Create object which will be stored into database teams collection
  const createTeamHandler = async () => {
    await createBlankTeam().then((res) => {
      let teamObj = {
        creator: activeUser.id,
        name: teamName,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        projects: [],
        messages: [],
        members: selectedUsers.map((user) => user.id),
        id: res.id,
      };
      // Don't create new team if no members added
      if (
        teamObj.members.length > 1 &&
        teamName !== "" &&
        teamName.length > 1 &&
        teamName.length < 20
      ) {
        createNewTeam(teamObj);
        props.setModalShow(false);
        setSelectedUsers([activeUser.id]);
        setTeamName("");
        getTeams(activeUser).then((res) => props.setUserTeams(res));
      } else {
        setError("Failed to create team");
        setTimeout(() => {
          setError("");
        }, 3000);
        deleteTeamFromDb(res.id);
      }
    });
  };

  const removeBadge = (e) => {
    const id = e.target.id;
    if (id != activeUser.id) {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
    }
  };

  return (
    <Modal
      className="TeamsModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group id="team-name">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter team name.."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="members" className="members-form-group">
            <Form.Label>Members</Form.Label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={{
                input: "form-control",
              }}
            />
          </Form.Group>
          <div className="badges">
            {selectedUsers.map((user) => (
              <Badge
                variant="secondary"
                className="user-badge"
                onClick={(e) => removeBadge(e)}
                key={user.id}
                id={user.id}
              >
                {user.username}
              </Badge>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createTeamHandler}>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
