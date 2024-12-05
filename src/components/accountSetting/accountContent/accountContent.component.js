/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import '../../generalDashboard/generalContent/generalContent.component.css';
import Profile from './profile/profile.component'

/* #endregion */

class AccountContent extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(nextProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.sidebarSelectedItem !== prevProps.sidebarSelectedItem) {
            this.setState({
                selectedItem: this.props.sidebarSelectedItem
            })
            this.contentSelected();
        }

    }
    /* #endregion */

    /* #region  [- contentSelected() -] */
    contentSelected = () => {

        switch (this.state.selectedItem) {
            case 'reset':
                return (<div></div>)
            case 'profile':
                return (
                    <Profile />
                );

            default:
                return (
                    <Profile />
                );
        }
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ backgroundColor: "#ECEFF1", overflowX: "hidden" }}>
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        sidebarSelectedItem: state.common.sidebarSelectedItem,
        //message: state.account.message,

    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    //resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);