import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CssBaseline, Divider, Hidden, Drawer, IconButton,
  List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography,
  ListItemAvatar, Avatar, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  MenuItem, FormLabel, FormControlLabel, Radio, RadioGroup, Select, FormControl

}
  from '@material-ui/core';

import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link, withRouter, Route } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Verses from '../Verses';
import '../../../src/App.css';
import { AppContext } from '../AppContextProvider';

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
      left: drawerWidth,
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
    // flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth * 2}px)`
    },
    padding: theme.spacing(3),
    marginTop: '64px'

  },
});

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);


class DrawerLayout extends React.Component {
  state = {
    mobileOpen: false, chapterId: null, expanded: 'panel1',
    arabicFont: 10, openArabicFont: false
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  handleChangeArabicFont = event => {
    this.setState({
      arabicFont: event.target.value
    })
  }

  handleCloseArabicFont = () => {
    this.setState({
      openArabicFont: false
    })
  }

  handleOpenArabicFont = () => {
    this.setState({
      openArabicFont: true
    })
  }

  handleChangeFontSize = (event, value) => {
    console.log(value);
  }

  handleChangeTranslation = (event) => {
    console.log(event.target.value)
    this.context.changeTranslation(event.target.value);
  }

  render() {
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
            return (
              <Link to={'/' + chapter.id} style={linkStyle} key={chapter.id}>
                <ListItem button selected={this.state.chapterId == to}>
                  <ListItemAvatar>
                    <Avatar>
                      <Typography variant="subtitle2">{chapter.chapter_number}</Typography>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText className="name_simple" primary={chapter.name_simple} secondary={chapter.translated_name.name} />
                  <ListItemSecondaryAction><Typography variant="h6"> {chapter.name_arabic} </Typography> </ListItemSecondaryAction>
                </ListItem>
              </Link>


            )
          })}

        </List>
      </div>
    );

    const drawerSettings = (
      <div className="drawerSettings">
        <div className={classes.toolbar} style={{ backgroundColor: '#f8f8f8' }} >
          <h2 style={{ color: '#ccc' }}>SETTINGS</h2>
        </div>
        <Divider />
        <div style={{ marginTop: '60px', padding: '16px 16px' }}>
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
              <List style={{ width: '100%' }}>
                <ListItem style={{ paddingLeft: 0 }}>
                  <ListItemText primary={"Arabic Font"} />
                  <ListItemSecondaryAction style={{ right: 0 }}>
                    <Select
                      open={this.state.openArabicFont}
                      onClose={this.handleCloseArabicFont}
                      onOpen={this.handleOpenArabicFont}
                      value={this.state.arabicFont}
                      onChange={this.handleChangeArabicFont}
                      inputProps={{
                        name: 'age',
                        id: 'demo-controlled-open-select',
                      }}
                    >
                      <MenuItem value={10}>Al Qalam</MenuItem>
                      <MenuItem value={20}>Me Quran</MenuItem>
                      <MenuItem value={30}>Scheherazade</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>

                  <AppContext.Consumer>
                    {(context) => (
                      <React.Fragment>
                        {
                          <ListItemText primary="Arabic Font Size"
                            secondary={
                              <React.Fragment>
                                <PrettoSlider
                                  valueLabelDisplay="auto"
                                  aria-label="pretto slider"
                                  defaultValue={context.state.arabicFontSize}
                                  max={70}
                                  onChange={context.changeArabicFontSize}
                                />
                              </React.Fragment>
                            } />
                        }
                      </React.Fragment>
                    )}
                  </AppContext.Consumer>
                </ListItem>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <AppContext.Consumer>
                    {(context) => (
                      <React.Fragment>
                        {
                          <ListItemText primary="Other Font Size"
                            secondary={
                              <React.Fragment>
                                <PrettoSlider
                                  valueLabelDisplay="auto"
                                  aria-label="pretto slider"
                                  defaultValue={context.state.otherFontSize}
                                  max={70}
                                  onChange={context.changeOtherFontSize}
                                />
                              </React.Fragment>
                            } />
                        }
                      </React.Fragment>
                    )}
                  </AppContext.Consumer>
                </ListItem>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Translations</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Choose a Translation</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  className={classes.group}
                  value={`${this.context.state.translationId}`}
                  onChange={this.handleChangeTranslation}
                >
                  {console.log(this.context.state.translationId)}
                  <FormControlLabel value="24" control={<Radio />} label="Bengali - Muhiuddin Khan" />
                  <FormControlLabel value="20" control={<Radio />} label="English - Saheeh Internationa" />
                  <FormControlLabel value="22" control={<Radio />} label="English - Yusuf Ali" />
                  <FormControlLabel value="18" control={<Radio />} label="English - Muhsin Khan" />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Audio Settings</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Audio settings</p>
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
        <nav className={classes.drawer + " " + "chapters-nav"} aria-label="mailbox folders">
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

              if (this.state.chapterId != chapterId)
                this.setState({ chapterId });
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

DrawerLayout.contextType = AppContext;

export default withStyles(useStyles)(DrawerLayout);