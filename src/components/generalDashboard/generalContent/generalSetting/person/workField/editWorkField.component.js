/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Input, Label, Button, CustomInput, Form, FormGroup } from 'reactstrap';
import { putIndustry } from '../../../../../../redux/infrastructure/industry/industry.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class EditWorkField extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            parentId: undefined,
            title: '',
            descriptionRow: '',
            //flag
            isParentIdHidden: true,
            isParentIdSwitchChecked: false,
            isParentIdSwitchDisable:false,
            //list
            industryFullPathByIdList: [],

        }
    }
    /* #endregion */

    /* #region  [- method -] */
    
    /* #region  [- componentDidMount() -] */
    async componentDidMount() {

        if (this.props.industryFullPathByIdList.length===0) {
            this.setState({
              isParentIdSwitchDisable:true,
      
            })
            
          }
          else{
            this.setState({
              isParentIdSwitchDisable:false,
      
            })
          }

        const industryItem = Object.assign({}, this.props.industryItem[0]);
        if (industryItem.parentId !== null) {
            this.setState({
                id: industryItem.id,
                parentId: industryItem.parentId,
                title: industryItem.title,
                descriptionRow: industryItem.descriptionRow,
                isParentIdHidden: false,
                isParentIdSwitchChecked: true,
            })
        }
        else {
            this.setState({
                id: industryItem.id,
                parentId: null,
                title: industryItem.title,
                descriptionRow: industryItem.descriptionRow,
                isParentIdHidden: true,
                isParentIdSwitchChecked: false,
            })
        }


    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.industryFullPathByIdList !== prevProps.industryFullPathByIdList) {

        }
        this.setState({
            industryFullPathByIdList: this.props.industryFullPathByIdList
        })
    }
    /* #endregion */

    /* #region  [- putIndustry -] */
    putIndustry = async () => {
        let industryPutData = {
            industryList: [
                {
                    id: this.state.id,
                    parentId: parseInt(this.state.parentId),
                    title: this.state.title,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.putIndustry(industryPutData);
    }
    /* #endregion */


    /* #region  [- parentIdSwitchHandleChange -] */
    parentIdSwitchHandleChange = (event) => {
        if (event.target.checked === true) {

            this.setState({
                isParentIdHidden: false,
                isParentIdSwitchChecked: true
            })
        } else if (event.target.checked === false) {
            this.setState({
                isParentIdHidden: true,
                isParentIdSwitchChecked: false
            })
        }
    }
    /* #endregion */

    /* #region  [- inputHandleChange -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /* #endregion */


    /* #region  [- onClose -] */
    onClose = () => {
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.putIndustry();
        await this.props.onClose();
    }
    /* #endregion */


    /* #region  [- render -] */
    render() {

        const industryFullPath = this.props.industryFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ))

        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش زمینه فعالیت</span>
                    </Col>
                </Row>

                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title="parentIdSwitch" style={{ textAlign: 'right' }}>
                                <Label for="parentIdSwitch">زیر مجموعه</Label>
                                <CustomInput
                                    type="switch"
                                    id="parentIdSwitch"
                                    checked={this.state.isParentIdSwitchChecked}
                                    onChange={this.parentIdSwitchHandleChange}
                                    disabled={this.state.isParentIdSwitchDisable}
                                />
                            </FormGroup>
                            <FormGroup title='parentId' hidden={this.state.isParentIdHidden} style={{ textAlign: 'right' }}>
                                <Label for="parentId">مجموعه</Label>
                                <Input
                                    type="select"
                                    name="parentId"
                                    id="parentId"
                                    value={this.state.parentId}
                                    onChange={this.inputHandleChange}
                                >
                                    <option value={undefined}>-- انتخاب کنید --</option>
                                    {industryFullPath}
                                </Input>
                            </FormGroup>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="title">عنوان</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="عنوان"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="descriptionRow">توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button
                            className='cancel-button-style mr-2'
                            onClick={this.cancel}
                        >
                            لغو
                        </Button>

                        <Button
                            className='submit-button-style mr-2'
                            hidden={this.state.isSaveButtonHidden}
                            onClick={this.submit}
                        >
                            ثبت
                        </Button>
                    </Col>
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
        industryItem: state.industry.industryItem,
        industryFullPathByIdList: state.industry.industryFullPathByIdList,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putIndustry: (data) => dispatch(putIndustry(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});

/* #endregion */


export default connect(mapStateToProps, mapDispatchToProps)(EditWorkField);