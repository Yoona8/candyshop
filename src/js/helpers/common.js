const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

export {render};
