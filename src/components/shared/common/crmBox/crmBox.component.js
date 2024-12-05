import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import { Col, Row } from 'antd';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();


class CRMBox extends PureComponent {
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
            <Card id={this.props.id} className='mb-3' style={{ height: '120px', cursor: 'pointer', margin: '0', width: 'inherit' }} onClick={this.onClick}>
                <Row className='mt-4' style={{ width: 'inherit', paddingRight: '5%' }}>
                    <Col span={6}>
                        <div
                            style={{
                                float: "right",
                                width: "48px",
                                height: "48px",
                                background: "linear-gradient(60deg, rgb(180, 204, 222), rgb(95, 217, 244))",
                                borderRadius: "50%",
                                marginRight: "1%",
                            }}
                        >
                            <Icon
                                iconName={this.props.fabricIcon}
                                style={{
                                    fontSize: "20px",
                                    marginTop: "8px",
                                    //marginRight: "13px",
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={18} style={{ textAlign: 'right', fontSize: '25px' }}>
                        {this.props.title}
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default CRMBox;