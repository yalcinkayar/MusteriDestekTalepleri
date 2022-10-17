import React, {useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/app';
import { inject, observer } from 'mobx-react';

const Demand = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState(null);
    const navigate = useNavigate();

   /* useEffect(() => {
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                  //  navigate("/");
            }
        }
    },[]);*/

    const _handleSubmit = async(values, {setSubmitting, resetForm})=>{
        await axios.post(`${API_URL}/api/demand`, {
                ...values
        },{
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        }).then(async (result) => {
            if(result.data.success){
                resetForm({});
            }
        })
        .catch((error)=>{
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
        <Layout>
            <div className='container mt-3'>
            {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
            {error != null && (<div className="alert alert-danger">{error}</div>)}
            <div className='card'>
                <div className='card-header'>Talep Oluştur</div>
                <div className='card-body'>
            <Formik initialValues={{
                title: '',
                text: ''
            }}
            onSubmit={_handleSubmit}
            validationSchema={Yup.object().shape({
                title: Yup.string().required('Başlık Zorunludur'),
                text: Yup.string().required('Açıklama Zorunludur')
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
                    <div className='demand-form'>
                    <div className="form-group">
                        <label>Başlık</label>
                        <input onBlur={handleBlur} onChange={handleChange} name="title" value={values.title} type="text" className='form-control' />
                        {(errors.title && touched.title) && <p>{errors.title}</p>}
                    </div>
                    <div className="form-group">
                        <label>Açıklama</label>
                        <textarea onBlur={handleBlur} onChange={handleChange} name="text" value={values.email} type="email" className='form-control'></textarea>
                        {(errors.text && touched.text) && <p>{errors.text}</p>}
                    </div>
                
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <button onClick={handleSubmit} disabled={!isValid || isSubmitting} className='button'>Talebi Oluştur</button>
                    </div>
                    </div>
            )}     
            </Formik>
            </div>
            </div>
            </div>
        </Layout>
    )
}

export default inject("AuthStore")(observer(Demand));