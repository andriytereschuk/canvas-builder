<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{ on }">
        <div class="add" dark v-on="on">+</div>
      </template>
      <v-card>
        <v-card-title class="headline">
          Pick presets from the list below
        </v-card-title>
        <v-card-text class="preset-wrapper">
          <button
            v-for="preset of 12"
            :key="preset"
            class="preset-item"
          ></button>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            justify="center"
            align="center"
            text
            @click="dialog = false"
          >
            Customize
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
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
  // max-width: 1200px;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  cursor: pointer;
}

.preset-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.preset-item {
  margin-bottom: 20px;
  height: 60px;
  width: 100px;
  background-color: deepskyblue;
  outline: none;
}

.preset-item:hover {
  background-color: green;
}

.headline {
  justify-content: center;
  padding: 16px;
}

.v-card__actions {
  justify-content: center;
}
</style>
