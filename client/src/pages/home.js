import React, { useEffect } from 'react'
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Overlay from '../components/Overlay';
import useLoginRegStates from '../hooks/useLoginRegStates';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError } from '../redux/slices/auth';


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        activeTab, updateFormView,
    } = useLoginRegStates();
    const { isLoggedIn } = useSelector(state => state.auth);

    useEffect(() => {
        const exists = localStorage.getItem("activeForm")
        localStorage.setItem('activeForm', exists ? exists : "left-panel-active");
    }, [activeTab]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(ClearError());
            navigate('/chat')
        }
    }, [isLoggedIn, dispatch, navigate]);

    return (
        <div className="auth">
            <div className={`container ${activeTab} mainContainerLoginReg`} id='container'>
                <RegistrationForm />
                <LoginForm />
                <Overlay updateFormView={updateFormView} />
            </div>
        </div>
    )
}

export default Home