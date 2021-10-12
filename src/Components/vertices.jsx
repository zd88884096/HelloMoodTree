import React, { Component } from "react";
import Vertex from "./vertex";

class Vertices extends Component {
  state = {};
  createID() {
    let new_ID = this.state.ID + 1;
    console.log(new_ID);
    this.setState({ ID: new_ID });
    return 6;
  }
  render() {
    const {
      vertices,
      edgeCreate,
      edgeSelected,
      edges,
      buttonsMap,
      updateButtonPosInMap,
    } = this.props;
    return (
      <div>
        {vertices.map((vertex) => (
          <Vertex
            vertex={vertex}
            key={vertices.indexOf(vertex)}
            edgeCreate={edgeCreate}
            edgeSelected={edgeSelected}
            updateButtonPosInMap={updateButtonPosInMap}
            edges={edges}
            buttonsMap={buttonsMap}
          />
        ))}
      </div>
    );
  }
}

export default Vertices;
