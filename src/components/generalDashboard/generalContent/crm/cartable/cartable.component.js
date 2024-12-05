/* #region  [- imports -] */
import React, { Component } from 'react';
import { Tabs } from "antd";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../redux/shared/auth/auth.action';
import { getPersonItem, resetProps as personResetProps } from '../../../../../redux/infrastructure/person/person.action';
import { getOrganizationItem, resetProps as organizationResetProps } from '../../../../../redux/infrastructure/organization/organization.action';
import Operation from './operation/operation.component'
import Notification from '../../../../shared/common/notification/notification.component';
import NewPersonAccount from './operation/newPersonAccount/newPersonAccount.component'
import NewOrganizationAccount from './operation/newOrganizationAccount/newOrganizationAccount.component'
import EditPersonAccount from './operation/newPersonAccount/editPersonAccount.component'
import EditOrganizationAccount from './operation/newOrganizationAccount/editOrganizationAccount.component'
import { personAccountResetProps, resetPersonInsertedId } from '../../../../../redux/crm/account/account/person/personAccount.action'
import { organizationAccountResetProps, resetOrganizationInsertedId } from '../../../../../redux/crm/account/account/organization/organizationAccount.action'
const { TabPane } = Tabs;
/* #endregion */

class Cartable extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            isOperationDisabled: true,
            /* #region  [- componentFields -] */
            tabComponent: <Operation newPerson={this.newPerson} newOrganization={this.newOrganization} editPerson={this.editPerson} editOrganization={this.editOrganization} />
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("368")) {
            this.setState({
                isOperationDisabled: false
            })
        }



    }
    /* #endregion */


    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== '') {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'Successfully Set.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'پیدا نشد.') {
                Notification('bottomLeft', this.props.message, 'error');
            } else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            this.props.personResetProps();
            this.props.organizationResetProps();
            this.props.personAccountResetProps();
            this.props.organizationAccountResetProps();
        }
        if (prevProps.tabKeyCounter !== this.props.tabKeyCounter) {
            this.setState({
                tabComponent: <Operation newPerson={this.newPerson} newOrganization={this.newOrganization} editPerson={this.editPerson} editOrganization={this.editOrganization} />
            })
        }
    }
    /* #endregion */

    /* #region  [- newPerson -] */
    newPerson = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewPersonAccount onClose={this.onClose} />
        })
    }
    /* #endregion */

    /* #region  [- newOrganization -] */
    newOrganization = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            tabComponent: <NewOrganizationAccount onClose={this.onClose} />
        })
    }
    /* #endregion */

    /* #region  [- editPerson -] */
    editPerson = async (id) => {
        await this.getPersonItem(id);
        this.setState({
            tabComponent: <EditPersonAccount insertedPersonId={id} onClose={this.onClose} />
        })
    }
    /* #endregion */

    /* #region  [- editOrganization -] */
    editOrganization = async (id) => {
        await this.getOrganizationItem(id);
        this.setState({
            tabComponent: <EditOrganizationAccount insertedOrganizationId={id} onClose={this.onClose} />
        })
    }
    /* #endregion */

    /* #region  [- onClose -] */
    onClose = async () => {
        this.setState({
            tabComponent: <Operation newPerson={this.newPerson} newOrganization={this.newOrganization} editPerson={this.editPerson} editOrganization={this.editOrganization} />
        })
        await this.props.resetPersonInsertedId()
        await this.props.resetOrganizationInsertedId()
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - onChangeTab - ] */
    onChangeTab = async (key) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (key === "1") {
            this.setState({
                tabComponent: <Operation newPerson={this.newPerson} newOrganization={this.newOrganization} editPerson={this.editPerson} editOrganization={this.editOrganization} />
            })
        }
        else {
            this.setState({
                tabComponent: <div></div>
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPersonItem() -] */
    getPersonItem = async (id) => {
        let personItemGetData = {
            personId: id
        }
        await this.props.getPersonItem(personItemGetData);
    }
    /* #endregion */

    /* #region  [- getOrganizationItem() -] */
    getOrganizationItem = async (id) => {
        let organizationItemGetData = {
            organizationId: id,
            domainRef: this.props.domain,

        }
        await this.props.getOrganizationItem(organizationItemGetData);
    }
    /* #endregion */


    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container fluid style={{ padding: '0 2% 5% 2%', width: '100%', height: '93vh', overflow: 'hidden scroll' }}>

                <Row name='row_01_Header' className='content-header-row' >
                    <Col className='content-header-col'>
                        <p className='content-header-title'>میز کار</p>
                    </Col>
                </Row>

                <Row name="row_02_Tabs" style={{ padding: "0 1% 1% 1%", direction: 'rtl', height: '87vh' }}>

                    <Tabs style={{ width: "100%", height: '85vh' }} defaultActiveKey="1" onChange={this.onChangeTab} >

                        <TabPane name="operation" tab="عملیات" key="1" disabled={this.state.isOperationDisabled}>

                            {this.state.tabComponent}

                        </TabPane>

                        <TabPane name="task" tab="وظایف" key="2" disabled >

                            {this.state.tabComponent}

                        </TabPane>

                        <TabPane name="timeline" tab="سوابق" key="3" disabled>

                            {this.state.tabComponent}

                        </TabPane>

                        <TabPane name="archive" tab="آرشیو" key="4" disabled >

                            {this.state.tabComponent}

                        </TabPane>

                    </Tabs>

                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}


/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    var message = ''
    if (state.person.message !== '') {
        message = state.person.message
    }
    else if (state.organization.message !== '') {
        message = state.organization.message
    }
    else if (state.organizationAccount.message !== '') {
        message = state.organizationAccount.message
    }
    else if (state.personAccount.message !== '') {
        message = state.personAccount.message
    }
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        tabKeyCounter: state.quote.tabKeyCounter,
        domain: state.auth.domain,
        message: message,
        userMenuAccessList: state.auth.userMenuAccessList,
    }

};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPersonItem: (data) => dispatch(getPersonItem(data)),
    getOrganizationItem: (data) => dispatch(getOrganizationItem(data)),
    personResetProps: (data) => dispatch(personResetProps(data)),
    organizationResetProps: (data) => dispatch(organizationResetProps(data)),
    personAccountResetProps: (data) => dispatch(personAccountResetProps(data)),
    organizationAccountResetProps: (data) => dispatch(organizationAccountResetProps(data)),
    resetPersonInsertedId: () => dispatch(resetPersonInsertedId()),
    resetOrganizationInsertedId: () => dispatch(resetOrganizationInsertedId()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Cartable);