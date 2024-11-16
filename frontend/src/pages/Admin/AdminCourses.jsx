import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axiosInstance from "../../axiosInstance"; 

function AdminCourses() {
  const dispatch = useDispatch();
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;

  const [form] = Form.useForm(); 

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      
      if (selectedItemForEdit) {
        response = await axiosInstance.put("/update-courses", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axiosInstance.post("/add-courses", values);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        handleCancel(); 
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.delete("/delete-courses", {
        data: { _id: item._id },
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setShowAddEditModel(false);
    setSelectedItemForEdit(null); 
    form.resetFields(); 
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-black px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null); 
            form.resetFields(); 
            setShowAddEditModel(true); 
          }}
        >
          Add Courses
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow border p-5 border-grey-400 flex flex-col gap-5"
          >
            <h1 className="text-black font-bold text-xl pb-2">{course.title}</h1>
            <hr />
            <img src={course.image} alt="" className="h-60 w-80 rounded" />
            <h1 className="mt-5">{course.description}</h1>
            <div className="flex justify-end gap-4 mt-5">
              <button
                className="bg-tertiary text-white px-5 py-2"
                onClick={async () => {
                  const confirmed = window.confirm("Are you sure you want to delete this course?");
                  if (confirmed) {
                    await onDelete(course);
                  }
                }}
                aria-label={`Delete course: ${course.title}`}
              >
                Delete
              </button>
              <button
                className="bg-sky-400 text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(course); // Set the selected item
                  setShowAddEditModel(true); // Show the modal
                  form.setFieldsValue({
                    ...course,
                    technologies: course.technologies?.join(", ") || "", // Convert array to string
                  }); // Set form values for editing
                }}
                aria-label={`Edit course: ${course.title}`}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModel && (
        <Modal
          visible={showAddEditModel}
          footer={null}
          onCancel={handleCancel}
          title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              title: "",
              image: "",
              description: "",
              technologies: "", // Start with empty string for new entries
            }}
          >
            <Form.Item
              name="title"
              label="Course Title"
              rules={[{ required: true, message: "Please Enter The Course Title!" }]}
            >
              <Input placeholder="Course Title" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: "Please Enter The Image URL" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input the description!" }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                type="button" // Use type="button" to prevent form submission
                className="border-black text-black px-5 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-lime-950 text-white px-4 py-1"
                type="submit"
              >
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminCourses;
