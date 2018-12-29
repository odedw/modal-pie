import React, { Component } from "react";
import styled from "styled-components";
import toRomanNumeral from "../utils/toRomanNumeral";
import ReactTooltip from "react-tooltip";
import teoria from "teoria";
const data = require("../data.json");

function getChordName(chord, i, root, mode) {
  let res = "";
  if (!root) {
    if (chord.startsWith("b")) {
      res += "b";
      chord = chord.substr(1);
    }
    res = `${res}${toRomanNumeral(i + 1)}${chord}`;
  } else {
    const note = teoria.note(root);
    const scale = note.scale(mode);
    res = scale
      .notes()
      [i].chord(
        chord.startsWith("b") || chord.startsWith("#") ? chord.substr(1) : chord
      ).name;
  }

  return res.replace(/b/g, "♭").replace(/#/g, "♯");
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModeTable = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  max-width: 60%;
`;

const TableCell = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 12.5%;
  padding: 0.8em 1.2em;
  overflow: hidden;
  border: solid 1px white;
  font-size: 1rem;
`;

const ChordTableCell = styled(TableCell)`
  font-family: "Times New Roman", Times, serif;
`;

const BaseRoot = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  color: white;
  border: none;
  border-bottom: solid white 1px;
  text-align: center;
`;

class ModesChartView extends Component {
  constructor(props) {
    super(props);
    this.state = { root: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (
      data.allowedRootNote.some(note =>
        note.toUpperCase().startsWith(event.target.value.toUpperCase())
      )
    ) {
      this.setState({ root: event.target.value });
    }
  }
  render() {
    return (
      <Container>
        <ReactTooltip />
        <ModeTable>
          <TableCell>
            <BaseRoot
              size="2"
              maxLength="2"
              placeholder="root"
              value={this.state.root}
              onChange={this.handleChange}
            />
          </TableCell>
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <TableCell key={i}>{toRomanNumeral(i)}</TableCell>
          ))}

          {data.modes.map(mode => (
            <>
              <TableCell data-tip={mode.tags.join(", ")}>{mode.name}</TableCell>
              {mode.chords.map((chord, i) => (
                <ChordTableCell key={`${mode}${i}`}>
                  {getChordName(chord, i, this.state.root, mode.name)}
                </ChordTableCell>
              ))}
            </>
          ))}
        </ModeTable>
      </Container>
    );
  }
}

export default ModesChartView;
