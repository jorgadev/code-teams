import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Form } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

// Recieve props from CreateTeam component
export default function AddUser({ team }) {
  const { getActiveUser, getAllUsers, addUserToTeam, getTeamById } = useAuth();
  // Create an blank array where all users will be added after fetch
  const [allUsers, setAllUsers] = useState([]);
  // Create an blank array where all users will be added after fetch
  const [members, setMembers] = useState([]);
  // Text typed into suggestions input
  const [value, setValue] = useState("");
  // All suggestions - usernames from database
  const [suggestions, setSuggestions] = useState([]);

  const addUserHandler = async (id) => {
    const newArray = members.map((member) => member.id);
    newArray.push(id);
    await addUserToTeam(team.id, newArray).then(() => {});
  };

  // On component first time render get all users and save them in array "allUsers"
  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res));
  }, []);

  useEffect(() => {
    getTeamById(team.id).then((res) => {
      Promise.all(
        res[0].members.map((memberId) =>
          getActiveUser(memberId).then((res) => res[0])
        )
      ).then((members) => setMembers(members));
    });
  }, [suggestions]);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : allUsers.filter(
          (user) =>
            user.username.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.username;

  // Render suggestions into divs
  const renderSuggestion = (suggestion) => {
    return !team.members.includes(suggestion.id) ? (
      <>
        <div
          className="member-container suggestion"
          onClick={() => addUserHandler(suggestion.id)}
        >
          <img className="member-avatar" src={suggestion.avatar} alt="Avatar" />
          <p>{suggestion.username}</p>
        </div>
      </>
    ) : null;
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
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
    placeholder: "Add user..",
    value,
    onChange: onChange,
  };

  return (
    <>
      {allUsers && (
        <Form>
          <Form.Group id="members" className="members-form-group">
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
        </Form>
      )}
    </>
  );
}
