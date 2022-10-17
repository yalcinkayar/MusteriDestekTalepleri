import React, {useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { API_URL } from '../../config/app';
import { inject, observer } from 'mobx-react';

const Login = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState(null);   
    const navigate = useNavigate();
   // const [state,setState] = useState(null);
    
    useEffect(() => {
       // console.log(props.AuthStore.appState.isLoggedIn);
        
        /*if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
              
                //return props.history.push('/');
            }
        }*/
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                    navigate("/");
            }
        }
        
    },[]);

    

    const _handleSubmit = async(values, {setSubmitting})=>{
          await axios.post(`${API_URL}/api/auth/login`, {
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
                setSubmitting(false);
                if(error.response){
                    if(error.response.data.errors){
                        setErrors(error.response.data.errors);
                    }else{
                        setError(error.response.data.message);
                    }
                }else if(error.request){
                    setError(error.request);
                }else{
                    setError(error.message);
                }
            })
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
                email: '',
                password: ''
            }}
            onSubmit={_handleSubmit}
            validationSchema={Yup.object().shape({
                email: Yup.string().email("Email Formatı Hatalıdır").required('Email Zorunludur'),
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
                        <button type="button" onClick={handleSubmit} disabled={!isValid || isSubmitting} className='button'>Giriş Yap</button>
                    </div>
                    </div>
            )}     
            </Formik>
            <Link to="/register">Kayıt Ol</Link>
        </div>

    )
}

export default inject("AuthStore")(observer(Login));