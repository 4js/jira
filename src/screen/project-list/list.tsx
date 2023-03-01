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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project: Project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((u: User) => u.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
