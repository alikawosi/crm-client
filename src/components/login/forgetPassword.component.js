import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './forgetPassword.component.css';
//import { postLogin, postForgetPassword } from '../../redux/actions/login/login.action';
import { connect } from "react-redux";
import UnderConstruction from '../shared/common/underConstruction/underConstruction.component';


class ForgetPassword extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm='4'></Col>
                    <Col sm='4' className='mb-2'>
                        <UnderConstruction />
                    </Col>
                    <Col sm='4'></Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({

    // post_Login: (loginData) => dispatch(postLogin(loginData)),
    // postForgetUserName: (forgetData) => dispatch(postForgetUserName(forgetData)),



});


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);