import React, { Component } from "react";

export class NewsItem extends Component {
  static propTypes = {};

  render() {
    let { title, desc, imgUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "200px" }}
          />
          <div className="card-body">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
              {source}
              
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {author} published on date {new Date(publishedAt).toGMTString()}</small></p>
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
