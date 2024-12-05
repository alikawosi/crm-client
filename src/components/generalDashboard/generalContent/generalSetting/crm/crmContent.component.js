import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import CRMChooseContent from './crmChooseContent.component';
import Rating from './rating/rating.component';
import AccountSource from './accountSource/accountSource.component';
import ResponsibleType  from "./responsibleType/responsibleType.component";
import ReportType from './reportType/reportType.component';
import TaskStatus from "./taskStatus/taskStatus.component";


class CRMContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    /* #region  [- UNSAFE_componentWillReceiveProps(preProps, nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            clickedItemName: nextProps.generalSettingSelectedItem,
        });
        //console.log(nextProps.generalSettingSelectedItem)
        this.contentSelected();
    }
    /* #endregion */

    /* #region  [- contentSelected() -] */
    contentSelected = () => {
        switch (this.state.clickedItemName) {
            case "rating":
                return <Rating />;
            case "accountSource":
                return <AccountSource />;
            case "responsibleType":
                return <ResponsibleType />;
            case "reportType":
                return <ReportType />;
            case "taskStatus":
                return <TaskStatus />;
            default:
                return <CRMChooseContent />;
            //break;
        }
    };
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <div>
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        generalSettingSelectedItem: state.common.generalSettingSelectedItem,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(CRMContent);