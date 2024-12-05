import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import { Col, Row } from 'antd';
//import './cartableBox.component.css';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();

class CartableSubBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <Card id={this.props.id} className='mb-3 card-border' style={{ minHeight: '54px', cursor: 'pointer', margin: '0', width: 'inherit', borderRadius: '3px', backgroundColor: '#2e75b5' }} onClick={this.onClick}>
                <Row className='my-2 px-3' style={{ width: 'inherit' }}>
                    <Col span={18} style={{ textAlign: 'right', fontSize: '20px' , color:'white' , lineHeight:'40px' }}>
                        {this.props.title}
                    </Col>
                    <Col span={6} style={{ direction: 'ltr' }}>
                        <div
                            style={{
                                float: "left",
                                width: "40px",
                                height: "40px",
                                //background: "linear-gradient(60deg, rgb(180, 204, 222), rgb(95, 217, 244))",
                                backgroundColor: '#9cc3e5',
                                //borderRadius: "50%",
                                marginRight: "7%",
                                position: 'relative',
                                left: 0,
                                right: '50%',
                                textAlign:'center'
                            }}
                        >
                            <Icon
                                iconName={this.props.fabricIcon}

                                style={{
                                    fontSize: "15px",
                                    marginTop: "8px",
                                    color: 'white',
                                    //marginRight: "13px",
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}
 
export default CartableSubBox;