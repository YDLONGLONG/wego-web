import Vue from 'vue'
import { formatDate } from 'element-ui/src/utils/date-util'
//自定义时间过滤器 'yyyy-MM-dd HH:mm:ss'
Vue.filter('dateFormat', value => formatDate(value, 'yyyy-MM-dd'))
Vue.filter('fullDateFormat', value => formatDate(value, 'yyyy-MM-dd HH:mm'))
Vue.filter('partDateFormat', value => formatDate(value, 'HH:mm'))
Vue.filter('danmuDateFormat', value => formatDate(value, 'mm:ss'))
Vue.filter('urlFormat', value => 'http://localhost:4001' + value)
Vue.filter('livePushFormat', value => 'rtmp://localhost' + value)