/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { postExtraInfoTemplate } from '../../../../../../../redux/infrastructure/extraInfoTemplate/extraInfoTemplate.action';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */

class NewExtraInfoTemplate extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            /* #endregion */

            /* #region  [- dbField -] */
            title: '',
            value: '',
            descriptionRow: '',

            /* #endregion */

            /* #region  [- componentField -]  */
            rowData: [],
            rowIndex: [],
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.cellRenderer,
                    headerName: 'ردیف',
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row", width: 50
                },
                { headerName: 'مقدار', field: "templateValue" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isValueInvalid: false,
            isValueValid: false,

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***]  */

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (name) => {
        var errors = { ...this.state.errors };

        switch (name) {

            //#region [- value -]
            case "value":
                if (this.state.value === "") {
                    this.setState({
                        isValueInvalid: true,
                        isValueValid: false
                    });
                    errors["value"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isValueInvalid: false,
                        isValueValid: true
                    });
                }
                break;
            //#endregion

            //#region [- title -]
            case "title":
                if (this.state.title === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }

        this.setState({
            errors: errors,
        });
    }
    //#endregion

    //#region [- validateFormOnAddButtonClick() -]
    validateFormOnAddButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        /* #region  [- value -] */
        if (this.state.value === "") {
            this.setState({
                isValueInvalid: true,
                isValueValid: false
            });
            errors["value"] = "مقدار اجباری است";
        }
        else {
            this.setState({
                isValueInvalid: false,
                isValueValid: true
            });
        }
        /* #endregion */

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

    //#region [- validateFormOnSubmitButtonClick() -]
    validateFormOnSubmitButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        /* #region  [- title -] */
        if (this.state.title === "") {
            this.setState({
                isTitleInvalid: true,
                isTitleValid: false,
            });
            errors["title"] = "عنوان اجباری است";
        }
        else {
            this.setState({
                isTitleInvalid: false,
                isTitleValid: true,
            });
        }
        /* #endregion */

        /* #region  [- value -] */
        if (this.state.rowData.length === 0) {
            this.setState({
                isValueInvalid: true,
                isValueValid: false
            });
            errors["value"] = "اضافه کردن حداقل یک مقدار اجباری است";
        }
        else {
            this.setState({
                value: '',
                isValueInvalid: false,
                isValueValid: false
            });

        }
        /* #endregion */

        this.setState({
            errors: errors
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

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
                rowIndex: [],
            })
        }
        if (len > 0) {
            let list = []
            for (let i = 0; i < len; i++) {
                list.push(selectedData[i].rowIndex)
            }
            this.setState({
                rowIndex: list,
                isDeleteDisabled: false,
            })
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***]  */

    /* #region  [- deleteRow -] */
    delete = () => {
        var rows = []
        rows = this.state.rowData
        for (let i = 0; i < this.state.rowIndex.length; i++) {
            rows.splice(this.state.rowIndex[i], 1);
        }


        this.setState({
            rowData: rows,
            isDeleteDisabled: true,
            rowIndex: [],
        })
        this.gridApi.setRowData(rows);
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnSubmitButtonClick() === true) {
            await this.postExtraInfoTemplate();
            await this.props.onClose();
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = async (event) => {
        let name = event.target.name
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(name);
    }
    /* #endregion */

    /* #region  [- add -] */
    add = () => {
        if (this.validateFormOnAddButtonClick() === true) {
            let row = {
                templateValue: this.state.value
            };
            this.state.rowData.push(row);
            this.gridApi.setRowData(this.state.rowData);
            this.setState({
                value: '',
                isValueInvalid: false,
                isValueValid: false,
                rowIndex: [],
                isDeleteDisabled: true,
            })
            this.gridApi.deselectAll();
        }
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***]  */

    /* #region  [- postExtraInfoTemplate -] */
    postExtraInfoTemplate = async () => {
        let extraInfoTemplatePostData = {
            domainRef: this.props.domain,
            extraInfoTemplateList:
                [
                    {
                        title: this.state.title,
                        descriptionRow: this.state.descriptionRow
                    }
                ],
            extraInfoTemplateDetailList: this.state.rowData
        }
        await this.props.postExtraInfoTemplate(extraInfoTemplatePostData);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container style={{ height: '100vh' }}>

                <Row name='row_01_header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمونه جدید</span>
                    </Col>
                </Row>

                <Row name='row_02_Form' style={{ height: '86vh' }}>
                    <Col name='form' sm='12'>
                        <Form>

                            <FormGroup name='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">نام<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="نام"
                                    onChange={this.inputHandleChange}
                                    invalid={this.state.isTitleInvalid}
                                    valid={this.state.isTitleValid}
                                />
                                <FormFeedback>{this.state.errors.title}</FormFeedback>
                            </FormGroup>

                            <FormGroup name='templateValue' style={{ textAlign: 'right' }}>
                                <Label for="value">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="value"
                                    id="value"
                                    value={this.state.value}
                                    placeholder="مقدار"
                                    onChange={this.inputHandleChange}
                                    invalid={this.state.isValueInvalid}
                                    valid={this.state.isValueValid}
                                />
                                <FormFeedback>{this.state.errors.value}</FormFeedback>
                            </FormGroup>

                            <FormGroup name='addDelete' style={{ textAlign: 'right' }}>

                                <Row name='row_01_Buttons' >
                                    <Col sm='6'>
                                        <Button className='submit-button-style mr' onClick={this.add}>
                                            اضافه
                        </Button>
                                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                                            حذف
                        </Button>
                                    </Col>
                                    <Col sm='6'></Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='grid'>
                                <Row>
                                    <Col className="ag-theme-alpine mt-2" style={{ height: '20vh', width: '100%' }}>
                                        <AgGridReact
                                            onGridReady={this.onGridReady}
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.rowData}
                                            enableRtl={true}
                                            onSelectionChanged={this.onSelectionChanged}
                                            localeText={AG_GRID_LOCALE_FA}
                                            defaultColDef={this.state.defaultColDef}
                                            rowSelection='single'
                                        >
                                        </AgGridReact>
                                    </Col>

                                </Row>
                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
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

                <Row name='row_03_Buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.submit}>
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
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    postExtraInfoTemplate: (data) => dispatch(postExtraInfoTemplate(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewExtraInfoTemplate);


