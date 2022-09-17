import { useState } from 'react'
import { submitComment } from '../services';

export default function CommentForm({ slug }) {
    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", content: "", storeData: false });

    const onInputChange = (e) => {
        const { target } = e;
        if (target.type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const handlePostSubmission = () => {
        setError(false);
        const { name, email, content, storeData } = formData;
        if (!name || !email || !content) {
            setError(true);
            return;
        }
        const commentObj = {
            name,
            email,
            content,
            slug,
        };

        submitComment(commentObj)
        .then((res) => {
            if (res.createComment) {
                if (!storeData) {
                    formData.name = '';
                    formData.email = '';
                }
                formData.content = '';
                setFormData((prevState) => ({
                    ...prevState,
                    ...formData,
                }));
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            }
        });
    };

    return (
        <div className="p-4 lg:p-0">
            <h3 className="text-xl mb-8 font-semibold border-b text-center pb-4">Leave Comment</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea value={formData.content} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="content" placeholder="Content" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
                <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
            </div>
            {error && <p className="text-xl text-red-500">All fields are mandatory</p>}
            <div className="mt-8">
                <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease transform hover:bg-orange-600 inline-block bg-blue-600 text-lg font-medium outline outline-1 rounded-full text-white px-6 py-2 cursor-pointer">Submit Comment</button>
                {showSuccessMessage && <p className="text-xl font-semibold mt-3 text-green-500">Comment has been submitted for review</p>}
            </div>
        </div>

    )
}
