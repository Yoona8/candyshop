import AbstractComponent from './abstract-component';

const getCatalogTemplate = () => {
  return `
    <div class="catalog__cards catalog__cards--load">
      <!--<p class="catalog__load">Loading...</p>-->
    </div>
  `;
};

export default class CatalogComponent extends AbstractComponent {
  _getTemplate() {
    return getCatalogTemplate();
  }
}
