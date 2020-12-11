import React from "react";
import Draggable from 'react-draggable';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface MainProps {
    imageLoadData?: any,
    elemHeight?: any,
    onDelete?: any,
    selectedImageContainer?: any,
    activeContainer?: any,
    denoiseAlertStatus?: any
}

interface MainState {

}

class ImageWrapper extends React.Component<MainProps, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            activeItemName: null,
            isOpen: false,
            openUrl: '',
            modalImgTitle: '',
        }
    }

    imageContainerhandler = (item: any) => {
        this.setState({ activeItemName: item.name });
    }

    onImageClick = (item:any) => {
        this.setState({
            isOpen: true,
            openUrl : `data:image/png;base64,${item.data}`,
            modalImgTitle: item.name
        })
    }

    render() {
        const { imageLoadData, onDelete } = this.props;
        return (
            <>
                <ul id="menu" className="pb-4 imageWrapper">
                    {imageLoadData.map((item: any) => {
                        return (
                                <Draggable
                                    axis="both"
                                    handle=".handle"
                                    bounds="parent"
                                    scale={1}>
                                    <li key={item.name}>
                                    <div className=" handle imgcontainer" >
                                        <div onClick={() => this.props.selectedImageContainer(item)} className={item.activeContainer === item.name ? "activeContainer imageHeader" : "bg-secondary imageHeader"}>
                                            <div className="row w-100 h-100 m-0">
                                                <div className="col-4 d-flex align-items-center">
                                                    <svg width="1.5em" height="1.5em" color="white" viewBox="0 0 16 16" className="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                                    </svg>
                                                </div>
                                                <div className="col-4 p-0 d-flex align-items-center text-white">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="col-4">
                                                    <button type="button" className="close" aria-label="Close">
                                                        <span aria-hidden="true" onClick={(event) =>{ event.stopPropagation(); onDelete(item.name);}}>&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="imageContainer">
                                                {item.denoiseOperation !== '' ? <div className="d-flex justify-content-center align-items-center denoiseContainer">{item.denoiseOperation}</div> : null}
                                                <img alt="" src={`data:image/png;base64,${item.data}`} onClick={(event) => { event.stopPropagation(); this.props.selectedImageContainer(item); this.onImageClick(item);}}/>                                           </div>
                                        </div>
                                    </div>
                                    </li>
                                </Draggable>
                            
                        );
                    })}
                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.openUrl}
                            imageTitle={this.state.modalImgTitle}
                            animationDuration={500}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </ul>

                {this.props.denoiseAlertStatus ?
                    <div className="denoise-bottom-label">
                        <div className="w-100 alert alert-danger alert-dismissible fade show" role="alert">
                            Please select at least one image container to perform denoise operation
                        </div>
                    </div> : null}
            </>
        );
    }
}


export default ImageWrapper;
