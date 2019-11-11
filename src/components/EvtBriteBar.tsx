import * as React from 'react';
import {
  createStyles, makeStyles, Theme, fade
} from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton,
  Typography, Button, Switch,
  InputBase
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon
} from '@material-ui/icons';

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1, marginBottom: '90px' },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: { flexGrow: 1 },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    }
  })
);

export const ButtonAppBar = (props: any) => {
  const classes = useStyles();
  const { favoriteToggle } = props;
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Austin Texas Happenings
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={props.searchText}
              onChange={e => {
                props.searchChange(e.target.value)
              }}
              onKeyPress={e => {
                if(e.which === 13) {
                  props.performSearch()
                }
              }}
            />
          </div>
          <Switch
            checked={favoriteToggle}
            onChange={props.toggleFavorites}
          /> Favorites
        </Toolbar>
      </AppBar>
    </div>
  )
}