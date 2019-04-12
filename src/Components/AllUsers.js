import React from 'react';
import { Col, Table, Button, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,  } from 'reactstrap';
import axios from 'axios';

class AllUsers extends React.Component {
    state = {
        allUsers: [],
        modal: false,
        updateName: '',
        updateEmail: '',
        updatePhone: '',
        updateId: '',
        authToken: '',
        loading: 'Fetching users...'
    }

    componentDidMount(){
        let authToken = sessionStorage.getItem("authToken");
        if(authToken == ''){
            this.props.history.push('/login');
        }
        axios.get('https://node-shop-rest.herokuapp.com/api/user/userlist', { headers: { "Authorization": `Bearer ${authToken}` } })
            .then(response => {
                console.log(response.data.userDetails);
                let length = response.data.userDetails.length;
                let loading = 'Fetching users...';
                if(length == 0){
                    loading = 'No Users Found';
                }
                this.setState({
                    allUsers: response.data.userDetails,
                    authToken: authToken,
                    loading: loading
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    nameHandler = (event) => {
        this.setState({updateName: event.target.value});
    }

    emailHandler = (event) => {
        this.setState({ updateEmail: event.target.value });
    }

    phoneHandler = (event) => {
        this.setState({ updatePhone: event.target.value });
    }

    toggleModal = (event,user) => {
        console.log(user);

        this.setState(prevState => ({
            modal: !prevState.modal,
            updateName: user.name,
            updateEmail: user.email,
            updatePhone: user.phone,
            updateId: user._id
        }));
    }

    toggle = () => {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }

    submitDataHandler = () => {
        console.log("submit data handler");
        console.log(this.state.updateName+" "+this.state.updatePhone+" "+this.state.authToken+" "+this.state.updateId);
        
        axios.put(`https://node-shop-rest.herokuapp.com/api/user/edit/${this.state.updateId}`,{
            name: this.state.updateName,
            phone: this.state.updatePhone,
            
        }, 
        {
            headers: {
                "Authorization": `Bearer ${this.state.authToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.data.message == "User update")
            alert("User updated!");
            window.location.reload();
        })
        .catch(function error(err){
            console.log(err);
        });
    }

    render() {
        let allUsers = (<tr>{this.state.loading}</tr>);
        
        if(this.state.allUsers.length != 0){
            allUsers = this.state.allUsers.map((user,index) => {
                let userId = user._id;
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><Button onClick={(event) => this.toggleModal(event, user)}>Edit</Button><NavLink href={`/delete-user/${user._id}`}>Delete</NavLink></td>
                    </tr>
                );
            });
        }
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle} charCode="Y">Modal title</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Full Name</Label>
                                    <Input type="text" name="fullname" value={this.state.updateName} onChange={event => this.nameHandler(event)} id="exampleName" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Phone Number</Label>
                                    <Input type="number" value={this.state.updatePhone} onChange={event => this.phoneHandler(event)} name="phone" id="examplePhone" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.submitDataHandler}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <NavLink href="add-user">Add User</NavLink>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { allUsers}
                    </tbody>
                </Table>
            </Col>
        );
    }
}

export default AllUsers;