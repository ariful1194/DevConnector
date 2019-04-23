import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

export class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    return comments.map(comment => (
      <CommentItem keys={comment._id} comment={comment} postId={postId} />
    ));
  }
}
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};
export default CommentFeed;