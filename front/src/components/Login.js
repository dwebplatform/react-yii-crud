import React ,{useEffect, useState} from 'react';

import {Form ,Input, Button,Layout} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const LoginPage =()=>{
    const [formData,setFormData] = useState({
        name:'',
        email:''
    });
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData)
    }
    let body = new FormData();
    body.append('name',"Bob");


    body.append('age',23);

    useEffect(() => {
    fetch('http://localhost:8080/car/postcar/',
    {
        method:'POST',
        body:body,

    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    }, []);
    return (
        <Layout> 
    
     <Sider>Sider</Sider>
    <Content>
    <Form >
            <Input type="text"
            value={formData.name}
            onChange={(e)=>{
                setFormData({name:e.target.value})
            }}
            />
    <Input type="text"
            value={formData.email}
            onChange={(e)=>{
                setFormData({email:e.target.value})
            }}
            />
            <Button onClick={(e)=>handleSubmit(e)}>Отправить</Button>
    </Form>

    </Content>
    <Sider>Sider</Sider>
    </Layout>);
}