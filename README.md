# fp-waterfall
基于CSS和JS实现瀑布流布局，自适应宽度
## Usage
1. 安装依赖
```bash
pnpm install fp-waterfall
```
2. 引入组件
```js
import Waterfall from 'fp-waterfall'
```
3. 使用组件
```js
const waterfall = new Waterfall({
  wrapper: "#waterfall",
  columnWidth: 200,
  gap: 12,
  delay: 100
})
```
## 参数说明
| 参数 | 类型 | 默认值 | 说明 | 是否必填 |
| --- | --- | --- | --- | --- |
| wrapper | string | "" | 瀑布流容器选择器 | 是 |
| columnWidth | number | 200 | 列宽度 | 否 |
| gap | number | 0 | 间距 | 否 |
| delay | number | 100 | 延迟时间 | 否 |
