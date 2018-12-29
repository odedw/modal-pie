import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const modes = require("../data.json").modes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModeNames = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #555;
`;
const modeNameClass = css`
  text-decoration: none;
`;
const ModeName = styled.h3`
  text-transform: capitalize;
  color: #555;
  margin: 0 !important;

  &.selected {
    color: white;
  }
`;
const ModeNameSeparator = styled.div`
  padding: 0 0.5em;
`;
const ModeTags = styled.div`
  display: flex;
  flex-direction: row;
`;
const ModeTag = styled.div``;
const TagSeparator = styled.div`
  padding: 0 5px;
`;
const ModeTable = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
`;

const TableCell = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 12.5%;
  padding: 0.8em 1.2em;
  overflow: hidden;
  border: solid 1px white;
`;

const ModeView = ({ match }) => {
  const mode = modes.find(m => m.name === match.params.name.toLowerCase());
  return (
    <Container>
      <ModeNames>
        {modes
          .map(m => m.name)
          .map((name, i) => (
            <>
              <Link to={`/${name}`}>
                <ModeName
                  className={name === match.params.name ? "selected" : ""}
                >
                  <h3>{name}</h3>
                </ModeName>
              </Link>
              {i === modes.length - 1 ? null : (
                <ModeNameSeparator>/</ModeNameSeparator>
              )}
            </>
          ))}
      </ModeNames>
      <ModeTags>
        {mode.tags.map((tag, i) => (
          <>
            <ModeTag>{tag}</ModeTag>
            {i === mode.tags.length - 1 ? null : <TagSeparator>•</TagSeparator>}
          </>
        ))}
      </ModeTags>
      <ModeTable>
        <TableCell />
        <TableCell>I</TableCell>
        <TableCell>II</TableCell>
        <TableCell>III</TableCell>
        <TableCell>IV</TableCell>
        <TableCell>V</TableCell>
        <TableCell>VI</TableCell>
        <TableCell>VII</TableCell>

        <TableCell>Notes</TableCell>
        {mode.intervals.map(interval => (
          <TableCell>{interval.toUpperCase()}</TableCell>
        ))}

        <TableCell>Chords</TableCell>
        {mode.chords.map(chord => (
          <TableCell>{chord}</TableCell>
        ))}
      </ModeTable>
    </Container>
  );
};

export default ModeView;
