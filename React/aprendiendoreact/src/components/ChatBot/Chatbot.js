import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import "./chatbot.styles.css";

function ChatBot({
  chatHistory,
  chatInput,
  onChange,
  onSendMessage,
  onChatStart,
  onDateChange,
  fechaValue,
}) {
  return (
    <div className="chat__container">
      <div className="chat__content">
        {chatHistory.length > 0 ? (
          chatHistory.map((message) => {
            if (message.author === "chatbot") {
              return (
                <div className="message__container chatbot__message">
                  <span className="chat__bubble">{message.input}</span>
                </div>
              );
            }
            return (
              <div className="message__container user__message">
                <span className="chat__bubble">{message.input}</span>
              </div>
            );
          })
        ) : (
          <div>
            <p>Ingresa la fecha y hora de la cita.</p>
            <p>Posterior inicia la conversación.</p>
            <input
              name="fecha"
              className="form-control"
              type="datetime-local"
              onChange={onDateChange}
              value={fechaValue}
            />
            <div className="chatbot__iniciar-button">
              <button onClick={onChatStart}>Iniciar Conversación</button>
            </div>
          </div>
        )}
      </div>
      {chatHistory.length > 0 ? (
        <div className="chat__input-container">
          <input
            placeholder="realiza tu consulta..."
            type="text"
            name="chatInput"
            value={chatInput}
            onChange={onChange}
          />
          <button className="btn btn-secondary" onClick={onSendMessage}>
            <BsFillSendFill />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ChatBot;
