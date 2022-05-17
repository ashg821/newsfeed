import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';


export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      pages: 1
    };
    document.title=`${this.props.category[0].toUpperCase()+this.props.category.slice(1)}-NewsFeed`;
  }
  async updateNews() {
    this.setState({
      loading: true
    });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e439372a38d34e0ebc02bcb6d631cf7c&page=${this.state.pages}&&pageSize=${this.props.pageSize}`
    );
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
  async componentDidMount() {
    this.updateNews();
  }
  nextButtonHandle = async () => {
    if (this.state.pages + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ pages: this.state.pages + 1 });
      this.updateNews();
    }
  };
  prevButtonHandle = async () => {
    this.setState({ pages: this.state.pages - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-4 text-center">{`${this.props.category[0].toUpperCase()+this.props.category.slice(1)}`} Top Headlines</h1>
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
            disabled={this.state.pages + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
        {this.state.loading === true && <Spinner />}
        <div className="row" style={{ marginLeft: "20px " }}>
          {!(this.state.loading) && this.state.articles.map((element) => {
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
                    newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}
                  />
                </div>
              );
            }
            else return "";
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
            disabled={this.state.pages + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;
