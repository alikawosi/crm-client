/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from 'reactstrap';
import { Table, Modal, Drawer } from 'antd';
import { PlusSquareOutlined, PaperClipOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getProperty, getPropertyFormData, getPropertyTemplate, postProperty, deleteProperty, resetProps, getPropertyItem, putProperty } from '../../../../../../../redux/product/property/property.action';
import PropertyAttachFile from './attachFile/attachFile.component';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import NewScale from './newScale.component'
import { getScaleFullPath, resetProps as scaleResetProps } from '../../../../../../../redux/product/scale/scale.action';
import Notification from "../../../../../../shared/common/notification/notification.component";
import GridFileAttachmentButton from './gridFileAttachmentButton.component'
/* #endregion */

class Property extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            columnDefs: [
                {
                    headerName: "ردیف",
                    //headerCheckboxSelection: true,
                    checkboxSelection: true,
                    valueGetter: "node.rowIndex+1",
                    cellClass: "locked-col",
                    //pinned: "right",
                    width: 90
                },
                { headerName: "Id", field: "id", hide: true },
                { headerName: "عنوان", field: "title" },
                { headerName: "مقدار", field: "infoValue" },
                { headerName: "واحد اندازه‌گیری", field: "scaleTitle" },
                { headerName: "مخفف", field: "abbreviation" },
                { headerName: "توضیحات", field: "descriptionRow" },
                { headerName: "فایل های پیوست", field: "attachment",cellRenderer:'gridFileAttachmentButton'},
            ],
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                  gridFileAttachmentButton: GridFileAttachmentButton,
                },
              },
            column: [
                // {
                //     title: 'نوع فیلد',
                //     dataIndex: 'fieldTypeTitle',
                //     key: 'name',
                // },
                {
                    title: 'نام',
                    dataIndex: 'title',
                    key: 'age',
                },
                {
                    title: 'مقدار',
                    dataIndex: 'propertyValue',
                    key: 'propertyValue',
                },
                {
                    title: 'واحد اندازه گیری',
                    dataIndex: 'scaleTitle',
                    key: 'scaleTitle',
                },
                {
                    title: 'مخفف',
                    dataIndex: 'abbreviation',
                    key: 'abbreviation',
                },
                {
                    title: 'استفاده از مخفف در کد',
                    dataIndex: 'isInCode',
                    key: 'isInCode',
                    render: isInCode => isInCode === true ? 'بله' : 'خیر'
                },
                {
                    title: 'اولویت',
                    dataIndex: 'orderSet',
                    key: 'orderSet',
                },
                {
                    title: 'توضیحات',
                    dataIndex: 'descriptionRow',
                    key: 'address',
                },
                {
                    title: 'فایل های پیوست',
                    dataIndex: 'attachedFile',
                    key: 'attachedFile',
                    render: (data, record, index) => <span style={{ cursor: 'pointer' }} onClick={() => this.toggleAttachmentModal(record)}><PaperClipOutlined style={{ position: 'relative', top: '-3px', marginLeft: '5px' }} size={40} /><span>{record.attachmentCount}</span></span>
                },
            ],
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //flags
            isTitleComboboxHidden: true,
            isDeleteButtonDisabled: true,
            isEditDisabled: true,
            isPropertyValueComboboxHidden: true,
            isUseAbbreviationInCodeSwitchChecked: false,
            isSeparatorHidden: true,
            isAttachmentModalVisible: false,
            //lists
            propertyScaleFullPathList: [],
            propertyFieldTypeTitleList: [],
            propertyTemplateList: [],
            //personExtraInfoList: [],
            //field
            id: null,
            scaleRef: '',
            fieldTypeRef: '',
            title: '',
            extraInfoTemplateRef: '',
            propertyValue: '',
            templateDetailRef: '',
            abbreviation: '',
            isInCode: false,
            separator: '',
            orderSet: '',
            descriptionRow: '',
            propertyValueInputType: "text",
            isUseAbbreviationInCodeDisabled: true,
            isAbbreviationDisabled: false,
            //
            templateList: [],
            templateDetailList: [],
            propertyAttachedFileList:[],
            //modal
            attachmentModalContent: <div></div>,
            isAttachFileModalDestroy:false,
            scaleDrawerContent: <div></div>,
            isScaleDrawerVisible: false,
            //#region [- formValidation -]
            errors: {},

            isFieldTypeInvalid: false,
            isFieldTypeValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            isPropertyValueInvalid: false,
            isPropertyValueValid: false,

            isOrderSetInvalid: false,
            isOrderSetValid: false,
            //#endregion

        }
    }
    /* #endregion */


    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.getProperty();
        await this.getPropertyFormData();

    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.propertyList !== prevProps.propertyList) {
            this.setState({
                rowData: this.props.propertyList
            })
        }
        if (this.props.propertyScaleFullPathList !== prevProps.propertyScaleFullPathList) {
            this.setState({
                propertyScaleFullPathList: this.props.propertyScaleFullPathList
            })
        }
        if (this.props.propertyFieldTypeTitleList !== prevProps.propertyFieldTypeTitleList) {
            this.setState({
                propertyFieldTypeTitleList: this.props.propertyFieldTypeTitleList
            })
        }
        if (this.props.propertyTemplateList !== prevProps.propertyTemplateList) {
            this.setState({
                propertyTemplateList: this.props.propertyTemplateList
            })
        }
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
            } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
            } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
            } else if (this.props.message === "Successfully Set.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
            } else if (this.props.message === "پیدا نشد.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.scaleResetProps();
            } else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.scaleResetProps();
            }

        }
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = this.state.errors;
        if (this.state.fieldTypeRef === '') {
            this.setState({
                isFieldTypeInvalid: true,
                isFieldTypeValid: false,
            })
            errors["fieldTypeRef"] = 'نوع ویژگی اجباری است';
            if (this.state.isInCode === true) {

                switch (event.target.name) {


                    //#region [- title -]
                    case "title":
                        if (event.target.value === "") {
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

                    //#region [- propertyValue -]
                    case "propertyValue":
                        if (event.target.value === "") {
                            this.setState({
                                isPropertyValueInvalid: true,
                                isPropertyValueValid: false
                            });
                            errors["propertyValue"] = "مقدار اجباری است";
                        }
                        else {
                            this.setState({
                                isPropertyValueInvalid: false,
                                isPropertyValueValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- orderSet -]
                    case "orderSet":
                        if (event.target.value === "") {
                            this.setState({
                                isOrderSetInvalid: true,
                                isOrderSetValid: false
                            });
                            errors["orderSet"] = "اولویت اجباری است";
                        }
                        else {
                            this.setState({
                                isOrderSetInvalid: false,
                                isOrderSetValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- abbreviation -]
                    case "abbreviation":
                        if (event.target.value === "") {
                            this.setState({
                                isUseAbbreviationInCodeDisabled: true,
                            });
                        }
                        else {
                            this.setState({
                                isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                            });
                        }
                        break;
                    //#endregion


                    default:
                        errors = {};
                        break;
                }

            }
            else {
                switch (event.target.name) {

                    //#region [- title -]
                    case "title":
                        if (event.target.value === "") {
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

                    //#region [- propertyValue -]
                    case "propertyValue":
                        if (event.target.value === "") {
                            this.setState({
                                isPropertyValueInvalid: true,
                                isPropertyValueValid: false
                            });
                            errors["propertyValue"] = "مقدار اجباری است";
                        }
                        else {
                            this.setState({
                                isPropertyValueInvalid: false,
                                isPropertyValueValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- abbreviation -]
                    case "abbreviation":
                        if (event.target.value === "") {
                            this.setState({
                                isUseAbbreviationInCodeDisabled: true,
                            });
                        }
                        else {
                            this.setState({
                                isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                            });
                        }
                        break;
                    //#endregion


                    default:
                        errors = {};
                        break;
                }
            }
        }
        else {
            if (this.state.isInCode === true) {

                switch (event.target.name) {


                    //#region [- title -]
                    case "title":
                        if (event.target.value === "") {
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

                    //#region [- propertyValue -]
                    case "propertyValue":
                        if (event.target.value === "") {
                            this.setState({
                                isPropertyValueInvalid: true,
                                isPropertyValueValid: false
                            });
                            errors["propertyValue"] = "مقدار اجباری است";
                        }
                        else {
                            this.setState({
                                isPropertyValueInvalid: false,
                                isPropertyValueValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- orderSet -]
                    case "orderSet":
                        if (event.target.value === "") {
                            this.setState({
                                isOrderSetInvalid: true,
                                isOrderSetValid: false
                            });
                            errors["orderSet"] = "اولویت اجباری است";
                        }
                        else {
                            this.setState({
                                isOrderSetInvalid: false,
                                isOrderSetValid: true
                            });
                        }
                        break;
                    //#endregion

                                        //#region [- abbreviation -]
                                        case "abbreviation":
                                            if (event.target.value === "") {
                                                this.setState({
                                                    isUseAbbreviationInCodeDisabled: true,
                                                });
                                            }
                                            else {
                                                this.setState({
                                                    isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                                                });
                                            }
                                            break;
                                        //#endregion
                    default:
                        errors = {};
                        break;
                }

            }
            else {
                switch (event.target.name) {

                    //#region [- title -]
                    case "title":
                        if (event.target.value === "") {
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

                    //#region [- propertyValue -]
                    case "propertyValue":
                        if (event.target.value === "") {
                            this.setState({
                                isPropertyValueInvalid: true,
                                isPropertyValueValid: false
                            });
                            errors["propertyValue"] = "مقدار اجباری است";
                        }
                        else {
                            this.setState({
                                isPropertyValueInvalid: false,
                                isPropertyValueValid: true
                            });
                        }
                        break;
                    //#endregion

                                        //#region [- abbreviation -]
                                        case "abbreviation":
                                            if (event.target.value === "") {
                                                this.setState({
                                                    isUseAbbreviationInCodeDisabled: true,
                                                });
                                            }
                                            else {
                                                this.setState({
                                                    isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                                                });
                                            }
                                            break;
                                        //#endregion
                    default:
                        errors = {};
                        break;
                }
            }

            this.setState({
                errors: errors
            });
        }
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;
        if (this.state.fieldTypeRef === '') {
            this.setState({

                isFieldTypeInvalid: true,
                isFieldTypeValid: false,
            })
            errors["fieldTypeRef"] = 'نوع ویژگی اجباری است';
            if (this.state.isInCode === true) {


                //#region [- title -]      
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

                //#endregion

                //#region [- propertyValue -]
                if (this.state.propertyValue === "") {
                    this.setState({
                        isPropertyValueInvalid: true,
                        isPropertyValueValid: false
                    });
                    errors["propertyValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isPropertyValueInvalid: false,
                        isPropertyValueValid: true
                    });
                }
                //#endregion

                //#region [- abbreviation -]
                if (this.state.abbreviation === "") {
                    this.setState({
                        isUseAbbreviationInCodeDisabled: true,
                    });
                }
                else {
                    this.setState({
                        isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                    });
                }
                //#endregion

                //#region [- orderSet -]
                if (this.state.orderSet === "") {
                    this.setState({
                        isOrderSetInvalid: true,
                        isOrderSetValid: false
                    });
                    errors["orderSet"] = "اولویت اجباری است";
                }
                else {
                    this.setState({
                        isOrderSetInvalid: false,
                        isOrderSetValid: true
                    });
                }
                //#endregion

            }
            else {

                //#region [- title -]      
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

                //#endregion

                //#region [- propertyValue -]
                if (this.state.propertyValue === "") {
                    this.setState({
                        isPropertyValueInvalid: true,
                        isPropertyValueValid: false
                    });
                    errors["propertyValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isPropertyValueInvalid: false,
                        isPropertyValueValid: true
                    });
                }
                //#endregion

                //#region [- abbreviation -]
                if (this.state.abbreviation === "") {
                    this.setState({
                        isUseAbbreviationInCodeDisabled: true,
                    });
                }
                else {
                    this.setState({
                        isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                    });
                }
                //#endregion
            }

        }
        else {
            if (this.state.isInCode === true) {

                //#region [- title -]      
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

                //#endregion

                //#region [- propertyValue -]
                if (this.state.propertyValue === "") {
                    this.setState({
                        isPropertyValueInvalid: true,
                        isPropertyValueValid: false
                    });
                    errors["propertyValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isPropertyValueInvalid: false,
                        isPropertyValueValid: true
                    });
                }
                //#endregion

                                //#region [- abbreviation -]
                                if (this.state.abbreviation === "") {
                                    this.setState({
                                        isUseAbbreviationInCodeDisabled: true,
                                    });
                                }
                                else {
                                    this.setState({
                                        isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                                    });
                                }
                                //#endregion

                //#region [- orderSet -]
                if (this.state.orderSet === "") {
                    this.setState({
                        isOrderSetInvalid: true,
                        isOrderSetValid: false
                    });
                    errors["orderSet"] = "اولویت اجباری است";
                }
                else {
                    this.setState({
                        isOrderSetInvalid: false,
                        isOrderSetValid: true
                    });
                }
                //#endregion

            }
            else {

                //#region [- title -]      
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

                //#endregion

                //#region [- propertyValue -]
                if (this.state.propertyValue === "") {
                    this.setState({
                        isPropertyValueInvalid: true,
                        isPropertyValueValid: false
                    });
                    errors["propertyValue"] = "مقدار اجباری است";
                }
                else {
                    this.setState({
                        isPropertyValueInvalid: false,
                        isPropertyValueValid: true
                    });
                }
                //#endregion

                                //#region [- abbreviation -]
                                if (this.state.abbreviation === "") {
                                    this.setState({
                                        isUseAbbreviationInCodeDisabled: true,
                                    });
                                }
                                else {
                                    this.setState({
                                        isUseAbbreviationInCodeDisabled: this.props.checkRefFlagMaterial === true ? true : false
                                    });
                                }
                                //#endregion
            }
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


    /* #region  [- getProperty() -] */
    getProperty = async () => {
        let propertyGetData = {
            materialId: this.props.insertedMaterialId
        }
        await this.props.getProperty(propertyGetData);
    }
    /* #endregion */

    /* #region  [- getPropertyFormData() -] */
    getPropertyFormData = async () => {
        let propertyFormGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getPropertyFormData(propertyFormGetData);
    }
    /* #endregion */

    /* #region  [- getScaleFullPath() -] */
    getScaleFullPath = async () => {
        let scaleFullPathGetData = {
            domainRef: this.props.domain
        }
        await this.props.getScaleFullPath(scaleFullPathGetData);
    }
    /* #endregion */
    
    /* #region  [- getPropertyTemplate() -] */
    getPropertyTemplate = async () => {
        let propertyTemplateGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getPropertyTemplate(propertyTemplateGetData);
    }
    /* #endregion */

    /* #region  [- postProperty() -] */
    postProperty = async () => {
        let propertyPostData = {
            propertyList: [
                {
                    materialRef: this.props.insertedMaterialId,
                    scaleRef:this.state.scaleRef===''?null: parseInt(this.state.scaleRef),
                    fieldTypeRef: parseInt(this.state.fieldTypeRef),
                    title: this.state.title,
                    //extraInfoTemplateRef: this.state.extraInfoTemplateRef === '' ? null : this.state.extraInfoTemplateRef,
                    abbreviation: this.state.abbreviation,
                    isInCode: this.state.isInCode,
                    separator: this.state.separator,
                    orderSet: parseInt(this.state.orderSet),
                    propertyValue: this.state.propertyValue,
                    //templateDetailRef: this.state.templateDetailRef === '' ? null : this.state.templateDetailRef,
                    descriptionRow: this.state.descriptionRow,
                }
            ],
            propertyAttachedFileList:this.state.propertyAttachedFileList
        }
        await this.props.postProperty(propertyPostData);
    }
    /* #endregion */

    /* #region  [- deleteProperty() -] */
    deleteProperty = async () => {
        let propertyDeleteData = {
            propertyIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteProperty(propertyDeleteData);
    }
    /* #endregion */




    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectionChanged() -] */
    onSelectionChanged =async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: '',
                title: '',
                isDeleteButtonDisabled: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

                this.setState({
                    id: pickedValue.id,
                    isDeleteButtonDisabled: false,
                })

        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- deselectGridRow() -] */
    deselectGridRow = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteButtonDisable: true,
            isModalDeleteButtonDisable: true,
        })
    }
    /* #endregion */



    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {

        if (event.target.name === 'title' && event.target.type === 'select-one') {
            let detailList = this.state.propertyTemplateList.filter(item => { return item.templateTitle === event.target.value })
            let selected = this.state.propertyTemplateList.filter(item => { return item.templateTitle === event.target.value })
            this.setState({
                templateDetailList: detailList,
                [event.target.name]: event.target.value,
                extraInfoTemplateRef: selected[0].templateId

            })
        }
        else if (event.target.name === 'propertyValue' && event.target.type === 'select-one') {
            let selected = this.state.templateDetailList.filter(item => { return item.detailTitle === event.target.value })
            this.setState({
                [event.target.name]: event.target.value,
                templateDetailRef: selected[0].detailId

            })
        }
        else if(event.target.name ==='abbreviation' && this.state.isInCode === true){

            this.setState({
                [event.target.name] : event.target.value,
                code:event.target.value
            })

        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- handleChangeFieldType(event) -] */
    handleChangeFieldType = (event) => {
        if (event.target.value === '1') {
            this.setState({
                isTitleComboboxHidden: true,
                isPropertyValueComboboxHidden: true,
                fieldTypeRef: event.target.value,
                propertyValueInputType: "number",
                title: '',
                propertyValue: '',
                extraInfoTemplateRef: '',
                templateDetailRef: '',
                isFieldTypeInvalid: false,
                isFieldTypeValid: true,
                isPropertyValueInvalid: false,
                isPropertyValueValid: false,
            })
        }
        else if (event.target.value === '2') {
            this.setState({
                isTitleComboboxHidden: true,
                isPropertyValueComboboxHidden: true,
                fieldTypeRef: event.target.value,
                propertyValueInputType: "text",
                title: '',
                propertyValue: '',
                extraInfoTemplateRef: '',
                templateDetailRef: '',
                isFieldTypeInvalid: false,
                isFieldTypeValid: true,
                isPropertyValueInvalid: false,
                isPropertyValueValid: false,
            })
        }
        else if (event.target.value === "8") {
            this.setState({
                isTitleComboboxHidden: false,
                isPropertyValueComboboxHidden: false,
                fieldTypeRef: event.target.value,
                propertyValueInputType: "text",
                title: '',
                propertyValue: '',
                extraInfoTemplateRef: '',
                templateDetailRef: '',
                isFieldTypeInvalid: false,
                isFieldTypeValid: true,
                isPropertyValueInvalid: false,
                isPropertyValueValid: false,
            })
            this.getPropertyTemplate();
        }
        else {
            this.setState({
                isFieldTypeInvalid: true,
                isFieldTypeValid: false,
                title: '',
                propertyValue: '',
                propertyValueInputType: "text",
                templateDetailRef: '',
                extraInfoTemplateRef: '',
                //
                templateDetailList: [],
                //flags
                isTitleComboboxHidden: true,
                isDeleteButtonDisabled: true,
                isEditDisabled: true,
                isPropertyValueComboboxHidden: true,
                isPropertyValueInvalid: false,
                isPropertyValueValid: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- useAbbreviationInCodeSwitchHandleChange(event) -] */
    useAbbreviationInCodeSwitchHandleChange = (event) => {
        if (event.target.checked === true) {
            this.setState({
                isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                isInCode: true,
                isSeparatorHidden: false,
                separator: '',
                orderSet: '',
                code:this.state.abbreviation
            })
        }
        else {
            this.setState({
                isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                isInCode: false,
                isSeparatorHidden: true,
                separator: '',
                orderSet: '',
                code:''
            })
        }

    }
    /* #endregion */


    /* #region  [- toggleAttachmentModal(record) -] */
    toggleAttachmentModal = async (record) => {
        //console.log('call', record);
        if (this.state.isAttachmentModalVisible === true) {
            this.refresh();

            this.setState({
                isAttachmentModalVisible: false,
                isAttachFileModalDestroy:true,
                attachmentModalContent: <div></div>,
            })
        }
        else if (this.state.isAttachmentModalVisible === false) {
            this.setState({
                isAttachmentModalVisible: true,
                isAttachFileModalDestroy: false,
                attachmentModalContent: <PropertyAttachFile propertyAttachedFileList={this.state.propertyAttachedFileList} 
                                                            propertyId={record.id} 
                                                            submitAttachedFile={this.submitAttachedFile}
                                                            onCancelAttachFileModal={this.onCancelAttachFileModal}
                                                             />
            })
        }
    }
    /* #endregion */


    /* #region  [- refresh() -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getProperty();
        this.setState({
            id: null,
            scaleRef: '',
            fieldTypeRef: '',
            title: '',
            propertyValue: '',
            abbreviation: '',
            isInCode: false,
            separator: '',
            orderSet: '',
            descriptionRow: '',
            propertyValueInputType: "text",
            templateDetailRef: '',
            extraInfoTemplateRef: '',
            isAbbreviationDisabled: false,
            isUseAbbreviationInCodeDisabled: true,
            //
            templateDetailList: [],
            //flags
            isTitleComboboxHidden: true,
            isDeleteButtonDisabled: true,
            isEditDisabled: true,
            isPropertyValueComboboxHidden: true,
            isUseAbbreviationInCodeSwitchChecked: false,
            isSeparatorHidden: true,
            //#region [- formValidation -]
            errors: {},

            isFieldTypeInvalid: false,
            isFieldTypeValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            isPropertyValueInvalid: false,
            isPropertyValueValid: false,

            isSeparatorInvalid: false,
            isSeparatorValid: false,

            isOrderSetInvalid: false,
            isOrderSetValid: false,
            //#endregion
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postProperty();
            await this.getProperty();
            this.refresh();
        }

    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteProperty();
        await this.getProperty();
        this.refresh();
    }
    /* #endregion */

    /* #region  [- getPropertyItem() -] */
    getPropertyItem = async (id) => {
        let propertyItemGetData = {
            id: id
        }
        await this.props.getPropertyItem(propertyItemGetData);
    }
    /* #endregion */

    /* #region  [- onCloseScaleDrawer -] */
    onCloseScaleDrawer =async () => {
        this.setState({
            scaleDrawerContent: <div></div>,
            isScaleDrawerVisible: false,
        })
        await this.getPropertyFormData()
    }
    /* #endregion */

    /* #region  [- quickAccessScale -] */
    quickAccessScale = async () => {
        await this.getScaleFullPath();
        this.setState({
            scaleDrawerContent: <NewScale onClose={this.onCloseScaleDrawer} />,
            isScaleDrawerVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- submitAttachedFile -] */
    submitAttachedFile = (data) => {
        this.setState({
            propertyAttachedFileList: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachmentModalVisible: false,
        })
    }
    /* #endregion */

    /* #region  [ - onCancelAttachFileModal - ] */
    onCancelAttachFileModal = () => {
        this.setState({
            isAttachmentModalVisible: false,
            isAttachFileModalDestroy: true
        })

    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- antd -] */
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectionChanged,
            type: 'checkBox',
        };
        /* #endregion */

        /* #region  [- list -] */
        const propertyScaleFullPathList = this.state.propertyScaleFullPathList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        const propertyFieldTypeTitleList = this.state.propertyFieldTypeTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        const templateDistinctList = [];
        const tempMap = new Map();
        for (const item of this.state.propertyTemplateList) {
            if (!tempMap.has(item.templateId)) {
                tempMap.set(item.templateId, true);    // set any value to Map
                templateDistinctList.push({
                    templateId: item.templateId,
                    templateTitle: item.templateTitle
                });
            }
        }
        const templateList = templateDistinctList.map(item => (
            <option key={item.templateId} value={item.templateTitle} label={item.templateTitle}></option>
        ));

        const templateDetailList = this.state.templateDetailList.map(item => (
            <option key={item.detailId} value={item.detailTitle} label={item.detailTitle}></option>
        ))
        /* #endregion */

        /* #endregion */

        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>

                            <FormGroup title='fieldType' style={{ textAlign: 'right' }}>
                                <Label >نوع ویژگی<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="select"
                                    name="fieldTypeRef"
                                    id="fieldTypeRef"
                                    //placeholder="نوع ویژگی"
                                    value={this.state.fieldTypeRef}
                                    onChange={this.handleChangeFieldType}
                                    invalid={this.state.isFieldTypeInvalid}
                                    valid={this.state.isFieldTypeValid}
                                >
                                    <option value=''>
                                        -- انتخاب کنید --
                                            </option>
                                    {propertyFieldTypeTitleList}
                                </Input>
                                <FormFeedback>{this.state.errors.fieldTypeRef}</FormFeedback>
                            </FormGroup>

                            <FormGroup title='scale' style={{ textAlign: 'right' }}>
                                <Label >واحد اندازه گیری</Label>

                                <Row>

                                    <Col name="scale" sm='10' >
                                        <Input
                                            type="select"
                                            name="scaleRef"
                                            id="scaleRef"
                                            //placeholder="نوع فیلد"
                                            value={this.state.scaleRef}
                                            onChange={this.inputHandleChange}
                                        >
                                            <option value=''>  -- انتخاب کنید --  </option>
                                            {propertyScaleFullPathList}
                                        </Input>
                                    </Col>

                                    <Col name="quickAccessScale" sm='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessScale}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup title='title' style={{ textAlign: 'right' }} hidden={!this.state.isTitleComboboxHidden}>
                                <Label >عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="عنوان"
                                    onChange={this.inputHandleChange}
                                    invalid={this.state.isTitleInvalid}
                                    valid={this.state.isTitleValid}
                                />
                                <FormFeedback>{this.state.errors.title}</FormFeedback>

                            </FormGroup>

                            <FormGroup title='title' style={{ textAlign: 'right' }} hidden={this.state.isTitleComboboxHidden}>
                                <Label >عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Row>
                                    <Col sm='11'>
                                        <Input
                                            type="select"
                                            name="title"
                                            id="titleSelect"
                                            //placeholder="عنوان"
                                            value={this.state.title}
                                            onChange={this.inputHandleChange}
                                            invalid={this.state.isTitleInvalid}
                                            valid={this.state.isTitleValid}
                                        >
                                            <option value=''>
                                                -- انتخاب کنید --
                                            </option>
                                            {templateList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.title}</FormFeedback>
                                    </Col>
                                    <Col sm='1'>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessToTemplate}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='propertyValue' style={{ textAlign: 'right' }} hidden={!this.state.isPropertyValueComboboxHidden}>
                                <Label for="propertyValue">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type={this.state.propertyValueInputType}
                                    name="propertyValue"
                                    id="propertyValue"
                                    value={this.state.propertyValue}
                                    onChange={this.inputHandleChange}
                                    placeholder="مقدار"
                                    invalid={this.state.isPropertyValueInvalid}
                                    valid={this.state.isPropertyValueValid}
                                />
                                <FormFeedback>{this.state.errors.propertyValue}</FormFeedback>
                            </FormGroup>

                            <FormGroup title='propertyValue' style={{ textAlign: 'right' }} hidden={this.state.isPropertyValueComboboxHidden}>
                                <Label for="propertyValue">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="select"
                                    name="propertyValue"
                                    id="propertyValueSelect"
                                    value={this.state.propertyValue}
                                    onChange={this.inputHandleChange}
                                    invalid={this.state.isPropertyValueInvalid}
                                    valid={this.state.isPropertyValueValid}
                                >
                                    <option value=''>
                                        -- انتخاب کنید --
                                    </option>
                                    {templateDetailList}
                                </Input>
                                <FormFeedback>{this.state.errors.propertyValue}</FormFeedback>
                            </FormGroup>

                            <FormGroup title='abbreviation' style={{ textAlign: 'right' }}>
                                <Label for="abbreviation">مخفف</Label>
                                <Input
                                    type="text"
                                    name="abbreviation"
                                    id="abbreviation"
                                    value={this.state.abbreviation}
                                    placeholder="مخفف"
                                    onChange={this.inputHandleChange}
                                    disabled={this.state.isAbbreviationDisabled}

                                />
                            </FormGroup>

                            <FormGroup title="useAbbreviationInCode" style={{ textAlign: 'right' }}  >
                                <Row>
                                    <Label for="useAbbreviationInCode" style={{ marginRight: '15px' }}>استفاده از مخفف در کد</Label>
                                    <CustomInput type="switch"
                                        id="useAbbreviationInCode"
                                        //label="زیر مجموعه"
                                        value={this.state.isInCode}
                                        checked={this.state.isInCode}
                                        onChange={this.useAbbreviationInCodeSwitchHandleChange}
                                        disabled={this.state.isUseAbbreviationInCodeDisabled}
                                    />
                                </Row>
                            </FormGroup>

                            <FormGroup hidden={this.state.isSeparatorHidden} style={{ textAlign: 'right' }}>
                                <Row form style={{ direction: 'rtl' }}>
                                    <Col title='separator' md={6}>
                                        <FormGroup style={{ textAlign: 'right' }}>
                                            <Label for="separator">جداکننده</Label>
                                            <Input
                                                type="select"
                                                name="separator"
                                                id="separator"
                                                value={this.state.separator}
                                                onChange={this.inputHandleChange}
                                                disabled={this.state.isUseAbbreviationInCodeDisabled}
                                            >
                                                <option value="">---</option>
                                                <option value="/">/</option>
                                                <option value="*">*</option>
                                                <option value="-">-</option>
                                                <option value="\">\</option>
                                                <option value=".">.</option>
                                                <option value=",">,</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ textAlign: 'right' }}>
                                        <FormGroup title='code' style={{ textAlign: 'right' }}>
                                            <Label for="code">کد<span className="form-mandatory-field-star">*</span></Label>
                                            <Input
                                                type="text"
                                                name="code"
                                                id="code"
                                                value={this.state.code}
                                                //placeholder="عنوان"
                                                onChange={this.inputHandleChange}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={6} style={{ textAlign: 'right' }}>
                                        <FormGroup title='orderSet' style={{ textAlign: 'right' }}>
                                            <Label for="orderSet">اولویت<span className="form-mandatory-field-star">*</span></Label>
                                            <Input
                                                type="text"
                                                name="orderSet"
                                                id="orderSet"
                                                value={this.state.orderSet}
                                                //placeholder="عنوان"
                                                onChange={this.inputHandleChange}
                                                invalid={this.state.isOrderSetInvalid}
                                                valid={this.state.isOrderSetValid}
                                                disabled={this.state.isUseAbbreviationInCodeDisabled}
                                            />
                                            <FormFeedback>{this.state.errors.orderSet}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label >توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            
                            <FormGroup title='attachmentButton' style={{textAlign:'right'}}>
                                <Row>
                                    <Col sm='12'>
                                        <Button className='submit-button-style mr-2' onClick={this.toggleAttachmentModal}>
                                            پیوست
                                        </Button>
                                    </Col>
                                </Row>

                            </FormGroup>
                        
                        </Form>
                    </Col>
                </Row>

                <Row title='buttons'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisabled}>
                            حذف
                        </Button>
                    </Col>
                </Row>

                <Row title='grid'>
                    <Col  className="ag-theme-balham mt-2" style={{ height: '20vh', width: '100%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            onRowSelected={this.onSelectedRow}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}>
                        </AgGridReact>
                    </Col>
                    <Col hidden={true} className="ag-theme-balham mt-2" style={{ height: '20vh', width: '100%' }}>
                        <Table
                            rowKey={record => record}
                            rowSelection={rowSelection}
                            dataSource={this.state.rowData}
                            columns={this.state.column}
                            scroll={{ y: '20vh' }}
                            bordered
                            pagination={false}
                            size='small'

                        />
                    </Col>
                </Row>

                <Row title='modalsAndDrawers'>
                    {/* Attachment Modal */}
                    <Modal
                        visible={this.state.isAttachmentModalVisible}
                        //title="حذف"
                        bodyStyle={{ padding: '20px 10px 10px 10px' }}
                        closable={false}
                        
                        onCancel={this.onCancelAttachFileModal}
                        footer={null}
                        width={800}
                        destroyOnClose={this.state.isAttachFileModalDestroy}
                    >
                        {this.state.attachmentModalContent}
                    </Modal>

                    <Drawer name='scale'
                        placement={"left"}
                        width={800}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseScaleDrawer}
                        visible={this.state.isScaleDrawerVisible}
                    >
                        {this.state.scaleDrawerContent}
                    </Drawer>

                </Row>

            </Container>
        );
    }
    /* #endregion */

}

/* #region  [ - mapStateToProps - ] */

const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        propertyList: state.property.propertyList,
        checkRefFlagMaterial: state.property.checkRefFlagMaterial,
        propertyScaleFullPathList: state.property.propertyScaleFullPathList,
        propertyFieldTypeTitleList: state.property.propertyFieldTypeTitleList,
        propertyTemplateList: state.property.propertyTemplateList,
        propertyItem: state.property.propertyItem,
        materialItem: state.material.materialItem,
        message: state.scale.message,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    getProperty: (data) => dispatch(getProperty(data)),
    getPropertyFormData: (data) => dispatch(getPropertyFormData(data)),
    getPropertyTemplate: (data) => dispatch(getPropertyTemplate(data)),
    postProperty: (data) => dispatch(postProperty(data)),
    deleteProperty: (data) => dispatch(deleteProperty(data)),
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPropertyItem: (data) => dispatch(getPropertyItem(data)),
    putProperty: (data) => dispatch(putProperty(data)),
    getScaleFullPath: (data) => dispatch(getScaleFullPath(data)),
    scaleResetProps: () => dispatch(scaleResetProps()),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Property);