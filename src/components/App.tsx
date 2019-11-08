import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { Api } from '../service/api';
import { Grid, Typography } from '@material-ui/core';
import * as promise from 'bluebird';
import { ButtonAppBar } from './EvtBriteBar';
import { EvtBriteCard } from './EvtBriteCard';

class App extends React.Component<{}, any> {
	public api = new Api();
	constructor(props: any) {
		super(props);
		this.state = {
			events: null,
			favoriteToggle: false,
			favorites: [] 
		}
	}
	componentDidMount() {
		return this.api.getEvents().then(events => promise.map(events, event => {
			event.favorite = false;
			return event;
		}).then(events => this.setState({ events })))
	}
	handleFavToggle = toggle => {
		this.setState({ favoriteToggle: toggle.target.checked });
		this.api.getSaved().then(favorites => this.setState({ favorites }))
	}
	handleFavSelect = event => {
		const { events, favorites } = this.state;
		const selEventIdx = events.findIndex(e => e.id === event.id);
		if(event.favorite) {
			events[selEventIdx].favorite = true;
			favorites.push(events[selEventIdx]);
			this.setState({ events, favorites });
			return this.api.saveEvent(event)
		} else {
			events[selEventIdx].favorite = false;
			const favIdx = favorites.findIndex(e => e.id === event.id);
			favorites.splice(favIdx, 1);
			this.setState({ events, favorites })
			return this.api.deleteSaved(event)
		}
	}
	_renderEvents = events => {
		return events.map((event, i) => {
			return (
				<Grid key={i} item xs={4}>
					<EvtBriteCard
						key={i}
						event={event}
						handleFavorite={this.handleFavSelect}
					/>
				</Grid>	
			)
		})
	}
	render() {
		const { events, favoriteToggle, favorites } = this.state;
		return (
			<div>
				<ButtonAppBar
					toggleFavorites={this.handleFavToggle}
					favoriteToggle={favoriteToggle}
				/>
				<Grid container spacing={3}>
					{
						favoriteToggle && favorites.length === 0 ?
							<div style={{marginLeft: '10px'}}>
								There are no favorites
							</div> :
						favoriteToggle && favorites.length > 0 ?
							this._renderEvents(favorites) :
						events ? this._renderEvents(events) : null
					}
				</Grid>
			</div>
		);
	}
}
declare let module: object;
export default hot(module)(App);
