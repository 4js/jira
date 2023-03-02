import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface ListProps {
  users: User[];
  list: Project[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          // sortor: (a, b) => a.name.localCompare(b.name)
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((u: User) => u.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      rowKey={"id"}
      dataSource={list}
    />
  );
};
