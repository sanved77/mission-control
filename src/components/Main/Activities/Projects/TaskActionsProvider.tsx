import type { ReactNode } from "react";
import {
  TaskActionsContext,
  type TaskActions,
} from "./taskActionsContext";

export function TaskActionsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: TaskActions;
}) {
  return (
    <TaskActionsContext.Provider value={value}>
      {children}
    </TaskActionsContext.Provider>
  );
}
