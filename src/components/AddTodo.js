import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

const AddTodo = memo(props => (
  <Paper style={{ margin: 5, padding: 0 }}>
    <Grid container>
      <Grid xs={10} md={11} item style={{ paddingRight: 0 }}>
        <TextField
          placeholder="Add task here"
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid>
        <Button
          color="secondary"
          onClick={props.onButtonClick}
        >
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;
