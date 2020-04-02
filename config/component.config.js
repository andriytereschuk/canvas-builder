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
        text: 'NEW SEASON',
        textColor: 'white',
        textSize: '40px',
        textTop: '40%',
        textLeft: '35%',
        linkText: 'Start shopping now!',
        linkURL: 'https://www.amazon.com/',
        linkColor: 'white',
        linkSize: '18px',
        linkTop: '55%',
        linkLeft: '38%',
        buttonText: 'GO TO THE SHOP',
        buttonLink: '/shop',
        buttonTextColor: 'black',
        buttonHeight: '35px',
        buttonColor: 'white',
        buttonBorder: '1px solid black',
        buttonTop: '70%',
        buttonLeft: '40%'
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
            type: 'text',
            title: 'Simple text',
            model: 'text'
          },
          {
            type: 'text',
            title: 'Text color',
            model: 'textColor'
          },
          {
            type: 'text',
            title: 'Text size',
            model: 'textSize'
          },
          {
            type: 'text',
            title: 'Text: distance from top border (%)',
            model: 'textTop'
          },
          {
            type: 'text',
            title: 'Text: distance from left border (%)',
            model: 'textLeft'
          },
          {
            type: 'text',
            title: 'Link text',
            model: 'linkText'
          },
          {
            type: 'text',
            title: 'Link URL',
            model: 'linkURL'
          },
          {
            type: 'text',
            title: 'Link color',
            model: 'linkColor'
          },
          {
            type: 'text',
            title: 'Link font size',
            model: 'linkSize'
          },
          {
            type: 'text',
            title: 'Link: distance from top border (%)',
            model: 'linkTop'
          },
          {
            type: 'text',
            title: 'Link: distance from left border (%)',
            model: 'linkLeft'
          },
          {
            type: 'text',
            title: 'Button text',
            model: 'buttonText'
          },
          {
            type: 'text',
            title: 'Button: redirection subpage (e.g. /home)',
            model: 'buttonLink'
          },
          {
            type: 'text',
            title: 'Button text color',
            model: 'buttonTextColor'
          },
          {
            type: 'text',
            title: 'Button height',
            model: 'buttonHeight'
          },
          {
            type: 'text',
            title: 'Button background color',
            model: 'buttonColor'
          },
          {
            type: 'text',
            title: 'Button border (e.g. 1px solid black)',
            model: 'buttonBorder'
          },
          {
            type: 'text',
            title: 'Button: distance from top border (%)',
            model: 'buttonTop'
          },
          {
            type: 'text',
            title: 'Button: distance from left border (%)',
            model: 'buttonLeft'
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
