import React, { Component } from "react";
import Button from "./button.jsx";
import "./vertex.css";
class Vertex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diffX: 0,
      diffY: 0,
      dragging: false,
      showButton: false,
      styles: {
        left: this.props.vertex.x,
        top: this.props.vertex.y,
        width: this.props.vertex.w,
        height: this.props.vertex.h,
      },
    };
    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
  }

  _dragStart(e) {
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
    });
  }

  _dragging(e) {
    const { vertex, edges, buttonsMap, updateButtonPosInMap } = this.props;
    if (this.state.dragging) {
      var left = e.screenX - this.state.diffX;
      var top = e.screenY - this.state.diffY;
      this.setState({
        styles: {
          left: left,
          top: top,
          width: this.state.styles.width,
          height: this.state.styles.height,
        },
      });
      //console.log(vertex.buttons);
      console.log("Updates:");
      let new_buttonsMap = new Map(buttonsMap);
      for (let button of vertex.buttons) {
        console.log(button.ID);
        let left = this.state.styles.left + button.xshift - button.width / 2,
          top = this.state.styles.top + button.yshift - button.height / 2;
        console.log(left + " " + top);
        new_buttonsMap.set(button.ID, [left, top]);
      }
      updateButtonPosInMap(new_buttonsMap);
      console.log("buttonsMap:");
      for (let i of buttonsMap) {
        console.log(i[0] + ": " + i[1]);
      }
      console.log("ends:");
      console.log("");
    }
    let sidelength = this.props.vertex.sidelength;
    //console.log(this.state.showButton);
    if (
      e.nativeEvent.offsetX >= 3 + sidelength / 2 &&
      e.nativeEvent.offsetX <= this.state.styles.width - 6 - sidelength / 2 &&
      e.nativeEvent.offsetY >= 3 + sidelength / 2 &&
      e.nativeEvent.offsetY <= this.state.styles.height - 6 - sidelength / 2
    ) {
      //console.log(e.nativeEvent.offsetX + " " + this.state.styles.width);
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }

    //for (let i = 0; i < vertex.buttons.length; ++i) {
    //  let button = vertex.buttons[i];
    //  let dests = edges.get(button);
    //}
  }

  _dragEnd() {
    this.setState({ dragging: false });
  }

  render() {
    const { vertex, edgeCreate, edgeSelected, edges, buttonsMap } = this.props;
    //console.log(vertex.buttons.map((but) => 1));
    //console.log(this.state.showButton);
    return (
      <React.Fragment>
        <input
          className="Vertex"
          style={this.state.styles}
          onMouseDown={this._dragStart}
          onMouseMove={this._dragging}
          onMouseUp={this._dragEnd}
        ></input>
        {vertex.buttons.map((pos) => (
          <Button
            boxLeft={this.state.styles.left}
            boxTop={this.state.styles.top}
            pos={pos}
            sidelength={this.props.vertex.sidelength}
            show={this.state.showButton}
            key={vertex.buttons.indexOf(pos)}
            setStyleInside={this.buttonStylesInside}
            setStyleOutside={this.buttonStylesOutside}
            edgeCreate={edgeCreate}
            edgeSelected={edgeSelected}
            edges={edges}
            buttonsMap={this.props.buttonsMap}
          />
        ))}
      </React.Fragment>
    );
  }

  buttonStylesInside(pos, boxLeft, boxTop, op, all_up) {
    let middleX = boxLeft + pos.xshift;
    let middleY = boxTop + pos.yshift;
    return {
      left: middleX - pos.width / 2,
      top: middleY - pos.height / 2,
      width: pos.width,
      height: pos.height,
      position: "absolute",
      opacity: all_up ? 100 : op,
    };
  }

  buttonStylesOutside(pos, boxLeft, boxTop) {
    let middleX = boxLeft + pos.xshift;
    let middleY = boxTop + pos.yshift;
    return {
      left: middleX - pos.width / 2,
      top: middleY - pos.height / 2,
      width: pos.width,
      height: pos.height,
      position: "absolute",
      opacity: 100,
    };
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Vertex;
