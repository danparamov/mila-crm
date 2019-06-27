import React, { memo } from 'react';
import { List, Paper, Grid } from '@material-ui/core';

import TodoListItem from './TodoListItem';

const TodoList = memo(props => (
  <>
    {props.items.length > 0 && (
      <Paper>
        <List>
          {props.items.map((todo, idx) => (
            <TodoListItem
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
