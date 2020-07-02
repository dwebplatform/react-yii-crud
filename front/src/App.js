import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Form, Spinner,Alert } from 'react-bootstrap';
import { LoginPage } from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

const API_URL = '//localhost:8080';
// Кнопка начала редактирования
const StarteditButton = ({ startRedactionHandler, item }) => {
  return (

    <Button variant="warning" style={{
      textAlign: 'center'
    }}
      onClick={(e) => { startRedactionHandler(item) }}
    >
      <Container>

        отредактировать
        </Container>
    </Button>

  )
}
// Кнопка завершения редактирования
const FinisheditButton =({children})=>{
      return (
        <Button variant="outline-warning" style={{
          textAlign: 'center'
        }}
          onClick={(e) => {children()}}
        >
          <Container>
            Заверить
            </Container>
        </Button>
      )
}


function isRedacted(redactedId, elem) {
  return redactedId === elem.id;
}

export const App = () => {

  const [allPersons, setAllPersons] =useState([]);
  const [error,setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedData, setAddedData] = useState({
    name:'',
    age:''
  });



  

  useEffect(()=>{
    setLoading(true);

    fetch(`${API_URL}/person/api/all`)
    .then(res=>res.json())
    .then((data)=>{
      setLoading(false);
      if(!data.error){
        setAllPersons(data.body);
      }
      else {
        setError(true);
      } 
    })
  },[]);
  

  const [redactedData, setRedactedData] = useState({
    id: null,
    name: '',
    age: ''
  });




  const handleRedactChange = (e) => {
    let key = e.target.name;
    let val = e.target.value;

    setRedactedData({
      ...redactedData,
      [key]: val
    });
  };

  const startRedaction = (redacted_element) => {
    setRedactedData({
      ...redactedData,
      id: redacted_element.id,
      name: redacted_element.name,
      age: redacted_element.age
    });
  }



  const handleAddedChange=(e)=>{
    let key = e.target.name;
    let val = e.target.value;
    setAddedData({
      ...addedData,
      [key]:val
    });
    
  }

// функция отвечающая за добавление нового персонажа
  const addHandler =(e)=>{
    e.preventDefault();
    let added_person = new FormData();
    added_person.append('name',addedData.name);
    added_person.append('age',addedData.age);


    fetch(`${API_URL}/person/api/add`,{
      method:'POST',
      body:added_person,

    }).then(res=>res.json())
    .then(data=>{console.log(data);
      document.location.reload();
    });

  }



  const finishRedaction = () => {

    let finalData = new FormData();
    finalData.append('id',redactedData.id);
    finalData.append('name',redactedData.name);
    finalData.append('age',redactedData.age);
    
    
    fetch(`${API_URL}/person/api/update`,
    {
      method:'POST',
      body: finalData,
      
    })
    .then(res=>res.json())
    .then((data)=>{
      document.location.reload();
      console.log(data);
    })
    
  }

// обработчик кнопки удалить
    const deleteHandler=(elem)=>{
      let deleted_data = new FormData();
      deleted_data.append('id',elem.id);
      fetch(`${API_URL}/person/api/delete`,{
        method:'POST',
        body: deleted_data
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        document.location.reload();
      });

    }

  return (
    <Container>
       
        { loading && <div style={{
          
          width:'100%',
          height:'100vh',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
         }}>
        <Spinner
          
        animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      
      </div>}
    { !loading &&<Container style={{
      display:'flex'
    }}> 
            <Form style={{
              margin:'10px 20px'
            }}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Имя:</Form.Label>
                      <Form.Control name="name"
                      value={addedData.name}
                      onChange={(e)=>handleAddedChange(e)}
                      type="text" 
                      placeholder="" />
                      
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Возраст:</Form.Label>
                      <Form.Control 
                            name="age"
                            value={addedData.age}
                            onChange={(e)=>handleAddedChange(e)}
                      type="text" placeholder="" />

                    </Form.Group>
                      <Button onClick={addHandler}>Добавить </Button>
            </Form>
      <Table bordered variant="dark">
      
      <thead>
        <tr>
          <th>#</th>
          <th>Имя </th>
          <th>Возраст</th>
          <th colSpan="2">Редактировать</th>
        </tr>
      </thead>

      <tbody>
      {
          error && <tr>
            <td  colSpan="5"><Alert style={{
            width:'100%'
          }} variant="danger">
            Произошла ошибка
          </Alert>
          </td>
          </tr>}
         {!error && allPersons.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Container>
                    {
                      isRedacted(redactedData.id, item) ?
                        <Form.Control type="text"
                          name="name"
                          value={redactedData.name}
                          onChange={handleRedactChange}
                        /> : item.name
                    }
                  </Container>
                </td>
                <td>{
                  <Container>
                    {
                      isRedacted(redactedData.id, item) ?
                        <Form.Control type="text"
                          name="age"
                          value={redactedData.age}
                          onChange={handleRedactChange}
                        /> : item.age
                    }
                  </Container>}</td>
                <td style={{
                  textAlign: 'center'
                }}>
                  {
                    !isRedacted(redactedData.id, item) && <StarteditButton
                      item={item}
                      startRedactionHandler={startRedaction}
                    />
                  }
                  {
                    isRedacted(redactedData.id, item) &&(
                      <FinisheditButton>
                        {()=>{
                          finishRedaction();
                        }}
                      </FinisheditButton>
                    )
                  }


                </td>
                <td style={{
                  textAlign: 'center'
                }}>
                  <Button variant="danger" style={{
                    textAlign: 'center'
                  }}
                  onClick={(e)=>{
                    deleteHandler(item)
                  }}
                  >
                    <Container>
                      X
            </Container>
                  </Button>
                </td>
              </tr>);
          })
        }


      </tbody>
    </Table>
    </Container>
    }
    </Container>
  )
}

