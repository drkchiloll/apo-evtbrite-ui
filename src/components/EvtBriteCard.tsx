import * as React from 'react';
import {
  Card, CardHeader, CardMedia, IconButton,
  CardContent, CardActions, Typography,
  Tooltip
} from '@material-ui/core';
import {
  makeStyles, Theme, createStyles
} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import * as moment from 'moment';

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
  }),
);

export const EvtBriteCard = (props: any) => {
	const classes = useStyles();
  const { event } = props;
	return (
		<Card className={classes.card} elevation={3}>
			<CardHeader title={event.name}/>
			<CardMedia
				component='img'
				image={event.logoUrl}
			/>
			<CardContent>
				<Typography gutterBottom variant='subtitle1' component='h1'>
					<strong> Address: { event.venueAddress } </strong>
				</Typography>
				<Typography>
					Start: {moment(event.start).format('MMMM Do YYYY, h:mm a')}
				</Typography>
				<Typography>
					End: {moment(event.end).format('MMMM Do YYYY, h:mm a')}
				</Typography>
			</CardContent>
			<CardActions disableSpacing >
        <Tooltip title={
          event.favorite ? 'Remove From Favorites': 'Add to Favorites'
        }>
          <IconButton
            aria-label='add to favorites'
            onClick={() => {
              if(event.favorite) {
                event.favorite = false;
              } else {
                event.favorite = true;
              }
              props.handleFavorite(event)
            }}
          >
            <FavoriteIcon color={event.favorite ? 'secondary': 'inherit'} />
          </IconButton>
        </Tooltip>
			</CardActions>
		</Card>
	)
}