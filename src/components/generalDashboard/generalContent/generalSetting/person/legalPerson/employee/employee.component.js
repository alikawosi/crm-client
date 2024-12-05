/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button, FormGroup, Input, Label } from "reactstrap";
import { Table, Drawer } from "antd";
import { AgGridReact } from "ag-grid-react";
import "./employee.component.css";
import { PlusSquareOutlined } from "@ant-design/icons";
import Notification from "../../../../../../shared/common/notification/notification.component";
import { getEmployee, getEmployeeFormData, postEmployee, deleteEmployee, resetProps } from '../../../../../../../redux/infrastructure/employee/employee.action'
import PersonalInformation from '../../realPerson/personalInformation/personalInformation.component';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class Employee extends PureComponent {

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
      positionRef: '',
      categoryRef: '',
      personRef: '',
      personFullName: '',
      selectedRowKeys: [],

      /* #endregion */
      deleteModalInputValue: '',
      //Flags
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,
      isDeleteModalVisible: false,
      isModalDeleteButtonDisable: true,
      isNewPersonDrawerVisible: false,
      isPositionSelectDisabled:true,
      //content
      newPersonDrawerContent: <div></div>,
      //list
      positionFilteredList:[],


    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {

    await this.getEmployee();
    await this.getEmployeeFormData();
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
      rowData: this.props.employeeList
    })
  }
  /* #endregion */


  /* #region  [- getEmployee() -] */
  getEmployee = async () => {
    let employeeGetData = {
      organizationRef: this.state.organizationRef
    }
    await this.props.getEmployee(employeeGetData);
  }
  /* #endregion */

  /* #region  [- getEmployeeFormData() -] */
  getEmployeeFormData = async () => {
    let employeeFormGetData = {
      domainRef: parseInt(this.state.domainRef),
      organizationRef: this.state.organizationRef
    }
    await this.props.getEmployeeFormData(employeeFormGetData);
  }
  /* #endregion */

  /* #region  [- postEmployee() -] */
  postEmployee = async () => {

    let employeePostData = {
      organizationRef: this.state.organizationRef,

      employeeList: [
        {
          personRef: parseInt(this.state.personRef),
        }
      ],

      employeePositionList: [
        {
          positionId: parseInt(this.state.positionRef),
        }
      ]
    }
    await this.props.postEmployee(employeePostData);
  }
  /* #endregion */

  /* #region  [- deleteEmployee() -] */

  deleteEmployee = async () => {

    let employeeDeleteData = {
      EmployeeIdList: [
        {
          id: this.state.id,
        }
      ]
    }
    await this.props.deleteEmployee(employeeDeleteData);
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
    let selectedObject = this.props.employeeList.filter(item => item.id === selectedId);
    if (selectedObject[0].checkRefFlag===true) {
      this.setState({
        id: selectedObject[0].id,
        personFullName: selectedObject[0].fullName,
        isDeleteButtonDisable: true
      })
    }
    else{
      this.setState({
        id: selectedObject[0].id,
        personFullName: selectedObject[0].fullName,
        isDeleteButtonDisable: false
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

      case 'personRef':

        if (
          event.target.value !== "0" && event.target.value !== "" &&
          this.state.categoryRef !== "0" && this.state.categoryRef !== "" &&
          this.state.positionRef !== "0" && this.state.positionRef !== ""
        ) {
          this.setState({
            isAddButtonDisable: false
          })
        }
        else {
          this.setState({
            isAddButtonDisable: true
          })
        }

        break;

      case 'categoryRef':

        if (event.target.value !== "0" && event.target.value !== "") {
          this.setState({
            isPositionSelectDisabled:false,
            positionFilteredList: this.props.employeePositionTitleList.filter(item => item.categoryRef === parseInt(event.target.value))
          })

          
        }
        else{
          this.setState({
            isPositionSelectDisabled:true,
            positionRef:'',
            positionFilteredList:[]
          })
        }

        if (
          event.target.value !== "0" && event.target.value !== "" &&
          this.state.personRef !== "0" && this.state.personRef !== "" &&
          this.state.positionRef !== "0" && this.state.positionRef !== ""
        ) {
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

      case 'positionRef':

        if (
          event.target.value !== "0" && event.target.value !== "" &&
          this.state.personRef !== "0" && this.state.personRef !== "" &&
          this.state.categoryRef !== "0" && this.state.categoryRef !== ""
        ) {
          this.setState({
            isAddButtonDisable: false
          })
        }
        else {
          this.setState({
            isAddButtonDisable: true
          })
        }

        break;

      default:
        this.setState({
          isAddButtonDisable: true
        })
        break;
        
    }

  };
  /* #endregion */

  /* #region  [- handleChangeDeleteModalInput(event) -] */
  handleChangeDeleteModalInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.value === this.state.personFullName) {
      this.setState({
        isModalDeleteButtonDisable: false
      });
    } else {
      this.setState({
        isModalDeleteButtonDisable: true
      });
    }
  }
  /* #endregion */

  /* #region  [- toggleDeleteModal() -] */
  // toggleDeleteModal = async () => {

  //   if (this.state.isDeleteModalVisible === true) {
  //     this.deselectGridRow();
  //     await this.getEmployee();
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

  /* #region  [- toggleNewPersonDrawer -] */
  toggleNewPersonDrawer = async () => {

    if (this.state.isNewPersonDrawerVisible === true) {
      await this.getEmployeeFormData();
      this.setState({
        isNewPersonDrawerVisible: false,
        newPersonDrawerContent: <div></div>,
      })
    }
    else if (this.state.isNewPersonDrawerVisible === false) {
      this.setState({
        isNewPersonDrawerVisible: true,
        newPersonDrawerContent: <PersonalInformation onRef={ref => (this.child = ref)} onClose={this.toggleNewPersonDrawer} />,
      })
    }

  }
  /* #endregion */


  /* #region  [- postPerson -] */
  postPerson = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postPerson();
    await this.toggleNewPersonDrawer();
    await this.getEmployeeFormData();
  }

  /* #endregion */

  /* #region  [- new -] */
  new = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.postEmployee();
    await this.getEmployee();
    await this.getEmployeeFormData();
    this.reset();
  }

  /* #endregion */

  /* #region  [- delete -] */

  delete = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deleteEmployee();
    await this.getEmployee();
    await this.getEmployeeFormData();
    this.reset();

  }
  /* #endregion */

  /* #region  [- reset -] */

  reset = () => {
    this.setState({
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,
      personRef: '',
      categoryRef: '',
      positionRef: '',
      employeeCategoryRef: '',
      employeePositionRef: '',
      isDeleteModalVisible: false,
      isModalDeleteButtonDisable: true,
      deleteModalInputValue: ''
    })
    this.deselectGridRow();
  }
  /* #endregion */

  
  /* #region  [- render() -] */

  render() {

    /* #region  [- const -] */

    /* #region  [- grid -] */
    const columns = [

      {
        title: " نام شخص",
        dataIndex: "fullName",
        key: "fullName",
        width: 150,
      },
      {
        title: "نام واحد",
        dataIndex: "categoryTitle",
        key: "categoryTitle",
        width: 100,
      },
      {
        title: "عنوان سمت",
        dataIndex: "positionTitle",
        key: "positionTitle",
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

    const person = this.props.personFullNameList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullName}
      </option>
    ));

    const category = this.props.employeeCategoryTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    const position = this.state.positionFilteredList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));


    /* #endregion */

    /* #endregion */

    return (
      <Container fluid>

        <Row title='employeeForm'>
          <Col sm="12">
            <Form>

              <Row title="personSelect">
                <Col>

                  <FormGroup title="personSelect" style={{ textAlign: "right" }}>
                    <Label for="personId"> شخص</Label>
                    <Row>
                      <Col sm="11">
                        <Input
                          type="select"
                          name="personRef"
                          id="personRef"
                          value={this.state.personRef}
                          onChange={this.inputHandleChange}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {person}
                        </Input>
                      </Col>

                      <Col sm="1">
                        <PlusSquareOutlined
                          style={{
                            fontSize: "30px",
                            color: "#0168b8",
                            cursor: "pointer",
                          }}
                          onClick={this.toggleNewPersonDrawer}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

              <Row title="categorySelect">
                <Col>

                  <FormGroup title="category" style={{ textAlign: "right" }}>
                    <Label for="categoryRef">  واحد </Label>
                    <Row>
                      <Col >
                        <Input
                          type="select"
                          name="categoryRef"
                          id="categoryRef"
                          value={this.state.categoryRef}
                          onChange={this.inputHandleChange}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {category}
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

              <Row title="positionSelect">
                <Col>

                  <FormGroup title="position" style={{ textAlign: "right" }}>
                    <Label for="positionRef">  سمت </Label>
                    <Row>
                      <Col >
                        <Input
                          type="select"
                          name="positionRef"
                          id="positionRef"
                          disabled={this.state.isPositionSelectDisabled}
                          value={this.state.positionRef}
                          onChange={this.inputHandleChange}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {position}
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

            </Form>
          </Col>
        </Row>

        <Row title="buttons">
          <Col sm="12" style={{ textAlign: "right" }}>
            <Button title="addButton" className="submit-button-style mr-2" disabled={this.state.isAddButtonDisable} onClick={this.new}  >{" "}ذخیره{" "}</Button>
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
              rowData={this.props.employeeList}
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
          {/* Drawers and Modals */}
        <Row>
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
                  <p>برای تایید  <strong>{`"${this.state.personFullName}"`}</strong> را وارد کنید.</p>
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
          {/* New Person Drawer */}
          <Drawer
            placement={"left"}
            width={'40%'}
            bodyStyle={{ padding: '2%' }}
            closable={false}
            //onClose={this.toggleNewDrawer}
            visible={this.state.isNewPersonDrawerVisible}
            footer={[
              <Button key='1' className='cancel-button-style ml-2' onClick={this.toggleNewPersonDrawer}>
                لغو
              </Button>,
              <Button key='2' className='submit-button-style' onClick={this.postPerson}>
                ثبت
              </Button>,
            ]}
          >
            {this.state.newPersonDrawerContent}
          </Drawer>
        </Row>
      </Container>
    );
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {

    employeeList: state.employee.employeeList,
    employeeCategoryTitleList: state.employee.employeeCategoryTitleList,
    employeePositionTitleList: state.employee.employeePositionTitleList,
    personFullNameList: state.employee.personFullNameList,
    message: state.employee.message,
    domain: state.auth.domain,
    checkTokenCounter: state.auth.checkTokenCounter,

  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  getEmployee: (data) => dispatch(getEmployee(data)),
  getEmployeeFormData: (data) => dispatch(getEmployeeFormData(data)),
  postEmployee: (data) => dispatch(postEmployee(data)),
  deleteEmployee: (data) => dispatch(deleteEmployee(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
  resetProps: (data) => dispatch(resetProps(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
