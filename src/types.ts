export interface UIDLBorder {
  style?: '1' | '2' | '3' | '4' | '5' | 1 | 2 | 3 | 4 | 5
  width?: string | number
  color?: string | number
  line?: string
}

export interface UIDLComponent {
  type: string
  contentType?: string
  style?: any
  text?: string
  path?: string
  icon?: string
  componentId?: string
  className?: string
  classNames?: string[]
  resource?: string
  onClick?: string
  placeholder?: string
  children?: UIDLComponent[]
  dataModel?: string
  dataId?: string
  border?: UIDLBorder
  options?: any[]
}

export interface UIDLEndpointConfig {
  baseUrl?: string
  languageSuffix?: {
    zh_CN?: '_cn'
    en_US?: '_en'
    es_ES?: '_es'
  }
  fileSuffix?: string
  page?: string[]
  startPage?: string
  pageImageUri?: Array<{
    [key: string]: string
  }>
}

export interface UIDLBaseCSS {
  pageName?: 'BaseCSS'
  defaultValue?: {
    [key: string]: any
  }
  globalVar?: {
    [key: string]: any
  }
  classNames?: {
    [key: string]: any
  }
}

export interface UIDLBasePage {
  PageName?: 'BasePage'
  resourceUrl?: string
  footer?: {
    tabBarItem1?: any
    tabBarItem2?: any
    tabBarItem3?: any
    tabBarItem4?: any
  }
}

export interface BaseCSS {
  base: React.CSSProperties
  global: React.CSSProperties
  image: React.CSSProperties
  label: React.CSSProperties
  textField: React.CSSProperties
  checkBox: React.CSSProperties
  divider: React.CSSProperties
  button: React.CSSProperties
  shadow: React.CSSProperties
  header?: React.CSSProperties
  leftButton?: React.CSSProperties
  headerTitle?: React.CSSProperties
  rightButton?: React.CSSProperties
  tabBarButton1?: React.CSSProperties
  tabBarButton2?: React.CSSProperties
  tabBarButton3?: React.CSSProperties
  tabBarButton4?: React.CSSProperties
  tabBarLabel1?: React.CSSProperties
  tabBarLabel2?: React.CSSProperties
  tabBarLabel3?: React.CSSProperties
  tabBarLabel4?: React.CSSProperties
  highLightColor?: string
  tagView?: React.CSSProperties
  tagViewIndicator?: React.CSSProperties
  greenButton?: React.CSSProperties
  searchBar?: React.CSSProperties
  surroundBorder?: React.CSSProperties
  glowyBorder?: React.CSSProperties
  cardView?: React.CSSProperties
  cardViewTitle?: React.CSSProperties
  cardViewSubtitle?: React.CSSProperties
  cardViewIcon?: React.CSSProperties
}

export interface UIDLPage {
  pageName?: string
  dataModel?: any
  components?: UIDLComponent[]
}

export interface CurrentPage {
  pageName: string
  dataModel?: any
  components: UIDLComponent[]
}

export interface ComponentRenderProps
  extends Omit<Partial<React.HTMLAttributes<any>>, 'onClick' | 'style'> {
  uidl: {
    config: null | UIDLEndpointConfig
    css: BaseCSS
    createAssetUrl: (path: string) => string
    currentPage: null | UIDLPage
    parseComponent: (node: UIDLComponent) => React.ReactNode | JSX.Element
    component: UIDLComponent
  }
  componentId?: string
  inputType?: string
  onClick?: string | Function
  type: string
  style: React.CSSProperties
  src?: string
}

export type ComponentType =
  | 'button'
  | 'div'
  | 'img'
  | 'input'
  | 'input.date'
  | 'label'

export type ComponentFunction = (
  args: any,
  options: ComponentFunctionOptions,
) => any

export interface ComponentFunctionOptions {
  css: BaseCSS
  currentPage: CurrentPage
  createAssetUrl: (path: string) => string
}

export interface ResolverOptions {
  config?: null | UIDLEndpointConfig
  css?: BaseCSS
  node: FinalizedUIDLComponent
  tagName?: null | string
}

export interface FinalizedUIDLComponent extends UIDLComponent {
  inputType?: string
  src?: string
  selectOptions?: any[]
}

// Known keys that need transformation/renaming when parsing
export type UIDLKeyEntity =
  | 'align'
  | 'border'
  | 'color'
  | 'contentType'
  | 'children'
  | 'className'
  | 'classNames'
  | 'onClick'
  | 'path'
  | 'resource'
  | 'shadow'
  | 'text'
  | 'textColor'
  | 'width'
  | 'height'
  | 'top'
  | 'left'
  | 'type'
