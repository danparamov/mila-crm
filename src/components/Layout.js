import React, { memo } from 'react';
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';

const Layout = memo(props => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
  >
    {props.children}
  </Paper>
));

export default Layout;
