import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";  
import { ShowLoading, HideLoading } from '../../redux/rootSlice';

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(','); 
      values.skills = tempSkills;

      dispatch(ShowLoading());
      const response = await axiosInstance.put('/update-about', {
        ...values,
        _id: portfolioData.about._id,
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(', '),  // Format skills array as comma-separated string
        }}
      >
        <Form.Item
          name="lottieURL"
          label="Lottie URL"
          rules={[{ required: true, message: "Please input the Lottie URL!" }]}
        >
          <Input placeholder="Lottie URL" />
        </Form.Item>

        <Form.Item
          name="Aboutdescription"
          label="About Description"
          rules={[{ required: true, message: "Please input the about description!" }]}
        >
          <Input.TextArea placeholder="About Description" />
        </Form.Item>

        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: "Please input your skills!" }]}
        >
          <Input.TextArea placeholder="Skills (comma separated)" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button className="px-10 py-3 bg-secondary text-white rounded-sm" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
