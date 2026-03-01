/**
 * 表格行数据示例类型
 * 这是一个示例接口，实际使用时可以根据业务需求扩展
 * 使用索引签名 [key: string]: any 允许添加任意属性
 */
export interface RowData {
  id: number              // 行的唯一标识 ID
  name: string            // 名称
  age: number             // 年龄
  [key: string]: any     // 允许添加其他任意属性
}

/**
 * 权限类型示例，可根据实际业务扩展
 * 用于控制列的显示权限，例如：'read'（只读）、'write'（可写）、'admin'（管理员）
 * 也可以使用自定义字符串
 */
export type Permission = 'read' | 'write' | 'admin' | string

/**
 * 自定义表格列配置项类型
 * 定义了表格列的完整配置选项，包括显示、排序、过滤、自定义渲染等
 */
export interface TableItem {
  /**
   * 列的唯一标识（必需，用于数据绑定）
   * 对应数据对象中的属性名，例如：'name'、'age'、'email'
   */
  prop: string

  /**
   * 列显示的标题（必需）
   * 显示在表头的文本，例如：'姓名'、'年龄'、'邮箱'
   */
  label: string

  /**
   * 列宽度，数字表示像素，字符串可支持百分比等
   * 例如：100（100px）、'20%'（20%宽度）
   */
  width?: number | string

  /**
   * 最小列宽
   * 当表格宽度不足时，列的最小宽度
   * 例如：100（100px）、'100px'
   */
  minWidth?: number | string

  /**
   * 是否固定列，支持 true / 'left' / 'right'
   * true: 固定在左侧
   * 'left': 固定在左侧
   * 'right': 固定在右侧
   * 不设置或 false: 不固定
   */
  fixed?: boolean | 'left' | 'right'

  /**
   * 列对齐方式，left / center / right
   * 控制列内容的对齐方式
   */
  align?: 'left' | 'center' | 'right'

  /**
   * 表头对齐方式
   * 控制表头文本的对齐方式，如果不设置则使用 align
   */
  headerAlign?: 'left' | 'center' | 'right'

  /**
   * 是否可排序
   * true: 启用排序
   * 'custom': 自定义排序（需要配合 sortMethod 使用）
   * false 或不设置: 不可排序
   */
  sortable?: boolean | 'custom'

  /**
   * 自定义排序方法
   * 当 sortable 为 'custom' 时使用
   * @param a - 第一行数据
   * @param b - 第二行数据
   * @returns 负数表示 a < b，正数表示 a > b，0 表示相等
   */
  sortMethod?: (a: RowData, b: RowData) => number

  /**
   * 是否可过滤
   * true: 启用过滤功能
   * false 或不设置: 不可过滤
   */
  filterable?: boolean

  /**
   * 过滤条件数组
   * 定义过滤选项，每个选项包含 text（显示文本）和 value（过滤值）
   * 例如：[{ text: '激活', value: 'active' }, { text: '禁用', value: 'inactive' }]
   */
  filters?: Array<{ text: string; value: any }>

  /**
   * 过滤方法
   * 自定义过滤逻辑
   * @param value - 选中的过滤值
   * @param row - 当前行数据
   * @returns true 表示显示该行，false 表示隐藏
   */
  filterMethod?: (value: any, row: RowData) => boolean

  /**
   * 自定义渲染插槽名称
   * 如果设置了此属性，可以使用对应的插槽自定义列内容
   * 例如：slotName: 'avatar'，则在父组件中使用 <template #avatar="{ row }"> 来自定义渲染
   */
  slotName?: string

  /**
   * 是否隐藏该列
   * true: 隐藏该列
   * false 或不设置: 显示该列
   */
  hide?: boolean

  /**
   * 权限控制字段
   * 用于根据用户权限控制列的显示
   * 需要配合权限系统使用
   */
  permission?: Permission

  /**
   * 子列，用于复杂表头合并
   * 当需要多级表头时，使用此属性定义子列
   * 例如：父列 label: '成绩'，children: [{ prop: 'math', label: '数学' }, { prop: 'english', label: '英语' }]
   */
  children?: TableItem[]

  /**
   * 是否可编辑
   * true: 该列可以直接编辑，无需点击编辑按钮
   * false 或不设置: 不可编辑
   */
  editable?: boolean

  /**
   * 编辑组件类型
   * 当 editable 为 true 时，指定使用的编辑组件类型
   * 'input': 文本输入框（默认）
   * 'input-number': 数字输入框
   * 'select': 下拉选择器
   * 'date-picker': 日期选择器
   * 'textarea': 多行文本输入框
   */
  editType?: 'input' | 'input-number' | 'select' | 'date-picker' | 'textarea'

  /**
   * 编辑组件的属性配置
   * 用于传递编辑组件的属性，如 placeholder、min、max、disabled 等
   * 例如：{ placeholder: '请输入名称', maxlength: 50 }
   */
  editProps?: Record<string, any>

  /**
   * 选择器选项（当 editType 为 'select' 时使用）
   * 例如：[{ label: '选项1', value: '1' }, { label: '选项2', value: '2' }]
   */
  editOptions?: Array<{ label: string; value: any; disabled?: boolean }>
}

/**
 * Element Plus Table 组件的属性类型（部分常用属性）
 * 这些属性会通过 tableProps 传递给 el-table 组件
 */
export interface ElTableProps {
  height?: string | number                    // 表格高度，可以是数字（像素）或字符串（如 '400px'、'100%'）
  maxHeight?: string | number                 // 表格最大高度
  stripe?: boolean                            // 是否显示斑马纹（交替行背景色）
  border?: boolean                            // 是否显示边框
  size?: 'large' | 'default' | 'small'        // 表格尺寸
  showHeader?: boolean                         // 是否显示表头
  highlightCurrentRow?: boolean                // 是否高亮当前行
  emptyText?: string                          // 空数据时显示的文本
  defaultSort?: {                             // 默认排序规则
    prop?: string                             // 排序字段
    order?: 'ascending' | 'descending'        // 排序方向：升序或降序
  }
  tooltipEffect?: 'dark' | 'light'            // 提示框效果：深色或浅色
  spanMethod?: (params: {                    // 单元格合并方法
    row: RowData                              // 当前行数据
    rowIndex: number                          // 行索引
    columnIndex: number                      // 列索引
  }) => { rowspan: number; colspan: number } | { rowspan: number; colspan: number }  // 返回合并的行数和列数
  selectOnIndeterminate?: boolean            // 当只有部分行被选中时，点击表头多选框的行为
  indent?: number                             // 树形表格的缩进（像素）
  treeProps?: {                               // 树形表格的属性配置
    hasChildren?: string                       // 标识是否有子节点的字段名
    children?: string                          // 子节点数组的字段名
  }
  rowClassName?: string | ((params: { row: RowData; rowIndex: number }) => string)  // 行的 className，可以是字符串或函数
  rowStyle?: string | object | ((params: { row: RowData; rowIndex: number }) => string | object)  // 行的 style
  cellClassName?: string | ((params: { row: RowData; columnIndex: number }) => string)  // 单元格的 className
  cellStyle?: string | object | ((params: { row: RowData; columnIndex: number }) => string | object)  // 单元格的 style
  headerRowClassName?: string | ((params: { rowIndex: number }) => string)  // 表头行的 className
  headerRowStyle?: string | object | ((params: { rowIndex: number }) => string | object)  // 表头行的 style
  headerCellClassName?: string | ((params: { rowIndex: number; columnIndex: number }) => string)  // 表头单元格的 className
  headerCellStyle?: string | object | ((params: { rowIndex: number; columnIndex: number }) => string | object)  // 表头单元格的 style
  summaryMethod?: (params: { columns: any[]; data: RowData[] }) => string[]  // 合计行计算方法
  summaryRows?: number                        // 合计行数量
  lazy?: boolean                              // 是否懒加载（树形表格）
  load?: (row: RowData, treeNode: any, resolve: (data: RowData[]) => void) => void  // 懒加载的加载函数
  showSummary?: boolean                        // 是否显示合计行
  sortBy?: string | ((row: RowData) => any)   // 排序字段或排序函数
  sortOrders?: Array<'ascending' | 'descending' | null>  // 排序顺序数组
  defaultExpandAll?: boolean                   // 是否默认展开所有行（树形表格）
  expandRowKeys?: (string | number)[]         // 展开行的 key 数组
  defaultExpandedKeys?: (string | number)[]   // 默认展开的行的 key 数组
  filterMultiple?: boolean                     // 是否多选过滤
  filteredValue?: Record<string, any[]>        // 过滤后的值（对象，key 为列 prop，value 为选中的过滤值数组）
  filters?: Record<string, Array<{ text: string; value: any }>>  // 过滤条件（对象，key 为列 prop）
  filterMethod?: (value: any, row: RowData, column: any) => boolean  // 过滤方法
  filterPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'  // 过滤框的弹出位置
}

/**
 * 基础表格组件 Props
 * 定义了 SunlighTable 组件的所有属性
 */
export interface BaseTableProps {
  /**
   * 表格数据
   * 数组格式，每个元素代表一行数据
   * 例如：[{ id: 1, name: '张三', age: 25 }, { id: 2, name: '李四', age: 30 }]
   */
  data: RowData[]

  /**
   * 表格列配置
   * 数组格式，每个元素代表一列的配置
   * 例如：[{ prop: 'id', label: 'ID' }, { prop: 'name', label: '姓名' }]
   */
  columns: TableItem[]

  /**
   * 是否显示分页
   * true: 显示分页组件
   * false 或不设置: 不显示分页
   */
  showPagination?: boolean

  /**
   * 当前页码
   * 从 1 开始，默认 1
   * 支持 v-model:currentPage 双向绑定
   */
  currentPage?: number

  /**
   * 每页条数
   * 默认 10
   * 支持 v-model:pageSize 双向绑定
   */
  pageSize?: number

  /**
   * 总条数
   * 用于计算总页数，必须设置才能正确显示分页
   */
  total?: number

  /**
   * 是否显示多选框
   * true: 在表格第一列显示多选框
   * false 或不设置: 不显示多选框
   */
  showSelection?: boolean

  /**
   * 选中行的 key 数组
   * 用于控制哪些行被选中
   * 例如：[1, 2, 3] 表示选中 id 为 1、2、3 的行
   */
  selectedRowKeys?: (string | number)[]

  /**
   * 动态隐藏的列 key 数组
   * 用于动态控制列的显示/隐藏
   * 例如：['email', 'phone'] 表示隐藏 prop 为 'email' 和 'phone' 的列
   */
  hideColumns?: (string | number)[]

  /**
   * 表格事件监听，事件名和回调函数
   * 用于监听 Element Plus Table 的各种事件
   * 例如：{ 'row-click': (row) => console.log(row), 'selection-change': (selection) => console.log(selection) }
   */
  tableListeners?: Record<string, (...args: any[]) => void>

  /**
   * 额外的表格属性（Element Plus Table 的属性）
   * 用于传递 Element Plus Table 的其他属性
   * 例如：{ stripe: true, border: true, height: '400px' }
   */
  tableProps?: Partial<ElTableProps>

  /**
   * 是否显示工具栏
   * 默认 true
   */
  showToolbar?: boolean

  /**
   * 工具栏配置
   * 用于控制工具栏中哪些按钮显示
   */
  toolbarConfig?: ToolbarConfig

  /**
   * 导出列选择配置
   * 用于配置导出时是否可以选择导出列
   */
  exportConfig?: ExportColumnConfig

  /**
   * 搜索表单列配置
   * 用于配置搜索表单中的字段
   */
  searchColumns?: SearchColumn[]

  /**
   * 搜索参数（双向绑定）
   * 搜索表单的数据对象
   */
  searchParam?: Record<string, any>

  /**
   * 搜索表单主题样式
   * 用于统一设置搜索表单字段的边框颜色、聚焦颜色等
   */
  searchThemeStyle?: {
    borderColor?: string
    focusBorderColor?: string
    focusBoxShadow?: string
    backgroundColor?: string
    boxShadow?: string
  }

  /**
   * 可见的搜索字段（双向绑定）
   * 用于控制哪些搜索字段显示
   */
  visibleSearchColumns?: string[]

  /**
   * 搜索表单是否收起
   * 默认：false
   */
  searchCollapsed?: boolean
}

/**
 * 表格列组件 Props
 * 定义了 TableColumn 组件的属性
 */
export interface TableColumnProps {
  column: TableItem    // 列配置对象
  index: number        // 列的索引（从 0 开始）
}

/**
 * 工具栏按钮配置
 * 用于控制工具栏中哪些按钮显示
 */
export interface ToolbarConfig {
  /**
   * 是否显示密度切换按钮
   * 默认 true
   */
  showDensity?: boolean
  
  /**
   * 是否显示导出按钮
   * 默认 true
   */
  showExport?: boolean
  
  /**
   * 是否显示列配置按钮
   * 默认 true
   */
  showColumnConfig?: boolean
  
  /**
   * 是否显示刷新按钮
   * 默认 false
   */
  showRefresh?: boolean

  /**
   * 是否显示查询条件配置按钮
   * 默认 true（当有 searchColumns 时）
   */
  showSearchConfig?: boolean
  
  /**
   * 自定义头部按钮配置
   * 可以添加自定义按钮到工具栏
   */
  customButtons?: Array<{
    /**
     * 按钮的唯一标识
     */
    key: string
    
    /**
     * 按钮显示的文本
     */
    label?: string
    
    /**
     * 按钮图标（Element Plus 图标名称）
     */
    icon?: string
    
    /**
     * 按钮类型（Element Plus 按钮类型）
     */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    
    /**
     * 按钮大小
     */
    size?: 'large' | 'default' | 'small'
    
    /**
     * 是否禁用
     */
    disabled?: boolean
    
    /**
     * 是否显示
     */
    show?: boolean
    
    /**
     * 按钮位置：'left' 左侧，'right' 右侧（默认右侧）
     */
    position?: 'left' | 'right'
  }>
}

/**
 * 导出列选择配置
 */
export interface ExportColumnConfig {
  /**
   * 是否允许选择导出列
   * 默认 false
   */
  enableColumnSelection?: boolean
  
  /**
   * 默认选中的导出列（prop 数组）
   * 如果不设置，默认导出所有可见列
   */
  defaultExportColumns?: string[]
  
  /**
   * 不可导出的列（prop 数组）
   * 这些列不会出现在导出列选择列表中
   */
  excludeColumns?: string[]
}

/**
 * 搜索表单列配置
 * 用于配置搜索表单中的每个字段
 */
export interface SearchColumn {
  /**
   * 字段名（必需）
   * 对应数据对象中的属性名，例如：'name'、'status'、'createDate'
   */
  prop: string

  /**
   * 字段标签（必需）
   * 显示在表单项前的文本，例如：'姓名'、'状态'、'创建日期'
   */
  label: string

  /**
   * 字段类型
   * 支持的类型：'input' | 'textarea' | 'select' | 'cascader' | 'radio' | 'checkbox' | 'date-picker' | 'datetime-picker'
   * 默认：'input'
   */
  type?: 'input' | 'textarea' | 'select' | 'cascader' | 'radio' | 'checkbox' | 'date-picker' | 'datetime-picker'

  /**
   * 占位符文本
   * 例如：'请输入姓名'、'请选择状态'
   */
  placeholder?: string

  /**
   * 是否可清空
   * 默认：true
   */
  clearable?: boolean

  /**
   * 列宽度（24 栅格）
   * 例如：6 表示占 6/24 = 25% 宽度（每行 4 个字段）
   * 8 表示占 8/24 = 33.3% 宽度（每行 3 个字段）
   * 12 表示占 12/24 = 50% 宽度（每行 2 个字段）
   * 默认：6（每行 4 个字段）
   */
  span?: number

  /**
   * 选项数据（用于 select、radio、checkbox、cascader）
   * 可以是数组或异步函数
   */
  options?: Array<{ label: string; value: any; [key: string]: any }> | (() => Promise<any>)

  /**
   * 选项值字段名（用于 select）
   * 默认：'value'
   */
  setValue?: string

  /**
   * 选项标签字段名（用于 select）
   * 默认：'label'
   */
  setLabel?: string

  /**
   * 是否多选（用于 select）
   * 默认：false
   */
  multiple?: boolean

  /**
   * 是否禁用
   * 默认：false
   */
  disabled?: boolean

  /**
   * 自定义主题样式
   * 用于统一设置边框颜色、聚焦颜色等
   */
  wrapperStyle?: {
    borderColor?: string
    focusBorderColor?: string
    focusBoxShadow?: string
    backgroundColor?: string
    boxShadow?: string
  }

  /**
   * 其他配置项
   * 会传递给对应的表单组件
   */
  config?: Record<string, any>

  /**
   * 其他属性
   * 会传递给对应的表单组件
   */
  attrs?: Record<string, any>

  /**
   * 是否禁用切换（用于查询条件配置）
   * 如果为 true，则在查询条件配置中不可隐藏此字段
   * 默认：false
   */
  disableToggle?: boolean
}
