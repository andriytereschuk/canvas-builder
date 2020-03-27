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
        url: ''
      },
      schema: {
        hasChildren: false,
        fields: [
          {
            type: 'text',
            title: 'Url',
            model: 'url'
          }
        ]
      }
    },
    embedded: {
      color: '#0000ff',
      model: {
        url: ''
      },
      schema: {
        hasChildren: false,
        insertable: true,
        fields: [
          {
            type: 'text',
            title: 'Url',
            model: 'url'
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
