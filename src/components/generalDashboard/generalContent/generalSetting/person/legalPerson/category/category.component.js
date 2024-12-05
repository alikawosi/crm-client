/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CustomInput, Container, Row, Col, Form, Button, FormGroup, Input, Label } from "reactstrap";
import {Table,Drawer } from "antd";
import { AgGridReact } from "ag-grid-react";
import { PlusSquareOutlined, } from "@ant-design/icons";
import "./category.component.css";
import Notification from "../../../../../../shared/common/notification/notification.component";
import { getCategory, getCategoryFormData, postCategory, getCategoryItem, putCategory, deleteCategory, resetProps } from '../../.../../../../../../../redux/infrastructure/category/category.action'
import NewCategoryType from '../../categoryType/newCategoryType.component'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class Category extends PureComponent {

  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
      domainRef: this.props.domain,
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
        { headerName: "نوع سازمان", field: "categoryType" },
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
      categoryTypeRef: '',
      title: '',
      abbreviation: '',
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
      isNewCategoryTypeDrawerVisible: false,
      isItemSelected:false,

      deleteModalInputValue:'',
      //content
      newCategoryTypeDrawerContent: <div></div>,

    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {

    await this.getCategory();
    await this.getCategoryFormData();


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
      rowData: this.props.categoryList
    })
    if (this.props.categoryList.length===0 || (this.state.id!==0 && this.props.categoryFullPathByIdList.length===0)) {
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


  /* #region  [- getCategory() -] */
  getCategory = async () => {
    let categoryGetData = {
      organizationRef: this.state.organizationRef
    }
    await this.props.getCategory(categoryGetData);
  }
  /* #endregion */

  /* #region  [- getCategoryFormData() -] */
  getCategoryFormData = async () => {
    let categoryFormGetData = {
      domainRef: parseInt(this.state.domainRef),
      organizationRef: this.state.organizationRef
    }
    await this.props.getCategoryFormData(categoryFormGetData);
  }
  /* #endregion */

  /* #region  [- getCategoryItem() -] */
  getCategoryItem = async (id) => {
    let categoryItemGetData = {
      categoryId: id,
      organizationRef:this.state.organizationRef,
      
    }
    await this.props.getCategoryItem(categoryItemGetData);
    const categoryItem = Object.assign({}, this.props.categoryItem[0]);
    this.setState({
      id: categoryItem.id,
      organizationRef: categoryItem.organizationRef,
      domainRef: parseInt(this.state.domainRef),
      parentId: categoryItem.parentId,
      categoryTypeRef: categoryItem.categoryTypeRef,
      title: categoryItem.title,
      abbreviation: categoryItem.abbreviation,
      descriptionRow: categoryItem.descriptionRow,
      isItemSelected:true
    })

    if (categoryItem.parentId!==null && categoryItem.parentId!== undefined && categoryItem.parentId!== '') {
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

  /* #region  [- postCategory() -] */
  postCategory = async () => {

    let categoryPostData = {
      organizationRef: this.state.organizationRef,
      categoryList: [
        {
          parentId: parseInt(this.state.parentId),
          categoryTypeRef: parseInt(this.state.categoryTypeRef),
          title: this.state.title,
          abbreviation: this.state.abbreviation,
          descriptionRow: this.state.descriptionRow

        }
      ]
    }
    await this.props.postCategory(categoryPostData);
  }
  /* #endregion */

  /* #region  [- putCategory() -] */
  putCategory = async () => {

    let categoryPutData = {
      categoryPutList: [
        {
          id: this.state.id,
          parentId: parseInt(this.state.parentId),
          categoryTypeRef: parseInt(this.state.categoryTypeRef),
          organizationRef: this.state.organizationRef,
          title: this.state.title,
          abbreviation: this.state.abbreviation,
          descriptionRow: this.state.descriptionRow
        }
      ]
    }

    await this.props.putCategory(categoryPutData);
  }
  /* #endregion */

  /* #region  [- deleteCategory() -] */

  deleteCategory = async () => {

    let categoryDeleteData = {
      CategoryIdList: [
        {
          id: this.state.id,
        }
      ]
    }
    await this.props.deleteCategory(categoryDeleteData);
  }

  /* #endregion */


  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //params.api.sizeColumnsToFit();
  };
  /* #endregion */

  /* #region  [- onSelectedRow() -] */
  onSelectedRow =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
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
  onSelectionChanged =async (selectedRowKeys) => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    let selectedId = selectedRowKeys[0];
    let selectedObject = this.props.categoryList.filter(item => item.id === selectedId);
    this.setState({
      id: selectedObject[0].id,
      title: selectedObject[0].title,
    })
    let id = selectedObject[0].id
    this.getCategoryItem(id);

    
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
      isDeleteButtonDisable: true,
      isEditButtonDisable: true,
      isModalDeleteButtonDisable: true,
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
        if (event.target.value !== null && event.target.value !== '' && this.state.isItemSelected !==true) {
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

      default:
        if (event.target.value !== null && event.target.value !== ''
        && this.state.isItemSelected !==true  && this.state.title!=='') {
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
  //     await this.getCategory();
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

  /* #region  [- toggleNewCategoryTypeDrawer -] */

  toggleNewCategoryTypeDrawer = async () => {

    if (this.state.isNewCategoryTypeDrawerVisible === true) {
      await this.getCategoryFormData();
      this.setState({
        isNewCategoryTypeDrawerVisible: false,
        newCategoryTypeDrawerContent: <div></div>,
      })
    }
    else if (this.state.isNewCategoryTypeDrawerVisible === false) {
      this.setState({
        isNewCategoryTypeDrawerVisible: true,
        newCategoryTypeDrawerContent: <NewCategoryType  onClose={this.toggleNewCategoryTypeDrawer} />,
      })
    }

  }
  /* #endregion */


  /* #region  [- showParentIdSelect -] */
  showParentIdSelect =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);

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
    await this.postCategory();
    await this.getCategory();
    await this.getCategoryFormData();
    this.reset();
  }

  /* #endregion */

  /* #region  [- edit -] */
  edit = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.putCategory();
    await this.getCategory();
    await this.getCategoryFormData();
    this.reset();
    this.deselectGridRow()
  }

  /* #endregion */

  /* #region  [- delete -] */

  delete = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deleteCategory();
    await this.getCategory();
    await this.getCategoryFormData();
    this.reset();

  }
  /* #endregion */
  
  /* #region  [- postCategoryType -] */
  postCategoryType = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postCategoryType();
    await this.toggleNewCategoryTypeDrawer();
  }

  /* #endregion */

  /* #region  [- reset -] */

  reset =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.setState({
      isAddButtonDisable: true,
      isEditButtonDisable: true,
      isDeleteButtonDisable: true,
      parentId: '',
      categoryTypeRef: '',
      title: '',
      abbreviation: '',
      descriptionRow: '',
      isParentIdSelectHidden: true,
      isParentSwitchSelected: false,
      isDeleteModalVisible:false,
      isModalDeleteButtonDisable:true,
      deleteModalInputValue:'',
      isItemSelected:false
    })
  }
  /* #endregion */

  

  /* #region  [- render() -] */

  render() {


    /* #region  [- const -] */

    /* #region  [- grid -] */
    const columns = [

      {
        title: "نام",
        dataIndex: "title",
        key: "title",
        width: 150,
      },
      {
        title: "نام مخفف",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 100,
      },
      {
        title: "نوع سازمان",
        dataIndex: "categoryTypeName",
        key: "categoryTypeName",
        width: 150,
      },
      {
        title: "توضیحات",
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

    const categoryType = this.props.categoryTypeTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    ));

    const categoryFullPath =(this.state.id!==0)?this.props.categoryFullPathByIdList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    )):
    this.props.categoryFullPathList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullPath}
      </option>
    ));


    /* #endregion */

    /* #endregion */


    return (
      <Container fluid>
        <Row title='categoryForm'>
          <Col sm="12">
            <Form>

              <Row title="parentId">
                <Col sm="12" title="parentIdSelectAndSwitch">
                  <FormGroup title="parentId" style={{ textAlign: "right" }}>
                    <Row title='switch'>
                      <Label for='categoryParentIdSwitch'>مجموعه</Label>
                      <CustomInput type="switch" id="categoryParentIdSwitch" name="parentIdSwitch" disabled={this.state.isParentIdSwitchDisable} checked={this.state.isParentSwitchSelected} onChange={this.showParentIdSelect} />
                    </Row>

                    <Row title='parentIdSelect' hidden={this.state.isParentIdSelectHidden}>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for="parentId">زیرمجموعه</Label>
                          <Input
                            type="select"
                            name="parentId"
                            id="parentId"
                            placeholder="زیرمجموعه"
                            value={this.state.parentId}
                            onChange={this.inputHandleChange}
                          >
                            <option value=''>-- انتخاب کنید --</option>
                            {categoryFullPath}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                  </FormGroup>
                </Col>
              </Row>

              <Row title="categoryTypeSelect">
                <Col>

                  <FormGroup title="categoryType" style={{ textAlign: "right" }}>
                    <Label for="categoryTypeRef"> نوع واحد </Label>
                    <Row>
                      <Col sm="11">
                        <Input
                          type="select"
                          name="categoryTypeRef"
                          id="categoryTypeRef"
                          onChange={this.inputHandleChange}
                          value={this.state.categoryTypeRef}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {categoryType}
                        </Input>
                      </Col>

                      <Col sm="1">
                        <PlusSquareOutlined
                          style={{
                            fontSize: "30px",
                            color: "#0168b8",
                            cursor: "pointer",
                          }}
                         onClick={this.toggleNewCategoryTypeDrawer}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

              <Row title="categoryinformation">
                <Col sm="12">

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

                  <FormGroup title="abbreviation" style={{ textAlign: "right" }}
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

                  <FormGroup title="descriptionRow" style={{ textAlign: "right" }}>
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
              rowData={this.props.categoryList}
              enableRtl={true}
              overlayLoadingTemplate={this.state.overlayLoadingTemplate}
              overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            ></AgGridReact>
          </Col>
          {/* { AntdGrid  } */}
          <Col
            hidden={false}
            // className="ag-theme-balham"
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
              size='small'
              pagination={false}
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
        {/* New CategoryType Drawer */}
        <Drawer
          placement={"left"}
          width={'40%'}
          bodyStyle={{ padding: '0' }}
          closable={false}
          //onClose={this.toggleNewDrawer}
          visible={this.state.isNewCategoryTypeDrawerVisible}
        >
          {this.state.newCategoryTypeDrawerContent}
        </Drawer>

      
      </Container>

    );
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {
    categoryList: state.category.categoryList,
    categoryTypeTitleList: state.category.categoryTypeTitleList,
    categoryFullPathList: state.category.categoryFullPathList,
    categoryFullPathByIdList: state.category.categoryFullPathByIdList,
    categoryItem: state.category.categoryItem,
    message: state.category.message,
    checkTokenCounter: state.auth.checkTokenCounter,
    domain: state.auth.domain

  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  getCategory: (data) => dispatch(getCategory(data)),
  getCategoryFormData: (data) => dispatch(getCategoryFormData(data)),
  getCategoryItem: (data) => dispatch(getCategoryItem(data)),
  postCategory: (data) => dispatch(postCategory(data)),
  putCategory: (data) => dispatch(putCategory(data)),
  deleteCategory: (data) => dispatch(deleteCategory(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
  resetProps: (data) => dispatch(resetProps(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Category);
