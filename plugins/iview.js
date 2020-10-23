import Vue from "vue";
import {
        locale,
        Row,
        Col,
        Switch,
        Icon,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Tabs,
        TabPane,
        Progress,
        Tooltip,
        InputNumber,
        Modal,
        Spin,
        Circle,
        Collapse,
        Panel,
        DatePicker,
        CheckboxGroup,
        Checkbox,
        Page,
        Table
        } from "view-design";
import "view-design/dist/styles/iview.css";
import lang from 'view-design/dist/locale/en-US';
import wating from '@/components/transferStatus/wating'
import wrong from '@/components/transferStatus/wrong'
import success from '@/components/transferStatus/success'

locale(lang);

//按需加载
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("i-switch", Switch);
Vue.component("Icon", Icon);
Vue.component("Dropdown", Dropdown);
Vue.component("DropdownMenu", DropdownMenu);
Vue.component("DropdownItem", DropdownItem);
Vue.component("Tabs", Tabs);
Vue.component("TabPane", TabPane);
Vue.component("Progress", Progress);
Vue.component("Tooltip", Tooltip);
Vue.component("InputNumber", InputNumber);
Vue.component("Modal", Modal);
Vue.component("Spin", Spin);
Vue.component("i-circle", Circle);
Vue.component("DatePicker", DatePicker);
Vue.component("CheckboxGroup", CheckboxGroup);
Vue.component("Checkbox", Checkbox);
Vue.component("Page", Page);

Vue.component("wating", wating);
Vue.component("wrong", wrong);
Vue.component("success", success);

Vue.component("Collapse", Collapse);
Vue.component("Panel", Panel);
Vue.component("Table", Table);




// Vue.prototype.$Notice = Notice;
