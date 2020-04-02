<template>
  <v-card dark class="banner-settings__form" style="padding: 20px">
    <span>Element settings:</span>
    <div v-for="count in counter" :key="count">
      <TextEditor />
    </div>
    <Add @add="() => counter++" />
  </v-card>
</template>

<script>
import TextEditor from '~/components/TextEditor'
import Add from '~/components/Add'

export default {
  components: {
    TextEditor,
    Add
  },
  data: () => {
    return {
      counter: 1,
      texts: [],
      links: [],
      buttons: []
    }
  },
  methods: {
    addItem() {},
    save(type) {
      console.log(type)
      // const newText = {
      //   id: Date.now(),
      //   content: this.text,
      //   fontSize: '',
      //   fontFamily: '',
      //   fontColor: '',
      //   fontWeight: '',
      //   top: '',
      //   left: '',
      //   label: 'text',
      //   field: 'text',
      //   template: 'Simple text'
      // }
      // this.texts.push(newText)
    },
    // getTexts() {
    //   const texts = []
    //   const text1 = {
    //     id: Date.now(),
    //     content: this.text,
    //     fontSize: '',
    //     fontFamily: '',
    //     fontColor: '',
    //     fontWeight: '',
    //     top: '',
    //     left: '',
    //     label: 'text',
    //     field: 'text',
    //     template: 'Simple text'
    //   }
    //   texts.push(text1)
    //   return texts
    // },
    change() {
      const newModel = {
        texts: this.texts,
        links: this.links,
        buttons: this.buttons
      }
      console.log('newModel', newModel)
      this.$emit('changeModel', newModel)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-settings {
  &__add-btn {
    width: 100%;
    border: 1px dashed white;
  }
}
</style>
