<template>
  <aside>
    <div class="fieldset">
      <label for="columns">Columns</label>
      <number-input
        size="small"
        :min="1"
        :max="10"
        :value="columns"
        inline
        controls
        center
        :style="{
          width: 7 + 'rem',
          color: '#fff'
        }"
        :attrs="{
          id: 'my-number-input',
          style: {
            'font-size': 1 + 'rem',
            backgroundColor: '#211f2f'
          }
        }"
        @change="updateColumns"
      ></number-input>
    </div>

    <div class="fieldset">
      <label for="rows">Rows</label>
      <number-input
        size="small"
        :min="1"
        :max="10"
        :value="rows"
        inline
        controls
        center
        :style="{ width: 7 + 'rem', color: '#fff' }"
        :attrs="{
          id: 'my-number-input',
          style: {
            'font-size': 1 + 'rem',
            backgroundColor: '#211f2f'
          }
        }"
        @change="updateRows"
      ></number-input>
    </div>

    <v-btn class="button" text rounded @click="ApplyPreset">Apply</v-btn>
    <v-btn class="button" rounded type="reset" @click="resetGrid()">
      Reset
    </v-btn>
  </aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { parseToObject } from '~/utils/helpers'

export default {
  computed: {
    ...mapState('customPreset', ['columns', 'rows', 'zones'])
  },
  watch: {
    columns(newVal, oldVal) {
      const payload = {
        newVal,
        oldVal,
        direction: 'colArr'
      }
      this.adjustArr(payload)
    },
    rows(newVal, oldVal) {
      const payload = {
        newVal,
        oldVal,
        direction: 'rowArr'
      }
      this.adjustArr(payload)
    }
  },
  methods: {
    ...mapMutations('customPreset', [
      'updateColumns',
      'updateRows',
      'resetGrid',
      'adjustArr',
      'project/addSection'
    ]),
    ...mapMutations('project', ['addSection']),
    ApplyPreset() {
      const section = {
        columns: this.columns,
        rows: this.rows,
        zones: this.zones.map((el) => parseToObject(el))
      }

      this.addSection(section)

      this.resetGrid()

      this.$emit('closeCustomPreset')
    }
  }
}
</script>

<style lang="scss" scoped>
$teal: #b388ff;
$grey: #aaaaaa;

aside {
  margin: 60px;
  font-size: 17px;
  width: 300px;
}
.wat {
  font-family: 'Caveat', cursive;
  font-size: 22px;
  margin-top: 18px;
  color: #a8c9cc;
  opacity: 0.9;
  font-weight: normal;
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  aside {
    width: 80vw;
    margin: 100px 50px;
  }
}
input,
label,
button {
  font-family: 'Mukta Mahee', Helvetica, Arial, sans-serif;
}

label {
  padding-right: 18px;
  display: inline-block;
  width: 100px;

  .label-extra-info {
    opacity: 0.7;
  }
}
input {
  font-size: 17px;
  background: #211f2f;
  color: white;
  width: 50px;
  padding: 0.3ch 5px;
  max-height: 40px;
  border: 1px solid #666;
}

.fieldset {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  border: none;
  padding: 5px 0;
}
.button {
  background: transparent;
  color: $teal;
  padding: 4px 30px 5px;
  border-radius: 1000px;
  border: 1px solid $teal;
  font-size: 16px;
  margin: 20px 0 0;
  cursor: pointer;
  transition: 0.35s all;
  outline: none;

  &:hover {
    background: $teal;
    color: white;
  }
}
#my-number-input {
  font-size: 1rem;
}

[type='reset'] {
  color: $grey;
  border: 1px solid $grey;
  margin-left: 20px;

  &:hover {
    background: $grey;
    color: white;
  }
}
</style>
