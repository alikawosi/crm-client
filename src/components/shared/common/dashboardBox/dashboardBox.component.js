import React, { PureComponent } from 'react';
//================================================
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import './dashboardBox.component.css'
initializeIcons();

class DashboardBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const style = {
            backgroundColor: this.props.color,
            direction: this.props.direction,
            width: 'inherit',
            cursor: 'pointer',
            //height: '150px',
            borderRadius: '5px',
            marginBottom:'15px',
            padding:'0px',
            height:'auto',
            transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
         
        }
        return (
            <div className='container-fluid content-row dashboardBoxCard' style={style}>
                    <div className='row d-flex'>
                        <div className='card-body flex-fill' style={{ textAlign: this.props.textAlign, fontWeight: '35px', color: 'white' }}>
                            {this.props.number}{this.props.title}
                        </div>
                    </div>
                    <Icon
                        className='dashboardBoxCardIcon'
                        iconName={this.props.fabricIconName}
                        style={{
                            
                            fontWeight: "60px",
                            // marginTop: "8px",
                            // marginRight: "13px",
                            //color: 'white'
                            color: 'rgba(0,0,0,.15)'
                        }}
                    />
                        <p className='py-2 extraInfo flex-fill' style={{ fontWeight: '15px', color: 'white', background: 'rgba(0,0,0,.1)' }}>
                            اطلاعات بیشتر
                        </p>

            </div>
        );
    }
}

export default DashboardBox;