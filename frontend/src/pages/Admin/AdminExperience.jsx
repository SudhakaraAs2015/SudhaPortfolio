import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axiosInstance from "../../axiosInstance"; // Import axiosInstance

function AdminExperience() {
  const dispatch = useDispatch();
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const { educationandExperiences } = portfolioData;

  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      
      if (selectedItemForEdit) {
        // Update experience
        response = await axiosInstance.post("/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        // Add new experience
        response = await axiosInstance.post("/add-experience", values);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        handleCancel(); // Close modal and reset form
        dispatch(ReloadData(true)); // Reload data
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
      const response = await axiosInstance.delete("/delete-experience", {
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
    setSelectedItemForEdit(null); // Reset selected item for edit
    form.resetFields(); // Reset the form fields
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-black px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null); // Reset selected item for new entry
            setShowAddEditModel(true); // Open the modal for adding new experience
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {educationandExperiences.map((experience) => (
          <div
            key={experience._id}
            className="shadow border p-5 border-grey-400 flex flex-col"
          >
            <h1 className="text-black font-bold text-xl pb-2">{experience.period}</h1>
            <hr />
            <h1 className="pb-2">{experience.organization}</h1>
            <h1 className="pb-2">{experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-4 mt-5">
              <button
                className="bg-tertiary text-white px-5 py-2"
                onClick={async () => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this experience?"
                  );
                  if (confirmed) {
                    await onDelete(experience);
                  }
                }}
              >
                Delete
              </button>
              <button
                className="bg-sky-400 text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(experience); // Set experience for editing
                  setShowAddEditModel(true); // Show modal for editing
                  form.setFieldsValue(experience); // Populate the form with selected experience data
                }}
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
          title={selectedItemForEdit ? "Edit Education and Experience" : "Add Education and Experience"}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit || {}} // Initialize the form values
          >
            <Form.Item
              name="organization"
              label="Organization"
              rules={[{ required: true, message: "Please input the organization!" }]}
            >
              <Input placeholder="Organization" />
            </Form.Item>

            <Form.Item
              name="period"
              label="Period"
              rules={[{ required: true, message: "Please input the period!" }]}
            >
              <Input placeholder="Period" />
            </Form.Item>

            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                type="button"
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

export default AdminExperience;
