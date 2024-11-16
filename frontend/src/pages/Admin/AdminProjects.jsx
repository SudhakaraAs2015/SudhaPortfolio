import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axiosInstance from "../../axiosInstance"; // Import the axios instance

function AdminProjects() {
  const dispatch = useDispatch();
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values) => {
    try {
      // Ensure technologies is a string before splitting
      const tempTechnologies =
        typeof values.technologies === "string"
          ? values.technologies.split(",").map((item) => item.trim())
          : values.technologies || []; // Fallback to an empty array if not defined

      values.technologies = tempTechnologies; // Set the processed technologies

      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axiosInstance.put("/update-projects", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axiosInstance.post("/add-projects", values);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        handleCancel(); // Close the modal and reset the form
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
      const response = await axiosInstance.delete("/delete-projects", {
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
            setSelectedItemForEdit(null); // Reset selected item for edit
            form.resetFields(); // Clear the form fields
            setShowAddEditModel(true); // Show the modal
          }}
        >
          Add Projects
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div
            key={project._id}
            className="shadow border p-5 border-grey-400 flex flex-col gap-5"
          >
            <h1 className="text-black font-bold text-xl pb-2">
              {project.title}
            </h1>
            <hr />
            <img src={project.image} alt={project.title} className="h-60 w-80 rounded" />
            <h1 className="mt-5">{project.description}</h1>
            <div className="flex justify-end gap-4 mt-5">
              <button
                className="bg-tertiary text-white px-5 py-2"
                onClick={async () => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this project?"
                  );
                  if (confirmed) {
                    await onDelete(project);
                  }
                }}
              >
                Delete
              </button>
              <button
                className="bg-sky-400 text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project); // Set the selected item for editing
                  setShowAddEditModel(true); // Show the modal
                  form.setFieldsValue({
                    ...project,
                    technologies: project.technologies.join(", "), // Convert array to string
                  }); // Set form values for editing
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
          onCancel={handleCancel} // Use the handleCancel function
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies?.join(", ") || "", // Initialize correctly
            }}
          >
            <Form.Item
              name="title"
              label="Project Title"
              rules={[{ required: true, message: "Please enter the project title!" }]}
            >
              <Input placeholder="Project Title" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: "Please enter the image URL!" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter the description!" }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <Input placeholder="Comma separated technologies (e.g. React, Node.js)" />
            </Form.Item>
            <Form.Item name="link" label="Project Link">
              <Input placeholder="Project Link (optional)" />
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

export default AdminProjects;
