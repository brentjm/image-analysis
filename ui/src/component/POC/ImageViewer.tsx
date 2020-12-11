import React from "react";
import axios from "axios";
import ImageWrapper from "./ImageWrapper";
import { IMAGE_LOAD_URL, DENOISE_URL } from "../../utills/config";

interface MainProps {
}

interface ImageLoadProps {
    name: String,
    data: String
}

export const AlertMsg: React.FunctionComponent<any> = (props) => {
    return (
        <div className="alert alert-danger" role="alert">
            {props.msg}
        </div>
    );
}

class ImageViewer extends React.Component<any, any>{
    constructor(props: MainProps) {
        super(props);
        this.state = {
            imageGroup: [] as ImageLoadProps[],
            imageCanvasLoad: [],
            alertStatus: false,
            denoiseAlertStatus: false,
            loading: true
        }
    }

    componentDidMount() {
        // Api call
        axios.get(IMAGE_LOAD_URL).then((result) => {
             this.setState({ imageGroup: result.data.response, loading: false });

        }).catch((err) => {
             console.log(err);
        });
    }

    imageLoadHandler = (data: any) => {
        const isDataExist = this.state.imageCanvasLoad.some(function (el: any) {
            return el.name === data.name;
        });

        if (isDataExist) {
            this.setState({ alertStatus: true });
            setTimeout(() => {
                this.setState({ alertStatus: false });
            }, 3000);
        } else {
            if (data.activeContainer) {
                delete data['activeContainer'];
            }
            this.setState({ alertStatus: false });
            data.isSelected = true;
            data.denoiseOperation = '';
            this.setState({ imageCanvasLoad: [...this.state.imageCanvasLoad, data] });
        }
    }

    deleteItemhandler = (name: any) => {
        const items = this.state.imageCanvasLoad.filter((item: any) => item.name !== name);
        this.state.imageGroup.filter((item: any) => {
            if (item.name === name) {
                delete item['isSelected'];
            }
            return 0;
        });
        this.setState({ imageCanvasLoad: items });
    }


    selectedImageContainer = (data: any) => {
        this.state.imageCanvasLoad.filter((item: any) => {
            if (item['activeContainer']) {
                delete item['activeContainer'];
            }
            return 0;
        });

        const updateCanvas = [...this.state.imageCanvasLoad];
        for (let i = 0; i < updateCanvas.length; i++) {
            if (updateCanvas[i].name === data.name) {
                updateCanvas[i].activeContainer = data.name;
            }
        }

        this.setState({ imageCanvasLoad: updateCanvas });
    }

    onDenoiseHandler = () => {
        if (this.state.imageCanvasLoad.length > 0) {
            const isDataExist = this.state.imageCanvasLoad.some(function (el: any) {
                return el.activeContainer !== undefined;
            });

            if (isDataExist) {
                axios.get(DENOISE_URL).then((result) => {
                    const data = this.state.imageCanvasLoad.filter((el: any) => {
                        if (el.activeContainer !== undefined) {
    
                            el.denoiseOperation = result.data.response;
                        }
                        return el;
                    });
                    this.setState({ imageCanvasLoad: data });
                }).catch((err) => {
                     console.log(err);
                });
                
            } else {
                this.setState({ denoiseAlertStatus: true });
                setTimeout(() => {
                    this.setState({ denoiseAlertStatus: false });
                }, 2000);
            }
        }
    }

    render() {
        const { imageGroup, imageCanvasLoad, alertStatus, loading } = this.state;
        return (
            <>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container-fluid">
                        <div className="row w-100">
                            <div className="col">
                                <svg width="2em" height="2em" color="white" viewBox="0 0 16 16" className="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <div className="col text-center">
                                <div className="navbar-header">
                                    <a className="navbar-brand" href="#">Image Viewer (POC)</a>
                                </div>
                            </div>
                            <div className="col text-center">
                                <p className="text-right m-0">
                                    <button type="button" className="btn btn-dark" onClick={() => this.onDenoiseHandler()}>Denoise</button>
                                </p>
                            </div>
                        </div>

                    </div>
                </nav>

                <div className="row w-100 m-auto border" style={{ height: '90vh' }}>
                    <div className="col-3 px-0 border-right" style={{ backgroundColor: '#fff' }}>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Database
                            </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" className="collapse show listItem" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <ul>
                                        {
                                            loading ? 
                                                <div className="d-flex justify-content-center align-items-center w-100 mt-5">
                                                    <strong>Loading...</strong>
                                                    <div className="spinner-border ml-4 text-primary" role="status" aria-hidden="true"></div>
                                                </div>
                                             : 
                                                imageGroup.map((item: any) => {
                                                    return (<li key={item.name} className="mx-3 d-flex justify-content-between align-items-center" onClick={() => this.imageLoadHandler(item)}>
                                                        <span className="pl-4" style={{ fontWeight: item.isSelected ? 'bold' : null }}>{item.name}</span>
                                                        {item.isSelected ? <img alt="" src={require('../../assets/imgs/tick.png')} style={{ width: 17 }} /> : null}
                                                    </li>);
                                                })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {alertStatus ?
                            <div className="bottom-label"><AlertMsg msg="selected image already added." /></div> : null}
                    </div>
                    <div className="col-9 bg-light" id="image-area">
                        <ImageWrapper
                            imageLoadData={imageCanvasLoad}
                            onDelete={this.deleteItemhandler}
                            selectedImageContainer={this.selectedImageContainer}
                            denoiseAlertStatus={this.state.denoiseAlertStatus}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default ImageViewer;
