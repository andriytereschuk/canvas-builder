import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import FieldArray from 'vfg-field-array'
import FieldObject from 'vfg-field-object'

// Register custom fields
import fieldToggle from '~/components/form-fields/fieldToggle'
import fieldText from '~/components/form-fields/fieldText'

Vue.component('fieldToggle', fieldToggle)
Vue.component('fieldText', fieldText)

Vue.use(VueFormGenerator)
Vue.use(FieldArray)
Vue.use(FieldObject)
