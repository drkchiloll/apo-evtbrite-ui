import * as React from 'react';
import {
  createStyles, makeStyles, Theme
} from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton,
  Typography, Button, Switch
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1, marginBottom: '90px' },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: { flexGrow: 1 }
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
          <Switch
            checked={favoriteToggle}
            onChange={props.toggleFavorites}
          /> Favorites
        </Toolbar>
      </AppBar>
    </div>
  )
}