import axios, { AxiosInstance } from 'axios';
const eventsJson = require('./events.json');

export class Api {
	public request: AxiosInstance;
	constructor() {
		this.request = axios.create({
			baseURL: 'http://localhost:8012/api'
		})
	}
  getEvents() {
		return this.request.get('/events').then(({ data }) => {
			if(!data) return eventsJson;
			return data;
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
	getSaved() {
		return this.request.get('/events/saved').then(({data}) => {
			return data;
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