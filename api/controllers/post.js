import {db} from "../db.js";

export const addPost = (req, res) => {
  res.json("addPost");
}

export const getPosts = (req, res) => {
  const query = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";
  db.query(query, [req.query.cat], (err, result) => {
    if (err) {
      return res.json({message: err});
    }
    return res.status(200).json(result);
  })
}

export const getPost = (req, res) => {
  res.json("getPost");
}

export const deletePost = (req, res) => {
  res.json("deletePost");
}

export const updatePost = (req, res) => {
  res.json("updatePost");
}