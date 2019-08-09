
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}

// 无视eslint的报错的话，应该是如下的写法
// <template>
//   <!-- eslint-disable vue/require-component-is -->
//   <component v-bind="linkProps(to)">
//     <slot />
//   </component>
// </template>

// <script>
// import { isExternal } from '@/utils/validate'

// export default {
//   props: {
//     to: {
//       type: String,
//       required: true
//     }
//   },
//   methods: {
//     linkProps(url) {
//       if (isExternal(url)) {
//         return {
//           is: 'a',
//           href: url,
//           target: '_blank',
//           rel: 'noopener'
//         }
//       }
//       return {
//         is: 'router-link',
//         to: url
//       }
//     }
//   }
// }
// </script>

</script>