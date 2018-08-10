import React, {Component} from 'react';
import SimpleTable from './components/Table';
import Summary from './components/Summary';
import API from './api';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import Modal from './components/Modal';

class App extends Component {
  state = {
    addForm: true,
    openModal: false,
    editUser: null,
    data: [],
  };

  componentDidMount() {
    API.get(`users`).then(res => {
      this.setState({data: res.data});
    });
  }

  deleteUser = id => {
    API.delete(`users/${id}`).then(res => {
      if (res.status !== 200) {
        this.setState({openModal: true, message: res.statusText});
      } else {
        this.setState({openModal: true, message: 'user deleted'});
      }
    });

    const filteredArray = this.state.data.filter(user => user.id !== id);

    this.setState({data: filteredArray});
  };

  addUser = data => {
    API.post(`users`, data).then(res => {
      if (res.status !== 200) {
        this.setState({openModal: true, message: res.statusText});
      } else {
        this.setState({openModal: true, message: 'user added'});
      }
    });

    this.setState({data: [...this.state.data, data]});
  };

  editForm = id => {
    const editUser = this.state.data.find(user => user.id === id);

    this.setState({
      editUser,
      addForm: false,
      openModal: false,
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
    });
  };

  updateUser = data => {
    API.put(`users/${data.id}`, data).then(res => {
      if (res.status !== 200) {
        this.setState({openModal: true, message: res.statusText});
      } else {
        this.setState({openModal: true, message: 'user updated'});
      }
    });

    const index = this.state.data.findIndex(user => user.id === data.id);

    const newArray = [...this.state.data];

    newArray[index] = data;

    this.setState({
      data: newArray,
      addForm: !this.state.addForm,
      editUser: null,
    });
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.openModal}
          message={this.state.message}
          close={this.closeModal}
        />
        <section>
          <h2>Table</h2>
          <SimpleTable
            data={this.state.data}
            deleteAction={this.deleteUser}
            updateAction={this.editForm}
          />
        </section>
        <section>
          <h2>Summary</h2>
          <Summary data={this.state.data} />
        </section>
        {this.state.addForm && (
          <section>
            <h2>Form</h2>
            <AddForm action={this.addUser} />
          </section>
        )}
        {!this.state.addForm && (
          <section>
            <h2>Edit</h2>
            <EditForm data={this.state.editUser} action={this.updateUser} />
          </section>
        )}
      </div>
    );
  }
}

export default App;
