import React, {  Component } from "react";
import { connect } from "react-redux";
import { movieFetch } from "../../../actions/movies";

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {image_prefix} from '../../../constants'
import Icon from '@material-ui/core/Icon';
import {Pagination} from '@material-ui/lab';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import StarIcon from '@material-ui/icons/Star';

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 20,
    marginTop:20
  },
  media: {
    paddingTop: '140%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  moviesBody:{
       display:"flex",flexWrap:"wrap", justifyContent:"space-between"
      },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Movie extends Component {
  state={
    color:"red",
  }

  addToFav=()=>{
    this.setState({
      color:"primary"
    },()=>this.props.addToFav(this.props.data))
    
  }

  removeFromFav=()=>{
    this.setState({
      color:"red"
    },()=>this.props.removeFromFav(this.props.data))
  }

  addOrRemove=()=>{
    if (this.state.color==="primary"){
       this.setState({
        color:"red"
      },()=>{
        this.removeFromFav()
      })
    }
    else{
      this.setState({
        color:"primary"
      },()=>{
        this.addToFav()
      })
    }
  }

  render() {
    const classes = this.props.styleData
    const {original_title, poster_path, overview, release_date, vote_average}=this.props.data
    return (
      <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image_prefix+poster_path}
        title={poster_path}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <h5>{original_title}</h5><br/>
          {overview}<br/><br/>
          <div style={{marginLeft:"70%", fontWeight:900}}>{release_date}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <StarIcon color="primary" /> <div style={{fontSize: 16, marginLeft:10}}>{vote_average}</div>
        </IconButton>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={this.state.color} onClick={()=> this.addOrRemove()} />
        </IconButton>
      </CardActions>
    </Card>
    )
  }
}

class Home extends Component {
  state={
    page: 1, 
    fav: []
  }

  componentDidMount(){
    this.fetchMovies(this.state.page)
    console.log(this.props.movies)
  }

  fetchMovies=(page)=>{
    this.props.movieFetch(page)
  }

  handleChange=(e, value)=>{
      this.setState({
        page:value,
      },()=> this.fetchMovies(value))

      window.scrollTo(0, 0);
  }

  addToFav=(movie)=>{
    this.setState({
      fav: [...this.state.fav, movie]
    })
  }

  removeFromFav=(movie)=>{
    this.setState({
      fav: this.state.fav.filter(item=>item!==movie)
    })
  }

  render() {
    const {movies, isLoading, total_pages}=this.props.movies
    const {classes}= this.props
    const {page}=this.state
    return (
          <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Movies
          </Typography>
           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="container">
    
        <div className={classes.moviesBody}>
          {isLoading?<h1>Loading...</h1>:
            movies.map(item=><Movie key={item.id} data={item} styleData={classes} addToFav={this.addToFav} removeFromFav={this.removeFromFav} />)
          }
        </div>
       
      <div>
          <div style={{marginTop:30, marginBottom:30, display:"flex", justifyContent:"center"}}>
            <Pagination count={total_pages} page={page} onChange={this.handleChange} />
          </div>
      </div>
      
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps, { movieFetch })(
  withStyles(styles)(Home)
);