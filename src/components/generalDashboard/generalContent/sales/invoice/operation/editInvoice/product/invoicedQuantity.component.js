import React from "react";
import { notification } from 'antd';
import {  FrownOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const InvoiceQuantityNotification = (placement, message) => {
    notification.config({
        rtl: true,
    })

    notification.open({
        //message: `اعلان`,
        duration: 4,
        rtl: true,
        //icon: <FrownOutlined style={{ fontSize: "30px", color: 'red' }} />,
        description: <Row>
            <Col span={4}>
                <FrownOutlined style={{ fontSize: "25px", color: 'red', marginLeft: '5px' }} />
            </Col>
            <Col span={20}>
                <h6 style={{ direction: 'rtl', textAlign: 'right', lineHeight: '20px' }}>{message}</h6>
            </Col>
        </Row>,
        //message,
        placement
        //style:{border:"solid" ,borderColor:'#C62828'}
    })



}

export default InvoiceQuantityNotification;