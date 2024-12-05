/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, CustomInput, Form, FormGroup, Input } from 'reactstrap';
import { PlusSquareOutlined } from "@ant-design/icons";
import Notification from "../../../../../../shared/common/notification/notification.component";
import {getSupplyChain,getSupplyChainFormData,postSupplyChain,putSupplyChain} from '../../../../../../../redux/product/supplyChain/supplyChain.action'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { Label } from 'office-ui-fabric-react';

/* #endregion */

class BasicInfo extends PureComponent{

/* #region  [- ctor -] */
    constructor(props){
        super(props);
        this.state={
            isLegalPersonSelected:true,
            isRealPersonSelected:false,

            id:'',
            personRef:'',
            organizationRef:'',
            code:'',
            abbreviation:'',
            descriptionRow:'',
            organizationList:[],
            personList:[]
        }
    }
/* #endregion */

/* #region  [- methods -] */

/* #region  [- componentDidMount() -] */

    componentDidMount(){
        this.props.onRef(this);
        this.getSupplyChainFormData();

        if (this.props.editMode === true) {
            const producerItem = Object.assign({}, this.props.producerItem[0]);
      
            this.setState({
                id: producerItem.id,
                code:producerItem.code,
                abbreviation:producerItem.abbreviation,
                descriptionRow:producerItem.descriptionRow,
            })

            if (producerItem.personRef===null) {
                this.setState({
                    organizationRef:producerItem.organizationRef,
                    isLegalPersonSelected:true,
                    isRealPersonSelected:false,
                    personRef:''
                })
                
            } 
            else if(producerItem.organizationRef===null) {
                this.setState({
                    personRef:producerItem.personRef,
                    isRealPersonSelected:true,
                    isLegalPersonSelected:false,
                    organizationRef:''
                })                
            }
      

          }
        }

/* #endregion */

/* #region  [- getSupplyChain -] */

    getSupplyChain = async() =>{
        let supplyChainGetData={
            domainRef:this.props.domain
        }
        await this.props.getSupplyChain(supplyChainGetData)
        }

/* #endregion */

/* #region  [- getSupplyChainFormData -] */

    getSupplyChainFormData = async() =>{
    let producerBasicInfoFormGetData = {
        domainRef: parseInt(this.props.domain)
        }
    await this.props.getSupplyChainFormData(producerBasicInfoFormGetData)
    }

/* #endregion */

/* #region  [- postSupplyChain -] */
    postSupplyChain = async() =>{
        if (this.state.isLegalPersonSelected) {

            let  supplyChainPostData ={
                supplyChainList:[{
                code:this.state.code,
                abbreviation:this.state.abbreviation,
                organizationRef: parseInt(this.state.organizationRef),
                personRef:null,
                producerFlag:true,
                supplierFlag:false,
                descriptionRow:this.state.descriptionRow
                }]
            }
            await this.props.postSupplyChain(supplyChainPostData)
            await this.getSupplyChain();
             return true
        } 
        else {
            let  supplyChainPostData ={
                supplyChainList:[{
                code:this.state.code,
                abbreviation:this.state.abbreviation,
                organizationRef: null,
                personRef:parseInt(this.state.personRef),
                producerFlag:true,
                supplierFlag:false,
                descriptionRow:this.state.descriptionRow
                }]
            }
            await this.props.postSupplyChain(supplyChainPostData)
             this.getSupplyChain()
             return true
        }

    }
/* #endregion */

/* #region  [- putSupplyChain -] */
putSupplyChain = async() =>{
    if (this.state.isLegalPersonSelected) {

        let  supplyChainPutData ={
            supplyChainList:[{
            Id:this.state.id,
            code:this.state.code,
            abbreviation:this.state.abbreviation,
            organizationRef: parseInt(this.state.organizationRef),
            personRef:null,
            descriptionRow:this.state.descriptionRow
            }]
        }
        await this.props.putSupplyChain(supplyChainPutData)
         this.getSupplyChain()
         return true
    } 
    else {
        let  supplyChainPutData ={
            supplyChainList:[{
            Id:this.state.id,
            code:this.state.code,
            abbreviation:this.state.abbreviation,
            organizationRef: null,
            personRef:parseInt(this.state.personRef),
            descriptionRow:this.state.descriptionRow
            }]
        }
        await this.props.putSupplyChain(supplyChainPutData)
         this.getSupplyChain()
         return true
    }

}
/* #endregion */


/* #region  [- inputHandleChange(event) -] */
inputHandleChange = (event) => {
this.setState({
    [event.target.name]: event.target.value,
});
};
/* #endregion */

/* #region  [- producerTypeSelector() -] */
    producerTypeSelector= () =>{
        if (this.state.isRealPersonSelected) {
            this.setState(
                {
                    isLegalPersonSelected:true,
                    isRealPersonSelected:false,
                    personRef:''
                }
            )
            
        }
        else{
            this.setState(
                {
                    isLegalPersonSelected:false,
                    isRealPersonSelected:true,
                    organizationRef:''
                }
            )
        }
    }
/* #endregion */

/* #region  [- render() -] */



    render() {


        /* #region  [- const -] */

            /* #region  [- combobox -] */
            const organizationList = this.props.organizationList.map((item) => (
                <option key={item.id} value={item.id}>
                {item.fullPath}
                </option>
            ));
        
            const personList = this.props.personList.map((item) => (
                <option key={item.id} value={item.id}>
                {item.fullName}
                </option>
            ));
        
            /* #endregion */
            
        /* #endregion */
        

        return(
            <Container fluid>
                <Row name='basicInfoForm'>
                    <Col sm='12'>
                        <Form>
                            <Row style={{ paddingTop: "4%" }}>
                                <Col sm='12'>
                                    <FormGroup name='producerType' style={{ paddingRight:'2%',textAlign: "right" }}>
                                        <Row>
                                            <Label> شخص حقوقی</Label>
                                            <CustomInput check type='radio' id='legalPersonRadio' name='legalPersonRadio' 
                                            checked={this.state.isLegalPersonSelected}
                                            onChange={this.producerTypeSelector}
                                            />
                                        </Row>
                                        <Row>
                                            <Label> شخص حقیقی</Label>
                                            <CustomInput  type='radio' id='realPersonRadio' name='realPersonRadio'
                                            checked={this.state.isRealPersonSelected}
                                            onChange={this.producerTypeSelector}
                                            />
                                        </Row>
                                    </FormGroup>
                                    <FormGroup name='legalProducer' hidden={this.state.isRealPersonSelected} style={{ textAlign: "right" }}>
                                        <Label for="organizationRef"> عنوان</Label>
                                        <Row>
                                        <Col sm="11">
                                            <Input
                                            type="select"
                                            name="organizationRef"
                                            value={this.state.organizationRef}
                                            onChange={this.inputHandleChange}
                                            >
                                            <option value=''>-- انتخاب کنید --</option>
                                            {organizationList}
                                            </Input>
                                        </Col>
                                        <Col name="quickAccess" sm='1'  hidden ={true} style={{ padding: '0' }}>
                                            <PlusSquareOutlined
                                            disabled={true}
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            />
                                        </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup name='realProducer' hidden={this.state.isLegalPersonSelected} style={{ textAlign: "right" }}>
                                        <Label for="personRef"> عنوان</Label>
                                        <Row>
                                        <Col sm="11">
                                            <Input
                                            type="select"
                                            name="personRef"
                                            value={this.state.personRef}
                                            onChange={this.inputHandleChange}
                                            >
                                            <option value=''>-- انتخاب کنید --</option>
                                            {personList}
                                            </Input>
                                        </Col>
                                        <Col name="quickAccess" sm='1'  hidden ={true} style={{ padding: '0' }}>
                                            <PlusSquareOutlined
                                            disabled={true}
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            />
                                        </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                     <FormGroup row nsme='otherInfo' style={{ textAlign: "right" }}>
                                              <Col sm='12'>
                                                <Label>کد</Label>
                                                <Input name='code' type='text' value={this.state.code} onChange={this.inputHandleChange}/>
                                                <Label>مخفف</Label>
                                                <Input name='abbreviation' value={this.state.abbreviation} type='text'onChange={this.inputHandleChange}/>
                                                <Label>توضیحات</Label>
                                                <Input name='descriptionRow' value={this.state.descriptionRow} type='textarea'onChange={this.inputHandleChange}/>
                                            </Col>
                                     </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )

    }
/* #endregion */

/* #endregion */
}
/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        domain: state.auth.domain,
        personList: state.supplyChain.personList,
        producerItem: state.supplyChain.supplyChainItem,
        organizationList: state.supplyChain.organizationList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    getSupplyChain: (data) => dispatch(getSupplyChain(data)),
    getSupplyChainFormData: (data) => dispatch(getSupplyChainFormData(data)),
    postSupplyChain: (data) => dispatch(postSupplyChain(data)),
    putSupplyChain: (data) => dispatch(putSupplyChain(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);