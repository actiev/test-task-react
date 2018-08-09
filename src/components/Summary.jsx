import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

class Summary extends Component {
  state = {
    data: this.props.data,
  };

  componentWillReceiveProps(props) {
    this.setState({data: props.data});
  }

  usersCounter = () => {
    const countUsers = this.state.data.filter(user =>
      user.location.match(/^kiev$/i),
    );

    return countUsers.length;
  };

  getSumOldestUsers = () => {
    const usersAges = [];

    this.state.data.forEach(user => {
      usersAges.push(moment().diff(moment(user.dob, 'DD.MM.YYYY'), 'years'));
    });

    usersAges.sort((a, b) => b - a);

    if (usersAges.length > 3) {
      return usersAges[0] + usersAges[1] + usersAges[2];
    }
    return usersAges[0];
  };

  getLongestInitials = () => {
    const data = this.state.data;

    data.sort(
      (a, b) =>
        (b.first_name + b.last_name).length -
        (a.first_name + a.last_name).length,
    );

    return `${data[0].first_name} ${data[0].last_name}`;
  };

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Count of users from Kiev or kiev</TableCell>
              <TableCell>
                Sum of ages of three oldest users from table
              </TableCell>
              <TableCell>
                Longest string of first name + last name pair
              </TableCell>
            </TableRow>
          </TableHead>
          {this.state.data.length >= 1 && (
            <TableBody>
              <TableRow>
                <TableCell>{this.usersCounter()}</TableCell>
                <TableCell>{this.getSumOldestUsers()}</TableCell>
                <TableCell>{this.getLongestInitials()}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Paper>
    );
  }
}

export default Summary;
