import React,{ useEffect, useReducer, useState} from "react";
import style from './App.css'
const pass={
  password:'a',
  repassword:'v'
}
const initialState = {
  step:1,
  step_1:{
  name:'',
  surname:'',
  email:''
  },
  step_2:{
    city:'',
    street:'',
    house:''
  },
  step_3:{
    img:'https://forakyafrica-drilling.com/wp-content/uploads/2020/12/man-300x300-1.png'
  },
  step_4:{
    password:'0',
    repedPassword:'1'
  }
}


const reducer = (state,action)=>{
  switch(action.type){
    case 'NEXT_STEP':
      return {
        ...state,
        step:state.step+1,
      }
    case 'PREV_STEP':
      return{
        ...state,
        step:state.step - 1,
      }
    case 'CAHGE_STEP_1':
      return{
        ...state,
        step_1:{...state.step_1,...action.payload}
      }
      case 'CAHGE_STEP_2':
      return{
        ...state,
        step_2:{...state.step_2,...action.payload}
      }
      case 'CAHGE_STEP_3':
      return{
        ...state,
        step_3:{...state.step_3,...action.payload}
      }
      case 'CAHGE_STEP_4':
        return{
          ...state,
          step_4:{...state.step_4,...action.payload}
        }
      default:
        return state;
  }
}


const Step1=({dispatch,values})=>{
  const handelChange=(e)=>{
    const {name,value}=e.target;
    dispatch({type:'CAHGE_STEP_1',payload:{[name]:value}})

  }
  return(
    <div>
      <label>
        Имя
        <input value={values.name} type="text" name="name" onChange={handelChange}/>
      </label>
      <label>
        Фамилия
        <input value={values.surname} type="text" name="surname" onChange={handelChange}/>
      </label>
      <label>
        Email 
        <input value={values.email} type="text" name="email" onChange={handelChange}/>
      </label>
    </div>
  )
}

const Step2=({dispatch,values})=>{
  const handelChange=(e)=>{
    const {name,value}=e.target;
    dispatch({type:'CAHGE_STEP_2',payload:{[name]:value}})

  }
  return(
    <div>
      <label>
        Город
        <input value={values.city} type="text" name="city" onChange={handelChange}></input>
      </label>
      <label>
        Улица
        <input value={values.address} type="text" name="street" onChange={handelChange}></input>
      </label>
      <label>
        Дом
        <input value={values.address} type="text" name="house" onChange={handelChange}></input>
      </label>
      
    </div>
  )
}

const Step3=({dispatch,value})=>{
  const [imgUrl,setImgUrl]=useState(value)

  useEffect(()=>{
    return ()=>dispatch({type:'CAHGE_STEP_3',payload:{img:imgUrl}})
  })
  const handelChange=(e)=>{
    const file=e.target.files[0];
    const fileReader=new FileReader();

    fileReader.onload=()=>setImgUrl(fileReader.result)
    fileReader.readAsDataURL(file)
    
  }
  
  return(
    <div>
        <img src={imgUrl} all="#"/>
        <input  type="file" accept=".jpg,.png,.jpeg"  name="img"  onChange={handelChange} />
      
      
    </div>
  )
}
const Step4=({dispatch,value,state,handelShow})=>{

  

  const handelChangeOne=(e)=>{
    const {name,value}=e.target;
    dispatch({type: 'CAHGE_STEP_4' ,payload:{[name]:value}});
    pass.password=value;
    
  }
  const handelChangeTwo=(e)=>{
    const {name,value}=e.target;
    dispatch({type: 'CAHGE_STEP_4' ,payload:{[name]:value}});
    
    pass.repassword=value;
  }
   useEffect (()=> {
     console.log("SHOW")
     if(state.step_4.password==state.step_4.repedPassword){
       return handelShow(true)
    }else{
      return handelShow(false)
    }
  },[state])
    
    
  
  return(
    <div>
      
      <label >Пароль  <input type="password" name="password" onChange={handelChangeOne}></input></label>
      <label>Повторить пароль <input type="password" name="repedPassword" onChange={handelChangeTwo}></input></label>
      
    </div>
  )
}
const Step5=({state})=>{
  
  return(
    <div>
      <img src={state.step_3.img}/>
      <p>Имя:{state.step_1.name}</p>
      <p>Фамилия:{state.step_1.surname}</p>
      <p>Email:{state.step_1.email}</p>
      <p>Город:{state.step_2.city}</p>
      <p>Улица:{state.step_2.street}</p>
      <p>Дом:{state.step_2.house}</p>
      
    </div>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  const [show,setShow]=useState(false);
  
 const handelShow=(a)=>{
   setShow(a)
 }
  





  const handelNextStep=()=>{
    dispatch({type:"NEXT_STEP"})
  }
  const handelPrevStep =()=>{
    dispatch({type:"PREV_STEP"})
  }
  return (
    <div className="cart">
      <h3>Шаг:{state.step}</h3>
      <div className="step"> 
        {state.step===1 && <Step1 dispatch={dispatch} values={state.step_1}/>}
        {state.step===2 && <Step2 dispatch={dispatch} values={state.step_2}/>}
        {state.step===3 && <Step3 dispatch={dispatch} value={state.step_3.img}/>}
        {state.step===4 && <Step4  handelShow={handelShow} dispatch={dispatch} value={state.step_4} state={state}/>}
        {state.step===5 && <Step5 state={state}/>}
      </div>
      <footer className="button"> 
        {state.step>1&& state.step<5 &&<button onClick={handelPrevStep}>Previous</button>}
        {state.step<4 && <button onClick={handelNextStep}>Next</button>}
        {state.step ===4  && <button disabled={!show} onClick={ handelNextStep }> Submit</button>}
      </footer>
    </div>
  );
}

export default App;
