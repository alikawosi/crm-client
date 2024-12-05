import React from "react";
import { notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const Notification = (placement, message, type) => {
    notification.config({
        rtl: true,
    })
    switch (type) {
        case 'success':
            notification.open({
                //message: <h3 style={{direction:'rtl',textAlign:'right'}}>{'اعلان'}</h3>,
                duration: 4,
                rtl: true,
                description: <Row>
                    <Col span={6}>
                        <SmileOutlined style={{ fontSize: "25px", color: 'green', marginLeft: '5px' }} />
                    </Col>
                    <Col span={18}>
                        <h6 style={{ direction: 'rtl', textAlign: 'right', lineHeight: '25px' }}>{message}</h6>
                    </Col>
                </Row>,
                // message,
                //icon: <SmileOutlined style={{ fontSize: "30px", color: 'green' }} />,
                placement
                //style:{ border:"solid" ,borderColor:'#43A047'} 
            })
            break;
        case 'error':
            notification.open({
                //message: `اعلان`,
                duration: 4,
                rtl: true,
                //icon: <FrownOutlined style={{ fontSize: "30px", color: 'red' }} />,
                description: <Row>
                    <Col span={6}>
                        <FrownOutlined style={{ fontSize: "25px", color: 'red', marginLeft: '5px' }} />
                    </Col>
                    <Col span={18}>
                        <h6 style={{ direction: 'rtl', textAlign: 'right', lineHeight: '25px' }}>{message}</h6>
                    </Col>
                </Row>,
                //message,
                placement
                //style:{border:"solid" ,borderColor:'#C62828'}
            })
            break;
        default:
            //case 'error':
            notification.error({
                message: `اعلان`,
                rtl: true,
                icon: <FrownOutlined style={{ fontSize: "30px", color: 'red' }} />,
                description:
                    "Something went wrong!",
                placement,
                // style:{  border:"solid" ,borderColor:'#C62828'}
            })
    }


}

export default Notification;