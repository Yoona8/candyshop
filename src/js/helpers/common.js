import {RenderPosition} from '../consts';

const render = (container, template, position = RenderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(position, template);
};

export {render};
