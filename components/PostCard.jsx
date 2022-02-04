import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Image from 'next/image'

export default function PostCard({ post, buttons = true, searching = '' }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

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

        <div className='col-12 p-2' data-aos="zoom-in">
            {
    
                    post.published ? (<div className="card p-3 h-100 bg-card">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <LinkPreview url={post.link} descriptionLength={100} primaryTextColor='gray' className='fw-lighter fs-6 overflow-hidden' height='100%' width='100%' imageHeight='150px' fallbackImageSrc='/img/nf.jpeg' fallback={(<a className='card p-3 border border-1 h-100 text-dark' href={post.link} target="_blank" rel="noreferrer">{post.link}
                            {post.link.includes('youtube') ? (<div className='d-flex justify-content-center'> <Image src='/img/yt.png' width='266.6666px' alt='youtube' height='150px'></Image></div>) : null}</a>)} />
                        <br />
                        <div className='mt-auto'>
                            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    ) : null
                
            }

        </div >


    );


}



