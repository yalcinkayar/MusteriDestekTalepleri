import React, {useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { API_URL } from '../../config/app';
import { inject, observer } from 'mobx-react';

const Register = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                    navigate("/login");
            }
        }
    },[]);
    const _handleSubmit = async(values, {setSubmitting})=>{
        await axios.post(`${API_URL}/api/auth/register`, {
                ...values
        }).then(async (result) => {
            const userData = {
                ...result.data
            };
            const appState = {
                isLoggedIn:true,
                user:userData
            }
            await props.AuthStore.save(appState);
            window.location.reload();
        })
        .catch((error)=>{
           /* console.log(error.response);
            console.log(error.request);
            console.log(error.message);*/
            setSubmitting(false);
            if(error.response){
                setErrors(error.response.data.errors);
            }else if(error.request){
                setError(error.request);
            }else{
                setError(error.message);
            }
        })
       // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` ;
    }

    let arr = [];

    Object.values(errors).forEach(value => {
        arr.push(value);
    })
    
    return (
        <div className="register-form">
            <div><span className='logo'>mTakip</span></div>
            {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
            {error != null && (<div className="alert alert-danger">{error}</div>)}

            <Formik initialValues={{
                name: '',
                email: '',
                password: ''
            }}
            onSubmit={_handleSubmit}
            validationSchema={Yup.object().shape({
                email: Yup.string().email("Email Formatı Hatalıdır").required('Email Zorunludur'),
                name: Yup.string().required('Ad Soyad Zorunludur'),
                password: Yup.string().required('Şifre Zorunludur')
            })
            }>{({values, 
                handleSubmit,
                handleBlur,
                handleChange,
                touched,
                errors,
                isValid,
                isSubmitting
                }) => (
                    <div>
                    <div className="form-group">
                        <label>Ad Soyad</label>
                        <input onBlur={handleBlur} onChange={handleChange} name="name" value={values.name} type="text" className='form-control' />
                        {(errors.name && touched.name) && <p>{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input onBlur={handleBlur} onChange={handleChange} name="email" value={values.email} type="email" className='form-control' />
                        {(errors.email && touched.email) && <p>{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onBlur={handleBlur} onChange={handleChange} name="password" value={values.password} type="password" className='form-control' />
                        {(errors.password && touched.password) && <p>{errors.password}</p>}
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <button onClick={handleSubmit} disabled={!isValid || isSubmitting} className='button'>Kayıt Ol</button>
                    </div>
                    </div>
            )}     
            </Formik>
            <Link to="/login">Giriş Yap</Link>
        </div>

    )
}

export default inject("AuthStore")(observer(Register));