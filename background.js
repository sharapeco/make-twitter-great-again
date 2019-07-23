const abrakadabra = "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14";
const targetURLs = [
	"*://twitter.com/*",
	"*://localhost/*", // for testing
];

function rewriteHeader(e) {
	[].some.call(e.requestHeaders, header => {
		if (/^user-agent$/i.test(header.name)) {
			header.value = abrakadabra;
			return true;
		}
	});
	return {
		requestHeaders: e.requestHeaders,
	};
}

(browser || chrome).webRequest.onBeforeSendHeaders.addListener(
	rewriteHeader,
	{urls: targetURLs},
	["blocking", "requestHeaders"]
);
