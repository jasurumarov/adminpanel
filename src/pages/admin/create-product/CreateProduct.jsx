import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useCreateBlogMutation } from '../../../context/api/blogApi';

// InitialState
const initialState = {
    title: '',
    text: '',
    image: ''
}

const CreateProduct = () => {
    const [formData, setFormData] = useState(initialState);
    const fileInputRef = useRef(null);
    const [createBlog, { isLoading, isSuccess, isError }] = useCreateBlogMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success('Successfully created');
            setFormData(initialState)
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    }, [isSuccess]);
    useEffect(() => {
        if (isError) {
            toast.error('Please try again');
        }
    }, [isError]);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreate = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let blog = {
            title: data.get('title'),
            text: data.get('text'),
        }

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('text', blog.text);

        formData.append('image', event.currentTarget.image.files[0]);

        createBlog(formData);
    }

    return (
        <div className='create-product'>
            <h3>Create blog</h3>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        required
                        id='title'
                        name='title'
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea
                        rows={10}
                        required
                        name="text"
                        id="text"
                        value={formData.text}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        required
                        id='image'
                        name='image'
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                    />
                </div>
                <button disabled={isLoading} className='create-button'>
                    {isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default CreateProduct
