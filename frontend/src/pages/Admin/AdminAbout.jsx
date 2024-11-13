import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import  axios from 'axios'
import{ShowLoading,HideLoading} from '../../redux/rootSlice'

function AdminAbout() {
const dispatch = useDispatch();
  const {portfolioData} = useSelector((state=>state.root))
  const onFinish= async (values)=>{
    try{
      const tempSkills = values.skills.split(',')
      values.skills = tempSkills;
        dispatch(ShowLoading())
        const response = await axios.put('/api/sudhaportfolio/update-about',{
          ...values,
          _id: portfolioData.about._id,
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
      <Form onFinish={onFinish} layout="vertical" initialValues={{
        ...portfolioData.about,
        skills: portfolioData.about.skills.join(' , ')
      }
        }>
      <Form.Item name="lottieURL" label="Lottie URL">
          <input placeholder="Lottie URl"/>
        </Form.Item>
        <Form.Item name="Aboutdescription" label="Aboutdescription">
          <textarea placeholder="Aboutdescription"/>
        </Form.Item>
        <Form.Item name="skills" label="skills">
          <textarea placeholder="skills"/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-3 bg-secondary text-white rounded-sm" type="submit">SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
