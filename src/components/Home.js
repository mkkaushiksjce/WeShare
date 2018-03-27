/*
  @author Félix Fuin
  Copyright Nokia 2018. All rights reserved.
*/
import React, { Component } from 'react';
// import {Grid} from 'semantic-ui-react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
// import { Loader } from 'semantic-ui-react';
import { notification, Spin, Col, Row, Divider, message } from 'antd';

import '../css/Home.css';
import HeaderBanner from './Header';
import Browse from './Browse';
import ModalForm from './ModalForm';
import FaShareAlt from 'react-icons/lib/fa/share-alt';
import FaExclamation from 'react-icons/lib/fa/exclamation';
import FaThList from 'react-icons/lib/fa/th-list';



export default class Home extends Component {

    state = { openModal: false, typeModal: "", message: [], loaded: false, userLoaded: false};

      
    componentWillMount(){
        configureAnchors({scrollUrlHashUpdate:false});
        this.hideModal = this.hideModal.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.onLoaded = this.onLoaded.bind(this);
        this.onUserLoaded = this.onUserLoaded.bind(this);
        message.warning('This is a beta version');
    }


    showModal(type){
        this.setState( {openModal: true, typeModal: type});
    }
    hideModal(){
        this.setState( {openModal: false});
    }
    
    showMessage(type, title, text){
        notification[type]({
            message: title,
            description: text,
        });
    }
    
    onLoaded(bool){
        this.setState({loaded: true});
    }
    onUserLoaded(bool){
        this.setState({userLoaded: true});
    }

    render() {
        
        return (
            <div className="home">
                <HeaderBanner onUserLoaded={this.onUserLoaded} />
                <div className="wrapper">
                    <Row className="presentations" justify="space-around" align="middle">
                        {this.state.loaded && this.state.userLoaded ? (
                            <Col span={7}>
                                <div className="presentation" onClick={this.showModal.bind(this,'share')}>
                                    <FaShareAlt size={45} className="icon" color='#474747'/>
                                    <h2>I can help you</h2>
                                </div>
                            </Col>
                        ) : (
                            <Col span={7}>
                                <div className="presentationNotLoaded">
                                    <FaShareAlt size={45} className="icon" color='#d8d8d8'/>
                                    <h2>I can help you</h2>
                                </div>
                            </Col>
                        )}
                        
                        <Col span={1} className="divider">
                            <Divider type="vertical" />
                        </Col>
                        {this.state.loaded && this.state.userLoaded ? (
                            <Col span={8}>
                                <a href='#browse' className="presentation">
                                    <FaThList size={45} className="icon" color='#474747' />
                                    <h2>Browse topics</h2>
                                </a>
                            </Col>
                        ) : (
                            <Col span={8}>
                                <Spin tip="Loading data..." size="large">
                                    <a className="presentationNotLoaded">
                                        <FaThList size={45} className="icon" color='#d8d8d8' />
                                        <h2>Browse topics</h2>
                                    </a>
                                </Spin>
                            </Col>
                        )}
                        <Col span={1} className="divider">
                            <Divider type="vertical" />
                        </Col>
                        {this.state.loaded && this.state.userLoaded ? (
                            <Col span={7}>
                                <div className="presentation" onClick={this.showModal.bind(this,'request')}>
                                    <FaExclamation size={45} className="icon" color='#474747' />
                                    <h2>I need your help</h2>
                                </div>
                            </Col>
                        ) : (
                            <Col span={7}>
                                <div className="presentationNotLoaded">
                                    <FaExclamation size={45} className="icon" color='#d8d8d8' />
                                    <h2>I need your help</h2>
                                </div>
                            </Col>
                        )}
                        
                    </Row>
                </div>
                
                <ScrollableAnchor id={'browse'}>
                    <Browse history={this.props.history} onLoaded={this.onLoaded} />
                </ScrollableAnchor>
            
                {this.state.openModal && this.state.typeModal === "share" ? (
                    <ModalForm modalFormMessage={this.showMessage} modalFormHide={this.hideModal} type="share" />
                ) : null}
                {this.state.openModal && this.state.typeModal === "request" ? (
                    <ModalForm modalFormMessage={this.showMessage}  modalFormHide={this.hideModal} type="request" />
                ) : null}
            </div>
        );
    }
}
