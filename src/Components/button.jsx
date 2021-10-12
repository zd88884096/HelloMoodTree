import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onTarget: false,
    };
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  _onMouseMove(e) {
    //console.log(this);
    const { pos, sidelength } = this.props;
    //console.log("a");
    //let middleX = boxLeft + pos.width;
    //let middleY = boxTop + pos.height;
    //console.log(e.nativeEvent.offsetX + " " + e.nativeEvent.offsetY);
    //console.log(sidelength);
    //console.log(pos.opacity);
    if (
      e.nativeEvent.offsetX >= -1 &&
      e.nativeEvent.offsetX <= sidelength - 4 &&
      e.nativeEvent.offsetY >= -1 &&
      e.nativeEvent.offsetY <= sidelength - 4
    ) {
      this.setState({ onTarget: true });
    } else {
      this.setState({ onTarget: false });
    }
  }

  render() {
    const {
      pos,
      show,
      setStyleInside,
      setStyleOutside,
      boxLeft,
      boxTop,
      edgeCreate,
      edgeSelected,
      edges,
    } = this.props;
    //console.log(this.state.onTarget);
    return (
      <div>
        <button
          style={
            this.state.onTarget
              ? setStyleOutside(pos, boxLeft, boxTop)
              : setStyleInside(pos, boxLeft, boxTop, pos.opacity, show)
          }
          onMouseMove={this._onMouseMove}
          onClick={() => edgeCreate(pos)}
        ></button>
      </div>
    );
  }
}

export default Button;
