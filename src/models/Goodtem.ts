/**
 * 商品对象
 */
export default interface GoodItem {
  /**
   * 主键
   */
  key: number;
  /**
   * 名称
   */
  title: string;

  /**
   * 库存
   */
  amount: number;

  /**
   * 总量
   */
  total: number;
}
