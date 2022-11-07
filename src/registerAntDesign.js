import DatePicker from "ant-design-vue/lib/date-picker"; // 加载 JS
import Input from "ant-design-vue/lib/input"; // 加载 JS
import Form from "ant-design-vue/lib/form/Form"; // 加载 JS
import FormItem from "ant-design-vue/lib/form/FormItem"; // 加载 JS
import "ant-design-vue/lib/date-picker/style/css"; // 加载 CSS
import "ant-design-vue/lib/input/style/css"; // 加载 CSS
import "ant-design-vue/lib/form/style/css"; // 加载 CSS
const componentList = [DatePicker, Input, Form, FormItem];
const install = (app) => {
  componentList.forEach((comp) => app.component(comp.name, comp));
};

export default install;
