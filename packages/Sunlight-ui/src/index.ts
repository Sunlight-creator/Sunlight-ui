import { App } from 'vue';
import SunlightInput from './SunlightInput.vue';
import SunlightSelect from './SunlightSelect.vue';
import SunlightRadio from './SunlightRadio.vue';
import SunlightDatePicker from './SunlightDatePicker.vue';
import SunlightTextarea from './SunlightTextarea.vue';
import SunlightCascader from './SunlightCascader.vue';
import SunlightCheckbox from './SunlightCheckbox.vue';
import SunlightThree from './SunlightThree.vue';
import SunlightImages from './SunlightImages.vue';
import SunlightImage from './SunlightImage.vue';
import SunlightForm from './SunlightForm.vue';
import SunlightTable from './SunlightTable/index.ts';
import SunlightDialog from './SunlightDialog.vue';
import SunlightDrawer from './SunlightDrawer.vue';
// 卡片
import SunlightBasicCard from './SunlightBasicCard.vue';
import SunlightListCard from './SunlightListCard.vue';
import SunlightProgressCard from './SunlightProgressCard.vue';
// echarts 卡片
import SunlightBarChartCard from './ChartCard/SunlightBarChartCard.vue';
import SunlightDonutChartCard from './ChartCard/SunlightDonutChartCard.vue';
import SunlightLineChartCard from './ChartCard/SunlightLineChartCard.vue';
import SunlightLargeBarChartCard from './ChartCard/SunlightLargeBarChartCard.vue';
import SunlightLargeDonutChartCard from './ChartCard/SunlightLargeDonutChartCard.vue';
import SunlightLargeLineChartCard from './ChartCard/SunlightLargeLineChartCard.vue';
// 统计图
import SunlightBarChart from './StatisticalChart/SunlightBarChart.vue';
import SunlightStackedChart from './StatisticalChart/SunlightStackedChart.vue';
import SunlightLevelChart from './StatisticalChart/SunlightLevelChart.vue';
import SunlightKLineChart from './StatisticalChart/SunlightKLineChart.vue';
import SunlightPolylineChart from './StatisticalChart/SunlightPolylineChart.vue';
import SunlightRadarChart from './StatisticalChart/SunlightRadarChart.vue';
import SunlightScatterChart from './StatisticalChart/SunlightScatterChart.vue';

// 指令
import copy from '../directives/copy.ts';
import debounce from '../directives/debounce.ts';
import waterMarker from '../directives/waterMarker.ts';
import throttle from '../directives/throttle.ts';
import longpress from '../directives/longpress.ts';

// 工具方法
import {
  generateUUID,
  localGet,
  localSet,
  localRemove,
  localClear,
  isType,
  isObjectValueEqual,
  randomNum,
  checkPhoneNumber,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isAsyncFunction,
  isPromise,
  isString,
  isBoolean,
  isArray,
  isClient,
  isWindow,
  isElement,
  isNull,
  isNullOrUnDef,
} from '../utils/index';
 
// 定义组件列表
export {
  SunlightInput,
  SunlightSelect,
  SunlightRadio,
  SunlightDatePicker,
  SunlightTextarea,
  SunlightCascader,
  SunlightCheckbox,
  SunlightThree,
  SunlightImages,
  SunlightImage,
  SunlightForm,
  SunlightTable,
  SunlightDialog,
  SunlightDrawer,
  SunlightBasicCard,
  SunlightListCard,
  SunlightProgressCard,
  SunlightBarChartCard,
  SunlightDonutChartCard,
  SunlightLineChartCard,
  SunlightLargeBarChartCard,
  SunlightLargeDonutChartCard,
  SunlightLargeLineChartCard,
  SunlightBarChart,
  SunlightStackedChart,
  SunlightLevelChart,
  SunlightKLineChart,
  SunlightPolylineChart,
  SunlightRadarChart,
  SunlightScatterChart,
  copy,
  debounce,
  waterMarker,
  throttle,
  longpress,
  generateUUID,
  localGet,
  localSet,
  localRemove,
  localClear,
  isType,
  isObjectValueEqual,
  randomNum,
  checkPhoneNumber,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isAsyncFunction,
  isPromise,
  isString,
  isBoolean,
  isArray,
  isClient,
  isWindow,
  isElement,
  isNull,
  isNullOrUnDef,
};
// 定义默认导出，用于 Vue.use()
const SunlightUI = {
  install(app: App) {
    // 注册所有组件
    const components = {
      SunlightInput,
      SunlightSelect,
      SunlightRadio,
      SunlightDatePicker,
      SunlightTextarea,
      SunlightCascader,
      SunlightCheckbox,
      SunlightThree,
      SunlightImages,
      SunlightImage,
      SunlightForm,
      SunlightTable,
      SunlightDialog,
      SunlightDrawer,
      SunlightBasicCard,
      SunlightListCard,
      SunlightProgressCard,
      SunlightBarChartCard,
      SunlightDonutChartCard,
      SunlightLineChartCard,
      SunlightLargeBarChartCard,
      SunlightLargeDonutChartCard,
      SunlightLargeLineChartCard,
      SunlightBarChart,
      SunlightStackedChart,
      SunlightLevelChart,
      SunlightKLineChart,
      SunlightPolylineChart,
      SunlightRadarChart,
      SunlightScatterChart
    };

    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }

    // 注册指令
    app.directive('copy', copy);
    app.directive('debounce', debounce);
    app.directive('water-marker', waterMarker);
    app.directive('throttle', throttle);
    app.directive('longpress', longpress);
  }
};

export default SunlightUI;
