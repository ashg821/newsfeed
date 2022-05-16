// import PropTypes from "prop-types";
import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      pages: 1,
    };
  }
  async componentDidMount() {
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=f8d3cd14977d410ab3964f71f868e138&page=${this.state.pages}&&pageSize=${this.props.pageSize}`
    );
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  nextButtonHandle = async () => {
    if (this.state.pages + 1 <= Math.ceil(this.state.totalResults / 20)) {
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=f8d3cd14977d410ab3964f71f868e138&page=${
          this.state.pages + 1
        }&pageSize=${this.props.pageSize}`
      );
      let parsedData = await data.json();

      this.setState({
        pages: this.state.pages + 1,
        articles: parsedData.articles,
      });
    }
  };
  prevButtonHandle = async () => {
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=f8d3cd14977d410ab3964f71f868e138&page=${
        this.state.pages - 1
      }&pageSize=${this.props.pageSize}`
    );
    let parsedData = await data.json();

    this.setState({
      pages: this.state.pages - 1,
      articles: parsedData.articles,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-3 text-center">Top headines of the day</h1>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.pages <= 1}
            className="btn btn-dark "
            onClick={this.prevButtonHandle}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-dark nextBtn"
            onClick={this.nextButtonHandle}
            disabled={this.state.pages+1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
        <div className="row">
          {this.state.articles.map((element) => {
            if (
              element.urlToImage !== null &&
              element.description !== null &&
              element.title !== null
            ) {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title.slice(0, 46)}
                    desc={element.description.slice(0, 87)}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.pages <= 1}
            className="btn btn-dark "
            onClick={this.prevButtonHandle}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-dark nextBtn"
            onClick={this.nextButtonHandle}
            disabled={this.state.pages+1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
