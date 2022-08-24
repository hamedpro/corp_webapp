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
export function clone_simple_object(object_to_clone) {
	/* as it's obvious from it's name just use this 
	func for objects like {a:"hamed",b:"negin"} */
	var cloned_object = {};
	Object.keys(object_to_clone).forEach((key) => {
		cloned_object[key] = object_to_clone[key];
	});
	return cloned_object;
}
export class multi_lang_helper {
	constructor(context_value) {
		this.set_state = context_value.setAppContextState;
		this.state = context_value.AppContextState;
	}
	get lang() {
		return this.state.language;
	}
	render(strings_object) {
		return strings_object[this.lang];
	}
}
