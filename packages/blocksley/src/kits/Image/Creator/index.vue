<template>
  <div>
  <editor-shell :vu="this">
    <span slot="title">Image</span>
    <!--
    <q-banner class="bg-primary text-white">
      <q-btn flat color="white" @click="showImagePrompt">Add from Media Library</q-btn>
    </q-banner>
    -->
    <q-dialog v-model="showImgChooser" @escape-key="validate" @hide="validate">
      <component :is="state.imageChooser" :select="insertImage" />
    </q-dialog>
  </editor-shell>
  </div>
</template>

<script>
import BlockCreator from '../../../components/BlockCreator.vue'
import EditorShell from '../../../components/EditorShell.vue'
import ImageChooser from '../../../components/ImageChooser.vue'

export default {
  name: 'ImageBlockCreator',
  extends: BlockCreator,
  props: ['frame', 'block'],
  inject: ['state'],
  components: {
    EditorShell,
    ImageChooser
  },
  data () {
    return {
      // showImgChooser: false
      showImgChooser: true
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    showImagePrompt () {
      this.showImgChooser = true
    },
    insertImage (image) {
      console.log('insertImage: ', image)
      this.block.status = 'normal'
      this.block.src = image.src
      this.showImgChooser = false
      this.frame.edit()
    },
    validate() {
      if (this.block.status != 'normal') {
        this.frame.remove()
      }
    }
  }
}
</script>

<style lang="scss">
.image-creator {
  background-color: gray;
}
</style>
