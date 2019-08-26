import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Link, withRouter, Route } from 'react-router-dom'
import Verses from '../Verses';
import '../../../src/App.css';

const drawerWidth = 240;


const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});




class DrawerLayout extends React.Component{
  state = {
    mobileOpen: false, chapterId: null
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render(){
    const { mobileOpen } = this.state;
    const { classes } = this.props;
    console.log(this.props);
    const drawer = (
      <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
              {this.props.chapters.map((chapter) => {
                const to = chapter.id;
                const linkStyle = {
                  // display: 'flex',
                  // width: '100%',
                  // alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit'
                };
                // console.log(chapter);
                return(
                  <Link to={'/'+chapter.id} style={linkStyle} key = {chapter.id}>
                    <ListItem button selected = {this.state.chapterId == to}>
                        <ListItemText primary={chapter.name_simple+" "+chapter.chapter_number}/>
                        <ListItemSecondaryAction>{chapter.name_arabic}</ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                  

                )  
              })}
              
          </List>
      </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {/* {this.state.currentChapter.name_complex} */} Bar
                </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path="/:chapterId" render={
                  props => {
                    const chapterId = props.match.params.chapterId;
                    
                    if(this.state.chapterId != chapterId)
                      this.setState({chapterId});
                    // var c = {};
                    // this.props.chapters.map(chapter => {
                    //   if(chapter.id == chapterId){
                    //     c = chapter;
                    //     if(chapterId != this.state.currentChapter.id){
                    //       this.setState({currentChapter:c});
                    //     }
                    //     return
                    //   }
                    // })

                    const currentChapter = this.props.chapters.find(({ id }) => id == props.match.params.chapterId)


                    // this.changeCurrentSura(chapterId);
                    return <Verses {...props} {...currentChapter} />
                  }
                } />
            </main>
        </div>
    );
  }
}

DrawerLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(DrawerLayout);