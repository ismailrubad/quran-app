import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, CssBaseline, Divider, Hidden, Drawer, IconButton, 
        List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography,
        ListItemAvatar, Avatar, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} 
        from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Link, withRouter, Route } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Verses from '../Verses';
import '../../../src/App.css';
import {AppContext} from '../AppContextProvider';

const drawerWidth = 320;


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
    // marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth * 2}px)`,
      left: drawerWidth
    }
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
    // flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth * 2}px)`
    },
    padding: theme.spacing(3)
  },
});




class DrawerLayout extends React.Component{
  state = {
    mobileOpen: false, chapterId: null, expanded: false
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({expanded: isExpanded ? panel : false});
  };

  render(){
    const { mobileOpen } = this.state;
    const { classes } = this.props;
    console.log(this.props);
    const drawer = (
      <div>
          <div className={classes.toolbar}>
            <h2>AL - QURAN</h2>
          </div>
          <Divider />
          <List className="chapterList">
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
                      <ListItemAvatar>
                        <Avatar>
                          <Typography variant="subtitle2">{chapter.chapter_number}</Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText className = "name_simple" primary={chapter.name_simple} secondary={chapter.translated_name.name}/>
                      <ListItemSecondaryAction><Typography variant="h6"> {chapter.name_arabic} </Typography> </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                  

                )  
              })}
              
          </List>
      </div>
    );

    const drawerSettings = (
      <div>
          <div className={classes.toolbar} style = {{backgroundColor: '#f8f8f8'}} >
            <h2 style={{color: '#ccc'}}>SETTINGS</h2>
          </div>
          <Divider />
          <div style={{marginTop: '60px'}}>
            <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>General settings</Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                  maximus est, id dignissim quam.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>Users</Typography>
                {/* <Typography className={classes.secondaryHeading}>
                  You are currently not an owner
                </Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                  diam eros in elit. Pellentesque convallis laoreet laoreet.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
      </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{ justifyContent: "space-between" }}>
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
                    <AppContext.Consumer>
                      {(context) => (
                        <React.Fragment>
                            {context.state.currentChapter.name_complex}
                        </React.Fragment>
                      )}
                  </AppContext.Consumer>
                </Typography>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  // onClick={handleDrawerToggle}
                  className={classes.menuButton}
                  style={{ marginRight: "-12px" }}
                >
                  <MenuIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer+" "+ "chapters-nav"} aria-label="mailbox folders">
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

                <Hidden smUp implementation="css">
                  <Drawer
                    // container={container}
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    // onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper
                    }}
                    ModalProps={{
                      keepMounted: true // Better open performance on mobile.
                    }}
                  >
                    {drawerSettings}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                    anchor="right"
                  >
                    {drawerSettings}
                  </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}
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