import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./MainHeader.scss";
import { clearStorage, getItem } from "../../helper/Storage";
import { NavLink, useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar/MenuBar";
import Button from "components/Button/Button";
import { logo } from "context/AuthContext/AuthContext";

const MainHeader = () => {


  return (
    <div className="container-fluid header">
      <div className="row">
        <div className="col-6 col-md-6 col-sm-6 col-lg-6">

        </div>

        <div className="col-6 col-md-6 col-sm-6 col-lg-6">
          <div className="float-end">
           
          </div>
        </div>

      </div>
    </div>
  );
};
export default MainHeader;
