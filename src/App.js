import React, { Component } from "react";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quote: "",
			author: "",
			tweetStr: "http://twitter.com/intent/tweet?text=",
			fsize: "36px"
		};
	}

	newQuote() {
		fetch("https://talaikis.com/api/quotes/random/")
			.then(data => data.json())
			.then(data => {
				let fsize = data.quote.length > 150 ? "24px" : "32px";
				this.setState({
					quote: data.quote,
					author: data.author,
					tweetStr: this.state.tweetStr + data.quote + " - " + data.author,
					fsize: fsize
				});
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	componentDidMount() {
		this.newQuote();
	}

	render() {
		return (
			<div className="App">
				<div id="quote-box">
					<h1 id="title">Random Quote Machine</h1>
					<h3 id="text" style={{ fontSize: this.state.fsize }}>
						{this.state.quote}
					</h3>
					<div id="author">
						<div id="dash">{""}</div>
						{this.state.author}
					</div>
					<div className="buttons">
						<button id="new-quote" onClick={() => this.newQuote()}>
							New Quote
						</button>
						<a href={this.state.tweetStr} target="_blank">
							<button id="tweet-quote">Tweet Quote</button>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
