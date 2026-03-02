const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: MenuType.MenuOptions[] = [
  {
    path: '/project',
    name: 'project',
    component: Layout,
    meta: {
      title: '项目列表',
      icon: 'menu-project',
      roles: ['administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'project-test',
        component: () => import('@/views/project/index.vue'),
        name: 'ProjectTest',
        meta: {
          title: '项目测试',
          icon: 'menu-project',
          roles: ['administrator'],
          isKeepAlive: true
        }
      }
    ]
  },

  {
    path: '/sunlightInput',
    name: 'SunlightInput',
    component: Layout,
    meta: {
      title: 'sunlightInput',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'input1',
        component: () => import('@/views/sunlightInput/input1/index.vue'),
        name: 'Input1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'input6',
        component: () => import('@/views/sunlightInput/input6/index.vue'),
        name: 'input6',
        meta: {
          title: '插槽',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'input7',
        component: () => import('@/views/sunlightInput/input7/index.vue'),
        name: 'input7',
        meta: {
          title: '自定义主题',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightTextarea',
    name: 'sunlightTextarea',
    component: Layout,
    meta: {
      title: 'sunlightTextarea',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'textarea1',
        component: () => import('@/views/sunlightTextarea/textarea1/index.vue'),
        name: 'Textarea1',
        meta: {
          title: '多行文本',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'textarea2',
        component: () => import('@/views/sunlightTextarea/textarea2/index.vue'),
        name: 'textarea2',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightSelect',
    name: 'sunlightSelect',
    component: Layout,
    meta: {
      title: 'sunlightSelect',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'select1',
        component: () => import('@/views/sunlightSelect/select1/index.vue'),
        name: 'select1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'select2',
        component: () => import('@/views/sunlightSelect/select2/index.vue'),
        name: 'select2',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      // {
      //   path: 'select3',
      //   component: () => import('@/views/sunlightSelect/select3/index.vue'),
      //   name: 'select3',
      //   meta: {
      //     title: '选择框',
      //     icon: 'menu-component',
      //     roles: ['admin', 'administrator'],
      //     isKeepAlive: true
      //   }
      // },
      {
        path: 'select4',
        component: () => import('@/views/sunlightSelect/select4/index.vue'),
        name: 'select4',
        meta: {
          title: '自定义模板',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'select5',
        component: () => import('@/views/sunlightSelect/select5/index.vue'),
        name: 'select5',
        meta: {
          title: '多选模板',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'select6',
        component: () => import('@/views/sunlightSelect/select6/index.vue'),
        name: 'select6 ',
        meta: {
          title: '多选模板',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightDatePicker',
    name: 'sunlightDatePicker',
    component: Layout,
    meta: {
      title: 'sunlightDatePicker',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'datePicker1',
        component: () => import('@/views/sunlightDatePicker/datePicker1/index.vue'),
        name: 'datePicker1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      // {
      //   path: 'datePicker2',
      //   component: () => import('@/views/sunlightDatePicker/datePicker2/index.vue'),
      //   name: 'datePicker2',
      //   meta: {
      //     title: '时间/日期选择器',
      //     icon: 'menu-component',
      //     roles: ['admin', 'administrator'],
      //     isKeepAlive: true
      //   }
      // },
      {
        path: 'datePicker3',
        component: () => import('@/views/sunlightDatePicker/datePicker3/index.vue'),
        name: 'datePicker3',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightCascader',
    name: 'sunlightCascader',
    component: Layout,
    meta: {
      title: 'sunlightCascader',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'cascader1',
        component: () => import('@/views/sunlightCascader/cascader1/index.vue'),
        name: 'cascader1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'cascader2',
        component: () => import('@/views/sunlightCascader/cascader2/index.vue'),
        name: 'cascader2',
        meta: {
          title: '异步加载+多选',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'cascader3',
        component: () => import('@/views/sunlightCascader/cascader3/index.vue'),
        name: 'cascader3',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'cascader4',
        component: () => import('@/views/sunlightCascader/cascader4/index.vue'),
        name: 'cascader4',
        meta: {
          title: '异步加载+过滤搜索',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'cascader5',
        component: () => import('@/views/sunlightCascader/cascader5/index.vue'),
        name: 'cascader5',
        meta: {
          title: '自定义分隔符',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightRadio',
    name: 'sunlightRadio',
    component: Layout,
    meta: {
      title: 'sunlightRadio',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'radio1',
        component: () => import('@/views/sunlightRadio/radio1/index.vue'),
        name: 'radio1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'radio2',
        component: () => import('@/views/sunlightRadio/radio2/index.vue'),
        name: 'radio2',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightCheckbox',
    name: 'sunlightCheckbox',
    component: Layout,
    meta: {
      title: 'sunlightCheckbox',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'checkbox1',
        component: () => import('@/views/sunlightCheckbox/checkbox1/index.vue'),
        name: 'checkbox1',
        meta: {
          title: '自定义颜色样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'checkbox2',
        component: () => import('@/views/sunlightCheckbox/checkbox2/index.vue'),
        name: 'checkbox2',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightImages',
    name: 'sunlightImages',
    component: Layout,
    meta: {
      title: 'sunlightImages',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'images1',
        component: () => import('@/views/sunlightImages/img1/index.vue'),
        name: 'images1',
        meta: {
          title: '多张图上传',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'images2',
        component: () => import('@/views/sunlightImages/img2/index.vue'),
        name: 'images2',
        meta: {
          title: '单长图上传',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'images5',
        component: () => import('@/views/sunlightImages/img5/index.vue'),
        name: 'images5',
        meta: {
          title: '图片上传案例',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightThree',
    name: 'sunlightThree',
    component: Layout,
    meta: {
      title: 'sunlightThree',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'three1',
        component: () => import('@/views/sunlightThree/three1/index.vue'),
        name: 'three1',
        meta: {
          title: '自定义主题样式',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'three2',
        component: () => import('@/views/sunlightThree/three2/index.vue'),
        name: 'three2',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'three4',
        component: () => import('@/views/sunlightThree/three4/index.vue'),
        name: 'three4',
        meta: {
          title: '自定义节点',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'three5',
        component: () => import('@/views/sunlightThree/three5/index.vue'),
        name: 'three5',
        meta: {
          title: '异步加载示例',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightTable',
    name: 'sunlightTable',
    component: Layout,
    meta: {
      title: 'sunlightTable',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'table1',
        component: () => import('@/views/sunlightTable/table1/index.vue'),
        name: 'table1',
        meta: {
          title: '基础使用',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table2',
        component: () => import('@/views/sunlightTable/table2/index.vue'),
        name: 'table2',
        meta: {
          title: '表格单选',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table3',
        component: () => import('@/views/sunlightTable/table3/index.vue'),
        name: 'table3',
        meta: {
          title: '表格分页多选',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table4',
        component: () => import('@/views/sunlightTable/table4/index.vue'),
        name: 'table4',
        meta: {
          title: '排序',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table5',
        component: () => import('@/views/sunlightTable/table5/index.vue'),
        name: 'table5',
        meta: {
          title: '综合案例',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table8',
        component: () => import('@/views/sunlightTable/table8/index.vue'),
        name: 'table8',
        meta: {
          title: '固定列',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table9',
        component: () => import('@/views/sunlightTable/table9/index.vue'),
        name: 'table9',
        meta: {
          title: '多级表头',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table14',
        component: () => import('@/views/sunlightTable/table14/index.vue'),
        name: 'table14',
        meta: {
          title: '合计',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table15',
        component: () => import('@/views/sunlightTable/table15/index.vue'),
        name: 'table15',
        meta: {
          title: '树形表格',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table16',
        component: () => import('@/views/sunlightTable/table16/index.vue'),
        name: 'table16',
        meta: {
          title: '合并单元格',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table17',
        component: () => import('@/views/sunlightTable/table17/index.vue'),
        name: 'table17',
        meta: {
          title: '自定义行颜色',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table18',
        component: () => import('@/views/sunlightTable/table18/index.vue'),
        name: 'table18',
        meta: {
          title: '懒加载表格',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'table20',
        component: () => import('@/views/sunlightTable/table20/index.vue'),
        name: 'table20',
        meta: {
          title: '行内编辑',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightForm',
    name: 'sunlightForm',
    component: Layout,
    meta: {
      title: 'sunlightForm',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'form1',
        component: () => import('@/views/sunlightForm/form1/index.vue'),
        name: 'form1',
        meta: {
          title: '多功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form2',
        component: () => import('@/views/sunlightForm/form2/index.vue'),
        name: 'form2',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form3',
        component: () => import('@/views/sunlightForm/form3/index.vue'),
        name: 'form3',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form4',
        component: () => import('@/views/sunlightForm/form4/index.vue'),
        name: 'form4',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form5',
        component: () => import('@/views/sunlightForm/form5/index.vue'),
        name: 'form5',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form6',
        component: () => import('@/views/sunlightForm/form6/index.vue'),
        name: 'form6',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form7',
        component: () => import('@/views/sunlightForm/form7/index.vue'),
        name: 'form7',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form8',
        component: () => import('@/views/sunlightForm/form8/index.vue'),
        name: 'form8',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form9',
        component: () => import('@/views/sunlightForm/form9/index.vue'),
        name: 'form9',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form10',
        component: () => import('@/views/sunlightForm/form10/index.vue'),
        name: 'form10',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form11',
        component: () => import('@/views/sunlightForm/form11/index.vue'),
        name: 'form11',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form12',
        component: () => import('@/views/sunlightForm/form12/index.vue'),
        name: 'form12',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'form13',
        component: () => import('@/views/sunlightForm/form13/index.vue'),
        name: 'form13',
        meta: {
          title: '功能表单',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightDrawer',
    name: 'sunlightDrawer',
    component: Layout,
    meta: {
      title: 'sunlightDrawer',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'drawer1',
        component: () => import('@/views/sunlightDrawer/drawer1/index.vue'),
        name: 'drawer1',
        meta: {
          title: '抽屉表格增删改查',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/sunlightDialog',
    name: 'sunlightDialog',
    component: Layout,
    meta: {
      title: 'sunlightDialog',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'dialog1',
        component: () => import('@/views/sunlightDialog/dialog1/index.vue'),
        name: 'dialog1',
        meta: {
          title: '弹窗表格增删改查',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 基础卡片
  {
    path: '/baseCard',
    name: 'BaseCard',
    component: Layout,
    meta: {
      title: '基础卡片',
      icon: 'menu-components',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'sunlightBasicCard',
        component: () => import('@/views/baseCard/sunlightBasicCard/index.vue'),
        name: 'SunlightBasicCard',
        meta: {
          title: 'SunlightBasicCard',
          icon: 'menu-component',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },

  // 菜单嵌套
  // {
  //   path: '/menu-nest',
  //   name: 'menuNest',
  //   component: Layout,
  //   meta: {
  //     title: '菜单嵌套',
  //     icon: 'menu-nest',
  //     roles: ['admin', 'administrator', 'visitor'],
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: 'menu-nest1',
  //       name: 'Nest1',
  //       component: () => import('@/views/menuNest/Nest1/index.vue'),
  //       meta: {
  //         title: '菜单1',
  //         icon: 'menu-nest',
  //         roles: ['admin', 'administrator', 'visitor'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'menu-nest2',
  //       name: 'Nest2',
  //       meta: {
  //         title: '菜单2',
  //         icon: 'menu-nest',
  //         roles: ['admin', 'administrator', 'visitor'],
  //         isKeepAlive: true
  //       },
  //       children: [
  //         {
  //           path: 'menu-nest21',
  //           name: 'Nest21',
  //           component: () => import('@/views/menuNest/Nest2/Nest21/index.vue'),
  //           meta: {
  //             title: '菜单2-1',
  //             icon: 'menu-nest',
  //             roles: ['admin', 'administrator', 'visitor'],
  //             isKeepAlive: true
  //           }
  //         },
  //         {
  //           path: 'menu-nest22',
  //           name: 'Nest22',
  //           meta: {
  //             title: '菜单2-2',
  //             icon: 'menu-nest',
  //             roles: ['admin', 'administrator'],
  //             isKeepAlive: true
  //           },
  //           children: [
  //             {
  //               path: 'menu-nest221',
  //               name: 'Nest221',
  //               component: () => import('@/views/menuNest/Nest2/Nest22/Nest221/index.vue'),
  //               meta: {
  //                 title: '菜单2-2-1',
  //                 icon: 'menu-nest',
  //                 roles: ['admin', 'administrator'],
  //                 isKeepAlive: true
  //               }
  //             },
  //             {
  //               path: 'menu-nest222',
  //               name: 'Nest222',
  //               component: () => import('@/views/menuNest/Nest2/Nest22/Nest222/index.vue'),
  //               meta: {
  //                 title: '菜单2-2-2',
  //                 icon: 'menu-nest',
  //                 roles: ['admin', 'administrator'],
  //                 isKeepAlive: true
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu-nest23',
  //           name: 'Nest23',
  //           component: () => import('@/views/menuNest/Nest2/Nest23/index.vue'),
  //           meta: {
  //             title: '菜单2-3',
  //             icon: 'menu-nest',
  //             roles: ['admin', 'administrator'],
  //             isKeepAlive: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu-nest3',
  //       name: 'Nest3',
  //       component: () => import('@/views/menuNest/Nest3/index.vue'),
  //       meta: {
  //         title: '菜单3',
  //         icon: 'menu-nest',
  //         roles: ['admin', 'administrator', 'visitor'],
  //         isKeepAlive: true
  //       }
  //     }
  //   ]
  // },
  // 表单
  // {
  //   path: '/form',
  //   name: 'form',
  //   component: Layout,
  //   meta: {
  //     title: '表单 Form',
  //     icon: 'menu-form',
  //     roles: ['admin', 'administrator'],
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: 'basic-form',
  //       name: 'BasicForm',
  //       component: () => import('@/views/form/basicForm/index.vue'),
  //       meta: {
  //         title: '基础表单',
  //         icon: 'menu-form',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'validate-form',
  //       name: 'ValidateForm',
  //       component: () => import('@/views/form/validateForm/index.vue'),
  //       meta: {
  //         title: '校验表单',
  //         icon: 'menu-form',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     }
  //   ]
  // },
  // echarts图表
  // {
  //   path: '/echarts',
  //   name: 'echarts',
  //   component: Layout,
  //   meta: {
  //     title: 'ECharts',
  //     icon: 'menu-echarts',
  //     roles: ['admin', 'administrator'],
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: 'column-chart',
  //       component: () => import('@/views/echarts/columnChart/index.vue'),
  //       name: 'ColumnChart',
  //       meta: {
  //         title: '柱状图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'line-chart',
  //       component: () => import('@/views/echarts/lineChart/index.vue'),
  //       name: 'LineChart',
  //       meta: {
  //         title: '折线图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'nested-chart',
  //       component: () => import('@/views/echarts/NestedChart/index.vue'),
  //       name: 'NestedChart',
  //       meta: {
  //         title: '嵌套环形图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'pie-chart',
  //       component: () => import('@/views/echarts/pieChart/index.vue'),
  //       name: 'PieChart',
  //       meta: {
  //         title: '饼图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'radar-chart',
  //       component: () => import('@/views/echarts/radarChart/index.vue'),
  //       name: 'RadarChart',
  //       meta: {
  //         title: '雷达图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: 'water-chart',
  //       component: () => import('@/views/echarts/waterChart/index.vue'),
  //       name: 'WaterChart',
  //       meta: {
  //         title: '水型图',
  //         icon: 'menu-echarts',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: true
  //       }
  //     }
  //   ]
  // },
  // 指令
  {
    path: '/directives',
    name: 'Directives',
    component: Layout,
    meta: {
      title: '指令',
      icon: 'menu-direct',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'debounce-direct',
        component: () => import('@/views/directives/debounceDirect/index.vue'),
        name: 'DebounceDirect',
        meta: {
          title: '防抖指令',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'throttle-direct',
        component: () => import('@/views/directives/throttleDirect/index.vue'),
        name: 'ThrottleDirect',
        meta: {
          title: '节流指令',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'Watermark-direct',
        component: () => import('@/views/directives/watermarkDirect/index.vue'),
        name: 'WatermarkDirect',
        meta: {
          title: '水印指令',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'Longpress-direct',
        component: () => import('@/views/directives/longpressDirect/index.vue'),
        name: 'LongpressDirect',
        meta: {
          title: '长按指令',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      },
      {
        path: 'Copy-direct',
        component: () => import('@/views/directives/copyDirect/index.vue'),
        name: 'CopyDirect',
        meta: {
          title: 'Copy指令',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },

  {
    path: '/sunlightUntis',
    name: 'sunlightUntis',
    component: Layout,
    meta: {
      title: '工具utils',
      icon: 'menu-direct',
      roles: ['admin', 'administrator'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'utils',
        component: () => import('@/views/sunlightUntis/utils/index.vue'),
        name: 'utils',
        meta: {
          title: '工具utils',
          icon: 'menu-direct',
          roles: ['admin', 'administrator'],
          isKeepAlive: true
        }
      }
    ]
  },

  // {
  //   path: '/link',
  //   name: 'Link',
  //   meta: {
  //     title: '外部链接',
  //     icon: 'menu-link',
  //     roles: ['admin', 'administrator'],
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: 'vue',
  //       name: 'Vue',
  //       meta: {
  //         icon: 'menu-link',
  //         title: 'Vue 官网',
  //         isLinkUrl: 'https://cn.vuejs.org/guide/introduction.html',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: false
  //       }
  //     },
  //     {
  //       path: 'vite',
  //       name: 'Vite',
  //       meta: {
  //         icon: 'menu-link',
  //         title: 'Vite 官网',
  //         isLinkUrl: 'https://cn.vitejs.dev/guide/',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: false
  //       }
  //     },
  //     {
  //       path: 'juejin',
  //       name: 'Juejin',
  //       meta: {
  //         icon: 'menu-link',
  //         title: '掘金',
  //         isLinkUrl: 'https://juejin.cn/',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: false
  //       }
  //     },
  //     {
  //       path: 'vue-i18n',
  //       name: 'VueI18n',
  //       meta: {
  //         icon: 'menu-link',
  //         title: 'Vue-i18n 文档',
  //         isLinkUrl: 'https://kazupon.github.io/vue-i18n/zh/installation.html',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: false
  //       }
  //     },
  //     {
  //       path: 'element-plus',
  //       name: 'ElementPlus',
  //       meta: {
  //         icon: 'menu-link',
  //         title: 'ElementPlus 官网',
  //         isLinkUrl: 'https://element-plus.gitee.io/zh-CN/',
  //         roles: ['admin', 'administrator'],
  //         isKeepAlive: false
  //       }
  //     }
  //   ]
  // }
]
