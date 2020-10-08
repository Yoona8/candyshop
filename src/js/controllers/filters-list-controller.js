import {render, RenderPosition} from '../helpers/common';
import {Category, NutritionFact, UpdateType, UserAction} from '../consts';
import FilterComponent from '../components/filter-component';

const filterGoodsByCategory = (categoryName, goods) => {
  return goods.filter((good) => good.type === categoryName);
};

const filterGoodsGlutenFree = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isGluten);
};

const filterGoodsSugarFree = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isSugar);
};

const filterGoodsVegetarian = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isVegetarian);
};

const nutritionFactToFilterFunction = {
  [NutritionFact.GLUTEN_FREE]: filterGoodsGlutenFree,
  [NutritionFact.SUGAR_FREE]: filterGoodsSugarFree,
  [NutritionFact.VEGETARIAN]: filterGoodsVegetarian
};

const getCategoryFilters = (goods) => {
  return Object.values(Category).map((category) => {
    return {
      name: category,
      count: filterGoodsByCategory(category, goods).length
    };
  });
};

const getNutritionFilters = (goods) => {
  return Object.values(NutritionFact).map((fact) => {
    return {
      name: fact,
      count: nutritionFactToFilterFunction[fact](goods).length
    };
  });
};

export default class FiltersListController {
  constructor(filtersContainerElement, goodsModel, filtersModel) {
    this._filtersContainerElement = filtersContainerElement;
    this._goodsModel = goodsModel;
    this._filtersModel = filtersModel;

    this._categoryFilters = null;
    this._nutritionFilters = null;

    this._nutritionFilterComponent = null;
    this._categoryFilterComponent = null;

    this._goods = [];

    this._onChangeFilter = this._onChangeFilter.bind(this);
  }

  _onChangeFilter(userAction, update) {
    switch (userAction) {
      case UserAction.ADD_FILTER:
        this._filtersModel.addFilter(UpdateType.MAJOR, update);
        break;
      case UserAction.REMOVE_FILTER:
        this._filtersModel.removeFilter(UpdateType.MAJOR, update);
        break;
    }
  }

  _renderFilter(component) {
    component.setOnFilterChange(this._onChangeFilter);

    render(
      this._filtersContainerElement,
      component,
      RenderPosition.AFTER_BEGIN
    );
  }

  _renderFilters() {
    this._categoryFilters = getCategoryFilters(this._goods);
    this._nutritionFilters = getNutritionFilters(this._goods);

    this._nutritionFilterComponent = new FilterComponent(
      this._nutritionFilters
    );

    this._categoryFilterComponent = new FilterComponent(
      this._categoryFilters
    );

    this._renderFilter(this._nutritionFilterComponent);
    this._renderFilter(this._categoryFilterComponent);
  }

  init() {
    this._goods = this._goodsModel.getGoods();
    this._renderFilters();
  }
}
