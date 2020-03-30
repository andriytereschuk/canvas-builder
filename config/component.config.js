export const componentConfig = {
  galleries: {
    slideshow: {
      color: '#ff0000',
      model: {
        autoplay: true,
        items: []
      },
      schema: {
        hasChildren: true,
        fields: [
          {
            type: 'toggle',
            title: 'Autoplay',
            model: 'autoplay'
          }
        ]
      }
    },
    carousel: {
      color: '#ffa500',
      model: {
        autoplay: true,
        items: []
      },
      schema: {
        hasChildren: true,
        fields: [
          {
            type: 'toggle',
            title: 'Autoplay',
            model: 'autoplay'
          }
        ]
      }
    }
  },
  banners: {
    banner: {
      color: '#9eb20b',
      model: {
        title: '',
        subtitle: ''
      },
      schema: {
        hasChildren: false,
        fields: [
          {
            type: 'text',
            title: 'Title',
            model: 'title'
          },
          {
            type: 'text',
            title: 'Subtitle',
            model: 'subtitle'
          }
        ]
      }
    }
  },
  videos: {
    youtube: {
      color: '#008000',
      model: {
        url: '',
        fullscreen: true
      },
      schema: {
        hasChildren: false,
        fields: [
          {
            type: 'text',
            title: 'Video Url',
            model: 'url',
            placeholder: 'https://www.youtube.com/watch?v=0J4h0xdY78A'
          },
          {
            type: 'toggle',
            title: 'Allow Fullscreen',
            model: 'fullscreen'
          }
        ]
      }
    },
    embedded: {
      color: '#0000ff',
      model: {
        url: '',
        fullscreen: true
      },
      schema: {
        hasChildren: false,
        insertable: true,
        fields: [
          {
            type: 'text',
            title: 'Video Url',
            model: 'url',
            placeholder:
              'https://media.istockphoto.com/videos/aerial-view-of-pedestrians-walking-across-with-crowded-traffic-video-id1140364351'
          },
          {
            type: 'toggle',
            title: 'Allow Fullscreen',
            model: 'fullscreen'
          }
        ]
      }
    }
  },
  advertisements: {
    sponsoredItems: {
      color: '#4b0082',
      model: {
        title: '',
        subtitle: ''
      },
      schema: {
        hasChildren: true,
        fields: [
          {
            type: 'text',
            title: 'Title',
            model: 'title',
            styleClasses: 'form-field--inline'
          },
          {
            type: 'text',
            title: 'Subtitle',
            model: 'subtitle',
            styleClasses: 'form-field--inline'
          }
        ]
      }
    },
    offer: {
      color: '#ee82ee',
      model: {
        title: '',
        subtitle: ''
      },
      schema: {
        hasChildren: true,
        fields: [
          {
            type: 'toggle',
            title: 'Autoplay',
            model: 'autoplay'
          }
        ]
      }
    }
  },
  store: {
    productCard: {
      color: '#9e94e1',
      model: {
        title: '',
        subtitle: '',
        description: '',
        image: '',
        price: '',
        rating: true,
        actionIcons: {
          wishList: true,
          bookmark: true,
          share: true
        }
      },
      schema: {
        hasChildren: true,
        fields: [
          {
            type: 'text',
            title: 'Title',
            model: 'title'
          },
          {
            type: 'text',
            title: 'Subtitle',
            model: 'subtitle'
          },
          {
            type: 'text',
            title: 'Description',
            model: 'description'
          },
          {
            type: 'text',
            title: 'Image url',
            model: 'image'
          },
          {
            type: 'text',
            title: 'Price',
            model: 'price'
          },
          {
            type: 'toggle',
            title: 'Rating',
            model: 'rating'
          },
          {
            type: 'toggle',
            title: 'Wish',
            model: 'actionIcons.wishList',
            styleClasses: 'form-field--inline'
          },
          {
            type: 'toggle',
            title: 'Bookmark',
            model: 'actionIcons.bookmark',
            styleClasses: 'form-field--inline'
          },
          {
            type: 'toggle',
            title: 'Share',
            model: 'actionIcons.share',
            styleClasses: 'form-field--inline'
          }
        ]
      }
    }
  }
}
