import {
  DatePicker,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  Button,
  RadioGroup,
  Radio,
  InputNumber,
  Space,
} from "ant-design-vue"; // 加载 JS
import "ant-design-vue/dist/antd.css";
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
  RadioGroup,
  Radio,
  InputNumber,
  Space,
];
const install = (app) => {
  componentList.forEach((comp) => app.component(comp.name, comp));
};

export default install;
