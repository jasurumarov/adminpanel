import React, { useEffect, useState, useRef } from 'react';
import { useGetInputValue } from '../../../hooks/useGetInputValue';
import { useDeleteBlogMutation, useGetBlogsQuery, useUpdateBlogMutation } from '../../../context/api/blogApi';
import { toast } from 'react-toastify';
import Model from '../../../components/model/Model';

const ManageProduct = () => {
    // states
    const [editModel, setEditModel] = useState(false);
    const [editModelData, setEditModelData] = useState(null);
    const fileInputRef = useRef(null);

    // fetches
    const { data, isLoading } = useGetBlogsQuery();
    const [deleteBlog, { isError, isLoading: isDeleteLoading, isSuccess }] = useDeleteBlogMutation();
    const [updateBlog, { isError: updatedIsSuccess, updatedIsLoading }] = useUpdateBlogMutation();

    // initial state for reset the input fields
    const initialState = {
        title: '',
        text: '',
        image: ''
    };

    // useEffects for knowing the result
    useEffect(() => {
        if (isSuccess) {
            toast.warn('Successfully deleted');
        }
    }, [isSuccess]);
    useEffect(() => {
        if (isError) {
            toast.error('Error in deleting');
        }
    }, [isError]);
    const handleDelete = (id) => {
        if (window.confirm('Are you sure')) {
            deleteBlog(id);
        }
    };

    // formdata for taking values of input easily
    const { formData, setFormData, handleChange } = useGetInputValue(initialState);
    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedFormData = new FormData();
        updatedFormData.append('_id', editModelData._id);
        updatedFormData.append('title', formData.title);
        updatedFormData.append('text', formData.text);

        const imageFile = fileInputRef.current.files[0];
        if (imageFile) {
            updatedFormData.append('image', imageFile);
        }

        updateBlog(updatedFormData);
        setEditModel(false)
    };

    useEffect(() => {
        if (updatedIsSuccess) {
            toast.success('Product updated');
            setEditModel(false);
        }
    }, [updatedIsSuccess]);
    useEffect(() => {
        if (editModelData) {
            setFormData({
                title: editModelData.title,
                text: editModelData.text,
                image: editModelData.image
            });
        }
    }, [editModelData, setFormData]);

    const blog = data?.blogs?.map(blog => (
        <div className='blog' key={blog._id}>
            <span>
                <img src={`http://95.130.227.52:3002/${blog.image}`} alt='Blog Image' />
            </span>
            <div className='blog-title'>
                <div>
                    <h4>{blog?.title}</h4>
                    <p>{blog?.text}</p>
                </div>
                <div>
                    <button disabled={isDeleteLoading} onClick={() => handleDelete(blog._id)}>{isDeleteLoading ? "Loading..." : "Delete"}</button>
                    <button onClick={() => {
                        setEditModel(true);
                        setEditModelData(blog);
                    }}>Edit</button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='manage-product'>
            <h3>Manage blog</h3>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <article>{blog}</article>
            }
            {
                editModel && (
                    <Model close={setEditModel}>
                        <div className='create-product'>
                            <h3>Update blog</h3>
                            <form onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={formData.title}
                                        id='title'
                                        name='title'
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Text</label>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={formData.text}
                                        id='text'
                                        name='text'
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    {editModelData && (
                                        <img
                                            src={`http://95.130.227.52:3002/${editModelData.image}`}
                                            alt='Current Blog Image'
                                            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                        />
                                    )}
                                    <input
                                        id='image'
                                        name='image'
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                    />
                                </div>

                                <button disabled={updatedIsLoading} className='create-button'>
                                    {updatedIsLoading ? 'Loading...' : 'Update'}
                                </button>
                            </form>
                        </div>
                    </Model>
                )
            }
        </div>
    );
}

export default ManageProduct;