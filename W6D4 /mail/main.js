const Router = require("./router");
const Inbox = require("./inbox");
const Sent = require("./sent");
const Compose = require("./compose");

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  const pages = document.querySelectorAll('.sidebar-nav li');
  pages.forEach(el => {
    el.addEventListener('click', event => {
      const hash = event.currentTarget.innerText.toLowerCase();
      window.location.hash = hash;
    });
  });
  const routes = {
    inbox: new Inbox(),
    sent: new Sent(),
    compose: new Compose()
  };
  let router = new Router(content, routes);
  router.start();
  window.location.hash = 'inbox';
});

