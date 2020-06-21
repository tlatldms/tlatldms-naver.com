import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className="logo">
                All-in-Hand
            </div>
            <div className="header">
                <NavLink exact to="/" className="item" activeClassName="active">홈</NavLink>
                <NavLink to="/about/velopert" className="item" activeClassName="active">신규등록</NavLink>
                <NavLink to="/posts" className="item" activeClassName="active">메뉴</NavLink>
                <NavLink to="/me" className="item" activeClassName="active">리뷰</NavLink>
                <NavLink to="/login" className="item" activeClassName="active">로그인</NavLink>
                <NavLink to="/search" className="item" activeClassName="active">주문내역</NavLink>
            </div>
        </div>
        
    );
};

export default Header;