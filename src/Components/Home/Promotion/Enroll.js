import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Form from '../../UI/Form';
import { emails } from '../../../firebase';

class Enroll extends Component {

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

            emails.orderByChild('email').equalTo(data.email).once("value")
                .then((snapshot) => {
                    if (snapshot.val() == null) {
                        emails.push(data);
                        this.Succes(true);
                    }
                    else {
                        this.Succes(false);
                    }
                })


        }

        else if (this.state.formError == true) {
            console.log("ERROR");
            this.setState({
                validationMessage: 'Something is wrong'
            })
        }

    }

    Succes(type) {
        const newFormData = { ...this.state.formData };

        for (var key in newFormData) {
            newFormData[key].value = '';
        }

        this.setState({
            formData: newFormData,
            formSucces: type ? "Congratulations" : 'Already in the database',
        })

        setTimeout(() => {
            this.setState({
                formSucces: "",
            })
        }, 5000);
    }
    Update = (element) => {
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
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event) => this.Submit(event)}>
                        <div className="enroll_name">
                            Enter your email
                        </div>

                        <div className="enroll_input">
                            <Form
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element) => this.Update(element)}
                            />
                            <div className="success_label">{this.state.formSucces}</div>
                            <button onChange={(event) => this.Submit(event)}>Submit</button>
                            <div className="enroll_discl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;