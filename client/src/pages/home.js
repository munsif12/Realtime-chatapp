import React from 'react'
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Overlay from '../components/Overlay';
import useLoginRegStates from '../hooks/useLoginRegStates';


const Home = () => {
    const [
        activeTab, setactiveTab, showPassword, regFormData, loginFormData, regFormErr, loginFormErr,
        handleToggleShowPassword, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm
    ] = useLoginRegStates();


    return (
        <div className={`container ${activeTab} mainContainerLoginReg`} id='container'>
            <RegistrationForm
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
                regFormData={regFormData}
                regFormErr={regFormErr}
                handleChangeForBothLoginAndRegForm={handleChangeForBothLoginAndRegForm}
                submitBothLoginAndRegistrationForm={submitBothLoginAndRegistrationForm}
            />
            <LoginForm
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
                loginFormData={loginFormData}
                loginFormErr={loginFormErr}
                handleChangeForBothLoginAndRegForm={handleChangeForBothLoginAndRegForm}
                submitBothLoginAndRegistrationForm={submitBothLoginAndRegistrationForm}
            />
            <Overlay setactiveTab={setactiveTab} />
        </div>
    )
}

export default Home