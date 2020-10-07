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

const replace = (newComponent, oldComponent) => {
  const parent = oldComponent.getElement().parentElement;

  parent.replaceChild(newComponent.getElement(), oldComponent.getElement());
};

export {
  RenderPosition,
  render,
  createElement,
  remove,
  replace
};
