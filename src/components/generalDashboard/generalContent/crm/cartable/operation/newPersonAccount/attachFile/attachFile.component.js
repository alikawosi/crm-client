/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Table } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getPersonCRMFile, postPersonCRMFile, deletePersonCRMFile } from '../../../../../../../../redux/infrastructure/crmFile/crmFile.action';
import AttachFileGridButton from './attachFileGridButton.component';
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class AttachFile extends PureComponent {
    
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            //grid
            columnDefs: [
                {
                    headerName: "ردیف",
                    //headerCheckboxSelection: true,
                    checkboxSelection: true,
                    valueGetter: "node.rowIndex+1",
                    cellClass: "locked-col",
                    //pinned: "right",
                    //width: 70
                },
                { headerName: "Id", field: "id", hide: true },
                { headerName: "نام", field: "title" },
                { headerName: "توضیحات", field: "descriptionRow" },
                { headerName: "فایل", field: "attachedFile", cellRenderer: "childMessageRenderer" }
            ],
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    childMessageRenderer: AttachFileGridButton
                },
                rowHeight: 33
            },
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //flags
            isDeleteButtonDisable: true,
            //fields
            id: 0,
            personRef: null,
            title: '',
            fileTitle: '',
            fileType: '',
            attachedFile: [],
            attachedFileShowValue: '',
            descriptionRow: '',
            //antd
            columns: [
                {
                    title: 'نام',
                    dataIndex: 'title',
                    key: 'age',
                },
                {
                    title: 'توضیحات',
                    dataIndex: 'descriptionRow',
                    key: 'address',
                },
                {
                    title: 'فایل',
                    dataIndex: 'attachedFile',
                    key: 'address',
                    render: (data, record, index) => <Button color='info' size='sm' onClick={() => this.download(record)}>دانلود</Button>
                },
            ]
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getPersonCRMFile();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        //Typical usage of "componentDidUpdate" ==> don't forget to compare props

        if (this.props.personCRMFileList !== prevProps.personCRMFileList) {
            this.setState({
                rowData: this.props.personCRMFileList
            })
        }
    }
    /* #endregion */


    /* #region  [- getPersonCRMFile() -] */
    getPersonCRMFile = async () => {
        let personCRMFileGetData = {
            id: this.props.personId
        }
        await this.props.getPersonCRMFile(personCRMFileGetData);
    }
    /* #endregion */

    /* #region  [- postPersonCRMFile() -] */
    postPersonCRMFile = async () => {
        let personCRMFilePostData = {
            personCRMFilePostList: [
                {
                    personRef: this.props.personId,
                    title: this.state.title,
                    fileTitle: this.state.fileTitle,
                    fileType: this.state.fileType,
                    attachedFile: this.state.attachedFile,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        ////console.log('postdata',personCRMFilePostData);
        await this.props.postPersonCRMFile(personCRMFilePostData);
    }
    /* #endregion */

    /* #region  [- deletePersonCRMFile() -] */
    deletePersonCRMFile = async () => {
        let personCRMFileDeleteData = {
            personCRMFileIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deletePersonCRMFile(personCRMFileDeleteData);
    }
    /* #endregion */


    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectedRow() -] */
    onSelectedRow = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisable: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];
            this.setState({
                id: pickedValue.id,
                isDeleteButtonDisable: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChanged(selectedRowKeys) -] */
    onSelectionChanged = (selectedRowKeys) => {
        ////console.log('selectedRowKeys changed: ', selectedRowKeys);
        let selectedId = selectedRowKeys[0];
        this.setState({
            id: selectedId,
            isDeleteButtonDisable: false,
        })
        this.setState({ selectedRowKeys });
    }
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        if (event.target.type !== 'file') {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        else if (event.target.type === 'file') {
            this.setState({
                attachedFileShowValue: event.target.value
            })
            this.getFileInformation(event.target.value);

            const file = event.target.files[0];

            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = event => {
                    resolve(event.target.result);
                    this.setState({ attachedFile: event.target.result.split(",")[1] });
                };

                reader.onerror = err => {
                    reject(err);
                };

                reader.readAsDataURL(file);
            });
        }
    }
    /* #endregion */

    /* #region  [- getFileInformation -] */
    getFileInformation = (data) => {
        //var fileTitle=data.split(".")[0]
        let fileTitle = data.split(".")[0].slice(12);
        let fileType = data.split(".")[1];
        //console.log('file', fileTitle, fileType);
        this.setState({
            fileTitle: fileTitle,
            fileType: fileType
        });
    }
    /* #endregion */

    /* #region  [- convertBase64toBlob ] */
    convertBase64toBlob = (b64Data, fileName, type) => {
        var sliceSize = 512
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays);
        const blobUrl = URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.setAttribute('download', `${fileName}.${type}`);
        tempLink.click();

    }
    /* #endregion */


    /* #region  [- refresh() -] */
    refresh = () => {
        this.setState({
            id: 0,
            personRef: null,
            title: '',
            fileTitle: '',
            fileType: '',
            attachedFile: [],
            attachedFileShowValue: '',
            descriptionRow: '',
            //flags
            isDeleteButtonDisable: true,
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.postPersonCRMFile();
        await this.getPersonCRMFile();
        this.refresh();
    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deletePersonCRMFile();
        await this.getPersonCRMFile();
        this.refresh();
    }
    /* #endregion */

    /* #region  [- download() -] */
    download = (data) => {
        this.convertBase64toBlob(data.attachedFile, data.fileTitle, data.fileType);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        // const columns = [
        //     {
        //         title: 'نام',
        //         dataIndex: 'title',
        //         key: 'age',
        //     },
        //     {
        //         title: 'توضیحات',
        //         dataIndex: 'descriptionRow',
        //         key: 'address',
        //     },
        //     {
        //         title: 'فایل',
        //         dataIndex: 'attachedFile',
        //         key: 'address',
        //         render: (data,record,index) => <Button color='info' size='sm' onClick={this.convertBase64toBlob(record.attachedFile, record.fileTitle, record.fileType)}>دانلود</Button>
        //     },
        // ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectionChanged,
            type: 'radio'
        };

        return (
            <Container>
                <Row title='form'>
                    <Col sm='6'>
                        <Form>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">نام</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="نام"
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
                            <FormGroup title='attachedFile' style={{ direction: 'ltr' }}>
                                {/* <Label for="attachedFile">هیچ فایلی انتخاب نشده</Label> */}
                                <Input
                                    type="file"
                                    name="attachedFile"
                                    id="attachedFile"
                                    value={this.state.attachedFileShowValue}
                                    //placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row title='buttons'>
                    <Col sm='6' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisable}>
                            حذف
                        </Button>
                    </Col>
                </Row>
                <Row title='grid'>
                    <Col hidden={true} className="ag-theme-balham mt-2" style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            onRowSelected={this.onSelectedRow}
                            enableRtl={true}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}>
                        </AgGridReact>
                    </Col>
                    <Col hidden={false} className="ag-theme-balham mt-2" style={{ height: '40vh', width: '100%' }}>
                        <Table rowKey="id" rowSelection={rowSelection} dataSource={this.state.rowData} columns={this.state.columns} scroll={{ y: '40vh' }} bordered pagination={false} size='small' />
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
        personCRMFileList: state.crmFile.personCRMFileList,
        message: state.crmFile.message,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getPersonCRMFile: (data) => dispatch(getPersonCRMFile(data)),
    postPersonCRMFile: (data) => dispatch(postPersonCRMFile(data)),
    deletePersonCRMFile: (data) => dispatch(deletePersonCRMFile(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AttachFile);