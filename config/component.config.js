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
          'https://3xlt1jijtde7vkf2ch4uoy7b-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/CW-Website_1184x864-592x432.jpg',
        imageAlt: 'Default image, four women in dresses, black background',
        height: '500px',
        blur: '',
        overlayColor: '0,0,0,0.5',
        text: {
          content: 'NEW SEASON',
          color: 'white',
          size: '40px',
          top: '40%',
          left: '35%'
        },
        link: {
          text: 'Start shopping now!',
          url: 'https://www.amazon.com/',
          color: 'white',
          size: '18px',
          top: '55%',
          left: '38%'
        },
        button: {
          text: 'GO TO THE SHOP',
          link: '/shop',
          textColor: 'black',
          height: '35px',
          color: 'white',
          border: '1px solid black',
          top: '70%',
          left: '40%'
        }
      },
      schema: {
        hasChildren: false,
        fields: [
          {
            type: 'text',
            title: 'Banner image URL',
            model: 'imageURL'
          },
          {
            type: 'text',
            title: 'Image description for visually impaired people',
            model: 'imageAlt'
          },
          {
            type: 'text',
            title: 'Banner height in pixels (e.g. 300px)',
            model: 'height'
          },
          {
            type: 'text',
            title: 'Background blur in pixels (e.g. 3px)',
            model: 'blur'
          },
          {
            type: 'text',
            title: 'Background overlay RGBA color (e.g. 0,0,0,0.3)',
            model: 'overlayColor'
          },
          {
            type: 'object',
            label: 'Text settings',
            model: 'text',
            schema: {
              fields: [
                {
                  type: 'text',
                  title: 'Simple text',
                  model: 'content'
                },
                {
                  type: 'text',
                  title: 'Text color',
                  model: 'color'
                },
                {
                  type: 'text',
                  title: 'Text size',
                  model: 'size'
                },
                {
                  type: 'text',
                  title: 'Text: distance from top border (%)',
                  model: 'top'
                },
                {
                  type: 'text',
                  title: 'Text: distance from left border (%)',
                  model: 'left'
                }
              ]
            }
          },
          {
            type: 'object',
            label: 'Link settings',
            model: 'link',
            schema: {
              fields: [
                {
                  type: 'text',
                  title: 'Link text',
                  model: 'text'
                },
                {
                  type: 'text',
                  title: 'Link URL',
                  model: 'url'
                },
                {
                  type: 'text',
                  title: 'Link color',
                  model: 'color'
                },
                {
                  type: 'text',
                  title: 'Link font size',
                  model: 'size'
                },
                {
                  type: 'text',
                  title: 'Link: distance from top border (%)',
                  model: 'top'
                },
                {
                  type: 'text',
                  title: 'Link: distance from left border (%)',
                  model: 'left'
                }
              ]
            }
          },
          {
            type: 'object',
            label: 'Button settings',
            model: 'button',
            schema: {
              fields: [
                {
                  type: 'text',
                  title: 'Button text',
                  model: 'text'
                },
                {
                  type: 'text',
                  title: 'Button: redirection subpage (e.g. /home)',
                  model: 'link'
                },
                {
                  type: 'text',
                  title: 'Button text color',
                  model: 'textColor'
                },
                {
                  type: 'text',
                  title: 'Button height',
                  model: 'height'
                },
                {
                  type: 'text',
                  title: 'Button background color',
                  model: 'color'
                },
                {
                  type: 'text',
                  title: 'Button border (e.g. 1px solid black)',
                  model: 'border'
                },
                {
                  type: 'text',
                  title: 'Button: distance from top border (%)',
                  model: 'top'
                },
                {
                  type: 'text',
                  title: 'Button: distance from left border (%)',
                  model: 'left'
                }
              ]
            }
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
