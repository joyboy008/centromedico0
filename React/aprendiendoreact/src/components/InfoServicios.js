import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";

class BasicExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventKey: 1,
    };
  }

  render() {
    const details = this.props.details;

    return (
      <Accordion defaultActiveKey={this.state.eventKey}>
        <Accordion.Item eventKey={this.state.eventKey}>
          <Accordion.Body>{details}</Accordion.Body>
          <Accordion.Header>Leer menos...</Accordion.Header>
        </Accordion.Item>
      </Accordion>
    );
  }
}

export default BasicExample;
