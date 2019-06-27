import React, { Component, memo } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { withRouter } from 'react-router';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  isSignInPending,
  putFile,
  getFile,
  loadUserData,
  Person,
} from 'blockstack';
import { Redirect } from 'react-router';
import 'react-toastify/dist/ReactToastify.min.css';
import findObjectBy from './util/findObjectBy';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ReactDOM from 'react-dom';

import { useInputValue, useTodos } from './custom-hooks';
import Layout from './Layout';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const TodoApp = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Layout>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
      />
      <TodoList
        items={todos}
        onItemCheck={idx => checkTodo(idx)}
        onItemRemove={idx => removeTodo(idx)}
      />
    </Layout>
  );
});

const data = [
  { name: 'Prospect', value: 400 },
  { name: 'Design', value: 300 },
  { name: 'Contract', value: 300 },
  { name: 'Won', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Days`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class EditOppPage extends Component {
  state = {
    id: '',
    oppname: '',
    accountname: '',
    nextstep: '',
    type: '',
    leadsource: '',
    amount: '',
    closingdate: '',
    salesstage: '',
    probability: '',
    description: '',
    priority: '',
    created_at: '',
    opps: [],
    accounts: [],
    accountsnames: [],
    activeIndex: 0,

    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
    saved: false,
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username,
    });
    this.fetchData();
  }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    onPieEnter = (data, index) => {
      this.setState({
        activeIndex: index,
      });
    };

  fetchData() {
    const options = { decrypt: true };
    getFile('opps.json', options).then(file => {
      const opps = JSON.parse(file || '[]');
      const opp = findObjectBy(opps, {
        id: this.props.location.search.substring(4),
      });
      if (!opp) {
        this.props.history.push('/opportunities');
      }
      this.setState({
        opps,
        id: opp[0].id,
        oppname: opp[0].oppname,
        accountname: opp[0].accountname,
        nextstep: opp[0].nextstep,
        type: opp[0].type,
        leadsource: opp[0].leadsource,
        amount: opp[0].amount,
        closingdate: opp[0].closingdate,
        salesstage: opp[0].salesstage,
        probability: opp[0].probability,
        description: opp[0].description,
        created_at: opp[0].created_at,
        priority: opp[0].priority,
      });
    });
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      const accountsnames = accounts.map((account) => account.accountname);
      this.setState({
        accounts,
        accountsnames,
      });
    });
  }

  handleEditOppSubmit(event) {
    event.preventDefault();
    this.saveEditedOpp();
  }

  saveEditedOpp() {
    let { opps } = this.state;
    const newOpp = {
      id: this.state.id,
      oppname: this.state.oppname,
      accountname: this.state.accountname,
      nextstep: this.state.nextstep,
      type: this.state.type,
      leadsource: this.state.leadsource,
      amount: this.state.amount,
      closingdate: this.state.closingdate,
      salesstage: this.state.salesstage,
      probability: this.state.probability,
      description: this.state.description,
      priority: this.state.priority,
      created_at: this.state.created_at,
    };

    opps = opps.filter(opp => opp.id !== newOpp.id);
    opps.unshift(newOpp);
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(opps), options).then(() => {});
    this.setState({
      saved: true,
    });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const {accountsnames} = this.state;
    const loading = false;
    const error = false;
    const classes = makeStyles(theme => ({
      root: {
        display: 'flex',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
      container1: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 500,
      },
    }));


    if (this.state.saved) {
      //return <Redirect to={`/opp?id=${this.state.id}`} />;
      return <Redirect to={`/opportunities`} />;
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return !isSignInPending() ? (
      <div className={classes.root}>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <div className={classes.content}>
        <Container item xs={5} md={5} lg={2}>
        <Title>Opportunity</Title>
        <Grid container spacing={3}>
          <Grid item xs={5} md={5} lg={2}>
          <Paper className={fixedHeightPaper}>
          <form noValidate autoComplete="off">
            <TextField
              type="outlined-width"
              id="oppname"
              label="Opportunity Name"
              name="oppname"
              className={classes.textField}
              placeholder="Opportunity Name.."
              value={this.state.oppname}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="accountname"
              label="Account Name"
              name="accountname"
              className={classes.textField}
              placeholder="Account Name.."
              onChange={this.handleChange}
              value={this.state.accountname}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="contactname"
              label="Contact Name"
              name="contactname"
              className={classes.textField}
              placeholder="Contact Name.."
              onChange={this.handleChange}
              value={this.state.contactname}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="nextstep"
              label="Next Step"
              name="nextstep"
              className={classes.textField}
              placeholder="Next Step.."
              value={this.state.nextstep}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="leadsource"
              label="Lead Source"
              name="leadsource"
              className={classes.textField}
              placeholder="Lead Source.."
              value={this.state.leadsource}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="amount"
              label="Amount"
              name="amount"
              className={classes.textField}
              placeholder="$ Amount.."
              value={this.state.amount}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="closingdate"
              label="Closing Date"
              name="closingdate"
              className={classes.textField}
              placeholder="MM/DD/YYYY"
              value={this.state.closingdate}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="salesstage"
              label="Sales stage"
              name="salesstage"
              className={classes.textField}
              placeholder="Lead.."
              value={this.state.salesstage}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="outlined-width"
              id="probability"
              label="Probability"
              name="probability"
              className={classes.textField}
              placeholder="25%.."
              value={this.state.probability}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-width"
              fullWidth
              label="Description"
              name="description"
              className={classes.textField}
              placeholder="Description.."
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.description}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </form>
          </Paper>
          </Grid>
          <Grid style={{ marginLeft: 100 }}>
          <Paper>
          <Button
            variant="outlined"
            onClick={() => {
              this.deleteOpp();
            }}
          >
            Delete
          </Button>
          <Button type="submit" variant="outlined">
            Save
          </Button>
          </Paper>
          <br></br>
            <Paper>
            <Title>Time in Sales Stage</Title>
            <PieChart width={400} height={220}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={180}
              cy={90}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
            </PieChart>
            </Paper>
            <br></br>
            {/* Total Tasks */}
            <Paper className={fixedHeightPaper}>
            <Title>Tasks</Title>
            <TodoApp />
            </Paper>
            </Grid>
          </Grid>
          </Container>
          <h1>Edit Opportunity</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleEditOppSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="accountname">
                  Account Name
                  <select onChange={this.handleChange} id="accountname" name="accountname">
                  <option value="">
                    {this.state.accountname}
                  </option>
                   {
                    accountsnames.map(function(X) {
                    return <option>{X}</option>;
                    })
                   }
                 </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="nextstep">
                  Next Step
                  <input
                    type="text"
                    id="nextstep"
                    name="nextstep"
                    placeholder="Next Step.."
                    value={this.state.nextstep}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Type
                  <select
                    type="text"
                    id="type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option value="Existing Business">Existing Business</option>
                    <option value="New Business">New Business</option>
                    <option value="None">-None-</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Lead Source
                  <select
                    type="text"
                    id="leadsource"
                    name="leadsource"
                    value={this.state.leadsource}
                    onChange={this.handleChange}
                  >
                    <option value="Advertisement">Advertisement</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Employee Referral">Employee Referral</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Partner">Partner</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Trade Show">Trade Show</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="amount">
                  Amount
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="$10,000.."
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="closingdate">
                  Closing Date
                  <input
                    type="date"
                    id="closingdate"
                    name="closingdate"
                    placeholder="MM/DD/YYY"
                    value={this.state.closingdate}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
              <label>
                Sales Stage
                <select
                    type="text"
                    id="salesstage"
                    name="salesstage"
                    value={this.state.salesstage}
                    onChange={this.handleChange}
                  >
                  <option value="Qualified">Qualified</option>
                  <option value="Needs Analysis">Needs Analysis</option>
                  <option value="Value Proposition">alue Proposition</option>
                  <option value="Identify Decision Makers">Identify Decision Makers</option>
                  <option value="Proposal/Price Quote">Proposal/Price Quote</option>
                  <option value="Negotiation Review">Negotiation Review</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                  <option value="Closed Lost to Competition">Closed Lost to Competition</option>
                </select>
              </label>
              </fieldset>
              <fieldset>
                <label htmlFor="probability">
                  Probability
                  <input
                    type="text"
                    id="probability"
                    name="probability"
                    placeholder="Probability.."
                    value={this.state.probability}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <h3 className="">Description Information</h3>
              <fieldset>
                <label htmlFor="description">
                  Description
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description.."
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <button type="submit" className="bg-black">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const EditOpp = withRouter(EditOppPage);

export default EditOpp;
