/* #region  [- imports -] */
import React, { Component } from 'react';
import { connect } from "react-redux";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col, Button, } from "reactstrap";
import PersonalImage from './personalImage.component'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { getExistingPersonAccount, postExistingPersonAccount } from '../../../../../../../redux/crm/account/account/person/personAccount.action'

/* #endregion */


class NewExistingPersonAccount extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- grid -] */
            columnDefs: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    cellClass: "locked-col",
                    pinned: "right",
                    width: 60,
                },
                {
                    headerName: 'عکس پرسنلی',
                    cellRenderer: "personalImage",
                    width: 150,
                  },
                { headerName: "کد", field: "code", },
                { headerName: "نام", field: "firstName", },
                { headerName: "نام خانوادگی", field: "surname", },
                { headerName: "وضعیت کاربری", field: "", },
                { headerName: "سطح", field: "", },
                { headerName: "نام پدر", field: "fatherName", },
                { headerName: "محل تولد", field: "placeOfBirth", },
                { headerName: "کد ملی", field: "nationalCode", },
                { headerName: "شماره شناسنامه", field: "idNumber", },
                { headerName: "سطح تحصیلات", field: "educationLevelTitle", },
                { headerName: "معرف", field: "introducer", },
                { headerName: "تاریخ تولد", field: "nativeBirthDate", },
                { headerName: "موبایل", field: "mobile", },
                { headerName: "ایمیل", field: "email", },
                { headerName: "تلفن", field: "tel", },
                { headerName: "فکس", field: "fax", },
                { headerName: 'کد پستی', field: "postalCode", },
                { headerName: "آدرس", field: "personAddress", },
                { headerName: "توضیحات", field: "descriptionRow", },

            ],
            gridOption: {

                context: { componentParent: this },
                frameworkComponents: {
                  personalImage: PersonalImage,
                }
              },
              defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [- lists -] */
            rowData: [],
            selectedIdList: [],
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region   [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.setState({
            rowData: this.props.personList
        })
    }
    /* #endregion */

    /* #region  [- componentDidUpdate() -] */
    componentDidUpdate(prevProps) {
        if (prevProps.personList !== this.props.personList) {
            this.setState({
                rowData: this.props.personList
            })
        }

    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApiExistingPerson = params.api;
        this.gridColumnApi = params.columnApi;
    };
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var isFormValid = false;

        if (Object.keys(this.state.selectedIdList).length > 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }

        return isFormValid;
    }

    //#endregion

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    //#region  [ - onSelectionChanged - ] */
    onSelectionChanged = (event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                selectedIdList: []
            })
        }
        else {
            let idList = [];
            for (let i = 0; i < len; i++) {
                idList.push({
                    id: selectedData[i].id
                })
            }
            this.setState({
                selectedIdList: idList
            })
        }

    };
    //#endregion

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- refresh -] */
    refresh = () => {
        this.getExistingPersonAccount();
    }
    /* #endregion */

    /* #region  [- choose() -] */
    choose = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postExistingPersonAccount();
            await this.props.onClose();
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getExistingPersonAccount -] */
    getExistingPersonAccount = async () => {
        let existingPersonAccountGetData = {
            domainRef: this.props.domain
        }
        await this.props.getExistingPersonAccount(JSON.stringify(existingPersonAccountGetData));
    }
    /* #endregion */

    /* #region  [- postExistingPersonAccount -] */
    postExistingPersonAccount = async () => {
        let existingPersonAccountPostData = {
            domainRef: this.props.domain,
            existingPersonAccountList: this.state.selectedIdList
        }
        await this.props.postExistingPersonAccount(JSON.stringify(existingPersonAccountPostData));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid style={{ margin: '0', padding: '0 2% 0 2%', width: '100%', height: '100vh' }}>

                <Row name='row_01_Modal_Header' className='modal-header-row mb-2'>
                    <Col className='modal-header-col'>
                        <p className='modal-header-title'>شخص حقیقی</p>
                    </Col>
                </Row>

                <Row name='row_02_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }} >

                    <Col sm="6" className='content-button-right-col' style={{ textAlign: 'right', padding: '0' }}>

                        <Button name='choose' className='submit-button-style' onClick={this.choose}>انتخاب</Button>
                        <Button name='refresh' className='submit-button-style mr-2' onClick={this.refresh}>بازیابی</Button>

                    </Col>

                    <Col sm="6" className='content-button-left-col'></Col>

                </Row>

                <Row name="row_02_Grid" key='row_02_Grid' style={{ height: '84vh' }} >

                    <Col sm="12" className="ag-theme-alpine" style={{ height: '60vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            enableRtl={true}
                            localeText={localText}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            onSelectionChanged={this.onSelectionChanged}
                            rowHeight="50"
                            gridOptions={this.state.gridOption}
                            defaultColDef={this.state.defaultColDef}
                        ></AgGridReact>
                    </Col>

                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        personList: state.personAccount.personList,
        domain: state.auth.domain,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getExistingPersonAccount: (data) => dispatch(getExistingPersonAccount(data)),
    postExistingPersonAccount: (data) => dispatch(postExistingPersonAccount(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewExistingPersonAccount);