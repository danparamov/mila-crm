import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

export default class SingleOpp extends Component {
  render() {
    const { opp } = this.props;
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
                <TableCell component="th" scope="opp">
                <Link
                  to={{
                  pathname: '/opportunity',
                  search: `?id=${opp.id}`,
                }}>{opp.oppname}
                </Link>
                </TableCell>
                <TableCell align="right">{opp.leadsource}</TableCell>
                <TableCell align="right">{opp.amount}</TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </Paper> 
    );
  }
}
