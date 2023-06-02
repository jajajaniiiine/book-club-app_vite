import { Alert, Form, Input, InputNumber, Modal, Select } from "antd";
import categories from "./categories.json";
import { AttachMoney } from "@mui/icons-material";
import BookApi from "../../sdk/books-api";

export const AddBookForm = (props) => {
  const { open, setOpenAddForm } = props;
  const [form] = Form.useForm();

  const onCreate = async (values) => {
    await BookApi.addBook(values)
      .then((res) => {
        if (res.status === 201) {
          <Alert
            message="Successfully added a new book!"
            type="success"
            showIcon
            banner
          />;

          setTimeout(() => {
            form.resetFields();
          }, 300);
        }
      })
      .catch(() => {
        <Alert
          message="Something went wrong! Please try again later."
          type="error"
          showIcon
          banner
        />;
      });
  };

  const onCancel = () => {
    form.resetFields();
    setOpenAddForm(false);
  };

  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" size="large">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title of the book is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: "Author of the book is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select book category"
          rules={[
            {
              required: true,
              message: "Category of the book is required.",
            },
          ]}
        >
          <Select mode="tags">
            {categories.map((category) => (
              <Select.Option key={category.value} value={category.value}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Price of the book is required.",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            addonBefore={<AttachMoney />}
            addonAfter=".00"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
