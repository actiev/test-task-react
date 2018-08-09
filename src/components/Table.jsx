import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class SimpleTable extends PureComponent {
  render() {
    const {data, deleteAction, updateAction} = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell numeric>Date of birth</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {data.length >= 1 && (
            <TableBody>
              {data.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.first_name}
                  </TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell numeric>{user.dob}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell className="buttons-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        updateAction(user.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        deleteAction(user.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.required,
      first_name: PropTypes.string.required,
      last_name: PropTypes.string.required,
      dob: PropTypes.string.required,
      location: PropTypes.string.required,
    }),
  ),
};

export default SimpleTable;
