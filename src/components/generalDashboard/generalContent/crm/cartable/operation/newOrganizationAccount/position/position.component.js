/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CustomInput, Container, Row, Col, Form, Button, FormGroup, Input, Label } from "reactstrap";
import {Table } from "antd";
import { AgGridReact } from "ag-grid-react";
import Notification from "../../../../../../../shared/common/notification/notification.component";
import { getPosition, getPositionFormData, postPosition, getPositionItem, putPosition, deletePosition, resetProps } from '../../../../../../../../redux/infrastructure/position/position.action'
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class Position extends PureComponent {

  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
      domainRef:this.props.domain,
      /* #region  [- Ag-gridDefiinitionStates -] */
      columnDefs: [
        {
          headerName: "ردیف",
          //headerCheckboxSelection: true,
          checkboxSelection: true,
          valueGetter: "node.rowIndex+1",
          cellClass: "locked-col",
          //pinned: "right",
          width: 100,
        },
        { headerName: "Id", field: "id", hide: true },
        { headerName: "نام", field: "title" },
        { headerName: "مخفف", field: "abbreviation" },
        { headerName: "واحد ", field: "category" },
        { headerName: "توضیحات ", field: "descriptionRow" },

      ],
      rowData: [],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
      overlayNoRowsTemplate:
        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',

      /* #endregion */

      /* #region  [- Field -] */

      id: 0,
      organizationRef: this.props.organizationId,
      parentId: '',
      categoryRef: '',
      title: '',
      abbreviation: '',
      isChartFlagEnable:false,
      descriptionRow: '',
      selectedRowKeys: [],

      /* #endregion */

      //Flags
      isParentIdSelectHidden: true,
      isParentSwitchSelected: false,
      isAddButtonDisable: true,
      isEditButtonDisable: true,
      isDeleteButtonDisable: true,
      isDeleteModalVisible:false,
      isModalDeleteButtonDisable:true,
      isParentIdSwitchDisable:false,
      isItemSelected:false,
      deleteModalInputValue:'',
      //list
      filteredFullPathList:[]
    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {

    await this.getPosition();
    await this.getPositionFormData();

  }

  /* #endregion */

  /* #region  [- componentDidUpdate(prevProps) -] */
  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      if (this.props.message === "ذخیره با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "حذف با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "Successfully Set.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "پیدا نشد.") {
        Notification("bottomLeft", this.props.message, "error");
        this.props.resetProps();
      } else if (this.props.message === "خطایی رخ داده است.") {
        Notification("bottomLeft", this.props.message, "error");
        this.props.resetProps();
      }
    }
    this.setState({
      rowData: this.props.positionList
    })
    if (this.props.positionList.length===0 || (this.state.id!==0 && this.props.positionFullPathByIdList.length===0)) {
      this.setState({
        isParentIdSwitchDisable:true,

      })
      
    }
    else{
      this.setState({
        isParentIdSwitchDisable:false,

      })
    }

  }
  /* #endregion */


  /* #region  [- getPosition() -] */
  getPosition = async () => {
    let positionGetData = {
      organizationRef: this.state.organizationRef
    }
    await this.props.getPosition(positionGetData);
  }
  /* #endregion */

  /* #region  [- getPositionFormData() -] */
  getPositionFormData = async () => {
    let positionFormGetData = {
      domainRef: parseInt(this.state.domainRef),
      organizationRef: this.state.organizationRef
    }
    await this.props.getPositionFormData(positionFormGetData);
  }
  /* #endregion */

  /* #region  [- getPositionItem() -] */
  getPositionItem = async (id) => {
    let positionItemGetData = {
      positionId: id,
      organizationRef:this.state.organizationRef,
    }
    await this.props.getPositionItem(positionItemGetData);
    const positionItem = Object.assign({}, this.props.positionItem[0]);
    this.setState({
      id: positionItem.id,
      organizationRef: positionItem.organizationRef,
      parentId: positionItem.parentId,
      categoryRef: positionItem.categoryRef,
      title: positionItem.title,
      abbreviation: positionItem.abbreviation,
      isChartFlagEnable :positionItem.chartFlag,
      descriptionRow: positionItem.descriptionRow,
      isItemSelected:true
    })
    if (positionItem.parentId!==null && positionItem.parentId!== undefined && positionItem.parentId!== '') {
        this.setState({
            isParentSwitchSelected:true,
            isParentIdSelectHidden:false
        })
        
    }
    else{
        this.setState({
            isParentSwitchSelected:false,
            isParentIdSelectHidden:true
        })
    }

  }
  /* #endregion */

  /* #region  [- postPosition() -] */
  postPosition = async () => {

    let positionPostData = {
      organizationRef: this.state.organizationRef,
      positionList: [
        {
          parentId: parseInt(this.state.parentId),
          categoryRef: parseInt(this.state.categoryRef),
          title: this.state.title,
          abbreviation: this.state.abbreviation,
          chartFlag:this.state.isChartFlagEnable,
          descriptionRow: this.state.descriptionRow

        }
      ]
    }
    await this.props.postPosition(positionPostData);
  }
  /* #endregion */

  /* #region  [- putPosition() -] */
  putPosition = async () => {

    let positionPutData = {
      positionPutList: [
        {
          id: this.state.id,
          parentId: parseInt(this.state.parentId),
          categoryRef: parseInt(this.state.categoryRef),
          organizationRef: this.state.organizationRef,
          title: this.state.title,
          abbreviation: this.state.abbreviation,
          chartFlag:this.state.isChartFlagEnable,
          descriptionRow: this.state.descriptionRow
        }
      ]
    }

    await this.props.putPosition(positionPutData);
  }
  /* #endregion */

  /* #region  [- deletePosition() -] */

  deletePosition = async () => {

    let positionDeleteData = {
      PositionIdList: [
        {
          id: this.state.id,
        }
      ]
    }
    await this.props.deletePosition(positionDeleteData);
  }

  /* #endregion */



  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
;
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
        isEditButtonDisable: true,
      });
    }
    if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];
      this.setState({
        id: pickedValue.id
      })
      if (pickedValue.checkRefFlag === true) {
        this.setState({
          isDeleteButtonDisable: true,
          isEditButtonDisable: false,
        })
      }
      else {
        this.setState({
          isDeleteButtonDisable: false,
          isEditButtonDisable: false,
        })
      }



    }
  }
  /* #endregion */

  /* #region  [- onSelectionChanged(selectedRowKeys) -] */
  onSelectionChanged = (selectedRowKeys) => {
    let selectedId = selectedRowKeys[0];
    let selectedObject = this.props.positionList.filter(item => item.id === selectedId);

    this.setState({
      id: selectedObject[0].id,
      title: selectedObject[0].title,
      isAddButtonDisable:true,

    })
    let id = selectedObject[0].id
    this.getPositionItem(id);

    if (selectedObject[0].checkRefFlag === true) {
      this.setState({
        isDeleteButtonDisable: true,
        isEditButtonDisable: false,
        isAddButtonDisable: true,
      })
    }
    else {
      this.setState({
        isDeleteButtonDisable: false,
        isEditButtonDisable: false,
        isAddButtonDisable: true
      })
    }
    this.setState({ selectedRowKeys });
  }
  /* #endregion */

  /* #region  [- deselectAllRows() -] */
  deselectAllRows = async () => {
    await this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- deselectGridRow() -] */
  deselectGridRow = () => {
    this.setState({
      id: 0,
      deleteModalInputValue: '',
      selectedRowKeys: [],
      isItemSelected:false
    })
    
  }
  /* #endregion */

  /* #region  [- handleSearch -] */

  handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
      clearFilters: clearFilters
    });
  };

  /* #endregion */

  /* #region  [- handleReset -] */

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({
      searchText: "",
    });
  };

  /* #endregion */

  /* #region  [- inputHandleChange(event) -] */
  inputHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    switch (event.target.name) {
      case 'title':
        if (event.target.value !== null && event.target.value !== '' && this.state.isItemSelected===false) {
          this.setState({
            isAddButtonDisable: false,
          })
        }
        else {
          this.setState({
            isAddButtonDisable: true,
          })
        }
        break;
    case 'chartFlag':
        if (this.state.isChartFlagEnable===false ) {
            this.setState({
            isChartFlagEnable: true,
            })
        }
        else {
            this.setState({
            isChartFlagEnable: false,
            })
        }
        break;

      default:
        if (event.target.value !== null && event.target.value !== '' 
        && this.state.isItemSelected===false && this.state.title!=='') {
          this.setState({
            isAddButtonDisable: false,
          })

        }
        else {
          this.setState({
            isAddButtonDisable: true,
          })
        }
        break;
    }
  };
  /* #endregion */
  
  /* #region  [- handleChangeDeleteModalInput(event) -] */
  // handleChangeDeleteModalInput = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  //   if (event.target.value === this.state.title) {
  //     this.setState({
  //       isModalDeleteButtonDisable: false
  //     });
  //   } else {
  //     this.setState({
  //       isModalDeleteButtonDisable: true
  //     });
  //   }
  // }
  /* #endregion */

  /* #region  [- toggleDeleteModal() -] */
  // toggleDeleteModal = async () => {

  //   if (this.state.isDeleteModalVisible === true) {
  //     this.deselectGridRow();
  //     await this.getPosition();
  //     this.setState({
  //       isDeleteModalVisible: false,
  //       id: 0,
  //       title: '',
  //       deleteModalInputValue: '',
  //     })
  //   }
  //   else if (this.state.isDeleteModalVisible === false) {
  //     this.setState({
  //       isDeleteModalVisible: true
  //     })
  //   }

  // }
  /* #endregion */


  /* #region  [- showParentIdSelect -] */
  showParentIdSelect = () => {

    if (this.state.isParentIdSelectHidden === true) {
      this.setState({
        isParentIdSelectHidden: false,
        isParentSwitchSelected: true
      })
    }
    else {
      this.setState({
        isParentIdSelectHidden: true,
        isParentSwitchSelected: false
      })

    }
  }

  /* #endregion */

  /* #region  [- new -] */
  new = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.postPosition();
    await this.getPosition();
    await this.getPositionFormData();
    this.reset();
  }

  /* #endregion */

  /* #region  [- edit -] */
  edit = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.putPosition();
    await this.getPosition();
    await this.getPositionFormData();
    this.reset();
  }

  /* #endregion */

  /* #region  [- delete -] */

  delete = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deletePosition();
    await this.getPosition();
    await this.getPositionFormData();
    this.reset();

  }
  /* #endregion */
  
  /* #region  [- reset -] */

  reset = () => {
    this.setState({
      isAddButtonDisable: true,
      isEditButtonDisable: true,
      isDeleteButtonDisable: true,
      parentId: '',
      categoryRef: '',
      title: '',
      abbreviation: '',
      isChartFlagEnable:false,
      descriptionRow: '',
      isParentIdSelectHidden: true,
      isParentSwitchSelected: false,
      isDeleteModalVisible:false,
      isModalDeleteButtonDisable:true
    })
    this.deselectGridRow();
  }
  /* #endregion */

  

  /* #region  [- render() -] */

  render() {


    /* #region  [- Const -] */

    /* #region  [- grid -] */
    const columns = [

      {
        title: "نام",
        dataIndex: "title",
        key: "title",
        width: 150,
      },
      {
        title: "مخفف",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 150,
      },
      {
        title: "نام واحد سازمانی",
        dataIndex: "categoryTitle",
        key: "categoryTitle",
        width: 100,
      },
      {
        title: "توضیحات  ",
        dataIndex: "descriptionRow",
        key: "descriptionRow",
        width: 150,
      },

    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectionChanged,
      type: "radio",
    };

    /* #endregion */

    /* #region  [- combobox -] */

    const category = this.props.positionCategoryTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    ));

    const positionFullPath = (this.state.id!==0)?this.props.positionFullPathByIdList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    )):
    this.props.positionFullPathList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    ));



    /* #endregion */

    /* #endregion */


    return (
      <Container fluid>

        <Row title='positionForm'>
          <Col sm="12">
            <Form>

              <Row title="switchesAndParentIdSelect">
                <Col sm="12" >

                  <FormGroup style={{ textAlign: "right" }}>
                    
                      <Row title='chartSwitch'>
                      <Label for='chartSwitch'>قسمتی از چارت سازمانی</Label>
                      <CustomInput  style={{direction:'rtl'}} type="switch" id="chartSwitch" name="chartFlag" checked={this.state.isChartFlagEnable} onChange={this.inputHandleChange} />
                      </Row>

                      <Row title='parentIdSwitch'>
                      <Label for='parentIdSwitch'>زیرمجموعه</Label>
                      <CustomInput type="switch" id="parentIdSwitch" name="parentIdSwitch" disabled={this.state.isParentIdSwitchDisable} checked={this.state.isParentSwitchSelected} onChange={this.showParentIdSelect} />
                      </Row>
               
                  </FormGroup>
                  
                  <FormGroup  title='parentIdSelect' style={{ textAlign: "right" }} hidden={this.state.isParentIdSelectHidden}>
                    <Row >
                      <Col sm='6'>
                          <Label for="parentId">مجموعه</Label>
                          <Input
                            type="select"
                            name="parentId"
                            id="parentId"
                            value={this.state.parentId}
                            onChange={this.inputHandleChange}
                          >
                            <option value=''>-- انتخاب کنید --</option>
                            {positionFullPath}
                          </Input>
                      </Col>
                    </Row>
                   </FormGroup>
                
                </Col>
              </Row>

              <Row title="categorySelect">
                <Col>

                  <FormGroup sm='6' title="category" style={{ textAlign: "right" }}>
                    <Label for="categoryRef">  واحد </Label>
                    <Row>
                      <Col sm='6'>
                        <Input
                          type="select"
                          name="categoryRef"
                          id="categoryRef"
                          onChange={this.inputHandleChange}
                          value={this.state.categoryRef}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {category}
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

              <Row title="positioninformation">
                <Col sm='6'>

                  <FormGroup title="title" style={{ textAlign: "right" }}>
                    <Label for="title">نام</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="نام"
                      onChange={this.inputHandleChange}
                      value={this.state.title}
                    />
                  </FormGroup>

                  <FormGroup  sm='6' title="abbreviation" style={{ textAlign: "right" }}
                  >
                    <Label for="abbreviation">مخفف</Label>
                    <Input
                      type="text"
                      name="abbreviation"
                      id="abbreviation"
                      placeholder="مخفف"
                      onChange={this.inputHandleChange}
                      value={this.state.abbreviation}
                    />
                  </FormGroup>

                  <FormGroup sm='6' title="descriptionRow" style={{ textAlign: "right" }}>
                    <Label for="descriptionRow">توضیحات</Label>
                    <Input
                      type="textarea"
                      name="descriptionRow"
                      id="descriptionRow"
                      placeholder="توضیحات"
                      onChange={this.inputHandleChange}
                      value={this.state.descriptionRow}
                    />
                  </FormGroup>

                </Col>
              </Row>

            </Form>
          </Col>
        </Row>

        <Row title="buttons">
          <Col sm="12" style={{ textAlign: "right" }}>
            <Button title="addButton" className="submit-button-style mr-2" disabled={this.state.isAddButtonDisable} onClick={this.new} >{" "}ذخیره{" "}</Button>
            <Button title="editButton" className="submit-button-style mr-2" disabled={this.state.isEditButtonDisable} onClick={this.edit} >  ویرایش </Button>
            <Button title="deleteButton" className="submit-button-style mr-2" disabled={this.state.isDeleteButtonDisable} onClick={this.delete} >  حذف</Button>
          </Col>
        </Row>

        <Row title="grid" className="mt-2">
          {/* { AgGridReact  } */}
          <Col
            hidden={true}
            className="ag-theme-alpine"
            style={{ height: "60vh", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              rowData={this.props.positionList}
              enableRtl={true}
              overlayLoadingTemplate={this.state.overlayLoadingTemplate}
              overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            ></AgGridReact>
          </Col>
          {/* { AntdGrid  } */}
          <Col
            hidden={false}
            className="ag-theme-balham"
            style={{
              height: "75vh",
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              overflowY: "scroll",
            }}
          >
            <Table
              rowKey="id"
              rowSelection={rowSelection}
              dataSource={this.state.rowData}
              columns={columns}
              scroll={{ y: "55vh" }}
              bordered
              pagination={false}
              size='small'
            />
          </Col>
        </Row>
          
        {/* Delete Modal */
        /* <Modal visible={this.state.isDeleteModalVisible} bodyStyle={{ padding: '0px' }} closable={false} onOk={this.handleOk} onCancel={this.reset}
          footer={[
            <Button key='1' className='cancel-button-style' onClick={this.toggleDeleteModal}>
              لغو
            </Button>,
            <Button key='2' className='submit-button-style' onClick={this.handleOk} disabled={this.state.isModalDeleteButtonDisable}>
              حذف
            </Button>,
          ]}
        >
          <Container fluid>
            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
              <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>حذف</span>
              </Col>
            </Row>
            <Row title='content'>
              <Col sm='12' style={{ textAlign: 'right' }}>
                <p>
                  آیا از حذف این رکورد اطمینان دارید ؟
                        </p>
                <p>برای تایید  <strong>{`"${this.state.title}"`}</strong> را وارد کنید.</p>
                <Row>
                  <Col sm="8">
                    <Form>
                      <FormGroup title="enteredTitle">
                        <Input
                          type="text"
                          id="deleteModalInputValue"
                          name="deleteModalInputValue"
                          value={this.state.deleteModalInputValue}
                          onChange={this.handleChangeDeleteModalInput}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal>
       */}
      </Container>
    );
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {

    positionList: state.position.positionList,
    positionCategoryTitleList: state.position.positionCategoryTitleList,
    positionFullPathList: state.position.positionFullPathList,
    positionFullPathByIdList: state.position.positionFullPathByIdList,
    positionItem: state.position.positionItem,
    message: state.position.message,
    domain: state.auth.domain,
    checkTokenCounter: state.auth.checkTokenCounter,

  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({

    getPosition: (data) => dispatch(getPosition(data)),
    getPositionFormData: (data) => dispatch(getPositionFormData(data)),
    getPositionItem: (data) => dispatch(getPositionItem(data)),
    postPosition: (data) => dispatch(postPosition(data)),
    putPosition: (data) => dispatch(putPosition(data)),
    deletePosition: (data) => dispatch(deletePosition(data)),
    resetProps: (data) => dispatch(resetProps(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Position);
