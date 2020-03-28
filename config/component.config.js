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
        imageURL:
          'https://www.pixelstalk.net/wp-content/uploads/2016/05/Light-Pink-Backgrounds.jpg',
        imageAlt: 'Sample banner image',
        height: '500px',
        textblock: [
          {
            id: '1',
            type: 'text',
            content: 'Sample link',
            link: 'https://pastebin.com/',
            fontSize: '14px',
            fontFamily: '',
            fontColor: 'green',
            fontWeight: 'bold',
            position: {}
          },
          {
            id: '2',
            type: 'button',
            content: 'Sample button',
            link: 'https://github.com/myrosvas?tab=repositories',
            fontSize: '14px',
            fontFamily: '',
            fontColor: 'red',
            fontWeight: '',
            backgroundColor: '',
            border: '',
            height: '30px',
            position: {}
          },
          {
            id: '3',
            type: 'text',
            content: 'Sample text',
            link: '',
            fontSize: '14px',
            fontFamily: '',
            fontColor: 'violet',
            fontWeight: 'bold',
            position: {}
          }
        ]
      },
      schema: {
        fields: [
          {
            type: 'text',
            title: 'imageURL',
            model: 'imageURL'
          },
          {
            type: 'text',
            title: 'imageDescription',
            model: 'imageDescription'
          },
          {
            type: 'text',
            title: 'text',
            model: 'content'
          },
          {
            type: 'text',
            title: 'linkURL',
            model: 'linkURL'
          },
          {
            type: 'text',
            title: 'button',
            model: 'button'
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
