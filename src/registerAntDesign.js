import DatePicker from "ant-design-vue/lib/date-picker"; // 加载 JS
import Input from "ant-design-vue/lib/input"; // 加载 JS
import Form from "ant-design-vue/lib/form/Form"; // 加载 JS
import FormItem from "ant-design-vue/lib/form/FormItem"; // 加载 JS
import Row from "ant-design-vue/lib/row"; // 加载 JS
import Col from "ant-design-vue/lib/col"; // 加载 JS
import Button from "ant-design-vue/lib/button"; // 加载 JS
import "ant-design-vue/lib/date-picker/style/css"; // 加载 CSS
import "ant-design-vue/lib/input/style/css"; // 加载 CSS
import "ant-design-vue/lib/form/style/css"; // 加载 CSS
import "ant-design-vue/lib/col/style/css"; // 加载 CSS
import "ant-design-vue/lib/row/style/css"; // 加载 CSS
import "ant-design-vue/lib/button/style/css"; // 加载 CSS
const { TextArea } = Input;
const componentList = [
  DatePicker,
  Input,
  Form,
  FormItem,
  TextArea,
  Row,
  Col,
  Button,
];
const install = (app) => {
  componentList.forEach((comp) => app.component(comp.name, comp));
};

export default install;
