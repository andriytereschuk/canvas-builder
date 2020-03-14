import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
import '~/assets/scss/json-viewer.scss'

Vue.component('json-viewer', JsonViewer)
Vue.use(JsonViewer)
