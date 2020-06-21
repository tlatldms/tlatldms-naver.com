import React from 'react';

const Home = ({history}) => {
    return (
        <div>
            <h1>GPS를 통해 식당 찾기</h1>
            <button onClick={()=>{history.push('/posts')}}>
                확정 식당 누르기
            </button>
        </div>
    );
};

export default Home;