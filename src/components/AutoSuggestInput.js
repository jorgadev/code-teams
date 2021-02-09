import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Form } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

// Recieve props from CreateTeam component
export default function AutoSuggestInput({ team }) {
  const { getActiveUser, getAllUsers } = useAuth();
  // Create an blank array where all users will be added after fetch
  const [allUsers, setAllUsers] = useState([]);

  // On component first time render get all users and save them in array "allUsers"
  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res));
  }, []);

  // useEffect(() => {
  //   Promise.all(
  //     team.members.map((memberId) =>
  //       getActiveUser(memberId).then((res) => res[0])
  //     )
  //   ).then((members) => setMembers(members));
  // }, [team]);

  // console.log(members);

  // Text typed into suggestions input
  const [value, setValue] = useState("");
  // All suggestions - usernames from database
  const [suggestions, setSuggestions] = useState([]);

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
  const renderSuggestion = (suggestion) => (
    <div className="member-container">
      <img className="member-avatar" src={suggestion.avatar} alt="Avatar" />
      <p>{suggestion.username}</p>
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    console.log(newValue);
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
