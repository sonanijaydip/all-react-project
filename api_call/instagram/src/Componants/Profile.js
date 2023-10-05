/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCamera, FaRegImages, FaHeart, FaComment } from 'react-icons/fa';
import './Css/User.css';
import './Css/Profile.css';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [commentsPopupVisible, setCommentsPopupVisible] = useState(false);
    const [highlightedPostId, setHighlightedPostId] = useState(null);
    const [comments, setComments] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalArticles, setTotalArticles] = useState(0);

    const imageCountMap = {
        1: 11,
        2: 13,
        3: 8,
        4: 5,
        5: 6,
        6: 7,
        7: 12,
        8: 7,
        9: 12,
        10: 3,
    };

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
            .then((response) => {
                const imageCount = imageCountMap[id] || 0;
                const splicedAlbums = response.data.slice(0, imageCount);
                const updatedAlbums = splicedAlbums.map((album) => ({
                    ...album,
                    likes: Math.floor(Math.random() * (10000 - 1000) + 1000),
                }));
                setAlbums(updatedAlbums);
            })
            .catch((error) => {
                console.log(error);
            });

        setTimeout(() => {
            setTotalLikes(Math.floor(Math.random() * (500 - 100) + 100));
            setTotalFollowers(Math.floor(Math.random() * (500 - 100) + 100));
        }, 100);

        const totalPostCount = imageCountMap[id] || 0;
        setTotalPosts(totalPostCount);

        axios
            .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                setTotalArticles(response.data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const openCommentsPopup = (postId) => {
        axios
            .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => {
                setComments(response.data);
                setHighlightedPostId(postId);
                setCommentsPopupVisible(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const closeCommentsPopup = () => {
        setCommentsPopupVisible(false);
    };

    const highlightPost = (postId) => {
        setHighlightedPostId(postId);
    };

    return (
        <div>
            <div className="user-container">
                <div className="profile-content">
                    <div className="profile-header">
                        <div className="profile-image">
                            <img src={require(`../image/profile${id}.jpg`)} alt="" />
                        </div>
                        <div className="profile-info">
                            <h1>{profile.name}</h1>
                            <p>@{profile.username}</p>
                            <p>{profile.email}</p>
                            <p>{profile.phone}</p>
                            <p>{profile.website}</p>
                            <div className="profile-stats">
                                <div className="stat">
                                    <h3>Likes</h3>
                                    <p>{totalLikes}</p>
                                </div>
                                <div className="stat">
                                    <h3>Followers</h3>
                                    <p>{totalFollowers}</p>
                                </div>
                                <div className="stat">
                                    <h3>Posts</h3>
                                    <p>{totalPosts}</p>
                                </div>
                                <div className="stat">
                                    <h3>Articles</h3>
                                    <p>{totalArticles}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-section">
                        <div className="tab-buttons">
                            <button className={activeTab === 'albums' ? 'active' : ''} onClick={() => handleTabChange('posts')}>
                                Posts
                            </button>
                            <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => handleTabChange('articles')}>
                                Articles
                            </button>
                        </div>
                        <div className="content-section">
                            {activeTab === 'posts' && (
                                <div className="album-section">
                                    <div className="album-list">
                                        {albums.map((album, index) => (
                                            <div className="album" key={album.id}>
                                                <img className="post_img" src={require(`../postimage/profile${id}/${index + 1}.jpg`)} alt="" />
                                                <p>{album.title}</p>
                                                <div className="post-like-box">
                                                    <FaHeart />
                                                    <span>{album.likes}</span>
                                                </div>
                                                <button className="view-comments-button" onClick={() => openCommentsPopup(album.id)}>
                                                    <FaComment /> Comments
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'articles' && (
                                <div className="post-section">
                                    <div className="post-list">
                                        {posts.map((post) => (
                                            <div className={`post ${highlightedPostId === post.id ? 'highlighted' : ''}`} key={post.id}>
                                                <h3>{post.title}</h3>
                                                <p>{post.body}</p>
                                                <div className="post-like-box">
                                                    <FaCamera />
                                                    <span>{post.likes}</span>
                                                </div>
                                                <button className="view-comments-button" onClick={() => openCommentsPopup(post.id)}>
                                                    <FaComment /> Comments
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {commentsPopupVisible && (
                <div className="comments-popup">
                    <div className="comments-container">
                        <button className="close-comments" onClick={closeCommentsPopup}>
                            Close
                        </button>
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div className="comment" key={comment.id}>
                                    <h3>{comment.name}</h3>
                                    <p>{comment.email}</p>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
