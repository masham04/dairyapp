import React from "react";
import "./Header.css";
import bar from "../Pages/images/menu.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

export const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className='header'>
      <nav>
        <div id="logo">DiaryApp</div>

        <label for="drop" class="toggle">
          <img src={bar} alt="bar" width="30px" />
        </label>
        <input type="checkbox" id="drop" />
        <ul class="menu">
          <li>
            <a href="#">
              <i class="fa fa-user"></i> {userInfo ? userInfo.username : "Signin"}
            </a>
          </li>

          <li>
            <a href="/login" onClick={logoutHandler}><i class="fa fa-sign-out"></i> Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
