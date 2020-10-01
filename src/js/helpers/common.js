const RenderPosition = {
  BEFORE_END: 'beforeend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  AFTER_END: 'afterend'
};

const render = (container, element, position = RenderPosition.BEFORE_END) => {
  container.insertAdjacentElement(position, element);
};

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export {
  RenderPosition,
  render,
  createElement
};
