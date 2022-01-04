import { useState } from 'react';
import Layout from '../components/Layout';


export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            link,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setLink('');
            setContent('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <Layout title={'Add-post'}>
            <div className='p-2 mx-auto' style={{maxWidth: 600}}>
                <div>
                    <form onSubmit={handlePost} >
                        {error ? (
                            <div >
                                <h3 >{error}</h3>
                            </div>
                        ) : null}
                        {message ? (
                            <div >
                                <h3 >{message}</h3>
                            </div>
                        ) : null}
                        <div className="card p-3 mx-auto bg-dark text-white" style={{ borderRadius: '0.5rem' }}>
                            <div >
                                <label>Title</label>
                                <br />
                                <input
                                    className='w-100 px-1 p-1'
                                    style={{ borderRadius: '0.5rem', borderWidth: 0 }}
                                    type="text"
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder="title"
                                />
                            </div>
                            <div>
                                <label>Link</label>
                                <br />
                                <input
                                    className='w-100 px-1 p-1'
                                    style={{ borderRadius: '0.5rem', borderWidth: 0 }}
                                    type="text"
                                    name="link"
                                    onChange={(e) => setLink(e.target.value)}
                                    value={link}
                                    placeholder="link"
                                />
                            </div>
                            <div >
                                <label>Content</label>
                                <br />
                                <textarea
                                    className='w-100 px-1 p-1'
                                    style={{ borderRadius: '0.5rem', borderWidth: 0, fontSize: 14, height: '100px' }}
                                    name="content"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    placeholder="Post content"
                                />
                            </div>
                            <div className='mx-auto'>

                                <button className='btn btn-primary btn-sm mt-4' style={{ width: '100px' }} type="submit">Add post</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </Layout>
    );
}