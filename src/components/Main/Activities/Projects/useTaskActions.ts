import { useContext } from "react";
import {
  TaskActionsContext,
  type TaskActions,
} from "./taskActionsContext";

export function useTaskActions(): TaskActions {
  const ctx = useContext(TaskActionsContext);
  if (ctx == null) {
    throw new Error("useTaskActions must be used within TaskActionsProvider");
  }
  return ctx;
}
