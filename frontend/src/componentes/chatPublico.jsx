import React from "react";
import ChatBot from "./ChatBot";

export default function ChatPublico() {
  return (
    <section className="card">
      <h1>Chat Publico</h1>
      <p className="section-lead">Puedes conversar libremente con el chatbot.</p>

      <ChatBot />
    </section>
  );
}
