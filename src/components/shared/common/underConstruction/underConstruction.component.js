import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import UnderConstructionImage from '../../../../image/underConstruction/underConstruction.png';

class UnderConstruction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Row>
                <Col span={24}>
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={8}>

                        </Col>
                        <Col span={8}>
                            <img src={UnderConstructionImage} alt='logo' style={{ width: '100%' }} />
                        </Col>
                        <Col span={8}>

                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={8}>

                        </Col>
                        <Col span={8}>
                            <h4 style={{ textAlign: 'center' , fontFamily:'crmPersionFont' }}>این صفحه در دست طراحی است.</h4>
                        </Col>
                        <Col span={8}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default UnderConstruction;