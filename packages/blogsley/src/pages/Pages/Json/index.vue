<template>
  <q-page padding class="content-page">
    <div style="overflow: auto">
      <pre><code>{{block.stringify()}}</code></pre>
    </div>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
const directives = import.meta.env.VITE_STANDALONE ? '@client' : ''

import { BlocksleyState, deserialize } from '@blocksley/blocksley'

import { UiMixin, PageMixin } from '@mixins'
import Navbox from './Navbox.vue'

export default {
  mixins: [UiMixin, PageMixin],
  props: ['id'],
  components: {
  },
  data () {
    return {
      title: 'Page JSON',
      postId: this.$route.params.id,
      state: new BlocksleyState()
    }
  },
  computed: {
    block: function () { return this.state.block }
  },
  apollo: {
    post: {
      query: gql`
        query postQuery($id: UUID!) {
          postById(id: $id) ${directives} {
            id
            title
            block
            body
          }
        }`,
      variables () {
        return {
          id: this.postId
        }
      },
      update (data) {
        const post = data.postById
        console.log(post)
        this.state.block = deserialize(JSON.parse(post.block))
        //this.state.block = deserialize(post.block)
        return post
      }
      // fetchPolicy: 'network-only'
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    onSwitch () {
      this.setView(this)
      this.setNavbox(Navbox)
    }
  }
}
</script>
