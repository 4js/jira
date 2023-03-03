import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { EpicScreen } from "screen/epic";
import { KanbanScreen } from "screen/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h3>ProjectScreen</h3>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route
          path={"/"}
          element={<Navigate to={`${window.location.pathname}/kanban`} />}
        />
        <Route path={"epic"} element={<EpicScreen />} />
        <Route path={"kanban"} element={<KanbanScreen />} />
      </Routes>
    </div>
  );
};
