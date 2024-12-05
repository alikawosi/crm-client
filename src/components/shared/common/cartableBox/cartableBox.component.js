import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import { Col, Row } from 'antd';
import './cartableBox.component.css';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();

class CartableBox extends PureComponent {
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
            <Card id={this.props.id} className='mb-3 card-border' style={{ minHeight: '140px', cursor: 'pointer', margin: '0', width: 'inherit', borderRadius: '33px', backgroundColor: '#deebf6' }} onClick={this.onClick}>
                <Row className='mt-4 px-4' style={{ width: 'inherit' }}>
                    <Col span={18} style={{ textAlign: 'right', fontSize: '30px' }}>
                        {this.props.title}
                    </Col>
                    <Col span={6} style={{ direction: 'ltr' }}>
                        <div
                            style={{
                                float: "left",
                                width: "60px",
                                height: "60px",
                                //background: "linear-gradient(60deg, rgb(180, 204, 222), rgb(95, 217, 244))",
                                backgroundColor: '#2e75b5',
                                //borderRadius: "50%",
                                marginRight: "7%",
                                position: 'relative',
                                left: 0,
                                right: '50%',
                            }}
                        >
                            <Icon
                                iconName={this.props.fabricIcon}

                                style={{
                                    fontSize: "25px",
                                    marginTop: "10px",
                                    color: 'white',
                                    //marginRight: "13px",
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className='p-4' style={{ textAlign: 'right', width: 'inherit',fontSize:'15px' }}>
                    {this.props.description}
                </Row>
            </Card>
        );
    }
}

export default CartableBox;