import React,{useState,createContext} from 'react';
const LoginContext=createContext();
function LoginProvider({children}){
    const [userName,setUserName]=useState('');
    const [isLogin,setIsLogin]=useState(true);  

const handleIsLogin=(logged)=>{
    setIsLogin(logged)
}    
const handleUserName=(username)=>{
    setUserName(username)
}
const valueContext={
    handleIsLogin,
    handleUserName,
    isLogin,
    userName,

}

return (
<LoginContext.Provider  value={valueContext}>
    {children}
</LoginContext.Provider>
)
} 
export {LoginProvider};
export default LoginContext;