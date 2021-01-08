const audioPlayer = document.getElementById("audioPlayer");
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const btnPopOut = document.getElementById("btnPopOut");
const output = document.getElementById("firstOut");
const volControl = document.getElementById("volControl");
let playing = false;

btnStart.addEventListener("click", audioAction);
btnStop.addEventListener("click", audioAction);
btnPopOut.addEventListener("click", popOut);
volControl.addEventListener("change", setVolume)
volControl.addEventListener("input", setVolume)

const src = "https://dancestream.danceradiouk.com/stream.mp3"

function playAudio() {
	audioPlayer.src = src;
	audioPlayer.play();
	playing = true;
	fetchMetaData();
	metaDataGetter = setInterval(fetchMetaData, 15000);
}

function setVolume() {
	audioPlayer.volume = this.value / 100;
}

function popOut() {
	audioPlayer.pause();
	window.open(window.location.href, "playerPopOut", "height=100, width=100");
}

async function fetchMetaData() {
	let response = await fetch("http://dancestream.danceradiouk.com/stats");
	let metaData = await response.text();
	console.log(metaData);
	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(metaData, "text/xml");
	} else {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(metaData);
	}
	let title = xmlDoc.getElementsByTagName("SONGTITLE")[0].childNodes[0].nodeValue;
	document.getElementById("firstOut").innerHTML = title;
}

function audioAction(event) {
	switch (event.target.id) {
		case "btnStart":
			playAudio();
			break;
		case "btnStop":
			audioPlayer.pause();
			clearInterval(metaDataGetter);
			playing = false;
			break;
	}
}
