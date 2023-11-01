import React, { Component, useEffect, useState } from "react";
import ChatBot from "../components/ChatBot/Chatbot";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";
import { v4 as uuid } from "uuid";
import api from "../utils/api";

// esto es para crear un nuevo componente
class Agendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: "",
      chatId: "",
      chatHistory: [],
      fechaValue: "",
    };
  }

  componentDidMount() {
    // inicializar el chat id;
    const chatId = uuid();
    this.setState({ chatId: chatId });
  }

  handleInputChange = (event) => {
    this.setState({ chatInput: event.target.value });
  };

  handleIniciarChat = () => {
    if (!!this.state.fechaValue) {
      const chatHistoryCopy = this.state.chatHistory.slice();
      const botInput = {
        author: "chatbot",
        input:
          "Holaa, por cierto no solo puedo agendar citas, he aprendido un poco de medicina trabajando aquí. 😎",
      };

      chatHistoryCopy.push(botInput);
      this.setState({ chatHistory: chatHistoryCopy });
    }
  };

  handleEnviarMensaje = () => {
    if (!!this.state.chatInput) {
      let chatHistoryCopy = this.state.chatHistory.slice();
      const userInput = this.state.chatInput;
      chatHistoryCopy.push({ author: "user", input: this.state.chatInput });
      this.setState(
        {
          chatHistory: chatHistoryCopy,
          chatInput: "",
        },
        () => {
          api
            .chat(userInput, this.state.chatId, this.state.fechaValue)
            .then((response) => {
              const chatHistoryCopy = this.state.chatHistory.slice();
              chatHistoryCopy.push({
                author: "chatbot",
                input: response.data.mensaje,
              });
              this.setState({ chatHistory: chatHistoryCopy });
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  handleDateChange = (event) => {
    this.setState({ fechaValue: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <DefaulLayout
          title="Chatea con nosotros 😁"
          size="slider-small"
          showSidebar
        >
          <div className="center">
            <div id="content">
              <div className="py-4">
                <h3>Realizar una cita es mas fácil de lo que pensabas.</h3>
                <ChatBot
                  onSendMessage={this.handleEnviarMensaje}
                  chatHistory={this.state.chatHistory}
                  onChatStart={this.handleIniciarChat}
                  onChange={this.handleInputChange}
                  chatInput={this.state.chatInput}
                  fechaValue={this.state.fechaValue}
                  onDateChange={this.handleDateChange}
                />
              </div>
            </div>
          </div>
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Agendar;
