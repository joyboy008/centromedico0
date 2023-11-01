import React, { Component, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";

class CustomAccordion extends Component {
  render() {
    const openText = this.props.openText || "Leer menos...";
    const closeText = this.props.closeText || "Leer más...";
    const defaultEvent = this.props.defaultEvent;
    return (
      <Accordion defaultActiveKey={1}>
        <Accordion.Item eventKey={defaultEvent}>
          <Accordion.Body>{this.props.children}</Accordion.Body>
          <Accordion.Header>
            <ContextAwareToggle
              openText={openText}
              closeText={closeText}
              eventKey={defaultEvent}
            />
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    );
  }
}

function ContextAwareToggle({
  children,
  eventKey,
  callback,
  closeText,
  openText,
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div type="button" onClick={decoratedOnClick}>
      {isCurrentEventKey ? openText : closeText}
    </div>
  );
}

export default CustomAccordion;
