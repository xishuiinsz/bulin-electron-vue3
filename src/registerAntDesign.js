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
  Steps,
  Menu,
} from "ant-design-vue"; // 加载 JS
import "ant-design-vue/dist/reset.css";
const { TextArea } = Input;
const { Step } = Steps;
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
  Steps,
  Step,
  Menu,
];
const install = (app) => {
  componentList.forEach((comp) => app.component(comp.name, comp));
};

export default install;
