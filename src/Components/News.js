import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'sports'
  }
  static propTypes ={
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(50)
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
     }); 
     this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews();
  }
  
  // handelprev = async () => {
  //   console.log('previous');
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3694382f22da4794b43b950be738c9b2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState ({
  //     page : this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  
  // handelnext = async () => {
  //   console.log('next');
  //   if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
  //   else{
  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3694382f22da4794b43b950be738c9b2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //       this.setState({loading: true});
  //       let data = await fetch(url);
  //       let parsedData = await data.json();
  //       console.log(parsedData);
  //       this.setState({
  //         page : this.state.page + 1,
  //         articles: parsedData.articles,
  //         loading: false
        
  //       })
  // }
  // }


  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
     });
  };
  render() {
    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { this.state.articles.map((element) => (
            <div className="col-md-4" key={element.title}>
              <NewsItems
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={element.urlToImage?element.urlToImage:"newsicon.jpg"}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
          </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
  
}

export default News