<template>
  <div class="product__wrapper">
    <v-card class="product-card" raised>
      <v-img
        :src="model.image"
        class="align-end product-card__image"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-rating
          v-if="model.rating"
          class="product__raiting"
          background-color="red lighten-2"
          color="red accent-4"
          size="22"
          hover
          dense
        ></v-rating>

        <v-card-title v-text="model.title"></v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ model.subtitle }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ model.description }}</div>
        <p class="product-card__price">$ {{ model.price }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="model.actionIcons.wishList" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn v-if="model.actionIcons.bookmark" icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn v-if="model.actionIcons.share" icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: () => Object,
      default: {}
    }
  }
}
</script>

<style scoped>
.product__wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.product-card {
  min-width: 300px;
  max-width: 400px;
}
.product-card__image {
  height: 370px;
  background: url('../../assets/images/img-not-found.png') center / cover
    no-repeat;
}
.product-card__price {
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.product__raiting {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
