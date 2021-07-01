import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/Adminlayout';
import Form from '../../UI/Form';
import { teams, db, matches } from '../../../firebase';
import { dbLoop } from '../../UI/misc';

class AddEditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select an away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: "W", value: "W" },
                        { key: "L", value: "L" },
                        { key: "D", value: "D" },
                        { key: "n/a", value: "n/a" }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        { key: "Yes", value: "Yes" },
                        { key: "No", value: "No" }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
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

    UpdateFields(match, teamOptions, teams, type, matchId) {
        const newFormData = {
            ...this.state.formData
        }

        for (let i in newFormData) {
            if (match) {
                newFormData[i].value = match[i];
                newFormData[i].valid = true;
            }
            if (i === 'local' || i === 'away') {
                newFormData[i].config.options = teamOptions;
            }
        }
        this.setState({
            matchId,
            formType: type,
            formData: newFormData,
            teams
        })
    }

    successForm(msg) {
        this.setState({
            formSuccess: msg
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000)
    }





    componentDidMount() {
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            teams.once('value').then(snapshot => {
                const teams = dbLoop(snapshot);
                const teamOptions = [];

                snapshot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                })
                console.log(teamOptions);
                this.UpdateFields(match, teamOptions, teams, type, matchId);
            })
        }


        if (!matchId) {
            getTeams(null, 'Add match');
        }
        else {
            db.ref(`matches/${matchId}`).once('value')
                .then((snapshot) => {
                    const match = snapshot.val();
                    getTeams(match, 'Edit match');
                })
        }
    }


    Submit(event) {
        event.preventDefault();

        let data = {};

        for (let key in this.state.formData) {
            data[key] = this.state.formData[key].value;
        }

        this.state.teams.forEach((team) => {
            if (team.shortName === data.local) {
                data['localThmb'] = team.thmb;
            }
            if (team.shortName === data.away) {
                data['awayThmb'] = team.thmb;
            }
        })

        if (this.state.formError == false) {
            if (this.state.formType === 'Edit match') {
                db.ref(`matches/${this.state.matchId}`)
                    .update(data).then(() => {
                        this.successForm('Updated!');
                    }).catch((error) => {
                        this.setState({
                            validationMessage: 'Something is wrong'
                        })
                    })
            }
            else if (this.state.formType === 'Add match') {
                matches.push(data).then(() => {
                    this.successForm('Added!');
                    this.props.history.push('/admin_matches');
                }).catch((error) => {
                    this.setState({
                        validationMessage: 'Something is wrong'
                    })
                })
            }
        }
        else if (this.state.formError == true) {
            console.log("ERROR");
            this.setState({
                validationMessage: 'Something is wrong'
            })
        }

    }

    Delete(event) {
        event.preventDefault();
        db.ref(`matches/${this.state.matchId}`).remove();
        this.successForm('Deleted!');
        this.props.history.push('/admin_matches');
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.Submit(event)}>
                            <Form
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(element) => this.Update(element)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <Form
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={(element) => this.Update(element)}
                                        />
                                    </div>
                                    <div>
                                        <Form
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={(element) => this.Update(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <Form
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={(element) => this.Update(element)}
                                        />
                                    </div>
                                    <div>
                                        <Form
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={(element) => this.Update(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <Form
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={(element) => this.Update(element)}
                                />
                                <Form
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={(element) => this.Update(element)}
                                />
                            </div>

                            <div className="split_fields last">
                                <Form
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(element) => this.Update(element)}
                                />

                                <Form
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(element) => this.Update(element)}
                                />
                            </div>

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">Something is wrong</div>
                                : ''
                            }

                            <div className="admin_submit">
                                <button onClick={(event) => this.Submit(event)} style={{marginRight: '20px'}}>
                                    {this.state.formType}
                                </button>
                                {this.state.formType === 'Edit match' ?
                                    <button onClick={(event) => this.Delete(event)}>
                                        Delete the match
                                    </button>
                                    : null
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;