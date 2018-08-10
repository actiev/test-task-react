import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevProps: props,
      first_name: props.data.first_name,
      last_name: props.data.last_name,
      dob: props.data.dob,
      location: props.data.location,
    };
  }

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.required,
      first_name: PropTypes.string.required,
      last_name: PropTypes.string.required,
      dob: PropTypes.string.required,
      location: PropTypes.string.required,
    }),
  };

  static getDerivedStateFromProps(props, state) {
    if (props !== state.prevProps) {
      return {
        prevProps: props,
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        dob: props.data.dob,
        location: props.data.location,
      };
    }
    return null;
  }

  updateUser = event => {
    event.preventDefault();

    const {action} = this.props;

    action({
      id: this.props.data.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      dob: this.state.dob,
      location: this.state.location,
    });
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onChangeDate = e => {
    this.setState({
      [e.target.id]: moment(e.target.value, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.updateUser} key={this.props.data.id}>
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
              value={moment(this.state.dob, 'DD.MM.YYYY').format('YYYY-MM-DD')}
              onChange={this.onChangeDate}
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
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditForm;
