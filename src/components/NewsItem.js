import { getByTitle } from "@testing-library/react";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class NewsItem extends Component {
  static propTypes = {};

  render() {
    let { title, desc, imgUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            style={{height: "200px"}}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
