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

export default class SingleAccountTask extends Component {
  render() {
    const { accounttask } = this.props;
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
                  <TableCell width="20%" align="left" component="th" scope="accounttask">
                  <Link
                    to={{
                    pathname: '/edit-accounttask',
                    search: `?id=${accounttask.id}`,
                  }}>{accounttask.contactname}
                  </Link>
                  </TableCell>
                  <TableCell width="20%" align="left">{accounttask.subject}</TableCell>
                  <TableCell width="20%" align="left">{accounttask.duedate}</TableCell>
                  <TableCell width="20%" align="left">{accounttask.priority}</TableCell>
                  <TableCell width="20%" align="left">{accounttask.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
    );
  }
}
