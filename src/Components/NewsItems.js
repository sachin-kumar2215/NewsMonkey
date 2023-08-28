import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div  className="card my-5">
          <div style={{display:'flex',
                  justifyContent: 'flex-end',
                  position:'absolute',
                  right: '0'
        }}>
              <span className="badge rounded-pill bg-danger">
                              {source}
                              <span className="visually-hidden">unread messages</span>
              </span>
          </div>
          <img src={imageUrl}  className="card-img-top" alt="..."/>
          <div  className="card-body">
            <h5  className="card-title">{title}</h5>
            <p  className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">by {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
        
      </div>
    )
  }
}

export default NewsItems