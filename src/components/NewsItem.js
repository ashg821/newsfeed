import React, { Component } from "react";

export class NewsItem extends Component {
  static propTypes = {};

  render() {
    let { title, desc, imgUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div>
        <div className="card">
          <div className="container" style={{ display: "flex", justifyContent: "felx-left" }}>
            <span className="badge rounded-pill bg-danger" style={{ position: "absolute" }}>
              {source}
            </span>
          </div>
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} published on date {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
