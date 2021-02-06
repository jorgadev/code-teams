import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

const selectedUsers = [];

export default function TeamsModal(props) {
  const members = props.users;
  const usernames = members.map((member) => member.username);
  const activeUser = props.activeUser;

  useEffect(() => {
    selectedUsers.push(activeUser.username);
  }, []);

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

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div className="member-container">
      <img className="member-avatar" src={suggestion.avatar} />
      <p>{suggestion.username}</p>
    </div>
  );

  // States
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    getMembers(newValue);
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

  const getMembers = (value) => {
    if (usernames.includes(value) && !selectedUsers.includes(value)) {
      selectedUsers.push(value);
      setValue("");
    }
    return selectedUsers;
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
          <Form.Group id="team-name">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter team name.."
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
            {selectedUsers.map((username) => (
              <Badge variant="secondary" key={username}>
                {username}
              </Badge>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
