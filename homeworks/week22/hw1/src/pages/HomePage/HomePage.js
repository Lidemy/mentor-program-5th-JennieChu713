/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAllPosts, getPosts } from "../../WebAPI";
import { RippleLoading, EllipsisLoading } from "../../LoadingImg";

const HomeContainer = styled.section`
  width: 80%;
  margin: 2rem auto;
`;
const PostWrapper = styled.article`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #b4aeb1;
  padding: 1rem;
`;
const PostTitle = styled(Link)`
  font-size: 1.4rem;
  font-weight: 800;
  color: #4f455c;
  text-decoration: none;
  cursor: pointer;
  width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostDate = styled.div`
  color: #b4aeb1;
`;

// paginate
const PaginateWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
`;
const PaginatesGroup = styled.div`
  display: flex;
`;
const Paginate = styled.div`
  cursor: pointer;
  margin-left: 2rem;
  font-size: 1.4rem;
  color: #d3cbc6;
`;

function Post({ post }) {
  return (
    <PostWrapper>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
    </PostWrapper>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const page = useRef(1);
  const totalPages = useRef(0);
  const [isPagesLoad, setIsPagesLoad] = useState(false);

  useEffect(() => {
    getAllPosts().then((data) => {
      if (data) {
        setIsPagesLoad(true);
      }
      return (totalPages.current = Math.ceil(data.length / 5));
    });
    getPosts(page.current).then((posts) => {
      return setPosts(posts);
    });
  }, []);

  // handling function
  const handlePageClick = (e) => {
    if (e.target.innerText === "First") {
      page.current = 1;
    }
    if (e.target.innerText === "Last") {
      page.current = totalPages.current + 1;
    }
    if (e.target.innerText === "next") {
      if (page.current < totalPages.current) {
        page.current += 1;
      }
    } else {
      if (page.current > 1) {
        page.current -= 1;
      }
    }
    getPosts(page.current).then((posts) => {
      return setPosts(posts);
    });
  };

  return (
    <HomeContainer>
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <RippleLoading />
      )}
      <PaginateWrapper>
        <PaginatesGroup>
          <Paginate onClick={handlePageClick}>First</Paginate>
          {page.current !== 1 && (
            <Paginate onClick={handlePageClick}>prev</Paginate>
          )}
        </PaginatesGroup>
        {isPagesLoad && totalPages.current !== 0 ? (
          `${page.current}/${totalPages.current}`
        ) : (
          <EllipsisLoading />
        )}
        <PaginatesGroup>
          {page.current !== totalPages.current && (
            <Paginate onClick={handlePageClick}>next</Paginate>
          )}
          <Paginate onClick={handlePageClick}>Last</Paginate>
        </PaginatesGroup>
      </PaginateWrapper>
    </HomeContainer>
  );
}
