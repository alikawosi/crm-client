/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { initializeIcons } from "@uifabric/icons";
import { Icon, } from "office-ui-fabric-react";
initializeIcons();

/* #endregion */

class GridSourceButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            sourceCount:0,
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        this.setSourceCount();
    }
    /* #endregion */

    /* #region  [- setSourceCount -] */
    setSourceCount = () => {
        if(Object.keys(this.props.timelineList).length!==0){
            let list=this.props.timelineList.filter(x=>x.id===this.props.node.data.id)
            let len=Object.keys(list).length
          this.setState({
              sourceCount:len===0?0: list[0].sourceListCount
          })  
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- details -] */
    details = () => {
        let data = {
            domainRef: this.props.domain,
            timelineRef: this.props.node.data.id,
        }
        this.props.context.componentParent.showSourceDetails(data);
    }
    /* #endregion */




    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (

            <div style={{ textAlign: 'center' }}>
                {
                    this.props.node.data.automaticActivityTypeRef === 4 ||
                        this.props.node.data.automaticActivityTypeRef === 5 ||
                        this.props.node.data.automaticActivityTypeRef === 6 ||
                        this.props.node.data.automaticActivityTypeRef === 7 ||
                        this.props.node.data.automaticActivityTypeRef === 8 ?
                        <div onClick={this.details} style={{ textAlign: 'center' }}>
                            <span onClick={this.details} style={{ textAlign: 'center',paddingLeft:'5px' }}>{this.state.sourceCount}</span>
                            <Icon
                                onClick={this.details}
                                id="RedEye"
                                iconName="RedEye"
                                style={{ fontSize: "18px", color: "#40a9ff", }}
                            />    
                        </div>
                        :
                        <h5 style={{ paddingTop: '10%', }}>---</h5>
                }

            </div>
        );
    }
    /* #endregion */

    /* #endregion */
};

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        domain: state.auth.domain,
        timelineList: state.orderTimeline.timelineList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridSourceButton);
