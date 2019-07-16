interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: '首页',
    url: '/home',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: '区划管理',
    url: '/region',
    icon: 'icon-pencil',
    children: [
      {
        name: '省管理',
        url: '/region/province',
        icon: 'icon-puzzle',
        children: [
          {
            name: ' 我市第三季孩子',
            url: '',
            icon: 'icon-puzzle'
          }
        ]
      },
      {
        name: ' 市管理',
        url: '/region/city',
        icon: 'icon-puzzle'
      },
      {
        name: '县/区管理',
        url: '/region/county',
        icon: 'icon-puzzle'
      },
      {
        name: '小区管理',
        url: '/region/community',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: '组织管理',
    url: '/org',
    icon: 'icon-drop',
    children: [
      {
        name: '机构管理',
        url: '/org/agency',
        icon: 'icon-puzzle'
      },
      {
        name: '部门管理',
        url: '/org/department',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
     name: '权限管理',
     url: '/permis',
     icon: 'icon-puzzle',
     children: [
       {
         name: '用户管理',
         url: '/permis/user',
         icon: 'icon-puzzle'
       },
       {
         name: '权限管理',
         url: '/permis/limit',
         icon: 'icon-puzzle'
       },
       {
         name: '角色管理',
         url: '/permis/role',
         icon: 'icon-puzzle'
       },
       {
         name: '用户角色配置',
         url: '/permis/userm',
         icon: 'icon-puzzle'
       },
       {
         name: '角色权限配置',
         url: '/permis/rolem',
         icon: 'icon-puzzle'
       },
     ]
   },
  {
     name: '系统设置',
     url: '/settings',
     icon: 'icon-pie-chart',
     children: [
       {
         name: '基础字段配置',
         url: '/settings/field',
         icon: 'icon-puzzle'
       },
     ]
   },
  /*{
    title: true,
    name: 'Theme'
  },*/
  /*{
    title: true,
    name: 'Components'
  },*/
  /*{
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }*/
];
