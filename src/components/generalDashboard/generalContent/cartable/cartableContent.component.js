import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import CartableChooseContent from './cartableChooseContent.component';
import UnderConstruction from '../../../shared/common/underConstruction/underConstruction.component';

class CartableContent extends PureComponent {
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
            case "sales":
                return <UnderConstruction/>;
            case "services":
                return <UnderConstruction/>;
            case "marketing":
                return <UnderConstruction/>;
            case "management":
                return <UnderConstruction/>;
            default:
                return <CartableChooseContent />;
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

export default connect(mapStateToProps, mapDispatchToProps)(CartableContent);