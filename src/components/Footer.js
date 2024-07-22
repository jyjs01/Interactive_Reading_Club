import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
    position: relative;
    bottom: 0;
    width: inherit;
    text-align: center;
    font-size: 15pt;
    background-color: #E1E1E1;
    border-radius: 5px;
`;

function Footer() {
    return (
        <Foot>
            © <a href='https://kr.123rf.com/profile_rawpixel'>rawpixel</a> <a href='https://www.123rf.com/free-images/'>123RF Free Images</a> 메인테마
            <p>© <a href='https://kr.123rf.com/profile_captainvector'>captainvector</a>, <a href='https://www.123rf.com/free-images/'>123RF Free Images</a> 메인로고</p>
            <p>© <a href='https://kr.123rf.com/profile_rawpixel'>rawpixel</a>, <a href='https://www.123rf.com/free-images/'>123RF Free Images</a> 소개 사진1</p>
            © <a href='https://kr.123rf.com/profile_rawpixel'>rawpixel</a>, <a href='https://www.123rf.com/free-images/'>123RF Free Images</a> 소개 사진2
        </Foot>
    )
}

export default Footer;