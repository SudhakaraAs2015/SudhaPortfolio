import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { ShowLoading, HideLoading } from '../../redux/rootSlice';

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      
      const response = await axiosInstance.put('/update-contact', {
        ...values,
        _id: portfolioData.contact._id,  
      });

      dispatch(HideLoading());

      // Show success or error message based on the response
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      // Handle any API errors
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form 
        onFinish={onFinish} 
        layout="vertical" 
        initialValues={portfolioData.contact}  // Set initial form values from Redux state
      >
        <Form.Item 
          name="name" 
          label="Full Name" 
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        
        <Form.Item 
          name="email" 
          label="Email" 
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        
        <Form.Item 
          name="mobile" 
          label="Mobile" 
          rules={[{ required: true, message: "Please enter your mobile number!" }]}
        >
          <Input placeholder="Mobile" />
        </Form.Item>
        
        <Form.Item 
          name="address" 
          label="Address" 
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <Input.TextArea placeholder="Address" />
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

export default AdminContact;
