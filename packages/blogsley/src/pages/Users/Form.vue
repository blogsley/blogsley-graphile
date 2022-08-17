<template>
  <div class="fields">
      <q-input outlined autocomplete="username" v-model="user.username" label="Username" />
      <q-input outlined autocomplete="email" v-model="user.email" label="Email" />
      <q-input outlined autocomplete="firstname" v-model="user.firstName" label="First Name" />
      <q-input outlined autocomplete="lastname" v-model="user.lastName" label="Last Name" />
  </div>
</template>

<script>
import { UiMixin } from '@mixins'

export default {
  mixins: [UiMixin],
  props: {
    user: {
      default () {
        return {
          username: 'User',
          email: '',
          firstname: '',
          lastname: ''
        }
      }
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}
</script>
