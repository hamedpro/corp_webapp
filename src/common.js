export function toHHMMSS(seconds) {
	var sec_num = parseInt(seconds, 10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return {
		hours,
		minutes,
		seconds,
	};
}
export function trim_text_if_its_long(string, max_length) {
	var tmp = string.split("");
	if (tmp.length > max_length) {
		var tmp2 = tmp.slice(0, max_length);
		tmp2.push("...");
		return tmp2.join("");
	} else {
		return tmp.join("");
	}
}
