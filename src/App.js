import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/navbar";
import Vertices from "./Components/vertices";

class App extends Component {
  state = {
    buttonID: 0,
    vertexWidth: 200,
    vertexHeight: 100,
    vertices: [],
    //edges: [],
    vertexButtonSelected: false,
    edgeButtonSelected: false,
    edgeState: 0,
    dynamicEdge: [],
    edges: new Map(),
    buttonsMap: new Map(),
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor", props);
  }

  handleVertexButtonClick = () => {
    let sidelength = 15;
    const { vertices, vertexWidth, vertexHeight, buttonID, buttonsMap } =
      this.state;
    let new_vertices = [...vertices];
    let new_buttonsMap = new Map(buttonsMap);
    let _width = Math.floor(window.innerWidth / 2 - 100);
    let _height = Math.floor((window.innerHeight * 3) / 4 - 50);
    let b = [
      {
        x: _width,
        y: _height,
        xshift: vertexWidth / 2,
        yshift: 0,
        width: sidelength,
        height: sidelength,
        opacity: 0,
        ID: buttonID,
      },
      {
        x: _width,
        y: _height,
        xshift: vertexWidth / 2,
        yshift: vertexHeight,
        width: sidelength,
        height: sidelength,
        opacity: 0,
        ID: buttonID + 1,
      },
      {
        x: _width,
        y: _height,
        xshift: vertexWidth,
        yshift: vertexHeight / 2,
        width: sidelength,
        height: sidelength,
        opacity: 0,
        ID: buttonID + 2,
      },
      {
        x: _width,
        y: _height,
        xshift: 0,
        yshift: vertexHeight / 2,
        width: sidelength,
        height: sidelength,
        opacity: 0,
        ID: buttonID + 3,
      },
    ];
    this.setState({ buttonID: buttonID + 4 });
    new_vertices.push({
      x: _width,
      y: _height,
      w: vertexWidth,
      h: vertexHeight,
      sidelength: sidelength,
      buttons: b,
    });
    for (let button of b) {
      let left = button.x + button.xshift - this.state.vertexWidth / 2,
        top = button.y + button.yshift - this.state.vertexHeight / 2;
      console.log(button.ID + " " + left + " " + top);
      new_buttonsMap.set(button.ID, [left, top]);
    }
    this.setState({
      vertices: new_vertices,
      vertexButtonSelected: !this.state.vertexButtonSelected,
      buttonsMap: new_buttonsMap,
    });
    //console.log(this.state.vertexButtonSelected);
  };

  handleEdgeButtonClick = () => {
    const { edgeButtonSelected, edgeState, dynamicEdge } = this.state;
    this.setState({
      edgeButtonSelected: !edgeButtonSelected,
      edgeState: 0,
      dynamicEdge: [],
    });
    //console.log(this.state.vertexButtonSelected);
  };

  handleEdgeCreate = (button) => {
    const { edgeButtonSelected, edgeState, dynamicEdge, edges } = this.state;
    let curEdge = [...dynamicEdge];
    //console.log(curEdge);
    if (edgeButtonSelected) {
      curEdge.push(button);
      if (edgeState === 0) {
        this.setState({ dynamicEdge: curEdge, edgeState: 1 });
      } else if (edgeState === 1) {
        //to improve on?
        let _edges = new Map(edges);
        //_edges.push(curEdge);

        let id1 = curEdge[0].ID,
          id2 = curEdge[1].ID;
        if (!_edges.has(id1)) {
          _edges.set(id1, new Set());
        }
        if (!_edges.has(id2)) {
          _edges.set(id2, new Set());
        }
        console.log(id1 + " " + id2);
        _edges.get(id1).add(id2);
        _edges.get(id2).add(id1);
        console.log("_edges:");
        for (let i of _edges) {
          console.log(i[0] + ": ");
          for (let j of i[1]) {
            console.log(j + "_");
          }
        }
        this.setState({ edges: _edges, edgeState: 0, dynamicEdge: [] });
      }
    }
    console.log("edges:");
  };

  updateButtonPosInMap = (new_buttonsMap) => {
    //let new_buttonsMap = new Map(this.state.buttonsMap);
    //console.log(ID + "     " + left + "      " + top);
    //new_buttonsMap.set(ID, [left, top]);
    console.log("new_buttonsMap:");
    for (let i of new_buttonsMap) {
      console.log(i[0] + ": " + i[1]);
    }
    console.log("ends:");
    this.setState({ buttonsMap: new_buttonsMap });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="h1 h1-sm m-3">MoodTree</h1>
        <NavBar
          vertexClick={this.handleVertexButtonClick}
          vertexSelected={this.state.vertexButtonSelected}
          edgeClick={this.handleEdgeButtonClick}
          edgeSelected={this.state.edgeButtonSelected}
        />
        <Vertices
          edgeCreate={this.handleEdgeCreate}
          updateButtonPosInMap={this.updateButtonPosInMap}
          vertices={this.state.vertices}
          edgeSelected={this.state.edgeButtonSelected}
          edges={this.state.edges}
          buttonsMap={this.state.buttonsMap}
        />
      </React.Fragment>
    );
  }
}

export default App;
