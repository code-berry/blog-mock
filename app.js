//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "I was passed through the /about route! But now I'll speak latin. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

let posts = [
	{
		title: 'Breaking up Big Tech',
    	body: 'It may seem odd, but it’s not unreasonable to say that the U.S. economy in the 1960s belonged to a company that, when it was amalgamated in 1911, was best known for its meat slicers, coffee grinders and systems to track employee punch cards.\r\n\r\nBy that decade, the New York-based IBM – fat from Second World War military spending and now fully invested in computing for businesses, including the game-changing introduction of the general-use System/360 series of computers – was a colossus. At its peak, it controlled nearly 70 per cent of that market.\r\n\r\nBut in 1969, the U.S. government brought an antitrust case against IBM, arguing that it held a monopoly and should be broken up into smaller parts. The suit ran on for 13 years, costing IBM and the government alike millions of dollars, not to mention the attention of IBM innovators. Even though a judge would rule the case had “no merit" in 1982, the suit hung over the formerly dominant company, and the decisions it made in an effort to settle the antitrust case – such as unbundling software and services from hardware – led to financial losses and disruption by cheaper and more efficient competitors. The antitrust case arguably made IBM less able to identify the market shift toward personal computers, and by 1980, its share of the market plunged to 32 per cent. In 1993, IBM posted a US$8-billion loss – at the time, the biggest in U.S. corporate history.',
    	author: 'Tyler Cowen',
    	time: '04/13/2019',
    	clock: '4:47PM'
    },
    {
	    title: 'Tech Should Solve Tax Problems',
    	body: 'There’s a good chance that like millions of Americans, you’re currently procrastinating on filing your taxes despite the fact Tax Day is less than 48 hours away. That makes sense. After all, technology gave us e-filing, thereby enabling all of our worst impulses to leave this very important legal obligation to the absolute last second.\r\n\r\nExcept these days, that’s all tech has given us when it comes to simplifying the whole tax process. The rest of it—deciphering tax laws, calculating deductions, etc.—is still a source of stress, anxiety, and lots of anguished hair pulling.\r\n\r\nThe worst part is, it definitely doesn’t have to be this way. What you may not have known is the IRS could potentially create a free, online filing system that requires you to do exactly nothing each year because the government would prepare your taxes for you. Those annoying W-2 forms your company mails you? They’re also obligated to send a copy to the IRS. Same goes for investment tax forms, 1099s, and all that other official paperwork. Basically, the IRS could potentially use the miracle of technology to pre-fill out your taxes, send them to you online, and you’d have the option to just go with it or file your own adjustments.',
	    author: 'Victoria Song',
    	time: '04/13/2019',
    	clock: '4:50PM'
    }
    ]

app.get('/', (req, res)=> {
	console.log(posts);
	res.render('home', {postArray: posts});
});

app.get('/about', (req, res) => {
	res.render('about', {abContent: aboutContent});
});

app.get('/compose', (req, res) => {
	res.render('compose');
});

app.get('/posts/:postId', (req, res) => {
	const bingo = _.lowerCase(req.params.postId);
	posts.forEach((obj) => {
		let titleOfPost = _.lowerCase(obj.title);
		if (bingo === titleOfPost) {
			res.render('post', {
				postTitle: obj.title,
				postBody: obj.body,
				today: obj.time
			});
		} else {
			console.log('Not a match');
		}
	});
});

app.post('/compose', (req, res) => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	let hh = today.getHours();
	let min = today.getMinutes();

	if (hh > 12) {
		hh-=12;
		min+='PM';
	} else {
		min+='AM';
	}

	let whatTime = hh + ':' + min;
	today = mm + '/' + dd + '/' + yyyy;

	const post = {
		title: req.body.postTitle,
		body: req.body.postBody,
		author: req.body.postAuthor,
		time: today,
		clock: whatTime
	};

	posts.push(post);
	res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Server started on port ", port);
});
