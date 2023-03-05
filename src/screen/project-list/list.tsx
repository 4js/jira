import { Button, Table, TableProps } from "antd";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "util/project";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh: () => void;
}

export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  return (
    <div>
      <Table
        columns={[
          {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
              return (
                <Pin
                  checked={project?.pin || false}
                  onCheckedChange={pinProject(project.id)}
                />
              );
            },
          },
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
    </div>
  );
};
