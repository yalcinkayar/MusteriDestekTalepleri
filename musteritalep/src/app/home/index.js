import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/app';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = (props) => {

    const [data,setData] = useState([]);
    const [loading,setloading] = useState(true);

    useEffect(()=>{
        axios.get(`${API_URL}/api/demand`, {
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        }).then((res) => {
            if(res.data.success){
                setData(res.data.data);
                setloading(false);
            }else{

            }
        }).catch(e => {
            console.log(e);
        })
    }, []);

    if(loading){return <div>Yükleniyor</div>}
    return (<Layout>
                <div className="container mt-3">
                    <div className="card">
                        <div className="card-header">
                            <b>Taleplerim</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            {data.length == 0 && <li className="list-group-item">Aktif Talebiniz Bulunamadı</li>}
                            {data.length > 0 && data.map((item) => (
                                <Link style={{textDecoration: 'none'}} to={`/demand-detail/${item.id}`}>
                                    <li style={{backgroundColor : (item.status == 1) ?'#F44336' : 'white', color: (item.status == 1) ?'white' : 'black'}} className="list-group-item">
                                        {item.title}
                                        <span> ({item.count})</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
            )
}

export default inject("AuthStore")(observer(Home));