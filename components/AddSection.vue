<template>
  <div class="add" @click="handleClick()">+</div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('add')
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 1px dashed #fff;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  cursor: pointer;
}
</style>
