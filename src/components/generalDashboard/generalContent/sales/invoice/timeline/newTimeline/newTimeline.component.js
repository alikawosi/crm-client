/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { PaperClipOutlined } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { changeInvoiceTabKeyCounter } from '../../../../../../../redux/sales/invoice/invoice.action'
import { Modal,Drawer } from "antd";
import AttachFile from './attachFile/attachFile.component';
import {postTimeline ,postInvoiceTimelineManualActivityType} from '../../../../../../../redux/sales/invoice/timeline/timeline.action'
import NewManualActivityType from './newManualActivityType.component'
import { PlusSquareOutlined, } from "@ant-design/icons";
/* #endregion */

class NewTimeline extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isAttachFileModalDestroy: true,
            isAttachFileModalVisible: false,
            isNewManualActivityTypeDrawerVisible: false,
            isNewManualActivityTypeDestroy: true,
            /* #endregion */

            //#region [- dbFields -]
            manualActivityTypeRef: '',
            descriptionRow: '',
            
            //#endregion

            /* #region   [- componentField -] */
            attachedFilesLength: 0,
            modalContent: <div></div>,
            drawerComponent: <div></div>,
            /* #endregion */

            /* #region  [- list -] */
            timelineAttachedFileList: [],
            manualActivityTypeTitleList: [],
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isManualActivityTypeInvalid: false,
            isManualActivityTypeValid: false,

            //#endregion
        }
    }
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setData();
    }
    /* #endregion */

    /* #region  [- setData -] */
    setData = () => {
        this.setState({
            manualActivityTypeTitleList: this.props.manualActivityTypeTitleList.map(item => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>
            )),
        })
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

        switch (event.target.id) {

            //#region [- manualActivityTypeRef -]
            case "manualActivityTypeRef":
                if (event.target.value === "") {
                    this.setState({
                        isManualActivityTypeInvalid: true,
                        isManualActivityTypeValid: false
                    });
                    errors["manualActivityTypeRef"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isManualActivityTypeInvalid: false,
                        isManualActivityTypeValid: true
                    });
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }

        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- manualActivityTypeRef -]      
        if (this.state.manualActivityTypeRef === "") {
            this.setState({
                isManualActivityTypeInvalid: true,
                isManualActivityTypeValid: false
            });
            errors["manualActivityTypeRef"] = "عنوان اجباری است";
        }
        else {
            this.setState({
                isManualActivityTypeInvalid: false,
                isManualActivityTypeValid: true
            });
        }

        //#endregion

        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

        /* #region  [- setManualActivityTypeTitle -] */
        setManualActivityTypeTitle = async () => {
            this.setState({
                manualActivityTypeTitleList: this.props.manualActivityTypeTitleList.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                )),
                isNewManualActivityTypeDrawerVisible: false,
                isNewManualActivityTypeDestroy: true,
                drawerComponent: <div></div>,
                manualActivityTypeRef: '',
                errors: {},
    
                isManualActivityTypeInvalid: false,
                isManualActivityTypeValid: false,
            })
        }
        /* #endregion */

    //#endregion

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #endregion */


    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.changeInvoiceTabKeyCounter(3)
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postTimeline();
            await this.props.changeInvoiceTabKeyCounter(3)
        }

    }
    /* #endregion */

    //#region [- onClickAttachFile() -]
    onClickAttachFile = (e) => {
        this.setState({
            isAttachFileModalVisible: true,
            isAttachFileModalDestroy: false,
            modalContent: <AttachFile
                submitAttachedFile={this.submitAttachedFile}
                timelineAttachedFileList={this.state.timelineAttachedFileList}
                onCancelAttachFileModal={this.onCancelAttachFileModal}
            />
        })
    };
    //#endregion

    /* #region  [ - onCancelAttachFileModal - ] */
    onCancelAttachFileModal = () => {
        this.setState({
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true,
            modalContent: <div></div>,
        })

    }
    /* #endregion */

    /* #region  [- submitAttachedFile -] */
    submitAttachedFile = (data) => {
        this.setState({
            timelineAttachedFileList: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true,
            modalContent: <div></div>,
        })
    }
    /* #endregion */

    
    /* #region  [- onCloseNewManualActivityTypeDrawer -] */
    onCloseNewManualActivityTypeDrawer = () => {
        this.setState({
            isNewManualActivityTypeDrawerVisible: false,
            isNewManualActivityTypeDestroy: true,
            drawerComponent: <div></div>,

        })
    }
    /* #endregion */

    /* #region  [- NewManualActivityType -] */
    NewManualActivityType = async () => {
        this.setState({
            isNewManualActivityTypeDrawerVisible: true,
            isNewManualActivityTypeDestroy: false,
            drawerComponent: <NewManualActivityType onCloseNewManualActivityTypeDrawer={this.onCloseNewManualActivityTypeDrawer} postTimelineManualActivityType={this.postTimelineManualActivityType} />
        })
    }
    /* #endregion */


    /* #endregion */

    //#region [*** api ***]

    /* #region  [- postTimeline() -] */
    postTimeline = async () => {
        let timelinePostData = {
            domainRef: this.props.domain,
            quoteRef:null,
            orderRef:null,
            invoiceRef:this.props.invoiceRef,
            timelineList: [
                {
                    aspNetUsersRef:this.props.userId,
                    manualActivityTypeRef: this.state.manualActivityTypeRef*1,
                    descriptionRow: this.state.descriptionRow
                }
            ],
            timelineCRMFileList:this.state.timelineAttachedFileList
        }
        await this.props.postTimeline(JSON.stringify(timelinePostData));
    }
    /* #endregion */

        /* #region  [- postTimelineManualActivityType() -] */
        postTimelineManualActivityType = async (data) => {
            await this.props.postInvoiceTimelineManualActivityType(JSON.stringify(data));
            await this.setManualActivityTypeTitle();
        }
        /* #endregion */

    //#endregion

    /* #region  [- render() -] */
    render() {

        return (

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>پیشینه جدید</span>
                    </Col>
                </Row>

                <Row name='row_02_Form' style={{ height: '60vh' }}>

                    <Col sm='12' md='6' lg='7'>

                        <Form name='form' style={{ padding: '1%' }}>

                            <FormGroup name='manualActivityTypeRef' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row name='manualActivityTypeRef' style={{ marginBottom: '1%' }}>
                                    <Col sm="11" md="11" lg="5">
                                        <Label>عنوان<span className="form-mandatory-field-star">*</span></Label>
                                        <Input
                                            type='select'
                                            name='manualActivityTypeRef'
                                            id='manualActivityTypeRef'
                                            value={this.state.manualActivityTypeRef}
                                            onChange={this.handleChange}
                                            invalid={this.state.isManualActivityTypeInvalid}
                                            valid={this.state.isManualActivityTypeValid}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {this.state.manualActivityTypeTitleList}
                                        </Input>

                                        <FormFeedback>{this.state.errors.manualActivityTypeRef}</FormFeedback>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '4% 0 0 0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.NewManualActivityType}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='descriptionRow' style={{ marginBottom: '1%' }}>
                                    <Col sm="12" md="12" lg="8">
                                        <label>توضیحات</label>
                                        <Input
                                            type='textarea'
                                            name='descriptionRow'
                                            id='descriptionRow'
                                            value={this.state.descriptionRow}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name="attachFileButton">
                                <Col sm='12' md='12' lg='12' style={{ paddingRight: '0', textAlign: "right" }}>
                                    <Button className="submit-button-style" onClick={this.onClickAttachFile}>
                                        پیوست
                                     </Button>
                                </Col>
                            </FormGroup>

                            <FormGroup name="attachedFileQuantity">
                                <Col sm='3'>
                                    <Row style={{ paddingRight: '1%' }}>
                                        <PaperClipOutlined style={{ fontSize: "18px" }} /><p style={{ marginRight: "1%" }}>{this.state.attachedFilesLength}</p>
                                    </Row>
                                </Col>
                                <Col sm='9'></Col>
                            </FormGroup>

                        </Form>

                    </Col>

                    <Col sm='12' md='6' lg='5'></Col>

                </Row>

                <Row name='row_03_Buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0', textAlign: 'left' }}>
                    <Col sm="6" md="6" lg="6"></Col>
                    <Col sm="6" md="6" lg="6" style={{ lineHeight: '6vh' }}>

                        <Button name='cancel' className='cancel-button-style mr-2' onClick={this.cancel}>لغو</Button>
                        <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ثبت</Button>
                    </Col>
                </Row>

                <Row name='row_04_Modals'>

                    <Modal name="attachFile"
                        destroyOnClose={this.state.isAttachFileModalDestroy}
                        width="800px"
                        visible={this.state.isAttachFileModalVisible}
                        onCancel={this.onCancelAttachFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >

                        <Container fluid>

                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>افزودن پیوست</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                {this.state.modalContent}

                            </Row>

                        </Container>

                    </Modal>

                </Row>

                <Row name='row_05_Drawers'>

                    <Drawer name='newManualActivityType'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseNewManualActivityTypeDrawer}
                        visible={this.state.isNewManualActivityTypeDrawerVisible}
                        destroyOnClose={this.state.isNewManualActivityTypeDestroy}
                    >
                        {this.state.drawerComponent}
                    </Drawer>

                </Row>

            </Container>

        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        userId: state.auth.userId,
        manualActivityTypeTitleList: state.invoiceTimeline.manualActivityTypeTitleList,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    postTimeline: (data) => dispatch(postTimeline(data)),
    postInvoiceTimelineManualActivityType: (data) => dispatch(postInvoiceTimelineManualActivityType(data)),

});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewTimeline);

