import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import'./Styles/Table.css';

export default class SingleOppTask extends Component {
  render() {
    const { opptask } = this.props;
    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
    }));

    return (
      <Paper className={classes.root}>
          <Table className={classes.table}>
          <TableHead></TableHead>
            <TableBody>
              <TableRow>
                <TableCell width="20%" align="left" component="th" scope="opptask">
                <Link
                  to={{
                  pathname: '/edit-opptask',
                  search: `?id=${opptask.id}`,
                }}>{opptask.contactname}
                </Link>
                </TableCell>
                <TableCell width="20%" align="left">{opptask.subject}</TableCell>
                <TableCell width="20%" align="left">{opptask.duedate}</TableCell>
                <TableCell width="20%" align="left">{opptask.priority}</TableCell>
                <TableCell width="20%" align="left">{opptask.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
