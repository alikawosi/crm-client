/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { Drawer } from 'antd';
import { PlusSquareOutlined } from "@ant-design/icons";
import NewExtraInfoTemplate from './newExtraInfoTemplate.component'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getTemplate } from '../../../../../../../redux/infrastructure/extraInfo/extraInfo.action';
import { getPriceListExtraInformation, postPriceListExtraInformation, deletePriceListExtraInformation, resetProps } from '../../../../../../../redux/sales/priceList/priceList/priceList.action';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class ExtraInformation extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.cellRenderer,
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'نوع فیلد', field: "fieldTypeTitle" },
                { headerName: 'نام', field: "title" },
                { headerName: 'مقدار', field: "infoValue" },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowData: [],
            /* #endregion */

            /* #region  [- flags -] */
            isTitleComboboxHidden: true,
            isInfoValueTextboxHidden: false,
            isInfoValueComboboxHidden: true,
            isTableComboboxHidden: true,
            isFieldComboboxHidden: true,
            isDeleteButtonDisable: true,
            isInfoValueTemplateComboboxHidden: true,
            isNewExtraInfoTemplateDrawerVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            id: null,
            fieldTypeRef: '',
            title: '',
            infoValue: '',
            descriptionRow: '',
            /* #endregion */

            /* #region  [- componentField -] */
            extraInfoFieldTypeList: [],
            templateList: [],
            templateDetailList: [],
            newExtraInfoTemplateDrawerContent: <div></div>,
            infoValueType: 'text',
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isFieldTypeRefInvalid: false,
            isFieldTypeRefValid: false,

            isTemplateTitleInvalid: false,
            isTemplateTitleValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            isInfoValueInvalid: false,
            isInfoValueValid: false,

            isTemplateInfoValueInvalid: false,
            isTemplateInfoValueValid: false,

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***]  */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getPriceListExtraInformation();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        //Typical usage of "componentDidUpdate" ==> don't forget to compare props

        if (this.props.priceListExtraInformationList !== prevProps.priceListExtraInformationList) {
            this.setState({
                rowData: this.props.priceListExtraInformationList
            })
        }

        if (this.props.extraInfoFieldTypeList !== prevProps.extraInfoFieldTypeList) {
            this.setState({
                extraInfoFieldTypeList: this.props.extraInfoFieldTypeList
            })
        }

        if (this.props.templateList !== prevProps.templateList) {
            this.setState({
                templateList: this.props.templateList
            })
        }




    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {

        return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    }
    /* #endregion */

  //#region [- validateForm() -]
  validateForm = async (event) => {
    var errors = { ...this.state.errors };
    if (this.state.fieldTypeRef === '') {
        switch (event.target.name) {
            /* #region  [- title -] */
            case 'title':
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            /* #endregion */

            /* #region  [- infoValue -] */
            case 'infoValue':
                if (event.target.value === "") {
                    this.setState({
                        isInfoValueInvalid: true,
                        isInfoValueValid: false
                    });
                    errors["infoValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isInfoValueInvalid: false,
                        isInfoValueValid: true
                    });
                }
                break;
            /* #endregion */

            default:
                break;
        }
    }

    else if (this.state.fieldTypeRef === '1') {
        switch (event.target.name) {

            /* #region  [- title -] */
            case 'title':
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            /* #endregion */

            /* #region  [- infoValue -] */
            case 'infoValue':
                if (event.target.value === "") {
                    this.setState({
                        isInfoValueInvalid: true,
                        isInfoValueValid: false
                    });
                    errors["infoValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isInfoValueInvalid: false,
                        isInfoValueValid: true
                    });
                }
                break;
            /* #endregion */

            default:
                break;
        }

    }

    else if (this.state.fieldTypeRef === '2') {

        switch (event.target.name) {

            /* #region  [- title -] */
            case 'title':
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            /* #endregion */

            /* #region  [- infoValue -] */
            case 'infoValue':
                if (event.target.value === "") {
                    this.setState({
                        isInfoValueInvalid: true,
                        isInfoValueValid: false
                    });
                    errors["infoValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isInfoValueInvalid: false,
                        isInfoValueValid: true
                    });
                }
                break;
            /* #endregion */

            default:
                break;
        }
    }

    else if (this.state.fieldTypeRef === '8') {

        switch (event.target.name) {

            /* #region  [- title -] */
            case 'title':
                if (event.target.value === "") {
                    this.setState({
                        isTemplateTitleInvalid: true,
                        isTemplateTitleValid: false
                    });
                    errors["templateTitle"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isTemplateTitleInvalid: false,
                        isTemplateTitleValid: true
                    });
                }
                break;
            /* #endregion */

            /* #region  [- infoValue -] */
            case 'infoValue':
                if (event.target.value === "") {
                    this.setState({
                        isTemplateInfoValueInvalid: true,
                        isTemplateInfoValueValid: false
                    });
                    errors["templateInfoValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isTemplateInfoValueInvalid: false,
                        isTemplateInfoValueValid: true
                    });
                }
                break;
            /* #endregion */

            default:
                break;
        }

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

        if (this.state.fieldTypeRef === '') {

            /* #region  [- fieldTypeRef -] */
            this.setState({
                isFieldTypeRefInvalid: true,
                isFieldTypeRefValid: false
            });
            errors["fieldTypeRef"] = "نوع فیلد اجباری است";

            /* #endregion */

            /* #region  [- title -] */
            if (this.state.title === "") {
                this.setState({
                    isTitleInvalid: true,
                    isTitleValid: false
                });
                errors["title"] = "نام اجباری است";
            }
            else {
                this.setState({
                    isTitleInvalid: false,
                    isTitleValid: true
                });
            }
            /* #endregion */

            /* #region  [- infoValue -] */
            if (this.state.infoValue === "") {
                this.setState({
                    isInfoValueInvalid: true,
                    isInfoValueValid: false
                });
                errors["infoValue"] = "مقدار اجباری است";
            }
            else {
                this.setState({
                    isInfoValueInvalid: false,
                    isInfoValueValid: true
                });
            }
            /* #endregion */

        }

        else if (this.state.fieldTypeRef === '1') {

            /* #region  [- title -] */
            if (this.state.title === "") {
                this.setState({
                    isTitleInvalid: true,
                    isTitleValid: false
                });
                errors["title"] = "نام اجباری است";
            }
            else {
                this.setState({
                    isTitleInvalid: false,
                    isTitleValid: true
                });
            }
            /* #endregion */

            /* #region  [- infoValue -] */
            if (this.state.infoValue === "") {
                this.setState({
                    isInfoValueInvalid: true,
                    isInfoValueValid: false
                });
                errors["infoValue"] = "مقدار اجباری است";
            }
            else {
                this.setState({
                    isInfoValueInvalid: false,
                    isInfoValueValid: true
                });
            }
            /* #endregion */

        }

        else if (this.state.fieldTypeRef === '2') {

            /* #region  [- title -] */
            if (this.state.title === "") {
                this.setState({
                    isTitleInvalid: true,
                    isTitleValid: false
                });
                errors["title"] = "نام اجباری است";
            }
            else {
                this.setState({
                    isTitleInvalid: false,
                    isTitleValid: true
                });
            }
            /* #endregion */

            /* #region  [- infoValue -] */
            if (this.state.infoValue === "") {
                this.setState({
                    isInfoValueInvalid: true,
                    isInfoValueValid: false
                });
                errors["infoValue"] = "مقدار اجباری است";
            }
            else {
                this.setState({
                    isInfoValueInvalid: false,
                    isInfoValueValid: true
                });
            }
            /* #endregion */

        }

        else if (this.state.fieldTypeRef === '8') {

            /* #region  [- templateTitle -] */
            if (this.state.title === "") {
                this.setState({
                    isTemplateTitleInvalid: true,
                    isTemplateTitleValid: false
                });
                errors["templateTitle"] = "نام اجباری است";
            }
            else {
                this.setState({
                    isTemplateTitleInvalid: false,
                    isTemplateTitleValid: true
                });
            }
            /* #endregion */

            /* #region  [- templateInfoValue -] */
            if (this.state.infoValue === "") {
                this.setState({
                    isTemplateInfoValueInvalid: true,
                    isTemplateInfoValueValid: false
                });
                errors["templateInfoValue"] = "مقدار اجباری است";
            }
            else {
                this.setState({
                    isTemplateInfoValueInvalid: false,
                    isTemplateInfoValueValid: true
                });
            }
            /* #endregion */

        }

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

    /* #region  [- resetForm() -] */
    resetForm = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            /* #region  [- flags -] */
            isTitleComboboxHidden: true,
            isInfoValueTextboxHidden: false,
            isInfoValueComboboxHidden: true,
            isTableComboboxHidden: true,
            isFieldComboboxHidden: true,
            isDeleteButtonDisable: true,
            isInfoValueTemplateComboboxHidden: true,
            isNewExtraInfoTemplateDrawerVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            id: null,
            fieldTypeRef: '',
            title: '',
            infoValue: '',
            descriptionRow: '',
            /* #endregion */

            /* #region  [- componentField -] */
            templateList: [],
            templateDetailList: [],
            newExtraInfoTemplateDrawerContent: <div></div>,
            infoValueType: 'text',
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isFieldTypeRefInvalid: false,
            isFieldTypeRefValid: false,

            isTemplateTitleInvalid: false,
            isTemplateTitleValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            isInfoValueInvalid: false,
            isInfoValueValid: false,

            isTemplateInfoValueInvalid: false,
            isTemplateInfoValueValid: false,

            /* #endregion */

        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postPriceListExtraInformation();
            this.resetForm();
        }
    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deletePriceListExtraInformation();
        this.resetForm();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    handleChange = async (event) => {
        if (event.target.name === 'title' && event.target.type === 'select-one') {
            let detailList = this.props.templateList.filter(item => { return item.templateTitle === event.target.value })
            this.setState({
                templateDetailList: detailList,
                [event.target.name]: event.target.value
            })
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        await this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- handleChangeFieldType(event) -] */
    handleChangeFieldType = async (event) => {
        var errors = { ...this.state.errors };

        if (event.target.value === '') {
            this.setState({
                isTitleComboboxHidden: true,
                isInfoValueTextboxHidden: false,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: true,
                fieldTypeRef: event.target.value,
                title: '',
                infoValue: '',
                descriptionRow: '',
                infoValueType: 'text',

                /* #region  [- formValidation -] */

                isFieldTypeRefInvalid: true,
                isFieldTypeRefValid: false,

                isTemplateTitleInvalid: false,
                isTemplateTitleValid: false,

                isTitleInvalid: false,
                isTitleValid: false,

                isInfoValueInvalid: false,
                isInfoValueValid: false,

                isTemplateInfoValueInvalid: false,
                isTemplateInfoValueValid: false,

                /* #endregion */

            })
            errors["fieldTypeRef"] = "نوع فیلد اجباری است";
        }

        if (event.target.value === '1') {
            await this.setState({
                isTitleComboboxHidden: true,
                isInfoValueTextboxHidden: false,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: true,
                fieldTypeRef: event.target.value,
                title: '',
                infoValue: '',
                descriptionRow: '',
                infoValueType: 'number',
                /* #region  [- formValidation -] */

                isFieldTypeRefInvalid: false,
                isFieldTypeRefValid: true,

                isTemplateTitleInvalid: false,
                isTemplateTitleValid: false,

                isTitleInvalid: false,
                isTitleValid: false,

                isInfoValueInvalid: false,
                isInfoValueValid: false,

                isTemplateInfoValueInvalid: false,
                isTemplateInfoValueValid: false,

                /* #endregion */

            })
        }

        else if (event.target.value === '2') {
            this.setState({
                isTitleComboboxHidden: true,
                isInfoValueTextboxHidden: false,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: true,
                fieldTypeRef: event.target.value,
                title: '',
                infoValue: '',
                descriptionRow: '',
                infoValueType: 'text',
                /* #region  [- formValidation -] */

                isFieldTypeRefInvalid: false,
                isFieldTypeRefValid: true,

                isTemplateTitleInvalid: false,
                isTemplateTitleValid: false,

                isTitleInvalid: false,
                isTitleValid: false,

                isInfoValueInvalid: false,
                isInfoValueValid: false,

                isTemplateInfoValueInvalid: false,
                isTemplateInfoValueValid: false,

                /* #endregion */

            })
        }

        else if (event.target.value === "8") {
            let fieldTypeRef = event.target.value
            await this.getTemplate();
            this.setState({
                isTitleComboboxHidden: false,
                isInfoValueTextboxHidden: true,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: false,
                fieldTypeRef: fieldTypeRef,
                title: '',
                infoValue: '',
                descriptionRow: '',
                infoValueType: 'text',
                /* #region  [- formValidation -] */

                isFieldTypeRefInvalid: false,
                isFieldTypeRefValid: true,

                isTemplateTitleInvalid: false,
                isTemplateTitleValid: false,

                isTitleInvalid: false,
                isTitleValid: false,

                isInfoValueInvalid: false,
                isInfoValueValid: false,

                isTemplateInfoValueInvalid: false,
                isTemplateInfoValueValid: false,

                /* #endregion */

            })
        }

        this.setState({
            errors: errors
        });
    }
    /* #endregion */

    /* #region  [- toggleNewExtraInfoTemplateDrawer -] */

    toggleNewExtraInfoTemplateDrawer = async () => {

        if (this.state.isNewExtraInfoTemplateDrawerVisible === true) {
            await this.getTemplate();
            this.setState({
                isNewExtraInfoTemplateDrawerVisible: false,
                newExtraInfoTemplateDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewExtraInfoTemplateDrawerVisible === false) {
            this.setState({
                isNewExtraInfoTemplateDrawerVisible: true,
                newExtraInfoTemplateDrawerContent: <NewExtraInfoTemplate onClose={this.toggleNewExtraInfoTemplateDrawer} />,
            })
        }

    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        const len = selectedData.length
        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisable: true,
            })
        }
        else if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];
            this.setState({
                id: pickedValue.id,
                isDeleteButtonDisable: false,
            })
        }


    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***]  */

    /* #region  [- getPriceListExtraInformation() -] */
    getPriceListExtraInformation = async () => {
        let priceListExrtaInformationGetData = {
            priceListHeaderRef: this.props.priceListHeaderRef
        }
        await this.props.getPriceListExtraInformation(priceListExrtaInformationGetData);
    }
    /* #endregion */

    /* #region  [- getTemplate() -] */
    getTemplate = async () => {
        let templateGetData = {
            domainRef: this.props.domain
        }
        await this.props.getTemplate(templateGetData);
    }
    /* #endregion */

    /* #region  [- postPriceListExtraInformation() -] */
    postPriceListExtraInformation = async () => {
        let priceListExtraInformationPostData = {
            priceListHeaderRef: this.props.priceListHeaderRef,
            priceListExtraInformationList: [
                {
                    priceListHeaderRef: this.props.priceListHeaderRef,
                    crmFieldRef: null,
                    FieldTypeRef: parseInt(this.state.fieldTypeRef),
                    title: this.state.title,
                    infoValue: this.state.infoValue,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.postPriceListExtraInformation(priceListExtraInformationPostData);
    }
    /* #endregion */

    /* #region  [- deletePriceListExtraInformation() -] */
    deletePriceListExtraInformation = async () => {
        let priceListExtraInformationDeleteData = {
            priceListHeaderRef: this.props.priceListHeaderRef,
            priceListExtraInformationIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deletePriceListExtraInformation(priceListExtraInformationDeleteData);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- combobox -] */

        const fieldTypeList = this.state.extraInfoFieldTypeList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));


        const templateDistinctList = [];
        const tempMap = new Map();
        for (const item of this.state.templateList) {
            if (!tempMap.has(item.templateId)) {
                tempMap.set(item.templateId, true);    // set any value to Map
                templateDistinctList.push({
                    templateId: item.templateId,
                    templateTitle: item.templateTitle
                });
            }
        }

        const templateList = templateDistinctList.map(item => (
            <option key={item.templateId} value={item.templateTitle}>
                {item.templateTitle}
            </option>
        ));

        const templateDetailList = this.state.templateDetailList.map(item => (
            <option key={item.detailId} value={item.detailTitle}>
                {item.detailTitle}
            </option>
        ))
        /* #endregion */

        /* #endregion */
        return (
            <Container fluid style={{ padding: '0 2% 4% 0' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />

                            <FormGroup name='fieldType' style={{ textAlign: 'right' }}>
                                <Col sm='6' md='6' lg='6'></Col>
                                <Col sm='6' md='6' lg='6' style={{ paddingRight: '0' }}>
                                    <Label for="exampleEmail">نوع فیلد<span className="form-mandatory-field-star">*</span></Label>

                                    <Input
                                        type="select"
                                        name="fieldTypeRef"
                                        id="fieldTypeRef"
                                        value={this.state.fieldTypeRef}
                                        onChange={this.handleChangeFieldType}
                                        invalid={this.state.isFieldTypeRefInvalid}
                                        valid={this.state.isFieldTypeRefValid}
                                    >
                                        <option value=''>
                                            -- انتخاب کنید --
                                            </option>
                                        {fieldTypeList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.fieldTypeRef}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='title' style={{ textAlign: 'right' }} hidden={!this.state.isTitleComboboxHidden}>
                                <Col sm='6' md='6' lg='6'></Col>
                                <Col sm='6' md='6' lg='6' style={{ paddingRight: '0' }}>
                                    <Label for="exampleEmail">نام<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="exampleEmail"
                                        placeholder="نام"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        invalid={this.state.isTitleInvalid}
                                        valid={this.state.isTitleValid}
                                    />
                                    <FormFeedback>{this.state.errors.title}</FormFeedback>
                                </Col>

                            </FormGroup>

                            <FormGroup name='templateTitle' style={{ textAlign: 'right' }} hidden={this.state.isTitleComboboxHidden}>
                                <Label for="templateTitle">نام<span className="form-mandatory-field-star">*</span></Label>
                                <Row>
                                 <Col name="templateTitle" sm='11' md='11' lg='5'>
                                        <Input
                                            type="select"
                                            name="title"
                                            id="templateTitle"
                                            placeholder="نام"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            invalid={this.state.isTemplateTitleInvalid}
                                            valid={this.state.isTemplateTitleValid}
                                        >
                                            <option value=''>
                                                -- انتخاب کنید --
                                            </option>
                                            {templateList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.templateTitle}</FormFeedback>
                                    </Col>
                                    <Col name="quickAccess"  sm='1' md='1' lg='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.toggleNewExtraInfoTemplateDrawer}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='infoValue' style={{ textAlign: 'right' }} hidden={this.state.isInfoValueTextboxHidden}>
                                <Col sm='6' md='6' lg='6'></Col>
                                <Col sm='6' md='6' lg='6' style={{ paddingRight: '0' }}>
                                    <Label for="infoValue">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type={this.state.infoValueType}
                                        name="infoValue"
                                        id="infoValue"
                                        value={this.state.infoValue}
                                        onChange={this.handleChange}
                                        invalid={this.state.isInfoValueInvalid}
                                        valid={this.state.isInfoValueValid}
                                    />
                                    <FormFeedback>{this.state.errors.infoValue}</FormFeedback>
                                </Col>

                            </FormGroup>

                            <FormGroup name='templateInfoValue' style={{ textAlign: 'right' }} hidden={this.state.isInfoValueTemplateComboboxHidden}>
                                <Col sm='6' md='6' lg='6'></Col>
                                <Col sm='6' md='6' lg='6' style={{ paddingRight: '0' }}>
                                    <Label for="templateInfoValue">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type="select"
                                        name="infoValue"
                                        id="templateInfoValue"
                                        value={this.state.infoValue}
                                        onChange={this.handleChange}
                                        invalid={this.state.isTemplateInfoValueInvalid}
                                        valid={this.state.isTemplateInfoValueValid}
                                    >
                                        <option value=''>
                                            -- انتخاب کنید --
                                            </option>
                                        {templateDetailList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.templateInfoValue}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">توضیحات</Label>
                                <Row>
                                <Col sm='12' md='12' lg='12'>
                                        <Input
                                            type="textarea"
                                            name="descriptionRow"
                                            id="exampleEmail"
                                            placeholder="توضیحات"
                                            value={this.state.descriptionRow}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    {/*<Col sm='2'>
                                         <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessToIndustry}
                                        /> 
                                    </Col>*/}
                                </Row>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_Buttons'>

                    <Col sm='6' md='6' lg='6' name='col-01-Buttons' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} >
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisable}>
                            حذف
                        </Button>
                    </Col>
                    <Col sm='6' md='6' lg='6'></Col>
                </Row>

                <Row name='row_03_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name='row_04_Drawer'>

                    <Drawer
                        placement={'left'}
                        width={700}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        visible={this.state.isNewExtraInfoTemplateDrawerVisible}
                    >
                        {this.state.newExtraInfoTemplateDrawerContent}
                    </Drawer>

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
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        extraInfoFieldTypeList: state.priceList.extraInfoFieldTypeList,
        priceListExtraInformationList: state.priceList.priceListExtraInformationList,
        templateList: state.extraInfo.templateList,
        priceListHeaderRef: state.priceList.priceListHeaderRef,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getPriceListExtraInformation: (data) => dispatch(getPriceListExtraInformation(data)),
    postPriceListExtraInformation: (data) => dispatch(postPriceListExtraInformation(data)),
    deletePriceListExtraInformation: (data) => dispatch(deletePriceListExtraInformation(data)),
    getTemplate: (data) => dispatch(getTemplate(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInformation);