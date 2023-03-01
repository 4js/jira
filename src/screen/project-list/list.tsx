import React from "react";

export const List = ({ list, users }: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project: any) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((u: any) => u.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};