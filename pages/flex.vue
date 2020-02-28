<template>
  <div>
    <FlexBlock
      v-for="item in canvasCollection"
      :key="item.id"
      :zones="item.zones"
    />
    <AddSection />
  </div>
</template>

<script>
import FlexBlock from '~/components/FlexBlock.vue'
import AddSection from '~/components/AddSection.vue'

export default {
  components: {
    FlexBlock,
    AddSection
  },
  data: () => {
    return {
      canvasCollection: [
        {
          id: 1,
          zones: [
            {
              width: '50%',
              components: [
                {
                  type: 'offer',
                  width: '50%',
                  content: 'offer'
                },
                {
                  type: 'imageMap',
                  width: '50%',
                  content: 'imageMap'
                },
                {
                  type: 'promo',
                  width: '100%',
                  content: 'promo'
                }
              ]
            },
            {
              width: '50%',
              components: [
                {
                  type: 'video',
                  width: '100%',
                  content: 'video'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          zones: [
            {
              width: '25%',
              components: [
                {
                  type: 'promo',
                  width: '100%',
                  content: 'promo'
                }
              ]
            },
            {
              width: '75%',
              components: [
                {
                  type: 'imageMap',
                  width: '100%',
                  content: 'imageMap'
                },
                {
                  type: 'banner',
                  width: '75%',
                  content: 'banner'
                },
                {
                  type: 'offer',
                  width: '25%',
                  content: 'offer'
                },
                {
                  type: 'imageMap',
                  width: '25%',
                  content: 'imageMap'
                },
                {
                  type: 'video',
                  width: '75%',
                  content: 'video'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          zones: [
            {
              width: '33.33%',
              components: [
                {
                  type: 'imageMap',
                  width: '100%',
                  content: 'imageMap'
                },
                {
                  type: 'banner',
                  width: '100%',
                  content: 'banner'
                }
              ]
            },
            {
              width: '33.33%',
              components: [
                {
                  type: 'video',
                  width: '100%',
                  content: 'video'
                }
              ]
            },
            {
              width: '33.33%',
              components: [
                {
                  type: 'offer',
                  width: '100%',
                  content: 'offer'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
