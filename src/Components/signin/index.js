import React, { Component } from 'react';
import Form from '../UI/Form';
import { firebase } from '../../firebase';
import { setTimeout } from 'timers';

class SignIn extends Component {

    state = {
        formError: false,
        formSucces: '',
        formData: {

            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Eneter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: true,
                validationMessage: ''
            },

            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Eneter your password'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: ''
            }
        }
    }

    Submit(event) {
        event.preventDefault();

        let data = {};

        for (let key in this.state.formData) {
            data[key] = this.state.formData[key].value;
        }

        if (this.state.formError == false) {
            firebase.auth()
                .signInWithEmailAndPassword(
                    data.email,
                    data.password
                ).then(() => {
                    this.props.history.push('/dashboard');
                }).catch(error => {
                    this.setState({
                        formError: true
                    })
                    setTimeout(() => {
                        this.setState({
                            formError: false
                        })
                    }, 2000);
                })
        }
        else if (this.state.formError == true) {
            console.log("ERROR");
            this.setState({
                validationMessage: 'Something is wrong'
            })
        }

    }

    Update(element) {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[element.id] }

        newElement.value = element.event.target.value;
        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        })
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{ marfgin: '100px' }}>
                    <form onSubmit={(event) => this.Submit(event)}>
                        <h2>Please Login</h2>

                        <Form
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(element) => this.Update(element)}
                        />

                        <Form
                            id={'password'}
                            formData={this.state.formData.password}
                            change={(element) => this.Update(element)}
                        />
                        {this.state.formError ?
                            <div className="error_label">Something is wrong</div>
                            : null
                        }

                        <button onChange={(event) => this.Submit(event)}>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;