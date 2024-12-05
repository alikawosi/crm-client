/* #region   [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput } from 'reactstrap';
import { putCategoryType } from '../../../../../../redux/infrastructure/categoryType/categoryType.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class EditCategoryType extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            parentId: null,
            title: '',
            descriptionRow: '',
            //flag
            isParentIdHidden: true,
            isParentIdSwitchChecked: false,
            isParentIdSwitchDisable: false,
            //list

        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        /* #region  [- parentIdSwitchEnable/Disable -] */
        if (this.props.categoryTypeFullPathByIdList.length === 0) {
            this.setState({
                isParentIdSwitchDisable: true,

            })

        }
        else {
            this.setState({
                isParentIdSwitchDisable: false,

            })
        }
        /* #endregion */

        const categoryTypeItem = Object.assign({}, this.props.categoryTypeItem[0]);
        if (categoryTypeItem.parentId !== null) {
            this.setState({
                id: categoryTypeItem.id,
                parentId: categoryTypeItem.parentId,
                title: categoryTypeItem.title,
                descriptionRow: categoryTypeItem.descriptionRow,
                isParentIdHidden: false,
                isParentIdSwitchChecked: true,
            })
            ////console.log(categoryTypeItem);
        }
        else {
            this.setState({
                id: categoryTypeItem.id,
                parentId: null,
                title: categoryTypeItem.title,
                descriptionRow: categoryTypeItem.descriptionRow,
                isParentIdHidden: true,
                isParentIdSwitchChecked: false,
            })
        }

        /* #region  [- filteringParentIdSelect] */

    }
    /* #endregion */


    /* #region  [- putCategoryType() -] */
    putCategoryType = async () => {
        let categoryTypePutData = {
            categoryTypeList: [
                {
                    id: this.state.id,
                    parentId: parseInt(this.state.parentId),
                    title: this.state.title,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.putCategoryType(categoryTypePutData);
    }
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /* #endregion */

    /* #region  [- parentIdSwitchHandleChange(event) -] */
    parentIdSwitchHandleChange = (event) => {
        this.setState({
            isParentIdHidden: !event.target.checked,
            isParentIdSwitchChecked: event.target.checked,
        })
    }
    /* #endregion */


    /* #region  [- cancel() -] */
    cancel = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    submit = async () => {
        //this.child.postPerson();
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.putCategoryType();
        await this.props.onClose();
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- combobox -] */
        const categoryTypeFullPath = this.props.categoryTypeFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));
        /* #endregion */

        /* #endregion */
        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش واحد سازمانی</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title="parentIdSwitch" style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">زیر مجموعه</Label>
                                <CustomInput type="switch"
                                    id="parentIdSwitch"
                                    //label="زیر مجموعه"
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
                                    {categoryTypeFullPath}
                                </Input>
                            </FormGroup>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">عنوان</Label>
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
                                <Label for="exampleEmail">توضیحات</Label>
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
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.submit} hidden={this.state.isSaveButtonHidden}>
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
        categoryTypeItem: state.categoryType.categoryTypeItem,
        checkTokenCounter: state.auth.checkTokenCounter,
        categoryTypeFullPathByIdList: state.categoryType.categoryTypeFullPathByIdList,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putCategoryType: (data) => dispatch(putCategoryType(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryType);



