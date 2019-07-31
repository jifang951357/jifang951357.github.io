import * as React from "react";
import { useState, useEffect, useReducer, useCallback } from "react";
import http from "@sinoui/http";
import reducer, { Reducer } from "./reducer";

function useRestAPi<T, RawResponse = T[]>(url: string, keyName?: string) {
  let list;
  const [state, dispatch] = useReducer<Reducer<T>>(reducer, {
    isError: false,
    isLoading: false,
    items: [],
    searchParams: {}
  });

  useEffect(() => {
    infoItems();
  }, [url]);

  /**
   * 初始化数据带条件
   */
  const infoItems = useCallback(
    async (searchParams?: { [x: string]: string }): Promise<T[]> => {
      dispatch({ type: "FETCH_INIT", items: searchParams });

      try {
        const result = await http.get<T[]>(url);
        // result = result.data;
        // if (searchParams && searchParams.name !== "") {
        //   console.log(result);
        //   result = result.filter(
        //     item => item.name.indexOf(searchParams.name) !== -1
        //   );
        // }
        list = result.data;
        dispatch({
          type: "FETCH_SUCCESS",
          items: { content: result.data }
        });

        return result;
      } catch (e) {
        dispatch({ type: "FETCH_FAILURE" });
        throw e;
      }
    },
    [url]
  );
  const select = useCallback((searchParams?: { [x: string]: string }) => {
    if (searchParams && searchParams.name !== "") {
      dispatch({
        type: "FETCH_SUCCESS",
        items: {
          content: list.filter(
            item => item.name.indexOf(searchParams.name) !== -1
          )
        }
      });
    } else {
      dispatch({
        type: "FETCH_SUCCESS",
        items: { content: list }
      });
    }

    return state.items;
  }, []);

  /**
   * 查询数据
   *
   * @param {{ [x: string]: string }} searchParams
   * @returns
   */
  const query = useCallback(
    (searchParams: { [x: string]: string }) => {
      return select(searchParams);
    },
    [select]
  );

  /**
   * 重置查询条件并完成一次查询
   *
   * @returns
   */
  const reset = useCallback(() => {
    return select();
  }, [select]);

  /**
   * 新增数据
   *
   * @param {T} itemInfo
   * @param {boolean} [isNeedUpdate=true]
   * @returns {Promise<T>}
   */
  const save = useCallback((itemInfo: T) => {
    try {
      dispatch({ type: "ADD_ITEM", items: itemInfo });

      return { code: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  /**
   * 更新数据信息
   *
   * @param {T} itemInfo
   * @param {boolean} [isNeedUpdate=true]
   * @returns {Promise<T>}
   */
  const update = useCallback((itemInfo: T) => {
    try {
      dispatch({ type: "UPDATE_ITEM", items: { item: itemInfo, keyName } });

      return { code: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  /**
   * 删除数据
   *
   * @param {(string | string[])} ids
   * @param {boolean} [isNeedUpdate=true]
   * @returns {Promise<T>}
   */
  const remove = useCallback(async (ids: string | string[]) => {
    try {
      if (typeof ids !== "string") {
        dispatch({
          type: "REMOVE_ITEM_BY_ID",
          items: { itemIds: ids, keyName: keyName ? keyName : "id" }
        });
      } else {
        dispatch({
          type: "REMOVE_ITEM_BY_ID",
          items: { itemIds: [ids], keyName: keyName ? keyName : "id" }
        });
      }
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    ...state,
    query,
    reset,
    save,
    update,
    remove
  };
}
export default useRestAPi;
