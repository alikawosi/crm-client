/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CustomInput, Container, Row, Col, Form, Button, FormGroup, Input, Label } from "reactstrap";
import { Modal, Table,Drawer } from "antd";
import { AgGridReact } from "ag-grid-react";
import { PlusSquareOutlined, } from "@ant-design/icons";
import "./representative.component.css";
import RepresentativeDetail from './representativeDetail.component';
import Notification from "../../../../../../shared/common/notification/notification.component";
import { getRepresentative, getRepresentativeFormData, postRepresentative, deleteRepresentative, resetProps } from '../../.../../../../../../../redux/infrastructure/representative/representative.action'
import NewRepresentativeType from '../../representativeType/newRepresentativeType.component'
import PersonalInformation from '../../realPerson/personalInformation/personalInformation.component'
import RegistrationInformation from "../registrationInformation/registrationInformation.component";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class Representative extends PureComponent {

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
      representativeTypeRef: '',
      personRef: '',
      representativeOrganizationRef: '',
      employeeRef: '',
      descriptionRow: '',
      selectedRowKeys: [],
      representativeDetailList: [],

      /* #endregion */

      //Flags
      isEmployeeSwitchSelected: false,
      isOrganizationSwitchSelected: false,
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,

      isPersonSelectHidden: false,
      isOrganizationSelectHidden: true,
      isEmployeeSelectHidden: true,

      isOrganizationEmployeeModalVisible: false,
      isModalDestroyed: false,
      isNewRepresentativeTypeDrawerVisible: false,
      isNewPersonDrawerVisible: false,
      isNewOrganizationDrawerVisible:false,
      //content
      newRepresentativeTypeDrawerContent: <div></div>,
      newPersonDrawerContent: <div></div>,
      newOrganizationDrawerContent: <div></div>,


    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {

    await this.getRepresentative();
    await this.getRepresentativeFormData();
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
      rowData: this.props.representativeList
    })
  }
  /* #endregion */


  /* #region  [- getRepresentative() -] */
  getRepresentative = async () => {
    let representativeGetData = {
      organizationRef: this.state.organizationRef
    }
    await this.props.getRepresentative(representativeGetData);
  }
  /* #endregion */

  /* #region  [- getRepresentativeFormData() -] */
  getRepresentativeFormData = async () => {
    let representativeFormGetData = {
      domainRef: parseInt(this.state.domainRef),
      organizationRef: this.state.organizationRef
    }
    await this.props.getRepresentativeFormData(representativeFormGetData);
  }
  /* #endregion */

  /* #region  [- postRepresentative() -] */
  postRepresentative = async () => {

    let representativePostData = {
      organizationRef: parseInt(this.state.organizationRef),
      representativeList: [
        {
          representativeTypeRef: parseInt(this.state.representativeTypeRef),
          personRef: parseInt(this.state.personRef),
          employeeRef: parseInt(this.state.employeeRef),
          representativeOrganizationRef: parseInt(this.state.representativeOrganizationRef),
          descriptionRow: this.state.descriptionRow
        }
      ],
      representativeDetailList: this.state.representativeDetailList,
    }
    await this.props.postRepresentative(representativePostData);
    this.setState({
      isModalDestroyed:true
    })
  }
  /* #endregion */
  
  /* #region  [- deleteRepresentative() -] */

  deleteRepresentative = async () => {

    let RepresentativeDeleteData = {
      RepresentativeIdList: [
        {
          id: this.state.id,
        }
      ]
    }
    await this.props.deleteRepresentative(RepresentativeDeleteData);
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
        })
      }
      else {
        this.setState({
          isDeleteButtonDisable: false,

        })
      }



    }
  }
  /* #endregion */

  /* #region  [- onSelectionChanged(selectedRowKeys) -] */
  onSelectionChanged = (selectedRowKeys) => {
    let selectedId = selectedRowKeys[0];
    let selectedObject = this.props.representativeList.filter(item => item.representativeMasterId === selectedId);
    this.setState({
      id: selectedObject[0].representativeMasterId,
      isDeleteButtonDisable:false
    })

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
      case 'representativeTypeRef':
        if(
          event.target.value !== '' && event.target.value !== "0" &&
          (this.state.employeeRef!== '' || this.state.personRef!== ''||this.state.representativeOrganizationRef!== ''))
          {
            this.setState({
              isAddButtonDisable:false
            })
          }   
        else{
          this.setState({
            isAddButtonDisable:true
          })
        }
        break;

      case 'personRef':
        if(
          event.target.value !== '' && event.target.value !== "0" &&
          this.state.representativeTypeRef!== ''&& this.state.representativeTypeRef!=="0")
          {
            this.setState({
              isAddButtonDisable:false
            })
          }  
        else{
          this.setState({
            isAddButtonDisable:true
          })
        } 
        break;

        case 'employeeRef':
          if(
            event.target.value !== '' && event.target.value !== "0" &&
            this.state.representativeTypeRef!== '' && this.state.representativeTypeRef!=="0")
            {
              this.setState({
                isAddButtonDisable:false
              })
            }
          else{
            this.setState({
              isAddButtonDisable:true
            })
          }   
          break;

          case 'representativeOrganizationRef':
            if(
              event.target.value !== '' && event.target.value !== "0" &&
              this.state.representativeTypeRef!== ''&& this.state.representativeTypeRef!=="0")
              {
                this.setState({
                  isAddButtonDisable:false
                })
              }
            else{
              this.setState({
                isAddButtonDisable:true
              })
            }   
            break;

          case 'descriptionRow':
            if(
              event.target.value !== null && event.target.value !== '' && this.state.representativeTypeRef!== '' &&
              (this.state.employeeRef!== '' || this.state.personRef!== ''||this.state.representativeOrganizationRef!== ''))
              {
                this.setState({
                  isAddButtonDisable:false
                })
              }   
          else{
            this.setState({
              isAddButtonDisable:true
            })
          }   
          break;
    
      default:
        this.setState({
          isAddButtonDisable:true
        })
        break;
    }
  };
  /* #endregion */

  /* #region  [- handleChangeSwitches -] */

  handleChangeSwitches = (event) => {
    switch (event.target.name) {
      case 'organizationFlag':
        if (this.state.isOrganizationSwitchSelected === false) {
          this.setState({
            isOrganizationSwitchSelected: true,
            isEmployeeSwitchSelected: false,
            isOrganizationSelectHidden: false,
            isPersonSelectHidden: true,
            isEmployeeSelectHidden: true,
            isAddButtonDisable:true,
            employeeRef: '',
            personRef: ''
          })

        }
        else {
          this.setState({
            isOrganizationSwitchSelected: false,
            isOrganizationSelectHidden: true,
            isPersonSelectHidden: false,
            isModalDestroyed: true,
            isAddButtonDisable:true,
            representativeOrganizationRef: '',
            representativeDetailList: []
          })

        }
        break;

      case 'employeeFlag':
        if (this.state.isEmployeeSwitchSelected === false) {
          this.setState({
            isEmployeeSwitchSelected: true,
            isOrganizationSwitchSelected: false,
            isEmployeeSelectHidden: false,
            isPersonSelectHidden: true,
            isOrganizationSelectHidden: true,
            isModalDestroyed: true,
            isAddButtonDisable:true,
            representativeOrganizationRef: '',
            representativeDetailList: [],
            personRef: ''
          })

        }
        else {
          this.setState({
            isEmployeeSwitchSelected: false,
            isEmployeeSelectHidden: true,
            isPersonSelectHidden: false,
            isAddButtonDisable:true,
            employeeRef: ''
          })

        }
        break;

      default:
        break;
    }
  }

  /* #endregion */

  /* #region  [- createRepresentativeDetailList -] */
  createRepresentativeDetailList = (data) => {
    let list = [];
    let representativeDetailList = data;
    for (let i = 0; i < representativeDetailList.length; i++) {
      const element = representativeDetailList[i];
      let data = {
        organizationRef:element.organizationRef,
        employeeRef: element.id,
        personRef: element.personRef,
        descriptionRow: element.descriptionRow,
      };
      list.push(data);
    }

    this.setState({
      representativeDetailList: list,
    });
    this.onClose();

  }
  /* #endregion */

  /* #region  [- toggleDetailModal -]  */

  toggleDetailModal = () => {
    this.setState({
      isOrganizationEmployeeModalVisible: true
    })
  }
  /* #endregion */

  /* #region  [- toggleNewRepresentativeTypeDrawer -] */

  toggleNewRepresentativeTypeDrawer = async () => {

    if (this.state.isNewRepresentativeTypeDrawerVisible === true) {
      await this.getRepresentativeFormData();
      this.setState({
        isNewRepresentativeTypeDrawerVisible: false,
        newRepresentativeTypeDrawerContent: <div></div>,
      })
    }
    else if (this.state.isNewRepresentativeTypeDrawerVisible === false) {
      this.setState({
        isNewRepresentativeTypeDrawerVisible: true,
        newRepresentativeTypeDrawerContent: <NewRepresentativeType onClose={this.toggleNewRepresentativeTypeDrawer} />,
      })
    }

  }
  /* #endregion */

  /* #region  [- toggleNewPersonDrawer -] */

  toggleNewPersonDrawer = async () => {

    if (this.state.isNewPersonDrawerVisible === true) {
      await this.getRepresentativeFormData();
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

  /* #region  [- toggleNewOrganizationDrawer -] */

    toggleNewOrganizationDrawer = async () => {

      if (this.state.isNewOrganizationDrawerVisible === true) {
        await this.getRepresentativeFormData();
        this.setState({
          isNewOrganizationDrawerVisible: false,
          newOrganizationDrawerContent: <div></div>,
        })
      }
      else if (this.state.isNewOrganizationDrawerVisible === false) {
        this.setState({
          isNewOrganizationDrawerVisible: true,
          newOrganizationDrawerContent: <RegistrationInformation onRef={ref => (this.child = ref)} onClose={this.toggleNewOrganizationTypeDrawer} />,
        })
      }
  
    }
    /* #endregion */
  

  /* #region  [- onClose -] */

  onClose = async() => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    if (this.state.representativeDetailList !== []) {
      this.setState({
        isOrganizationEmployeeModalVisible: false,
      })
    }
    else {
      this.setState({
        isOrganizationEmployeeModalVisible: false,
        isModalDestroyed: true
      })
    }
    this.deselectGridRow();
  }
  /* #endregion */

  /* #region  [- modalSend -] */
  modalSend =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.child.send()
  }
  /* #endregion */

  /* #region  [- new -] */
  new = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.postRepresentative();
    await this.getRepresentative();
    this.reset();
  }
  /* #endregion */

  /* #region  [- delete -] */
  delete = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deleteRepresentative();
    await this.getRepresentative();
    this.reset();
  }
  /* #endregion */

  /* #region  [- postRepresentativeType -] */
  postRepresentativeType = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postRepresentativeType();
    await this.toggleNewRepresentativeTypeDrawer();
  }

  /* #endregion */

  /* #region  [- postPerson -] */
  postPerson = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postPerson();
    await this.toggleNewPersonDrawer();
    await this.getRepresentativeFormData();
  }

  /* #endregion */
 
  /* #region  [- postOrganization -] */
  postOrganization = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postOrganization();
    await this.toggleNewOrganizationDrawer();
    await this.getRepresentativeFormData();
  }

  /* #endregion */
   

  /* #region  [- reset -] */

  reset = () => {
    this.setState({
      isParentIdSelectHidden: true,
      isEmployeeSwitchSelected: false,
      isOrganizationSwitchSelected: false,
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,
      isPersonSelectHidden:false,
      isEmployeeSelectHidden:true,
      isOrganizationSelectHidden:true,
      personRef: '',
      representativeTypeRef: '',
      representativeOrganizationRef: '',
      employeeRef: '',
      descriptionRow: '',
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
        title: "نام نماینده",
        dataIndex: "representativeMasterName",
        key: "representativeMasterName",
        width: 150,
      },
      {
        title: "نوع نماینده ",
        dataIndex: "representativeMasterTypeTitle",
        key: "representativeMasterTypeTitle",
        width: 100,
      },
      {
        title: "توضیحات  ",
        dataIndex: "representativeMasterDescriptionRow",
        key: "representativeMasterDescriptionRow",
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

    const person = this.props.representativePersonTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullName}
      </option>
    ));

    const employee = this.props.representativeEmployeeTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.fullName}
      </option>
    ));

    const organization = this.props.representativeOrganizationTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    const representativeType = this.props.representativeTypeTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    /* #endregion */

    /* #endregion */

    return (
      <Container fluid>

        <Row title='representativeForm'>
          <Col sm="12">
            <Form>

              <Row title="switches">
                <Col>
                  <FormGroup title="switches" style={{ textAlign: "right" }}>

                    <Row title='organizationFlag'>
                      <Label for='organizationFlag'>شخص حقوقی</Label>
                      <CustomInput style={{ direction: 'rtl' }} type="switch" id="chartSwitch" name="organizationFlag" checked={this.state.isOrganizationSwitchSelected} onChange={this.handleChangeSwitches} />
                    </Row>

                    <Row title='employeeFlag'>
                      <Label for='employeeFlag'>کارمند</Label>
                      <CustomInput type="switch" id="employeeFlag" name="employeeFlag" checked={this.state.isEmployeeSwitchSelected} onChange={this.handleChangeSwitches} />
                    </Row>

                  </FormGroup>
                </Col>
              </Row>

              <Row title="representativeTypeSelect">
                <Col>
                  <FormGroup title="representativeType" style={{ textAlign: "right" }}>
                    <Label for="representativeTypeRef">  نوع نماینده  </Label>
                    <Row>
                      <Col sm='11' >
                        <Input
                          type="select"
                          name="representativeTypeRef"
                          id="representativeTypeRef"
                          onChange={this.inputHandleChange}
                          value={this.state.representativeTypeRef}
                        >
                          <option value={0}>-- انتخاب کنید --</option>
                          {representativeType}
                        </Input>
                      </Col>

                      <Col sm='1'>
                        <PlusSquareOutlined
                          style={{
                            fontSize: "30px",
                            color: "#0168b8",
                            cursor: "pointer",
                          }}
                         onClick={this.toggleNewRepresentativeTypeDrawer}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>

              <Row title='representativeSelect'>
                <Col sm='12'>
                  <Row title="personSelect" hidden={this.state.isPersonSelectHidden}>
                    <Col>
                      <FormGroup title="personSelect" style={{ textAlign: "right" }}>
                        <Label for="personRef">    نماینده  </Label>
                        <Row>
                          <Col title='personComboBox' sm='11' >
                            <Input
                              type="select"
                              name="personRef"
                              id="personRef"
                              onChange={this.inputHandleChange}
                              value={this.state.personRef}
                            >
                              <option value={0}>-- انتخاب کنید --</option>
                              {person}
                            </Input>
                          </Col>

                          <Col title='personQuickAccess' sm='1'>
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

                  <Row title="employeeSelect" hidden={this.state.isEmployeeSelectHidden}>
                    <Col sm='12'>
                      <FormGroup title="employeeSelect" style={{ textAlign: "right" }}>
                        <Label for="employeeRef">  نماینده  </Label>
                        <Input
                          type="select"
                          name="employeeRef"
                          id="employeeRef"
                          onChange={this.inputHandleChange}
                          value={this.state.employeeRef}
                        >
                          <option value={0}>-- انتخاب کنید --</option>
                          {employee}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row title="organizationSelect" hidden={this.state.isOrganizationSelectHidden}>
                    <Col>
                      <FormGroup title="organizationSelect" style={{ textAlign: "right" }}>

                        <Label for="representativeOrganizationRef">  نماینده  </Label>

                        <Row title='organizationSelectAndQuickAccess'>

                          <Col title='organizationComboBox' sm='11' >
                            <Input
                              type="select"
                              name="representativeOrganizationRef"
                              id="representativeOrganizationRef"
                              onChange={this.inputHandleChange}
                              value={this.state.representativeOrganizationRef}
                            >
                              <option value={0}>-- انتخاب کنید --</option>
                              {organization}
                            </Input>
                          </Col>

                          <Col title='organizationQuickAccess' sm='1'>
                            <PlusSquareOutlined
                              style={{
                                fontSize: "30px",
                                color: "#0168b8",
                                cursor: "pointer",
                              }}
                            onClick={this.toggleNewOrganizationDrawer}
                            />
                          </Col>
                        </Row>

                        <Row title='organizationEmployeeButton' style={{ marginTop: '2%' }}>
                          <Col sm='5'>
                            <Button title="organizationEmployee" outline color="info" block onClick={this.toggleDetailModal}>اعضا</Button>
                          </Col>
                        </Row>

                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row title="descriptionRow">
                <Col>
                  <FormGroup style={{ textAlign: "right" }}>
                    <Label for="descriptionRow">توضیحات</Label>
                    <Input
                      type="textarea"
                      name="descriptionRow"
                      id="descriptionRow"
                      placeholder="توضیحات"
                      height="500px"
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
              rowData={this.props.representativeList}
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
              rowKey="representativeMasterId"
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
        {/* Modals and Drawers */}
        <Row>
          {/* RepresentativeDetail Modal */}
          <Modal visible={this.state.isOrganizationEmployeeModalVisible} bodyStyle={{ padding: '0px' }} closable={false} okText="ثبت"
            onCancel={this.onClose} width="40%" style={{ height: '400px' }} destroyOnClose={this.state.isModalDestroyed} maskClosable={false}
            footer={
              <Col sm="12" style={{ textAlign: "left" }}>
                <Button key='1' className='cancel-button-style' onClick={this.onClose} >لغو </Button>
                <Button key='2' className='submit-button-style' onClick={this.modalSend} >ثبت </Button>
              </Col>
            }>
            <RepresentativeDetail onRef={ref => (this.child = ref)} onClose={this.onClose}
              representativeOrganizationId={this.state.representativeOrganizationRef}
              createRepresentativeDetailList={this.createRepresentativeDetailList} />
          </Modal>
          {/* New RepresentativeType Drawer */}
          <Drawer
            placement={"left"}
            width={'600'}
            bodyStyle={{ padding: '0' }}
            closable={false}
            //onClose={this.toggleNewDrawer}
            visible={this.state.isNewRepresentativeTypeDrawerVisible}
          >
            {this.state.newRepresentativeTypeDrawerContent}
          </Drawer>
          {/* New Person Drawer */}
          <Drawer
            placement={"left"}
            width={'40%'}
            bodyStyle={{ padding: '2%' }}
            closable={false}
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
          {/* New Organization Drawer */}
          <Drawer
            placement={"left"}
            width={'40%'}
            bodyStyle={{ padding: '2%' }}
            closable={false}
            visible={this.state.isNewOrganizationDrawerVisible}
            footer={[
              <Button key='1' className='cancel-button-style ml-2' onClick={this.toggleNewOrganizationDrawer}>
                لغو
              </Button>,
              <Button key='2' className='submit-button-style' onClick={this.postOrganization}>
                ثبت
              </Button>,
            ]}
          >
            {this.state.newOrganizationDrawerContent}
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
    representativeList: state.representative.representativeList,
    representativeTypeTitleList: state.representative.representativeTypeTitleList,
    representativePersonTitleList: state.representative.representativePersonTitleList,
    representativeOrganizationTitleList: state.representative.representativeOrganizationTitleList,
    representativeEmployeeTitleList: state.representative.representativeEmployeeTitleList,
    message:state.representative.message,
    domain: state.auth.domain,
    checkTokenCounter: state.auth.checkTokenCounter,

  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  getRepresentative: data => dispatch(getRepresentative(data)),
  getRepresentativeFormData: data => dispatch(getRepresentativeFormData(data)),
  postRepresentative: data => dispatch(postRepresentative(data)),
  deleteRepresentative: data => dispatch(deleteRepresentative(data)),
  resetProps: data => dispatch(resetProps(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Representative);
