
const User = require("./Users");
const BlogPost = require("./Post");
const Comment = require("./Comments");

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, BlogPost, Comment };