<template>
  <q-page padding>
    <div v-if="$apollo.loading">Loading..</div>
    <Form :user="this.userById" />
  </q-page>
</template>

<script>
import { UiMixin, PageMixin } from '@mixins'
import Navbox from './Navbox.vue'
import Header from './Header.vue'
import Form from '../Form.vue'

import gql from 'graphql-tag'
const directives = import.meta.env.VITE_STANDALONE ? '@client' : ''

const userQuery = gql`
query userQuery($id: UUID!) {
  userById(id: $id) ${directives} {
    username
    email
    firstName
    lastName
  }
}
`
export default {
  mixins: [UiMixin, PageMixin],
  props: ['id'],
  components: {
    Form
  },
  apollo: {
    userById: {
      query: userQuery,
      variables () {
        return {
          id: this.userId
        }
      }
    }
  },
  data () {
    return {
      title: 'User',
      userId: this.$route.params.id
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    save () {
      this.$apollo.mutate({
        // Mutation
        mutation: gql`
          mutation ($data: UserInput!) {
            updateUser(data: $data) ${directives} {
              ok
            }
          }`,
        // Parameters
        variables: {
          data: this.user
        }
      })
      this.$q.notify('User Saved')
    },
    destroy () {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($id: ID!) {
            deleteUser(id: $id) ${directives} {
              ok
            }
          }`,
        // Parameters
        variables: {
          id: this.id
        }
      }).then((data) => {
        this.$q.notify('User Deleted')
        this.$router.go(-1)
      })
    },
    onSwitch () {
      this.setView(this)
      this.setNavbox(Navbox)
      this.setHeader(Header)
    }
  }
}
</script>
