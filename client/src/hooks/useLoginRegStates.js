import { useState } from "react";

const useLoginRegStates = (url) => {
    const [activeTab, setactiveTab] = useState('right-panel-active');
    const [showPassword, setShowPassword] = useState(false)
    const [regFormData, setRegFormData] = useState({ name: '', email: '', password: '', profileImage: '' })
    const [loginFormData, setLoginFormData] = useState({ name: '', password: '' })
    const [regFormErr, setRegFormErr] = useState({})
    const [loginFormErr, setLoginFormErr] = useState({})

    const handleToggleShowPassword = () => setShowPassword(!showPassword);
    function validateRegistrationForm() {
        let error = {}
        if (!regFormData.name) error.name = 'Name is required'
        if (!regFormData.email) error.email = 'Email is required'
        if (!regFormData.password) error.password = 'Password is required'
        if (!regFormData.profileImage) error.profileImage = 'Profile image is required'
        setRegFormErr(error)
        return Object.keys(error).length > 0 ? false : true
    }
    function validateLoginForm() {
        let error = {}
        if (!loginFormData.name) error.name = 'Name is required'
        if (!loginFormData.password) error.password = 'Password is required'
        setLoginFormErr(error)
        return Object.keys(error).length > 0 ? false : true
    }
    function submitBothLoginAndRegistrationForm(e) {
        e.preventDefault()
        if (activeTab === 'right-panel-active') {
            if (validateRegistrationForm()) {
                console.log(regFormData)
            }
            else console.log(regFormErr)
        }
        else {
            if (validateLoginForm()) {
                console.log(loginFormData)
            } else console.log(loginFormErr)
        }
    }
    function handleChangeForBothLoginAndRegForm(e) {
        if (activeTab === 'right-panel-active') {
            setRegFormErr({});
            if (e.target.name === "profileImage") {
                setRegFormData({ ...regFormData, [e.target.name]: e.target.files[0] })
            } else {
                setRegFormData({ ...regFormData, [e.target.name]: e.target.value })
            }
        }
        else {
            setLoginFormErr({});
            setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
        }
    }



    return [
        activeTab, setactiveTab, showPassword, regFormData, loginFormData, regFormErr, loginFormErr,
        handleToggleShowPassword, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm
    ];
};

export default useLoginRegStates;