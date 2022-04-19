import { useState } from "react";
import uploadImageToCloudinary from "../config/uploadImageToCloudnary";
import { login, register } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const useLoginRegStates = () => {
    const dispatch = useDispatch();

    const [activeTab, setactiveTab] = useState('right-panel-active');
    const [showPassword, setShowPassword] = useState(false)
    const [regFormData, setRegFormData] = useState({ name: '', email: '', password: '', profileImage: "https://www.jobz.pk/images/pics/2020-09/503889_1_81445.png" })
    const [loginFormData, setLoginFormData] = useState({ email: 'chatapp.demo@gmail.com', password: 'demo' })
    const [regFormErr, setRegFormErr] = useState({})
    const [loginFormErr, setLoginFormErr] = useState({})

    function handleToggleShowPassword() { setShowPassword(!showPassword) }
    function validateRegistrationForm() {
        let error = {}
        if (!regFormData.name) error.name = 'Name is required'
        if (!regFormData.email) error.email = 'Email is required'
        if (!regFormData.password) error.password = 'Password is required'
        setRegFormErr(error)
        return Object.keys(error).length > 0 ? false : true
    }
    function validateLoginForm() {
        let error = {}
        if (!loginFormData.email) error.email = 'Name is required'
        if (!loginFormData.password) error.password = 'Password is required'
        setLoginFormErr(error)
        return Object.keys(error).length > 0 ? false : true
    }
    async function submitBothLoginAndRegistrationForm(e) {
        e.preventDefault()
        if (activeTab === 'right-panel-active') {
            if (validateRegistrationForm()) {
                dispatch(register(regFormData))
            }
        }
        else {
            if (validateLoginForm()) {
                dispatch(login(loginFormData));
            }
        }
    }
    async function handleChangeForBothLoginAndRegForm(e) {
        if (activeTab === 'right-panel-active') {
            setRegFormErr({});
            if (e.target.name === "profileImage") {
                const file = e.target.files[0];
                if (file.size >= 5000000) {
                    alert("File size is too big")
                    return
                }
                if (file.type !== "image/jpeg" && file.type !== "image/png") {
                    alert("File type is not supported")
                    return
                }
                // upload image to cloudinary inseted of creating for my own using public api from codesaandbox
                const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/demo/image/upload';
                const CLOUDINARY_UPLOAD_PRESET = 'docs_upload_example_us_preset';
                const data = new FormData()
                data.append("file", file)
                data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
                const imageUrl = await uploadImageToCloudinary(CLOUDINARY_URL, data)
                setRegFormData({ ...regFormData, [e.target.name]: imageUrl })

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
        handleToggleShowPassword, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm,
    ];
};

export default useLoginRegStates;