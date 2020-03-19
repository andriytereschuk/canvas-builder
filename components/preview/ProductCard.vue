<template>
  <div class="product__wrapper">
    <v-card class="product-card" raised>
      <v-rating
        v-if="component.model.rating"
        class="product__raiting"
        background-color="red lighten-2"
        color="red accent-4"
        size="25"
        hover
        dense
      ></v-rating>

      <v-img
        :src="component.model.image"
        class="align-end product-card__image"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title v-text="component.model.title"></v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ component.model.subtitle }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ component.model.description }}</div>
        <p class="product-card__price">$ {{ component.model.price }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="component.model.actionIcons.wishList" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn v-if="component.model.actionIcons.bookmark" icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn v-if="component.model.actionIcons.share" icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  computed: {
    ...mapGetters('component', ['getComponentById']),
    component() {
      return this.getComponentById(+this.$route.params.id)
    }
  }
}
</script>

<style>
.product__wrapper {
  display: flex;
  justify-content: center;
}

.product-card {
  min-width: 300px;
  max-width: 400px;
}

.product-card__image {
  height: 370px;
  background: url('https://www.thebristolarms.com.au/wp-content/uploads/2018/03/img-not-found.png')
    center / cover no-repeat;
}

.product-card__price {
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.product__raiting {
  display: flex;
  justify-content: flex-end;
}
</style>
