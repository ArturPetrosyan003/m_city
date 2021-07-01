import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    handleUploadStart = () =>{
        this.setState({
            isUploading: true
        })
    }

    handleUploadError = () =>{
        this.setState({
            isUploading: false
        })
    }

    handleUploadSuccess = (fileName) =>{
        this.setState({
            name: fileName,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir).child(fileName).getDownloadURL()
        .then(url =>{
            console.log(url);
            this.setState({
                fileURL: url
            });
        });

        this.props.fileName(fileName);

    }

    Remove = (event) =>{
        event.preventDefault();
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });
        this.props.resetImage();
        firebase.storage().ref(this.props.dir).child(this.state.name).delete();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) {
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null;
    }

    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    : 
                    <div className="image_upload_container">
                        <img style={{width: "100%"}} src={this.state.fileURL} alt={this.state.name} />
                        <div className="remove" onClick={(event) => this.Remove(event)}>
                            Remove
                        </div>
                    </div>
                }
                {this.state.isUploading ?
                    <div className="progress" style={{textAlign: 'center', margin: '30px 0'}}>
                        <CircularProgress style={{color: '#98c6e9'}} thickness={7} />
                    </div>
                    :null
                }
            </div>
        );
    }
}

export default Fileuploader;