import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          render(value, project) {
            return <Link to={`${project.id}`}>{value}</Link>;
          },
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
                {
                  users.find((u: User) => u.id === Number(project.personId))
                    ?.name
                }
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
      {...props}
    />
  );
};
