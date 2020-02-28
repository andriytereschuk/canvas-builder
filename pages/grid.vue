<template>
  <div>
    <GridBlock
      v-for="section in canvasCollection"
      :key="section.id"
      :section="section"
    />
    <AddSection />
  </div>
</template>

<script>
import GridBlock from '~/components/GridBlock.vue'
import AddSection from '~/components/AddSection.vue'

export default {
  components: {
    GridBlock,
    AddSection
  },
  data: () => {
    return {
      canvasCollection: [
        {
          id: 1,
          columns: 4,
          rows: 2,
          zones: [
            {
              type: 'offer',
              content: 'offer',
              coords: {
                start: {
                  x: 1,
                  y: 1
                },
                end: {
                  x: 2,
                  y: 2
                }
              }
            },
            {
              type: 'imageMap',
              content: 'imageMap',
              coords: {
                start: {
                  x: 1,
                  y: 2
                },
                end: {
                  x: 2,
                  y: 3
                }
              }
            },
            {
              type: 'promo',
              content: 'promo',
              coords: {
                start: {
                  x: 2,
                  y: 1
                },
                end: {
                  x: 3,
                  y: 3
                }
              }
            },
            {
              type: 'video',
              content: 'video',
              coords: {
                start: {
                  x: 1,
                  y: 3
                },
                end: {
                  x: 3,
                  y: 5
                }
              }
            }
          ]
        },
        {
          id: 2,
          columns: 4,
          rows: 3,
          zones: [
            {
              type: 'promo',
              content: 'promo',
              coords: {
                start: {
                  x: 1,
                  y: 1
                },
                end: {
                  x: 4,
                  y: 2
                }
              }
            },
            {
              type: 'imageMap',
              content: 'imageMap',
              coords: {
                start: {
                  x: 1,
                  y: 2
                },
                end: {
                  x: 2,
                  y: 5
                }
              }
            },
            {
              type: 'banner',
              content: 'banner',
              coords: {
                start: {
                  x: 2,
                  y: 2
                },
                end: {
                  x: 3,
                  y: 4
                }
              }
            },
            {
              type: 'offer',
              content: 'offer',
              coords: {
                start: {
                  x: 2,
                  y: 4
                },
                end: {
                  x: 3,
                  y: 5
                }
              }
            },
            {
              type: 'imageMap',
              content: 'imageMap',
              coords: {
                start: {
                  x: 3,
                  y: 2
                },
                end: {
                  x: 4,
                  y: 3
                }
              }
            },
            {
              type: 'video',
              content: 'video',
              coords: {
                start: {
                  x: 3,
                  y: 3
                },
                end: {
                  x: 4,
                  y: 5
                }
              }
            }
          ]
        },
        {
          id: 3,
          columns: 3,
          rows: 2,
          zones: [
            {
              type: 'imageMap',
              content: 'imageMap',
              coords: {
                start: {
                  x: 1,
                  y: 1
                },
                end: {
                  x: 2,
                  y: 2
                }
              }
            },
            {
              type: 'banner',
              content: 'banner',
              coords: {
                start: {
                  x: 2,
                  y: 1
                },
                end: {
                  x: 3,
                  y: 2
                }
              }
            },
            {
              type: 'video',
              content: 'video',
              coords: {
                start: {
                  x: 1,
                  y: 2
                },
                end: {
                  x: 3,
                  y: 3
                }
              }
            },
            {
              type: 'offer',
              content: 'offer',
              coords: {
                start: {
                  x: 1,
                  y: 3
                },
                end: {
                  x: 3,
                  y: 4
                }
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
