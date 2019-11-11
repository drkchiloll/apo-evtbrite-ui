import axios, { AxiosInstance } from 'axios';
const eventsJson = require('./events.json');

export class Api {
	public request: AxiosInstance;
	constructor() {
		this.request = axios.create({
			baseURL: 'http://localhost:5000'
		})
	}
  getEvents() {
		return this.request.get('/events').then(({ data }) => {
			console.log(data)
    if(!data || data === '0') return eventsJson.events;
			return data.events;
		});
	}
	getCategories() {
		return this.request.get('/categories').then(({ data }) => data);
	}
	getEventLogo(url: string) {
		let uri = decodeURI(url)
		return axios.get(uri).then(({ data }) => {
			const img = Buffer.from(data, 'binary').toString('base64')
			return `data:image/jpeg;base64,${img}`;
		})
	}
	searchEvents(text: string) {
		return this.request.post('/event/search', {text}).then(({ data }) => {
			if(!data || data === '0') return eventsJson.events;
			return data.events;
		})
	}
	getSaved() {
		return this.request.get('/events/saved').then(({data}) => {
			if(data.events === 0) {
				return [];
			}
			return data.events;
		})
	}
	saveEvent(event) {
		return this.request.post('/events', event).then(() => {
			return this.getSaved()
		});
	}
	deleteSaved(event) {
		return this.request.delete(`/events/${event.id}`);
	}
}