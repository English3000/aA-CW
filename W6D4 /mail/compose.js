const MessageStore = require("./message_store");

class Compose {
  constructor() {
    
  }
  
  render() {
    const div = document.createElement("div");
    div.className = 'new-message';
    div.innerHTML = this.renderForm();
    div.addEventListener("change", event => {
      MessageStore.updateDraftField(event.target.name, event.target.value)
    });
    div.addEventListener("submit", event => {
      event.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = "inbox";
    });
    return div;
  }
  
  renderForm() {
    const draft = MessageStore.getMessageDraft();
    
    const subjectLine = document.createElement("p");
    subjectLine.className = 'new-message-header';
    subjectLine.innerText = 'New Message';
    
    const form = document.createElement("form"); //need action attr & method attr
    form.className = 'compose-form';
    form.innerHTML = `
      <input placeholder = 'Recipient' name = 'to' type = 'text' value = '${draft.to}'>
      <input placeholder = 'Subject' name = 'subject' type = 'text' value = '${draft.subject}'>
      <textarea name = 'body' rows = '20'>${draft.body}</textarea>
      <input type = 'submit' class = 'btn btn-primary submit-message' value = 'Send'>
    `;
    return subjectLine.innerHTML + form.outerHTML;
  }
}

module.exports = Compose;