<template>
  <div class="add" @click="$emit('addPreset')">+</div>
</template>

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
  transition: 0.1s;
  &:hover {
    border-color: #b388ff;
    color: #b388ff;
  }
}
</style>
