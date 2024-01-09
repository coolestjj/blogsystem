import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
        return res.status(403).json({message: "Token not valid"});
    }
    const q = "INSERT INTO posts (title, description, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id
    ]
    db.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({message: err});
      }
      return res.status(200).json({message: "Post has been added"});
    })
  });
}

export const getPosts = (req, res) => {
  const query = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";
  db.query(query, [req.query.cat], (err, result) => {
    if (err) {
      return res.status(500).json({message: err});
    }
    return res.status(200).json(result);
  })
}

export const getPost = (req, res) => {
  const q = "SELECT posts.id, username, title, description, posts.img, users.img as userImg, cat, date " +
      "FROM posts JOIN users ON posts.uid = users.id WHERE posts.id = ?";
  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({message: err});
    }
    // console.log(result)
    return res.status(200).json(result[0]);
  })

}

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({message: "Token not valid"});
    }
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";
    db.query(q, [postId, userInfo.id], (err, result) => {
      if (err) {
        return res.status(403).json("You can delete only your post");
      }
      return res.json("Post has been deleted")
    })

  })

}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({message: "Token not valid"});
    }

    const postId = req.params.id;
    const q = "UPDATE posts SET title = ?, description = ?, img = ?, cat = ? WHERE id = ? AND uid = ?";
    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
    ]
    db.query(q, [...values, postId, userInfo.id], (err, result) => {
      if (err) {
        return res.status(500).json({message: err});
      }
      return res.status(200).json({message: "Post has been updated"});
    })
  });
}