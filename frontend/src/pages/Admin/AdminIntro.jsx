import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../axiosInstance';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      // Use the axios instance here
      const response = await axiosInstance.put('/update-intro', {
        ...values,
        _id: portfolioData.intro._id,
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message || 'An error occurred'); // Default error message
    }
  };

  return (
    <div>
      <Form 
        onFinish={onFinish} 
        layout="vertical" 
        initialValues={portfolioData.intro} 
      >
        <Form.Item 
          name="greetText" 
          label="Greet Text"
          rules={[{ required: true, message: 'Please input the greet text!' }]} // Added required validation
        >
          <Input placeholder="Greet Text" />
        </Form.Item>

        <Form.Item 
          name="introText" 
          label="Intro Text"
          rules={[{ required: true, message: 'Please input the intro text!' }]} // Added required validation
        >
          <Input placeholder="Intro Text" />
        </Form.Item>

        <Form.Item 
          name="name" 
          label="Full Name"
          rules={[{ required: true, message: 'Please input the full name!' }]} // Added required validation
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item 
          name="description" 
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button 
            className="px-10 py-3 bg-secondary text-white rounded-sm" 
            type="submit"
          >
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
