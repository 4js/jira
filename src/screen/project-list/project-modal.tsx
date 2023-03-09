import { Button, Drawer, Form, Input, Select, Space } from "antd";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "store/project-modal.slice";
import { useProjectModal } from "./util";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "util/project";
import { UserSelect } from "components/user-select";

export const ProjectModal = () => {
  const [form] = Form.useForm();
  const { isModalOpen, editingProject, close } = useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync } = useMutateProject();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "新增项目";

  return (
    <Drawer
      title={title}
      forceRender={true}
      open={isModalOpen}
      width={"100%"}
      onClose={closeModal}
    >
      <p>{JSON.stringify(editingProject)}</p>
      <Form
        form={form}
        layout={"vertical"}
        style={{ width: "500px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          name="organization"
          label="部门"
          rules={[{ required: true, message: "请输入部门" }]}
        >
          <Input placeholder="请输入部门" />
        </Form.Item>
        <Form.Item
          name="personId"
          label="负责人"
          rules={[{ required: true, message: "请选择负责人" }]}
        >
          <UserSelect defaultOptionName={"负责人"} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button>取消</Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
