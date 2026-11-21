import React from 'react';
import TasksWrapper from './TasksWrapper';

export { useTaskStore } from './store/useTaskStore';
export { useRoutineStore } from './store/useRoutineStore';
export { default as TasksWrapper } from './TasksWrapper';

export default function Tasks(props) {
  return <TasksWrapper {...props} />;
}
