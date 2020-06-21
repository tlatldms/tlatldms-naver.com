import React from 'react';
import { Redirect } from 'react-router-dom';

const logged = true;

const MyPage = () => {
    return (
        <div>
            {
                !logged && <Redirect to="/login"/>
            }
            식당 리뷰 확인
        </div>
    );
};

export default MyPage;