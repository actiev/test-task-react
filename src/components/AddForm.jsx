import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

class AddForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    dob: '',
    location: '',
  };

  addUser = event => {
    event.preventDefault();

    const formatted = moment(this.state.dob, 'YYYY-MM-DD').format('DD.MM.YYYY');

    this.props.action({
      id: toString(new Date().getTime()),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      dob: formatted,
      location: this.state.location,
    });

    this.setState({
      first_name: '',
      last_name: '',
      dob: '',
      location: '',
    });
  };

  onChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addUser}>
          <div>
            <TextField
              required
              id="first_name"
              label="First name"
              margin="normal"
              value={this.state.first_name}
              onChange={this.onChange}
            />
          </div>
          <div>
            <TextField
              required
              id="last_name"
              label="Last name"
              margin="normal"
              value={this.state.last_name}
              onChange={this.onChange}
            />
          </div>
          <div>
            <TextField
              required
              className="date-picker"
              id="dob"
              label="Date of birth"
              type="date"
              value={this.state.dob}
              onChange={this.onChange}
            />
          </div>
          <div>
            <TextField
              required
              id="location"
              label="Location"
              margin="normal"
              value={this.state.location}
              onChange={this.onChange}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddForm;
