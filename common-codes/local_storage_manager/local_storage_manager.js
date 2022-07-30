export function custom_ls() {
  //ls stands for window.localStorage
  var _get = window.localStorage.getItem;
  var _set = window.localStorage.setItem;
  var ls_key = "fjkafn0483284";
  if (_get(tag) === null) {
    _set(JSON.stringify({}));
  }
  return {
    log: () => {
      console.log(JSON.parse(_get(ls_key)));
    },
    s_val: (tag, new_value) => {
      //sets or updates value of a tag
      var tmp = JSON.parse(_get(ls_key));
      tmp[tag] = new_value;
      _set(tag, JSON.stringify(tmp));
    },
    g_val: (tag) => {
      var tmp = JSON.parse(_get(ls_key));
      return tmp[tag];
    },
    a_val: (tag, new_item) => {
      //a stands for append
      //if tag's value has array type appends new_val to it
      //otherwise nothing happens
      var tmp = JSON.parse(_get(ls_key));
      if (Array.isArray(tmp[tag])) {
        tmp[tag].push(new_item);
      }
      _set(tag);
    },
  };
}
