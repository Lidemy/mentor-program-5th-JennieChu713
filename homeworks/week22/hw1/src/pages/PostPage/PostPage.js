/* eslint-disable */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../../WebAPI";
import { RippleLoading } from "../../LoadingImg";

//single post
const BackHome = styled(Link)`
  text-decoration: none;
  color: #df7163;
  border: 1px solid #df7163;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s;
  display: block;
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  &:hover {
    background: #df7163;
    color: white;
  }
`;
const PostContainer = styled.article`
  width: 60%;
  margin: 2rem auto;
`;
const PostTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.4rem;
  color: #513743;
`;
const PostDate = styled.div`
  font-size: 0.8rem;
  color: #c37854;
  font-style: oblique;
  margin-bottom: 1.4rem;
`;
const PostContent = styled.div`
  margin-bottom: 2.5rem;
  white-space: pre-line;
`;

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(postId).then((post) => setPost(post[0]));
  }, [postId]);
  return (
    <PostContainer>
      {post ? (
        <>
          <PostTitle>{post && post.title}</PostTitle>
          <PostDate>
            {post && new Date(post.createdAt).toLocaleString()}
          </PostDate>

          <PostContent>{post && post.body}</PostContent>
          <BackHome to="/">Back</BackHome>
        </>
      ) : (
        <RippleLoading />
      )}
    </PostContainer>
  );
}
