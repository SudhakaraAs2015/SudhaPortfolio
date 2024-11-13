import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import  axios from 'axios'
import{ShowLoading,HideLoading} from '../../redux/rootSlice'

function AdminIntro() {
const dispatch = useDispatch();
  const {portfolioData} = useSelector((state=>state.root))
  const onFinish= async (values)=>{
    try{
        dispatch(ShowLoading())
        const response = await axios.put('/api/sudhaportfolio/update-intro',{
          ...values,
          _id: portfolioData.intro._id,
        });
        dispatch(HideLoading())
        if(response.data.success){
          message.success(response.data.message)
        }
        else{
          message.error(response.data.message)
        }
    }
    catch(error){
      dispatch(HideLoading())
      message.error(error.message) 
    }
    
  }
  return (
    <div>
      <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData.intro}>
        <Form.Item name="greetText" label="Greet Text">
          <input placeholder="Greet Text" />
        </Form.Item>
        <Form.Item name="introText" label="Intro Text">
          <input placeholder="Intro Text"/>
        </Form.Item>
        <Form.Item name="name" label="Full Name">
          <input placeholder="Full Name"/>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea placeholder="Description"/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-3 bg-secondary text-white rounded-sm" type="submit">SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
