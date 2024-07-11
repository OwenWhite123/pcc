import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { defineComponent, h, resolveComponent } from 'vue'
import { getGlobalDefaultOpenedMenus, getGlobalDefaultActiveMenu } from '@/core/global-data'
import styles from './index.module.css'
import { waitReceiveCount } from '@/utils'

export default defineComponent({
  components: {
    ElMenu,
    ElSubMenu,
    ElMenuItem
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    activeMenu() {
      return getGlobalDefaultActiveMenu()
    }
  },
  created() {},
  async mounted() {
    await waitReceiveCount()
  },
  methods: {
    /**
     *
     * @param {*} menus
     * @param {*} flag true代表是子菜单
     * @returns
     */
    renderMenuItem(menus, flag) {
      const vnodes = []
      menus.map((menu) => {
        const children = []
        if (menu?.meta?.icon) {
          children.push(
            h('img', {
              src: `${menu.meta.icon}`,
              style: 'width: 20px; height: 20px;'
            })
          )
        }
        if (flag) {
          children.push(
            h('span', {
              class: 'circle'
            })
          )
        }
        children.push(
          h(
            'span',
            {
              class: styles.title
            },
            { default: () => menu.meta.title }
          )
        )

        // if (menu?.meta?.hasRedDot || menu?.children?.meta?.hasRedDot || menu?.children?.children?.meta?.hasRedDot) {
        //   children.push(h('span', {
        //     class: styles.redDot,
        //   }))
        // }

        const itemChildren = menu.children && menu.children.filter((item) => !item.hidden)
        if (
          !menu.hideChildrenInMenu &&
          menu.children &&
          menu.children.length &&
          itemChildren.length
        ) {
          vnodes.push(
            h(
              resolveComponent('el-sub-menu'),
              {
                index: menu.path
              },
              {
                title: () => h('span', children),
                default: () => this.renderMenuItem(menu.children, true)
              }
            )
          )
        } else {
          if (menu.count) {
            children.push(
              h(
                'div',
                {
                  class: styles.redpoint
                },
                { default: () => menu.count }
              )
            )
          }
          if (!menu.hidden) {
            vnodes.push(
              h(
                resolveComponent('el-menu-item'),
                {
                  index: menu.path
                },
                {
                  title: () =>
                    h(
                      resolveComponent('el-row'),
                      {
                        align: 'middle'
                      },
                      { default: () => children }
                    )
                }
              )
            )
          }
        }
      })
      return vnodes
    },
    isActiveItem(menu) {
      return this.activeMenu.includes(menu.path)
    }
  },
  render() {
    const menus = this.$props.menus
    return h(
      resolveComponent('el-menu'),
      {
        defaultOpeneds: getGlobalDefaultOpenedMenus(),
        defaultActive: this.activeMenu,
        uniqueOpened: true,
        ref: 'menu',
        router: true
      },
      { default: () => this.renderMenuItem(menus) }
    )
  }
})
