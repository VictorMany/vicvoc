import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import utilStyles from '../styles/utils.module.css'
import preview from '../utils';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";




export default function PostCard({ post, buttons = true }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();


    try {
        getLinkPreview(
            post.link,
            {
                headers: {
                    "Access-Control-Allow-Origin'": "*", // fetches with googlebot crawler user agent
                    "Access-Control-Allow-Origin'": "http://localhost:3000", // fetches with googlebot crawler user agent
                  },
            }
        ).then((data) => console.debug(data));
    } catch (error) {
        console.log(error)
    }

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);
        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };



    return (

        <div className='col-12 col-md-4 p-2' >
            {

                buttons ? (
                    <div className="card p-3 h-100">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>

                        <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                        <br />
                        {

                            (!post.published && buttons ? (
                                <button type="button" className='btn btn-outline-info btn-sm mb-2' style={{ width: '30%' }} onClick={() => publishPost(post._id)}>
                                    {publishing ? 'Publishing' : 'Publish'}
                                </button>
                            ) : null)
                        }

                        {
                            (buttons ? (
                                <button className='btn btn-primary btn-sm' style={{ width: '30%' }} onClick={() => deletePost(post['_id'])}>
                                    {deleting ? 'Deleting' : 'Delete'
                                    }
                                </button>
                            ) : null)}

                    </div>
                )
                    :
                    (
                        post.published ? (<div className="card p-3 h-100">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>




                            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                            <br />
                            {

                                (!post.published && buttons ? (
                                    <button type="button" className='btn btn-outline-info btn-sm mb-2' style={{ width: '30%' }} onClick={() => publishPost(post._id)}>
                                        {publishing ? 'Publishing' : 'Publish'}
                                    </button>
                                ) : null)
                            }

                            {
                                (buttons ? (
                                    <button className='btn btn-primary btn-sm' style={{ width: '30%' }} onClick={() => deletePost(post['_id'])}>
                                        {deleting ? 'Deleting' : 'Delete'
                                        }
                                    </button>
                                ) : null)}

                        </div>
                        ) : null
                    )
            }

        </div >


    );


}



