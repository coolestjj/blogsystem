import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Edit from "../img/Edit.png";
import Delete from "../img/Delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {

    const navigate = useNavigate();

    const [post, setPost] = useState({});

    const location = useLocation();

    const postId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`)
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt=""/>
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt=""/>}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username &&
                        (<div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="edit"/>
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="delete"/>
                        </div>)
                    }
                </div>
                <h1>{post.title}</h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.description),
                    }}
                ></p>
            </div>


            <div className="menu">
                <Menu cat={post.cat}/>
            </div>
        </div>
    );
}

export default Single;