import { Button, Drawer } from "antd";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "store/project-modal.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.projectModal.isModalOpen
  );

  return (
    <Drawer
      title="项目编辑"
      open={isModalOpen}
      width={"100%"}
      onClose={() => dispatch(onClose())}
    >
      <Button onClick={() => dispatch(onClose())}></Button>
    </Drawer>
  );
};
