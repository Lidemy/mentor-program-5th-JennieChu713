/* eslint-disable */
import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = (page) => {
  return fetch(`${BASE_URL}/posts?_page=${page}&_limit=5&_sort=id&_order=desc`)
    .then((res) => res.json())
    .catch((err) => err.toString());
};
export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then((res) => res.json())
    .catch((err) => err.toString());
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then((res) => res.json())
    .catch((err) => err.toString());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err.toString());
};

export const register = (username, nickname, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      nickname,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err.toString());
};

export const newPost = (title, body, userId) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err.toString());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err.toString());
};
