import React from 'react'
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Overlay from '../components/Overlay';
import useLoginRegStates from '../hooks/useLoginRegStates';


const Home = () => {
    const [
        isLoading, activeTab, setactiveTab, showPassword, regFormData, loginFormData, regFormErr, loginFormErr, DbErrors,
        handleToggleShowPassword, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm
    ] = useLoginRegStates();


    return (
        <div className={`container ${activeTab} mainContainerLoginReg`} id='container'>
            <RegistrationForm
                isLoading={isLoading}
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
                regFormData={regFormData}
                regFormErr={regFormErr}
                DbErrors={DbErrors}
                handleChangeForBothLoginAndRegForm={handleChangeForBothLoginAndRegForm}
                submitBothLoginAndRegistrationForm={submitBothLoginAndRegistrationForm}
            />
            <LoginForm
                isLoading={isLoading}
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
                loginFormData={loginFormData}
                loginFormErr={loginFormErr}
                DbErrors={DbErrors}
                handleChangeForBothLoginAndRegForm={handleChangeForBothLoginAndRegForm}
                submitBothLoginAndRegistrationForm={submitBothLoginAndRegistrationForm}
            />
            <Overlay setactiveTab={setactiveTab} />
        </div>
    )
}

export default Home