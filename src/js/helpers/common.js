const RenderPosition = {
  BEFORE_END: 'beforeend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  AFTER_END: 'afterend'
};

const render = (
  container,
  component,
  position = RenderPosition.BEFORE_END
) => {
  container.insertAdjacentElement(position, component.getElement());
};

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  render,
  createElement,
  remove
};
