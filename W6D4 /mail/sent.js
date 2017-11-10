const MessageStore = require("./message_store");

class Sent {
  constructor() {
    
  }
  
  render() {
    const ul = document.createElement("ul");
    ul.className = 'messages';
    const emails = MessageStore.getSentMessages();
    emails.forEach(email => {
      const node = this.renderMessage(email);
      ul.appendChild(node);
    });
    // ul.innerHTML = "An Inbox Message";
    return ul;
  }
  
  renderMessage(message) {
    const li = document.createElement("li");
    li.className = 'message';
    li.innerHTML = `
      <span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>
    `;
    return li;
  }
}

module.exports = Sent;