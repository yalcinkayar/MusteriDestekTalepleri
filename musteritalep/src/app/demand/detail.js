import React, {useState,useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/app';
import { inject, observer } from 'mobx-react';

const Demand = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState(null);
    const [messages,setMessages] = useState([]);
    const [demand,setDemand] = useState({});
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/api/demand/${id}`, {
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        }).then((res) => {
            console.log(res);
            if(!res.data.success){
                navigate("/");
            }
            setDemand(res.data.demand);
            setMessages(res.data.messages);
            setLoading(false);
        }).catch(e => {
                  console.log(e);
                  navigate("/");
        })
    },[]);

     /*if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                  //  navigate("/");
            }
        }*/

    const _handleSubmit = async(values, {setSubmitting, resetForm})=>{
        await axios.post(`${API_URL}/api/demand/message`, {
                ...values,
                id
        },{
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        }).then(async (result) => {
            if(result.data.success){
                resetForm({});
                setMessages([...result.data.messages])
            }else{
                alert(result.data.message);
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
    
    if(loading){return <div>Yükleniyor</div>}
    return (
        <Layout>
            <div className='container mt-3'>
            {arr.length != 0 && arr.map((item) => <div className="alert alert-danger">{item}</div>)}
            {error != null && (<div className="alert alert-danger">{error}</div>)}
            <div className='card'>
                <div className='card-header'>{demand.title}</div>
                <div className='card-body'>
                <div className='demand-form'>
                    <div className="form-group">
                        <p> 
                            Talep Durumu: {demand.statusText} <br/>
                            {demand.text}
                        <br/>
                        <small>{demand.date}</small>
                        </p>
                    </div>
                </div> 
                </div>
            </div>
            <div className='card'>
            <div className='mt-2 mb-2'>{messages?.map((item) => (
                <li className='list-group-item mb-1'>
                    <b>{item.user.name}</b> <br/>
                    {item.text} <br/>
                    <small>{item.date}</small>
                </li>
            ))}</div>
            </div>
            {demand.status == 0 &&
            <div className='card'>
                <div className='card-header'>Açıklama Gönder</div>
                <div className='card-body'>    
            <Formik initialValues={{
                text: ''
            }}
            onSubmit={_handleSubmit}
            validationSchema={Yup.object().shape({
                text: Yup.string().required('Mesaj Zorunludur')
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
                        <label>Mesajınız</label>
                        <textarea onBlur={handleBlur} onChange={handleChange} name="text" value={values.email} type="email" className='form-control'></textarea>
                        {(errors.text && touched.text) && <p>{errors.text}</p>}
                    </div>
                
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <button onClick={handleSubmit} disabled={!isValid || isSubmitting} className='button'>Gönder</button>
                    </div>
                    </div>
            )}     
            </Formik>
            </div>
            </div>
             }
            </div>
        </Layout>
    )
}

export default inject("AuthStore")(observer(Demand));