import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/Adminlayout';
import Form from '../../UI/Form';
import { db, players, firebase } from '../../../firebase';
import Fileuploader from '../../UI/FileUploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddEditPlayers extends Component {

    state = {
        isLoading: true,
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defender", value: "Defender" },
                        { key: "Midfielder", value: "Midfielder" },
                        { key: "Striker", value: "Striker" }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true,
                },
                valid: true
            }
        }
    }

    UpdateFields = (player, playerId, type, defaultImg) => {
        const newFormData = { ...this.state.formData };

        for (let i in newFormData) {
            newFormData[i].value = player[i];
            newFormData[i].valid = true;
        }

        this.setState({
            isLoading: false,
            playerId,
            defaultImg,
            formType: type,
            formData: newFormData
        })
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;
        if (!playerId) {
            this.setState({
                formType: 'Add Player',
                isLoading: false
            });
        }
        else {
            db.ref(`players/${playerId}`).once('value').then(snapshot => {
                const players = snapshot.val();
                console.log(players);
                firebase.storage().ref('players').child(players.image).getDownloadURL()
                    .then(url => {
                        this.UpdateFields(players, playerId, 'Edit player', url);
                    }).catch(error => {
                        this.UpdateFields({ ...players, image: '' }, playerId, 'Edit player', '');
                    });
            });
        }
    }

    Update(element, content = null) {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[element.id] }

        if (content === null) {
            newElement.value = element.event.target.value;
        }
        else {
            newElement.value = content;
        }

        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        })
    }


    successForm = (msg) => {
        this.setState({
            formSuccess: msg
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000);
    }

    Submit(event) {
        event.preventDefault();

        let data = {};

        for (let key in this.state.formData) {
            data[key] = this.state.formData[key].value;
        }

        if (this.state.formError == false) {
            if (this.state.formType === "Edit player") {
                db.ref(`players/${this.state.playerId}`).update(data).then(() => {
                    this.successForm('Updated!');
                }).catch(error => {
                    this.setState({
                        formError: true
                    })
                })
            }
            else {
                players.push(data).then(() => {
                    this.props.history.push('/admin_players');
                }).catch(error => {
                    this.setState({
                        formError: true
                    });
                });
            }
        }
        else if (this.state.formError == true) {
            console.log("ERROR");
            this.setState({
                validationMessage: 'Something is wrong'
            })
        }

    }

    ResetImage = () => {
        const newFormData = { ...this.state.formData };
        newFormData['image'].value = '';
        newFormData['image'].valid = false;

        this.setState({
            defaultImg: '',
            formData: newFormData
        })
    }

    StoreFileName = (fileName) => {
        this.Update({ id: 'image' }, fileName);
    }

    Delete(event) {
        event.preventDefault();
        db.ref(`players/${this.state.playerId}`).remove();
        firebase.storage().ref('players').child(this.state.formData.image.value).delete();
        this.successForm('Deleted!');
        this.props.history.push('/admin_players');
    }

    render() {
        return (
            <AdminLayout>
                {!this.state.isLoading ?
                    <div className="editplayers_dialog_wrapper">
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div>
                            <form onSubmit={(event) => this.Submit(event)}>

                                <Fileuploader
                                    dir="players"
                                    tag={"Player image"}
                                    defaultImg={this.state.defaultImg}
                                    defaultImgName={this.state.formData.image.value}
                                    resetImage={() => this.ResetImage()}
                                    fileName={(fileName) => this.StoreFileName(fileName)}
                                />

                                <Form
                                    id={'name'}
                                    formData={this.state.formData.name}
                                    change={(element) => this.Update(element)}
                                />
                                <Form
                                    id={'lastname'}
                                    formData={this.state.formData.lastname}
                                    change={(element) => this.Update(element)}
                                />
                                <Form
                                    id={'number'}
                                    formData={this.state.formData.number}
                                    change={(element) => this.Update(element)}
                                />
                                <Form
                                    id={'position'}
                                    formData={this.state.formData.position}
                                    change={(element) => this.Update(element)}
                                />

                                <div className="success_label">{this.state.formSuccess}</div>

                                {this.state.formError ?
                                    <div className="error_label">Something is wrong</div>
                                    : ''
                                }

                                <div className="admin_submit">
                                    <button onClick={(event) => this.Submit(event)} style={{ marginRight: '20px' }}>
                                        {this.state.formType}
                                    </button>
                                    {this.state.formType === 'Edit player' ?
                                        <button onClick={(event) => this.Delete(event)}>
                                            Delete the player
                                    </button>
                                        : null
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="admin_progress">
                        {this.state.isLoading ?
                            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                            : null
                        }
                    </div>
                }
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;