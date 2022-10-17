import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from '../theme/Layout';

const Profile = () => {
    const _handleSubmit = (values) =>{

    };
    return (<Layout>       
            <div className="register-form">
            <div><span className='logo'>mTakip</span></div>
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
                        <button onClick={handleSubmit} disabled={!isValid || isSubmitting} className='button'>Güncelle</button>
                    </div>
                    </div>
            )}     
            </Formik>
        </div>   

    </Layout>)
}

export default Profile;