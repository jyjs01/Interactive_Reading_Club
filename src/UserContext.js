// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// UserContext 생성
const UserContext = createContext();

// 사용자 정보를 제공하는 컴포넌트
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// UserContext를 사용하는 커스텀 훅
export function useUser() {
    return useContext(UserContext);
}

export default UserContext;
