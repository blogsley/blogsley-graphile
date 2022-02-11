<template>
  <q-page padding class="content-page">
    <blocksley :state="state"/>
  </q-page>
</template>

<script>
import { shallowRef } from '@vue/reactivity'
import gql from 'graphql-tag'

import { BlocksleyState, serialize, deserialize, render } from '@blocksley/blocksley'

import { UiMixin, PageMixin } from '@mixins'
import Navbox from './Navbox.vue'
import BlockChooser from '@components/BlockChooser/index.vue'
import ImageChooser from '@components/ImageChooser/index.vue'

const directives = import.meta.env.VITE_STANDALONE ? '@client' : ''

export default {
  mixins: [UiMixin, PageMixin],
  props: ['id'],
  components: {
  },
  data () {
    return {
      title: 'Page',
      postId: this.$route.params.id,
      state: new BlocksleyState({
        blockChooser: shallowRef(BlockChooser),
        imageChooser: shallowRef(ImageChooser)
      })
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
      },
      /*subscribeToMore: {
        // below is the subscription query.
        document: gql`
          subscription post($id: ID!) {
            post(id: $id) {
              kind
            }
          }
        `,
        variables () {
          return {
            id: this.postId
          }
        },
        result (previousResult, { subscriptionData }) {
          const data = subscriptionData.data
          console.log(data)
          this.$q.notify('Page Updated')
          return data
        }
      }*/
      // fetchPolicy: 'network-only'
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    edit () {
      this.$router.push(`/pages/${this.post.id}`)
    },
    json () {
      this.$router.push(`/pages/${this.post.id}/json`)
    },
    save () {
      this.block.freeze()
      const block = serialize(this.block)
      const body = render(this.block)
      const title = this.state.findBlockByType('Title').value
      const postInput = {
        title,
        block,
        body
      }
      console.log(postInput)
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($input: UpdatePostByIdInput!)  ${directives} {
            updatePostById(input: $input) ${directives} {
              post {
                id
              }
            }
          }`,
        // Parameters
        variables: {
          input: {
            id: this.postId,
            postPatch: postInput
          }
        }
      })
      this.$q.notify('Page Saved')
    },
    publish () {
      this.block.freeze()
      const block = serialize(this.block)
      const body = render(this.block)
      const title = this.state.findBlockByType('Title').value
      const postInput = {
        title,
        block,
        body
      }
      console.log(postInput)
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($id: ID!, $data: PostInput!) {
            publishPost(id: $id, data: $data) ${directives} {
              ok
            }
          }`,
        // Parameters
        variables: {
          id: this.postId,
          data: postInput
        }
      })
      this.$q.notify('Page Published')
    },
    destroy () {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($input: DeletePostByIdInput!)  ${directives} {
            deletePostById(input: $input) ${directives} {
              deletedPostId
            }
          }`,
        // Parameters
        variables: {
          input: {
            id: this.id
          }
        }
      }).then((data) => {
        this.$q.notify('Page Deleted')
        this.$router.go(-1)
      })
    },
    onSwitch () {
      this.setView(this)
      this.setNavbox(Navbox)
    }
  }
}
</script>
