import React, { Component, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";

class BasicExample extends Component {
  render() {
    const details = this.props.details;

    return (
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Body>{details}</Accordion.Body>
          <Accordion.Header>
            <ContextAwareToggle eventKey="1" />
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    );
  }
}

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div type="button" onClick={decoratedOnClick}>
      {isCurrentEventKey ? "Leer menos..." : "Leer más..."}
    </div>
  );
}

export default BasicExample;
