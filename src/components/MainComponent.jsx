/*
 created by aditya on 17-02-2017
 */

"use strict";

import React, {PropTypes} from "react";

import DashboardComponent from "./../components/DashboardComponent";
import SidebarContainer from "./../containers/SidebarContainer";
import HeaderContainer from "./../containers/HeaderContainer";

const MainComponent = (props) => {
    return (
        <div>
            <HeaderContainer/>
            <div>
                <SidebarContainer/>
                {props.children ? props.children : <DashboardComponent/>}
            </div>
        </div>
    );
};

MainComponent.propTypes = {
    children: PropTypes.node
};

export default MainComponent;
