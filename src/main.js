import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		balckCrewSocksImages : [
			{largeImg:"./images/crew-1.jpg",thumbImg:"./images/crew-1s.jpg",id:1},
			{largeImg:"./images/crew-2.jpg",thumbImg:"./images/crew-2s.jpg",id:2},
			{largeImg:"./images/crew-3.jpg",thumbImg:"./images/crew-3s.jpg",id:3},
			{largeImg:"./images/crew-4.jpg",thumbImg:"./images/crew-4s.jpg",id:4},
			{largeImg:"./images/crew-5.jpg",thumbImg:"./images/crew-5s.jpg",id:5},
			{largeImg:"./images/crew-6.jpg",thumbImg:"./images/crew-6s.jpg",id:6},
		  ],
		balckAnkleSocksImages : [
			{largeImg:"./images/ankle-1.jpg",thumbImg:"./images/ankle-1s.jpg",id:1},
			{largeImg:"./images/ankle-2.jpg",thumbImg:"./images/ankle-2s.jpg",id:2},
			{largeImg:"./images/ankle-3.jpg",thumbImg:"./images/ankle-3s.jpg",id:3},
			{largeImg:"./images/ankle-4.jpg",thumbImg:"./images/ankle-4s.jpg",id:4},
			{largeImg:"./images/ankle-5.jpg",thumbImg:"./images/ankle-5s.jpg",id:5},
			{largeImg:"./images/ankle-6.jpg",thumbImg:"./images/ankle-6s.jpg",id:6},
		],
		balckAnkleSocksImagesThreePack : [
			{largeImg:"./images/ankle-3-pack.jpg",thumbImg:"./images/ankle-3s-pack.jpg",id:1},
			{largeImg:"./images/ankle-2.jpg",thumbImg:"./images/ankle-2s.jpg",id:2},
			{largeImg:"./images/ankle-3.jpg",thumbImg:"./images/ankle-3s.jpg",id:3},
			{largeImg:"./images/ankle-4.jpg",thumbImg:"./images/ankle-4s.jpg",id:4},
			{largeImg:"./images/ankle-5.jpg",thumbImg:"./images/ankle-5s.jpg",id:5},
			{largeImg:"./images/ankle-6.jpg",thumbImg:"./images/ankle-6s.jpg",id:6},
		],
		balckAnkleSocksImagesFivePack : [
			{largeImg:"./images/ankle-5-pack.jpg",thumbImg:"./images/ankle-5s-pack.jpg",id:1},
			{largeImg:"./images/ankle-2.jpg",thumbImg:"./images/ankle-2s.jpg",id:2},
			{largeImg:"./images/ankle-3.jpg",thumbImg:"./images/ankle-3s.jpg",id:3},
			{largeImg:"./images/ankle-4.jpg",thumbImg:"./images/ankle-4s.jpg",id:4},
			{largeImg:"./images/ankle-5.jpg",thumbImg:"./images/ankle-5s.jpg",id:5},
			{largeImg:"./images/ankle-6.jpg",thumbImg:"./images/ankle-6s.jpg",id:6},
		],
		blueCrewSocksImages : [
			{largeImg:"./images/blue-crew.jpg",thumbImg:"./images/ankle-5s-pack.jpg",id:1},
			{largeImg:"./images/ankle-2.jpg",thumbImg:"./images/ankle-2s.jpg",id:2},
			{largeImg:"./images/ankle-3.jpg",thumbImg:"./images/ankle-3s.jpg",id:3},
			{largeImg:"./images/ankle-4.jpg",thumbImg:"./images/ankle-4s.jpg",id:4},
			{largeImg:"./images/ankle-5.jpg",thumbImg:"./images/ankle-5s.jpg",id:5},
			{largeImg:"./images/ankle-6.jpg",thumbImg:"./images/ankle-6s.jpg",id:6},
		],
		blueAnkleSocksImages : [
			{largeImg:"./images/blue-ankle.jpg",thumbImg:"./images/ankle-5s-pack.jpg",id:1},
			{largeImg:"./images/ankle-2.jpg",thumbImg:"./images/ankle-2s.jpg",id:2},
			{largeImg:"./images/ankle-3.jpg",thumbImg:"./images/ankle-3s.jpg",id:3},
			{largeImg:"./images/ankle-4.jpg",thumbImg:"./images/ankle-4s.jpg",id:4},
			{largeImg:"./images/ankle-5.jpg",thumbImg:"./images/ankle-5s.jpg",id:5},
			{largeImg:"./images/ankle-6.jpg",thumbImg:"./images/ankle-6s.jpg",id:6},
		]
	}
});

export default app;