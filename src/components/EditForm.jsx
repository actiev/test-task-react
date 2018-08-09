import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';

class EditForm extends Component {
  state = {
    first_name: this.props.data.first_name,
    last_name: this.props.data.last_name,
    dob: this.props.data.dob,
    location: this.props.data.location,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      first_name: nextProps.data.first_name,
      last_name: nextProps.data.last_name,
      dob: nextProps.data.dob,
      location: nextProps.data.location,
    });
  }

  updateUser = event => {
    event.preventDefault();

    const {data, action} = this.props

    const formatted = this.state.dob
      ? moment(this.state.dob, 'YYYY-MM-DD').format('DD.MM.YYYY')
      : false;

    action({
      id: data.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      dob: formatted,
      location: this.state.location,
    });
  };

  onChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.updateUser}>
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
              defaultValue={this.state.last_name}
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
              defaultValue={moment(this.state.dob, 'DD.MM.YYYY').format(
                'YYYY-MM-DD',
              )}
              onChange={this.onChange}
            />
          </div>
          <div>
            <TextField
              required
              id="location"
              label="Location"
              margin="normal"
              defaultValue={this.state.location}
              onChange={this.onChange}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

EditForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.required,
    first_name: PropTypes.string.required,
    last_name: PropTypes.string.required,
    dob: PropTypes.string.required,
    location: PropTypes.string.required,
  }),
};

export default EditForm;
