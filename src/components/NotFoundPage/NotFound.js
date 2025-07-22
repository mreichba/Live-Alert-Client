import React, { Component } from 'react'

// 404 fallback page displayed for unknown routes
export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="NotFoundPage">
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
      </div>
    );
  }
}
