function changeGiscusTheme() {
	const isDarkTheme =
		document.body.getAttribute("data-md-color-scheme") === "slate";
	const theme = isDarkTheme ? "dark" : "light";

	function sendMessage(message) {
		const iframe = document.querySelector("iframe.giscus-frame");
		if (!iframe) return;
		iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
	}

	sendMessage({
		setConfig: {
			theme: theme,
		},
	});
}

document.addEventListener("DOMContentLoaded", changeGiscusTheme);

const observer = new MutationObserver((mutations) => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	mutations.forEach((mutation) => {
		if (
			mutation.type === "attributes" &&
			mutation.attributeName === "data-md-color-scheme"
		) {
			changeGiscusTheme();
		}
	});
});

observer.observe(document.body, {
	attributes: true,
	attributeFilter: ["data-md-color-scheme"],
});
