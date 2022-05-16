import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  static propTypes = {}

  render() {
    return (
      <div>This a news component
          <NewsItem/>
      </div>
    )
  }
}

export default News