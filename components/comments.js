import { useState, useEffect } from 'react'
import parse from 'html-react-parser';
import Date from '../components/date'
import { getComments } from '../services';

export default function Comments({ slug }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => {
            setComments(result);
        });
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div className="bg-white rounded-lg p-4 lg:p-8 mb-8 gap-8">
                    <h3 className="text-xl mb-8 font-semibold border-b text-center pb-4">
                        {comments.length}
                        {' '}
                        Comments
                    </h3>
                    {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                        <p className="mb-4">
                        <span className="font-semibold">{comment.name}</span>
                        {' '}
                        on
                        {' '}
                        <Date dateString={comment.createdAt} />
                        </p>
                        <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.content)}</p>
                    </div>
                    ))}
                </div>
            )}
        </>

    )
}
