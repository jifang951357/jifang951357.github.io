import update from "immutability-helper";

export interface State<T> {
  isError: boolean;
  isLoading: boolean;
  items: T[];
  searchParams: any;
}
export interface Action {
  type: string;
  items?: any;
}

export interface Reducer<T> {
  (state: State<T>, action: Action): State<T>;
}

function reducer<T = any>(state: State<T>, action: Action): State<T> {
  /**
   * 更新数据时更新state
   *
   * @template T
   * @param {State<T>} state
   * @param {Action} action
   * @returns
   */
  function updateItem<T>(state: State<T>, action: Action) {
    const idx = state.items.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      item =>
        item[action.items.keyName] === action.items.item[action.items.keyName]
    );

    if (idx !== -1) {
      const newitems = update(state.items, {
        [idx]: { $set: action.items.item }
      });
      return {
        ...state,
        items: newitems
      };
    }

    return state;
  }

  /**
   * 删除数据
   *
   * @template T
   * @param {State<T>} state
   * @param {Action} action
   * @returns
   */
  function removeItem<T>(state: State<T>, action: Action) {
    const newItems = state.items.filter(item => item 
      !== action.items);
    return {
      ...state,
      newitems
    };
  }

  /**
   * 添加数据
   *
   * @template T
   * @param {State<T>} state
   * @param {Action} action
   * @returns
   */
  function addItem<T>(state: State<T>, action: Action) {
    const preitems = state.items;
    const newitems = update(preitems, { $unshift: [action.items] });
    return {
      ...state,
      items: newitems
    };
  }

  /**
   * 通过id删除数据项
   */
  function removeItemById<T>(state: State<T>, action: Action) {
    const { itemIds, keyName } = action.items;
    const newitems = state.items.filter((item) => !itemIds.includes(item[keyName]))
    return {
      ...state,
      items: newitems
    }
  });

  switch (action.type) {
    case "FETCH_INIT": // 加载中
      return {
        ...state,
        isError: false,
        isLoading: true,
        searchParams: action.items
      };
    case "FETCH_SUCCESS": // 获取成功
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.items ? [...action.items.content] : [...state.items]
      };
    case "FETCH_FAILURE": // 获取失败
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case "UPDATE_ITEM": // 更新修改
      return updateItem(state, action);
    case "ADD_ITEM": // 增加
      return addItem(state, action);
    case "REMOVE_ITEM": // 删除
      return removeItem(state, action);
    case "SET_items": // 设置列表
      return {
        ...state,
        items: action.data
      };
    case "REMOVE_ITEM_BY_ID": // 根据id删除
      return removeItemById(state, action);
    default:
      return state;
  }
}

export default reducer;
