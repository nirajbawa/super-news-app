import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import EndLoading from './EndLoading';
import "../index.css";



export class News extends Component {

  constructor(props) {
    super();

    this.state = {
      article: [],
      pageNum: 1,
      pageSize: 8,
      totalArticles: null,
      loading: true,
      apiKey:process.env.REACT_APP_NEWS_API_1,
      keyNum:0
    }
    document.title = `${props.title}${props.category !== "general" ? ` - ` + this.Capitilize(props.category) : ""}`;
  }

  static defaultProps = {
    category: 'general',
    coutryCode: ''
  }

  static propTypes = {
    coutryCode: PropTypes.string,
    category: PropTypes.string,
  }


  Capitilize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
  setNewApiKey=()=>{

    let keys = [process.env.REACT_APP_NEWS_API_1, process.env.REACT_APP_NEWS_API_2, process.env.REACT_APP_NEWS_API_3, process.env.REACT_APP_NEWS_API_1, process.env.REACT_APP_NEWS_API_4, process.env.REACT_APP_NEWS_API_5];

    if(this.state.keyNum<5)
    {
      console.log(keys);
      this.setState({keyNum:this.state.keyNum+1}, ()=>{
        this.setState({apiKey:keys[this.state.keyNum]}, ()=>{
          this.fetchPost();
        });
      });
    }
    else{
      this.setState({keyNum:0});
    }

  }

  restState = ()=>{
  
    this.setState({
      article: [],
      pageNum: 1,
      totalArticles: null,
      loading: true
    }, async()=>{
      await this.fetchPost();
      this.setState({ loading: false });
    });
  }

  async setloadingfalse() {
  
    this.setState({ loading: false });
  }

  fetchPost = async () => {
    try {
   
      this.props.setProgress(10)
      let url = `${process.env.REACT_APP_API_URL}?url=https://newsapi.org/v2/top-headlines?country=${this.props.coutryCode}|category=${this.props.category}|apiKey=${this.state.apiKey}|page=${this.state.pageNum}|pagesize=${this.state.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      if (data.status !== 200)
      {
        this.setNewApiKey();
        throw new Error("limit cross");
      }
       
        this.props.setProgress(50);

      let parsedData = await data.json();



      this.props.setProgress(60);

      this.setState({
        article: this.state.article.concat(parsedData.articles),
        totalArticles: this.state.totalArticles == null ? parsedData.totalResults : this.state.totalArticles
      });

      this.props.setProgress(100);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }


  updatePosts = async () => {
  
    this.setState({
      pageNum: (this.state.pageNum + 1)
    }, async () => {
      await this.fetchPost();
    });


  }

  render() {
    return (
      <>

        <div className='py-5 flex-column' style={this.state.loading ? { height: "height: 110vh", display: "flex", justifyContent: "center", alignItems: "center" } : {}}>
          <div className='w-100 d-flex justify-content-around align-items-center flex-wrap res-tool' style={{ gap: "40rem" }}>
            <h1 className={this.props.state.theme===`dark`?`text-center py-5 text-white fs-4 resh1`:`text-center py-5 text-dark fs-4 resh1`}>
              {`${this.props.category !== "general" ? this.Capitilize(this.props.category) + ` - ` : " All -"} Top Headlines`}
            </h1>
            <select value={this.props.state.coutryCode} style={{ width: "5rem", height: "2.7rem" }} className=" form-select form-select-sm resselect" aria-label=".form-select-sm example" id='countryCode' onChange={this.props.countryChange}>
              <option value="">All</option>
              {this.props.codes.map((value) => {
                return <option className='text-uppercase' key={value} value={value}>{value.toUpperCase()}</option>
              })}
            </select>

          </div>

          {this.state.loading && <Loading width={400} height={400} />}
          {this.state.totalArticles === 0 && <EndLoading width={400} height={400} />}

          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.props.firstload && this.updatePosts}
            hasMore={this.state.article.length !== this.state.totalArticles}
            loader={!this.state.loading && <Loading width={200} height={200} />}
            endMessage={
              <EndLoading width={300} height={300} />
            }
          >
            <div className="d-flex justify-content-center flex-wrap gap-5 py-2" >
              {
                !this.state.loading && this.state.article.map((value, index) => {
                  return <NewsItem title={value.title ? value.title.slice(0, 60) + "....." : ""} description={value.description ? value.description.slice(0, 88) + "......" : ""} imgUrl={value.description ? value.urlToImage : `https://source.unsplash.com/featured/300×400/?${value.title.split(" ")[0]}`} newsUrl={value.url ? value.url : ""} publishedAt={value.publishedAt ? new Date(value.publishedAt).toUTCString() : ""} author={value.author ? "-By " + value.author : "unknown"} source={value.source ? value.source.name : ""} key={index} state={this.props.state} />
                })
              }
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default News;