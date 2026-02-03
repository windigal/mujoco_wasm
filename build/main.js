var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/main.js
import * as THREE5 from "three";

// node_modules/three/examples/jsm/libs/lil-gui.module.min.js
var t = class _t {
  constructor(i2, e2, s2, n2, l2 = "div") {
    this.parent = i2, this.object = e2, this.property = s2, this._disabled = false, this._hidden = false, this.initialValue = this.getValue(), this.domElement = document.createElement("div"), this.domElement.classList.add("controller"), this.domElement.classList.add(n2), this.$name = document.createElement("div"), this.$name.classList.add("name"), _t.nextNameID = _t.nextNameID || 0, this.$name.id = "lil-gui-name-" + ++_t.nextNameID, this.$widget = document.createElement(l2), this.$widget.classList.add("widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(s2);
  }
  name(t2) {
    return this._name = t2, this.$name.innerHTML = t2, this;
  }
  onChange(t2) {
    return this._onChange = t2, this;
  }
  _callOnChange() {
    this.parent._callOnChange(this), void 0 !== this._onChange && this._onChange.call(this, this.getValue()), this._changed = true;
  }
  onFinishChange(t2) {
    return this._onFinishChange = t2, this;
  }
  _callOnFinishChange() {
    this._changed && (this.parent._callOnFinishChange(this), void 0 !== this._onFinishChange && this._onFinishChange.call(this, this.getValue())), this._changed = false;
  }
  reset() {
    return this.setValue(this.initialValue), this._callOnFinishChange(), this;
  }
  enable(t2 = true) {
    return this.disable(!t2);
  }
  disable(t2 = true) {
    return t2 === this._disabled || (this._disabled = t2, this.domElement.classList.toggle("disabled", t2), this.$disable.toggleAttribute("disabled", t2)), this;
  }
  show(t2 = true) {
    return this._hidden = !t2, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  options(t2) {
    const i2 = this.parent.add(this.object, this.property, t2);
    return i2.name(this._name), this.destroy(), i2;
  }
  min(t2) {
    return this;
  }
  max(t2) {
    return this;
  }
  step(t2) {
    return this;
  }
  decimals(t2) {
    return this;
  }
  listen(t2 = true) {
    return this._listening = t2, void 0 !== this._listenCallbackID && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this;
  }
  _listenCallback() {
    this._listenCallbackID = requestAnimationFrame(this._listenCallback);
    const t2 = this.save();
    t2 !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = t2;
  }
  getValue() {
    return this.object[this.property];
  }
  setValue(t2) {
    return this.object[this.property] = t2, this._callOnChange(), this.updateDisplay(), this;
  }
  updateDisplay() {
    return this;
  }
  load(t2) {
    return this.setValue(t2), this._callOnFinishChange(), this;
  }
  save() {
    return this.getValue();
  }
  destroy() {
    this.listen(false), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement);
  }
};
var i = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => {
      this.setValue(this.$input.checked), this._callOnFinishChange();
    }), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.checked = this.getValue(), this;
  }
};
function e(t2) {
  let i2, e2;
  return (i2 = t2.match(/(#|0x)?([a-f0-9]{6})/i)) ? e2 = i2[2] : (i2 = t2.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? e2 = parseInt(i2[1]).toString(16).padStart(2, 0) + parseInt(i2[2]).toString(16).padStart(2, 0) + parseInt(i2[3]).toString(16).padStart(2, 0) : (i2 = t2.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (e2 = i2[1] + i2[1] + i2[2] + i2[2] + i2[3] + i2[3]), !!e2 && "#" + e2;
}
var s = { isPrimitive: true, match: (t2) => "string" == typeof t2, fromHexString: e, toHexString: e };
var n = { isPrimitive: true, match: (t2) => "number" == typeof t2, fromHexString: (t2) => parseInt(t2.substring(1), 16), toHexString: (t2) => "#" + t2.toString(16).padStart(6, 0) };
var l = { isPrimitive: false, match: Array.isArray, fromHexString(t2, i2, e2 = 1) {
  const s2 = n.fromHexString(t2);
  i2[0] = (s2 >> 16 & 255) / 255 * e2, i2[1] = (s2 >> 8 & 255) / 255 * e2, i2[2] = (255 & s2) / 255 * e2;
}, toHexString: ([t2, i2, e2], s2 = 1) => n.toHexString(t2 * (s2 = 255 / s2) << 16 ^ i2 * s2 << 8 ^ e2 * s2 << 0) };
var r = { isPrimitive: false, match: (t2) => Object(t2) === t2, fromHexString(t2, i2, e2 = 1) {
  const s2 = n.fromHexString(t2);
  i2.r = (s2 >> 16 & 255) / 255 * e2, i2.g = (s2 >> 8 & 255) / 255 * e2, i2.b = (255 & s2) / 255 * e2;
}, toHexString: ({ r: t2, g: i2, b: e2 }, s2 = 1) => n.toHexString(t2 * (s2 = 255 / s2) << 16 ^ i2 * s2 << 8 ^ e2 * s2 << 0) };
var o = [s, n, l, r];
var a = class extends t {
  constructor(t2, i2, s2, n2) {
    var l2;
    super(t2, i2, s2, "color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = (l2 = this.initialValue, o.find((t3) => t3.match(l2))), this._rgbScale = n2, this._initialValueHexString = this.save(), this._textFocused = false, this.$input.addEventListener("input", () => {
      this._setValueFromHexString(this.$input.value);
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$text.addEventListener("input", () => {
      const t3 = e(this.$text.value);
      t3 && this._setValueFromHexString(t3);
    }), this.$text.addEventListener("focus", () => {
      this._textFocused = true, this.$text.select();
    }), this.$text.addEventListener("blur", () => {
      this._textFocused = false, this.updateDisplay(), this._callOnFinishChange();
    }), this.$disable = this.$text, this.updateDisplay();
  }
  reset() {
    return this._setValueFromHexString(this._initialValueHexString), this;
  }
  _setValueFromHexString(t2) {
    if (this._format.isPrimitive) {
      const i2 = this._format.fromHexString(t2);
      this.setValue(i2);
    } else this._format.fromHexString(t2, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
  }
  save() {
    return this._format.toHexString(this.getValue(), this._rgbScale);
  }
  load(t2) {
    return this._setValueFromHexString(t2), this._callOnFinishChange(), this;
  }
  updateDisplay() {
    return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this;
  }
};
var h = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", (t3) => {
      t3.preventDefault(), this.getValue().call(this.object);
    }), this.$button.addEventListener("touchstart", () => {
    }, { passive: true }), this.$disable = this.$button;
  }
};
var d = class extends t {
  constructor(t2, i2, e2, s2, n2, l2) {
    super(t2, i2, e2, "number"), this._initInput(), this.min(s2), this.max(n2);
    const r2 = void 0 !== l2;
    this.step(r2 ? l2 : this._getImplicitStep(), r2), this.updateDisplay();
  }
  decimals(t2) {
    return this._decimals = t2, this.updateDisplay(), this;
  }
  min(t2) {
    return this._min = t2, this._onUpdateMinMax(), this;
  }
  max(t2) {
    return this._max = t2, this._onUpdateMinMax(), this;
  }
  step(t2, i2 = true) {
    return this._step = t2, this._stepExplicit = i2, this;
  }
  updateDisplay() {
    const t2 = this.getValue();
    if (this._hasSlider) {
      let i2 = (t2 - this._min) / (this._max - this._min);
      i2 = Math.max(0, Math.min(i2, 1)), this.$fill.style.width = 100 * i2 + "%";
    }
    return this._inputFocused || (this.$input.value = void 0 === this._decimals ? t2 : t2.toFixed(this._decimals)), this;
  }
  _initInput() {
    this.$input = document.createElement("input"), this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$disable = this.$input;
    const t2 = (t3) => {
      const i3 = parseFloat(this.$input.value);
      isNaN(i3) || (this._snapClampSetValue(i3 + t3), this.$input.value = this.getValue());
    };
    let i2, e2, s2, n2, l2, r2 = false;
    const o2 = (t3) => {
      if (r2) {
        const s3 = t3.clientX - i2, n3 = t3.clientY - e2;
        Math.abs(n3) > 5 ? (t3.preventDefault(), this.$input.blur(), r2 = false, this._setDraggingStyle(true, "vertical")) : Math.abs(s3) > 5 && a2();
      }
      if (!r2) {
        const i3 = t3.clientY - s2;
        l2 -= i3 * this._step * this._arrowKeyMultiplier(t3), n2 + l2 > this._max ? l2 = this._max - n2 : n2 + l2 < this._min && (l2 = this._min - n2), this._snapClampSetValue(n2 + l2);
      }
      s2 = t3.clientY;
    }, a2 = () => {
      this._setDraggingStyle(false, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", o2), window.removeEventListener("mouseup", a2);
    };
    this.$input.addEventListener("input", () => {
      let t3 = parseFloat(this.$input.value);
      isNaN(t3) || (this._stepExplicit && (t3 = this._snap(t3)), this.setValue(this._clamp(t3)));
    }), this.$input.addEventListener("keydown", (i3) => {
      "Enter" === i3.code && this.$input.blur(), "ArrowUp" === i3.code && (i3.preventDefault(), t2(this._step * this._arrowKeyMultiplier(i3))), "ArrowDown" === i3.code && (i3.preventDefault(), t2(this._step * this._arrowKeyMultiplier(i3) * -1));
    }), this.$input.addEventListener("wheel", (i3) => {
      this._inputFocused && (i3.preventDefault(), t2(this._step * this._normalizeMouseWheel(i3)));
    }, { passive: false }), this.$input.addEventListener("mousedown", (t3) => {
      i2 = t3.clientX, e2 = s2 = t3.clientY, r2 = true, n2 = this.getValue(), l2 = 0, window.addEventListener("mousemove", o2), window.addEventListener("mouseup", a2);
    }), this.$input.addEventListener("focus", () => {
      this._inputFocused = true;
    }), this.$input.addEventListener("blur", () => {
      this._inputFocused = false, this.updateDisplay(), this._callOnFinishChange();
    });
  }
  _initSlider() {
    this._hasSlider = true, this.$slider = document.createElement("div"), this.$slider.classList.add("slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("hasSlider");
    const t2 = (t3) => {
      const i3 = this.$slider.getBoundingClientRect();
      let e3 = (s3 = t3, n3 = i3.left, l3 = i3.right, r3 = this._min, o3 = this._max, (s3 - n3) / (l3 - n3) * (o3 - r3) + r3);
      var s3, n3, l3, r3, o3;
      this._snapClampSetValue(e3);
    }, i2 = (i3) => {
      t2(i3.clientX);
    }, e2 = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("mousemove", i2), window.removeEventListener("mouseup", e2);
    };
    let s2, n2, l2 = false;
    const r2 = (i3) => {
      i3.preventDefault(), this._setDraggingStyle(true), t2(i3.touches[0].clientX), l2 = false;
    }, o2 = (i3) => {
      if (l2) {
        const t3 = i3.touches[0].clientX - s2, e3 = i3.touches[0].clientY - n2;
        Math.abs(t3) > Math.abs(e3) ? r2(i3) : (window.removeEventListener("touchmove", o2), window.removeEventListener("touchend", a2));
      } else i3.preventDefault(), t2(i3.touches[0].clientX);
    }, a2 = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("touchmove", o2), window.removeEventListener("touchend", a2);
    }, h2 = this._callOnFinishChange.bind(this);
    let d2;
    this.$slider.addEventListener("mousedown", (s3) => {
      this._setDraggingStyle(true), t2(s3.clientX), window.addEventListener("mousemove", i2), window.addEventListener("mouseup", e2);
    }), this.$slider.addEventListener("touchstart", (t3) => {
      t3.touches.length > 1 || (this._hasScrollBar ? (s2 = t3.touches[0].clientX, n2 = t3.touches[0].clientY, l2 = true) : r2(t3), window.addEventListener("touchmove", o2, { passive: false }), window.addEventListener("touchend", a2));
    }, { passive: false }), this.$slider.addEventListener("wheel", (t3) => {
      if (Math.abs(t3.deltaX) < Math.abs(t3.deltaY) && this._hasScrollBar) return;
      t3.preventDefault();
      const i3 = this._normalizeMouseWheel(t3) * this._step;
      this._snapClampSetValue(this.getValue() + i3), this.$input.value = this.getValue(), clearTimeout(d2), d2 = setTimeout(h2, 400);
    }, { passive: false });
  }
  _setDraggingStyle(t2, i2 = "horizontal") {
    this.$slider && this.$slider.classList.toggle("active", t2), document.body.classList.toggle("lil-gui-dragging", t2), document.body.classList.toggle("lil-gui-" + i2, t2);
  }
  _getImplicitStep() {
    return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
  }
  _onUpdateMinMax() {
    !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), false), this._initSlider(), this.updateDisplay());
  }
  _normalizeMouseWheel(t2) {
    let { deltaX: i2, deltaY: e2 } = t2;
    Math.floor(t2.deltaY) !== t2.deltaY && t2.wheelDelta && (i2 = 0, e2 = -t2.wheelDelta / 120, e2 *= this._stepExplicit ? 1 : 10);
    return i2 + -e2;
  }
  _arrowKeyMultiplier(t2) {
    let i2 = this._stepExplicit ? 1 : 10;
    return t2.shiftKey ? i2 *= 10 : t2.altKey && (i2 /= 10), i2;
  }
  _snap(t2) {
    const i2 = Math.round(t2 / this._step) * this._step;
    return parseFloat(i2.toPrecision(15));
  }
  _clamp(t2) {
    return t2 < this._min && (t2 = this._min), t2 > this._max && (t2 = this._max), t2;
  }
  _snapClampSetValue(t2) {
    this.setValue(this._clamp(this._snap(t2)));
  }
  get _hasScrollBar() {
    const t2 = this.parent.root.$children;
    return t2.scrollHeight > t2.clientHeight;
  }
  get _hasMin() {
    return void 0 !== this._min;
  }
  get _hasMax() {
    return void 0 !== this._max;
  }
};
var c = class extends t {
  constructor(t2, i2, e2, s2) {
    super(t2, i2, e2, "option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this._values = Array.isArray(s2) ? s2 : Object.values(s2), this._names = Array.isArray(s2) ? s2 : Object.keys(s2), this._names.forEach((t3) => {
      const i3 = document.createElement("option");
      i3.innerHTML = t3, this.$select.appendChild(i3);
    }), this.$select.addEventListener("change", () => {
      this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange();
    }), this.$select.addEventListener("focus", () => {
      this.$display.classList.add("focus");
    }), this.$select.addEventListener("blur", () => {
      this.$display.classList.remove("focus");
    }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.updateDisplay();
  }
  updateDisplay() {
    const t2 = this.getValue(), i2 = this._values.indexOf(t2);
    return this.$select.selectedIndex = i2, this.$display.innerHTML = -1 === i2 ? t2 : this._names[i2], this;
  }
};
var u = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => {
      this.setValue(this.$input.value);
    }), this.$input.addEventListener("keydown", (t3) => {
      "Enter" === t3.code && this.$input.blur();
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.value = this.getValue(), this;
  }
};
var p = false;
var g = class _g2 {
  constructor({ parent: t2, autoPlace: i2 = void 0 === t2, container: e2, width: s2, title: n2 = "Controls", injectStyles: l2 = true, touchStyles: r2 = true } = {}) {
    if (this.parent = t2, this.root = t2 ? t2.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = false, this._hidden = false, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("div"), this.$title.classList.add("title"), this.$title.setAttribute("role", "button"), this.$title.setAttribute("aria-expanded", true), this.$title.setAttribute("tabindex", 0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("keydown", (t3) => {
      "Enter" !== t3.code && "Space" !== t3.code || (t3.preventDefault(), this.$title.click());
    }), this.$title.addEventListener("touchstart", () => {
    }, { passive: true }), this.$children = document.createElement("div"), this.$children.classList.add("children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(n2), r2 && this.domElement.classList.add("allow-touch-styles"), this.parent) return this.parent.children.push(this), this.parent.folders.push(this), void this.parent.$children.appendChild(this.domElement);
    this.domElement.classList.add("root"), !p && l2 && (!(function(t3) {
      const i3 = document.createElement("style");
      i3.innerHTML = t3;
      const e3 = document.querySelector("head link[rel=stylesheet], head style");
      e3 ? document.head.insertBefore(i3, e3) : document.head.appendChild(i3);
    })('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"\u2195";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"\u25BE";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"\u25B8"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"\u2713";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'), p = true), e2 ? e2.appendChild(this.domElement) : i2 && (this.domElement.classList.add("autoPlace"), document.body.appendChild(this.domElement)), s2 && this.domElement.style.setProperty("--width", s2 + "px"), this.domElement.addEventListener("keydown", (t3) => t3.stopPropagation()), this.domElement.addEventListener("keyup", (t3) => t3.stopPropagation());
  }
  add(t2, e2, s2, n2, l2) {
    if (Object(s2) === s2) return new c(this, t2, e2, s2);
    const r2 = t2[e2];
    switch (typeof r2) {
      case "number":
        return new d(this, t2, e2, s2, n2, l2);
      case "boolean":
        return new i(this, t2, e2);
      case "string":
        return new u(this, t2, e2);
      case "function":
        return new h(this, t2, e2);
    }
    console.error("gui.add failed\n	property:", e2, "\n	object:", t2, "\n	value:", r2);
  }
  addColor(t2, i2, e2 = 1) {
    return new a(this, t2, i2, e2);
  }
  addFolder(t2) {
    return new _g2({ parent: this, title: t2 });
  }
  load(t2, i2 = true) {
    return t2.controllers && this.controllers.forEach((i3) => {
      i3 instanceof h || i3._name in t2.controllers && i3.load(t2.controllers[i3._name]);
    }), i2 && t2.folders && this.folders.forEach((i3) => {
      i3._title in t2.folders && i3.load(t2.folders[i3._title]);
    }), this;
  }
  save(t2 = true) {
    const i2 = { controllers: {}, folders: {} };
    return this.controllers.forEach((t3) => {
      if (!(t3 instanceof h)) {
        if (t3._name in i2.controllers) throw new Error(`Cannot save GUI with duplicate property "${t3._name}"`);
        i2.controllers[t3._name] = t3.save();
      }
    }), t2 && this.folders.forEach((t3) => {
      if (t3._title in i2.folders) throw new Error(`Cannot save GUI with duplicate folder "${t3._title}"`);
      i2.folders[t3._title] = t3.save();
    }), i2;
  }
  open(t2 = true) {
    return this._closed = !t2, this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("closed", this._closed), this;
  }
  close() {
    return this.open(false);
  }
  show(t2 = true) {
    return this._hidden = !t2, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  openAnimated(t2 = true) {
    return this._closed = !t2, this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(() => {
      const i2 = this.$children.clientHeight;
      this.$children.style.height = i2 + "px", this.domElement.classList.add("transition");
      const e2 = (t3) => {
        t3.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("transition"), this.$children.removeEventListener("transitionend", e2));
      };
      this.$children.addEventListener("transitionend", e2);
      const s2 = t2 ? this.$children.scrollHeight : 0;
      this.domElement.classList.toggle("closed", !t2), requestAnimationFrame(() => {
        this.$children.style.height = s2 + "px";
      });
    }), this;
  }
  title(t2) {
    return this._title = t2, this.$title.innerHTML = t2, this;
  }
  reset(t2 = true) {
    return (t2 ? this.controllersRecursive() : this.controllers).forEach((t3) => t3.reset()), this;
  }
  onChange(t2) {
    return this._onChange = t2, this;
  }
  _callOnChange(t2) {
    this.parent && this.parent._callOnChange(t2), void 0 !== this._onChange && this._onChange.call(this, { object: t2.object, property: t2.property, value: t2.getValue(), controller: t2 });
  }
  onFinishChange(t2) {
    return this._onFinishChange = t2, this;
  }
  _callOnFinishChange(t2) {
    this.parent && this.parent._callOnFinishChange(t2), void 0 !== this._onFinishChange && this._onFinishChange.call(this, { object: t2.object, property: t2.property, value: t2.getValue(), controller: t2 });
  }
  destroy() {
    this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach((t2) => t2.destroy());
  }
  controllersRecursive() {
    let t2 = Array.from(this.controllers);
    return this.folders.forEach((i2) => {
      t2 = t2.concat(i2.controllersRecursive());
    }), t2;
  }
  foldersRecursive() {
    let t2 = Array.from(this.folders);
    return this.folders.forEach((i2) => {
      t2 = t2.concat(i2.foldersRecursive());
    }), t2;
  }
};

// src/utils/DragStateManager.js
import * as THREE from "three";
import { Vector3 as Vector32 } from "three";
var DragStateManager = class {
  constructor(scene, renderer, camera, container, controls) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.container = container;
    this.controls = controls;
    this.mousePos = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Line.threshold = 0.1;
    this.grabDistance = 0;
    this.active = false;
    this.physicsObject = null;
    this.arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 15, 6710886);
    this.arrow.setLength(15, 3, 1);
    this.scene.add(this.arrow);
    this.arrow.line.material.transparent = true;
    this.arrow.cone.material.transparent = true;
    this.arrow.line.material.opacity = 0.5;
    this.arrow.cone.material.opacity = 0.5;
    this.arrow.visible = false;
    this.previouslySelected = null;
    this.higlightColor = 16711680;
    this.localHit = new Vector32();
    this.worldHit = new Vector32();
    this.currentWorld = new Vector32();
    this._onPointer = this.onPointer.bind(this);
    this.container.addEventListener("pointerdown", this._onPointer, true);
    document.addEventListener("pointermove", this._onPointer, true);
    document.addEventListener("pointerup", this._onPointer, true);
    document.addEventListener("pointerout", this._onPointer, true);
    this.container.addEventListener("dblclick", this._onPointer, false);
  }
  // 👇👇👇 新增：清理资源的方法 👇👇👇
  dispose() {
    this.container.removeEventListener("pointerdown", this._onPointer, true);
    document.removeEventListener("pointermove", this._onPointer, true);
    document.removeEventListener("pointerup", this._onPointer, true);
    document.removeEventListener("pointerout", this._onPointer, true);
    this.container.removeEventListener("dblclick", this._onPointer, false);
    if (this.arrow) {
      this.scene.remove(this.arrow);
      if (this.arrow.line.geometry) this.arrow.line.geometry.dispose();
      if (this.arrow.cone.geometry) this.arrow.cone.geometry.dispose();
      if (this.arrow.line.material) this.arrow.line.material.dispose();
      if (this.arrow.cone.material) this.arrow.cone.material.dispose();
    }
  }
  updateRaycaster(x, y) {
    var rect = this.renderer.domElement.getBoundingClientRect();
    this.mousePos.x = (x - rect.left) / rect.width * 2 - 1;
    this.mousePos.y = -((y - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mousePos, this.camera);
  }
  start(x, y) {
    this.physicsObject = null;
    this.updateRaycaster(x, y);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    for (let i2 = 0; i2 < intersects.length; i2++) {
      let obj = intersects[i2].object;
      if (obj.bodyID !== void 0 && obj.bodyID > 0) {
        this.physicsObject = obj;
        this.grabDistance = intersects[0].distance;
        let hit = this.raycaster.ray.origin.clone();
        hit.addScaledVector(this.raycaster.ray.direction, this.grabDistance);
        this.arrow.position.copy(hit);
        this.active = true;
        this.controls.enabled = false;
        this.localHit = obj.worldToLocal(hit.clone());
        this.worldHit.copy(hit);
        this.currentWorld.copy(hit);
        this.arrow.visible = true;
        break;
      }
    }
  }
  move(x, y) {
    if (this.active) {
      this.updateRaycaster(x, y);
      let hit = this.raycaster.ray.origin.clone();
      hit.addScaledVector(this.raycaster.ray.direction, this.grabDistance);
      this.currentWorld.copy(hit);
      this.update();
    }
  }
  update() {
    if (this.active && this.physicsObject) {
      this.worldHit.copy(this.localHit);
      this.physicsObject.localToWorld(this.worldHit);
      this.arrow.position.copy(this.worldHit);
      this.arrow.setDirection(this.currentWorld.clone().sub(this.worldHit).normalize());
      this.arrow.setLength(this.currentWorld.clone().sub(this.worldHit).length());
    }
  }
  end(evt) {
    this.physicsObject = null;
    this.active = false;
    if (this.controls) this.controls.enabled = true;
    if (this.arrow) this.arrow.visible = false;
    this.mouseDown = false;
  }
  onPointer(evt) {
    if (evt.type == "pointerdown") {
      this.start(evt.clientX, evt.clientY);
      this.mouseDown = true;
    } else if (evt.type == "pointermove" && this.mouseDown) {
      if (this.active) {
        this.move(evt.clientX, evt.clientY);
      }
    } else if (evt.type == "pointerup" || evt.type == "pointerout") {
      this.end(evt);
    }
    if (evt.type == "dblclick") {
      this.start(evt.clientX, evt.clientY);
      this.doubleClick = true;
      if (this.physicsObject) {
        if (this.physicsObject == this.previouslySelected) {
          this.physicsObject.material.emissive.setHex(0);
          this.previouslySelected = null;
        } else {
          if (this.previouslySelected) {
            this.previouslySelected.material.emissive.setHex(0);
          }
          this.physicsObject.material.emissive.setHex(this.higlightColor);
          this.previouslySelected = this.physicsObject;
        }
      } else {
        if (this.previouslySelected) {
          this.previouslySelected.material.emissive.setHex(0);
          this.previouslySelected = null;
        }
      }
    }
  }
};

// src/mujocoUtils.js
import * as THREE2 from "three";

// src/utils/Reflector.js
import {
  Color,
  Matrix4,
  Mesh,
  PerspectiveCamera,
  Plane,
  ShaderMaterial,
  UniformsUtils,
  Vector3 as Vector33,
  Vector4,
  WebGLRenderTarget,
  HalfFloatType,
  NoToneMapping,
  LinearSRGBColorSpace,
  MeshPhysicalMaterial
} from "three";
var Reflector = class _Reflector extends Mesh {
  constructor(geometry, options = {}) {
    super(geometry);
    this.isReflector = true;
    this.type = "Reflector";
    this.camera = new PerspectiveCamera();
    const scope = this;
    const color = options.color !== void 0 ? new Color(options.color) : new Color(8355711);
    const textureWidth = options.textureWidth || 1024;
    const textureHeight = options.textureHeight || 1024;
    const clipBias = options.clipBias || 0;
    const shader = options.shader || _Reflector.ReflectorShader;
    const multisample = options.multisample !== void 0 ? options.multisample : 4;
    const blendTexture = options.texture || void 0;
    const reflectorPlane = new Plane();
    const normal = new Vector33();
    const reflectorWorldPosition = new Vector33();
    const cameraWorldPosition = new Vector33();
    const rotationMatrix = new Matrix4();
    const lookAtPosition = new Vector33(0, 0, -1);
    const clipPlane = new Vector4();
    const view = new Vector33();
    const target = new Vector33();
    const q = new Vector4();
    const textureMatrix = new Matrix4();
    const virtualCamera = this.camera;
    const renderTarget = new WebGLRenderTarget(textureWidth, textureHeight, { samples: multisample, type: HalfFloatType });
    this.material = new MeshPhysicalMaterial({ map: blendTexture });
    this.material.uniforms = {
      tDiffuse: { value: renderTarget.texture },
      textureMatrix: { value: textureMatrix }
    };
    this.material.onBeforeCompile = (shader2) => {
      let bodyStart = shader2.vertexShader.indexOf("void main() {");
      shader2.vertexShader = shader2.vertexShader.slice(0, bodyStart) + "\nuniform mat4 textureMatrix;\nvarying vec4 vUv3;\n" + shader2.vertexShader.slice(bodyStart - 1, -1) + "	vUv3 = textureMatrix * vec4( position, 1.0 ); }";
      bodyStart = shader2.fragmentShader.indexOf("void main() {");
      shader2.fragmentShader = //'#define USE_UV\n' +
      "\nuniform sampler2D tDiffuse; \n varying vec4 vUv3;\n" + shader2.fragmentShader.slice(0, bodyStart) + shader2.fragmentShader.slice(bodyStart - 1, -1) + `	gl_FragColor = vec4( mix( texture2DProj( tDiffuse,  vUv3 ).rgb, gl_FragColor.rgb , 0.5), 1.0 );
				}`;
      shader2.uniforms.tDiffuse = { value: renderTarget.texture };
      shader2.uniforms.textureMatrix = { value: textureMatrix };
      this.material.uniforms = shader2.uniforms;
      this.material.userData.shader = shader2;
    };
    this.receiveShadow = true;
    this.onBeforeRender = function(renderer, scene, camera) {
      reflectorWorldPosition.setFromMatrixPosition(scope.matrixWorld);
      cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
      rotationMatrix.extractRotation(scope.matrixWorld);
      normal.set(0, 0, 1);
      normal.applyMatrix4(rotationMatrix);
      view.subVectors(reflectorWorldPosition, cameraWorldPosition);
      if (view.dot(normal) > 0) return;
      view.reflect(normal).negate();
      view.add(reflectorWorldPosition);
      rotationMatrix.extractRotation(camera.matrixWorld);
      lookAtPosition.set(0, 0, -1);
      lookAtPosition.applyMatrix4(rotationMatrix);
      lookAtPosition.add(cameraWorldPosition);
      target.subVectors(reflectorWorldPosition, lookAtPosition);
      target.reflect(normal).negate();
      target.add(reflectorWorldPosition);
      virtualCamera.position.copy(view);
      virtualCamera.up.set(0, 1, 0);
      virtualCamera.up.applyMatrix4(rotationMatrix);
      virtualCamera.up.reflect(normal);
      virtualCamera.lookAt(target);
      virtualCamera.far = camera.far;
      virtualCamera.updateMatrixWorld();
      virtualCamera.projectionMatrix.copy(camera.projectionMatrix);
      textureMatrix.set(
        0.5,
        0,
        0,
        0.5,
        0,
        0.5,
        0,
        0.5,
        0,
        0,
        0.5,
        0.5,
        0,
        0,
        0,
        1
      );
      textureMatrix.multiply(virtualCamera.projectionMatrix);
      textureMatrix.multiply(virtualCamera.matrixWorldInverse);
      textureMatrix.multiply(scope.matrixWorld);
      reflectorPlane.setFromNormalAndCoplanarPoint(normal, reflectorWorldPosition);
      reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse);
      clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant);
      const projectionMatrix = virtualCamera.projectionMatrix;
      q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
      q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
      q.z = -1;
      q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
      clipPlane.multiplyScalar(2 / clipPlane.dot(q));
      projectionMatrix.elements[2] = clipPlane.x;
      projectionMatrix.elements[6] = clipPlane.y;
      projectionMatrix.elements[10] = clipPlane.z + 1 - clipBias;
      projectionMatrix.elements[14] = clipPlane.w;
      scope.visible = false;
      const currentRenderTarget = renderer.getRenderTarget();
      const currentXrEnabled = renderer.xr.enabled;
      const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
      const currentOutputEncoding = renderer.outputColorSpace;
      const currentToneMapping = renderer.toneMapping;
      renderer.xr.enabled = false;
      renderer.shadowMap.autoUpdate = false;
      renderer.outputColorSpace = LinearSRGBColorSpace;
      renderer.toneMapping = NoToneMapping;
      renderer.setRenderTarget(renderTarget);
      renderer.state.buffers.depth.setMask(true);
      if (renderer.autoClear === false) renderer.clear();
      renderer.render(scene, virtualCamera);
      renderer.xr.enabled = currentXrEnabled;
      renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
      renderer.outputColorSpace = currentOutputEncoding;
      renderer.toneMapping = currentToneMapping;
      renderer.setRenderTarget(currentRenderTarget);
      const viewport = camera.viewport;
      if (viewport !== void 0) {
        renderer.state.viewport(viewport);
      }
      scope.visible = true;
    };
    this.getRenderTarget = function() {
      return renderTarget;
    };
    this.dispose = function() {
      renderTarget.dispose();
      scope.material.dispose();
    };
  }
};

// src/mujocoUtils.js
async function reloadFunc() {
  await this.reloadScene(this.params.scene);
}
function setupGUI(parentContext) {
  const style = document.createElement("style");
  style.innerHTML = `
        /* \u9009\u4E2D\u72B6\u6001\u7684\u6309\u94AE\u6837\u5F0F */
        .lil-gui .controller.toggled-on {
            border-left: 4px solid #00ff00 !important; /* \u5DE6\u4FA7\u4EAE\u6761 */
            background: rgba(0, 255, 0, 0.15); /* \u5FAE\u5F31\u7684\u7EFF\u8272\u80CC\u666F */
        }
        .lil-gui .controller.toggled-on .name {
            color: #fff;
            text-shadow: 0 0 5px #00ff00; /* \u6587\u5B57\u53D1\u5149 */
        }
        /* \u7A0D\u5FAE\u589E\u52A0\u6309\u94AE\u9AD8\u5EA6\uFF0C\u4F7F\u5176\u66F4\u50CF\u89E6\u63A7\u6309\u94AE */
        .lil-gui .button {
            line-height: 24px; 
        }
    `;
  document.head.appendChild(style);
  const setupToggleButton = (folder, params, key, name, onChange) => {
    const btnDef = {
      click: () => {
        params[key] = !params[key];
        updateVisual();
        if (onChange) onChange(params[key]);
      }
    };
    const ctrl = folder.add(btnDef, "click").name(name);
    const updateVisual = () => {
      const dom = ctrl.domElement.closest(".controller");
      if (params[key]) {
        dom.classList.add("toggled-on");
      } else {
        dom.classList.remove("toggled-on");
      }
    };
    updateVisual();
    ctrl.updateDisplayState = updateVisual;
    return ctrl;
  };
  parentContext.updateGUICallbacks.length = 0;
  parentContext.updateGUICallbacks.push((model, data, params) => {
    parentContext.camera.position.set(2, 1.7, 1.7);
    parentContext.controls.target.set(0, 0.7, 0);
    parentContext.controls.update();
  });
  const sceneFolder = parentContext.gui.addFolder("Scene");
  let reload = reloadFunc.bind(parentContext);
  sceneFolder.add(parentContext.params, "scene", {
    "Flat": "go2/flat.xml",
    "Cross Stairs": "go2/cross_stairs.xml",
    "Cross Slope": "go2/cross_slope.xml",
    "Stair Series": "go2/stairs.xml",
    "Race Track": "go2/race_track.xml"
  }).name("Select Scene").onChange(reload);
  sceneFolder.open();
  const aiFolder = parentContext.gui.addFolder("AI Controls");
  aiFolder.add(parentContext.params, "model", {
    "PPO": "ppo",
    "MOECTS": "moects"
  }).name("Model").onChange(() => {
    if (parentContext.params.enableRL) {
      parentContext.toggleRL(true);
    }
  });
  const enableCtrl = setupToggleButton(
    aiFolder,
    parentContext.params,
    "enableRL",
    "Enable AI Control",
    (enabled) => {
      parentContext.toggleRL(enabled);
    }
  );
  const refreshObj = {
    refresh: () => {
      if (!parentContext.params.enableRL) {
        parentContext.params.enableRL = true;
        enableCtrl.updateDisplayState();
        parentContext.toggleRL(true);
      } else {
        parentContext.toggleRL(true);
      }
    }
  };
  aiFolder.add(refreshObj, "refresh").name("Refresh AI Control");
  aiFolder.open();
  const cmdFolder = parentContext.gui.addFolder("Commands");
  cmdFolder.add(parentContext.inputHandler.max_cmd, "0", 0, 1.5).name("Max Vx (Front)");
  cmdFolder.add(parentContext.inputHandler.max_cmd, "1", 0, 1).name("Max Vy (Side)");
  cmdFolder.add(parentContext.inputHandler.max_cmd, "2", 0, 2).name("Max Yaw (Turn)");
  cmdFolder.open();
  const simFolder = parentContext.gui.addFolder("Simulation");
  const pauseSimulation = setupToggleButton(
    simFolder,
    parentContext.params,
    "paused",
    "Pause Simulation",
    (enabled) => {
      parentContext.toggleRL(enabled);
    }
  );
  pauseSimulation.onChange((value) => {
    if (value) {
      const pausedText = document.createElement("div");
      pausedText.style.position = "absolute";
      pausedText.style.top = "10px";
      pausedText.style.left = "10px";
      pausedText.style.color = "white";
      pausedText.style.font = "normal 18px Arial";
      pausedText.innerHTML = "pause";
      parentContext.container.appendChild(pausedText);
    } else {
      parentContext.container.removeChild(parentContext.container.lastChild);
    }
  });
  simFolder.add({ reload: () => {
    reload();
  } }, "reload").name("Reload");
  const resetSimulation = () => {
    parentContext.mujoco.mj_resetData(parentContext.model, parentContext.data);
    parentContext.mujoco.mj_forward(parentContext.model, parentContext.data);
  };
  simFolder.add({ reset: () => {
    resetSimulation();
  } }, "reset").name("Reset");
  simFolder.open();
  const camFolder = parentContext.gui.addFolder("Camera");
  setupToggleButton(camFolder, parentContext.params, "follow", "Follow Robot");
  setupToggleButton(camFolder, parentContext.params, "showArrows", "Show Velocity Arrows");
  camFolder.open();
  setupHelpMenu(parentContext);
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      parentContext.params.paused = !parentContext.params.paused;
      pauseSimulation.setValue(parentContext.params.paused);
      event.preventDefault();
    }
    if (event.ctrlKey && event.code === "KeyL") {
      reload();
      event.preventDefault();
    }
    if (event.code === "Backspace") {
      resetSimulation();
      event.preventDefault();
    }
    if (event.ctrlKey && event.code === "KeyA") {
      parentContext.camera.position.set(2, 1.7, 1.7);
      parentContext.controls.target.set(0, 0.7, 0);
      parentContext.controls.update();
      event.preventDefault();
    }
  });
}
function addRepoButton(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  Object.assign(link.style, {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // 背景圆圈颜色
    borderRadius: "50%",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    zIndex: "9999",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  });
  link.onmouseenter = () => {
    link.style.transform = "scale(1.1)";
  };
  link.onmouseleave = () => {
    link.style.transform = "scale(1.0)";
  };
  link.innerHTML = `
        <svg height="24" width="24" viewBox="0 0 16 16" version="1.1" style="fill: #333;">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
    `;
  document.body.appendChild(link);
}
function setupHelpMenu(parentContext) {
  let keyInnerHTML = "F1<br>Space<br>Ctrl L<br>Backspace<br>Ctrl A<br>";
  let actionInnerHTML = "Help<br>Play / Pause<br>Reload XML<br>Reset simulation<br>Reset free camera<br>";
  const displayHelpMenu = () => {
    if (parentContext.params.help) {
      const helpMenu = document.createElement("div");
      helpMenu.style.cssText = `
        position: absolute; top: 10px; left: 10px; color: white; font: normal 18px Arial;
        background-color: rgba(0, 0, 0, 0.5); padding: 10px; border-radius: 10px;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        width: 400px; height: 400px; overflow: auto; z-index: 1000;
      `;
      const helpMenuTitle = document.createElement("div");
      helpMenuTitle.style.font = "bold 24px Arial";
      helpMenu.appendChild(helpMenuTitle);
      const helpMenuTable = document.createElement("table");
      helpMenuTable.style.cssText = "width: 100%; margin-top: 10px;";
      helpMenu.appendChild(helpMenuTable);
      const helpMenuTableBody = document.createElement("tbody");
      helpMenuTable.appendChild(helpMenuTableBody);
      const helpMenuRow = document.createElement("tr");
      helpMenuTableBody.appendChild(helpMenuRow);
      const col1 = document.createElement("td");
      col1.style.cssText = "width: 50%; text-align: right; padding-right: 10px;";
      col1.innerHTML = actionInnerHTML;
      helpMenuRow.appendChild(col1);
      const col2 = document.createElement("td");
      col2.style.cssText = "width: 50%; text-align: left; padding-left: 10px;";
      col2.innerHTML = keyInnerHTML;
      helpMenuRow.appendChild(col2);
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "Close";
      closeBtn.style.cssText = "position: absolute; top: 10px; right: 10px; z-index: 1001;";
      closeBtn.onclick = () => helpMenu.remove();
      helpMenu.appendChild(closeBtn);
      document.body.appendChild(helpMenu);
    } else {
      if (document.body.lastChild.innerHTML && document.body.lastChild.innerHTML.includes("Close"))
        document.body.removeChild(document.body.lastChild);
    }
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "F1") {
      parentContext.params.help = !parentContext.params.help;
      displayHelpMenu();
      event.preventDefault();
    }
  });
}
async function loadSceneFromURL(mujoco2, filename, parent) {
  if (parent.data != null) {
    parent.data.delete();
    parent.model = null;
    parent.data = null;
  }
  parent.model = mujoco2.MjModel.loadFromXML("/working/" + filename);
  parent.data = new mujoco2.MjData(parent.model);
  let model = parent.model;
  let data = parent.data;
  let textDecoder = new TextDecoder("utf-8");
  let names_array = new Uint8Array(model.names);
  let fullString = textDecoder.decode(model.names);
  let names = fullString.split(textDecoder.decode(new ArrayBuffer(1)));
  let mujocoRoot = new THREE2.Group();
  mujocoRoot.name = "MuJoCo Root";
  parent.scene.add(mujocoRoot);
  let bodies = {};
  let meshes = {};
  let lights = [];
  let material = new THREE2.MeshPhysicalMaterial();
  material.color = new THREE2.Color(1, 1, 1);
  for (let g2 = 0; g2 < model.ngeom; g2++) {
    if (!(model.geom_group[g2] < 3)) {
      continue;
    }
    let b = model.geom_bodyid[g2];
    let type = model.geom_type[g2];
    let size = [
      model.geom_size[g2 * 3 + 0],
      model.geom_size[g2 * 3 + 1],
      model.geom_size[g2 * 3 + 2]
    ];
    if (!(b in bodies)) {
      bodies[b] = new THREE2.Group();
      let start_idx = model.name_bodyadr[b];
      let end_idx = start_idx;
      while (end_idx < names_array.length && names_array[end_idx] !== 0) {
        end_idx++;
      }
      let name_buffer = names_array.subarray(start_idx, end_idx);
      bodies[b].name = textDecoder.decode(name_buffer);
      bodies[b].bodyID = b;
      bodies[b].has_custom_mesh = false;
    }
    let geometry = new THREE2.SphereGeometry(size[0] * 0.5);
    if (type == mujoco2.mjtGeom.mjGEOM_PLANE.value) {
    } else if (type == mujoco2.mjtGeom.mjGEOM_HFIELD.value) {
    } else if (type == mujoco2.mjtGeom.mjGEOM_SPHERE.value) {
      geometry = new THREE2.SphereGeometry(size[0]);
    } else if (type == mujoco2.mjtGeom.mjGEOM_CAPSULE.value) {
      geometry = new THREE2.CapsuleGeometry(size[0], size[1] * 2, 20, 20);
    } else if (type == mujoco2.mjtGeom.mjGEOM_ELLIPSOID.value) {
      geometry = new THREE2.SphereGeometry(1);
    } else if (type == mujoco2.mjtGeom.mjGEOM_CYLINDER.value) {
      geometry = new THREE2.CylinderGeometry(size[0], size[0], size[1] * 2);
    } else if (type == mujoco2.mjtGeom.mjGEOM_BOX.value) {
      geometry = new THREE2.BoxGeometry(size[0] * 2, size[2] * 2, size[1] * 2);
    } else if (type == mujoco2.mjtGeom.mjGEOM_MESH.value) {
      let meshID = model.geom_dataid[g2];
      if (!(meshID in meshes)) {
        geometry = new THREE2.BufferGeometry();
        let vertex_buffer = model.mesh_vert.subarray(
          model.mesh_vertadr[meshID] * 3,
          (model.mesh_vertadr[meshID] + model.mesh_vertnum[meshID]) * 3
        );
        for (let v = 0; v < vertex_buffer.length; v += 3) {
          let temp = vertex_buffer[v + 1];
          vertex_buffer[v + 1] = vertex_buffer[v + 2];
          vertex_buffer[v + 2] = -temp;
        }
        let normal_buffer = model.mesh_normal.subarray(
          model.mesh_normaladr[meshID] * 3,
          (model.mesh_normaladr[meshID] + model.mesh_normalnum[meshID]) * 3
        );
        for (let v = 0; v < normal_buffer.length; v += 3) {
          let temp = normal_buffer[v + 1];
          normal_buffer[v + 1] = normal_buffer[v + 2];
          normal_buffer[v + 2] = -temp;
        }
        let uv_buffer = model.mesh_texcoord.subarray(
          model.mesh_texcoordadr[meshID] * 2,
          (model.mesh_texcoordadr[meshID] + model.mesh_texcoordnum[meshID]) * 2
        );
        let face_to_vertex_buffer = model.mesh_face.subarray(
          model.mesh_faceadr[meshID] * 3,
          (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3
        );
        let face_to_uv_buffer = model.mesh_facetexcoord.subarray(
          model.mesh_faceadr[meshID] * 3,
          (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3
        );
        let face_to_normal_buffer = model.mesh_facenormal.subarray(
          model.mesh_faceadr[meshID] * 3,
          (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3
        );
        let swizzled_uv_buffer = new Float32Array(vertex_buffer.length / 3 * 2);
        let swizzled_normal_buffer = new Float32Array(vertex_buffer.length);
        for (let t2 = 0; t2 < face_to_vertex_buffer.length / 3; t2++) {
          let vi0 = face_to_vertex_buffer[t2 * 3 + 0];
          let vi1 = face_to_vertex_buffer[t2 * 3 + 1];
          let vi2 = face_to_vertex_buffer[t2 * 3 + 2];
          let uvi0 = face_to_uv_buffer[t2 * 3 + 0];
          let uvi1 = face_to_uv_buffer[t2 * 3 + 1];
          let uvi2 = face_to_uv_buffer[t2 * 3 + 2];
          let nvi0 = face_to_normal_buffer[t2 * 3 + 0];
          let nvi1 = face_to_normal_buffer[t2 * 3 + 1];
          let nvi2 = face_to_normal_buffer[t2 * 3 + 2];
          swizzled_uv_buffer[vi0 * 2 + 0] = uv_buffer[uvi0 * 2 + 0];
          swizzled_uv_buffer[vi0 * 2 + 1] = uv_buffer[uvi0 * 2 + 1];
          swizzled_uv_buffer[vi1 * 2 + 0] = uv_buffer[uvi1 * 2 + 0];
          swizzled_uv_buffer[vi1 * 2 + 1] = uv_buffer[uvi1 * 2 + 1];
          swizzled_uv_buffer[vi2 * 2 + 0] = uv_buffer[uvi2 * 2 + 0];
          swizzled_uv_buffer[vi2 * 2 + 1] = uv_buffer[uvi2 * 2 + 1];
          swizzled_normal_buffer[vi0 * 3 + 0] = normal_buffer[nvi0 * 3 + 0];
          swizzled_normal_buffer[vi0 * 3 + 1] = normal_buffer[nvi0 * 3 + 1];
          swizzled_normal_buffer[vi0 * 3 + 2] = normal_buffer[nvi0 * 3 + 2];
          swizzled_normal_buffer[vi1 * 3 + 0] = normal_buffer[nvi1 * 3 + 0];
          swizzled_normal_buffer[vi1 * 3 + 1] = normal_buffer[nvi1 * 3 + 1];
          swizzled_normal_buffer[vi1 * 3 + 2] = normal_buffer[nvi1 * 3 + 2];
          swizzled_normal_buffer[vi2 * 3 + 0] = normal_buffer[nvi2 * 3 + 0];
          swizzled_normal_buffer[vi2 * 3 + 1] = normal_buffer[nvi2 * 3 + 1];
          swizzled_normal_buffer[vi2 * 3 + 2] = normal_buffer[nvi2 * 3 + 2];
        }
        geometry.setAttribute("position", new THREE2.BufferAttribute(vertex_buffer, 3));
        geometry.setAttribute("normal", new THREE2.BufferAttribute(swizzled_normal_buffer, 3));
        geometry.setAttribute("uv", new THREE2.BufferAttribute(swizzled_uv_buffer, 2));
        geometry.setIndex(Array.from(face_to_vertex_buffer));
        geometry.computeVertexNormals();
        meshes[meshID] = geometry;
      } else {
        geometry = meshes[meshID];
      }
      bodies[b].has_custom_mesh = true;
    }
    let texture = void 0;
    let color = [
      model.geom_rgba[g2 * 4 + 0],
      model.geom_rgba[g2 * 4 + 1],
      model.geom_rgba[g2 * 4 + 2],
      model.geom_rgba[g2 * 4 + 3]
    ];
    if (model.geom_matid[g2] != -1) {
      let matId = model.geom_matid[g2];
      color = [
        model.mat_rgba[matId * 4 + 0],
        model.mat_rgba[matId * 4 + 1],
        model.mat_rgba[matId * 4 + 2],
        model.mat_rgba[matId * 4 + 3]
      ];
      texture = void 0;
      const mjNTEXROLE = 10;
      const mjTEXROLE_RGB = 1;
      let texId = model.mat_texid[matId * mjNTEXROLE + mjTEXROLE_RGB];
      if (texId != -1) {
        let width = model.tex_width[texId];
        let height = model.tex_height[texId];
        let offset = model.tex_adr[texId];
        let channels = model.tex_nchannel[texId];
        let texData = model.tex_data;
        let rgbaArray = new Uint8Array(width * height * 4);
        for (let p2 = 0; p2 < width * height; p2++) {
          rgbaArray[p2 * 4 + 0] = texData[offset + (p2 * channels + 0)];
          rgbaArray[p2 * 4 + 1] = channels > 1 ? texData[offset + (p2 * channels + 1)] : rgbaArray[p2 * 4 + 0];
          rgbaArray[p2 * 4 + 2] = channels > 2 ? texData[offset + (p2 * channels + 2)] : rgbaArray[p2 * 4 + 0];
          rgbaArray[p2 * 4 + 3] = channels > 3 ? texData[offset + (p2 * channels + 3)] : 255;
        }
        texture = new THREE2.DataTexture(rgbaArray, width, height, THREE2.RGBAFormat, THREE2.UnsignedByteType);
        texture.repeat = new THREE2.Vector2(
          model.mat_texrepeat[model.geom_matid[g2] * 2 + 0],
          model.mat_texrepeat[model.geom_matid[g2] * 2 + 1]
        );
        texture.wrapS = THREE2.RepeatWrapping;
        texture.wrapT = THREE2.RepeatWrapping;
        texture.needsUpdate = true;
      }
    }
    let materialParams = {
      color: new THREE2.Color(color[0], color[1], color[2]),
      transparent: color[3] < 1,
      opacity: color[3] / 255,
      map: texture
    };
    if (model.geom_matid[g2] != -1) {
      let matId = model.geom_matid[g2];
      if (model.mat_specular && model.mat_specular.length > matId) {
        materialParams.specularIntensity = model.mat_specular[matId];
      }
      if (model.mat_reflectance && model.mat_reflectance.length > matId) {
        materialParams.reflectivity = model.mat_reflectance[matId];
      }
      if (model.mat_shininess && model.mat_shininess.length > matId) {
        materialParams.roughness = 1 - model.mat_shininess[matId];
      }
      if (model.mat_metallic && model.mat_metallic.length > matId) {
        materialParams.metalness = model.mat_metallic[matId];
      } else {
        materialParams.metalness = 0.1;
      }
    }
    let currentMaterial = new THREE2.MeshPhysicalMaterial(materialParams);
    let mesh;
    if (type == 0) {
      mesh = new Reflector(new THREE2.PlaneGeometry(100, 100), { clipBias: 3e-3, texture });
      mesh.rotateX(-Math.PI / 2);
    } else {
      mesh = new THREE2.Mesh(geometry, currentMaterial);
    }
    mesh.castShadow = g2 == 0 ? false : true;
    mesh.receiveShadow = type != 7;
    mesh.bodyID = b;
    bodies[b].add(mesh);
    getPosition(model.geom_pos, g2, mesh.position);
    if (type != 0) {
      getQuaternion(model.geom_quat, g2, mesh.quaternion);
    }
    if (type == 4) {
      mesh.scale.set(size[0], size[2], size[1]);
    }
  }
  let tendonMat = new THREE2.MeshPhongMaterial();
  tendonMat.color = new THREE2.Color(0.8, 0.3, 0.3);
  mujocoRoot.cylinders = new THREE2.InstancedMesh(
    new THREE2.CylinderGeometry(1, 1, 1),
    tendonMat,
    1023
  );
  mujocoRoot.cylinders.receiveShadow = true;
  mujocoRoot.cylinders.castShadow = true;
  mujocoRoot.add(mujocoRoot.cylinders);
  mujocoRoot.spheres = new THREE2.InstancedMesh(
    new THREE2.SphereGeometry(1, 10, 10),
    tendonMat,
    1023
  );
  mujocoRoot.spheres.receiveShadow = true;
  mujocoRoot.spheres.castShadow = true;
  mujocoRoot.add(mujocoRoot.spheres);
  for (let l2 = 0; l2 < model.nlight; l2++) {
    let light = new THREE2.DirectionalLight();
    if (model.light_type[l2] == 0) {
      light = new THREE2.SpotLight();
      light.angle = 1.51;
    } else if (model.light_type[l2] == 1) {
      light = new THREE2.DirectionalLight();
    } else if (model.light_type[l2] == 2) {
      light = new THREE2.PointLight();
    } else if (model.light_type[l2] == 3) {
      light = new THREE2.HemisphereLight();
    }
    light.angle = 1.11;
    light.decay = model.light_attenuation[l2] * 100;
    light.penumbra = 0.5;
    light.castShadow = true;
    light.intensity = light.intensity * 3.14 * 1;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 10;
    if (bodies[0]) {
      bodies[0].add(light);
    } else {
      mujocoRoot.add(light);
    }
    lights.push(light);
  }
  if (model.nlight == 0) {
    let light = new THREE2.DirectionalLight();
    mujocoRoot.add(light);
  }
  for (let b = 0; b < model.nbody; b++) {
    if (b == 0 || !bodies[0]) {
      mujocoRoot.add(bodies[b]);
    } else if (bodies[b]) {
      bodies[0].add(bodies[b]);
    } else {
      console.log("Body without Geometry detected; adding to bodies", b, bodies[b]);
      bodies[b] = new THREE2.Group();
      bodies[b].name = names[b + 1];
      bodies[b].bodyID = b;
      bodies[b].has_custom_mesh = false;
      bodies[0].add(bodies[b]);
    }
  }
  parent.mujocoRoot = mujocoRoot;
  return [model, data, bodies, lights];
}
function drawTendonsAndFlex(mujocoRoot, model, data) {
  let identityQuat = new THREE2.Quaternion();
  let numWraps = 0;
  if (mujocoRoot && mujocoRoot.cylinders) {
    let mat = new THREE2.Matrix4();
    for (let t2 = 0; t2 < model.ntendon; t2++) {
      let startW = data.ten_wrapadr[t2];
      let r2 = model.tendon_width[t2];
      for (let w = startW; w < startW + data.ten_wrapnum[t2] - 1; w++) {
        let tendonStart = getPosition(data.wrap_xpos, w, new THREE2.Vector3());
        let tendonEnd = getPosition(data.wrap_xpos, w + 1, new THREE2.Vector3());
        let tendonAvg = new THREE2.Vector3().addVectors(tendonStart, tendonEnd).multiplyScalar(0.5);
        let validStart = tendonStart.length() > 0.01;
        let validEnd = tendonEnd.length() > 0.01;
        if (validStart) {
          mujocoRoot.spheres.setMatrixAt(numWraps, mat.compose(tendonStart, identityQuat, new THREE2.Vector3(r2, r2, r2)));
        }
        if (validEnd) {
          mujocoRoot.spheres.setMatrixAt(numWraps + 1, mat.compose(tendonEnd, identityQuat, new THREE2.Vector3(r2, r2, r2)));
        }
        if (validStart && validEnd) {
          mat.compose(
            tendonAvg,
            identityQuat.setFromUnitVectors(
              new THREE2.Vector3(0, 1, 0),
              tendonEnd.clone().sub(tendonStart).normalize()
            ),
            new THREE2.Vector3(r2, tendonStart.distanceTo(tendonEnd), r2)
          );
          mujocoRoot.cylinders.setMatrixAt(numWraps, mat);
          numWraps++;
        }
      }
    }
    let curFlexSphereInd = numWraps;
    let tempvertPos = new THREE2.Vector3();
    let tempvertRad = new THREE2.Vector3();
    for (let i2 = 0; i2 < model.nflex; i2++) {
      for (let j = 0; j < model.flex_vertnum[i2]; j++) {
        let vertIndex = model.flex_vertadr[i2] + j;
        getPosition(data.flexvert_xpos, vertIndex, tempvertPos);
        let r2 = 0.01;
        mat.compose(tempvertPos, identityQuat, tempvertRad.set(r2, r2, r2));
        mujocoRoot.spheres.setMatrixAt(curFlexSphereInd, mat);
        curFlexSphereInd++;
      }
    }
    mujocoRoot.cylinders.count = numWraps;
    mujocoRoot.spheres.count = curFlexSphereInd;
    mujocoRoot.cylinders.instanceMatrix.needsUpdate = true;
    mujocoRoot.spheres.instanceMatrix.needsUpdate = true;
  }
}
async function downloadExampleScenesFolder(mujoco2) {
  let allFiles = [
    // go2 model files
    "go2/flat.xml",
    "go2/go2.xml",
    "go2/race_track.xml",
    "go2/cross_stairs.xml",
    "go2/cross_slope.xml",
    "go2/stairs.xml",
    "go2/assets/base_0.obj",
    "go2/assets/base_1.obj",
    "go2/assets/base_2.obj",
    "go2/assets/base_3.obj",
    "go2/assets/base_4.obj",
    "go2/assets/calf_0.obj",
    "go2/assets/calf_1.obj",
    "go2/assets/calf_mirror_0.obj",
    "go2/assets/calf_mirror_1.obj",
    "go2/assets/foot.obj",
    "go2/assets/hip_0.obj",
    "go2/assets/hip_1.obj",
    "go2/assets/thigh_0.obj",
    "go2/assets/thigh_1.obj",
    "go2/assets/thigh_mirror_0.obj",
    "go2/assets/thigh_mirror_1.obj",
    "go2/assets/height_field.png",
    "go2/assets/wood.png",
    "go2/dae/base.dae",
    "go2/dae/calf.dae",
    "go2/dae/calf_mirror.dae",
    "go2/dae/foot.dae",
    "go2/dae/hip.dae",
    "go2/dae/thigh.dae",
    "go2/dae/thigh_mirror.dae",
    "go2/urdf/go2.urdf",
    "go2/imgs/label_1.png",
    "go2/imgs/label_4.png",
    "go2/imgs/label_7.png",
    "go2/imgs/label_10.png"
  ];
  let requests = allFiles.map((url) => fetch("./assets/scenes/" + url));
  let responses = await Promise.all(requests);
  for (let i2 = 0; i2 < responses.length; i2++) {
    let split = allFiles[i2].split("/");
    let working = "/working/";
    for (let f = 0; f < split.length - 1; f++) {
      working += split[f];
      if (!mujoco2.FS.analyzePath(working).exists) {
        mujoco2.FS.mkdir(working);
      }
      working += "/";
    }
    if (allFiles[i2].endsWith(".png") || allFiles[i2].endsWith(".stl") || allFiles[i2].endsWith(".skn")) {
      mujoco2.FS.writeFile("/working/" + allFiles[i2], new Uint8Array(await responses[i2].arrayBuffer()));
    } else {
      mujoco2.FS.writeFile("/working/" + allFiles[i2], await responses[i2].text());
    }
  }
}
function getPosition(buffer, index, target, swizzle = true) {
  if (swizzle) {
    return target.set(
      buffer[index * 3 + 0],
      buffer[index * 3 + 2],
      -buffer[index * 3 + 1]
    );
  } else {
    return target.set(
      buffer[index * 3 + 0],
      buffer[index * 3 + 1],
      buffer[index * 3 + 2]
    );
  }
}
function getQuaternion(buffer, index, target, swizzle = true) {
  if (swizzle) {
    return target.set(
      -buffer[index * 4 + 1],
      -buffer[index * 4 + 3],
      buffer[index * 4 + 2],
      -buffer[index * 4 + 0]
    );
  } else {
    return target.set(
      buffer[index * 4 + 0],
      buffer[index * 4 + 1],
      buffer[index * 4 + 2],
      buffer[index * 4 + 3]
    );
  }
}
function toMujocoPos(target) {
  return target.set(target.x, -target.z, target.y);
}
function standardNormal() {
  return Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

// src/main.js
import load_mujoco from "mujoco_wasm";

// src/utils/SceneSetup.js
import * as THREE3 from "three";

// node_modules/three/examples/jsm/controls/OrbitControls.js
import {
  Controls,
  MOUSE,
  Quaternion as Quaternion2,
  Spherical,
  TOUCH,
  Vector2 as Vector23,
  Vector3 as Vector35,
  Plane as Plane2,
  Ray,
  MathUtils
} from "three";
var _changeEvent = { type: "change" };
var _startEvent = { type: "start" };
var _endEvent = { type: "end" };
var _ray = new Ray();
var _plane = new Plane2();
var _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);
var _v = new Vector35();
var _twoPI = 2 * Math.PI;
var _STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};
var _EPS = 1e-6;
var OrbitControls = class extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super(object, domElement);
    this.state = _STATE.NONE;
    this.target = new Vector35();
    this.cursor = new Vector35();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minTargetRadius = 0;
    this.maxTargetRadius = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.keyRotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.zoomToCursor = false;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" };
    this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this._domElementKeyEvents = null;
    this._lastPosition = new Vector35();
    this._lastQuaternion = new Quaternion2();
    this._lastTargetPosition = new Vector35();
    this._quat = new Quaternion2().setFromUnitVectors(object.up, new Vector35(0, 1, 0));
    this._quatInverse = this._quat.clone().invert();
    this._spherical = new Spherical();
    this._sphericalDelta = new Spherical();
    this._scale = 1;
    this._panOffset = new Vector35();
    this._rotateStart = new Vector23();
    this._rotateEnd = new Vector23();
    this._rotateDelta = new Vector23();
    this._panStart = new Vector23();
    this._panEnd = new Vector23();
    this._panDelta = new Vector23();
    this._dollyStart = new Vector23();
    this._dollyEnd = new Vector23();
    this._dollyDelta = new Vector23();
    this._dollyDirection = new Vector35();
    this._mouse = new Vector23();
    this._performCursorZoom = false;
    this._pointers = [];
    this._pointerPositions = {};
    this._controlActive = false;
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
    this._onContextMenu = onContextMenu.bind(this);
    this._onMouseWheel = onMouseWheel.bind(this);
    this._onKeyDown = onKeyDown.bind(this);
    this._onTouchStart = onTouchStart.bind(this);
    this._onTouchMove = onTouchMove.bind(this);
    this._onMouseDown = onMouseDown.bind(this);
    this._onMouseMove = onMouseMove.bind(this);
    this._interceptControlDown = interceptControlDown.bind(this);
    this._interceptControlUp = interceptControlUp.bind(this);
    if (this.domElement !== null) {
      this.connect(this.domElement);
    }
    this.update();
  }
  connect(element) {
    super.connect(element);
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointercancel", this._onPointerUp);
    this.domElement.addEventListener("contextmenu", this._onContextMenu);
    this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false });
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true });
    this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.removeEventListener("pointercancel", this._onPointerUp);
    this.domElement.removeEventListener("wheel", this._onMouseWheel);
    this.domElement.removeEventListener("contextmenu", this._onContextMenu);
    this.stopListenToKeyEvents();
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keydown", this._interceptControlDown, { capture: true });
    this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLElement} domElement - The DOM element
   */
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this._onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown);
      this._domElementKeyEvents = null;
    }
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0);
    this.object.position.copy(this.position0);
    this.object.zoom = this.zoom0;
    this.object.updateProjectionMatrix();
    this.dispatchEvent(_changeEvent);
    this.update();
    this.state = _STATE.NONE;
  }
  update(deltaTime = null) {
    const position = this.object.position;
    _v.copy(position).sub(this.target);
    _v.applyQuaternion(this._quat);
    this._spherical.setFromVector3(_v);
    if (this.autoRotate && this.state === _STATE.NONE) {
      this._rotateLeft(this._getAutoRotationAngle(deltaTime));
    }
    if (this.enableDamping) {
      this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
      this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;
    } else {
      this._spherical.theta += this._sphericalDelta.theta;
      this._spherical.phi += this._sphericalDelta.phi;
    }
    let min = this.minAzimuthAngle;
    let max = this.maxAzimuthAngle;
    if (isFinite(min) && isFinite(max)) {
      if (min < -Math.PI) min += _twoPI;
      else if (min > Math.PI) min -= _twoPI;
      if (max < -Math.PI) max += _twoPI;
      else if (max > Math.PI) max -= _twoPI;
      if (min <= max) {
        this._spherical.theta = Math.max(min, Math.min(max, this._spherical.theta));
      } else {
        this._spherical.theta = this._spherical.theta > (min + max) / 2 ? Math.max(min, this._spherical.theta) : Math.min(max, this._spherical.theta);
      }
    }
    this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
    this._spherical.makeSafe();
    if (this.enableDamping === true) {
      this.target.addScaledVector(this._panOffset, this.dampingFactor);
    } else {
      this.target.add(this._panOffset);
    }
    this.target.sub(this.cursor);
    this.target.clampLength(this.minTargetRadius, this.maxTargetRadius);
    this.target.add(this.cursor);
    let zoomChanged = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) {
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    } else {
      const prevRadius = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale);
      zoomChanged = prevRadius != this._spherical.radius;
    }
    _v.setFromSpherical(this._spherical);
    _v.applyQuaternion(this._quatInverse);
    position.copy(this.target).add(_v);
    this.object.lookAt(this.target);
    if (this.enableDamping === true) {
      this._sphericalDelta.theta *= 1 - this.dampingFactor;
      this._sphericalDelta.phi *= 1 - this.dampingFactor;
      this._panOffset.multiplyScalar(1 - this.dampingFactor);
    } else {
      this._sphericalDelta.set(0, 0, 0);
      this._panOffset.set(0, 0, 0);
    }
    if (this.zoomToCursor && this._performCursorZoom) {
      let newRadius = null;
      if (this.object.isPerspectiveCamera) {
        const prevRadius = _v.length();
        newRadius = this._clampDistance(prevRadius * this._scale);
        const radiusDelta = prevRadius - newRadius;
        this.object.position.addScaledVector(this._dollyDirection, radiusDelta);
        this.object.updateMatrixWorld();
        zoomChanged = !!radiusDelta;
      } else if (this.object.isOrthographicCamera) {
        const mouseBefore = new Vector35(this._mouse.x, this._mouse.y, 0);
        mouseBefore.unproject(this.object);
        const prevZoom = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
        this.object.updateProjectionMatrix();
        zoomChanged = prevZoom !== this.object.zoom;
        const mouseAfter = new Vector35(this._mouse.x, this._mouse.y, 0);
        mouseAfter.unproject(this.object);
        this.object.position.sub(mouseAfter).add(mouseBefore);
        this.object.updateMatrixWorld();
        newRadius = _v.length();
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
        this.zoomToCursor = false;
      }
      if (newRadius !== null) {
        if (this.screenSpacePanning) {
          this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(newRadius).add(this.object.position);
        } else {
          _ray.origin.copy(this.object.position);
          _ray.direction.set(0, 0, -1).transformDirection(this.object.matrix);
          if (Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT) {
            this.object.lookAt(this.target);
          } else {
            _plane.setFromNormalAndCoplanarPoint(this.object.up, this.target);
            _ray.intersectPlane(_plane, this.target);
          }
        }
      }
    } else if (this.object.isOrthographicCamera) {
      const prevZoom = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
      if (prevZoom !== this.object.zoom) {
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      }
    }
    this._scale = 1;
    this._performCursorZoom = false;
    if (zoomChanged || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS) {
      this.dispatchEvent(_changeEvent);
      this._lastPosition.copy(this.object.position);
      this._lastQuaternion.copy(this.object.quaternion);
      this._lastTargetPosition.copy(this.target);
      return true;
    }
    return false;
  }
  _getAutoRotationAngle(deltaTime) {
    if (deltaTime !== null) {
      return _twoPI / 60 * this.autoRotateSpeed * deltaTime;
    } else {
      return _twoPI / 60 / 60 * this.autoRotateSpeed;
    }
  }
  _getZoomScale(delta) {
    const normalizedDelta = Math.abs(delta * 0.01);
    return Math.pow(0.95, this.zoomSpeed * normalizedDelta);
  }
  _rotateLeft(angle) {
    this._sphericalDelta.theta -= angle;
  }
  _rotateUp(angle) {
    this._sphericalDelta.phi -= angle;
  }
  _panLeft(distance, objectMatrix) {
    _v.setFromMatrixColumn(objectMatrix, 0);
    _v.multiplyScalar(-distance);
    this._panOffset.add(_v);
  }
  _panUp(distance, objectMatrix) {
    if (this.screenSpacePanning === true) {
      _v.setFromMatrixColumn(objectMatrix, 1);
    } else {
      _v.setFromMatrixColumn(objectMatrix, 0);
      _v.crossVectors(this.object.up, _v);
    }
    _v.multiplyScalar(distance);
    this._panOffset.add(_v);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(deltaX, deltaY) {
    const element = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const position = this.object.position;
      _v.copy(position).sub(this.target);
      let targetDistance = _v.length();
      targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
      this._panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
      this._panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
    } else if (this.object.isOrthographicCamera) {
      this._panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
      this._panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
      this.enablePan = false;
    }
  }
  _dollyOut(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale /= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _dollyIn(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale *= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _updateZoomParameters(x, y) {
    if (!this.zoomToCursor) {
      return;
    }
    this._performCursorZoom = true;
    const rect = this.domElement.getBoundingClientRect();
    const dx = x - rect.left;
    const dy = y - rect.top;
    const w = rect.width;
    const h2 = rect.height;
    this._mouse.x = dx / w * 2 - 1;
    this._mouse.y = -(dy / h2) * 2 + 1;
    this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(dist) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, dist));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(event) {
    this._rotateStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownDolly(event) {
    this._updateZoomParameters(event.clientX, event.clientX);
    this._dollyStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownPan(event) {
    this._panStart.set(event.clientX, event.clientY);
  }
  _handleMouseMoveRotate(event) {
    this._rotateEnd.set(event.clientX, event.clientY);
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
    this.update();
  }
  _handleMouseMoveDolly(event) {
    this._dollyEnd.set(event.clientX, event.clientY);
    this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart);
    if (this._dollyDelta.y > 0) {
      this._dollyOut(this._getZoomScale(this._dollyDelta.y));
    } else if (this._dollyDelta.y < 0) {
      this._dollyIn(this._getZoomScale(this._dollyDelta.y));
    }
    this._dollyStart.copy(this._dollyEnd);
    this.update();
  }
  _handleMouseMovePan(event) {
    this._panEnd.set(event.clientX, event.clientY);
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
    this.update();
  }
  _handleMouseWheel(event) {
    this._updateZoomParameters(event.clientX, event.clientY);
    if (event.deltaY < 0) {
      this._dollyIn(this._getZoomScale(event.deltaY));
    } else if (event.deltaY > 0) {
      this._dollyOut(this._getZoomScale(event.deltaY));
    }
    this.update();
  }
  _handleKeyDown(event) {
    let needsUpdate = false;
    switch (event.code) {
      case this.keys.UP:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.BOTTOM:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, -this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.LEFT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.RIGHT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(-this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
    }
    if (needsUpdate) {
      event.preventDefault();
      this.update();
    }
  }
  _handleTouchStartRotate(event) {
    if (this._pointers.length === 1) {
      this._rotateStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateStart.set(x, y);
    }
  }
  _handleTouchStartPan(event) {
    if (this._pointers.length === 1) {
      this._panStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panStart.set(x, y);
    }
  }
  _handleTouchStartDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyStart.set(0, distance);
  }
  _handleTouchStartDollyPan(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enablePan) this._handleTouchStartPan(event);
  }
  _handleTouchStartDollyRotate(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enableRotate) this._handleTouchStartRotate(event);
  }
  _handleTouchMoveRotate(event) {
    if (this._pointers.length == 1) {
      this._rotateEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateEnd.set(x, y);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(event) {
    if (this._pointers.length === 1) {
      this._panEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panEnd.set(x, y);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyEnd.set(0, distance);
    this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed));
    this._dollyOut(this._dollyDelta.y);
    this._dollyStart.copy(this._dollyEnd);
    const centerX = (event.pageX + position.x) * 0.5;
    const centerY = (event.pageY + position.y) * 0.5;
    this._updateZoomParameters(centerX, centerY);
  }
  _handleTouchMoveDollyPan(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enablePan) this._handleTouchMovePan(event);
  }
  _handleTouchMoveDollyRotate(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enableRotate) this._handleTouchMoveRotate(event);
  }
  // pointers
  _addPointer(event) {
    this._pointers.push(event.pointerId);
  }
  _removePointer(event) {
    delete this._pointerPositions[event.pointerId];
    for (let i2 = 0; i2 < this._pointers.length; i2++) {
      if (this._pointers[i2] == event.pointerId) {
        this._pointers.splice(i2, 1);
        return;
      }
    }
  }
  _isTrackingPointer(event) {
    for (let i2 = 0; i2 < this._pointers.length; i2++) {
      if (this._pointers[i2] == event.pointerId) return true;
    }
    return false;
  }
  _trackPointer(event) {
    let position = this._pointerPositions[event.pointerId];
    if (position === void 0) {
      position = new Vector23();
      this._pointerPositions[event.pointerId] = position;
    }
    position.set(event.pageX, event.pageY);
  }
  _getSecondPointerPosition(event) {
    const pointerId = event.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[pointerId];
  }
  //
  _customWheelEvent(event) {
    const mode = event.deltaMode;
    const newEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      deltaY: event.deltaY
    };
    switch (mode) {
      case 1:
        newEvent.deltaY *= 16;
        break;
      case 2:
        newEvent.deltaY *= 100;
        break;
    }
    if (event.ctrlKey && !this._controlActive) {
      newEvent.deltaY *= 10;
    }
    return newEvent;
  }
};
function onPointerDown(event) {
  if (this.enabled === false) return;
  if (this._pointers.length === 0) {
    this.domElement.setPointerCapture(event.pointerId);
    this.domElement.addEventListener("pointermove", this._onPointerMove);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  if (this._isTrackingPointer(event)) return;
  this._addPointer(event);
  if (event.pointerType === "touch") {
    this._onTouchStart(event);
  } else {
    this._onMouseDown(event);
  }
}
function onPointerMove(event) {
  if (this.enabled === false) return;
  if (event.pointerType === "touch") {
    this._onTouchMove(event);
  } else {
    this._onMouseMove(event);
  }
}
function onPointerUp(event) {
  this._removePointer(event);
  switch (this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(event.pointerId);
      this.domElement.removeEventListener("pointermove", this._onPointerMove);
      this.domElement.removeEventListener("pointerup", this._onPointerUp);
      this.dispatchEvent(_endEvent);
      this.state = _STATE.NONE;
      break;
    case 1:
      const pointerId = this._pointers[0];
      const position = this._pointerPositions[pointerId];
      this._onTouchStart({ pointerId, pageX: position.x, pageY: position.y });
      break;
  }
}
function onMouseDown(event) {
  let mouseAction;
  switch (event.button) {
    case 0:
      mouseAction = this.mouseButtons.LEFT;
      break;
    case 1:
      mouseAction = this.mouseButtons.MIDDLE;
      break;
    case 2:
      mouseAction = this.mouseButtons.RIGHT;
      break;
    default:
      mouseAction = -1;
  }
  switch (mouseAction) {
    case MOUSE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(event);
      this.state = _STATE.DOLLY;
      break;
    case MOUSE.ROTATE:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      }
      break;
    case MOUSE.PAN:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onMouseMove(event) {
  switch (this.state) {
    case _STATE.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(event);
      break;
    case _STATE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(event);
      break;
    case _STATE.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(event);
      break;
  }
}
function onMouseWheel(event) {
  if (this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE) return;
  event.preventDefault();
  this.dispatchEvent(_startEvent);
  this._handleMouseWheel(this._customWheelEvent(event));
  this.dispatchEvent(_endEvent);
}
function onKeyDown(event) {
  if (this.enabled === false) return;
  this._handleKeyDown(event);
}
function onTouchStart(event) {
  this._trackPointer(event);
  switch (this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case TOUCH.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(event);
          this.state = _STATE.TOUCH_ROTATE;
          break;
        case TOUCH.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(event);
          this.state = _STATE.TOUCH_PAN;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case TOUCH.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(event);
          this.state = _STATE.TOUCH_DOLLY_PAN;
          break;
        case TOUCH.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(event);
          this.state = _STATE.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onTouchMove(event) {
  this._trackPointer(event);
  switch (this.state) {
    case _STATE.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(event);
      this.update();
      break;
    case _STATE.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(event);
      this.update();
      break;
    default:
      this.state = _STATE.NONE;
  }
}
function onContextMenu(event) {
  if (this.enabled === false) return;
  event.preventDefault();
}
function interceptControlDown(event) {
  if (event.key === "Control") {
    this._controlActive = true;
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}
function interceptControlUp(event) {
  if (event.key === "Control") {
    this._controlActive = false;
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}

// src/utils/SceneSetup.js
var SceneSetup = class {
  constructor(container) {
    this.container = container;
    this.scene = new THREE3.Scene();
    this.scene.name = "scene";
    this.scene.background = new THREE3.Color(0.15, 0.25, 0.35);
    this.scene.fog = new THREE3.Fog(this.scene.background, 15, 25.5);
    this.camera = new THREE3.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1e-3, 100);
    this.camera.name = "PerspectiveCamera";
    this.camera.position.set(2, 1.7, 1.7);
    this.scene.add(this.camera);
    this.ambientLight = new THREE3.AmbientLight(16777215, 0.1 * 3.14);
    this.scene.add(this.ambientLight);
    this.spotlight = new THREE3.SpotLight();
    this.spotlight.angle = 1.11;
    this.spotlight.distance = 1e4;
    this.spotlight.penumbra = 0.5;
    this.spotlight.castShadow = true;
    this.spotlight.intensity = this.spotlight.intensity * 3.14 * 10;
    this.spotlight.shadow.mapSize.width = 1024;
    this.spotlight.shadow.mapSize.height = 1024;
    this.spotlight.shadow.camera.near = 0.1;
    this.spotlight.shadow.camera.far = 100;
    this.spotlight.position.set(0, 3, 3);
    const targetObject = new THREE3.Object3D();
    targetObject.position.set(0, 1, 0);
    this.scene.add(targetObject);
    this.spotlight.target = targetObject;
    this.scene.add(this.spotlight);
    this.renderer = new THREE3.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE3.PCFSoftShadowMap;
    THREE3.ColorManagement.enabled = false;
    this.renderer.outputColorSpace = THREE3.LinearSRGBColorSpace;
    this.renderer.useLegacyLights = true;
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.7, 0);
    this.controls.panSpeed = 2;
    this.controls.zoomSpeed = 1;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.screenSpacePanning = true;
    this.controls.update();
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
};

// src/utils/InputHandler.js
var InputHandler = class {
  constructor() {
    this.cmd_vel = new Float32Array([0, 0, 0]);
    this.current_input = new Float32Array([0, 0, 0]);
    this.max_cmd = [1, 1, 2];
    this.smoothing_step = 0.02;
    this.keys = {
      w: false,
      s: false,
      a: false,
      d: false,
      q: false,
      e: false
    };
    this._onKey = (e2, isDown) => this.onKey(e2, isDown);
    window.addEventListener("keydown", (e2) => this._onKey(e2, true));
    window.addEventListener("keyup", (e2) => this._onKey(e2, false));
    window.addEventListener("blur", () => this.resetKeys());
  }
  onKey(event, isDown) {
    const key = event.key.toLowerCase();
    if (this.keys.hasOwnProperty(key)) {
      this.keys[key] = isDown;
    }
  }
  // 当窗口失去焦点时，清空所有按键状态
  resetKeys() {
    for (const key in this.keys) {
      this.keys[key] = false;
    }
  }
  // 辅助函数：让 current 数值以固定步长向 target 靠近
  approach(current, target, step) {
    if (current < target) {
      return Math.min(current + step, target);
    } else if (current > target) {
      return Math.max(current - step, target);
    }
    return target;
  }
  update() {
    let target_gx = 0, target_gy = 0, target_gr = 0;
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    let hasGamepadInput = false;
    if (gp) {
      let lx = gp.axes[0];
      let ly = gp.axes[1];
      let rx = gp.axes[2];
      const dead_zone = 0.1;
      if (Math.abs(lx) < dead_zone) lx = 0;
      if (Math.abs(ly) < dead_zone) ly = 0;
      if (Math.abs(rx) < dead_zone) rx = 0;
      if (lx !== 0 || ly !== 0 || rx !== 0) {
        hasGamepadInput = true;
        target_gx = -ly;
        target_gy = -lx;
        target_gr = -rx;
      }
    }
    if (!hasGamepadInput) {
      if (this.keys.w) target_gx += 1;
      if (this.keys.s) target_gx -= 1;
      if (this.keys.a) target_gy += 1;
      if (this.keys.d) target_gy -= 1;
      if (this.keys.q) target_gr += 1;
      if (this.keys.e) target_gr -= 1;
    }
    this.current_input[0] = this.approach(this.current_input[0], target_gx, this.smoothing_step);
    this.current_input[1] = this.approach(this.current_input[1], target_gy, this.smoothing_step);
    this.current_input[2] = this.approach(this.current_input[2], target_gr, this.smoothing_step);
    this.cmd_vel[0] = this.current_input[0] * this.max_cmd[0];
    this.cmd_vel[1] = this.current_input[1] * this.max_cmd[1];
    this.cmd_vel[2] = this.current_input[2] * this.max_cmd[2];
  }
  getCmd() {
    return this.cmd_vel;
  }
};

// src/utils/Visualizer.js
import * as THREE4 from "three";
var ArrowVisualizer = class {
  constructor(scene) {
    this.scene = scene;
    this.arrowCmd = this.createThickArrow(65280);
    this.arrowReal = this.createThickArrow(255);
    this.scene.add(this.arrowCmd);
    this.scene.add(this.arrowReal);
  }
  createThickArrow(color) {
    const arrowGroup = new THREE4.Group();
    const material = new THREE4.MeshPhongMaterial({ color, flatShading: true });
    const shaftGeo = new THREE4.CylinderGeometry(0.02, 0.02, 1, 12);
    shaftGeo.translate(0, 0.5, 0);
    const shaft = new THREE4.Mesh(shaftGeo, material);
    shaft.name = "shaft";
    arrowGroup.add(shaft);
    const headGeo = new THREE4.ConeGeometry(0.06, 0.15, 12);
    headGeo.translate(0, 0.075, 0);
    const head = new THREE4.Mesh(headGeo, material);
    head.name = "head";
    arrowGroup.add(head);
    arrowGroup.visible = false;
    return arrowGroup;
  }
  updateThickArrow(arrowGroup, origin, direction, length) {
    const maxLength = 1;
    const displayLength = Math.min(length, maxLength);
    if (displayLength < 0.05) {
      arrowGroup.visible = false;
      return;
    }
    arrowGroup.visible = true;
    arrowGroup.position.copy(origin);
    arrowGroup.quaternion.setFromUnitVectors(new THREE4.Vector3(0, 1, 0), direction);
    const headLen = 0.15;
    const shaftLen = Math.max(0, displayLength - headLen);
    const shaft = arrowGroup.getObjectByName("shaft");
    const head = arrowGroup.getObjectByName("head");
    shaft.scale.set(1, shaftLen, 1);
    head.position.y = shaftLen;
  }
  update(enabled, robotBody, qvel, cmd_vel) {
    if (!enabled || !robotBody) {
      this.arrowCmd.visible = false;
      this.arrowReal.visible = false;
      return;
    }
    const robotPos = robotBody.position;
    const arrowOrigin = robotPos.clone().add(new THREE4.Vector3(0, 0.4, 0));
    const realVel = new THREE4.Vector3(qvel[0], 0, -qvel[1]);
    const realSpeed = realVel.length();
    this.updateThickArrow(this.arrowReal, arrowOrigin, realVel.normalize(), realSpeed * 0.5);
    const localCmdVec = new THREE4.Vector3(cmd_vel[0], 0, -cmd_vel[1]);
    const robotQuat = robotBody.quaternion;
    const globalCmdVec = localCmdVec.applyQuaternion(robotQuat);
    globalCmdVec.y = 0;
    const cmdSpeed = globalCmdVec.length();
    this.updateThickArrow(this.arrowCmd, arrowOrigin, globalCmdVec.normalize(), cmdSpeed * 0.5);
  }
};
var InputVisualizer = class {
  constructor(container) {
    this.container = container;
    this.initUI();
  }
  initUI() {
    const style = document.createElement("style");
    style.innerHTML = `
            #input-hud {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 40px;
                align-items: center;
                pointer-events: none; /* \u8BA9\u9F20\u6807\u7A7F\u900F\uFF0C\u4E0D\u5F71\u54CD\u62D6\u62FD */
                user-select: none;
                font-family: 'Courier New', monospace;
                font-weight: bold;
            }

            /* --- \u952E\u76D8\u90E8\u5206 --- */
            .kb-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .kb-row {
                display: flex;
                gap: 5px;
                justify-content: center;
            }
            .key-box {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgba(255, 255, 255, 0.7);
                background: rgba(0, 0, 0, 0.3);
                transition: all 0.1s;
                font-size: 18px;
            }
            .key-box.active {
                background: rgba(0, 255, 0, 0.8);
                color: black;
                border-color: rgba(0, 255, 0, 1);
                transform: scale(0.95);
                box-shadow: 0 0 10px #00ff00;
            }

            /* --- \u624B\u67C4\u90E8\u5206 --- */
            .gp-group {
                display: flex;
                gap: 20px;
            }
            .stick-base {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.3);
                background: rgba(0, 0, 0, 0.3);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .stick-tip {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgba(0, 150, 255, 0.8);
                position: absolute;
                box-shadow: 0 0 5px rgba(0, 150, 255, 0.8);
                transition: transform 0.05s linear; /* \u5E73\u6ED1\u79FB\u52A8 */
            }
            .gp-label {
                position: absolute;
                bottom: -20px;
                width: 100%;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                font-size: 12px;
            }
        `;
    document.head.appendChild(style);
    this.hud = document.createElement("div");
    this.hud.id = "input-hud";
    this.hud.innerHTML = `
            <!-- \u952E\u76D8\u533A\u57DF -->
            <div class="kb-group">
                <div class="kb-row">
                    <div id="key-q" class="key-box">Q</div>
                    <div id="key-w" class="key-box">W</div>
                    <div id="key-e" class="key-box">E</div>
                </div>
                <div class="kb-row">
                    <div id="key-a" class="key-box">A</div>
                    <div id="key-s" class="key-box">S</div>
                    <div id="key-d" class="key-box">D</div>
                </div>
            </div>

            <!-- \u624B\u67C4\u533A\u57DF -->
            <div class="gp-group">
                <div class="stick-base">
                    <div id="stick-l" class="stick-tip"></div>
                    <div class="gp-label">L (Move)</div>
                </div>
                <div class="stick-base">
                    <div id="stick-r" class="stick-tip"></div>
                    <div class="gp-label">R (Turn)</div>
                </div>
            </div>
        `;
    this.container.appendChild(this.hud);
    this.els = {
      q: document.getElementById("key-q"),
      w: document.getElementById("key-w"),
      e: document.getElementById("key-e"),
      a: document.getElementById("key-a"),
      s: document.getElementById("key-s"),
      d: document.getElementById("key-d"),
      stickL: document.getElementById("stick-l"),
      stickR: document.getElementById("stick-r")
    };
  }
  update(inputHandler) {
    const keys = inputHandler.keys;
    this.toggleKey(this.els.w, keys.w);
    this.toggleKey(this.els.s, keys.s);
    this.toggleKey(this.els.a, keys.a);
    this.toggleKey(this.els.d, keys.d);
    this.toggleKey(this.els.q, keys.q);
    this.toggleKey(this.els.e, keys.e);
    const gp = navigator.getGamepads()[0];
    let lx = 0, ly = 0, rx = 0;
    if (gp) {
      lx = gp.axes[0];
      ly = gp.axes[1];
      rx = gp.axes[2];
      if (Math.abs(lx) < 0.1) lx = 0;
      if (Math.abs(ly) < 0.1) ly = 0;
      if (Math.abs(rx) < 0.1) rx = 0;
    } else {
      if (keys.a) lx = -1;
      if (keys.d) lx = 1;
      if (keys.w) ly = -1;
      if (keys.s) ly = 1;
      if (keys.q) rx = -1;
      if (keys.e) rx = 1;
    }
    const maxDist = 25;
    this.els.stickL.style.transform = `translate(${lx * maxDist}px, ${ly * maxDist}px)`;
    this.els.stickR.style.transform = `translate(${rx * maxDist}px, 0px)`;
  }
  toggleKey(el2, isActive) {
    if (isActive) el2.classList.add("active");
    else el2.classList.remove("active");
  }
};

// node_modules/onnxruntime-web/dist/ort.bundle.min.mjs
var ort_bundle_min_exports = {};
__export(ort_bundle_min_exports, {
  InferenceSession: () => Kp,
  TRACE: () => $r,
  TRACE_EVENT_BEGIN: () => wt,
  TRACE_EVENT_END: () => vt,
  TRACE_FUNC_BEGIN: () => Ne,
  TRACE_FUNC_END: () => Me,
  Tensor: () => qe,
  default: () => BS,
  env: () => we,
  registerBackend: () => Pt
});
var Ln = Object.defineProperty;
var Gp = Object.getOwnPropertyDescriptor;
var Hp = Object.getOwnPropertyNames;
var Fp = Object.prototype.hasOwnProperty;
var Wn = ((e2) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e2, { get: (t2, n2) => (typeof __require < "u" ? __require : t2)[n2] }) : e2)(function(e2) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + e2 + '" is not supported');
});
var L = (e2, t2) => () => (e2 && (t2 = e2(e2 = 0)), t2);
var Wt = (e2, t2) => {
  for (var n2 in t2) Ln(e2, n2, { get: t2[n2], enumerable: true });
};
var qp = (e2, t2, n2, r2) => {
  if (t2 && typeof t2 == "object" || typeof t2 == "function") for (let o2 of Hp(t2)) !Fp.call(e2, o2) && o2 !== n2 && Ln(e2, o2, { get: () => t2[o2], enumerable: !(r2 = Gp(t2, o2)) || r2.enumerable });
  return e2;
};
var Xt = (e2) => qp(Ln({}, "__esModule", { value: true }), e2);
var wr;
var kt;
var Pt;
var jp;
var Qi;
var Gn = L(() => {
  "use strict";
  wr = /* @__PURE__ */ new Map(), kt = [], Pt = (e2, t2, n2) => {
    if (t2 && typeof t2.init == "function" && typeof t2.createInferenceSessionHandler == "function") {
      let r2 = wr.get(e2);
      if (r2 === void 0) wr.set(e2, { backend: t2, priority: n2 });
      else {
        if (r2.priority > n2) return;
        if (r2.priority === n2 && r2.backend !== t2) throw new Error(`cannot register backend "${e2}" using priority ${n2}`);
      }
      if (n2 >= 0) {
        let o2 = kt.indexOf(e2);
        o2 !== -1 && kt.splice(o2, 1);
        for (let a2 = 0; a2 < kt.length; a2++) if (wr.get(kt[a2]).priority <= n2) {
          kt.splice(a2, 0, e2);
          return;
        }
        kt.push(e2);
      }
      return;
    }
    throw new TypeError("not a valid backend");
  }, jp = async (e2) => {
    let t2 = wr.get(e2);
    if (!t2) return "backend not found.";
    if (t2.initialized) return t2.backend;
    if (t2.aborted) return t2.error;
    {
      let n2 = !!t2.initPromise;
      try {
        return n2 || (t2.initPromise = t2.backend.init(e2)), await t2.initPromise, t2.initialized = true, t2.backend;
      } catch (r2) {
        return n2 || (t2.error = `${r2}`, t2.aborted = true), t2.error;
      } finally {
        delete t2.initPromise;
      }
    }
  }, Qi = async (e2) => {
    let t2 = e2.executionProviders || [], n2 = t2.map((d2) => typeof d2 == "string" ? d2 : d2.name), r2 = n2.length === 0 ? kt : n2, o2, a2 = [], s2 = /* @__PURE__ */ new Set();
    for (let d2 of r2) {
      let c2 = await jp(d2);
      typeof c2 == "string" ? a2.push({ name: d2, err: c2 }) : (o2 || (o2 = c2), o2 === c2 && s2.add(d2));
    }
    if (!o2) throw new Error(`no available backend found. ERR: ${a2.map((d2) => `[${d2.name}] ${d2.err}`).join(", ")}`);
    for (let { name: d2, err: c2 } of a2) n2.includes(d2) && console.warn(`removing requested execution provider "${d2}" from session options because it is not available: ${c2}`);
    let u2 = t2.filter((d2) => s2.has(typeof d2 == "string" ? d2 : d2.name));
    return [o2, new Proxy(e2, { get: (d2, c2) => c2 === "executionProviders" ? u2 : Reflect.get(d2, c2) })];
  };
});
var Yi = L(() => {
  "use strict";
  Gn();
});
var Xi;
var Ji = L(() => {
  "use strict";
  Xi = "1.23.2";
});
var ea;
var Ee;
var Hn = L(() => {
  "use strict";
  Ji();
  ea = "warning", Ee = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: Xi }, set logLevel(e2) {
    if (e2 !== void 0) {
      if (typeof e2 != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(e2) === -1) throw new Error(`Unsupported logging level: ${e2}`);
      ea = e2;
    }
  }, get logLevel() {
    return ea;
  } };
  Object.defineProperty(Ee, "logLevel", { enumerable: true });
});
var we;
var ta = L(() => {
  "use strict";
  Hn();
  we = Ee;
});
var ra;
var na;
var oa = L(() => {
  "use strict";
  ra = (e2, t2) => {
    let n2 = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
    n2.width = e2.dims[3], n2.height = e2.dims[2];
    let r2 = n2.getContext("2d");
    if (r2 != null) {
      let o2, a2;
      t2?.tensorLayout !== void 0 && t2.tensorLayout === "NHWC" ? (o2 = e2.dims[2], a2 = e2.dims[3]) : (o2 = e2.dims[3], a2 = e2.dims[2]);
      let s2 = t2?.format !== void 0 ? t2.format : "RGB", u2 = t2?.norm, d2, c2;
      u2 === void 0 || u2.mean === void 0 ? d2 = [255, 255, 255, 255] : typeof u2.mean == "number" ? d2 = [u2.mean, u2.mean, u2.mean, u2.mean] : (d2 = [u2.mean[0], u2.mean[1], u2.mean[2], 0], u2.mean[3] !== void 0 && (d2[3] = u2.mean[3])), u2 === void 0 || u2.bias === void 0 ? c2 = [0, 0, 0, 0] : typeof u2.bias == "number" ? c2 = [u2.bias, u2.bias, u2.bias, u2.bias] : (c2 = [u2.bias[0], u2.bias[1], u2.bias[2], 0], u2.bias[3] !== void 0 && (c2[3] = u2.bias[3]));
      let m = a2 * o2, f = 0, g2 = m, _ = m * 2, b = -1;
      s2 === "RGBA" ? (f = 0, g2 = m, _ = m * 2, b = m * 3) : s2 === "RGB" ? (f = 0, g2 = m, _ = m * 2) : s2 === "RBG" && (f = 0, _ = m, g2 = m * 2);
      for (let w = 0; w < a2; w++) for (let x = 0; x < o2; x++) {
        let v = (e2.data[f++] - c2[0]) * d2[0], $ = (e2.data[g2++] - c2[1]) * d2[1], T = (e2.data[_++] - c2[2]) * d2[2], C = b === -1 ? 255 : (e2.data[b++] - c2[3]) * d2[3];
        r2.fillStyle = "rgba(" + v + "," + $ + "," + T + "," + C + ")", r2.fillRect(x, w, 1, 1);
      }
      if ("toDataURL" in n2) return n2.toDataURL();
      throw new Error("toDataURL is not supported");
    } else throw new Error("Can not access image data");
  }, na = (e2, t2) => {
    let n2 = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), r2;
    if (n2 != null) {
      let o2, a2, s2;
      t2?.tensorLayout !== void 0 && t2.tensorLayout === "NHWC" ? (o2 = e2.dims[2], a2 = e2.dims[1], s2 = e2.dims[3]) : (o2 = e2.dims[3], a2 = e2.dims[2], s2 = e2.dims[1]);
      let u2 = t2 !== void 0 && t2.format !== void 0 ? t2.format : "RGB", d2 = t2?.norm, c2, m;
      d2 === void 0 || d2.mean === void 0 ? c2 = [255, 255, 255, 255] : typeof d2.mean == "number" ? c2 = [d2.mean, d2.mean, d2.mean, d2.mean] : (c2 = [d2.mean[0], d2.mean[1], d2.mean[2], 255], d2.mean[3] !== void 0 && (c2[3] = d2.mean[3])), d2 === void 0 || d2.bias === void 0 ? m = [0, 0, 0, 0] : typeof d2.bias == "number" ? m = [d2.bias, d2.bias, d2.bias, d2.bias] : (m = [d2.bias[0], d2.bias[1], d2.bias[2], 0], d2.bias[3] !== void 0 && (m[3] = d2.bias[3]));
      let f = a2 * o2;
      if (t2 !== void 0 && (t2.format !== void 0 && s2 === 4 && t2.format !== "RGBA" || s2 === 3 && t2.format !== "RGB" && t2.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
      let g2 = 4, _ = 0, b = 1, w = 2, x = 3, v = 0, $ = f, T = f * 2, C = -1;
      u2 === "RGBA" ? (v = 0, $ = f, T = f * 2, C = f * 3) : u2 === "RGB" ? (v = 0, $ = f, T = f * 2) : u2 === "RBG" && (v = 0, T = f, $ = f * 2), r2 = n2.createImageData(o2, a2);
      for (let A = 0; A < a2 * o2; _ += g2, b += g2, w += g2, x += g2, A++) r2.data[_] = (e2.data[v++] - m[0]) * c2[0], r2.data[b] = (e2.data[$++] - m[1]) * c2[1], r2.data[w] = (e2.data[T++] - m[2]) * c2[2], r2.data[x] = C === -1 ? 255 : (e2.data[C++] - m[3]) * c2[3];
    } else throw new Error("Can not access image data");
    return r2;
  };
});
var Fn;
var ia;
var aa;
var sa;
var ua;
var la;
var da = L(() => {
  "use strict";
  vr();
  Fn = (e2, t2) => {
    if (e2 === void 0) throw new Error("Image buffer must be defined");
    if (t2.height === void 0 || t2.width === void 0) throw new Error("Image height and width must be defined");
    if (t2.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
    let { height: n2, width: r2 } = t2, o2 = t2.norm ?? { mean: 255, bias: 0 }, a2, s2;
    typeof o2.mean == "number" ? a2 = [o2.mean, o2.mean, o2.mean, o2.mean] : a2 = [o2.mean[0], o2.mean[1], o2.mean[2], o2.mean[3] ?? 255], typeof o2.bias == "number" ? s2 = [o2.bias, o2.bias, o2.bias, o2.bias] : s2 = [o2.bias[0], o2.bias[1], o2.bias[2], o2.bias[3] ?? 0];
    let u2 = t2.format !== void 0 ? t2.format : "RGBA", d2 = t2.tensorFormat !== void 0 && t2.tensorFormat !== void 0 ? t2.tensorFormat : "RGB", c2 = n2 * r2, m = d2 === "RGBA" ? new Float32Array(c2 * 4) : new Float32Array(c2 * 3), f = 4, g2 = 0, _ = 1, b = 2, w = 3, x = 0, v = c2, $ = c2 * 2, T = -1;
    u2 === "RGB" && (f = 3, g2 = 0, _ = 1, b = 2, w = -1), d2 === "RGBA" ? T = c2 * 3 : d2 === "RBG" ? (x = 0, $ = c2, v = c2 * 2) : d2 === "BGR" && ($ = 0, v = c2, x = c2 * 2);
    for (let A = 0; A < c2; A++, g2 += f, b += f, _ += f, w += f) m[x++] = (e2[g2] + s2[0]) / a2[0], m[v++] = (e2[_] + s2[1]) / a2[1], m[$++] = (e2[b] + s2[2]) / a2[2], T !== -1 && w !== -1 && (m[T++] = (e2[w] + s2[3]) / a2[3]);
    return d2 === "RGBA" ? new De("float32", m, [1, 4, n2, r2]) : new De("float32", m, [1, 3, n2, r2]);
  }, ia = async (e2, t2) => {
    let n2 = typeof HTMLImageElement < "u" && e2 instanceof HTMLImageElement, r2 = typeof ImageData < "u" && e2 instanceof ImageData, o2 = typeof ImageBitmap < "u" && e2 instanceof ImageBitmap, a2 = typeof e2 == "string", s2, u2 = t2 ?? {}, d2 = () => {
      if (typeof document < "u") return document.createElement("canvas");
      if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
      throw new Error("Canvas is not supported");
    }, c2 = (m) => typeof HTMLCanvasElement < "u" && m instanceof HTMLCanvasElement || m instanceof OffscreenCanvas ? m.getContext("2d") : null;
    if (n2) {
      let m = d2();
      m.width = e2.width, m.height = e2.height;
      let f = c2(m);
      if (f != null) {
        let g2 = e2.height, _ = e2.width;
        if (t2 !== void 0 && t2.resizedHeight !== void 0 && t2.resizedWidth !== void 0 && (g2 = t2.resizedHeight, _ = t2.resizedWidth), t2 !== void 0) {
          if (u2 = t2, t2.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
          u2.tensorFormat = "RGBA", u2.height = g2, u2.width = _;
        } else u2.tensorFormat = "RGBA", u2.height = g2, u2.width = _;
        f.drawImage(e2, 0, 0), s2 = f.getImageData(0, 0, _, g2).data;
      } else throw new Error("Can not access image data");
    } else if (r2) {
      let m, f;
      if (t2 !== void 0 && t2.resizedWidth !== void 0 && t2.resizedHeight !== void 0 ? (m = t2.resizedHeight, f = t2.resizedWidth) : (m = e2.height, f = e2.width), t2 !== void 0 && (u2 = t2), u2.format = "RGBA", u2.height = m, u2.width = f, t2 !== void 0) {
        let g2 = d2();
        g2.width = f, g2.height = m;
        let _ = c2(g2);
        if (_ != null) _.putImageData(e2, 0, 0), s2 = _.getImageData(0, 0, f, m).data;
        else throw new Error("Can not access image data");
      } else s2 = e2.data;
    } else if (o2) {
      if (t2 === void 0) throw new Error("Please provide image config with format for Imagebitmap");
      let m = d2();
      m.width = e2.width, m.height = e2.height;
      let f = c2(m);
      if (f != null) {
        let g2 = e2.height, _ = e2.width;
        return f.drawImage(e2, 0, 0, _, g2), s2 = f.getImageData(0, 0, _, g2).data, u2.height = g2, u2.width = _, Fn(s2, u2);
      } else throw new Error("Can not access image data");
    } else {
      if (a2) return new Promise((m, f) => {
        let g2 = d2(), _ = c2(g2);
        if (!e2 || !_) return f();
        let b = new Image();
        b.crossOrigin = "Anonymous", b.src = e2, b.onload = () => {
          g2.width = b.width, g2.height = b.height, _.drawImage(b, 0, 0, g2.width, g2.height);
          let w = _.getImageData(0, 0, g2.width, g2.height);
          u2.height = g2.height, u2.width = g2.width, m(Fn(w.data, u2));
        };
      });
      throw new Error("Input data provided is not supported - aborted tensor creation");
    }
    if (s2 !== void 0) return Fn(s2, u2);
    throw new Error("Input data provided is not supported - aborted tensor creation");
  }, aa = (e2, t2) => {
    let { width: n2, height: r2, download: o2, dispose: a2 } = t2, s2 = [1, r2, n2, 4];
    return new De({ location: "texture", type: "float32", texture: e2, dims: s2, download: o2, dispose: a2 });
  }, sa = (e2, t2) => {
    let { dataType: n2, dims: r2, download: o2, dispose: a2 } = t2;
    return new De({ location: "gpu-buffer", type: n2 ?? "float32", gpuBuffer: e2, dims: r2, download: o2, dispose: a2 });
  }, ua = (e2, t2) => {
    let { dataType: n2, dims: r2, download: o2, dispose: a2 } = t2;
    return new De({ location: "ml-tensor", type: n2 ?? "float32", mlTensor: e2, dims: r2, download: o2, dispose: a2 });
  }, la = (e2, t2, n2) => new De({ location: "cpu-pinned", type: e2, data: t2, dims: n2 ?? [t2.length] });
});
var Ot;
var Jt;
var ca;
var pa;
var ma = L(() => {
  "use strict";
  Ot = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), Jt = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), ca = false, pa = () => {
    if (!ca) {
      ca = true;
      let e2 = typeof BigInt64Array < "u" && BigInt64Array.from, t2 = typeof BigUint64Array < "u" && BigUint64Array.from, n2 = globalThis.Float16Array, r2 = typeof n2 < "u" && n2.from;
      e2 && (Ot.set("int64", BigInt64Array), Jt.set(BigInt64Array, "int64")), t2 && (Ot.set("uint64", BigUint64Array), Jt.set(BigUint64Array, "uint64")), r2 ? (Ot.set("float16", n2), Jt.set(n2, "float16")) : Ot.set("float16", Uint16Array);
    }
  };
});
var fa;
var ha;
var ga = L(() => {
  "use strict";
  vr();
  fa = (e2) => {
    let t2 = 1;
    for (let n2 = 0; n2 < e2.length; n2++) {
      let r2 = e2[n2];
      if (typeof r2 != "number" || !Number.isSafeInteger(r2)) throw new TypeError(`dims[${n2}] must be an integer, got: ${r2}`);
      if (r2 < 0) throw new RangeError(`dims[${n2}] must be a non-negative integer, got: ${r2}`);
      t2 *= r2;
    }
    return t2;
  }, ha = (e2, t2) => {
    switch (e2.location) {
      case "cpu":
        return new De(e2.type, e2.data, t2);
      case "cpu-pinned":
        return new De({ location: "cpu-pinned", data: e2.data, type: e2.type, dims: t2 });
      case "texture":
        return new De({ location: "texture", texture: e2.texture, type: e2.type, dims: t2 });
      case "gpu-buffer":
        return new De({ location: "gpu-buffer", gpuBuffer: e2.gpuBuffer, type: e2.type, dims: t2 });
      case "ml-tensor":
        return new De({ location: "ml-tensor", mlTensor: e2.mlTensor, type: e2.type, dims: t2 });
      default:
        throw new Error(`tensorReshape: tensor location ${e2.location} is not supported`);
    }
  };
});
var De;
var vr = L(() => {
  "use strict";
  oa();
  da();
  ma();
  ga();
  De = class {
    constructor(t2, n2, r2) {
      pa();
      let o2, a2;
      if (typeof t2 == "object" && "location" in t2) switch (this.dataLocation = t2.location, o2 = t2.type, a2 = t2.dims, t2.location) {
        case "cpu-pinned": {
          let u2 = Ot.get(o2);
          if (!u2) throw new TypeError(`unsupported type "${o2}" to create tensor from pinned buffer`);
          if (!(t2.data instanceof u2)) throw new TypeError(`buffer should be of type ${u2.name}`);
          this.cpuData = t2.data;
          break;
        }
        case "texture": {
          if (o2 !== "float32") throw new TypeError(`unsupported type "${o2}" to create tensor from texture`);
          this.gpuTextureData = t2.texture, this.downloader = t2.download, this.disposer = t2.dispose;
          break;
        }
        case "gpu-buffer": {
          if (o2 !== "float32" && o2 !== "float16" && o2 !== "int32" && o2 !== "int64" && o2 !== "uint32" && o2 !== "uint8" && o2 !== "bool" && o2 !== "uint4" && o2 !== "int4") throw new TypeError(`unsupported type "${o2}" to create tensor from gpu buffer`);
          this.gpuBufferData = t2.gpuBuffer, this.downloader = t2.download, this.disposer = t2.dispose;
          break;
        }
        case "ml-tensor": {
          if (o2 !== "float32" && o2 !== "float16" && o2 !== "int32" && o2 !== "int64" && o2 !== "uint32" && o2 !== "uint64" && o2 !== "int8" && o2 !== "uint8" && o2 !== "bool" && o2 !== "uint4" && o2 !== "int4") throw new TypeError(`unsupported type "${o2}" to create tensor from MLTensor`);
          this.mlTensorData = t2.mlTensor, this.downloader = t2.download, this.disposer = t2.dispose;
          break;
        }
        default:
          throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
      }
      else {
        let u2, d2;
        if (typeof t2 == "string") if (o2 = t2, d2 = r2, t2 === "string") {
          if (!Array.isArray(n2)) throw new TypeError("A string tensor's data must be a string array.");
          u2 = n2;
        } else {
          let c2 = Ot.get(t2);
          if (c2 === void 0) throw new TypeError(`Unsupported tensor type: ${t2}.`);
          if (Array.isArray(n2)) {
            if (t2 === "float16" && c2 === Uint16Array || t2 === "uint4" || t2 === "int4") throw new TypeError(`Creating a ${t2} tensor from number array is not supported. Please use ${c2.name} as data.`);
            t2 === "uint64" || t2 === "int64" ? u2 = c2.from(n2, BigInt) : u2 = c2.from(n2);
          } else if (n2 instanceof c2) u2 = n2;
          else if (n2 instanceof Uint8ClampedArray) if (t2 === "uint8") u2 = Uint8Array.from(n2);
          else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
          else if (t2 === "float16" && n2 instanceof Uint16Array && c2 !== Uint16Array) u2 = new globalThis.Float16Array(n2.buffer, n2.byteOffset, n2.length);
          else throw new TypeError(`A ${o2} tensor's data must be type of ${c2}`);
        }
        else if (d2 = n2, Array.isArray(t2)) {
          if (t2.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
          let c2 = typeof t2[0];
          if (c2 === "string") o2 = "string", u2 = t2;
          else if (c2 === "boolean") o2 = "bool", u2 = Uint8Array.from(t2);
          else throw new TypeError(`Invalid element type of data array: ${c2}.`);
        } else if (t2 instanceof Uint8ClampedArray) o2 = "uint8", u2 = Uint8Array.from(t2);
        else {
          let c2 = Jt.get(t2.constructor);
          if (c2 === void 0) throw new TypeError(`Unsupported type for tensor data: ${t2.constructor}.`);
          o2 = c2, u2 = t2;
        }
        if (d2 === void 0) d2 = [u2.length];
        else if (!Array.isArray(d2)) throw new TypeError("A tensor's dims must be a number array");
        a2 = d2, this.cpuData = u2, this.dataLocation = "cpu";
      }
      let s2 = fa(a2);
      if (this.cpuData && s2 !== this.cpuData.length && !((o2 === "uint4" || o2 === "int4") && Math.ceil(s2 / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${s2}) does not match data length(${this.cpuData.length}).`);
      this.type = o2, this.dims = a2, this.size = s2;
    }
    static async fromImage(t2, n2) {
      return ia(t2, n2);
    }
    static fromTexture(t2, n2) {
      return aa(t2, n2);
    }
    static fromGpuBuffer(t2, n2) {
      return sa(t2, n2);
    }
    static fromMLTensor(t2, n2) {
      return ua(t2, n2);
    }
    static fromPinnedBuffer(t2, n2, r2) {
      return la(t2, n2, r2);
    }
    toDataURL(t2) {
      return ra(this, t2);
    }
    toImageData(t2) {
      return na(this, t2);
    }
    get data() {
      if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
      return this.cpuData;
    }
    get location() {
      return this.dataLocation;
    }
    get texture() {
      if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
      return this.gpuTextureData;
    }
    get gpuBuffer() {
      if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
      return this.gpuBufferData;
    }
    get mlTensor() {
      if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
      return this.mlTensorData;
    }
    async getData(t2) {
      switch (this.ensureValid(), this.dataLocation) {
        case "cpu":
        case "cpu-pinned":
          return this.data;
        case "texture":
        case "gpu-buffer":
        case "ml-tensor": {
          if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
          if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
          try {
            this.isDownloading = true;
            let n2 = await this.downloader();
            return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = n2, t2 && this.disposer && (this.disposer(), this.disposer = void 0), n2;
          } finally {
            this.isDownloading = false;
          }
        }
        default:
          throw new Error(`cannot get data from location: ${this.dataLocation}`);
      }
    }
    dispose() {
      if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
      this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
    }
    ensureValid() {
      if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
    }
    reshape(t2) {
      if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
      return ha(this, t2);
    }
  };
});
var qe;
var qn = L(() => {
  "use strict";
  vr();
  qe = De;
});
var $r;
var ya;
var Ne;
var Me;
var wt;
var vt;
var jn = L(() => {
  "use strict";
  Hn();
  $r = (e2, t2) => {
    (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.timeStamp(`${e2}::ORT::${t2}`);
  }, ya = (e2, t2) => {
    let n2 = new Error().stack?.split(/\r\n|\r|\n/g) || [], r2 = false;
    for (let o2 = 0; o2 < n2.length; o2++) {
      if (r2 && !n2[o2].includes("TRACE_FUNC")) {
        let a2 = `FUNC_${e2}::${n2[o2].trim().split(" ")[1]}`;
        t2 && (a2 += `::${t2}`), $r("CPU", a2);
        return;
      }
      n2[o2].includes("TRACE_FUNC") && (r2 = true);
    }
  }, Ne = (e2) => {
    (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || ya("BEGIN", e2);
  }, Me = (e2) => {
    (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || ya("END", e2);
  }, wt = (e2) => {
    (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.time(`ORT::${e2}`);
  }, vt = (e2) => {
    (typeof Ee.trace > "u" ? !Ee.wasm.trace : !Ee.trace) || console.timeEnd(`ORT::${e2}`);
  };
});
var xr;
var ba = L(() => {
  "use strict";
  Gn();
  qn();
  jn();
  xr = class e2 {
    constructor(t2) {
      this.handler = t2;
    }
    async run(t2, n2, r2) {
      Ne(), wt("InferenceSession.run");
      let o2 = {}, a2 = {};
      if (typeof t2 != "object" || t2 === null || t2 instanceof qe || Array.isArray(t2)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
      let s2 = true;
      if (typeof n2 == "object") {
        if (n2 === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
        if (n2 instanceof qe) throw new TypeError("'fetches' cannot be a Tensor");
        if (Array.isArray(n2)) {
          if (n2.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
          s2 = false;
          for (let c2 of n2) {
            if (typeof c2 != "string") throw new TypeError("'fetches' must be a string array or an object.");
            if (this.outputNames.indexOf(c2) === -1) throw new RangeError(`'fetches' contains invalid output name: ${c2}.`);
            o2[c2] = null;
          }
          if (typeof r2 == "object" && r2 !== null) a2 = r2;
          else if (typeof r2 < "u") throw new TypeError("'options' must be an object.");
        } else {
          let c2 = false, m = Object.getOwnPropertyNames(n2);
          for (let f of this.outputNames) if (m.indexOf(f) !== -1) {
            let g2 = n2[f];
            (g2 === null || g2 instanceof qe) && (c2 = true, s2 = false, o2[f] = g2);
          }
          if (c2) {
            if (typeof r2 == "object" && r2 !== null) a2 = r2;
            else if (typeof r2 < "u") throw new TypeError("'options' must be an object.");
          } else a2 = n2;
        }
      } else if (typeof n2 < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
      for (let c2 of this.inputNames) if (typeof t2[c2] > "u") throw new Error(`input '${c2}' is missing in 'feeds'.`);
      if (s2) for (let c2 of this.outputNames) o2[c2] = null;
      let u2 = await this.handler.run(t2, o2, a2), d2 = {};
      for (let c2 in u2) if (Object.hasOwnProperty.call(u2, c2)) {
        let m = u2[c2];
        m instanceof qe ? d2[c2] = m : d2[c2] = new qe(m.type, m.data, m.dims);
      }
      return vt("InferenceSession.run"), Me(), d2;
    }
    async release() {
      return this.handler.dispose();
    }
    static async create(t2, n2, r2, o2) {
      Ne(), wt("InferenceSession.create");
      let a2, s2 = {};
      if (typeof t2 == "string") {
        if (a2 = t2, typeof n2 == "object" && n2 !== null) s2 = n2;
        else if (typeof n2 < "u") throw new TypeError("'options' must be an object.");
      } else if (t2 instanceof Uint8Array) {
        if (a2 = t2, typeof n2 == "object" && n2 !== null) s2 = n2;
        else if (typeof n2 < "u") throw new TypeError("'options' must be an object.");
      } else if (t2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t2 instanceof SharedArrayBuffer) {
        let m = t2, f = 0, g2 = t2.byteLength;
        if (typeof n2 == "object" && n2 !== null) s2 = n2;
        else if (typeof n2 == "number") {
          if (f = n2, !Number.isSafeInteger(f)) throw new RangeError("'byteOffset' must be an integer.");
          if (f < 0 || f >= m.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);
          if (g2 = t2.byteLength - f, typeof r2 == "number") {
            if (g2 = r2, !Number.isSafeInteger(g2)) throw new RangeError("'byteLength' must be an integer.");
            if (g2 <= 0 || f + g2 > m.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength - f}].`);
            if (typeof o2 == "object" && o2 !== null) s2 = o2;
            else if (typeof o2 < "u") throw new TypeError("'options' must be an object.");
          } else if (typeof r2 < "u") throw new TypeError("'byteLength' must be a number.");
        } else if (typeof n2 < "u") throw new TypeError("'options' must be an object.");
        a2 = new Uint8Array(m, f, g2);
      } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
      let [u2, d2] = await Qi(s2), c2 = await u2.createInferenceSessionHandler(a2, d2);
      return vt("InferenceSession.create"), Me(), new e2(c2);
    }
    startProfiling() {
      this.handler.startProfiling();
    }
    endProfiling() {
      this.handler.endProfiling();
    }
    get inputNames() {
      return this.handler.inputNames;
    }
    get outputNames() {
      return this.handler.outputNames;
    }
    get inputMetadata() {
      return this.handler.inputMetadata;
    }
    get outputMetadata() {
      return this.handler.outputMetadata;
    }
  };
});
var Kp;
var _a = L(() => {
  "use strict";
  ba();
  Kp = xr;
});
var wa = L(() => {
  "use strict";
});
var va = L(() => {
  "use strict";
});
var $a = L(() => {
  "use strict";
});
var xa = L(() => {
  "use strict";
});
var Kn = {};
Wt(Kn, { InferenceSession: () => Kp, TRACE: () => $r, TRACE_EVENT_BEGIN: () => wt, TRACE_EVENT_END: () => vt, TRACE_FUNC_BEGIN: () => Ne, TRACE_FUNC_END: () => Me, Tensor: () => qe, env: () => we, registerBackend: () => Pt });
var Ve = L(() => {
  "use strict";
  Yi();
  ta();
  _a();
  qn();
  wa();
  va();
  jn();
  $a();
  xa();
});
var Sr = L(() => {
  "use strict";
});
var Ia = {};
Wt(Ia, { default: () => Zp });
var Ta;
var Ca;
var Zp;
var Aa = L(() => {
  "use strict";
  Zn();
  $t();
  Tr();
  Ta = "ort-wasm-proxy-worker", Ca = globalThis.self?.name === Ta;
  Ca && (self.onmessage = (e2) => {
    let { type: t2, in: n2 } = e2.data;
    try {
      switch (t2) {
        case "init-wasm":
          Cr(n2.wasm).then(() => {
            Ir(n2).then(() => {
              postMessage({ type: t2 });
            }, (r2) => {
              postMessage({ type: t2, err: r2 });
            });
          }, (r2) => {
            postMessage({ type: t2, err: r2 });
          });
          break;
        case "init-ep": {
          let { epName: r2, env: o2 } = n2;
          Ar(o2, r2).then(() => {
            postMessage({ type: t2 });
          }, (a2) => {
            postMessage({ type: t2, err: a2 });
          });
          break;
        }
        case "copy-from": {
          let { buffer: r2 } = n2, o2 = er(r2);
          postMessage({ type: t2, out: o2 });
          break;
        }
        case "create": {
          let { model: r2, options: o2 } = n2;
          Er(r2, o2).then((a2) => {
            postMessage({ type: t2, out: a2 });
          }, (a2) => {
            postMessage({ type: t2, err: a2 });
          });
          break;
        }
        case "release":
          kr(n2), postMessage({ type: t2 });
          break;
        case "run": {
          let { sessionId: r2, inputIndices: o2, inputs: a2, outputIndices: s2, options: u2 } = n2;
          Pr(r2, o2, a2, s2, new Array(s2.length).fill(null), u2).then((d2) => {
            d2.some((c2) => c2[3] !== "cpu") ? postMessage({ type: t2, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: t2, out: d2 }, zr([...a2, ...d2]));
          }, (d2) => {
            postMessage({ type: t2, err: d2 });
          });
          break;
        }
        case "end-profiling":
          Or(n2), postMessage({ type: t2 });
          break;
        default:
      }
    } catch (r2) {
      postMessage({ type: t2, err: r2 });
    }
  });
  Zp = Ca ? null : (e2) => new Worker(e2 ?? Le, { type: "module", name: Ta });
});
var ka = {};
Wt(ka, { default: () => Qp });
var Ea;
var Qp;
var Yp;
var Pa = L(() => {
  "use strict";
  Ea = async function(e2 = {}) {
    var t2, n2, r2 = e2, o2 = new Promise((i2, l2) => {
      t2 = i2, n2 = l2;
    }), a2 = typeof window == "object", s2 = typeof WorkerGlobalScope < "u", u2 = s2 && self.name?.startsWith("em-pthread");
    r2.mountExternalData = (i2, l2) => {
      i2.startsWith("./") && (i2 = i2.substring(2)), (r2.Fb || (r2.Fb = /* @__PURE__ */ new Map())).set(i2, l2);
    }, r2.unmountExternalData = () => {
      delete r2.Fb;
    };
    var d2 = globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, qc: true }).buffer.constructor;
    let c2 = (i2) => async (...l2) => {
      try {
        if (r2.Gb) throw Error("Session already started");
        let p2 = r2.Gb = { ec: l2[0], errors: [] }, h2 = await i2(...l2);
        if (r2.Gb !== p2) throw Error("Session mismatch");
        r2.Kb?.flush();
        let y = p2.errors;
        if (0 < y.length) {
          let S = await Promise.all(y);
          if (S = S.filter((k) => k), 0 < S.length) throw Error(S.join(`
`));
        }
        return h2;
      } finally {
        r2.Gb = null;
      }
    };
    r2.jsepInit = (i2, l2) => {
      if (i2 === "webgpu") {
        [r2.Kb, r2.Vb, r2.Zb, r2.Lb, r2.Yb, r2.Ab, r2.$b, r2.bc, r2.Wb, r2.Xb, r2.ac] = l2;
        let p2 = r2.Kb;
        r2.jsepRegisterBuffer = (h2, y, S, k) => p2.registerBuffer(h2, y, S, k), r2.jsepGetBuffer = (h2) => p2.getBuffer(h2), r2.jsepCreateDownloader = (h2, y, S) => p2.createDownloader(h2, y, S), r2.jsepOnCreateSession = (h2) => {
          p2.onCreateSession(h2);
        }, r2.jsepOnReleaseSession = (h2) => {
          p2.onReleaseSession(h2);
        }, r2.jsepOnRunStart = (h2) => p2.onRunStart(h2), r2.cc = (h2, y) => {
          p2.upload(h2, y);
        };
      } else if (i2 === "webnn") {
        let p2 = l2[0];
        [r2.oc, r2.Ob, r2.webnnEnsureTensor, r2.Pb, r2.webnnDownloadTensor, r2.nc, r2.webnnEnableTraceEvent] = l2.slice(1), r2.webnnReleaseTensorId = r2.Ob, r2.webnnUploadTensor = r2.Pb, r2.webnnRegisterMLContext = r2.nc, r2.webnnOnRunStart = (h2) => p2.onRunStart(h2), r2.webnnOnRunEnd = p2.onRunEnd.bind(p2), r2.webnnOnReleaseSession = (h2) => {
          p2.onReleaseSession(h2);
        }, r2.webnnCreateMLTensorDownloader = (h2, y) => p2.createMLTensorDownloader(h2, y), r2.webnnRegisterMLTensor = (h2, y, S, k) => p2.registerMLTensor(h2, y, S, k), r2.webnnCreateMLContext = (h2) => p2.createMLContext(h2), r2.webnnRegisterMLConstant = (h2, y, S, k, B, U) => p2.registerMLConstant(h2, y, S, k, B, r2.Fb, U), r2.webnnRegisterGraphInput = p2.registerGraphInput.bind(p2), r2.webnnIsGraphInput = p2.isGraphInput.bind(p2), r2.webnnRegisterGraphOutput = p2.registerGraphOutput.bind(p2), r2.webnnIsGraphOutput = p2.isGraphOutput.bind(p2), r2.webnnCreateTemporaryTensor = p2.createTemporaryTensor.bind(p2), r2.webnnIsGraphInputOutputTypeSupported = p2.isGraphInputOutputTypeSupported.bind(p2);
      }
    };
    let m = () => {
      let i2 = (l2, p2, h2) => (...y) => {
        let S = Xe, k = p2?.();
        y = l2(...y);
        let B = p2?.();
        return k !== B && (l2 = B, h2(k), p2 = h2 = null), Xe != S ? new Promise((U, G) => {
          kn = { resolve: U, reject: G };
        }) : y;
      };
      (() => {
        for (let l2 of ["_OrtAppendExecutionProvider", "_OrtCreateSession", "_OrtRun", "_OrtRunWithBinding", "_OrtBindInput"]) r2[l2] = i2(r2[l2], () => r2[l2], (p2) => r2[l2] = p2);
      })(), c2 !== void 0 && (r2._OrtRun = c2(r2._OrtRun), r2._OrtRunWithBinding = c2(r2._OrtRunWithBinding)), m = void 0;
    };
    r2.asyncInit = () => {
      m?.();
    };
    var f, g2, _ = (i2, l2) => {
      throw l2;
    }, b = import.meta.url, w = "";
    if (a2 || s2) {
      try {
        w = new URL(".", b).href;
      } catch {
      }
      s2 && (g2 = (i2) => {
        var l2 = new XMLHttpRequest();
        return l2.open("GET", i2, false), l2.responseType = "arraybuffer", l2.send(null), new Uint8Array(l2.response);
      }), f = async (i2) => {
        if (ce(i2)) return new Promise((p2, h2) => {
          var y = new XMLHttpRequest();
          y.open("GET", i2, true), y.responseType = "arraybuffer", y.onload = () => {
            y.status == 200 || y.status == 0 && y.response ? p2(y.response) : h2(y.status);
          }, y.onerror = h2, y.send(null);
        });
        var l2 = await fetch(i2, { credentials: "same-origin" });
        if (l2.ok) return l2.arrayBuffer();
        throw Error(l2.status + " : " + l2.url);
      };
    }
    var x, v, $, T, C, A, I, z, D, R, H, q, Y, ne, F, me = console.log.bind(console), oe = console.error.bind(console), j = me, ie = oe, Z = false, ce = (i2) => i2.startsWith("file://");
    function Te() {
      return v.buffer != C.buffer && fe(), C;
    }
    function pe() {
      return v.buffer != C.buffer && fe(), A;
    }
    function J() {
      return v.buffer != C.buffer && fe(), I;
    }
    function V() {
      return v.buffer != C.buffer && fe(), z;
    }
    function O() {
      return v.buffer != C.buffer && fe(), D;
    }
    function X() {
      return v.buffer != C.buffer && fe(), R;
    }
    function ze() {
      return v.buffer != C.buffer && fe(), H;
    }
    function Oe() {
      return v.buffer != C.buffer && fe(), ne;
    }
    if (u2) {
      let i2 = function(l2) {
        try {
          var p2 = l2.data, h2 = p2.Db;
          if (h2 === "load") {
            let y = [];
            self.onmessage = (S) => y.push(S), self.startWorker = () => {
              postMessage({ Db: "loaded" });
              for (let S of y) i2(S);
              self.onmessage = i2;
            };
            for (let S of p2.Sb) r2[S] && !r2[S].proxy || (r2[S] = (...k) => {
              postMessage({ Db: "callHandler", Rb: S, args: k });
            }, S == "print" && (j = r2[S]), S == "printErr" && (ie = r2[S]));
            v = p2.kc, fe(), F(p2.lc);
          } else if (h2 === "run") {
            vc(p2.Bb), Mn(p2.Bb, 0, 0, 1, 0, 0), qo(), An(p2.Bb), xe || (Ui(), xe = true);
            try {
              $c(p2.hc, p2.Jb);
            } catch (y) {
              if (y != "unwind") throw y;
            }
          } else p2.target !== "setimmediate" && (h2 === "checkMailbox" ? xe && dr() : h2 && (ie(`worker: received unknown command ${h2}`), ie(p2)));
        } catch (y) {
          throw Ni(), y;
        }
      };
      var Tg = i2, xe = false;
      self.onunhandledrejection = (l2) => {
        throw l2.reason || l2;
      }, self.onmessage = i2;
    }
    function fe() {
      var i2 = v.buffer;
      r2.HEAP8 = C = new Int8Array(i2), I = new Int16Array(i2), r2.HEAPU8 = A = new Uint8Array(i2), z = new Uint16Array(i2), r2.HEAP32 = D = new Int32Array(i2), r2.HEAPU32 = R = new Uint32Array(i2), H = new Float32Array(i2), ne = new Float64Array(i2), q = new BigInt64Array(i2), Y = new BigUint64Array(i2);
    }
    function Fe() {
      u2 ? startWorker(r2) : M.Da();
    }
    var mt, ft = 0, Nt = null;
    function No() {
      if (--ft == 0 && Nt) {
        var i2 = Nt;
        Nt = null, i2();
      }
    }
    function ht(i2) {
      throw ie(i2 = "Aborted(" + i2 + ")"), Z = true, i2 = new WebAssembly.RuntimeError(i2 + ". Build with -sASSERTIONS for more info."), n2(i2), i2;
    }
    function Vo() {
      return { a: { L: Lp, Aa: Vp, b: Sc, $: Qo, A: Jo, pa: ei, X: ti, Z: ri, qa: ni, na: oi, ga: ii, ma: ai, J: si, Y: ui, V: li, oa: di, W: ci, va: Tc, E: Ic, Q: Ac, O: kc, D: Oc, v: zc, s: Dc, P: Bc, z: Wc, R: Gc, ja: Hc, T: Fc, aa: qc, M: jc, F: Kc, ia: An, sa: Zc, r: Qc, Ca: Yc, w: ep, o: tp, m: np, c: Sn, Ba: op, n: ip, j: up, u: lp, p: dp, f: cp, t: pp, l: mp, e: fp, k: hp, h: gp, g: yp, d: bp, da: _p, ea: wp, fa: vp, ba: Si, ca: Ti, N: Ci, xa: xp, ua: Cp, i: Ip, C: Ap, G: Ep, ta: Sp, x: kp, ra: Pp, U: Op, q: $p, y: zp, K: Dp, S: Bp, za: Mp, ya: Rp, ka: ki, la: Pi, _: wn, B: Oi, I: zi, ha: Di, H: Bi, a: v, wa: _n } };
    }
    class yn {
      name = "ExitStatus";
      constructor(l2) {
        this.message = `Program terminated with exit(${l2})`, this.status = l2;
      }
    }
    var Lo = (i2) => {
      i2.terminate(), i2.onmessage = () => {
      };
    }, bn = [], Wo = (i2) => {
      yt.length == 0 && (Ko(), jo(yt[0]));
      var l2 = yt.pop();
      if (!l2) return 6;
      Zt.push(l2), It[i2.Bb] = l2, l2.Bb = i2.Bb;
      var p2 = { Db: "run", hc: i2.fc, Jb: i2.Jb, Bb: i2.Bb };
      return l2.postMessage(p2, i2.Nb), 0;
    }, gt = 0, $e = (i2, l2, ...p2) => {
      for (var h2 = 2 * p2.length, y = Nn(), S = Un(8 * h2), k = S >>> 3, B = 0; B < p2.length; B++) {
        var U = p2[B];
        typeof U == "bigint" ? (q[k + 2 * B] = 1n, q[k + 2 * B + 1] = U) : (q[k + 2 * B] = 0n, Oe()[k + 2 * B + 1 >>> 0] = U);
      }
      return i2 = Vi(i2, 0, h2, S, l2), _r(y), i2;
    };
    function _n(i2) {
      if (u2) return $e(0, 1, i2);
      if (T = i2, !(0 < gt)) {
        for (var l2 of Zt) Lo(l2);
        for (l2 of yt) Lo(l2);
        yt = [], Zt = [], It = {}, Z = true;
      }
      _(0, new yn(i2));
    }
    function Go(i2) {
      if (u2) return $e(1, 0, i2);
      wn(i2);
    }
    var wn = (i2) => {
      if (T = i2, u2) throw Go(i2), "unwind";
      _n(i2);
    }, yt = [], Zt = [], Ho = [], It = {}, Fo = (i2) => {
      var l2 = i2.Bb;
      delete It[l2], yt.push(i2), Zt.splice(Zt.indexOf(i2), 1), i2.Bb = 0, Li(l2);
    };
    function qo() {
      Ho.forEach((i2) => i2());
    }
    var jo = (i2) => new Promise((l2) => {
      i2.onmessage = (y) => {
        var S = (y = y.data).Db;
        if (y.Hb && y.Hb != Bn()) {
          var k = It[y.Hb];
          k ? k.postMessage(y, y.Nb) : ie(`Internal error! Worker sent a message "${S}" to target pthread ${y.Hb}, but that thread no longer exists!`);
        } else S === "checkMailbox" ? dr() : S === "spawnThread" ? Wo(y) : S === "cleanupThread" ? Fo(It[y.ic]) : S === "loaded" ? (i2.loaded = true, l2(i2)) : y.target === "setimmediate" ? i2.postMessage(y) : S === "callHandler" ? r2[y.Rb](...y.args) : S && ie(`worker sent an unknown command ${S}`);
      }, i2.onerror = (y) => {
        throw ie(`worker sent an error! ${y.filename}:${y.lineno}: ${y.message}`), y;
      };
      var p2, h2 = [];
      for (p2 of []) r2.propertyIsEnumerable(p2) && h2.push(p2);
      i2.postMessage({ Db: "load", Sb: h2, kc: v, lc: $ });
    });
    function Ko() {
      var i2 = new Worker((() => {
        let l2 = URL;
        return import.meta.url > "file:" && import.meta.url < "file;" ? new l2("ort.bundle.min.mjs", import.meta.url) : new URL(import.meta.url);
      })(), { type: "module", workerData: "em-pthread", name: "em-pthread" });
      yt.push(i2);
    }
    var vc = (i2) => {
      fe();
      var l2 = X()[i2 + 52 >>> 2 >>> 0];
      i2 = X()[i2 + 56 >>> 2 >>> 0], Hi(l2, l2 - i2), _r(l2);
    }, $c = (i2, l2) => {
      gt = 0, i2 = Fi(i2, l2), 0 < gt ? T = i2 : Rn(i2);
    };
    class xc {
      constructor(l2) {
        this.Ib = l2 - 24;
      }
    }
    function Sc(i2, l2, p2) {
      var h2 = new xc(i2 >>>= 0);
      throw l2 >>>= 0, p2 >>>= 0, X()[h2.Ib + 16 >>> 2 >>> 0] = 0, X()[h2.Ib + 4 >>> 2 >>> 0] = l2, X()[h2.Ib + 8 >>> 2 >>> 0] = p2, i2;
    }
    function Zo(i2, l2, p2, h2) {
      return u2 ? $e(2, 1, i2, l2, p2, h2) : Qo(i2, l2, p2, h2);
    }
    function Qo(i2, l2, p2, h2) {
      if (i2 >>>= 0, p2 >>>= 0, h2 >>>= 0, d2 === void 0) return 6;
      var y = [];
      return u2 && y.length === 0 ? Zo(i2, l2 >>>= 0, p2, h2) : (i2 = { fc: p2, Bb: i2, Jb: h2, Nb: y }, u2 ? (i2.Db = "spawnThread", postMessage(i2, y), 0) : Wo(i2));
    }
    var Yo = typeof TextDecoder < "u" ? new TextDecoder() : void 0, Xo = (i2, l2 = 0, p2 = NaN) => {
      var h2 = (l2 >>>= 0) + p2;
      for (p2 = l2; i2[p2] && !(p2 >= h2); ) ++p2;
      if (16 < p2 - l2 && i2.buffer && Yo) return Yo.decode(i2.buffer instanceof ArrayBuffer ? i2.subarray(l2, p2) : i2.slice(l2, p2));
      for (h2 = ""; l2 < p2; ) {
        var y = i2[l2++];
        if (128 & y) {
          var S = 63 & i2[l2++];
          if ((224 & y) == 192) h2 += String.fromCharCode((31 & y) << 6 | S);
          else {
            var k = 63 & i2[l2++];
            65536 > (y = (240 & y) == 224 ? (15 & y) << 12 | S << 6 | k : (7 & y) << 18 | S << 12 | k << 6 | 63 & i2[l2++]) ? h2 += String.fromCharCode(y) : (y -= 65536, h2 += String.fromCharCode(55296 | y >> 10, 56320 | 1023 & y));
          }
        } else h2 += String.fromCharCode(y);
      }
      return h2;
    }, Ce = (i2, l2) => (i2 >>>= 0) ? Xo(pe(), i2, l2) : "";
    function Jo(i2, l2, p2) {
      return u2 ? $e(3, 1, i2, l2, p2) : 0;
    }
    function ei(i2, l2) {
      if (u2) return $e(4, 1, i2, l2);
    }
    function ti(i2, l2) {
      if (u2) return $e(5, 1, i2, l2);
    }
    function ri(i2, l2, p2) {
      if (u2) return $e(6, 1, i2, l2, p2);
    }
    function ni(i2, l2, p2) {
      return u2 ? $e(7, 1, i2, l2, p2) : 0;
    }
    function oi(i2, l2) {
      if (u2) return $e(8, 1, i2, l2);
    }
    function ii(i2, l2, p2) {
      if (u2) return $e(9, 1, i2, l2, p2);
    }
    function ai(i2, l2, p2, h2) {
      if (u2) return $e(10, 1, i2, l2, p2, h2);
    }
    function si(i2, l2, p2, h2) {
      if (u2) return $e(11, 1, i2, l2, p2, h2);
    }
    function ui(i2, l2, p2, h2) {
      if (u2) return $e(12, 1, i2, l2, p2, h2);
    }
    function li(i2) {
      if (u2) return $e(13, 1, i2);
    }
    function di(i2, l2) {
      if (u2) return $e(14, 1, i2, l2);
    }
    function ci(i2, l2, p2) {
      if (u2) return $e(15, 1, i2, l2, p2);
    }
    var pi, Tc = () => ht(""), Ye = (i2) => {
      for (var l2 = ""; pe()[i2 >>> 0]; ) l2 += pi[pe()[i2++ >>> 0]];
      return l2;
    }, vn = {}, $n = {}, Cc = {}, Vt = r2.BindingError = class extends Error {
      constructor(i2) {
        super(i2), this.name = "BindingError";
      }
    };
    function st(i2, l2, p2 = {}) {
      return (function(h2, y, S = {}) {
        var k = y.name;
        if (!h2) throw new Vt(`type "${k}" must have a positive integer typeid pointer`);
        if ($n.hasOwnProperty(h2)) {
          if (S.Tb) return;
          throw new Vt(`Cannot register type '${k}' twice`);
        }
        $n[h2] = y, delete Cc[h2], vn.hasOwnProperty(h2) && (y = vn[h2], delete vn[h2], y.forEach((B) => B()));
      })(i2, l2, p2);
    }
    var mi = (i2, l2, p2) => {
      switch (l2) {
        case 1:
          return p2 ? (h2) => Te()[h2 >>> 0] : (h2) => pe()[h2 >>> 0];
        case 2:
          return p2 ? (h2) => J()[h2 >>> 1 >>> 0] : (h2) => V()[h2 >>> 1 >>> 0];
        case 4:
          return p2 ? (h2) => O()[h2 >>> 2 >>> 0] : (h2) => X()[h2 >>> 2 >>> 0];
        case 8:
          return p2 ? (h2) => q[h2 >>> 3] : (h2) => Y[h2 >>> 3];
        default:
          throw new TypeError(`invalid integer width (${l2}): ${i2}`);
      }
    };
    function Ic(i2, l2, p2) {
      p2 >>>= 0, st(i2 >>>= 0, { name: l2 = Ye(l2 >>> 0), fromWireType: (h2) => h2, toWireType: function(h2, y) {
        if (typeof y != "bigint" && typeof y != "number") throw y = y === null ? "null" : (h2 = typeof y) == "object" || h2 === "array" || h2 === "function" ? y.toString() : "" + y, new TypeError(`Cannot convert "${y}" to ${this.name}`);
        return typeof y == "number" && (y = BigInt(y)), y;
      }, Cb: bt, readValueFromPointer: mi(l2, p2, l2.indexOf("u") == -1), Eb: null });
    }
    var bt = 8;
    function Ac(i2, l2, p2, h2) {
      st(i2 >>>= 0, { name: l2 = Ye(l2 >>> 0), fromWireType: function(y) {
        return !!y;
      }, toWireType: function(y, S) {
        return S ? p2 : h2;
      }, Cb: bt, readValueFromPointer: function(y) {
        return this.fromWireType(pe()[y >>> 0]);
      }, Eb: null });
    }
    var xn = [], ut = [];
    function Sn(i2) {
      9 < (i2 >>>= 0) && --ut[i2 + 1] == 0 && (ut[i2] = void 0, xn.push(i2));
    }
    var Be = (i2) => {
      if (!i2) throw new Vt(`Cannot use deleted val. handle = ${i2}`);
      return ut[i2];
    }, Ge = (i2) => {
      switch (i2) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default:
          let l2 = xn.pop() || ut.length;
          return ut[l2] = i2, ut[l2 + 1] = 1, l2;
      }
    };
    function Tn(i2) {
      return this.fromWireType(X()[i2 >>> 2 >>> 0]);
    }
    var Ec = { name: "emscripten::val", fromWireType: (i2) => {
      var l2 = Be(i2);
      return Sn(i2), l2;
    }, toWireType: (i2, l2) => Ge(l2), Cb: bt, readValueFromPointer: Tn, Eb: null };
    function kc(i2) {
      return st(i2 >>> 0, Ec);
    }
    var Pc = (i2, l2) => {
      switch (l2) {
        case 4:
          return function(p2) {
            return this.fromWireType(ze()[p2 >>> 2 >>> 0]);
          };
        case 8:
          return function(p2) {
            return this.fromWireType(Oe()[p2 >>> 3 >>> 0]);
          };
        default:
          throw new TypeError(`invalid float width (${l2}): ${i2}`);
      }
    };
    function Oc(i2, l2, p2) {
      p2 >>>= 0, st(i2 >>>= 0, { name: l2 = Ye(l2 >>> 0), fromWireType: (h2) => h2, toWireType: (h2, y) => y, Cb: bt, readValueFromPointer: Pc(l2, p2), Eb: null });
    }
    function zc(i2, l2, p2, h2, y) {
      if (i2 >>>= 0, p2 >>>= 0, l2 = Ye(l2 >>> 0), y === -1 && (y = 4294967295), y = (B) => B, h2 === 0) {
        var S = 32 - 8 * p2;
        y = (B) => B << S >>> S;
      }
      var k = l2.includes("unsigned") ? function(B, U) {
        return U >>> 0;
      } : function(B, U) {
        return U;
      };
      st(i2, { name: l2, fromWireType: y, toWireType: k, Cb: bt, readValueFromPointer: mi(l2, p2, h2 !== 0), Eb: null });
    }
    function Dc(i2, l2, p2) {
      function h2(S) {
        var k = X()[S >>> 2 >>> 0];
        return S = X()[S + 4 >>> 2 >>> 0], new y(Te().buffer, S, k);
      }
      var y = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][l2];
      st(i2 >>>= 0, { name: p2 = Ye(p2 >>> 0), fromWireType: h2, Cb: bt, readValueFromPointer: h2 }, { Tb: true });
    }
    var At = (i2, l2, p2) => {
      var h2 = pe();
      if (l2 >>>= 0, 0 < p2) {
        var y = l2;
        p2 = l2 + p2 - 1;
        for (var S = 0; S < i2.length; ++S) {
          var k = i2.charCodeAt(S);
          if (55296 <= k && 57343 >= k && (k = 65536 + ((1023 & k) << 10) | 1023 & i2.charCodeAt(++S)), 127 >= k) {
            if (l2 >= p2) break;
            h2[l2++ >>> 0] = k;
          } else {
            if (2047 >= k) {
              if (l2 + 1 >= p2) break;
              h2[l2++ >>> 0] = 192 | k >> 6;
            } else {
              if (65535 >= k) {
                if (l2 + 2 >= p2) break;
                h2[l2++ >>> 0] = 224 | k >> 12;
              } else {
                if (l2 + 3 >= p2) break;
                h2[l2++ >>> 0] = 240 | k >> 18, h2[l2++ >>> 0] = 128 | k >> 12 & 63;
              }
              h2[l2++ >>> 0] = 128 | k >> 6 & 63;
            }
            h2[l2++ >>> 0] = 128 | 63 & k;
          }
        }
        h2[l2 >>> 0] = 0, i2 = l2 - y;
      } else i2 = 0;
      return i2;
    }, Cn = (i2) => {
      for (var l2 = 0, p2 = 0; p2 < i2.length; ++p2) {
        var h2 = i2.charCodeAt(p2);
        127 >= h2 ? l2++ : 2047 >= h2 ? l2 += 2 : 55296 <= h2 && 57343 >= h2 ? (l2 += 4, ++p2) : l2 += 3;
      }
      return l2;
    };
    function Bc(i2, l2) {
      st(i2 >>>= 0, { name: l2 = Ye(l2 >>> 0), fromWireType: function(p2) {
        for (var h2, y = X()[p2 >>> 2 >>> 0], S = p2 + 4, k = S, B = 0; B <= y; ++B) {
          var U = S + B;
          B != y && pe()[U >>> 0] != 0 || (k = Ce(k, U - k), h2 === void 0 ? h2 = k : (h2 += "\0", h2 += k), k = U + 1);
        }
        return lt(p2), h2;
      }, toWireType: function(p2, h2) {
        h2 instanceof ArrayBuffer && (h2 = new Uint8Array(h2));
        var y = typeof h2 == "string";
        if (!(y || ArrayBuffer.isView(h2) && h2.BYTES_PER_ELEMENT == 1)) throw new Vt("Cannot pass non-string to std::string");
        var S = y ? Cn(h2) : h2.length, k = br(4 + S + 1), B = k + 4;
        return X()[k >>> 2 >>> 0] = S, y ? At(h2, B, S + 1) : pe().set(h2, B >>> 0), p2 !== null && p2.push(lt, k), k;
      }, Cb: bt, readValueFromPointer: Tn, Eb(p2) {
        lt(p2);
      } });
    }
    var fi = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, Mc = (i2, l2) => {
      for (var p2 = i2 >> 1, h2 = p2 + l2 / 2; !(p2 >= h2) && V()[p2 >>> 0]; ) ++p2;
      if (32 < (p2 <<= 1) - i2 && fi) return fi.decode(pe().slice(i2, p2));
      for (p2 = "", h2 = 0; !(h2 >= l2 / 2); ++h2) {
        var y = J()[i2 + 2 * h2 >>> 1 >>> 0];
        if (y == 0) break;
        p2 += String.fromCharCode(y);
      }
      return p2;
    }, Rc = (i2, l2, p2) => {
      if (p2 ??= 2147483647, 2 > p2) return 0;
      var h2 = l2;
      p2 = (p2 -= 2) < 2 * i2.length ? p2 / 2 : i2.length;
      for (var y = 0; y < p2; ++y) {
        var S = i2.charCodeAt(y);
        J()[l2 >>> 1 >>> 0] = S, l2 += 2;
      }
      return J()[l2 >>> 1 >>> 0] = 0, l2 - h2;
    }, Uc = (i2) => 2 * i2.length, Nc = (i2, l2) => {
      for (var p2 = 0, h2 = ""; !(p2 >= l2 / 4); ) {
        var y = O()[i2 + 4 * p2 >>> 2 >>> 0];
        if (y == 0) break;
        ++p2, 65536 <= y ? (y -= 65536, h2 += String.fromCharCode(55296 | y >> 10, 56320 | 1023 & y)) : h2 += String.fromCharCode(y);
      }
      return h2;
    }, Vc = (i2, l2, p2) => {
      if (l2 >>>= 0, p2 ??= 2147483647, 4 > p2) return 0;
      var h2 = l2;
      p2 = h2 + p2 - 4;
      for (var y = 0; y < i2.length; ++y) {
        var S = i2.charCodeAt(y);
        if (55296 <= S && 57343 >= S && (S = 65536 + ((1023 & S) << 10) | 1023 & i2.charCodeAt(++y)), O()[l2 >>> 2 >>> 0] = S, (l2 += 4) + 4 > p2) break;
      }
      return O()[l2 >>> 2 >>> 0] = 0, l2 - h2;
    }, Lc = (i2) => {
      for (var l2 = 0, p2 = 0; p2 < i2.length; ++p2) {
        var h2 = i2.charCodeAt(p2);
        55296 <= h2 && 57343 >= h2 && ++p2, l2 += 4;
      }
      return l2;
    };
    function Wc(i2, l2, p2) {
      if (i2 >>>= 0, l2 >>>= 0, p2 = Ye(p2 >>>= 0), l2 === 2) var h2 = Mc, y = Rc, S = Uc, k = (B) => V()[B >>> 1 >>> 0];
      else l2 === 4 && (h2 = Nc, y = Vc, S = Lc, k = (B) => X()[B >>> 2 >>> 0]);
      st(i2, { name: p2, fromWireType: (B) => {
        for (var U, G = X()[B >>> 2 >>> 0], Q = B + 4, re = 0; re <= G; ++re) {
          var de = B + 4 + re * l2;
          re != G && k(de) != 0 || (Q = h2(Q, de - Q), U === void 0 ? U = Q : (U += "\0", U += Q), Q = de + l2);
        }
        return lt(B), U;
      }, toWireType: (B, U) => {
        if (typeof U != "string") throw new Vt(`Cannot pass non-string to C++ string type ${p2}`);
        var G = S(U), Q = br(4 + G + l2);
        return X()[Q >>> 2 >>> 0] = G / l2, y(U, Q + 4, G + l2), B !== null && B.push(lt, Q), Q;
      }, Cb: bt, readValueFromPointer: Tn, Eb(B) {
        lt(B);
      } });
    }
    function Gc(i2, l2) {
      st(i2 >>>= 0, { Ub: true, name: l2 = Ye(l2 >>> 0), Cb: 0, fromWireType: () => {
      }, toWireType: () => {
      } });
    }
    function Hc(i2) {
      Mn(i2 >>> 0, !s2, 1, !a2, 131072, false), qo();
    }
    var In = (i2) => {
      if (!Z) try {
        if (i2(), !(0 < gt)) try {
          u2 ? Rn(T) : wn(T);
        } catch (l2) {
          l2 instanceof yn || l2 == "unwind" || _(0, l2);
        }
      } catch (l2) {
        l2 instanceof yn || l2 == "unwind" || _(0, l2);
      }
    };
    function An(i2) {
      i2 >>>= 0, typeof Atomics.jc == "function" && (Atomics.jc(O(), i2 >>> 2, i2).value.then(dr), i2 += 128, Atomics.store(O(), i2 >>> 2, 1));
    }
    var dr = () => {
      var i2 = Bn();
      i2 && (An(i2), In(Gi));
    };
    function Fc(i2, l2) {
      (i2 >>>= 0) == l2 >>> 0 ? setTimeout(dr) : u2 ? postMessage({ Hb: i2, Db: "checkMailbox" }) : (i2 = It[i2]) && i2.postMessage({ Db: "checkMailbox" });
    }
    var En = [];
    function qc(i2, l2, p2, h2, y) {
      for (l2 >>>= 0, h2 /= 2, En.length = h2, p2 = y >>> 0 >>> 3, y = 0; y < h2; y++) En[y] = q[p2 + 2 * y] ? q[p2 + 2 * y + 1] : Oe()[p2 + 2 * y + 1 >>> 0];
      return (l2 ? Dn[l2] : Np[i2])(...En);
    }
    var jc = () => {
      gt = 0;
    };
    function Kc(i2) {
      i2 >>>= 0, u2 ? postMessage({ Db: "cleanupThread", ic: i2 }) : Fo(It[i2]);
    }
    function Zc(i2) {
    }
    var cr = (i2, l2) => {
      var p2 = $n[i2];
      if (p2 === void 0) throw i2 = Ri(i2), p2 = Ye(i2), lt(i2), new Vt(`${l2} has unknown type ${p2}`);
      return p2;
    }, hi = (i2, l2, p2) => {
      var h2 = [];
      return i2 = i2.toWireType(h2, p2), h2.length && (X()[l2 >>> 2 >>> 0] = Ge(h2)), i2;
    };
    function Qc(i2, l2, p2) {
      return l2 >>>= 0, p2 >>>= 0, i2 = Be(i2 >>> 0), l2 = cr(l2, "emval::as"), hi(l2, p2, i2);
    }
    function Yc(i2, l2) {
      return l2 >>>= 0, i2 = Be(i2 >>> 0), (l2 = cr(l2, "emval::as")).toWireType(null, i2);
    }
    var pr = (i2) => {
      try {
        i2();
      } catch (l2) {
        ht(l2);
      }
    }, _t = 0, Xe = null, gi = 0, mr = [], yi = {}, bi = {}, Xc = 0, kn = null, Jc = [];
    function _i(i2) {
      return (function(l2) {
        if (!Z) {
          if (_t === 0) {
            var p2 = false, h2 = false;
            l2((y = 0) => {
              if (!Z && (gi = y, p2 = true, h2)) {
                _t = 2, pr(() => Ki(Xe)), typeof MainLoop < "u" && MainLoop.Qb && MainLoop.resume(), y = false;
                try {
                  var S = (function() {
                    var U = O()[Xe + 8 >>> 2 >>> 0];
                    return U = M[bi[U]], --gt, U();
                  })();
                } catch (U) {
                  S = U, y = true;
                }
                var k = false;
                if (!Xe) {
                  var B = kn;
                  B && (kn = null, (y ? B.reject : B.resolve)(S), k = true);
                }
                if (y && !k) throw S;
              }
            }), h2 = true, p2 || (_t = 1, Xe = (function() {
              var y = br(65548), S = y + 12;
              X()[y >>> 2 >>> 0] = S, X()[y + 4 >>> 2 >>> 0] = S + 65536, S = mr[0];
              var k = yi[S];
              return k === void 0 && (k = Xc++, yi[S] = k, bi[k] = S), S = k, O()[y + 8 >>> 2 >>> 0] = S, y;
            })(), typeof MainLoop < "u" && MainLoop.Qb && MainLoop.pause(), pr(() => qi(Xe)));
          } else _t === 2 ? (_t = 0, pr(Zi), lt(Xe), Xe = null, Jc.forEach(In)) : ht(`invalid state: ${_t}`);
          return gi;
        }
      })((l2) => {
        i2().then(l2);
      });
    }
    function ep(i2) {
      return i2 >>>= 0, _i(async () => {
        var l2 = await Be(i2);
        return Ge(l2);
      });
    }
    var fr = [];
    function tp(i2, l2, p2, h2) {
      return p2 >>>= 0, h2 >>>= 0, (i2 = fr[i2 >>> 0])(null, l2 = Be(l2 >>> 0), p2, h2);
    }
    var rp = {}, hr = (i2) => {
      var l2 = rp[i2];
      return l2 === void 0 ? Ye(i2) : l2;
    };
    function np(i2, l2, p2, h2, y) {
      return p2 >>>= 0, h2 >>>= 0, y >>>= 0, (i2 = fr[i2 >>> 0])(l2 = Be(l2 >>> 0), l2[p2 = hr(p2)], h2, y);
    }
    function op(i2, l2) {
      return l2 >>>= 0, (i2 = Be(i2 >>> 0)) == Be(l2);
    }
    var wi = () => typeof globalThis == "object" ? globalThis : Function("return this")();
    function ip(i2) {
      return (i2 >>>= 0) == 0 ? Ge(wi()) : (i2 = hr(i2), Ge(wi()[i2]));
    }
    var ap = (i2) => {
      var l2 = fr.length;
      return fr.push(i2), l2;
    }, sp = (i2, l2) => {
      for (var p2 = Array(i2), h2 = 0; h2 < i2; ++h2) p2[h2] = cr(X()[l2 + 4 * h2 >>> 2 >>> 0], `parameter ${h2}`);
      return p2;
    };
    function up(i2, l2, p2) {
      var h2 = (l2 = sp(i2, l2 >>> 0)).shift();
      i2--;
      var y = `return function (obj, func, destructorsRef, args) {
`, S = 0, k = [];
      p2 === 0 && k.push("obj");
      for (var B = ["retType"], U = [h2], G = 0; G < i2; ++G) k.push(`arg${G}`), B.push(`argType${G}`), U.push(l2[G]), y += `  var arg${G} = argType${G}.readValueFromPointer(args${S ? "+" + S : ""});
`, S += l2[G].Cb;
      return y += `  var rv = ${p2 === 1 ? "new func" : "func.call"}(${k.join(", ")});
`, h2.Ub || (B.push("emval_returnValue"), U.push(hi), y += `  return emval_returnValue(retType, destructorsRef, rv);
`), i2 = new Function(...B, y + `};
`)(...U), p2 = `methodCaller<(${l2.map((Q) => Q.name).join(", ")}) => ${h2.name}>`, ap(Object.defineProperty(i2, "name", { value: p2 }));
    }
    function lp(i2) {
      return i2 = hr(i2 >>> 0), Ge(r2[i2]);
    }
    function dp(i2, l2) {
      return l2 >>>= 0, i2 = Be(i2 >>> 0), l2 = Be(l2), Ge(i2[l2]);
    }
    function cp(i2) {
      9 < (i2 >>>= 0) && (ut[i2 + 1] += 1);
    }
    function pp() {
      return Ge([]);
    }
    function mp(i2) {
      i2 = Be(i2 >>> 0);
      for (var l2 = Array(i2.length), p2 = 0; p2 < i2.length; p2++) l2[p2] = i2[p2];
      return Ge(l2);
    }
    function fp(i2) {
      return Ge(hr(i2 >>> 0));
    }
    function hp() {
      return Ge({});
    }
    function gp(i2) {
      for (var l2 = Be(i2 >>>= 0); l2.length; ) {
        var p2 = l2.pop();
        l2.pop()(p2);
      }
      Sn(i2);
    }
    function yp(i2, l2, p2) {
      l2 >>>= 0, p2 >>>= 0, i2 = Be(i2 >>> 0), l2 = Be(l2), p2 = Be(p2), i2[l2] = p2;
    }
    function bp(i2, l2) {
      return l2 >>>= 0, i2 = (i2 = cr(i2 >>> 0, "_emval_take_value")).readValueFromPointer(l2), Ge(i2);
    }
    function _p(i2, l2) {
      i2 = -9007199254740992 > i2 || 9007199254740992 < i2 ? NaN : Number(i2), l2 >>>= 0, i2 = new Date(1e3 * i2), O()[l2 >>> 2 >>> 0] = i2.getUTCSeconds(), O()[l2 + 4 >>> 2 >>> 0] = i2.getUTCMinutes(), O()[l2 + 8 >>> 2 >>> 0] = i2.getUTCHours(), O()[l2 + 12 >>> 2 >>> 0] = i2.getUTCDate(), O()[l2 + 16 >>> 2 >>> 0] = i2.getUTCMonth(), O()[l2 + 20 >>> 2 >>> 0] = i2.getUTCFullYear() - 1900, O()[l2 + 24 >>> 2 >>> 0] = i2.getUTCDay(), i2 = (i2.getTime() - Date.UTC(i2.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, O()[l2 + 28 >>> 2 >>> 0] = i2;
    }
    var vi = (i2) => i2 % 4 == 0 && (i2 % 100 != 0 || i2 % 400 == 0), $i = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], xi = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function wp(i2, l2) {
      i2 = -9007199254740992 > i2 || 9007199254740992 < i2 ? NaN : Number(i2), l2 >>>= 0, i2 = new Date(1e3 * i2), O()[l2 >>> 2 >>> 0] = i2.getSeconds(), O()[l2 + 4 >>> 2 >>> 0] = i2.getMinutes(), O()[l2 + 8 >>> 2 >>> 0] = i2.getHours(), O()[l2 + 12 >>> 2 >>> 0] = i2.getDate(), O()[l2 + 16 >>> 2 >>> 0] = i2.getMonth(), O()[l2 + 20 >>> 2 >>> 0] = i2.getFullYear() - 1900, O()[l2 + 24 >>> 2 >>> 0] = i2.getDay();
      var p2 = (vi(i2.getFullYear()) ? $i : xi)[i2.getMonth()] + i2.getDate() - 1 | 0;
      O()[l2 + 28 >>> 2 >>> 0] = p2, O()[l2 + 36 >>> 2 >>> 0] = -60 * i2.getTimezoneOffset(), p2 = new Date(i2.getFullYear(), 6, 1).getTimezoneOffset();
      var h2 = new Date(i2.getFullYear(), 0, 1).getTimezoneOffset();
      i2 = 0 | (p2 != h2 && i2.getTimezoneOffset() == Math.min(h2, p2)), O()[l2 + 32 >>> 2 >>> 0] = i2;
    }
    function vp(i2) {
      i2 >>>= 0;
      var l2 = new Date(O()[i2 + 20 >>> 2 >>> 0] + 1900, O()[i2 + 16 >>> 2 >>> 0], O()[i2 + 12 >>> 2 >>> 0], O()[i2 + 8 >>> 2 >>> 0], O()[i2 + 4 >>> 2 >>> 0], O()[i2 >>> 2 >>> 0], 0), p2 = O()[i2 + 32 >>> 2 >>> 0], h2 = l2.getTimezoneOffset(), y = new Date(l2.getFullYear(), 6, 1).getTimezoneOffset(), S = new Date(l2.getFullYear(), 0, 1).getTimezoneOffset(), k = Math.min(S, y);
      return 0 > p2 ? O()[i2 + 32 >>> 2 >>> 0] = +(y != S && k == h2) : 0 < p2 != (k == h2) && (y = Math.max(S, y), l2.setTime(l2.getTime() + 6e4 * ((0 < p2 ? k : y) - h2))), O()[i2 + 24 >>> 2 >>> 0] = l2.getDay(), p2 = (vi(l2.getFullYear()) ? $i : xi)[l2.getMonth()] + l2.getDate() - 1 | 0, O()[i2 + 28 >>> 2 >>> 0] = p2, O()[i2 >>> 2 >>> 0] = l2.getSeconds(), O()[i2 + 4 >>> 2 >>> 0] = l2.getMinutes(), O()[i2 + 8 >>> 2 >>> 0] = l2.getHours(), O()[i2 + 12 >>> 2 >>> 0] = l2.getDate(), O()[i2 + 16 >>> 2 >>> 0] = l2.getMonth(), O()[i2 + 20 >>> 2 >>> 0] = l2.getYear(), i2 = l2.getTime(), BigInt(isNaN(i2) ? -1 : i2 / 1e3);
    }
    function Si(i2, l2, p2, h2, y, S, k) {
      return u2 ? $e(16, 1, i2, l2, p2, h2, y, S, k) : -52;
    }
    function Ti(i2, l2, p2, h2, y, S) {
      if (u2) return $e(17, 1, i2, l2, p2, h2, y, S);
    }
    var Qt = {}, $p = () => performance.timeOrigin + performance.now();
    function Ci(i2, l2) {
      if (u2) return $e(18, 1, i2, l2);
      if (Qt[i2] && (clearTimeout(Qt[i2].id), delete Qt[i2]), !l2) return 0;
      var p2 = setTimeout(() => {
        delete Qt[i2], In(() => Wi(i2, performance.timeOrigin + performance.now()));
      }, l2);
      return Qt[i2] = { id: p2, rc: l2 }, 0;
    }
    function xp(i2, l2, p2, h2) {
      i2 >>>= 0, l2 >>>= 0, p2 >>>= 0, h2 >>>= 0;
      var y = (/* @__PURE__ */ new Date()).getFullYear(), S = new Date(y, 0, 1).getTimezoneOffset();
      y = new Date(y, 6, 1).getTimezoneOffset();
      var k = Math.max(S, y);
      X()[i2 >>> 2 >>> 0] = 60 * k, O()[l2 >>> 2 >>> 0] = +(S != y), i2 = (l2 = (B) => {
        var U = Math.abs(B);
        return `UTC${0 <= B ? "-" : "+"}${String(Math.floor(U / 60)).padStart(2, "0")}${String(U % 60).padStart(2, "0")}`;
      })(S), l2 = l2(y), y < S ? (At(i2, p2, 17), At(l2, h2, 17)) : (At(i2, h2, 17), At(l2, p2, 17));
    }
    var Sp = () => Date.now(), Tp = 1;
    function Cp(i2, l2, p2) {
      if (!(0 <= i2 && 3 >= i2)) return 28;
      if (i2 === 0) i2 = Date.now();
      else {
        if (!Tp) return 52;
        i2 = performance.timeOrigin + performance.now();
      }
      return q[p2 >>> 0 >>> 3] = BigInt(Math.round(1e6 * i2)), 0;
    }
    var Pn = [], Ii = (i2, l2) => {
      Pn.length = 0;
      for (var p2; p2 = pe()[i2++ >>> 0]; ) {
        var h2 = p2 != 105;
        l2 += (h2 &= p2 != 112) && l2 % 8 ? 4 : 0, Pn.push(p2 == 112 ? X()[l2 >>> 2 >>> 0] : p2 == 106 ? q[l2 >>> 3] : p2 == 105 ? O()[l2 >>> 2 >>> 0] : Oe()[l2 >>> 3 >>> 0]), l2 += h2 ? 8 : 4;
      }
      return Pn;
    };
    function Ip(i2, l2, p2) {
      return i2 >>>= 0, l2 = Ii(l2 >>> 0, p2 >>> 0), Dn[i2](...l2);
    }
    function Ap(i2, l2, p2) {
      return i2 >>>= 0, l2 = Ii(l2 >>> 0, p2 >>> 0), Dn[i2](...l2);
    }
    var Ep = () => {
    };
    function kp(i2, l2) {
      return ie(Ce(i2 >>> 0, l2 >>> 0));
    }
    var Pp = () => {
      throw gt += 1, "unwind";
    };
    function Op() {
      return 4294901760;
    }
    var zp = () => navigator.hardwareConcurrency;
    function Dp() {
      return ht("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"), 0;
    }
    function Bp(i2) {
      i2 >>>= 0;
      var l2 = pe().length;
      if (i2 <= l2 || 4294901760 < i2) return false;
      for (var p2 = 1; 4 >= p2; p2 *= 2) {
        var h2 = l2 * (1 + 0.2 / p2);
        h2 = Math.min(h2, i2 + 100663296);
        e: {
          h2 = (Math.min(4294901760, 65536 * Math.ceil(Math.max(i2, h2) / 65536)) - v.buffer.byteLength + 65535) / 65536 | 0;
          try {
            v.grow(h2), fe();
            var y = 1;
            break e;
          } catch {
          }
          y = void 0;
        }
        if (y) return true;
      }
      return false;
    }
    var gr = () => (ht("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"), 0), Lt = {}, Ai = (i2) => {
      i2.forEach((l2) => {
        var p2 = gr();
        p2 && (Lt[p2] = l2);
      });
    };
    function Mp() {
      var i2 = Error().stack.toString().split(`
`);
      return i2[0] == "Error" && i2.shift(), Ai(i2), Lt.Mb = gr(), Lt.dc = i2, Lt.Mb;
    }
    function Rp(i2, l2, p2) {
      if (i2 >>>= 0, l2 >>>= 0, Lt.Mb == i2) var h2 = Lt.dc;
      else (h2 = Error().stack.toString().split(`
`))[0] == "Error" && h2.shift(), Ai(h2);
      for (var y = 3; h2[y] && gr() != i2; ) ++y;
      for (i2 = 0; i2 < p2 && h2[i2 + y]; ++i2) O()[l2 + 4 * i2 >>> 2 >>> 0] = gr();
      return i2;
    }
    var On, zn = {}, Ei = () => {
      if (!On) {
        var i2, l2 = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: "./this.program" };
        for (i2 in zn) zn[i2] === void 0 ? delete l2[i2] : l2[i2] = zn[i2];
        var p2 = [];
        for (i2 in l2) p2.push(`${i2}=${l2[i2]}`);
        On = p2;
      }
      return On;
    };
    function ki(i2, l2) {
      if (u2) return $e(19, 1, i2, l2);
      i2 >>>= 0, l2 >>>= 0;
      var p2, h2 = 0, y = 0;
      for (p2 of Ei()) {
        var S = l2 + h2;
        X()[i2 + y >>> 2 >>> 0] = S, h2 += At(p2, S, 1 / 0) + 1, y += 4;
      }
      return 0;
    }
    function Pi(i2, l2) {
      if (u2) return $e(20, 1, i2, l2);
      i2 >>>= 0, l2 >>>= 0;
      var p2 = Ei();
      for (var h2 of (X()[i2 >>> 2 >>> 0] = p2.length, i2 = 0, p2)) i2 += Cn(h2) + 1;
      return X()[l2 >>> 2 >>> 0] = i2, 0;
    }
    function Oi(i2) {
      return u2 ? $e(21, 1, i2) : 52;
    }
    function zi(i2, l2, p2, h2) {
      return u2 ? $e(22, 1, i2, l2, p2, h2) : 52;
    }
    function Di(i2, l2, p2, h2) {
      return u2 ? $e(23, 1, i2, l2, p2, h2) : 70;
    }
    var Up = [null, [], []];
    function Bi(i2, l2, p2, h2) {
      if (u2) return $e(24, 1, i2, l2, p2, h2);
      l2 >>>= 0, p2 >>>= 0, h2 >>>= 0;
      for (var y = 0, S = 0; S < p2; S++) {
        var k = X()[l2 >>> 2 >>> 0], B = X()[l2 + 4 >>> 2 >>> 0];
        l2 += 8;
        for (var U = 0; U < B; U++) {
          var G = i2, Q = pe()[k + U >>> 0], re = Up[G];
          Q === 0 || Q === 10 ? ((G === 1 ? j : ie)(Xo(re)), re.length = 0) : re.push(Q);
        }
        y += B;
      }
      return X()[h2 >>> 2 >>> 0] = y, 0;
    }
    u2 || (function() {
      for (var i2 = r2.numThreads - 1; i2--; ) Ko();
      bn.push(() => {
        ft++, (function(l2) {
          u2 ? l2() : Promise.all(yt.map(jo)).then(l2);
        })(() => No());
      });
    })();
    for (var Mi = Array(256), yr = 0; 256 > yr; ++yr) Mi[yr] = String.fromCharCode(yr);
    pi = Mi, ut.push(0, 1, void 0, 1, null, 1, true, 1, false, 1), r2.count_emval_handles = () => ut.length / 2 - 5 - xn.length, u2 || (v = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: true }), fe()), r2.wasmBinary && (x = r2.wasmBinary), r2.stackSave = () => Nn(), r2.stackRestore = (i2) => _r(i2), r2.stackAlloc = (i2) => Un(i2), r2.setValue = function(i2, l2, p2 = "i8") {
      switch (p2.endsWith("*") && (p2 = "*"), p2) {
        case "i1":
        case "i8":
          Te()[i2 >>> 0] = l2;
          break;
        case "i16":
          J()[i2 >>> 1 >>> 0] = l2;
          break;
        case "i32":
          O()[i2 >>> 2 >>> 0] = l2;
          break;
        case "i64":
          q[i2 >>> 3] = BigInt(l2);
          break;
        case "float":
          ze()[i2 >>> 2 >>> 0] = l2;
          break;
        case "double":
          Oe()[i2 >>> 3 >>> 0] = l2;
          break;
        case "*":
          X()[i2 >>> 2 >>> 0] = l2;
          break;
        default:
          ht(`invalid type for setValue: ${p2}`);
      }
    }, r2.getValue = function(i2, l2 = "i8") {
      switch (l2.endsWith("*") && (l2 = "*"), l2) {
        case "i1":
        case "i8":
          return Te()[i2 >>> 0];
        case "i16":
          return J()[i2 >>> 1 >>> 0];
        case "i32":
          return O()[i2 >>> 2 >>> 0];
        case "i64":
          return q[i2 >>> 3];
        case "float":
          return ze()[i2 >>> 2 >>> 0];
        case "double":
          return Oe()[i2 >>> 3 >>> 0];
        case "*":
          return X()[i2 >>> 2 >>> 0];
        default:
          ht(`invalid type for getValue: ${l2}`);
      }
    }, r2.UTF8ToString = Ce, r2.stringToUTF8 = At, r2.lengthBytesUTF8 = Cn;
    var Np = [_n, Go, Zo, Jo, ei, ti, ri, ni, oi, ii, ai, si, ui, li, di, ci, Si, Ti, Ci, ki, Pi, Oi, zi, Di, Bi], Dn = { 893836: (i2, l2, p2, h2, y) => {
      if (r2 === void 0 || !r2.Fb) return 1;
      if ((i2 = Ce(Number(i2 >>> 0))).startsWith("./") && (i2 = i2.substring(2)), !(i2 = r2.Fb.get(i2))) return 2;
      if (l2 = Number(l2 >>> 0), p2 = Number(p2 >>> 0), h2 = Number(h2 >>> 0), l2 + p2 > i2.byteLength) return 3;
      try {
        let S = i2.subarray(l2, l2 + p2);
        switch (y) {
          case 0:
            pe().set(S, h2 >>> 0);
            break;
          case 1:
            r2.mc ? r2.mc(h2, S) : r2.cc(h2, S);
            break;
          default:
            return 4;
        }
        return 0;
      } catch {
        return 4;
      }
    }, 894660: (i2, l2, p2) => {
      r2.Pb(i2, pe().subarray(l2 >>> 0, l2 + p2 >>> 0));
    }, 894724: () => r2.oc(), 894766: (i2) => {
      r2.Ob(i2);
    }, 894803: () => {
      r2.Wb();
    }, 894834: () => {
      r2.Xb();
    }, 894863: () => {
      r2.ac();
    }, 894888: (i2) => r2.Vb(i2), 894921: (i2) => r2.Zb(i2), 894953: (i2, l2, p2) => {
      r2.Lb(Number(i2), Number(l2), Number(p2), true);
    }, 895016: (i2, l2, p2) => {
      r2.Lb(Number(i2), Number(l2), Number(p2));
    }, 895073: () => typeof wasmOffsetConverter < "u", 895130: (i2) => {
      r2.Ab("Abs", i2, void 0);
    }, 895181: (i2) => {
      r2.Ab("Neg", i2, void 0);
    }, 895232: (i2) => {
      r2.Ab("Floor", i2, void 0);
    }, 895285: (i2) => {
      r2.Ab("Ceil", i2, void 0);
    }, 895337: (i2) => {
      r2.Ab("Reciprocal", i2, void 0);
    }, 895395: (i2) => {
      r2.Ab("Sqrt", i2, void 0);
    }, 895447: (i2) => {
      r2.Ab("Exp", i2, void 0);
    }, 895498: (i2) => {
      r2.Ab("Erf", i2, void 0);
    }, 895549: (i2) => {
      r2.Ab("Sigmoid", i2, void 0);
    }, 895604: (i2, l2, p2) => {
      r2.Ab("HardSigmoid", i2, { alpha: l2, beta: p2 });
    }, 895683: (i2) => {
      r2.Ab("Log", i2, void 0);
    }, 895734: (i2) => {
      r2.Ab("Sin", i2, void 0);
    }, 895785: (i2) => {
      r2.Ab("Cos", i2, void 0);
    }, 895836: (i2) => {
      r2.Ab("Tan", i2, void 0);
    }, 895887: (i2) => {
      r2.Ab("Asin", i2, void 0);
    }, 895939: (i2) => {
      r2.Ab("Acos", i2, void 0);
    }, 895991: (i2) => {
      r2.Ab("Atan", i2, void 0);
    }, 896043: (i2) => {
      r2.Ab("Sinh", i2, void 0);
    }, 896095: (i2) => {
      r2.Ab("Cosh", i2, void 0);
    }, 896147: (i2) => {
      r2.Ab("Asinh", i2, void 0);
    }, 896200: (i2) => {
      r2.Ab("Acosh", i2, void 0);
    }, 896253: (i2) => {
      r2.Ab("Atanh", i2, void 0);
    }, 896306: (i2) => {
      r2.Ab("Tanh", i2, void 0);
    }, 896358: (i2) => {
      r2.Ab("Not", i2, void 0);
    }, 896409: (i2, l2, p2) => {
      r2.Ab("Clip", i2, { min: l2, max: p2 });
    }, 896478: (i2) => {
      r2.Ab("Clip", i2, void 0);
    }, 896530: (i2, l2) => {
      r2.Ab("Elu", i2, { alpha: l2 });
    }, 896588: (i2) => {
      r2.Ab("Gelu", i2, void 0);
    }, 896640: (i2) => {
      r2.Ab("Relu", i2, void 0);
    }, 896692: (i2, l2) => {
      r2.Ab("LeakyRelu", i2, { alpha: l2 });
    }, 896756: (i2, l2) => {
      r2.Ab("ThresholdedRelu", i2, { alpha: l2 });
    }, 896826: (i2, l2) => {
      r2.Ab("Cast", i2, { to: l2 });
    }, 896884: (i2) => {
      r2.Ab("Add", i2, void 0);
    }, 896935: (i2) => {
      r2.Ab("Sub", i2, void 0);
    }, 896986: (i2) => {
      r2.Ab("Mul", i2, void 0);
    }, 897037: (i2) => {
      r2.Ab("Div", i2, void 0);
    }, 897088: (i2) => {
      r2.Ab("Pow", i2, void 0);
    }, 897139: (i2) => {
      r2.Ab("Equal", i2, void 0);
    }, 897192: (i2) => {
      r2.Ab("Greater", i2, void 0);
    }, 897247: (i2) => {
      r2.Ab("GreaterOrEqual", i2, void 0);
    }, 897309: (i2) => {
      r2.Ab("Less", i2, void 0);
    }, 897361: (i2) => {
      r2.Ab("LessOrEqual", i2, void 0);
    }, 897420: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceMean", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 897595: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceMax", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 897769: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceMin", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 897943: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceProd", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898118: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceSum", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898292: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceL1", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898465: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceL2", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898638: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceLogSum", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898815: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceSumSquare", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 898995: (i2, l2, p2, h2, y) => {
      r2.Ab("ReduceLogSumExp", i2, { keepDims: !!l2, noopWithEmptyAxes: !!p2, axes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 899175: (i2) => {
      r2.Ab("Where", i2, void 0);
    }, 899228: (i2, l2, p2) => {
      r2.Ab("Transpose", i2, { perm: l2 ? Array.from(O().subarray(Number(l2) >>> 0, Number(p2) >>> 0)) : [] });
    }, 899352: (i2, l2, p2, h2) => {
      r2.Ab("DepthToSpace", i2, { blocksize: l2, mode: Ce(p2), format: h2 ? "NHWC" : "NCHW" });
    }, 899485: (i2, l2, p2, h2) => {
      r2.Ab("DepthToSpace", i2, { blocksize: l2, mode: Ce(p2), format: h2 ? "NHWC" : "NCHW" });
    }, 899618: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie) => {
      r2.Ab("ConvTranspose", i2, { format: U ? "NHWC" : "NCHW", autoPad: l2, dilations: [p2], group: h2, kernelShape: [y], pads: [S, k], strides: [B], wIsConst: () => !!Te()[G >>> 0], outputPadding: Q ? Array.from(O().subarray(Number(Q) >>> 0, Number(re) >>> 0)) : [], outputShape: de ? Array.from(O().subarray(Number(de) >>> 0, Number(ge) >>> 0)) : [], activation: Ce(Ie) });
    }, 900051: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("ConvTranspose", i2, { format: B ? "NHWC" : "NCHW", autoPad: l2, dilations: Array.from(O().subarray(Number(p2) >>> 0, 2 + (Number(p2) >>> 0) >>> 0)), group: h2, kernelShape: Array.from(O().subarray(Number(y) >>> 0, 2 + (Number(y) >>> 0) >>> 0)), pads: Array.from(O().subarray(Number(S) >>> 0, 4 + (Number(S) >>> 0) >>> 0)), strides: Array.from(O().subarray(Number(k) >>> 0, 2 + (Number(k) >>> 0) >>> 0)), wIsConst: () => !!Te()[U >>> 0], outputPadding: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], outputShape: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [], activation: Ce(ge) });
    }, 900712: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie) => {
      r2.Ab("ConvTranspose", i2, { format: U ? "NHWC" : "NCHW", autoPad: l2, dilations: [p2], group: h2, kernelShape: [y], pads: [S, k], strides: [B], wIsConst: () => !!Te()[G >>> 0], outputPadding: Q ? Array.from(O().subarray(Number(Q) >>> 0, Number(re) >>> 0)) : [], outputShape: de ? Array.from(O().subarray(Number(de) >>> 0, Number(ge) >>> 0)) : [], activation: Ce(Ie) });
    }, 901145: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("ConvTranspose", i2, { format: B ? "NHWC" : "NCHW", autoPad: l2, dilations: Array.from(O().subarray(Number(p2) >>> 0, 2 + (Number(p2) >>> 0) >>> 0)), group: h2, kernelShape: Array.from(O().subarray(Number(y) >>> 0, 2 + (Number(y) >>> 0) >>> 0)), pads: Array.from(O().subarray(Number(S) >>> 0, 4 + (Number(S) >>> 0) >>> 0)), strides: Array.from(O().subarray(Number(k) >>> 0, 2 + (Number(k) >>> 0) >>> 0)), wIsConst: () => !!Te()[U >>> 0], outputPadding: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], outputShape: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [], activation: Ce(ge) });
    }, 901806: (i2, l2) => {
      r2.Ab("GlobalAveragePool", i2, { format: l2 ? "NHWC" : "NCHW" });
    }, 901897: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("AveragePool", i2, { format: ge ? "NHWC" : "NCHW", auto_pad: l2, ceil_mode: p2, count_include_pad: h2, storage_order: y, dilations: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [], kernel_shape: B ? Array.from(O().subarray(Number(B) >>> 0, Number(U) >>> 0)) : [], pads: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], strides: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [] });
    }, 902376: (i2, l2) => {
      r2.Ab("GlobalAveragePool", i2, { format: l2 ? "NHWC" : "NCHW" });
    }, 902467: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("AveragePool", i2, { format: ge ? "NHWC" : "NCHW", auto_pad: l2, ceil_mode: p2, count_include_pad: h2, storage_order: y, dilations: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [], kernel_shape: B ? Array.from(O().subarray(Number(B) >>> 0, Number(U) >>> 0)) : [], pads: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], strides: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [] });
    }, 902946: (i2, l2) => {
      r2.Ab("GlobalMaxPool", i2, { format: l2 ? "NHWC" : "NCHW" });
    }, 903033: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("MaxPool", i2, { format: ge ? "NHWC" : "NCHW", auto_pad: l2, ceil_mode: p2, count_include_pad: h2, storage_order: y, dilations: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [], kernel_shape: B ? Array.from(O().subarray(Number(B) >>> 0, Number(U) >>> 0)) : [], pads: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], strides: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [] });
    }, 903508: (i2, l2) => {
      r2.Ab("GlobalMaxPool", i2, { format: l2 ? "NHWC" : "NCHW" });
    }, 903595: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => {
      r2.Ab("MaxPool", i2, { format: ge ? "NHWC" : "NCHW", auto_pad: l2, ceil_mode: p2, count_include_pad: h2, storage_order: y, dilations: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [], kernel_shape: B ? Array.from(O().subarray(Number(B) >>> 0, Number(U) >>> 0)) : [], pads: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], strides: re ? Array.from(O().subarray(Number(re) >>> 0, Number(de) >>> 0)) : [] });
    }, 904070: (i2, l2, p2, h2, y) => {
      r2.Ab("Gemm", i2, { alpha: l2, beta: p2, transA: h2, transB: y });
    }, 904174: (i2) => {
      r2.Ab("MatMul", i2, void 0);
    }, 904228: (i2, l2, p2, h2) => {
      r2.Ab("ArgMax", i2, { keepDims: !!l2, selectLastIndex: !!p2, axis: h2 });
    }, 904336: (i2, l2, p2, h2) => {
      r2.Ab("ArgMin", i2, { keepDims: !!l2, selectLastIndex: !!p2, axis: h2 });
    }, 904444: (i2, l2) => {
      r2.Ab("Softmax", i2, { axis: l2 });
    }, 904507: (i2, l2) => {
      r2.Ab("Concat", i2, { axis: l2 });
    }, 904567: (i2, l2, p2, h2, y) => {
      r2.Ab("Split", i2, { axis: l2, numOutputs: p2, splitSizes: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 904723: (i2) => {
      r2.Ab("Expand", i2, void 0);
    }, 904777: (i2, l2) => {
      r2.Ab("Gather", i2, { axis: Number(l2) });
    }, 904848: (i2, l2) => {
      r2.Ab("GatherElements", i2, { axis: Number(l2) });
    }, 904927: (i2, l2) => {
      r2.Ab("GatherND", i2, { batch_dims: Number(l2) });
    }, 905006: (i2, l2, p2, h2, y, S, k, B, U, G, Q) => {
      r2.Ab("Resize", i2, { antialias: l2, axes: p2 ? Array.from(O().subarray(Number(p2) >>> 0, Number(h2) >>> 0)) : [], coordinateTransformMode: Ce(y), cubicCoeffA: S, excludeOutside: k, extrapolationValue: B, keepAspectRatioPolicy: Ce(U), mode: Ce(G), nearestMode: Ce(Q) });
    }, 905368: (i2, l2, p2, h2, y, S, k) => {
      r2.Ab("Slice", i2, { starts: l2 ? Array.from(O().subarray(Number(l2) >>> 0, Number(p2) >>> 0)) : [], ends: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [], axes: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [] });
    }, 905632: (i2) => {
      r2.Ab("Tile", i2, void 0);
    }, 905684: (i2, l2, p2) => {
      r2.Ab("InstanceNormalization", i2, { epsilon: l2, format: p2 ? "NHWC" : "NCHW" });
    }, 905798: (i2, l2, p2) => {
      r2.Ab("InstanceNormalization", i2, { epsilon: l2, format: p2 ? "NHWC" : "NCHW" });
    }, 905912: (i2) => {
      r2.Ab("Range", i2, void 0);
    }, 905965: (i2, l2) => {
      r2.Ab("Einsum", i2, { equation: Ce(l2) });
    }, 906046: (i2, l2, p2, h2, y) => {
      r2.Ab("Pad", i2, { mode: l2, value: p2, pads: h2 ? Array.from(O().subarray(Number(h2) >>> 0, Number(y) >>> 0)) : [] });
    }, 906189: (i2, l2, p2, h2, y, S) => {
      r2.Ab("BatchNormalization", i2, { epsilon: l2, momentum: p2, spatial: !!y, trainingMode: !!h2, format: S ? "NHWC" : "NCHW" });
    }, 906358: (i2, l2, p2, h2, y, S) => {
      r2.Ab("BatchNormalization", i2, { epsilon: l2, momentum: p2, spatial: !!y, trainingMode: !!h2, format: S ? "NHWC" : "NCHW" });
    }, 906527: (i2, l2, p2) => {
      r2.Ab("CumSum", i2, { exclusive: Number(l2), reverse: Number(p2) });
    }, 906624: (i2, l2, p2) => {
      r2.Ab("DequantizeLinear", i2, { axis: l2, blockSize: p2 });
    }, 906714: (i2, l2, p2, h2, y) => {
      r2.Ab("GridSample", i2, { align_corners: l2, mode: Ce(p2), padding_mode: Ce(h2), format: y ? "NHWC" : "NCHW" });
    }, 906884: (i2, l2, p2, h2, y) => {
      r2.Ab("GridSample", i2, { align_corners: l2, mode: Ce(p2), padding_mode: Ce(h2), format: y ? "NHWC" : "NCHW" });
    }, 907054: (i2, l2) => {
      r2.Ab("ScatterND", i2, { reduction: Ce(l2) });
    }, 907139: (i2, l2, p2, h2, y, S, k, B, U) => {
      r2.Ab("Attention", i2, { numHeads: l2, isUnidirectional: p2, maskFilterValue: h2, scale: y, doRotary: S, qkvHiddenSizes: k ? Array.from(O().subarray(Number(B) >>> 0, Number(B) + k >>> 0)) : [], pastPresentShareBuffer: !!U });
    }, 907411: (i2) => {
      r2.Ab("BiasAdd", i2, void 0);
    }, 907466: (i2) => {
      r2.Ab("BiasSplitGelu", i2, void 0);
    }, 907527: (i2) => {
      r2.Ab("FastGelu", i2, void 0);
    }, 907583: (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue) => {
      r2.Ab("Conv", i2, { format: re ? "NHWC" : "NCHW", auto_pad: l2, dilations: p2 ? Array.from(O().subarray(Number(p2) >>> 0, Number(h2) >>> 0)) : [], group: y, kernel_shape: S ? Array.from(O().subarray(Number(S) >>> 0, Number(k) >>> 0)) : [], pads: B ? Array.from(O().subarray(Number(B) >>> 0, Number(U) >>> 0)) : [], strides: G ? Array.from(O().subarray(Number(G) >>> 0, Number(Q) >>> 0)) : [], w_is_const: () => !!Te()[Number(de) >>> 0], activation: Ce(ge), activation_params: Ie ? Array.from(ze().subarray(Number(Ie) >>> 0, Number(Ue) >>> 0)) : [] });
    }, 908167: (i2) => {
      r2.Ab("Gelu", i2, void 0);
    }, 908219: (i2, l2, p2, h2, y, S, k, B, U) => {
      r2.Ab("GroupQueryAttention", i2, { numHeads: l2, kvNumHeads: p2, scale: h2, softcap: y, doRotary: S, rotaryInterleaved: k, smoothSoftmax: B, localWindowSize: U });
    }, 908436: (i2, l2, p2, h2) => {
      r2.Ab("LayerNormalization", i2, { axis: l2, epsilon: p2, simplified: !!h2 });
    }, 908547: (i2, l2, p2, h2) => {
      r2.Ab("LayerNormalization", i2, { axis: l2, epsilon: p2, simplified: !!h2 });
    }, 908658: (i2, l2, p2, h2, y, S) => {
      r2.Ab("MatMulNBits", i2, { k: l2, n: p2, accuracyLevel: h2, bits: y, blockSize: S });
    }, 908785: (i2, l2, p2, h2, y, S) => {
      r2.Ab("MultiHeadAttention", i2, { numHeads: l2, isUnidirectional: p2, maskFilterValue: h2, scale: y, doRotary: S });
    }, 908944: (i2, l2) => {
      r2.Ab("QuickGelu", i2, { alpha: l2 });
    }, 909008: (i2, l2, p2, h2, y) => {
      r2.Ab("RotaryEmbedding", i2, { interleaved: !!l2, numHeads: p2, rotaryEmbeddingDim: h2, scale: y });
    }, 909147: (i2, l2, p2) => {
      r2.Ab("SkipLayerNormalization", i2, { epsilon: l2, simplified: !!p2 });
    }, 909249: (i2, l2, p2) => {
      r2.Ab("SkipLayerNormalization", i2, { epsilon: l2, simplified: !!p2 });
    }, 909351: (i2, l2, p2, h2) => {
      r2.Ab("GatherBlockQuantized", i2, { gatherAxis: l2, quantizeAxis: p2, blockSize: h2 });
    }, 909472: (i2) => {
      r2.$b(i2);
    }, 909506: (i2, l2) => r2.bc(Number(i2), Number(l2), r2.Gb.ec, r2.Gb.errors) };
    function Vp(i2, l2, p2) {
      return _i(async () => {
        await r2.Yb(Number(i2), Number(l2), Number(p2));
      });
    }
    function Lp() {
      return typeof wasmOffsetConverter < "u";
    }
    var M = await (async function() {
      function i2(h2, y) {
        return M = h2.exports, M = (function() {
          var S = M, k = {};
          for (let [B, U] of Object.entries(S)) k[B] = typeof U == "function" ? (...G) => {
            mr.push(B);
            try {
              return U(...G);
            } finally {
              Z || (mr.pop(), Xe && _t === 1 && mr.length === 0 && (_t = 0, gt += 1, pr(ji), typeof Fibers < "u" && Fibers.sc()));
            }
          } : U;
          return k;
        })(), M = (function() {
          var S = M, k = (U) => (G) => U(G) >>> 0, B = (U) => () => U() >>> 0;
          return (S = Object.assign({}, S)).Ea = k(S.Ea), S.gb = B(S.gb), S.ib = k(S.ib), S.tb = k(S.tb), S.ub = B(S.ub), S.__cxa_get_exception_ptr = k(S.__cxa_get_exception_ptr), S;
        })(), Ho.push(M.jb), $ = y, No(), M;
      }
      ft++;
      var l2 = Vo();
      if (r2.instantiateWasm) return new Promise((h2) => {
        r2.instantiateWasm(l2, (y, S) => {
          h2(i2(y, S));
        });
      });
      if (u2) return new Promise((h2) => {
        F = (y) => {
          var S = new WebAssembly.Instance(y, Vo());
          h2(i2(S, y));
        };
      });
      mt ??= r2.locateFile ? r2.locateFile ? r2.locateFile("ort-wasm-simd-threaded.jsep.wasm", w) : w + "ort-wasm-simd-threaded.jsep.wasm" : new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href;
      try {
        var p2 = await (async function(h2) {
          var y = mt;
          if (!x && typeof WebAssembly.instantiateStreaming == "function" && !ce(y)) try {
            var S = fetch(y, { credentials: "same-origin" });
            return await WebAssembly.instantiateStreaming(S, h2);
          } catch (k) {
            ie(`wasm streaming compile failed: ${k}`), ie("falling back to ArrayBuffer instantiation");
          }
          return (async function(k, B) {
            try {
              var U = await (async function(G) {
                if (!x) try {
                  var Q = await f(G);
                  return new Uint8Array(Q);
                } catch {
                }
                if (G == mt && x) G = new Uint8Array(x);
                else {
                  if (!g2) throw "both async and sync fetching of the wasm failed";
                  G = g2(G);
                }
                return G;
              })(k);
              return await WebAssembly.instantiate(U, B);
            } catch (G) {
              ie(`failed to asynchronously prepare wasm: ${G}`), ht(G);
            }
          })(y, h2);
        })(l2);
        return i2(p2.instance, p2.module);
      } catch (h2) {
        return n2(h2), Promise.reject(h2);
      }
    })(), Ri = (i2) => (Ri = M.Ea)(i2), Ui = () => (Ui = M.Fa)();
    r2._OrtInit = (i2, l2) => (r2._OrtInit = M.Ga)(i2, l2), r2._OrtGetLastError = (i2, l2) => (r2._OrtGetLastError = M.Ha)(i2, l2), r2._OrtCreateSessionOptions = (i2, l2, p2, h2, y, S, k, B, U, G) => (r2._OrtCreateSessionOptions = M.Ia)(i2, l2, p2, h2, y, S, k, B, U, G), r2._OrtAppendExecutionProvider = (i2, l2, p2, h2, y) => (r2._OrtAppendExecutionProvider = M.Ja)(i2, l2, p2, h2, y), r2._OrtAddFreeDimensionOverride = (i2, l2, p2) => (r2._OrtAddFreeDimensionOverride = M.Ka)(i2, l2, p2), r2._OrtAddSessionConfigEntry = (i2, l2, p2) => (r2._OrtAddSessionConfigEntry = M.La)(i2, l2, p2), r2._OrtReleaseSessionOptions = (i2) => (r2._OrtReleaseSessionOptions = M.Ma)(i2), r2._OrtCreateSession = (i2, l2, p2) => (r2._OrtCreateSession = M.Na)(i2, l2, p2), r2._OrtReleaseSession = (i2) => (r2._OrtReleaseSession = M.Oa)(i2), r2._OrtGetInputOutputCount = (i2, l2, p2) => (r2._OrtGetInputOutputCount = M.Pa)(i2, l2, p2), r2._OrtGetInputOutputMetadata = (i2, l2, p2, h2) => (r2._OrtGetInputOutputMetadata = M.Qa)(i2, l2, p2, h2), r2._OrtFree = (i2) => (r2._OrtFree = M.Ra)(i2), r2._OrtCreateTensor = (i2, l2, p2, h2, y, S) => (r2._OrtCreateTensor = M.Sa)(i2, l2, p2, h2, y, S), r2._OrtGetTensorData = (i2, l2, p2, h2, y) => (r2._OrtGetTensorData = M.Ta)(i2, l2, p2, h2, y), r2._OrtReleaseTensor = (i2) => (r2._OrtReleaseTensor = M.Ua)(i2), r2._OrtCreateRunOptions = (i2, l2, p2, h2) => (r2._OrtCreateRunOptions = M.Va)(i2, l2, p2, h2), r2._OrtAddRunConfigEntry = (i2, l2, p2) => (r2._OrtAddRunConfigEntry = M.Wa)(i2, l2, p2), r2._OrtReleaseRunOptions = (i2) => (r2._OrtReleaseRunOptions = M.Xa)(i2), r2._OrtCreateBinding = (i2) => (r2._OrtCreateBinding = M.Ya)(i2), r2._OrtBindInput = (i2, l2, p2) => (r2._OrtBindInput = M.Za)(i2, l2, p2), r2._OrtBindOutput = (i2, l2, p2, h2) => (r2._OrtBindOutput = M._a)(i2, l2, p2, h2), r2._OrtClearBoundOutputs = (i2) => (r2._OrtClearBoundOutputs = M.$a)(i2), r2._OrtReleaseBinding = (i2) => (r2._OrtReleaseBinding = M.ab)(i2), r2._OrtRunWithBinding = (i2, l2, p2, h2, y) => (r2._OrtRunWithBinding = M.bb)(i2, l2, p2, h2, y), r2._OrtRun = (i2, l2, p2, h2, y, S, k, B) => (r2._OrtRun = M.cb)(i2, l2, p2, h2, y, S, k, B), r2._OrtEndProfiling = (i2) => (r2._OrtEndProfiling = M.db)(i2), r2._JsepOutput = (i2, l2, p2) => (r2._JsepOutput = M.eb)(i2, l2, p2), r2._JsepGetNodeName = (i2) => (r2._JsepGetNodeName = M.fb)(i2);
    var Bn = () => (Bn = M.gb)(), lt = r2._free = (i2) => (lt = r2._free = M.hb)(i2), br = r2._malloc = (i2) => (br = r2._malloc = M.ib)(i2), Mn = (i2, l2, p2, h2, y, S) => (Mn = M.kb)(i2, l2, p2, h2, y, S), Ni = () => (Ni = M.lb)(), Vi = (i2, l2, p2, h2, y) => (Vi = M.mb)(i2, l2, p2, h2, y), Li = (i2) => (Li = M.nb)(i2), Rn = (i2) => (Rn = M.ob)(i2), Wi = (i2, l2) => (Wi = M.pb)(i2, l2), Gi = () => (Gi = M.qb)(), Hi = (i2, l2) => (Hi = M.rb)(i2, l2), _r = (i2) => (_r = M.sb)(i2), Un = (i2) => (Un = M.tb)(i2), Nn = () => (Nn = M.ub)(), Fi = r2.dynCall_ii = (i2, l2) => (Fi = r2.dynCall_ii = M.vb)(i2, l2);
    r2.dynCall_vii = (i2, l2, p2) => (r2.dynCall_vii = M.dynCall_vii)(i2, l2, p2), r2.dynCall_iiiii = (i2, l2, p2, h2, y) => (r2.dynCall_iiiii = M.dynCall_iiiii)(i2, l2, p2, h2, y), r2.dynCall_iii = (i2, l2, p2) => (r2.dynCall_iii = M.dynCall_iii)(i2, l2, p2), r2.dynCall_iiiiii = (i2, l2, p2, h2, y, S) => (r2.dynCall_iiiiii = M.dynCall_iiiiii)(i2, l2, p2, h2, y, S), r2.dynCall_iiiiiiii = (i2, l2, p2, h2, y, S, k, B) => (r2.dynCall_iiiiiiii = M.dynCall_iiiiiiii)(i2, l2, p2, h2, y, S, k, B), r2.dynCall_iiiiiii = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_iiiiiii = M.dynCall_iiiiiii)(i2, l2, p2, h2, y, S, k), r2.dynCall_vi = (i2, l2) => (r2.dynCall_vi = M.dynCall_vi)(i2, l2), r2.dynCall_iiii = (i2, l2, p2, h2) => (r2.dynCall_iiii = M.dynCall_iiii)(i2, l2, p2, h2), r2.dynCall_i = (i2) => (r2.dynCall_i = M.dynCall_i)(i2), r2.dynCall_viiiiiiii = (i2, l2, p2, h2, y, S, k, B, U) => (r2.dynCall_viiiiiiii = M.dynCall_viiiiiiii)(i2, l2, p2, h2, y, S, k, B, U), r2.dynCall_viii = (i2, l2, p2, h2) => (r2.dynCall_viii = M.dynCall_viii)(i2, l2, p2, h2), r2.dynCall_viijj = (i2, l2, p2, h2, y) => (r2.dynCall_viijj = M.dynCall_viijj)(i2, l2, p2, h2, y), r2.dynCall_viiiiii = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_viiiiii = M.dynCall_viiiiii)(i2, l2, p2, h2, y, S, k), r2.dynCall_viiii = (i2, l2, p2, h2, y) => (r2.dynCall_viiii = M.dynCall_viiii)(i2, l2, p2, h2, y), r2.dynCall_viiiii = (i2, l2, p2, h2, y, S) => (r2.dynCall_viiiii = M.dynCall_viiiii)(i2, l2, p2, h2, y, S), r2.dynCall_vfiii = (i2, l2, p2, h2, y) => (r2.dynCall_vfiii = M.dynCall_vfiii)(i2, l2, p2, h2, y), r2.dynCall_viiiiff = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_viiiiff = M.dynCall_viiiiff)(i2, l2, p2, h2, y, S, k), r2.dynCall_viiiiiff = (i2, l2, p2, h2, y, S, k, B) => (r2.dynCall_viiiiiff = M.dynCall_viiiiiff)(i2, l2, p2, h2, y, S, k, B), r2.dynCall_ffff = (i2, l2, p2, h2) => (r2.dynCall_ffff = M.dynCall_ffff)(i2, l2, p2, h2), r2.dynCall_viiff = (i2, l2, p2, h2, y) => (r2.dynCall_viiff = M.dynCall_viiff)(i2, l2, p2, h2, y), r2.dynCall_fffffff = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_fffffff = M.dynCall_fffffff)(i2, l2, p2, h2, y, S, k), r2.dynCall_jjjjjjj = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_jjjjjjj = M.dynCall_jjjjjjj)(i2, l2, p2, h2, y, S, k), r2.dynCall_jjjjjj = (i2, l2, p2, h2, y, S) => (r2.dynCall_jjjjjj = M.dynCall_jjjjjj)(i2, l2, p2, h2, y, S), r2.dynCall_iijjii = (i2, l2, p2, h2, y, S) => (r2.dynCall_iijjii = M.dynCall_iijjii)(i2, l2, p2, h2, y, S), r2.dynCall_viiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge) => (r2.dynCall_viiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge), r2.dynCall_viiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q) => (r2.dynCall_viiiiiiiiii = M.dynCall_viiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q), r2.dynCall_viiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re) => (r2.dynCall_viiiiiiiiiii = M.dynCall_viiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re), r2.dynCall_viiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de) => (r2.dynCall_viiiiiiiiiiii = M.dynCall_viiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de), r2.dynCall_viiiiiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt) => (r2.dynCall_viiiiiiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt), r2.dynCall_viiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G) => (r2.dynCall_viiiiiiiii = M.dynCall_viiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G), r2.dynCall_viiiiiiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt, Vn) => (r2.dynCall_viiiiiiiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt, Vn), r2.dynCall_viiiiiii = (i2, l2, p2, h2, y, S, k, B) => (r2.dynCall_viiiiiii = M.dynCall_viiiiiii)(i2, l2, p2, h2, y, S, k, B), r2.dynCall_viiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue) => (r2.dynCall_viiiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue), r2.dynCall_jiji = (i2, l2, p2, h2) => (r2.dynCall_jiji = M.dynCall_jiji)(i2, l2, p2, h2), r2.dynCall_v = (i2) => (r2.dynCall_v = M.dynCall_v)(i2), r2.dynCall_iidiiii = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_iidiiii = M.dynCall_iidiiii)(i2, l2, p2, h2, y, S, k), r2.dynCall_iiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U) => (r2.dynCall_iiiiiiiii = M.dynCall_iiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U), r2.dynCall_iiij = (i2, l2, p2, h2) => (r2.dynCall_iiij = M.dynCall_iiij)(i2, l2, p2, h2), r2.dynCall_iiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G) => (r2.dynCall_iiiiiiiiii = M.dynCall_iiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G), r2.dynCall_iiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de) => (r2.dynCall_iiiiiiiiiiiii = M.dynCall_iiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de), r2.dynCall_iiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q) => (r2.dynCall_iiiiiiiiiii = M.dynCall_iiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q), r2.dynCall_ji = (i2, l2) => (r2.dynCall_ji = M.dynCall_ji)(i2, l2), r2.dynCall_iijii = (i2, l2, p2, h2, y) => (r2.dynCall_iijii = M.dynCall_iijii)(i2, l2, p2, h2, y), r2.dynCall_vij = (i2, l2, p2) => (r2.dynCall_vij = M.dynCall_vij)(i2, l2, p2), r2.dynCall_viiijii = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_viiijii = M.dynCall_viiijii)(i2, l2, p2, h2, y, S, k), r2.dynCall_viijiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et) => (r2.dynCall_viijiiiiiiiiiiiiii = M.dynCall_viijiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et), r2.dynCall_viiiji = (i2, l2, p2, h2, y, S) => (r2.dynCall_viiiji = M.dynCall_viiiji)(i2, l2, p2, h2, y, S), r2.dynCall_fiii = (i2, l2, p2, h2) => (r2.dynCall_fiii = M.dynCall_fiii)(i2, l2, p2, h2), r2.dynCall_viijii = (i2, l2, p2, h2, y, S) => (r2.dynCall_viijii = M.dynCall_viijii)(i2, l2, p2, h2, y, S), r2.dynCall_viij = (i2, l2, p2, h2) => (r2.dynCall_viij = M.dynCall_viij)(i2, l2, p2, h2), r2.dynCall_jiij = (i2, l2, p2, h2) => (r2.dynCall_jiij = M.dynCall_jiij)(i2, l2, p2, h2), r2.dynCall_fi = (i2, l2) => (r2.dynCall_fi = M.dynCall_fi)(i2, l2), r2.dynCall_fii = (i2, l2, p2) => (r2.dynCall_fii = M.dynCall_fii)(i2, l2, p2), r2.dynCall_jii = (i2, l2, p2) => (r2.dynCall_jii = M.dynCall_jii)(i2, l2, p2), r2.dynCall_dii = (i2, l2, p2) => (r2.dynCall_dii = M.dynCall_dii)(i2, l2, p2), r2.dynCall_fiiii = (i2, l2, p2, h2, y) => (r2.dynCall_fiiii = M.dynCall_fiiii)(i2, l2, p2, h2, y), r2.dynCall_fif = (i2, l2, p2) => (r2.dynCall_fif = M.dynCall_fif)(i2, l2, p2), r2.dynCall_jfi = (i2, l2, p2) => (r2.dynCall_jfi = M.dynCall_jfi)(i2, l2, p2), r2.dynCall_viiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie) => (r2.dynCall_viiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie), r2.dynCall_viiiiiiiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt, Vn, Wp) => (r2.dynCall_viiiiiiiiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt, Et, Yt, Vn, Wp), r2.dynCall_viiiiiiiiiiiiiiii = (i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt) => (r2.dynCall_viiiiiiiiiiiiiiii = M.dynCall_viiiiiiiiiiiiiiii)(i2, l2, p2, h2, y, S, k, B, U, G, Q, re, de, ge, Ie, Ue, dt), r2.dynCall_iif = (i2, l2, p2) => (r2.dynCall_iif = M.dynCall_iif)(i2, l2, p2), r2.dynCall_jiiii = (i2, l2, p2, h2, y) => (r2.dynCall_jiiii = M.dynCall_jiiii)(i2, l2, p2, h2, y), r2.dynCall_jiii = (i2, l2, p2, h2) => (r2.dynCall_jiii = M.dynCall_jiii)(i2, l2, p2, h2), r2.dynCall_viif = (i2, l2, p2, h2) => (r2.dynCall_viif = M.dynCall_viif)(i2, l2, p2, h2), r2.dynCall_viiij = (i2, l2, p2, h2, y) => (r2.dynCall_viiij = M.dynCall_viiij)(i2, l2, p2, h2, y), r2.dynCall_viiiijii = (i2, l2, p2, h2, y, S, k, B) => (r2.dynCall_viiiijii = M.dynCall_viiiijii)(i2, l2, p2, h2, y, S, k, B), r2.dynCall_iiiiij = (i2, l2, p2, h2, y, S) => (r2.dynCall_iiiiij = M.dynCall_iiiiij)(i2, l2, p2, h2, y, S), r2.dynCall_iiiiid = (i2, l2, p2, h2, y, S) => (r2.dynCall_iiiiid = M.dynCall_iiiiid)(i2, l2, p2, h2, y, S), r2.dynCall_iiiiijj = (i2, l2, p2, h2, y, S, k) => (r2.dynCall_iiiiijj = M.dynCall_iiiiijj)(i2, l2, p2, h2, y, S, k), r2.dynCall_iiiiiijj = (i2, l2, p2, h2, y, S, k, B) => (r2.dynCall_iiiiiijj = M.dynCall_iiiiiijj)(i2, l2, p2, h2, y, S, k, B);
    var qi = (i2) => (qi = M.wb)(i2), ji = () => (ji = M.xb)(), Ki = (i2) => (Ki = M.yb)(i2), Zi = () => (Zi = M.zb)();
    return (function i2() {
      if (0 < ft) Nt = i2;
      else if (u2) t2(r2), Fe();
      else {
        for (; 0 < bn.length; ) bn.shift()(r2);
        0 < ft ? Nt = i2 : (r2.calledRun = true, Z || (Fe(), t2(r2)));
      }
    })(), r2.PTR_SIZE = 4, o2;
  }, Qp = Ea, Yp = globalThis.self?.name?.startsWith("em-pthread");
  Yp && Ea();
});
var Da;
var Yn;
var Xp;
var Le;
var Ba;
var Qn;
var Jp;
var em;
var Ma;
var tm;
var Oa;
var Ra;
var za;
var Ua;
var Tr = L(() => {
  "use strict";
  Sr();
  Da = typeof location > "u" ? void 0 : location.origin, Yn = import.meta.url > "file:" && import.meta.url < "file;", Xp = () => {
    if (true) {
      if (Yn) {
        let e2 = URL;
        return new URL(new e2("ort.bundle.min.mjs", import.meta.url).href, Da).href;
      }
      return import.meta.url;
    }
  }, Le = Xp(), Ba = () => {
    if (Le && !Le.startsWith("blob:")) return Le.substring(0, Le.lastIndexOf("/") + 1);
  }, Qn = (e2, t2) => {
    try {
      let n2 = t2 ?? Le;
      return (n2 ? new URL(e2, n2) : new URL(e2)).origin === Da;
    } catch {
      return false;
    }
  }, Jp = (e2, t2) => {
    let n2 = t2 ?? Le;
    try {
      return (n2 ? new URL(e2, n2) : new URL(e2)).href;
    } catch {
      return;
    }
  }, em = (e2, t2) => `${t2 ?? "./"}${e2}`, Ma = async (e2) => {
    let n2 = await (await fetch(e2, { credentials: "same-origin" })).blob();
    return URL.createObjectURL(n2);
  }, tm = async (e2) => (await import(
    /*webpackIgnore:true*/
    e2
  )).default, Oa = (Aa(), Xt(Ia)).default, Ra = async () => {
    if (!Le) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
    if (Qn(Le)) return [void 0, Oa()];
    let e2 = await Ma(Le);
    return [e2, Oa(e2)];
  }, za = (Pa(), Xt(ka)).default, Ua = async (e2, t2, n2, r2) => {
    let o2 = za && !(e2 || t2);
    if (o2) if (Le) o2 = Qn(Le);
    else if (r2 && !n2) o2 = true;
    else throw new Error("cannot determine the script source URL.");
    if (o2) return [void 0, za];
    {
      let a2 = "ort-wasm-simd-threaded.jsep.mjs", s2 = e2 ?? Jp(a2, t2), u2 = n2 && s2 && !Qn(s2, t2), d2 = u2 ? await Ma(s2) : s2 ?? em(a2, t2);
      return [u2 ? d2 : void 0, await tm(d2)];
    }
  };
});
var Xn;
var Jn;
var Dr;
var Na;
var rm;
var nm;
var om;
var Cr;
var _e;
var $t = L(() => {
  "use strict";
  Tr();
  Jn = false, Dr = false, Na = false, rm = () => {
    if (typeof SharedArrayBuffer > "u") return false;
    try {
      return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
    } catch {
      return false;
    }
  }, nm = () => {
    try {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
    } catch {
      return false;
    }
  }, om = () => {
    try {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
    } catch {
      return false;
    }
  }, Cr = async (e2) => {
    if (Jn) return Promise.resolve();
    if (Dr) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
    if (Na) throw new Error("previous call to 'initializeWebAssembly()' failed.");
    Dr = true;
    let t2 = e2.initTimeout, n2 = e2.numThreads;
    if (e2.simd !== false) {
      if (e2.simd === "relaxed") {
        if (!om()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
      } else if (!nm()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
    }
    let r2 = rm();
    n2 > 1 && !r2 && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + n2 + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e2.numThreads = n2 = 1);
    let o2 = e2.wasmPaths, a2 = typeof o2 == "string" ? o2 : void 0, s2 = o2?.mjs, u2 = s2?.href ?? s2, d2 = o2?.wasm, c2 = d2?.href ?? d2, m = e2.wasmBinary, [f, g2] = await Ua(u2, a2, n2 > 1, !!m || !!c2), _ = false, b = [];
    if (t2 > 0 && b.push(new Promise((w) => {
      setTimeout(() => {
        _ = true, w();
      }, t2);
    })), b.push(new Promise((w, x) => {
      let v = { numThreads: n2 };
      if (m) v.wasmBinary = m;
      else if (c2 || a2) v.locateFile = ($) => c2 ?? a2 + $;
      else if (u2 && u2.indexOf("blob:") !== 0) v.locateFile = ($) => new URL($, u2).href;
      else if (f) {
        let $ = Ba();
        $ && (v.locateFile = (T) => $ + T);
      }
      g2(v).then(($) => {
        Dr = false, Jn = true, Xn = $, w(), f && URL.revokeObjectURL(f);
      }, ($) => {
        Dr = false, Na = true, x($);
      });
    })), await Promise.race(b), _) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t2}ms`);
  }, _e = () => {
    if (Jn && Xn) return Xn;
    throw new Error("WebAssembly is not initialized yet.");
  };
});
var We;
var tr;
var ye;
var Br = L(() => {
  "use strict";
  $t();
  We = (e2, t2) => {
    let n2 = _e(), r2 = n2.lengthBytesUTF8(e2) + 1, o2 = n2._malloc(r2);
    return n2.stringToUTF8(e2, o2, r2), t2.push(o2), o2;
  }, tr = (e2, t2, n2, r2) => {
    if (typeof e2 == "object" && e2 !== null) {
      if (n2.has(e2)) throw new Error("Circular reference in options");
      n2.add(e2);
    }
    Object.entries(e2).forEach(([o2, a2]) => {
      let s2 = t2 ? t2 + o2 : o2;
      if (typeof a2 == "object") tr(a2, s2 + ".", n2, r2);
      else if (typeof a2 == "string" || typeof a2 == "number") r2(s2, a2.toString());
      else if (typeof a2 == "boolean") r2(s2, a2 ? "1" : "0");
      else throw new Error(`Can't handle extra config type: ${typeof a2}`);
    });
  }, ye = (e2) => {
    let t2 = _e(), n2 = t2.stackSave();
    try {
      let r2 = t2.PTR_SIZE, o2 = t2.stackAlloc(2 * r2);
      t2._OrtGetLastError(o2, o2 + r2);
      let a2 = Number(t2.getValue(o2, r2 === 4 ? "i32" : "i64")), s2 = t2.getValue(o2 + r2, "*"), u2 = s2 ? t2.UTF8ToString(s2) : "";
      throw new Error(`${e2} ERROR_CODE: ${a2}, ERROR_MESSAGE: ${u2}`);
    } finally {
      t2.stackRestore(n2);
    }
  };
});
var Va;
var La = L(() => {
  "use strict";
  $t();
  Br();
  Va = (e2) => {
    let t2 = _e(), n2 = 0, r2 = [], o2 = e2 || {};
    try {
      if (e2?.logSeverityLevel === void 0) o2.logSeverityLevel = 2;
      else if (typeof e2.logSeverityLevel != "number" || !Number.isInteger(e2.logSeverityLevel) || e2.logSeverityLevel < 0 || e2.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e2.logSeverityLevel}`);
      if (e2?.logVerbosityLevel === void 0) o2.logVerbosityLevel = 0;
      else if (typeof e2.logVerbosityLevel != "number" || !Number.isInteger(e2.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e2.logVerbosityLevel}`);
      e2?.terminate === void 0 && (o2.terminate = false);
      let a2 = 0;
      return e2?.tag !== void 0 && (a2 = We(e2.tag, r2)), n2 = t2._OrtCreateRunOptions(o2.logSeverityLevel, o2.logVerbosityLevel, !!o2.terminate, a2), n2 === 0 && ye("Can't create run options."), e2?.extra !== void 0 && tr(e2.extra, "", /* @__PURE__ */ new WeakSet(), (s2, u2) => {
        let d2 = We(s2, r2), c2 = We(u2, r2);
        t2._OrtAddRunConfigEntry(n2, d2, c2) !== 0 && ye(`Can't set a run config entry: ${s2} - ${u2}.`);
      }), [n2, r2];
    } catch (a2) {
      throw n2 !== 0 && t2._OrtReleaseRunOptions(n2), r2.forEach((s2) => t2._free(s2)), a2;
    }
  };
});
var im;
var am;
var sm;
var Mr;
var um;
var Wa;
var Ga = L(() => {
  "use strict";
  $t();
  Br();
  im = (e2) => {
    switch (e2) {
      case "disabled":
        return 0;
      case "basic":
        return 1;
      case "extended":
        return 2;
      case "layout":
        return 3;
      case "all":
        return 99;
      default:
        throw new Error(`unsupported graph optimization level: ${e2}`);
    }
  }, am = (e2) => {
    switch (e2) {
      case "sequential":
        return 0;
      case "parallel":
        return 1;
      default:
        throw new Error(`unsupported execution mode: ${e2}`);
    }
  }, sm = (e2) => {
    e2.extra || (e2.extra = {}), e2.extra.session || (e2.extra.session = {});
    let t2 = e2.extra.session;
    t2.use_ort_model_bytes_directly || (t2.use_ort_model_bytes_directly = "1"), e2.executionProviders && e2.executionProviders.some((n2) => (typeof n2 == "string" ? n2 : n2.name) === "webgpu") && (e2.enableMemPattern = false);
  }, Mr = (e2, t2, n2, r2) => {
    let o2 = We(t2, r2), a2 = We(n2, r2);
    _e()._OrtAddSessionConfigEntry(e2, o2, a2) !== 0 && ye(`Can't set a session config entry: ${t2} - ${n2}.`);
  }, um = async (e2, t2, n2) => {
    for (let r2 of t2) {
      let o2 = typeof r2 == "string" ? r2 : r2.name, a2 = [];
      switch (o2) {
        case "webnn":
          if (o2 = "WEBNN", typeof r2 != "string") {
            let f = r2?.deviceType;
            f && Mr(e2, "deviceType", f, n2);
          }
          break;
        case "webgpu":
          if (o2 = "JS", typeof r2 != "string") {
            let m = r2;
            if (m?.preferredLayout) {
              if (m.preferredLayout !== "NCHW" && m.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${m.preferredLayout}`);
              Mr(e2, "preferredLayout", m.preferredLayout, n2);
            }
          }
          break;
        case "wasm":
        case "cpu":
          continue;
        default:
          throw new Error(`not supported execution provider: ${o2}`);
      }
      let s2 = We(o2, n2), u2 = a2.length, d2 = 0, c2 = 0;
      if (u2 > 0) {
        d2 = _e()._malloc(u2 * _e().PTR_SIZE), n2.push(d2), c2 = _e()._malloc(u2 * _e().PTR_SIZE), n2.push(c2);
        for (let m = 0; m < u2; m++) _e().setValue(d2 + m * _e().PTR_SIZE, a2[m][0], "*"), _e().setValue(c2 + m * _e().PTR_SIZE, a2[m][1], "*");
      }
      await _e()._OrtAppendExecutionProvider(e2, s2, d2, c2, u2) !== 0 && ye(`Can't append execution provider: ${o2}.`);
    }
  }, Wa = async (e2) => {
    let t2 = _e(), n2 = 0, r2 = [], o2 = e2 || {};
    sm(o2);
    try {
      let a2 = im(o2.graphOptimizationLevel ?? "all"), s2 = am(o2.executionMode ?? "sequential"), u2 = typeof o2.logId == "string" ? We(o2.logId, r2) : 0, d2 = o2.logSeverityLevel ?? 2;
      if (!Number.isInteger(d2) || d2 < 0 || d2 > 4) throw new Error(`log severity level is not valid: ${d2}`);
      let c2 = o2.logVerbosityLevel ?? 0;
      if (!Number.isInteger(c2) || c2 < 0 || c2 > 4) throw new Error(`log verbosity level is not valid: ${c2}`);
      let m = typeof o2.optimizedModelFilePath == "string" ? We(o2.optimizedModelFilePath, r2) : 0;
      if (n2 = t2._OrtCreateSessionOptions(a2, !!o2.enableCpuMemArena, !!o2.enableMemPattern, s2, !!o2.enableProfiling, 0, u2, d2, c2, m), n2 === 0 && ye("Can't create session options."), o2.executionProviders && await um(n2, o2.executionProviders, r2), o2.enableGraphCapture !== void 0) {
        if (typeof o2.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${o2.enableGraphCapture}`);
        Mr(n2, "enableGraphCapture", o2.enableGraphCapture.toString(), r2);
      }
      if (o2.freeDimensionOverrides) for (let [f, g2] of Object.entries(o2.freeDimensionOverrides)) {
        if (typeof f != "string") throw new Error(`free dimension override name must be a string: ${f}`);
        if (typeof g2 != "number" || !Number.isInteger(g2) || g2 < 0) throw new Error(`free dimension override value must be a non-negative integer: ${g2}`);
        let _ = We(f, r2);
        t2._OrtAddFreeDimensionOverride(n2, _, g2) !== 0 && ye(`Can't set a free dimension override: ${f} - ${g2}.`);
      }
      return o2.extra !== void 0 && tr(o2.extra, "", /* @__PURE__ */ new WeakSet(), (f, g2) => {
        Mr(n2, f, g2, r2);
      }), [n2, r2];
    } catch (a2) {
      throw n2 !== 0 && t2._OrtReleaseSessionOptions(n2) !== 0 && ye("Can't release session options."), r2.forEach((s2) => t2._free(s2)), a2;
    }
  };
});
var xt;
var Je;
var St;
var Gt;
var rr;
var Rr;
var Ur;
var eo;
var ee = L(() => {
  "use strict";
  xt = (e2) => {
    switch (e2) {
      case "int8":
        return 3;
      case "uint8":
        return 2;
      case "bool":
        return 9;
      case "int16":
        return 5;
      case "uint16":
        return 4;
      case "int32":
        return 6;
      case "uint32":
        return 12;
      case "float16":
        return 10;
      case "float32":
        return 1;
      case "float64":
        return 11;
      case "string":
        return 8;
      case "int64":
        return 7;
      case "uint64":
        return 13;
      case "int4":
        return 22;
      case "uint4":
        return 21;
      default:
        throw new Error(`unsupported data type: ${e2}`);
    }
  }, Je = (e2) => {
    switch (e2) {
      case 3:
        return "int8";
      case 2:
        return "uint8";
      case 9:
        return "bool";
      case 5:
        return "int16";
      case 4:
        return "uint16";
      case 6:
        return "int32";
      case 12:
        return "uint32";
      case 10:
        return "float16";
      case 1:
        return "float32";
      case 11:
        return "float64";
      case 8:
        return "string";
      case 7:
        return "int64";
      case 13:
        return "uint64";
      case 22:
        return "int4";
      case 21:
        return "uint4";
      default:
        throw new Error(`unsupported data type: ${e2}`);
    }
  }, St = (e2, t2) => {
    let n2 = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][e2], r2 = typeof t2 == "number" ? t2 : t2.reduce((o2, a2) => o2 * a2, 1);
    return n2 > 0 ? Math.ceil(r2 * n2) : void 0;
  }, Gt = (e2) => {
    switch (e2) {
      case "float16":
        return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
      case "float32":
        return Float32Array;
      case "uint8":
        return Uint8Array;
      case "int8":
        return Int8Array;
      case "uint16":
        return Uint16Array;
      case "int16":
        return Int16Array;
      case "int32":
        return Int32Array;
      case "bool":
        return Uint8Array;
      case "float64":
        return Float64Array;
      case "uint32":
        return Uint32Array;
      case "int64":
        return BigInt64Array;
      case "uint64":
        return BigUint64Array;
      default:
        throw new Error(`unsupported type: ${e2}`);
    }
  }, rr = (e2) => {
    switch (e2) {
      case "verbose":
        return 0;
      case "info":
        return 1;
      case "warning":
        return 2;
      case "error":
        return 3;
      case "fatal":
        return 4;
      default:
        throw new Error(`unsupported logging level: ${e2}`);
    }
  }, Rr = (e2) => e2 === "float32" || e2 === "float16" || e2 === "int32" || e2 === "int64" || e2 === "uint32" || e2 === "uint8" || e2 === "bool" || e2 === "uint4" || e2 === "int4", Ur = (e2) => e2 === "float32" || e2 === "float16" || e2 === "int32" || e2 === "int64" || e2 === "uint32" || e2 === "uint64" || e2 === "int8" || e2 === "uint8" || e2 === "bool" || e2 === "uint4" || e2 === "int4", eo = (e2) => {
    switch (e2) {
      case "none":
        return 0;
      case "cpu":
        return 1;
      case "cpu-pinned":
        return 2;
      case "texture":
        return 3;
      case "gpu-buffer":
        return 4;
      case "ml-tensor":
        return 5;
      default:
        throw new Error(`unsupported data location: ${e2}`);
    }
  };
});
var nr;
var to = L(() => {
  "use strict";
  Sr();
  nr = async (e2) => {
    if (typeof e2 == "string") if (false) try {
      let { readFile: t2 } = Wn("node:fs/promises");
      return new Uint8Array(await t2(e2));
    } catch (t2) {
      if (t2.code === "ERR_FS_FILE_TOO_LARGE") {
        let { createReadStream: n2 } = Wn("node:fs"), r2 = n2(e2), o2 = [];
        for await (let a2 of r2) o2.push(a2);
        return new Uint8Array(Buffer.concat(o2));
      }
      throw t2;
    }
    else {
      let t2 = await fetch(e2);
      if (!t2.ok) throw new Error(`failed to load external data file: ${e2}`);
      let n2 = t2.headers.get("Content-Length"), r2 = n2 ? parseInt(n2, 10) : 0;
      if (r2 < 1073741824) return new Uint8Array(await t2.arrayBuffer());
      {
        if (!t2.body) throw new Error(`failed to load external data file: ${e2}, no response body.`);
        let o2 = t2.body.getReader(), a2;
        try {
          a2 = new ArrayBuffer(r2);
        } catch (u2) {
          if (u2 instanceof RangeError) {
            let d2 = Math.ceil(r2 / 65536);
            a2 = new WebAssembly.Memory({ initial: d2, maximum: d2 }).buffer;
          } else throw u2;
        }
        let s2 = 0;
        for (; ; ) {
          let { done: u2, value: d2 } = await o2.read();
          if (u2) break;
          let c2 = d2.byteLength;
          new Uint8Array(a2, s2, c2).set(d2), s2 += c2;
        }
        return new Uint8Array(a2, 0, r2);
      }
    }
    else return e2 instanceof Blob ? new Uint8Array(await e2.arrayBuffer()) : e2 instanceof Uint8Array ? e2 : new Uint8Array(e2);
  };
});
var lm;
var dm;
var Ha;
var Fa;
var Nr;
var cm;
var le;
var et = L(() => {
  "use strict";
  ee();
  lm = ["V", "I", "W", "E", "F"], dm = (e2, t2) => {
    console.log(`[${lm[e2]},${(/* @__PURE__ */ new Date()).toISOString()}]${t2}`);
  }, Nr = (e2, t2) => {
    Ha = e2, Fa = t2;
  }, cm = (e2, t2) => {
    let n2 = rr(e2), r2 = rr(Ha);
    n2 >= r2 && dm(n2, typeof t2 == "function" ? t2() : t2);
  }, le = (...e2) => {
    Fa && cm(...e2);
  };
});
var ro;
var tt;
var E;
var Dt;
var Vr;
var qa;
var ja;
var ae = L(() => {
  "use strict";
  ro = class {
    static calcMatMulShape(t2, n2) {
      return t2[1] !== n2[0] ? void 0 : [t2[0], n2[1]];
    }
  }, tt = class {
    static calcShape(t2, n2, r2 = false) {
      let o2 = t2.length, a2 = n2.length;
      if (o2 === 0) return n2;
      if (a2 === 0) return t2;
      let s2 = Math.max(t2.length, n2.length), u2 = new Array(s2);
      if (r2) {
        if (o2 < 2 || a2 < 2) return;
        let d2 = ro.calcMatMulShape([t2[o2 - 2], t2[o2 - 1]], [n2[a2 - 2], n2[a2 - 1]]);
        if (d2 === void 0) return;
        [u2[s2 - 2], u2[s2 - 1]] = d2;
      }
      for (let d2 = r2 ? 3 : 1; d2 <= s2; d2++) {
        let c2 = o2 - d2 < 0 ? 1 : t2[o2 - d2], m = a2 - d2 < 0 ? 1 : n2[a2 - d2];
        if (c2 !== m && c2 > 1 && m > 1) return;
        let f = Math.max(c2, m);
        if (c2 && m) u2[s2 - d2] = Math.max(c2, m);
        else {
          if (f > 1) return;
          u2[s2 - d2] = 0;
        }
      }
      return u2;
    }
    static isValidBroadcast(t2, n2) {
      let r2 = t2.length, o2 = n2.length;
      if (r2 > o2) return false;
      for (let a2 = 1; a2 <= r2; a2++) if (t2[r2 - a2] !== 1 && t2[r2 - a2] !== n2[o2 - a2]) return false;
      return true;
    }
  }, E = class e2 {
    static size(t2) {
      return e2.getSizeFromDimensionRange(t2, 0, t2.length);
    }
    static convertShape(t2, n2 = 4) {
      let r2 = t2.length;
      if (r2 === 0) return [];
      let o2 = new Array(r2), a2 = r2 - 1;
      for (; a2 >= 0; ) {
        if (t2[a2] % n2 === 0) {
          o2[a2] = t2[a2] / n2;
          break;
        }
        if (n2 % t2[a2] !== 0) throw new Error("cannot convert shape");
        o2[a2] = 1, n2 /= t2[a2], a2--;
      }
      for (a2--; a2 >= 0; a2--) o2[a2] = t2[a2];
      return o2;
    }
    static sizeFromDimension(t2, n2) {
      if (n2 < 0 || n2 > t2.length) throw new Error(`invalid dimension of ${n2} for sizeFromDimension as Tensor has ${t2.length} dimensions.`);
      return e2.getSizeFromDimensionRange(t2, n2, t2.length);
    }
    static sizeToDimension(t2, n2) {
      if (n2 < 0 || n2 > t2.length) throw new Error(`invalid dimension of ${n2} for sizeToDimension as Tensor has ${t2.length} dimensions.`);
      return e2.getSizeFromDimensionRange(t2, 0, n2);
    }
    static getSizeFromDimensionRange(t2, n2, r2) {
      let o2 = 1;
      for (let a2 = n2; a2 < r2; a2++) {
        if (t2[a2] < 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");
        o2 *= Number(t2[a2]);
      }
      return o2;
    }
    static computeStrides(t2) {
      let n2 = t2.length;
      if (n2 === 0) return [];
      if (n2 === 1) return [1];
      let r2 = new Array(n2);
      r2[n2 - 1] = 1, r2[n2 - 2] = t2[n2 - 1];
      for (let o2 = n2 - 3; o2 >= 0; --o2) r2[o2] = r2[o2 + 1] * t2[o2 + 1];
      return r2;
    }
    static normalizeAxis(t2, n2) {
      if (t2 < -n2 && t2 >= n2) throw new Error("unsupported axis for this operation.");
      return t2 < 0 ? t2 + n2 : t2;
    }
    static normalizeAxes(t2, n2) {
      return t2.map((r2) => this.normalizeAxis(r2, n2 ?? t2.length));
    }
    static sortBasedOnPerm(t2, n2) {
      return n2 ? n2.map((r2) => t2[r2]) : t2.slice().reverse();
    }
    static padShape(t2, n2) {
      let r2 = t2.length;
      return t2.map((o2, a2) => o2 + n2[a2] + n2[a2 + r2]);
    }
    static areEqual(t2, n2) {
      return t2.length !== n2.length ? false : t2.every((r2, o2) => r2 === n2[o2]);
    }
  }, Dt = class e2 {
    static adjustPoolAttributes(t2, n2, r2, o2, a2, s2) {
      if (!t2 && r2.length !== n2.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");
      if (t2) for (let u2 = 0; u2 < n2.length - 2; u2++) u2 >= r2.length ? r2.push(n2[u2 + 2]) : r2[u2] = n2[u2 + 2];
      for (let u2 = 0; u2 < r2.length; u2++) if (u2 < o2.length) {
        if (o2[u2] < 0) throw new Error("strides should be greater than or equal to 1");
      } else o2.push(1);
      for (let u2 = 0; u2 < r2.length; u2++) if (u2 < a2.length) {
        if (a2[u2] < 0) throw new Error("dilations should be greater than or equal to 1");
      } else a2.push(1);
      for (let u2 = 0; u2 < r2.length * 2; u2++) if (u2 < s2.length) {
        if (s2[u2] < 0) throw new Error("pad should be greater than or equal to 1");
      } else s2.push(0);
      for (let u2 = 0; u2 < r2.length; u2++) {
        if (r2[u2] <= 0) throw new Error("kernel shapes need to be greater than 0");
        if (s2[u2] >= r2[u2] || s2[u2 + r2.length] >= r2[u2]) throw new Error("pads should be smaller than kernel");
      }
    }
    static adjustPadsBasedOnAutoPad(t2, n2, r2, o2, a2, s2, u2) {
      if (u2) {
        if (a2.length !== 2 * (t2.length - 2)) throw new Error("length of pads should be twice the length of data dimensions");
        if (n2.length !== t2.length - 2) throw new Error("length of strides should be the length of data dimensions");
        if (o2.length !== t2.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions");
        for (let d2 = 0; d2 < t2.length - 2; d2++) e2.adjustPadAndReturnShape(t2[d2 + (s2 ? 1 : 2)], n2[d2], r2[d2], o2[d2], a2, d2, d2 + t2.length - 2, u2);
      }
    }
    static computePoolOutputShape(t2, n2, r2, o2, a2, s2, u2) {
      if (n2.length <= 0) throw new Error("input shape must be of size greater than 0");
      let d2 = [n2[0], n2[1]];
      return e2.computeShapeHelper(t2, n2, d2, r2, o2, a2, s2, u2), d2;
    }
    static computeConvOutputShape(t2, n2, r2, o2, a2, s2, u2) {
      if (t2.length <= 0 || n2.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
      let d2 = [t2[0], n2[0]];
      return e2.computeShapeHelper(false, t2, d2, r2, o2, a2, s2, u2), d2;
    }
    static computeShapeHelper(t2, n2, r2, o2, a2, s2, u2, d2) {
      if (t2) for (let c2 = 0; c2 < n2.length - 2; c2++) r2.push(1);
      else for (let c2 = 0; c2 < n2.length - 2; c2++) r2.push(e2.adjustPadAndReturnShape(n2[c2 + 2], o2[c2], a2[c2], s2[c2], u2, c2, c2 + n2.length - 2, d2));
    }
    static adjustPadAndReturnShape(t2, n2, r2, o2, a2, s2, u2, d2) {
      let c2 = r2 * (o2 - 1) + 1;
      if (d2 && d2 !== "NOTSET") switch (d2) {
        case "VALID":
          return a2[s2] = 0, a2[u2] = 0, Math.floor((t2 - c2) / n2 + 1);
        case "SAME_LOWER":
        case "SAME_UPPER":
          if (r2 !== 1) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");
          {
            let f = ((t2 + n2 - 1) / n2 - 1) * n2 + o2 - t2;
            return a2[s2] = Math.floor(d2 === "SAME_LOWER" ? (f + 1) / 2 : f / 2), a2[u2] = f - a2[s2], Math.floor((t2 + f - o2) / n2 + 1);
          }
        default:
          throw new Error("Unsupported AutoPad type");
      }
      else return Math.floor((t2 + a2[s2] + a2[u2] - c2) / n2 + 1);
    }
  }, Vr = class {
    static getShapeOfGemmResult(t2, n2, r2, o2, a2) {
      if (t2.length !== 2 || r2.length !== 2) throw new Error("shape need to be of size 2");
      let s2, u2, d2;
      n2 ? (s2 = t2[1], u2 = t2[0]) : (s2 = t2[0], u2 = t2[1]);
      let c2 = -1;
      if (o2 ? (d2 = r2[0], c2 = 1) : (d2 = r2[1], c2 = 0), r2[c2] !== u2) throw new Error("dimension mismatch");
      if (s2 <= 0 || d2 <= 0 || u2 <= 0) throw new Error("invalid shape specified");
      if (a2 && !tt.isValidBroadcast(a2, [s2, d2])) throw new Error("gemm: invalid bias shape for broadcast");
      return [s2, d2, u2];
    }
  }, qa = -34028234663852886e22, ja = 34028234663852886e22;
});
var Lr;
var no = L(() => {
  "use strict";
  ee();
  Lr = (e2, t2) => new (Gt(t2))(e2);
});
var Za;
var io;
var Qa;
var pm;
var Ka;
var mm;
var Ya;
var Wr;
var Gr;
var oo;
var Xa;
var Ja = L(() => {
  "use strict";
  ee();
  et();
  Za = /* @__PURE__ */ new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), io = (e2, t2) => {
    if (t2 === "int32") return e2;
    let n2 = Za.get(t2);
    if (!n2) throw new Error(`WebNN backend does not support data type: ${t2}`);
    let r2 = n2 / 8;
    if (e2.byteLength % r2 !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${r2}.`);
    let o2 = e2.byteLength / r2, a2 = new (Gt(t2))(e2.buffer, e2.byteOffset, o2);
    switch (t2) {
      case "int64":
      case "uint64": {
        let s2 = new Int32Array(o2);
        for (let u2 = 0; u2 < o2; u2++) {
          let d2 = a2[u2];
          if (d2 > 2147483647n || d2 < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range.");
          s2[u2] = Number(d2);
        }
        return new Uint8Array(s2.buffer);
      }
      case "int8":
      case "uint8":
      case "uint32": {
        if (t2 === "uint32" && a2.some((u2) => u2 > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range.");
        let s2 = Int32Array.from(a2, Number);
        return new Uint8Array(s2.buffer);
      }
      default:
        throw new Error(`Unsupported data conversion from ${t2} to 'int32'`);
    }
  }, Qa = (e2, t2) => {
    if (t2 === "int32") return e2;
    if (e2.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
    let n2 = e2.byteLength / 4, r2 = new Int32Array(e2.buffer, e2.byteOffset, n2);
    switch (t2) {
      case "int64": {
        let o2 = BigInt64Array.from(r2, BigInt);
        return new Uint8Array(o2.buffer);
      }
      case "uint64": {
        if (r2.some((a2) => a2 < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found.");
        let o2 = BigUint64Array.from(r2, BigInt);
        return new Uint8Array(o2.buffer);
      }
      case "int8": {
        if (r2.some((a2) => a2 < -128 || a2 > 127)) throw new Error("Can not convert int32 data to int8 - value out of range.");
        let o2 = Int8Array.from(r2, Number);
        return new Uint8Array(o2.buffer);
      }
      case "uint8": {
        if (r2.some((o2) => o2 < 0 || o2 > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range.");
        return Uint8Array.from(r2, Number);
      }
      case "uint32": {
        if (r2.some((a2) => a2 < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found.");
        let o2 = Uint32Array.from(r2, Number);
        return new Uint8Array(o2.buffer);
      }
      default:
        throw new Error(`Unsupported data conversion from 'int32' to ${t2}`);
    }
  }, pm = 1, Ka = () => pm++, mm = /* @__PURE__ */ new Map([["int8", "int32"], ["uint8", "int32"], ["uint32", "int32"], ["int64", "int32"]]), Ya = (e2, t2) => {
    let n2 = Za.get(e2);
    if (!n2) throw new Error(`WebNN backend does not support data type: ${e2}`);
    return t2.length > 0 ? Math.ceil(t2.reduce((r2, o2) => r2 * o2) * n2 / 8) : 0;
  }, Wr = class {
    constructor(t2) {
      this.isDataConverted = false;
      let { sessionId: n2, context: r2, tensor: o2, dataType: a2, shape: s2, fallbackDataType: u2 } = t2;
      this.sessionId = n2, this.mlContext = r2, this.mlTensor = o2, this.dataType = a2, this.tensorShape = s2, this.fallbackDataType = u2;
    }
    get tensor() {
      return this.mlTensor;
    }
    get type() {
      return this.dataType;
    }
    get fallbackType() {
      return this.fallbackDataType;
    }
    get shape() {
      return this.tensorShape;
    }
    get byteLength() {
      return Ya(this.dataType, this.tensorShape);
    }
    destroy() {
      le("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
    }
    write(t2) {
      this.mlContext.writeTensor(this.mlTensor, t2);
    }
    async read(t2) {
      if (this.fallbackDataType) {
        let n2 = await this.mlContext.readTensor(this.mlTensor), r2 = Qa(new Uint8Array(n2), this.dataType);
        if (t2) {
          (t2 instanceof ArrayBuffer ? new Uint8Array(t2) : new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength)).set(r2);
          return;
        } else return r2.buffer;
      } else return t2 ? this.mlContext.readTensor(this.mlTensor, t2) : this.mlContext.readTensor(this.mlTensor);
    }
    canReuseTensor(t2, n2, r2) {
      return this.mlContext === t2 && this.dataType === n2 && this.tensorShape.length === r2.length && this.tensorShape.every((o2, a2) => o2 === r2[a2]);
    }
    setIsDataConverted(t2) {
      this.isDataConverted = t2;
    }
  }, Gr = class {
    constructor(t2, n2) {
      this.tensorManager = t2;
      this.wrapper = n2;
    }
    get tensorWrapper() {
      return this.wrapper;
    }
    releaseTensor() {
      this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
    }
    async ensureTensor(t2, n2, r2, o2) {
      let a2 = this.tensorManager.getMLContext(t2), s2;
      if (!a2.opSupportLimits().input.dataTypes.includes(n2)) {
        if (s2 = mm.get(n2), !s2 || !a2.opSupportLimits().input.dataTypes.includes(s2)) throw new Error(`WebNN backend does not support data type: ${n2}`);
        le("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${n2} to ${s2}`);
      }
      if (this.wrapper) {
        if (this.wrapper.canReuseTensor(a2, n2, r2)) return this.wrapper.tensor;
        if (o2) {
          if (this.wrapper.byteLength !== Ya(n2, r2)) throw new Error("Unable to copy data to tensor with different size.");
          this.activeUpload = new Uint8Array(await this.wrapper.read());
        }
        this.tensorManager.releaseTensor(this.wrapper);
      }
      let u2 = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
      return this.wrapper = await this.tensorManager.getCachedTensor(t2, n2, r2, u2, true, true, s2), o2 && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
    }
    upload(t2) {
      let n2 = t2;
      if (this.wrapper) {
        if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") n2 = io(t2, this.wrapper.type), this.wrapper.setIsDataConverted(true);
        else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
        if (t2.byteLength === this.wrapper.byteLength) {
          this.wrapper.write(n2);
          return;
        } else le("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
      }
      this.activeUpload ? this.activeUpload.set(n2) : this.activeUpload = new Uint8Array(n2);
    }
    async download(t2) {
      if (this.activeUpload) {
        let n2 = this.wrapper?.isDataConverted ? Qa(this.activeUpload, this.wrapper?.type) : this.activeUpload;
        if (t2) {
          t2 instanceof ArrayBuffer ? new Uint8Array(t2).set(n2) : new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength).set(n2);
          return;
        } else return n2.buffer;
      }
      if (!this.wrapper) throw new Error("Tensor has not been created.");
      return t2 ? this.wrapper.read(t2) : this.wrapper.read();
    }
  }, oo = class {
    constructor(t2) {
      this.backend = t2;
      this.tensorTrackersById = /* @__PURE__ */ new Map();
      this.freeTensors = [];
      this.externalTensors = /* @__PURE__ */ new Set();
    }
    getMLContext(t2) {
      let n2 = this.backend.getMLContext(t2);
      if (!n2) throw new Error("MLContext not found for session.");
      return n2;
    }
    reserveTensorId() {
      let t2 = Ka();
      return this.tensorTrackersById.set(t2, new Gr(this)), t2;
    }
    releaseTensorId(t2) {
      let n2 = this.tensorTrackersById.get(t2);
      n2 && (this.tensorTrackersById.delete(t2), n2.tensorWrapper && this.releaseTensor(n2.tensorWrapper));
    }
    async ensureTensor(t2, n2, r2, o2, a2) {
      le("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${n2}, dataType: ${r2}, shape: ${o2}, copyOld: ${a2}}`);
      let s2 = this.tensorTrackersById.get(n2);
      if (!s2) throw new Error("Tensor not found.");
      return s2.ensureTensor(t2, r2, o2, a2);
    }
    upload(t2, n2) {
      let r2 = this.tensorTrackersById.get(t2);
      if (!r2) throw new Error("Tensor not found.");
      r2.upload(n2);
    }
    async download(t2, n2) {
      le("verbose", () => `[WebNN] TensorManager.download {tensorId: ${t2}, dstBuffer: ${n2?.byteLength}}`);
      let r2 = this.tensorTrackersById.get(t2);
      if (!r2) throw new Error("Tensor not found.");
      return r2.download(n2);
    }
    releaseTensorsForSession(t2) {
      for (let n2 of this.freeTensors) n2.sessionId === t2 && n2.destroy();
      this.freeTensors = this.freeTensors.filter((n2) => n2.sessionId !== t2);
    }
    registerTensor(t2, n2, r2, o2) {
      let a2 = this.getMLContext(t2), s2 = Ka(), u2 = new Wr({ sessionId: t2, context: a2, tensor: n2, dataType: r2, shape: o2 });
      return this.tensorTrackersById.set(s2, new Gr(this, u2)), this.externalTensors.add(u2), s2;
    }
    async getCachedTensor(t2, n2, r2, o2, a2, s2, u2) {
      let d2 = this.getMLContext(t2);
      for (let [m, f] of this.freeTensors.entries()) if (f.canReuseTensor(d2, n2, r2)) {
        le("verbose", () => `[WebNN] Reusing tensor {dataType: ${n2}, ${u2 ? `fallbackDataType: ${u2},` : ""} shape: ${r2}`);
        let g2 = this.freeTensors.splice(m, 1)[0];
        return g2.sessionId = t2, g2;
      }
      le("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${n2}, ${u2 ? `fallbackDataType: ${u2},` : ""} shape: ${r2}}`);
      let c2 = await d2.createTensor({ dataType: u2 ?? n2, shape: r2, dimensions: r2, usage: o2, writable: a2, readable: s2 });
      return new Wr({ sessionId: t2, context: d2, tensor: c2, dataType: n2, shape: r2, fallbackDataType: u2 });
    }
    releaseTensor(t2) {
      this.externalTensors.has(t2) && this.externalTensors.delete(t2), this.freeTensors.push(t2);
    }
  }, Xa = (...e2) => new oo(...e2);
});
var Hr;
var fm;
var Fr;
var es = L(() => {
  "use strict";
  ee();
  $t();
  no();
  Ja();
  et();
  Hr = /* @__PURE__ */ new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), fm = (e2, t2) => {
    if (e2 === t2) return true;
    if (e2 === void 0 || t2 === void 0) return false;
    let n2 = Object.keys(e2).sort(), r2 = Object.keys(t2).sort();
    return n2.length === r2.length && n2.every((o2, a2) => o2 === r2[a2] && e2[o2] === t2[o2]);
  }, Fr = class {
    constructor(t2) {
      this.tensorManager = Xa(this);
      this.mlContextBySessionId = /* @__PURE__ */ new Map();
      this.sessionIdsByMLContext = /* @__PURE__ */ new Map();
      this.mlContextCache = [];
      this.sessionGraphInputs = /* @__PURE__ */ new Map();
      this.sessionGraphOutputs = /* @__PURE__ */ new Map();
      this.temporaryGraphInputs = [];
      this.temporaryGraphOutputs = [];
      this.temporarySessionTensorIds = /* @__PURE__ */ new Map();
      Nr(t2.logLevel, !!t2.debug);
    }
    get currentSessionId() {
      if (this.activeSessionId === void 0) throw new Error("No active session");
      return this.activeSessionId;
    }
    onRunStart(t2) {
      le("verbose", () => `[WebNN] onRunStart {sessionId: ${t2}}`), this.activeSessionId = t2;
    }
    onRunEnd(t2) {
      le("verbose", () => `[WebNN] onRunEnd {sessionId: ${t2}}`);
      let n2 = this.temporarySessionTensorIds.get(t2);
      if (n2) {
        for (let r2 of n2) le("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${r2}}`), this.tensorManager.releaseTensorId(r2);
        this.temporarySessionTensorIds.delete(t2), this.activeSessionId = void 0;
      }
    }
    async createMLContext(t2) {
      if (t2 instanceof GPUDevice) {
        let r2 = this.mlContextCache.findIndex((o2) => o2.gpuDevice === t2);
        if (r2 !== -1) return this.mlContextCache[r2].mlContext;
        {
          let o2 = await navigator.ml.createContext(t2);
          return this.mlContextCache.push({ gpuDevice: t2, mlContext: o2 }), o2;
        }
      } else if (t2 === void 0) {
        let r2 = this.mlContextCache.findIndex((o2) => o2.options === void 0 && o2.gpuDevice === void 0);
        if (r2 !== -1) return this.mlContextCache[r2].mlContext;
        {
          let o2 = await navigator.ml.createContext();
          return this.mlContextCache.push({ mlContext: o2 }), o2;
        }
      }
      let n2 = this.mlContextCache.findIndex((r2) => fm(r2.options, t2));
      if (n2 !== -1) return this.mlContextCache[n2].mlContext;
      {
        let r2 = await navigator.ml.createContext(t2);
        return this.mlContextCache.push({ options: t2, mlContext: r2 }), r2;
      }
    }
    registerMLContext(t2, n2) {
      this.mlContextBySessionId.set(t2, n2);
      let r2 = this.sessionIdsByMLContext.get(n2);
      r2 || (r2 = /* @__PURE__ */ new Set(), this.sessionIdsByMLContext.set(n2, r2)), r2.add(t2), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(t2, this.temporaryGraphInputs), this.temporaryGraphInputs = []), this.temporaryGraphOutputs.length > 0 && (this.sessionGraphOutputs.set(t2, this.temporaryGraphOutputs), this.temporaryGraphOutputs = []);
    }
    onReleaseSession(t2) {
      this.sessionGraphInputs.delete(t2), this.sessionGraphOutputs.delete(t2);
      let n2 = this.mlContextBySessionId.get(t2);
      if (!n2) return;
      this.tensorManager.releaseTensorsForSession(t2), this.mlContextBySessionId.delete(t2);
      let r2 = this.sessionIdsByMLContext.get(n2);
      if (r2.delete(t2), r2.size === 0) {
        this.sessionIdsByMLContext.delete(n2);
        let o2 = this.mlContextCache.findIndex((a2) => a2.mlContext === n2);
        o2 !== -1 && this.mlContextCache.splice(o2, 1);
      }
    }
    getMLContext(t2) {
      return this.mlContextBySessionId.get(t2);
    }
    reserveTensorId() {
      return this.tensorManager.reserveTensorId();
    }
    releaseTensorId(t2) {
      le("verbose", () => `[WebNN] releaseTensorId {tensorId: ${t2}}`), this.tensorManager.releaseTensorId(t2);
    }
    async ensureTensor(t2, n2, r2, o2, a2) {
      let s2 = Hr.get(r2);
      if (!s2) throw new Error(`Unsupported ONNX data type: ${r2}`);
      return this.tensorManager.ensureTensor(t2 ?? this.currentSessionId, n2, s2, o2, a2);
    }
    async createTemporaryTensor(t2, n2, r2) {
      le("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${n2}, shape: ${r2}}`);
      let o2 = Hr.get(n2);
      if (!o2) throw new Error(`Unsupported ONNX data type: ${n2}`);
      let a2 = this.tensorManager.reserveTensorId();
      await this.tensorManager.ensureTensor(t2, a2, o2, r2, false);
      let s2 = this.temporarySessionTensorIds.get(t2);
      return s2 ? s2.push(a2) : this.temporarySessionTensorIds.set(t2, [a2]), a2;
    }
    uploadTensor(t2, n2) {
      if (!_e().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
      le("verbose", () => `[WebNN] uploadTensor {tensorId: ${t2}, data: ${n2.byteLength}}`), this.tensorManager.upload(t2, n2);
    }
    async downloadTensor(t2, n2) {
      return this.tensorManager.download(t2, n2);
    }
    createMLTensorDownloader(t2, n2) {
      return async () => {
        let r2 = await this.tensorManager.download(t2);
        return Lr(r2, n2);
      };
    }
    registerMLTensor(t2, n2, r2, o2) {
      let a2 = Hr.get(r2);
      if (!a2) throw new Error(`Unsupported ONNX data type: ${r2}`);
      let s2 = this.tensorManager.registerTensor(t2, n2, a2, o2);
      return le("verbose", () => `[WebNN] registerMLTensor {tensor: ${n2}, dataType: ${a2}, dimensions: ${o2}} -> {tensorId: ${s2}}`), s2;
    }
    registerMLConstant(t2, n2, r2, o2, a2, s2, u2 = false) {
      if (!s2) throw new Error("External mounted files are not available.");
      let d2 = t2;
      t2.startsWith("./") && (d2 = t2.substring(2));
      let c2 = s2.get(d2);
      if (!c2) throw new Error(`File with name ${d2} not found in preloaded files.`);
      if (n2 + r2 > c2.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
      let m = c2.slice(n2, n2 + r2).buffer, f;
      switch (a2.dataType) {
        case "float32":
          f = new Float32Array(m);
          break;
        case "float16":
          f = typeof Float16Array < "u" && Float16Array.from ? new Float16Array(m) : new Uint16Array(m);
          break;
        case "int32":
          f = new Int32Array(m);
          break;
        case "uint32":
          f = new Uint32Array(m);
          break;
        case "int64":
          if (u2) {
            let g2 = io(new Uint8Array(m), "int64");
            f = new Int32Array(g2.buffer), a2.dataType = "int32";
          } else f = new BigInt64Array(m);
          break;
        case "uint64":
          f = new BigUint64Array(m);
          break;
        case "int8":
          f = new Int8Array(m);
          break;
        case "int4":
        case "uint4":
        case "uint8":
          f = new Uint8Array(m);
          break;
        default:
          throw new Error(`Unsupported data type: ${a2.dataType} in creating WebNN Constant from external data.`);
      }
      return le("verbose", () => `[WebNN] registerMLConstant {dataType: ${a2.dataType}, shape: ${a2.shape}}} ${u2 ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`), o2.constant(a2, f);
    }
    registerGraphInput(t2) {
      this.temporaryGraphInputs.push(t2);
    }
    registerGraphOutput(t2) {
      this.temporaryGraphOutputs.push(t2);
    }
    isGraphInput(t2, n2) {
      let r2 = this.sessionGraphInputs.get(t2);
      return r2 ? r2.includes(n2) : false;
    }
    isGraphOutput(t2, n2) {
      let r2 = this.sessionGraphOutputs.get(t2);
      return r2 ? r2.includes(n2) : false;
    }
    isGraphInputOutputTypeSupported(t2, n2, r2 = true) {
      let o2 = this.mlContextBySessionId.get(t2), a2 = Hr.get(xt(n2));
      return typeof a2 > "u" ? false : r2 ? !!o2?.opSupportLimits().input.dataTypes.includes(a2) : !!o2?.opSupportLimits().output.dataTypes.includes(a2);
    }
    flush() {
    }
  };
});
var qr = L(() => {
  "use strict";
});
var ts;
var ao;
var so;
var hm;
var gm;
var rs;
var lo;
var uo;
var os;
var is = L(() => {
  "use strict";
  et();
  qr();
  ts = /* @__PURE__ */ new Map([[64, 250], [128, 200], [256, 200], [512, 200], [2048, 230], [4096, 200], [8192, 50], [16384, 50], [32768, 50], [65536, 50], [131072, 50], [262144, 50], [524288, 50], [1048576, 50], [2097152, 30], [4194304, 20], [8388608, 10], [12582912, 10], [16777216, 10], [26214400, 15], [33554432, 22], [44236800, 2], [58982400, 6], [67108864, 6], [134217728, 6], [167772160, 6]]), ao = [], so = (e2) => Math.ceil(Number(e2) / 16) * 16, hm = (e2) => {
    for (let t2 = 0; t2 < ao.length; t2++) {
      let n2 = ao[t2];
      if (e2 <= n2) return n2;
    }
    return Math.ceil(e2 / 16) * 16;
  }, gm = 1, rs = () => gm++, lo = async (e2, t2, n2, r2) => {
    let o2 = so(n2), a2 = e2.device.createBuffer({ size: o2, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
    try {
      let s2 = e2.getCommandEncoder();
      e2.endComputePass(), s2.copyBufferToBuffer(t2, 0, a2, 0, o2), e2.flush(), await a2.mapAsync(GPUMapMode.READ);
      let u2 = a2.getMappedRange();
      if (r2) {
        let d2 = r2();
        return d2.set(new Uint8Array(u2, 0, n2)), d2;
      } else return new Uint8Array(u2.slice(0, n2));
    } finally {
      a2.destroy();
    }
  }, uo = class {
    constructor(t2) {
      this.backend = t2;
      this.storageCache = /* @__PURE__ */ new Map(), this.freeBuffers = /* @__PURE__ */ new Map(), this.freeUniformBuffers = /* @__PURE__ */ new Map(), this.buffersPending = [], this.capturedPendingBuffers = /* @__PURE__ */ new Map();
      for (let [n2] of ts) ao.push(n2), this.freeBuffers.set(n2, []), this.freeUniformBuffers.set(n2, []);
      this.sessionCount = 0;
    }
    upload(t2, n2) {
      let r2 = n2.buffer, o2 = n2.byteOffset, a2 = n2.byteLength, s2 = so(a2), u2 = this.storageCache.get(t2);
      if (!u2) throw new Error("gpu data for uploading does not exist");
      if (Number(u2.originalSize) !== a2) throw new Error(`inconsistent data size. gpu data size=${u2.originalSize}, data size=${a2}`);
      let d2 = this.backend.device.createBuffer({ mappedAtCreation: true, size: s2, usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC }), c2 = d2.getMappedRange();
      new Uint8Array(c2).set(new Uint8Array(r2, o2, a2)), d2.unmap();
      let m = this.backend.device.createCommandEncoder();
      m.copyBufferToBuffer(d2, 0, u2.gpuData.buffer, 0, s2), this.backend.device.queue.submit([m.finish()]), d2.destroy(), le("verbose", () => `[WebGPU] GpuDataManager.upload(id=${t2})`);
    }
    memcpy(t2, n2) {
      let r2 = this.storageCache.get(t2);
      if (!r2) throw new Error("source gpu data for memcpy does not exist");
      let o2 = this.storageCache.get(n2);
      if (!o2) throw new Error("destination gpu data for memcpy does not exist");
      if (r2.originalSize !== o2.originalSize) throw new Error("inconsistent source and destination gpu data size");
      let a2 = so(r2.originalSize), s2 = this.backend.getCommandEncoder();
      this.backend.endComputePass(), s2.copyBufferToBuffer(r2.gpuData.buffer, 0, o2.gpuData.buffer, 0, a2);
    }
    registerExternalBuffer(t2, n2, r2) {
      let o2;
      if (r2) {
        if (o2 = r2[0], t2 === r2[1]) return le("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${n2}) => id=${o2}, buffer is the same, skip.`), o2;
        if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);
      } else o2 = rs();
      return this.storageCache.set(o2, { gpuData: { id: o2, type: 0, buffer: t2 }, originalSize: n2 }), le("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${n2}) => id=${o2}, registered.`), o2;
    }
    unregisterExternalBuffer(t2) {
      t2 !== void 0 && (this.storageCache.delete(t2), le("verbose", () => `[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t2}`));
    }
    create(t2, n2 = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST) {
      let r2 = hm(t2), o2, a2 = (n2 & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE, s2 = (n2 & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM;
      if (a2 || s2) {
        let c2 = (a2 ? this.freeBuffers : this.freeUniformBuffers).get(r2);
        c2 ? c2.length > 0 ? o2 = c2.pop() : o2 = this.backend.device.createBuffer({ size: r2, usage: n2 }) : o2 = this.backend.device.createBuffer({ size: r2, usage: n2 });
      } else o2 = this.backend.device.createBuffer({ size: r2, usage: n2 });
      let u2 = { id: rs(), type: 0, buffer: o2 };
      return this.storageCache.set(u2.id, { gpuData: u2, originalSize: Number(t2) }), le("verbose", () => `[WebGPU] GpuDataManager.create(size=${t2}) => id=${u2.id}`), u2;
    }
    get(t2) {
      return this.storageCache.get(t2)?.gpuData;
    }
    release(t2) {
      let n2 = typeof t2 == "bigint" ? Number(t2) : t2, r2 = this.storageCache.get(n2);
      if (!r2) {
        if (this.storageCache.size === 0) return 0;
        throw new Error("releasing data does not exist");
      }
      return le("verbose", () => `[WebGPU] GpuDataManager.release(id=${n2}), gpuDataId=${r2.gpuData.id}`), this.storageCache.delete(n2), this.buffersPending.push(r2.gpuData.buffer), r2.originalSize;
    }
    async download(t2, n2) {
      let r2 = this.storageCache.get(Number(t2));
      if (!r2) throw new Error("data does not exist");
      await lo(this.backend, r2.gpuData.buffer, r2.originalSize, n2);
    }
    refreshPendingBuffers() {
      if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") {
        for (let t2 of this.buffersPending) {
          let n2 = ts.get(t2.size);
          if ((t2.usage & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE) {
            let r2 = this.freeBuffers.get(t2.size) || [];
            n2 === void 0 || r2.length >= n2 ? t2.destroy() : r2.push(t2);
          } else if ((t2.usage & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM) {
            let r2 = this.freeUniformBuffers.get(t2.size) || [];
            n2 === void 0 || r2.length >= n2 ? t2.destroy() : r2.push(t2);
          } else t2.destroy();
        }
        this.buffersPending = [];
      } else {
        let t2 = this.capturedPendingBuffers.get(this.backend.currentSessionId);
        t2 || (t2 = [], this.capturedPendingBuffers.set(this.backend.currentSessionId, t2));
        for (let n2 of this.buffersPending) t2.push(n2);
        this.buffersPending = [];
      }
    }
    dispose() {
      this.freeBuffers.forEach((t2) => {
        t2.forEach((n2) => {
          n2.destroy();
        });
      }), this.freeUniformBuffers.forEach((t2) => {
        t2.forEach((n2) => {
          n2.destroy();
        });
      }), this.storageCache.forEach((t2) => {
        t2.gpuData.buffer.destroy();
      }), this.capturedPendingBuffers.forEach((t2) => {
        t2.forEach((n2) => {
          n2.destroy();
        });
      }), this.storageCache = /* @__PURE__ */ new Map(), this.freeBuffers = /* @__PURE__ */ new Map(), this.freeUniformBuffers = /* @__PURE__ */ new Map(), this.capturedPendingBuffers = /* @__PURE__ */ new Map();
    }
    onCreateSession() {
      this.sessionCount += 1;
    }
    onReleaseSession(t2) {
      let n2 = this.capturedPendingBuffers.get(t2);
      n2 && (n2.forEach((r2) => {
        r2.destroy();
      }), this.capturedPendingBuffers.delete(t2)), this.sessionCount -= 1, this.sessionCount === 0 && (le("warning", () => "[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach((r2) => {
        r2.gpuData.buffer.destroy();
      }), this.storageCache = /* @__PURE__ */ new Map());
    }
  }, os = (...e2) => new uo(...e2);
});
var co;
var te;
var Se = L(() => {
  "use strict";
  co = class {
    constructor(t2) {
      Object.assign(this, t2);
    }
    get cacheKey() {
      return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map((t2) => `${this[t2]}`).join(";")), this.key;
    }
  }, te = (e2) => new co(e2);
});
var Bt;
var mo;
var ve;
var ke;
var W;
var he;
var fo;
var Mt;
var je;
var K;
var jr;
var P;
var N;
var as;
var Kr;
var po;
var ss;
var ue = L(() => {
  "use strict";
  ee();
  ae();
  Bt = 64, mo = (e2, t2) => {
    if (t2 === 3) throw new Error("vec3 has same alignment as vec4, use vec4 instead");
    switch (Number(e2)) {
      case 10:
        return t2 > 1 ? `vec${t2}<f16>` : "f16";
      case 1:
        return t2 > 1 ? `vec${t2}<f32>` : "f32";
      case 6:
        return t2 > 1 ? `vec${t2}<i32>` : "i32";
      case 12:
        return t2 > 1 ? `vec${t2}<u32>` : "u32";
      case 7:
        if (t2 > 1) throw new Error("currently not supported vecX of uint64 yet");
        return ["vec2<u32>", "i32"];
      case 13:
        if (t2 > 1) throw new Error("currently not supported vecX of uint64 yet");
        return ["vec2<u32>", "u32"];
      case 9:
        if (t2 !== 4) throw new Error("bool must be vec4");
        return ["u32", "vec4<bool>"];
      case 22:
        return "i32";
      case 21:
        return "u32";
      default:
        throw new Error(`Unknown data type: ${e2}`);
    }
  }, ve = (e2, t2 = 1) => {
    let n2 = mo(e2, t2);
    return typeof n2 == "string" ? n2 : n2[0];
  }, ke = (e2, t2 = 1) => {
    let n2 = mo(e2, t2);
    return typeof n2 == "string" ? n2 : n2[1];
  }, W = (...e2) => {
    let t2 = [];
    return e2.forEach((n2) => {
      n2.length !== 0 && t2.push({ type: 12, data: n2 }, { type: 12, data: E.computeStrides(n2) });
    }), t2;
  }, he = (e2) => e2 % 4 === 0 ? 4 : e2 % 2 === 0 ? 2 : 1, fo = (e2 = "f32", t2, n2 = "0") => !t2 || t2 === 1 ? `${e2}(${n2})` : `vec${t2}<${e2}>(${n2})`, Mt = (e2, t2, n2) => e2 === "f32" ? n2 : t2 === 1 ? `f32(${n2})` : `vec${t2}<f32>(${n2})`, je = (e2, t2) => t2 === 4 ? `(${e2}.x + ${e2}.y + ${e2}.z + ${e2}.w)` : t2 === 2 ? `(${e2}.x + ${e2}.y)` : t2 === 3 ? `(${e2}.x + ${e2}.y + ${e2}.z)` : e2, K = (e2, t2, n2, r2) => e2.startsWith("uniforms.") && n2 > 4 ? typeof t2 == "string" ? r2 === "f16" ? `${e2}[(${t2}) / 8][(${t2}) % 8 / 4][(${t2}) % 8 % 4]` : `${e2}[(${t2}) / 4][(${t2}) % 4]` : r2 === "f16" ? `${e2}[${Math.floor(t2 / 8)}][${Math.floor(t2 % 8 / 4)}][${t2 % 8 % 4}]` : `${e2}[${Math.floor(t2 / 4)}][${t2 % 4}]` : n2 > 1 ? `${e2}[${t2}]` : e2, jr = (e2, t2, n2, r2, o2) => {
    let a2 = typeof n2 == "number", s2 = a2 ? n2 : n2.length, u2 = [...new Array(s2).keys()], d2 = s2 < 2 ? "u32" : s2 <= 4 ? `vec${s2}<u32>` : `array<u32, ${s2}>`, c2 = mo(t2, o2), m = typeof c2 == "string" ? c2 : c2[1], f = typeof c2 == "string" ? c2 : c2[0], g2 = { indices: d2, value: m, storage: f, tensor: t2 }, _ = (V) => typeof V == "string" ? V : `${V}u`, b = { offsetToIndices: false, indicesToOffset: false, broadcastedIndicesToOffset: false, set: false, setByIndices: false, get: false, getByIndices: false }, w = a2 ? "uniforms." : "", x = `${w}${e2}_shape`, v = `${w}${e2}_strides`, $ = "";
    for (let V = 0; V < s2 - 1; V++) $ += `
    let dim${V} = current / ${K(v, V, s2)};
    let rest${V} = current % ${K(v, V, s2)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;
    $ += `indices[${s2 - 1}] = current;`;
    let T = s2 < 2 ? "" : `
  fn o2i_${e2}(offset: u32) -> ${g2.indices} {
    var indices: ${g2.indices};
    var current = offset;
    ${$}
    return indices;
  }`, C = (V) => (b.offsetToIndices = true, s2 < 2 ? V : `o2i_${e2}(${V})`), A = [];
    if (s2 >= 2) for (let V = s2 - 1; V >= 0; V--) A.push(`${K(v, V, s2)} * (indices[${V}])`);
    let I = s2 < 2 ? "" : `
  fn i2o_${e2}(indices: ${g2.indices}) -> u32 {
    return ${A.join("+")};
  }`, z = (V) => (b.indicesToOffset = true, s2 < 2 ? V : `i2o_${e2}(${V})`), D = (...V) => s2 === 0 ? "0u" : `${g2.indices}(${V.map(_).join(",")})`, R = (V, O) => s2 < 2 ? `${V}` : `${K(V, O, s2)}`, H = (V, O, X) => s2 < 2 ? `${V}=${X};` : `${K(V, O, s2)}=${X};`, q = {}, Y = (V, O) => {
      b.broadcastedIndicesToOffset = true;
      let X = `${O.name}broadcastedIndicesTo${e2}Offset`;
      if (X in q) return `${X}(${V})`;
      let ze = [];
      for (let Oe = s2 - 1; Oe >= 0; Oe--) {
        let xe = O.indicesGet("outputIndices", Oe + O.rank - s2);
        ze.push(`${R(v, Oe)} * (${xe} % ${R(x, Oe)})`);
      }
      return q[X] = `fn ${X}(outputIndices: ${O.type.indices}) -> u32 {
             return ${ze.length > 0 ? ze.join("+") : "0u"};
           }`, `${X}(${V})`;
    }, ne = (V, O) => (() => {
      if (g2.storage === g2.value) return `${e2}[${V}]=${O};`;
      if (g2.storage === "vec2<u32>" && g2.value === "i32") return `${e2}[${V}]=vec2<u32>(u32(${O}), select(0u, 0xFFFFFFFFu, ${O} < 0));`;
      if (g2.storage === "vec2<u32>" && g2.value === "u32") return `${e2}[${V}]=vec2<u32>(u32(${O}), 0u);`;
      if (g2.storage === "u32" && g2.value === "vec4<bool>") return `${e2}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${O}));`;
      throw new Error(`not supported combination of storage type ${g2.storage} and value type ${g2.value} yet`);
    })(), F = (V) => (() => {
      if (g2.storage === g2.value) return `${e2}[${V}]`;
      if (g2.storage === "vec2<u32>" && g2.value === "i32") return `i32(${e2}[${V}].x)`;
      if (g2.storage === "vec2<u32>" && g2.value === "u32") return `u32(${e2}[${V}].x)`;
      if (g2.storage === "u32" && g2.value === "vec4<bool>") return `vec4<bool>(bool(${e2}[${V}] & 0xFFu), bool(${e2}[${V}] & 0xFF00u), bool(${e2}[${V}] & 0xFF0000u), bool(${e2}[${V}] & 0xFF000000u))`;
      throw new Error(`not supported combination of storage type ${g2.storage} and value type ${g2.value} yet`);
    })(), me = s2 < 2 ? "" : `
  fn get_${e2}ByIndices(indices: ${g2.indices}) -> ${m} {
    return ${F(`i2o_${e2}(indices)`)};
  }`, oe = s2 < 2 ? "" : (() => {
      let V = u2.map((X) => `d${X}: u32`).join(", "), O = u2.map((X) => `d${X}`).join(", ");
      return `
  fn get_${e2}(${V}) -> ${m} {
    return get_${e2}ByIndices(${D(O)});
  }`;
    })(), j = (...V) => {
      if (V.length !== s2) throw new Error(`indices length must be ${s2}`);
      let O = V.map(_).join(",");
      return s2 === 0 ? F("0u") : s2 === 1 ? F(O[0]) : (b.get = true, b.getByIndices = true, b.indicesToOffset = true, `get_${e2}(${O})`);
    }, ie = (V) => s2 < 2 ? F(V) : (b.getByIndices = true, b.indicesToOffset = true, `get_${e2}ByIndices(${V})`), Z = s2 < 2 ? "" : `
  fn set_${e2}ByIndices(indices: ${g2.indices}, value: ${m}) {
    ${ne(`i2o_${e2}(indices)`, "value")}
  }`, ce = s2 < 2 ? "" : (() => {
      let V = u2.map((X) => `d${X}: u32`).join(", "), O = u2.map((X) => `d${X}`).join(", ");
      return `
  fn set_${e2}(${V}, value: ${m}) {
    set_${e2}ByIndices(${D(O)}, value);
  }`;
    })();
    return { impl: () => {
      let V = [], O = false;
      return b.offsetToIndices && (V.push(T), O = true), b.indicesToOffset && (V.push(I), O = true), b.broadcastedIndicesToOffset && (Object.values(q).forEach((X) => V.push(X)), O = true), b.set && (V.push(ce), O = true), b.setByIndices && (V.push(Z), O = true), b.get && (V.push(oe), O = true), b.getByIndices && (V.push(me), O = true), !a2 && O && V.unshift(`const ${x} = ${g2.indices}(${n2.join(",")});`, `const ${v} = ${g2.indices}(${E.computeStrides(n2).join(",")});`), V.join(`
`);
    }, type: g2, offsetToIndices: C, indicesToOffset: z, broadcastedIndicesToOffset: Y, indices: D, indicesGet: R, indicesSet: H, set: (...V) => {
      if (V.length !== s2 + 1) throw new Error(`indices length must be ${s2}`);
      let O = V[s2];
      if (typeof O != "string") throw new Error("value must be string");
      let X = V.slice(0, s2).map(_).join(",");
      return s2 === 0 ? ne("0u", O) : s2 === 1 ? ne(X[0], O) : (b.set = true, b.setByIndices = true, b.indicesToOffset = true, `set_${e2}(${X}, ${O})`);
    }, setByOffset: ne, setByIndices: (V, O) => s2 < 2 ? ne(V, O) : (b.setByIndices = true, b.indicesToOffset = true, `set_${e2}ByIndices(${V}, ${O});`), get: j, getByOffset: F, getByIndices: ie, usage: r2, name: e2, strides: v, shape: x, rank: s2 };
  }, P = (e2, t2, n2, r2 = 1) => jr(e2, t2, n2, "input", r2), N = (e2, t2, n2, r2 = 1) => jr(e2, t2, n2, "output", r2), as = (e2, t2, n2) => jr(e2, t2, n2, "atomicOutput", 1), Kr = (e2, t2, n2, r2 = 1) => jr(e2, t2, n2, "internal", r2), po = class {
    constructor(t2, n2) {
      this.normalizedDispatchGroup = t2;
      this.limits = n2;
      this.internalVariables = [];
      this.variables = [];
      this.uniforms = [];
      this.variableIndex = 0;
    }
    guardAgainstOutOfBoundsWorkgroupSizes(t2) {
      return `if (global_idx >= ${typeof t2 == "number" ? `${t2}u` : t2}) { return; }`;
    }
    mainStart(t2 = Bt) {
      let n2 = typeof t2 == "number" ? t2 : t2[0], r2 = typeof t2 == "number" ? 1 : t2[1], o2 = typeof t2 == "number" ? 1 : t2[2];
      if (n2 > this.limits.maxComputeWorkgroupSizeX || r2 > this.limits.maxComputeWorkgroupSizeY || o2 > this.limits.maxComputeWorkgroupSizeZ) throw new Error(`workgroup size [${n2}, ${r2}, ${o2}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);
      if (n2 * r2 * o2 > this.limits.maxComputeInvocationsPerWorkgroup) throw new Error(`workgroup size [${n2}, ${r2}, ${o2}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);
      let a2 = this.normalizedDispatchGroup[1] === 1 && this.normalizedDispatchGroup[2] === 1, s2 = a2 ? `@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>` : `@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`, u2 = a2 ? `let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;` : `let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n2 * r2 * o2}u + local_idx;`;
      return `@compute @workgroup_size(${n2}, ${r2}, ${o2})
  fn main(${s2}) {
    ${u2}
  `;
    }
    appendVariableUniforms(t2) {
      t2.rank !== 0 && (t2.shape.startsWith("uniforms.") && this.uniforms.push({ name: t2.shape.replace("uniforms.", ""), type: "u32", length: t2.rank }), t2.strides.startsWith("uniforms.") && this.uniforms.push({ name: t2.strides.replace("uniforms.", ""), type: "u32", length: t2.rank }));
    }
    declareVariable(t2, n2) {
      if (t2.usage === "internal") throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");
      this.variables.push(t2), this.appendVariableUniforms(t2);
      let r2 = t2.usage === "input" ? "read" : "read_write", o2 = t2.usage === "atomicOutput" ? "atomic<i32>" : t2.type.storage;
      return `@group(0) @binding(${n2}) var<storage, ${r2}> ${t2.name}: array<${o2}>;`;
    }
    declareVariables(...t2) {
      return t2.map((n2) => this.declareVariable(n2, this.variableIndex++)).join(`
`);
    }
    registerInternalVariable(t2) {
      if (t2.usage !== "internal") throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");
      this.internalVariables.push(t2), this.appendVariableUniforms(t2);
    }
    registerInternalVariables(...t2) {
      return t2.forEach((n2) => this.registerInternalVariable(n2)), this;
    }
    registerUniform(t2, n2, r2 = 1) {
      return this.uniforms.push({ name: t2, type: n2, length: r2 }), this;
    }
    registerUniforms(t2) {
      return this.uniforms = this.uniforms.concat(t2), this;
    }
    uniformDeclaration() {
      if (this.uniforms.length === 0) return "";
      let t2 = [];
      for (let { name: n2, type: r2, length: o2 } of this.uniforms) if (o2 && o2 > 4) r2 === "f16" ? t2.push(`@align(16) ${n2}:array<mat2x4<${r2}>, ${Math.ceil(o2 / 8)}>`) : t2.push(`${n2}:array<vec4<${r2}>, ${Math.ceil(o2 / 4)}>`);
      else {
        let a2 = o2 == null || o2 === 1 ? r2 : `vec${o2}<${r2}>`;
        t2.push(`${n2}:${a2}`);
      }
      return `
      struct Uniforms { ${t2.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`;
    }
    get additionalImplementations() {
      return this.uniformDeclaration() + this.variables.map((t2) => t2.impl()).join(`
`) + this.internalVariables.map((t2) => t2.impl()).join(`
`);
    }
    get variablesInfo() {
      if (this.uniforms.length === 0) return;
      let t2 = (n2) => [12, 10, 1, 6][["u32", "f16", "f32", "i32"].indexOf(n2)];
      return this.uniforms.map((n2) => [t2(n2.type), n2.length ?? 1]);
    }
  }, ss = (e2, t2) => new po(e2, t2);
});
var ym;
var us;
var bm;
var _m;
var wm;
var vm;
var Pe;
var ls;
var ds;
var ct = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  ym = (e2, t2) => {
    if (!e2 || e2.length !== 1) throw new Error("Transpose requires 1 input.");
    if (t2.length !== 0 && t2.length !== e2[0].dims.length) throw new Error(`perm size ${t2.length} does not match input rank ${e2[0].dims.length}`);
  }, us = (e2, t2) => t2.length !== 0 ? t2 : [...new Array(e2).keys()].reverse(), bm = (e2, t2) => E.sortBasedOnPerm(e2, us(e2.length, t2)), _m = (e2, t2, n2, r2) => {
    let o2 = `fn perm(i: ${r2.type.indices}) -> ${n2.type.indices} {
    var a: ${n2.type.indices};`;
    for (let a2 = 0; a2 < t2; ++a2) o2 += `a[${e2[a2]}]=i[${a2}];`;
    return o2 += "return a;}";
  }, wm = (e2, t2) => {
    let n2 = [], r2 = [];
    for (let o2 = 0; o2 < e2.length; ++o2) e2[o2] !== 1 && n2.push(e2[o2]), e2[t2[o2]] !== 1 && r2.push(t2[o2]);
    return { newShape: n2, newPerm: r2 };
  }, vm = (e2, t2) => {
    let n2 = 0;
    for (let r2 = 0; r2 < e2.length; ++r2) if (t2[e2[r2]] !== 1) {
      if (e2[r2] < n2) return false;
      n2 = e2[r2];
    }
    return true;
  }, Pe = (e2, t2) => {
    let n2 = e2.dataType, r2 = e2.dims.length, o2 = us(r2, t2), a2 = bm(e2.dims, o2), s2 = e2.dims, u2 = a2, d2 = r2 < 2 || vm(o2, e2.dims), c2;
    if (d2) return c2 = (w) => {
      let x = P("input", n2, s2, 4), v = N("output", n2, u2, 4);
      return `
  ${w.registerUniform("output_size", "u32").declareVariables(x, v)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`;
    }, { name: "TransposeCopy", shaderCache: { inputDependencies: ["type"] }, getRunData: () => {
      let w = E.size(a2);
      return { outputs: [{ dims: a2, dataType: e2.dataType }], dispatchGroup: { x: Math.ceil(w / 64 / 4) }, programUniforms: [{ type: 12, data: Math.ceil(w / 4) }] };
    }, getShaderSource: c2 };
    let { newShape: m, newPerm: f } = wm(e2.dims, o2), g2 = E.areEqual(f, [2, 3, 1]), _ = E.areEqual(f, [3, 1, 2]);
    if (m.length === 2 || g2 || _) {
      s2 = g2 ? [m[0], m[1] * m[2]] : _ ? [m[0] * m[1], m[2]] : m, u2 = [s2[1], s2[0]];
      let w = 16;
      return c2 = (x) => {
        let v = P("a", n2, s2.length), $ = N("output", n2, u2.length);
        return `
  ${x.registerUniform("output_size", "u32").declareVariables(v, $)}
  var<workgroup> tile : array<array<${$.type.value}, ${w + 1}>, ${w}>;
  ${x.mainStart([w, w, 1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`, "tile[local_id.x][local_id.y]")}
    }
  }`;
      }, { name: "TransposeShared", shaderCache: { inputDependencies: ["type"] }, getRunData: () => {
        let x = E.size(a2);
        return { outputs: [{ dims: a2, dataType: e2.dataType }], dispatchGroup: { x: Math.ceil(u2[1] / w), y: Math.ceil(u2[0] / w) }, programUniforms: [{ type: 12, data: x }, ...W(s2, u2)] };
      }, getShaderSource: c2 };
    }
    return c2 = (w) => {
      let x = P("a", n2, s2.length), v = N("output", n2, u2.length);
      return `
  ${w.registerUniform("output_size", "u32").declareVariables(x, v)}

  ${_m(o2, r2, x, v)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx", x.getByIndices("aIndices"))}
  }`;
    }, { name: "Transpose", shaderCache: { hint: `${t2}`, inputDependencies: ["rank"] }, getRunData: () => {
      let w = E.size(a2);
      return { outputs: [{ dims: a2, dataType: e2.dataType }], dispatchGroup: { x: Math.ceil(w / 64) }, programUniforms: [{ type: 12, data: w }, ...W(s2, u2)] };
    }, getShaderSource: c2 };
  }, ls = (e2, t2) => {
    ym(e2.inputs, t2.perm), e2.compute(Pe(e2.inputs[0], t2.perm));
  }, ds = (e2) => te({ perm: e2.perm });
});
var $m;
var xm;
var Sm;
var Tm;
var Cm;
var Im;
var Am;
var Em;
var km;
var Pm;
var rt;
var cs;
var ps;
var ms;
var fs;
var hs;
var gs;
var ys;
var bs;
var _s;
var ws;
var vs = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Zr();
  ct();
  $m = { max: "select(bestValue, candidate, candidate > bestValue)", min: "select(bestValue, candidate, candidate < bestValue)", mean: "bestValue + candidate", sum: "bestValue + candidate", prod: "bestValue * candidate", sumSquare: "bestValue + candidate * candidate", logSumExp: "bestValue + exp(candidate)", l1: "bestValue + abs(candidate)", l2: "bestValue + candidate * candidate", logSum: "bestValue + candidate" }, xm = { max: "select(bestValue, candidate, candidate > bestValue)", min: "select(bestValue, candidate, candidate < bestValue)", mean: "bestValue + candidate", sum: "bestValue + candidate", prod: "bestValue * candidate", sumSquare: "bestValue + candidate", logSumExp: "bestValue + candidate", l1: "bestValue + candidate", l2: "bestValue + candidate", logSum: "bestValue + candidate" }, Sm = { max: "_A[offset]", min: "_A[offset]", mean: "0", sum: "0", prod: "1", sumSquare: "0", logSumExp: "0", l1: "0", l2: "0", logSum: "0" }, Tm = { max: "bestValue", min: "bestValue", sum: "bestValue", prod: "bestValue", sumSquare: "bestValue", logSumExp: "log(bestValue)", l1: "bestValue", l2: "sqrt(bestValue)", logSum: "log(bestValue)" }, Cm = (e2, t2) => {
    let n2 = [];
    for (let r2 = t2 - e2; r2 < t2; ++r2) n2.push(r2);
    return n2;
  }, Im = (e2, t2) => {
    let n2 = [], r2 = e2.length;
    for (let a2 = 0; a2 < r2; a2++) t2.indexOf(a2) === -1 && n2.push(e2[a2]);
    let o2 = t2.map((a2) => e2[a2]);
    return [n2, o2];
  }, Am = (e2, t2) => {
    let n2 = e2.length + t2.length, r2 = [], o2 = 0;
    for (let a2 = 0; a2 < n2; a2++) t2.indexOf(a2) === -1 ? r2.push(e2[o2++]) : r2.push(1);
    return r2;
  }, Em = (e2, t2) => {
    for (let n2 = 0; n2 < e2.length; ++n2) if (e2[e2.length - n2 - 1] !== t2 - 1 - n2) return false;
    return true;
  }, km = (e2, t2) => {
    let n2 = [];
    if (!Em(e2, t2)) {
      for (let r2 = 0; r2 < t2; ++r2) e2.indexOf(r2) === -1 && n2.push(r2);
      e2.forEach((r2) => n2.push(r2));
    }
    return n2;
  }, Pm = (e2, t2, n2, r2, o2, a2, s2) => {
    let u2 = n2[0].dims, d2 = E.size(a2), c2 = E.size(s2), m = P("_A", n2[0].dataType, u2), f = N("output", o2, a2), g2 = 64;
    d2 === 1 && (g2 = 256);
    let _ = `
          var<workgroup> aBestValues : array<f32, ${g2}>;
       `, b = (w) => `
        ${w.registerUniform("reduceSize", "u32").declareVariables(m, f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(g2)}

          let outputIndex = global_idx / ${g2};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Sm[r2]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g2}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${$m[r2]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g2}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${xm[r2]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex", `${r2 === "mean" ? `${f.type.storage}(bestValue / f32(uniforms.reduceSize))` : `${f.type.storage}(${Tm[r2]})`}`)};
         }
        }`;
    return { name: e2, shaderCache: { hint: `${t2};${g2}`, inputDependencies: ["type"] }, getShaderSource: b, getRunData: () => ({ outputs: [{ dims: a2, dataType: o2 }], dispatchGroup: { x: d2 }, programUniforms: [{ type: 12, data: c2 }] }) };
  }, rt = (e2, t2, n2, r2) => {
    let o2 = e2.inputs.length === 1 ? n2 : ho(e2.inputs, n2), a2 = o2.axes;
    a2.length === 0 && !o2.noopWithEmptyAxes && (a2 = e2.inputs[0].dims.map((_, b) => b));
    let s2 = E.normalizeAxes(a2, e2.inputs[0].dims.length), u2 = s2, d2 = e2.inputs[0], c2 = km(u2, e2.inputs[0].dims.length);
    c2.length > 0 && (d2 = e2.compute(Pe(e2.inputs[0], c2), { inputs: [0], outputs: [-1] })[0], u2 = Cm(u2.length, d2.dims.length));
    let [m, f] = Im(d2.dims, u2), g2 = m;
    o2.keepDims && (g2 = Am(m, s2)), e2.compute(Pm(t2, o2.cacheKey, [d2], r2, e2.inputs[0].dataType, g2, f), { inputs: [d2] });
  }, cs = (e2, t2) => {
    rt(e2, "ReduceMeanShared", t2, "mean");
  }, ps = (e2, t2) => {
    rt(e2, "ReduceL1Shared", t2, "l1");
  }, ms = (e2, t2) => {
    rt(e2, "ReduceL2Shared", t2, "l2");
  }, fs = (e2, t2) => {
    rt(e2, "ReduceLogSumExpShared", t2, "logSumExp");
  }, hs = (e2, t2) => {
    rt(e2, "ReduceMaxShared", t2, "max");
  }, gs = (e2, t2) => {
    rt(e2, "ReduceMinShared", t2, "min");
  }, ys = (e2, t2) => {
    rt(e2, "ReduceProdShared", t2, "prod");
  }, bs = (e2, t2) => {
    rt(e2, "ReduceSumShared", t2, "sum");
  }, _s = (e2, t2) => {
    rt(e2, "ReduceSumSquareShared", t2, "sumSquare");
  }, ws = (e2, t2) => {
    rt(e2, "ReduceLogSumShared", t2, "logSum");
  };
});
var nt;
var Om;
var Qr;
var ho;
var ot;
var zm;
var Dm;
var Bm;
var Mm;
var Rm;
var Um;
var Nm;
var Vm;
var Lm;
var Wm;
var it;
var $s;
var xs;
var Ss;
var Ts;
var Cs;
var Is;
var As;
var Es;
var ks;
var Ps;
var Zr = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  vs();
  nt = (e2) => {
    if (!e2 || e2.length === 0 || e2.length > 2) throw new Error("Reduce op requires 1 or 2 inputs.");
    if (e2.length === 2 && e2[1].dims.length !== 1) throw new Error("Invalid axes input dims.");
  }, Om = (e2) => ["", "", `var value = ${e2.getByIndices("input_indices")};`, ""], Qr = (e2, t2, n2, r2, o2, a2, s2 = false, u2 = false) => {
    let d2 = [], c2 = n2[0].dims, m = c2.length, f = E.normalizeAxes(o2, m), g2 = !u2 && f.length === 0;
    c2.forEach((x, v) => {
      g2 || f.indexOf(v) >= 0 ? s2 && d2.push(1) : d2.push(x);
    });
    let _ = d2.length, b = E.size(d2);
    return { name: e2, shaderCache: t2, getShaderSource: (x) => {
      let v = [], $ = P("_A", n2[0].dataType, m), T = N("output", a2, _), C = r2($, T, f), A = C[2];
      for (let I = 0, z = 0; I < m; I++) g2 || f.indexOf(I) >= 0 ? (s2 && z++, A = `for(var j${I}: u32 = 0; j${I} < ${c2[I]}; j${I}++) {
                  ${C[2].includes("last_index") ? `let last_index = j${I};` : ""}
                  ${$.indicesSet("input_indices", I, `j${I}`)}
                  ${A}
                }`) : (v.push(`${$.indicesSet("input_indices", I, T.indicesGet("output_indices", z))};`), z++);
      return `

        ${x.registerUniform("output_size", "u32").declareVariables($, T)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${A}
          ${C[3]}
          ${C.length === 4 ? T.setByOffset("global_idx", "value") : C.slice(4).join(`
`)}
        }`;
    }, getRunData: () => ({ outputs: [{ dims: d2, dataType: a2 }], dispatchGroup: { x: Math.ceil(b / 64) }, programUniforms: [{ type: 12, data: b }, ...W(c2, d2)] }) };
  }, ho = (e2, t2) => {
    let n2 = [];
    return e2[1].dims[0] > 0 && e2[1].getBigInt64Array().forEach((r2) => n2.push(Number(r2))), te({ axes: n2, keepDims: t2.keepDims, noopWithEmptyAxes: t2.noopWithEmptyAxes });
  }, ot = (e2, t2, n2, r2) => {
    let o2 = e2.inputs, a2 = o2.length === 1 ? n2 : ho(o2, n2);
    e2.compute(Qr(t2, { hint: a2.cacheKey, inputDependencies: ["rank"] }, [o2[0]], a2.noopWithEmptyAxes && a2.axes.length === 0 ? Om : r2, a2.axes, o2[0].dataType, a2.keepDims, a2.noopWithEmptyAxes), { inputs: [0] });
  }, zm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceLogSum", t2, (r2, o2) => [`var value = ${o2.type.storage}(0);`, "", `value += ${r2.getByIndices("input_indices")};`, "value = log(value);"]);
  }, Dm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceL1", t2, (r2, o2) => [`var value = ${o2.type.storage}(0);`, "", `value += abs(${r2.getByIndices("input_indices")});`, ""]);
  }, Bm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceL2", t2, (r2, o2) => [`var t = ${o2.type.value}(0); var value = ${o2.type.value}(0);`, "", `t = ${r2.getByIndices("input_indices")}; value += (t * t);`, "value = sqrt(value);"]);
  }, Mm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceLogSumExp", t2, (r2, o2) => [`var value = ${o2.type.storage}(0);`, "", `value += exp(${r2.getByIndices("input_indices")});`, "value = log(value);"]);
  }, Rm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceMax", t2, (r2, o2, a2) => {
      let s2 = [];
      for (let u2 = 0; u2 < r2.rank; u2++) (a2.indexOf(u2) >= 0 || a2.length === 0) && s2.push(r2.indicesSet("input_indices", u2, 0));
      return [`${s2.join(`
`)}`, `var value = ${r2.getByIndices("input_indices")};`, `value = max(value, ${r2.getByIndices("input_indices")});`, ""];
    });
  }, Um = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceMean", t2, (r2, o2, a2) => {
      let s2 = 1;
      for (let u2 = 0; u2 < r2.rank; u2++) (a2.indexOf(u2) >= 0 || a2.length === 0) && (s2 *= e2.inputs[0].dims[u2]);
      return ["var sum = f32(0);", "", `sum += f32(${r2.getByIndices("input_indices")});`, `let value = ${o2.type.value}(sum / ${s2});`];
    });
  }, Nm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceMin", t2, (r2, o2, a2) => {
      let s2 = [];
      for (let u2 = 0; u2 < r2.rank; u2++) (a2.indexOf(u2) >= 0 || a2.length === 0) && s2.push(`input_indices[${u2}] = 0;`);
      return [`${s2.join(`
`)}`, `var value = ${r2.getByIndices("input_indices")};`, `value = min(value, ${r2.getByIndices("input_indices")});`, ""];
    });
  }, Vm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceProd", t2, (r2, o2) => [`var value = ${o2.type.storage}(1);`, "", `value *= ${r2.getByIndices("input_indices")};`, ""]);
  }, Lm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceSum", t2, (r2, o2) => [`var value = ${o2.type.storage}(0);`, "", `value += ${r2.getByIndices("input_indices")};`, ""]);
  }, Wm = (e2, t2) => {
    nt(e2.inputs), ot(e2, "ReduceSumSquare", t2, (r2, o2) => [`var t = ${o2.type.value}(0); var value = ${o2.type.value}(0);`, "", `t = ${r2.getByIndices("input_indices")}; value += t * t;`, ""]);
  }, it = (e2, t2, n2) => {
    if (t2.length === 0) return n2;
    let r2 = 1, o2 = 1;
    for (let a2 = 0; a2 < t2.length; a2++) t2.indexOf(a2) === -1 ? r2 *= e2[a2] : o2 *= e2[a2];
    return o2 < 32 && r2 > 1024;
  }, $s = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Um(e2, t2) : cs(e2, t2);
  }, xs = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Dm(e2, t2) : ps(e2, t2);
  }, Ss = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Bm(e2, t2) : ms(e2, t2);
  }, Ts = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Mm(e2, t2) : fs(e2, t2);
  }, Cs = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Rm(e2, t2) : hs(e2, t2);
  }, Is = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Nm(e2, t2) : gs(e2, t2);
  }, As = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Vm(e2, t2) : ys(e2, t2);
  }, Es = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Lm(e2, t2) : bs(e2, t2);
  }, ks = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? Wm(e2, t2) : _s(e2, t2);
  }, Ps = (e2, t2) => {
    it(e2.inputs[0].dims, t2.axes, t2.noopWithEmptyAxes) ? zm(e2, t2) : ws(e2, t2);
  };
});
var Os;
var zs;
var Ds;
var go;
var Bs = L(() => {
  "use strict";
  ee();
  Se();
  Zr();
  Os = (e2) => {
    if (!e2 || e2.length === 0 || e2.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");
    if (e2[0].dataType !== 1) throw new Error("Invalid input type.");
  }, zs = (e2, t2) => {
    Os(e2.inputs);
    let n2 = (r2, o2, a2) => {
      let s2 = [];
      for (let u2 = 0; u2 < r2.rank; u2++) (a2.indexOf(u2) >= 0 || a2.length === 0) && s2.push(`input_indices[${u2}] = 0;`);
      return [`${s2.join(`
`)}`, `var value = ${r2.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${r2.getByIndices("input_indices")} ${t2.selectLastIndex > 0 ? "<=" : "<"} value) {
         value = ${r2.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", o2.setByOffset("global_idx", "best_index")];
    };
    e2.compute(Qr("ArgMin", { hint: t2.cacheKey, inputDependencies: ["rank"] }, [e2.inputs[0]], n2, [t2.axis], 7, t2.keepDims), { inputs: [0] });
  }, Ds = (e2, t2) => {
    Os(e2.inputs);
    let n2 = (r2, o2, a2) => {
      let s2 = [];
      for (let u2 = 0; u2 < r2.rank; u2++) (a2.indexOf(u2) >= 0 || a2.length === 0) && s2.push(`input_indices[${u2}] = 0;`);
      return [`${s2.join(`
`)}`, `var value = ${r2.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${r2.getByIndices("input_indices")} ${t2.selectLastIndex > 0 ? ">=" : ">"} value) {
         value = ${r2.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", o2.setByOffset("global_idx", "best_index")];
    };
    e2.compute(Qr("argMax", { hint: t2.cacheKey, inputDependencies: ["rank"] }, [e2.inputs[0]], n2, [t2.axis], 7, t2.keepDims), { inputs: [0] });
  }, go = (e2) => te(e2);
});
var Gm;
var yo;
var Hm;
var Fm;
var qm;
var Ht;
var jm;
var Ms;
var Yr = L(() => {
  "use strict";
  ee();
  ae();
  qr();
  ue();
  Gm = (e2, t2) => {
    let n2 = e2[0], r2 = e2[1], o2 = e2[2], a2 = e2[3], s2 = e2[4], u2 = e2[5];
    if (s2 && u2) throw new Error("Attention cannot have both past and attention_bias");
    if (n2.dims.length !== 3) throw new Error('Input "input" must have 3 dimensions');
    let d2 = n2.dims[0], c2 = n2.dims[1], m = n2.dims[2];
    if (o2.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimensions');
    if (r2.dims.length !== 2) throw new Error('Input "weights" is expected to have 2 dimensions');
    if (r2.dims[0] !== m) throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");
    if (o2.dims[0] !== r2.dims[1]) throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');
    let f = o2.dims[0] / 3, g2 = f, _ = g2;
    if (t2.qkvHiddenSizes.length > 0) {
      if (t2.qkvHiddenSizes.length !== 3) throw new Error("qkv_hidden_sizes attribute should have 3 elements");
      for (let T of t2.qkvHiddenSizes) if (T % t2.numHeads !== 0) throw new Error("qkv_hidden_sizes should be divisible by num_heads");
      f = t2.qkvHiddenSizes[0], g2 = t2.qkvHiddenSizes[1], _ = t2.qkvHiddenSizes[2];
    }
    let b = c2;
    if (f !== g2) throw new Error("qkv_hidden_sizes first element should be same as the second");
    if (o2.dims[0] !== f + g2 + _) throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');
    let w = 0;
    if (s2) {
      if (g2 !== _) throw new Error('Input "past" expect k_hidden_size == v_hidden_size');
      if (s2.dims.length !== 5) throw new Error('Input "past" must have 5 dimensions');
      if (s2.dims[0] !== 2) throw new Error('Input "past" first dimension must be 2');
      if (s2.dims[1] !== d2) throw new Error('Input "past" second dimension must be batch_size');
      if (s2.dims[2] !== t2.numHeads) throw new Error('Input "past" third dimension must be num_heads');
      if (s2.dims[4] !== g2 / t2.numHeads) throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');
      t2.pastPresentShareBuffer || (w = s2.dims[3]);
    }
    let x = b + w, v = -1, $ = 0;
    if (a2) throw new Error("Mask not supported");
    if (s2) throw new Error("past is not supported");
    if (u2) {
      if (u2.dims.length !== 4) throw new Error('Input "attention_bias" must have 4 dimensions');
      if (u2.dims[0] !== d2 || u2.dims[1] !== t2.numHeads || u2.dims[2] !== c2 || u2.dims[3] !== x) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
    }
    return { batchSize: d2, sequenceLength: c2, pastSequenceLength: w, kvSequenceLength: b, totalSequenceLength: x, maxSequenceLength: v, inputHiddenSize: m, hiddenSize: f, vHiddenSize: _, headSize: Math.floor(f / t2.numHeads), vHeadSize: Math.floor(_ / t2.numHeads), numHeads: t2.numHeads, isUnidirectional: false, pastPresentShareBuffer: false, maskFilterValue: t2.maskFilterValue, maskType: $, scale: t2.scale, broadcastResPosBias: false, passPastInKv: false, qkvFormat: 1 };
  }, yo = (e2, t2, n2) => t2 && e2 ? `
      let total_sequence_length_input = u32(${t2.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e2?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       ` : `
    ${n2 ? "let past_sequence_length = uniforms.past_sequence_length" : ""};
    let present_sequence_length = total_sequence_length;
    `, Hm = (e2, t2, n2, r2, o2, a2, s2, u2) => {
    let d2 = he(s2 ? 1 : a2), c2 = 64, m = a2 / d2;
    m < c2 && (c2 = 32);
    let f = Math.ceil(a2 / d2 / c2), g2 = [{ type: 12, data: t2 }, { type: 12, data: n2 }, { type: 12, data: r2 }, { type: 12, data: o2 }, { type: 12, data: m }, { type: 12, data: f }], _ = ve(e2.dataType, d2), b = ke(1, d2), w = ["type"];
    s2 && w.push("type"), u2 && w.push("type");
    let x = (v) => {
      let $ = N("x", e2.dataType, e2.dims, d2), T = [$], C = s2 ? P("seq_lens", s2.dataType, s2.dims) : void 0;
      C && T.push(C);
      let A = u2 ? P("total_sequence_length_input", u2.dataType, u2.dims) : void 0;
      A && T.push(A);
      let I = ke(e2.dataType), z = [{ name: "batch_size", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "past_sequence_length", type: "u32" }, { name: "sequence_length", type: "u32" }, { name: "total_sequence_length", type: "u32" }, { name: "elements_per_thread", type: "u32" }];
      return `
  var<workgroup> thread_max: array<f32, ${c2}>;
  var<workgroup> thread_sum: array<f32, ${c2}>;
  ${v.registerUniforms(z).declareVariables(...T)}
  ${v.mainStart([c2, 1, 1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${yo(C, A, false)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c2}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s2 ? "u32(past_sequence_length + workgroup_id.y + 1)" : "total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(() => {
        switch (d2) {
          case 1:
            return "thread_max_vector";
          case 2:
            return "max(thread_max_vector.x, thread_max_vector.y)";
          case 4:
            return "max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";
          default:
            throw new Error(`Unsupported components: ${d2}`);
        }
      })()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c2}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(() => {
        switch (d2) {
          case 1:
            return "sum_vector";
          case 2:
            return "sum_vector.x + sum_vector.y";
          case 4:
            return "sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";
          default:
            throw new Error(`Unsupported components: ${d2}`);
        }
      })()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c2}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s2 ? `
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${I}(0));
        }` : ""};
  }`;
    };
    return { name: "AttentionProbsSoftmax", shaderCache: { hint: `${c2};${_};${d2}`, inputDependencies: w }, getShaderSource: x, getRunData: () => ({ outputs: [], dispatchGroup: { x: 1, y: o2, z: t2 * n2 }, programUniforms: g2 }) };
  }, Fm = (e2, t2, n2, r2, o2, a2, s2, u2, d2) => {
    let c2 = s2 + a2.kvSequenceLength, m = [a2.batchSize, a2.numHeads, a2.sequenceLength, c2], f = e2 > 1 && r2, g2 = a2.kvNumHeads ? a2.kvNumHeads : a2.numHeads, _ = f ? [a2.batchSize, g2, c2, a2.headSize] : void 0, b = a2.nReps ? a2.nReps : 1, w = a2.scale === 0 ? 1 / Math.sqrt(a2.headSize) : a2.scale, x = he(a2.headSize), v = a2.headSize / x, $ = 12, T = { x: Math.ceil(c2 / $), y: Math.ceil(a2.sequenceLength / $), z: a2.batchSize * a2.numHeads }, C = [{ type: 12, data: a2.sequenceLength }, { type: 12, data: v }, { type: 12, data: c2 }, { type: 12, data: a2.numHeads }, { type: 12, data: a2.headSize }, { type: 1, data: w }, { type: 12, data: s2 }, { type: 12, data: a2.kvSequenceLength }, { type: 12, data: b }], A = f && r2 && E.size(r2.dims) > 0, I = ["type", "type"];
    A && I.push("type"), o2 && I.push("type"), u2 && I.push("type"), d2 && I.push("type");
    let z = [{ dims: m, dataType: t2.dataType, gpuDataType: 0 }];
    f && z.push({ dims: _, dataType: t2.dataType, gpuDataType: 0 });
    let D = (R) => {
      let H = P("q", t2.dataType, t2.dims, x), q = P("key", n2.dataType, n2.dims, x), Y = [H, q];
      if (A) {
        let Z = P("past_key", r2.dataType, r2.dims, x);
        Y.push(Z);
      }
      o2 && Y.push(P("attention_bias", o2.dataType, o2.dims));
      let ne = u2 ? P("seq_lens", u2.dataType, u2.dims) : void 0;
      ne && Y.push(ne);
      let F = d2 ? P("total_sequence_length_input", d2.dataType, d2.dims) : void 0;
      F && Y.push(F);
      let me = N("output", t2.dataType, m), oe = [me];
      f && oe.push(N("present_key", t2.dataType, _, x));
      let j = ke(1, x), ie = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "alpha", type: "f32" }, { name: "past_sequence_length", type: "u32" }, { name: "kv_sequence_length", type: "u32" }, { name: "n_reps", type: "u32" }];
      return `
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${H.type.storage}, ${$ * $}>;
  var<workgroup> tileK: array<${H.type.storage}, ${$ * $}>;
  ${R.registerUniforms(ie).declareVariables(...Y, ...oe)}
  ${R.mainStart([$, $, 1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${yo(ne, F, true)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A && f ? "let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;" : ""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f ? "let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;" : ""}
    var value = ${j}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A && f ? `
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }` : `
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f ? `if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }` : ""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${j}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(() => {
        switch (x) {
          case 1:
            return "value";
          case 2:
            return "value.x + value.y";
          case 4:
            return "value.x + value.y + value.z + value.w";
          default:
            throw new Error(`Unsupported components: ${x}`);
        }
      })()};
        output[outputIdx] = ${me.type.value} (sum * uniforms.alpha) + ${o2 ? "attention_bias[outputIdx]" : "0.0"};
    }
  }`;
    };
    return { name: "AttentionProbs", shaderCache: { hint: `${x};${o2 !== void 0};${r2 !== void 0};${e2}`, inputDependencies: I }, getRunData: () => ({ outputs: z, dispatchGroup: T, programUniforms: C }), getShaderSource: D };
  }, qm = (e2, t2, n2, r2, o2, a2, s2 = void 0, u2 = void 0) => {
    let d2 = a2 + o2.kvSequenceLength, c2 = o2.nReps ? o2.nReps : 1, m = o2.vHiddenSize * c2, f = e2 > 1 && r2, g2 = o2.kvNumHeads ? o2.kvNumHeads : o2.numHeads, _ = f ? [o2.batchSize, g2, d2, o2.headSize] : void 0, b = [o2.batchSize, o2.sequenceLength, m], w = 12, x = { x: Math.ceil(o2.vHeadSize / w), y: Math.ceil(o2.sequenceLength / w), z: o2.batchSize * o2.numHeads }, v = [{ type: 12, data: o2.sequenceLength }, { type: 12, data: d2 }, { type: 12, data: o2.vHeadSize }, { type: 12, data: o2.numHeads }, { type: 12, data: o2.headSize }, { type: 12, data: m }, { type: 12, data: a2 }, { type: 12, data: o2.kvSequenceLength }, { type: 12, data: c2 }], $ = f && r2 && E.size(r2.dims) > 0, T = ["type", "type"];
    $ && T.push("type"), s2 && T.push("type"), u2 && T.push("type");
    let C = [{ dims: b, dataType: t2.dataType, gpuDataType: 0 }];
    f && C.push({ dims: _, dataType: t2.dataType, gpuDataType: 0 });
    let A = (I) => {
      let z = P("probs", t2.dataType, t2.dims), D = P("v", n2.dataType, n2.dims), R = [z, D];
      $ && R.push(P("past_value", r2.dataType, r2.dims));
      let H = s2 ? P("seq_lens", s2.dataType, s2.dims) : void 0;
      s2 && R.push(H);
      let q = u2 ? P("total_sequence_length_input", u2.dataType, u2.dims) : void 0;
      u2 && R.push(q);
      let ne = [N("output", t2.dataType, b)];
      f && ne.push(N("present_value", t2.dataType, _));
      let F = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "v_hidden_size", type: "u32" }, { name: "past_sequence_length", type: "u32" }, { name: "kv_sequence_length", type: "u32" }, { name: "n_reps", type: "u32" }];
      return `
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${z.type.value}, ${w * w}>;
  var<workgroup> tileV: array<${z.type.value}, ${w * w}>;
  ${I.registerUniforms(F).declareVariables(...R, ...ne)}
  ${I.mainStart([w, w, 1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c2 === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c2 === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${yo(H, q, true)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$ && f ? "let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;" : ""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f ? "let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;" : ""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$ && f ? `
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      ` : `
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f ? `
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }` : ""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`;
    };
    return { name: "AttentionScore", shaderCache: { hint: `${r2 !== void 0};${e2}`, inputDependencies: T }, getRunData: () => ({ outputs: C, dispatchGroup: x, programUniforms: v }), getShaderSource: A };
  }, Ht = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2, m = void 0, f = void 0) => {
    let g2 = Math.min(e2.outputCount, 1 + (s2 ? 1 : 0) + (u2 ? 1 : 0)), _ = g2 > 1 ? c2.pastSequenceLength : 0, b = _ + c2.kvSequenceLength, w = d2 && E.size(d2.dims) > 0 ? d2 : void 0, x = [t2, n2];
    g2 > 1 && s2 && E.size(s2.dims) > 0 && x.push(s2), w && x.push(w), m && x.push(m), f && x.push(f);
    let v = e2.compute(Fm(g2, t2, n2, s2, w, c2, _, m, f), { inputs: x, outputs: g2 > 1 ? [-1, 1] : [-1] })[0];
    e2.compute(Hm(v, c2.batchSize, c2.numHeads, _, c2.sequenceLength, b, m, f), { inputs: m && f ? [v, m, f] : [v], outputs: [] });
    let $ = [v, r2];
    g2 > 1 && u2 && E.size(u2.dims) > 0 && $.push(u2), m && $.push(m), f && $.push(f), e2.compute(qm(g2, v, r2, u2, c2, _, m, f), { inputs: $, outputs: g2 > 1 ? [0, 2] : [0] });
  }, jm = (e2, t2) => {
    let n2 = [t2.batchSize, t2.numHeads, t2.sequenceLength, t2.headSize], r2 = t2.sequenceLength, o2 = t2.inputHiddenSize, a2 = t2.headSize, s2 = 12, u2 = { x: Math.ceil(t2.headSize / s2), y: Math.ceil(t2.sequenceLength / s2), z: t2.batchSize * t2.numHeads }, d2 = [e2.inputs[0], e2.inputs[1], e2.inputs[2]], c2 = [{ type: 12, data: r2 }, { type: 12, data: o2 }, { type: 12, data: a2 }, { type: 12, data: t2.numHeads }, { type: 12, data: t2.headSize }, { type: 12, data: t2.hiddenSize }, { type: 12, data: t2.hiddenSize + t2.hiddenSize + t2.vHiddenSize }], m = (f) => {
      let g2 = N("output_q", d2[0].dataType, n2), _ = N("output_k", d2[0].dataType, n2), b = N("output_v", d2[0].dataType, n2), w = P("input", d2[0].dataType, d2[0].dims), x = P("weight", d2[1].dataType, d2[1].dims), v = P("bias", d2[2].dataType, d2[2].dims), $ = w.type.storage, T = [{ name: "M", type: "u32" }, { name: "K", type: "u32" }, { name: "N", type: "u32" }, { name: "num_heads", type: "u32" }, { name: "head_size", type: "u32" }, { name: "hidden_size", type: "u32" }, { name: "ldb", type: "u32" }];
      return `
  const TILE_SIZE = ${s2}u;
  var<workgroup> tileInput: array<${$}, ${s2 * s2}>;
  var<workgroup> tileWeightQ: array<${$}, ${s2 * s2}>;
  var<workgroup> tileWeightK: array<${$}, ${s2 * s2}>;
  var<workgroup> tileWeightV: array<${$}, ${s2 * s2}>;
  ${f.registerUniforms(T).declareVariables(w, x, v, g2, _, b)}
  ${f.mainStart([s2, s2, 1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`;
    };
    return e2.compute({ name: "AttentionPrepare", shaderCache: { inputDependencies: ["type", "type", "type"] }, getRunData: () => ({ outputs: [{ dims: n2, dataType: e2.inputs[0].dataType, gpuDataType: 0 }, { dims: n2, dataType: e2.inputs[0].dataType, gpuDataType: 0 }, { dims: n2, dataType: e2.inputs[0].dataType, gpuDataType: 0 }], dispatchGroup: u2, programUniforms: c2 }), getShaderSource: m }, { inputs: d2, outputs: [-1, -1, -1] });
  }, Ms = (e2, t2) => {
    let n2 = Gm(e2.inputs, t2), [r2, o2, a2] = jm(e2, n2);
    return Ht(e2, r2, o2, a2, e2.inputs[4], void 0, void 0, void 0, e2.inputs[5], n2);
  };
});
var Km;
var Zm;
var Qm;
var Rs;
var Us = L(() => {
  "use strict";
  Ve();
  ee();
  ae();
  Se();
  ue();
  Km = (e2, t2) => {
    if (!e2 || e2.length !== 5) throw new Error("BatchNormalization requires 5 inputs");
    let n2 = (r2, o2, a2) => {
      let s2 = o2.length;
      if (s2 !== r2.length) throw new Error(`${a2}: num dimensions != ${s2}`);
      o2.forEach((u2, d2) => {
        if (u2 !== r2[d2]) throw new Error(`${a2}: dim[${d2}] do not match`);
      });
    };
    if (e2[0].dims.length > 1) {
      let r2 = t2.format === "NHWC" ? t2.spatial ? e2[0].dims.slice(-1) : e2[0].dims.slice(-1).concat(e2[0].dims.slice(1, e2[0].dims.length - 1)) : e2[0].dims.slice(1, t2.spatial ? 2 : void 0);
      n2(e2[1].dims, r2, "Invalid input scale"), n2(e2[2].dims, r2, "Invalid input B"), n2(e2[3].dims, r2, "Invalid input mean"), n2(e2[4].dims, r2, "Invalid input var");
    } else n2(e2[1].dims, [1], "Invalid input scale"), n2(e2[2].dims, [1], "Invalid input B"), n2(e2[3].dims, [1], "Invalid input mean"), n2(e2[4].dims, [1], "Invalid input var");
  }, Zm = (e2, t2) => {
    let { epsilon: n2, spatial: r2, format: o2 } = t2, a2 = e2[0].dims, s2 = r2 ? he(a2[a2.length - 1]) : 1, u2 = o2 === "NHWC" && a2.length > 1 ? s2 : 1, d2 = E.size(a2) / s2, c2 = r2, m = c2 ? a2.length : a2, f = P("x", e2[0].dataType, e2[0].dims, s2), g2 = P("scale", e2[1].dataType, e2[1].dims, u2), _ = P("bias", e2[2].dataType, e2[2].dims, u2), b = P("inputMean", e2[3].dataType, e2[3].dims, u2), w = P("inputVar", e2[4].dataType, e2[4].dims, u2), x = N("y", e2[0].dataType, m, s2), v = () => {
      let T = "";
      if (r2) T = `let cOffset = ${a2.length === 1 ? "0u" : o2 === "NHWC" ? `outputIndices[${a2.length - 1}] / ${s2}` : "outputIndices[1]"};`;
      else if (o2 === "NCHW") T = `
            ${x.indicesSet("outputIndices", "0", "0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;
      else {
        T = `var cIndices = ${g2.type.indices}(0);
                       cIndices[0] = outputIndices[${a2.length - 1}];`;
        for (let C = 1; C < g2.rank; C++) T += `cIndices[${C}] = outputIndices[${C}];`;
        T += `let cOffset = ${g2.indicesToOffset("cIndices")};`;
      }
      return T;
    }, $ = (T) => `
  const epsilon = ${n2};
  ${T.registerUniform("outputSize", "u32").declareVariables(f, g2, _, b, w, x)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s2}`)};
    ${v()}
    let scale = ${g2.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx", "value")}
  }`;
    return { name: "BatchNormalization", shaderCache: { hint: `${t2.epsilon}_${t2.format}_${r2}_${s2}`, inputDependencies: c2 ? ["rank", "type", "type", "type", "type"] : void 0 }, getShaderSource: $, getRunData: () => ({ outputs: [{ dims: e2[0].dims, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(d2 / 64) }, programUniforms: c2 ? [{ type: 12, data: d2 }, ...W(a2)] : [{ type: 12, data: d2 }] }) };
  }, Qm = (e2) => te(e2), Rs = (e2, t2) => {
    let { inputs: n2, outputCount: r2 } = e2, o2 = Qm({ ...t2, outputCount: r2 });
    if (we.webgpu.validateInputContent && Km(n2, o2), t2.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet.");
    e2.compute(Zm(n2, o2));
  };
});
var Ym;
var Xm;
var Ns;
var Vs = L(() => {
  "use strict";
  ae();
  ue();
  Ym = (e2) => {
    if (e2[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
    if (![320, 640, 1280].includes(e2[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280");
    if (e2[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
    if (e2[0].dims[2] !== e2[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
  }, Xm = (e2) => {
    let t2 = e2[0].dims, n2 = e2[0].dims[2], r2 = E.size(t2) / 4, o2 = e2[0].dataType, a2 = P("input", o2, t2, 4), s2 = P("bias", o2, [n2], 4), u2 = P("residual", o2, t2, 4), d2 = N("output", o2, t2, 4);
    return { name: "BiasAdd", getRunData: () => ({ outputs: [{ dims: t2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(r2 / 64) } }), getShaderSource: (m) => `
  const channels = ${n2}u / 4;
  ${m.declareVariables(a2, s2, u2, d2)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(r2)}
    let value = ${a2.getByOffset("global_idx")}
      + ${s2.getByOffset("global_idx % channels")} + ${u2.getByOffset("global_idx")};
    ${d2.setByOffset("global_idx", "value")}
  }` };
  }, Ns = (e2) => {
    Ym(e2.inputs), e2.compute(Xm(e2.inputs));
  };
});
var Jm;
var be;
var Ls;
var Ws;
var Gs;
var Hs;
var Fs;
var qs;
var js;
var Ks;
var Zs;
var ef;
var Qs;
var Ys;
var Xs;
var Js;
var or;
var eu;
var Xr;
var tu;
var ru;
var nu;
var ou;
var iu;
var au;
var su;
var uu;
var lu;
var du;
var cu;
var pu;
var mu;
var fu;
var hu;
var gu;
var yu;
var bu;
var bo;
var _o;
var _u;
var wu;
var vu;
var tf;
var rf;
var $u;
var Jr = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Jm = (e2, t2, n2, r2, o2, a2, s2) => {
    let u2 = Math.ceil(t2 / 4), d2 = "";
    typeof o2 == "string" ? d2 = `${o2}(a)` : d2 = o2("a");
    let c2 = P("inputData", n2, [u2], 4), m = N("outputData", r2, [u2], 4), f = [{ name: "vec_size", type: "u32" }];
    return s2 && f.push(...s2), `
      ${e2.registerUniforms(f).declareVariables(c2, m)}

  ${a2 ?? ""}

  ${e2.mainStart()}
    ${e2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c2.getByOffset("global_idx")};
    ${m.setByOffset("global_idx", d2)}
  }`;
  }, be = (e2, t2, n2, r2, o2, a2 = e2.dataType, s2, u2) => {
    let d2 = [{ type: 12, data: Math.ceil(E.size(e2.dims) / 4) }];
    return s2 && d2.push(...s2), { name: t2, shaderCache: { hint: o2, inputDependencies: ["type"] }, getShaderSource: (c2) => Jm(c2, E.size(e2.dims), e2.dataType, a2, n2, r2, u2), getRunData: (c2) => ({ outputs: [{ dims: e2.dims, dataType: a2 }], dispatchGroup: { x: Math.ceil(E.size(c2[0].dims) / 64 / 4) }, programUniforms: d2 }) };
  }, Ls = (e2) => {
    e2.compute(be(e2.inputs[0], "Abs", "abs"));
  }, Ws = (e2) => {
    e2.compute(be(e2.inputs[0], "Acos", "acos"));
  }, Gs = (e2) => {
    e2.compute(be(e2.inputs[0], "Acosh", "acosh"));
  }, Hs = (e2) => {
    e2.compute(be(e2.inputs[0], "Asin", "asin"));
  }, Fs = (e2) => {
    e2.compute(be(e2.inputs[0], "Asinh", "asinh"));
  }, qs = (e2) => {
    e2.compute(be(e2.inputs[0], "Atan", "atan"));
  }, js = (e2) => {
    e2.compute(be(e2.inputs[0], "Atanh", "atanh"));
  }, Ks = (e2) => te(e2), Zs = (e2, t2) => {
    let n2;
    switch (t2.to) {
      case 10:
        n2 = "vec4<f16>";
        break;
      case 1:
        n2 = "vec4<f32>";
        break;
      case 12:
        n2 = "vec4<u32>";
        break;
      case 6:
        n2 = "vec4<i32>";
        break;
      case 9:
        n2 = "vec4<bool>";
        break;
      default:
        throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t2.to}`);
    }
    e2.compute(be(e2.inputs[0], "Cast", n2, void 0, t2.cacheKey, t2.to));
  }, ef = (e2) => {
    let t2, n2, r2 = e2.length >= 2 && e2[1].data !== 0, o2 = e2.length >= 3 && e2[2].data !== 0;
    switch (e2[0].dataType) {
      case 1:
        t2 = r2 ? e2[1].getFloat32Array()[0] : -34028234663852886e22, n2 = o2 ? e2[2].getFloat32Array()[0] : 34028234663852886e22;
        break;
      case 10:
        t2 = r2 ? e2[1].getUint16Array()[0] : 64511, n2 = o2 ? e2[2].getUint16Array()[0] : 31743;
        break;
      default:
        throw new Error("Unsupport data type");
    }
    return te({ min: t2, max: n2 });
  }, Qs = (e2, t2) => {
    let n2 = t2 || ef(e2.inputs), r2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "Clip", (o2) => `clamp(${o2}, vec4<${r2}>(uniforms.min), vec4<${r2}>(uniforms.max))`, void 0, n2.cacheKey, void 0, [{ type: e2.inputs[0].dataType, data: n2.min }, { type: e2.inputs[0].dataType, data: n2.max }], [{ name: "min", type: r2 }, { name: "max", type: r2 }]), { inputs: [0] });
  }, Ys = (e2) => {
    e2.compute(be(e2.inputs[0], "Ceil", "ceil"));
  }, Xs = (e2) => {
    e2.compute(be(e2.inputs[0], "Cos", "cos"));
  }, Js = (e2) => {
    e2.compute(be(e2.inputs[0], "Cosh", "cosh"));
  }, or = (e2) => te(e2), eu = (e2, t2) => {
    let n2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "Elu", (r2) => `elu_vf32(${r2})`, `
  const elu_alpha_ = ${n2}(${t2.alpha});

  fn elu_f32(a: ${n2}) -> ${n2} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n2}>) -> vec4<${n2}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`, t2.cacheKey));
  }, Xr = (e2 = "f32") => `
const r0: ${e2} = 0.3275911;
const r1: ${e2} = 0.254829592;
const r2: ${e2} = -0.284496736;
const r3: ${e2} = 1.421413741;
const r4: ${e2} = -1.453152027;
const r5: ${e2} = 1.061405429;

fn erf_vf32(v: vec4<${e2}>) -> vec4<${e2}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`, tu = (e2) => {
    let t2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "Erf", (n2) => `erf_vf32(${n2})`, Xr(t2)));
  }, ru = (e2) => {
    e2.compute(be(e2.inputs[0], "Exp", "exp"));
  }, nu = (e2) => {
    e2.compute(be(e2.inputs[0], "Floor", "floor"));
  }, ou = (e2) => {
    let t2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "Gelu", (n2) => `0.5 * ${n2} * (1.0 + erf_vf32(${n2} * 0.7071067811865475))`, Xr(t2)));
  }, iu = (e2, t2) => {
    let n2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "LeakyRelu", (r2) => `select(leaky_relu_alpha_ * ${r2}, ${r2}, ${r2} >= vec4<${n2}>(0.0))`, `const leaky_relu_alpha_ = ${n2}(${t2.alpha});`, t2.cacheKey));
  }, au = (e2) => {
    e2.compute(be(e2.inputs[0], "Not", (t2) => `!${t2}`));
  }, su = (e2) => {
    e2.compute(be(e2.inputs[0], "Neg", (t2) => `-${t2}`));
  }, uu = (e2) => {
    e2.compute(be(e2.inputs[0], "Reciprocal", (t2) => `1.0/${t2}`));
  }, lu = (e2) => {
    let t2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "Relu", (n2) => `select(vec4<${t2}>(0.0), ${n2}, ${n2} > vec4<${t2}>(0.0))`));
  }, du = (e2) => {
    e2.compute(be(e2.inputs[0], "Sigmoid", (t2) => `(1.0 / (1.0 + exp(-${t2})))`));
  }, cu = (e2) => te(e2), pu = (e2, t2) => {
    let n2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "HardSigmoid", (r2) => `max(vec4<${n2}>(0.0), min(vec4<${n2}>(1.0), ${t2.alpha} * ${r2} + vec4<${n2}>(${t2.beta})))`, void 0, t2.cacheKey));
  }, mu = (e2) => {
    e2.compute(be(e2.inputs[0], "Sin", "sin"));
  }, fu = (e2) => {
    e2.compute(be(e2.inputs[0], "Sinh", "sinh"));
  }, hu = (e2) => {
    e2.compute(be(e2.inputs[0], "Sqrt", "sqrt"));
  }, gu = (e2) => {
    e2.compute(be(e2.inputs[0], "Tan", "tan"));
  }, yu = (e2) => `sign(${e2}) * (1 - exp(-2 * abs(${e2}))) / (1 + exp(-2 * abs(${e2})))`, bu = (e2) => {
    e2.compute(be(e2.inputs[0], "Tanh", yu));
  }, bo = (e2 = "f32") => `
const fast_gelu_a: ${e2} = 0.5;
const fast_gelu_b: ${e2} = 0.7978845608028654;
const fast_gelu_c: ${e2} = 0.035677408136300125;

fn tanh_v(v: vec4<${e2}>) -> vec4<${e2}> {
  return ${yu("v")};
}
`, _o = (e2) => `(fast_gelu_a + fast_gelu_a * tanh_v(${e2} * (fast_gelu_c * ${e2} * ${e2} + fast_gelu_b))) * ${e2}`, _u = (e2) => {
    let t2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "FastGelu", _o, bo(t2), void 0, e2.inputs[0].dataType));
  }, wu = (e2, t2) => {
    let n2 = ke(e2.inputs[0].dataType);
    return e2.compute(be(e2.inputs[0], "ThresholdedRelu", (r2) => `select(vec4<${n2}>(0.0), ${r2}, ${r2} > thresholded_relu_alpha_)`, `const thresholded_relu_alpha_ = vec4<${n2}>(${t2.alpha});`, t2.cacheKey)), 0;
  }, vu = (e2) => {
    e2.compute(be(e2.inputs[0], "Log", "log"));
  }, tf = (e2, t2) => `
const alpha = vec4<${e2}>(${t2});
const one = ${e2}(1.0);
const zero = ${e2}(0.0);

fn quick_gelu_impl(x: vec4<${e2}>) -> vec4<${e2}> {
  let v = x *alpha;
  var x1 : vec4<${e2}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`, rf = (e2) => `quick_gelu_impl(${e2})`, $u = (e2, t2) => {
    let n2 = ke(e2.inputs[0].dataType);
    e2.compute(be(e2.inputs[0], "QuickGelu", rf, tf(n2, t2.alpha), t2.cacheKey, e2.inputs[0].dataType));
  };
});
var nf;
var of;
var Su;
var Tu = L(() => {
  "use strict";
  ae();
  ue();
  Jr();
  nf = (e2) => {
    if (e2[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
    if (![2560, 5120, 10240].includes(e2[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240");
    if (e2[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
    if (e2[0].dims[2] !== e2[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
  }, of = (e2) => {
    let t2 = e2[0].dims.slice();
    t2[2] = t2[2] / 2;
    let n2 = P("input", e2[0].dataType, e2[0].dims, 4), r2 = P("bias", e2[0].dataType, [e2[0].dims[2]], 4), o2 = N("output", e2[0].dataType, t2, 4), a2 = E.size(t2) / 4, s2 = ve(e2[0].dataType);
    return { name: "BiasSplitGelu", getRunData: () => ({ outputs: [{ dims: t2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(a2 / 64) } }), getShaderSource: (d2) => `
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e2[0].dims[2] / 4 / 2}u;

  ${d2.declareVariables(n2, r2, o2)}

  ${Xr(s2)}

  ${d2.mainStart()}
    ${d2.guardAgainstOutOfBoundsWorkgroupSizes(a2)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o2.setByOffset("global_idx", "valueLeft * geluRight")}
  }` };
  }, Su = (e2) => {
    nf(e2.inputs), e2.compute(of(e2.inputs));
  };
});
var af;
var sf;
var at;
var Cu;
var Iu;
var Au;
var Eu;
var ku;
var Pu;
var Ou;
var zu;
var Du;
var Bu;
var Mu = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  af = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2, m, f) => {
    let g2, _;
    typeof u2 == "string" ? g2 = _ = ($, T) => `${u2}((${$}),(${T}))` : typeof u2 == "function" ? g2 = _ = u2 : (g2 = u2.scalar, _ = u2.vector);
    let b = N("outputData", m, r2.length, 4), w = P("aData", d2, t2.length, 4), x = P("bData", c2, n2.length, 4), v;
    if (o2) if (a2) {
      let $ = E.size(t2) === 1, T = E.size(n2) === 1, C = t2.length > 0 && t2[t2.length - 1] % 4 === 0, A = n2.length > 0 && n2[n2.length - 1] % 4 === 0;
      $ || T ? v = b.setByOffset("global_idx", _($ ? `${w.type.value}(${w.getByOffset("0")}.x)` : w.getByOffset("global_idx"), T ? `${x.type.value}(${x.getByOffset("0")}.x)` : x.getByOffset("global_idx"))) : v = `
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices", b)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices", b)};
            ${b.setByOffset("global_idx", _(s2 || C ? w.getByOffset("offsetA / 4u") : `${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`, s2 || A ? x.getByOffset("offsetB / 4u") : `${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `;
    } else v = b.setByOffset("global_idx", _(w.getByOffset("global_idx"), x.getByOffset("global_idx")));
    else {
      if (!a2) throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");
      let $ = (T, C, A = "") => {
        let I = `aData[indexA${C}][componentA${C}]`, z = `bData[indexB${C}][componentB${C}]`;
        return `
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`, b)};
            let offsetB${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`, b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${T}[${C}] = ${A}(${g2(I, z)});
          `;
      };
      m === 9 ? v = `
            var data = vec4<u32>(0);
            ${$("data", 0, "u32")}
            ${$("data", 1, "u32")}
            ${$("data", 2, "u32")}
            ${$("data", 3, "u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : v = `
            ${$("outputData[global_idx]", 0)}
            ${$("outputData[global_idx]", 1)}
            ${$("outputData[global_idx]", 2)}
            ${$("outputData[global_idx]", 3)}
          `;
    }
    return `
        ${e2.registerUniform("vec_size", "u32").declareVariables(w, x, b)}

        ${f ?? ""}

        ${e2.mainStart()}
        ${e2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`;
  }, sf = (e2, t2, n2, r2, o2, a2, s2 = n2.dataType) => {
    let u2 = n2.dims.map((w) => Number(w) ?? 1), d2 = r2.dims.map((w) => Number(w) ?? 1), c2 = !E.areEqual(u2, d2), m = u2, f = E.size(u2), g2 = false, _ = false, b = [c2];
    if (c2) {
      let w = tt.calcShape(u2, d2, false);
      if (!w) throw new Error("Can't perform binary op on the given tensors");
      m = w.slice(), f = E.size(m);
      let x = E.size(u2) === 1, v = E.size(d2) === 1, $ = u2.length > 0 && u2[u2.length - 1] % 4 === 0, T = d2.length > 0 && d2[d2.length - 1] % 4 === 0;
      b.push(x), b.push(v), b.push($), b.push(T);
      let C = 1;
      for (let A = 1; A < m.length; A++) {
        let I = u2[u2.length - A], z = d2[d2.length - A];
        if (I === z) C *= I;
        else break;
      }
      C % 4 === 0 ? (_ = true, g2 = true) : (x || v || $ || T) && (g2 = true);
    } else g2 = true;
    return b.push(g2), { name: e2, shaderCache: { hint: t2 + b.map((w) => w.toString()).join("_"), inputDependencies: ["rank", "rank"] }, getShaderSource: (w) => af(w, u2, d2, m, g2, c2, _, o2, n2.dataType, r2.dataType, s2, a2), getRunData: () => ({ outputs: [{ dims: m, dataType: s2 }], dispatchGroup: { x: Math.ceil(f / 64 / 4) }, programUniforms: [{ type: 12, data: Math.ceil(E.size(m) / 4) }, ...W(u2, d2, m)] }) };
  }, at = (e2, t2, n2, r2, o2, a2) => {
    e2.compute(sf(t2, o2 ?? "", e2.inputs[0], e2.inputs[1], n2, r2, a2));
  }, Cu = (e2) => {
    at(e2, "Add", (t2, n2) => `${t2}+${n2}`);
  }, Iu = (e2) => {
    at(e2, "Div", (t2, n2) => `${t2}/${n2}`);
  }, Au = (e2) => {
    at(e2, "Equal", { scalar: (t2, n2) => `u32(${t2}==${n2})`, vector: (t2, n2) => `vec4<u32>(${t2}==${n2})` }, void 0, void 0, 9);
  }, Eu = (e2) => {
    at(e2, "Mul", (t2, n2) => `${t2}*${n2}`);
  }, ku = (e2) => {
    let t2 = P("input", e2.inputs[0].dataType, e2.inputs[0].dims).type.value;
    at(e2, "Pow", { scalar: (r2, o2) => `pow_custom(${r2},${o2})`, vector: (r2, o2) => `pow_vector_custom(${r2},${o2})` }, `
    fn pow_custom(a : ${t2}, b : ${t2}) -> ${t2} {
      if (b == ${t2}(0.0)) {
        return ${t2}(1.0);
      } else if (a < ${t2}(0.0) && f32(b) != floor(f32(b))) {
        return ${t2}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t2}(1.0), round(f32(abs(b) % ${t2}(2.0))) != 1.0) * ${t2}(${t2 === "i32" ? "round" : ""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t2}>, b : vec4<${t2}>) -> vec4<${t2}> {
      // TODO: implement vectorized pow
      return vec4<${t2}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `);
  }, Pu = (e2) => {
    at(e2, "Sub", (t2, n2) => `${t2}-${n2}`);
  }, Ou = (e2) => {
    at(e2, "Greater", { scalar: (t2, n2) => `u32(${t2}>${n2})`, vector: (t2, n2) => `vec4<u32>(${t2}>${n2})` }, void 0, void 0, 9);
  }, zu = (e2) => {
    at(e2, "Less", { scalar: (t2, n2) => `u32(${t2}<${n2})`, vector: (t2, n2) => `vec4<u32>(${t2}<${n2})` }, void 0, void 0, 9);
  }, Du = (e2) => {
    at(e2, "GreaterOrEqual", { scalar: (t2, n2) => `u32(${t2}>=${n2})`, vector: (t2, n2) => `vec4<u32>(${t2}>=${n2})` }, void 0, void 0, 9);
  }, Bu = (e2) => {
    at(e2, "LessOrEqual", { scalar: (t2, n2) => `u32(${t2}<=${n2})`, vector: (t2, n2) => `vec4<u32>(${t2}<=${n2})` }, void 0, void 0, 9);
  };
});
var lf;
var df;
var cf;
var pf;
var Ru;
var Uu;
var Nu = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  lf = (e2, t2) => {
    if (!e2 || e2.length < 1) throw new Error("too few inputs");
    let n2 = 0, r2 = e2[n2], o2 = r2.dataType, a2 = r2.dims.length;
    e2.forEach((s2, u2) => {
      if (u2 !== n2) {
        if (s2.dataType !== o2) throw new Error("input tensors should be one type");
        if (s2.dims.length !== a2) throw new Error("input tensors should have the same shape");
        s2.dims.forEach((d2, c2) => {
          if (c2 !== t2 && d2 !== r2.dims[c2]) throw new Error("non concat dimensions must match");
        });
      }
    });
  }, df = (e2, t2) => `
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e2}u>(${t2});
    for (var i: u32 = 0u; i < ${e2}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e2}u;
  }`, cf = (e2, t2) => {
    let n2 = e2.length, r2 = [];
    for (let o2 = 0; o2 < n2; ++o2) {
      let a2 = t2.setByOffset("global_idx", e2[o2].getByIndices("indices"));
      n2 === 1 ? r2.push(a2) : o2 === 0 ? r2.push(`if (inputIndex == ${o2}u) { ${a2} }`) : o2 === n2 - 1 ? r2.push(`else { ${a2} }`) : r2.push(`else if (inputIndex == ${o2}) { ${a2} }`);
    }
    return r2.join(`
`);
  }, pf = (e2, t2, n2, r2) => {
    let o2 = E.size(n2), a2 = new Array(e2.length), s2 = new Array(e2.length), u2 = 0, d2 = [], c2 = [], m = [{ type: 12, data: o2 }];
    for (let w = 0; w < e2.length; ++w) u2 += e2[w].dims[t2], a2[w] = u2, c2.push(e2[w].dims.length), s2[w] = P(`input${w}`, r2, c2[w]), d2.push("rank"), m.push({ type: 12, data: a2[w] });
    for (let w = 0; w < e2.length; ++w) m.push(...W(e2[w].dims));
    m.push(...W(n2));
    let f = N("output", r2, n2.length), g2 = f.indicesGet("indices", t2), _ = Array.from(Array(a2.length).keys()).map((w) => `uniforms.sizeInConcatAxis${w}`).join(","), b = (w) => `

  ${(() => {
      w.registerUniform("outputSize", "u32");
      for (let x = 0; x < e2.length; x++) w.registerUniform(`sizeInConcatAxis${x}`, "u32");
      return w.declareVariables(...s2, f);
    })()}

  ${df(a2.length, _)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g2});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a2.length}u>(${_});
      ${g2} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${cf(s2, f)}
  }`;
    return { name: "Concat", shaderCache: { hint: `${t2}`, inputDependencies: d2 }, getRunData: () => ({ outputs: [{ dims: n2, dataType: r2 }], dispatchGroup: { x: Math.ceil(o2 / 64) }, programUniforms: m }), getShaderSource: b };
  }, Ru = (e2, t2) => {
    let n2 = e2.inputs, r2 = n2[0].dims, o2 = E.normalizeAxis(t2.axis, r2.length);
    lf(n2, o2);
    let a2 = r2.slice();
    a2[o2] = n2.reduce((u2, d2) => u2 + (d2.dims.length > o2 ? d2.dims[o2] : 0), 0);
    let s2 = n2.filter((u2) => E.size(u2.dims) > 0);
    e2.compute(pf(s2, o2, a2, n2[0].dataType), { inputs: s2 });
  }, Uu = (e2) => te({ axis: e2.axis });
});
var Ke;
var Ze;
var Qe;
var en;
var Tt = L(() => {
  "use strict";
  ee();
  ae();
  Ke = (e2, t2, n2 = "f32") => {
    switch (e2.activation) {
      case "Relu":
        return `value = max(value, ${t2}(0.0));`;
      case "Sigmoid":
        return `value = (${t2}(1.0) / (${t2}(1.0) + exp(-value)));`;
      case "Clip":
        return `value = clamp(value, ${t2}(${n2}(uniforms.clip_min)), ${t2}(${n2}(uniforms.clip_max)));`;
      case "HardSigmoid":
        return `value = max(${t2}(0.0), min(${t2}(1.0), ${n2}(uniforms.alpha) * value + ${n2}(uniforms.beta)));`;
      case "LeakyRelu":
        return `value = select(${n2}(uniforms.alpha) * value, value, value >= ${t2}(0.0));`;
      case "Tanh":
        return `let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;
      case "":
        return "";
      default:
        throw new Error(`Unsupported activation ${e2.activation}`);
    }
  }, Ze = (e2, t2) => {
    e2.activation === "Clip" ? t2.push({ type: 1, data: e2.clipMax }, { type: 1, data: e2.clipMin }) : e2.activation === "HardSigmoid" ? t2.push({ type: 1, data: e2.alpha }, { type: 1, data: e2.beta }) : e2.activation === "LeakyRelu" && t2.push({ type: 1, data: e2.alpha });
  }, Qe = (e2, t2) => {
    e2.activation === "Clip" ? t2.push({ name: "clip_max", type: "f32" }, { name: "clip_min", type: "f32" }) : e2.activation === "HardSigmoid" ? t2.push({ name: "alpha", type: "f32" }, { name: "beta", type: "f32" }) : e2.activation === "LeakyRelu" && t2.push({ name: "alpha", type: "f32" });
  }, en = (e2) => {
    let t2 = e2?.activation || "";
    if (t2 === "HardSigmoid") {
      let [n2, r2] = e2?.activation_params || [0.2, 0.5];
      return { activation: t2, alpha: n2, beta: r2 };
    } else if (t2 === "Clip") {
      let [n2, r2] = e2?.activation_params || [qa, ja];
      return { activation: t2, clipMax: r2, clipMin: n2 };
    } else if (t2 === "LeakyRelu") {
      let [n2] = e2?.activation_params || [0.01];
      return { activation: t2, alpha: n2 };
    }
    return { activation: t2 };
  };
});
var Ae;
var Vu;
var tn = L(() => {
  "use strict";
  Ae = (e2, t2) => {
    switch (e2) {
      case 1:
        return t2;
      case 2:
        return `vec2<${t2}>`;
      case 3:
        return `vec3<${t2}>`;
      case 4:
        return `vec4<${t2}>`;
      default:
        throw new Error(`${e2}-component is not supported.`);
    }
  }, Vu = (e2) => `
      ${e2 ? "value = value + getBiasByOutputCoords(coords);" : ""}
      `;
});
var Lu;
var Wu = L(() => {
  "use strict";
  Lu = (e2) => `
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e2}.x), i32(${e2}.y), i32(${e2}.z), 1));
}
`;
});
var ir;
var rn;
var nn = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Tt();
  ir = (e2, t2, n2, r2, o2) => {
    let a2 = r2 - n2;
    return `
      ${Array.from({ length: n2 }).map((s2, u2) => `
      if (${K(t2.shape, u2, t2.rank)} != 1) {
        ${t2.indicesSet(e2, u2, K(o2, u2 + a2, r2))}
      } else {
        ${t2.indicesSet(e2, u2, 0)}
      }`).join("")}
`;
  }, rn = (e2, t2, n2, r2, o2 = false, a2) => {
    let s2 = e2[0].dims, u2 = e2[1].dims, d2 = s2[s2.length - 2], c2 = u2[u2.length - 1], m = s2[s2.length - 1], f = he(c2), g2 = he(m), _ = he(d2), b = E.size(n2) / f / _, w = e2.length > 2, x = r2 ? r2.slice(0, -2) : n2.slice(0, -2), $ = [E.size(x), d2, c2], T = [{ type: 12, data: b }, { type: 12, data: d2 }, { type: 12, data: c2 }, { type: 12, data: m }];
    Ze(t2, T), T.push(...W(x, s2, u2)), w && T.push(...W(e2[2].dims)), T.push(...W($));
    let C = (A) => {
      let I = Kr("batch_dims", e2[0].dataType, x.length), z = P("a", e2[0].dataType, s2.length, g2), D = P("b", e2[1].dataType, u2.length, f), R = N("output", e2[0].dataType, $.length, f), H = ve(R.type.tensor), q = Ke(t2, R.type.value, H), Y = [z, D], ne = "";
      if (w) {
        let oe = o2 ? f : 1;
        Y.push(P("bias", e2[2].dataType, e2[2].dims.length, oe)), ne = `${o2 ? `value += bias[col / ${oe}];` : `value += ${R.type.value}(bias[row + i]);`}`;
      }
      let F = [{ name: "output_size", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }];
      Qe(t2, F);
      let me = () => {
        let oe = `var a_data: ${z.type.value};`;
        for (let j = 0; j < g2; j++) oe += `
              let b_data${j} = b[(b_offset + (k + ${j}) * uniforms.N + col) / ${f}];`;
        for (let j = 0; j < _; j++) {
          oe += `a_data = a[(a_offset + (row + ${j}) * uniforms.K + k) / ${g2}];`;
          for (let ie = 0; ie < g2; ie++) oe += `
            values[${j}] = fma(${D.type.value}(a_data${g2 === 1 ? "" : `[${ie}]`}), b_data${ie}, values[${j}]);
`;
        }
        return oe;
      };
      return `
  ${A.registerUniforms(F).registerInternalVariables(I).declareVariables(...Y, R)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${n2.length === 2 ? "" : `let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${ir("a_indices", z, z.rank - 2, I.rank, "batch_indices")}
    ${z.indicesSet("a_indices", z.rank - 2, 0)}
    ${z.indicesSet("a_indices", z.rank - 1, 0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${D.type.indices};
    ${ir("b_indices", D, D.rank - 2, I.rank, "batch_indices")}
    ${D.indicesSet("b_indices", D.rank - 2, 0)}
    ${D.indicesSet("b_indices", D.rank - 1, 0)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g2}) {
      ${me()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ne}
      ${q}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${f}`, "value")};
    }
  }
  `;
    };
    return { name: "MatMulNaive", shaderCache: { hint: `${t2.activation};${f};${g2};${_};${o2}`, inputDependencies: w ? ["rank", "rank", "rank"] : ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: a2 ? a2(n2) : n2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(b / 64) }, programUniforms: T }), getShaderSource: C };
  };
});
var mf;
var ff;
var wo;
var Gu;
var hf;
var vo;
var gf;
var ar;
var on = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Tt();
  nn();
  tn();
  mf = (e2, t2) => e2 ? `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t2 ? ", batchIndices" : ""});
        ` : `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t2 ? ", batchIndices" : ""});
        `, ff = (e2, t2) => e2 ? `
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t2 === 3 ? "" : "let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t2 === 3 ? "" : "acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }` : `
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t2 === 3 ? "" : "acc[i] = BCached3 * ACached.w + acc[i];"}
        }`, wo = (e2, t2, n2 = "f32", r2, o2 = false, a2 = 32, s2 = false, u2 = 32) => {
    let d2 = t2[1] * e2[1], c2 = t2[0] * e2[0], m = o2 ? d2 : a2, f = o2 ? a2 : d2, g2 = m / t2[0], _ = a2 / t2[1];
    if (!((o2 && g2 === 4 && e2[1] === 4 || !o2 && (g2 === 3 || g2 === 4)) && m % t2[0] === 0 && a2 % t2[1] === 0 && e2[0] === 4)) throw new Error(`If transposeA ${o2} is true, innerElementSize ${g2} and workPerThread[1] ${e2[1]} must be 4.
      Otherwise, innerElementSize ${g2} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t2[0]}. tileInner ${a2} must be divisible by workgroupSize[1] ${t2[1]}. colPerThread ${e2[0]} must be 4.`);
    return `
var<workgroup> mm_Asub: array<array<vec${g2}<${n2}>, ${m / g2}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n2}>, ${c2 / e2[0]}>, ${a2}>;

const rowPerThread = ${e2[1]};
const colPerThread = ${e2[0]};
const innerElementSize = ${g2};
const tileInner = ${a2};

@compute @workgroup_size(${t2[0]}, ${t2[1]}, ${t2[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s2 ? "0" : "i32(globalId.z)"};
  ${r2 ? `let batchIndices = ${r2.offsetToIndices("u32(batch)")};` : ""}
  let globalRowStart = i32(workgroupId.y) * ${d2};

  let num_tiles = ${s2 ? `${Math.ceil(u2 / a2)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s2 ? `i32(globalId.z) * ${u2}` : "0"};

  var acc: array<vec4<${n2}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${mf(o2, r2)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r2 ? ", batchIndices" : ""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g2 === 3 ? "" : "let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ff(o2, g2)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`;
  }, Gu = (e2, t2) => e2 ? `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t2 ? ", batchIndices" : ""});
            ` : `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t2 ? ", batchIndices" : ""});
            `, hf = (e2) => e2 ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", vo = (e2, t2, n2 = "f32", r2, o2 = false, a2 = 32, s2 = false, u2 = 32, d2 = false) => {
    let c2 = e2[1] * t2[1], m = e2[0] * t2[0], f = o2 ? c2 : a2, g2 = o2 ? a2 : c2;
    if (!(g2 % t2[1] === 0 && f % t2[0] === 0 && a2 % t2[1] === 0)) throw new Error(`tileAHight ${g2} must be divisible by workgroupSize[1]${t2[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t2[0]}, tileInner ${a2} must be divisible by workgroupSize[1]${t2[1]}`);
    let _ = g2 / t2[1], b = f / t2[0], w = a2 / t2[1], x = d2 ? `
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c2};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g2}; inputRow = inputRow + ${t2[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t2[0]}) {
          ${Gu(o2, r2)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a2}; inputRow = inputRow + ${t2[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t2[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r2 ? ", batchIndices" : ""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n2}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t2[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o2 ? `mm_Asub[k][localRow + innerRow * ${t2[1]}];` : `mm_Asub[localRow + innerRow * ${t2[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t2[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t2[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    ` : `
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${c2};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Gu(o2, r2)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r2 ? ", batchIndices" : ""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n2}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${hf(o2)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;
    return `
  var<workgroup> mm_Asub : array<array<${n2}, ${f}>, ${g2}>;
  var<workgroup> mm_Bsub : array<array<${n2}, ${m}>, ${a2}>;
  const rowPerThread = ${e2[1]};
  const colPerThread = ${e2[0]};
  const tileInner = ${a2};

@compute @workgroup_size(${t2[0]}, ${t2[1]}, ${t2[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s2 ? "0" : "i32(globalId.z)"};
    ${r2 ? `let batchIndices = ${r2.offsetToIndices("u32(batch)")};` : ""}
    let num_tiles = ${s2 ? `${Math.ceil(u2 / a2)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s2 ? `i32(globalId.z) * ${u2}` : "0"};

    var acc : array<array<${n2}, colPerThread>, rowPerThread>;
    ${x}
  }
`;
  }, gf = (e2, t2, n2, r2, o2 = false) => {
    let [a2, s2, u2, d2] = r2, c2 = ve(r2[0].type.tensor);
    return `
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a2.type.indices}) -> ${Ae(e2, c2)} {
      var value = ${Ae(e2, c2)}(0.0);
      let col = colIn * ${e2};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s2.type.indices};
        ${ir("aIndices", s2, s2.rank - 2, a2.rank, "batchIndices")}
        ${s2.indicesSet("aIndices", s2.rank - 2, "u32(row)")}
        ${s2.indicesSet("aIndices", s2.rank - 1, "u32(colIn)")}
        value = ${s2.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a2.type.indices}) -> ${Ae(e2, c2)} {
      var value = ${Ae(e2, c2)}(0.0);
      let col = colIn * ${e2};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u2.type.indices};
        ${ir("bIndices", u2, u2.rank - 2, a2.rank, "batchIndices")}
        ${u2.indicesSet("bIndices", u2.rank - 2, "u32(row)")}
        ${u2.indicesSet("bIndices", u2.rank - 1, "u32(colIn)")}
        value = ${u2.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ae(e2, c2)}) {
      let col = colIn * ${e2};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t2 ? `value = value + ${o2 ? "bias[colIn]" : `${Ae(e2, c2)}(bias[row])`};` : ""}
        ${n2}
        ${d2.setByIndices("vec3<u32>(coords)", "value")}
      }
    }
    `;
  }, ar = (e2, t2, n2, r2, o2 = false, a2) => {
    let s2 = e2[0].dims, u2 = e2[1].dims, d2 = s2.slice(0, -2), c2 = u2.slice(0, -2), m = r2 ? r2.slice(0, -2) : n2.slice(0, -2), f = E.size(m), g2 = s2[s2.length - 2], _ = s2[s2.length - 1], b = u2[u2.length - 1], w = _ % 4 === 0 && b % 4 === 0, x = g2 <= 8 ? [4, 1, 1] : [4, 4, 1], v = [8, 8, 1], $ = [Math.ceil(b / v[0] / x[0]), Math.ceil(g2 / v[1] / x[1]), Math.ceil(f / v[2] / x[2])], T = w ? 4 : 1, C = [...d2, g2, _ / T], A = C.length, I = [...c2, _, b / T], z = I.length, D = [f, g2, b / T], R = [{ type: 6, data: g2 }, { type: 6, data: b }, { type: 6, data: _ }];
    Ze(t2, R), R.push(...W(m, C, I));
    let H = ["rank", "rank"], q = e2.length > 2;
    q && (R.push(...W(e2[2].dims)), H.push("rank")), R.push(...W(D));
    let Y = (ne) => {
      let F = m.length, me = Kr("batchDims", e2[0].dataType, F, 1), oe = ve(e2[0].dataType), j = P("a", e2[0].dataType, A, T), ie = P("b", e2[1].dataType, z, T), Z = N("result", e2[0].dataType, D.length, T), ce = [j, ie];
      if (q) {
        let O = o2 ? T : 1;
        ce.push(P("bias", e2[2].dataType, e2[2].dims.length, O));
      }
      let Te = [{ name: "dim_a_outer", type: "i32" }, { name: "dim_b_outer", type: "i32" }, { name: "dim_inner", type: "i32" }];
      Qe(t2, Te);
      let pe = ve(Z.type.tensor), J = Ke(t2, Z.type.value, pe), V = gf(T, q, J, [me, j, ie, Z], o2);
      return `
  ${ne.registerUniforms(Te).registerInternalVariables(me).declareVariables(...ce, Z)}
  ${V}
  ${w ? wo(x, v, oe, me) : vo(x, v, oe, me)}
                   `;
    };
    return { name: "MatMul", shaderCache: { hint: `${x};${t2.activation};${w};${o2}`, inputDependencies: H }, getRunData: () => ({ outputs: [{ dims: a2 ? a2(n2) : n2, dataType: e2[0].dataType }], dispatchGroup: { x: $[0], y: $[1], z: $[2] }, programUniforms: R }), getShaderSource: Y };
  };
});
var yf;
var Hu;
var Fu = L(() => {
  "use strict";
  ee();
  et();
  ue();
  Tt();
  tn();
  Wu();
  on();
  yf = (e2, t2, n2, r2, o2 = false, a2, s2 = 4, u2 = 4, d2 = 4, c2 = "f32") => {
    let m = (H) => {
      switch (H) {
        case 1:
          return "resData = x[xIndex];";
        case 3:
          return `resData = vec3<${c2}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;
        case 4:
          return "resData = x[xIndex / 4];";
        default:
          throw new Error(`innerElementSize ${H} is not supported.`);
      }
    }, f = (H) => {
      switch (H) {
        case 1:
          return "return w[row * i32(uniforms.w_shape[3]) + colIn];";
        case 4:
          return "return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";
        default:
          throw new Error(`innerElementSize ${H} is not supported.`);
      }
    }, g2 = e2 ? `
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    ` : `
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `, _ = e2 ? `
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    ` : `
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `, b = e2 ? "i32(uniforms.x_shape[1])" : "i32(uniforms.x_shape[2])", w = e2 ? "i32(uniforms.x_shape[2])" : "i32(uniforms.x_shape[3])", x = e2 ? "row" : "col", v = e2 ? "col" : "row", $ = `
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e2 ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ae(s2, c2)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${w}) {
      ${g2}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(s2)}
    }
    return resData;`, T = e2 ? t2 && r2 ? `
    let col = colIn * ${s2};
    ${$}` : `
    let col = colIn * ${s2};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Ae(s2, c2)}(0.0);` : r2 && n2 ? `
    let col = colIn * ${s2};
    ${$}` : `
    let col = colIn * ${s2};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Ae(s2, c2)}(0.0);`, C = e2 ? r2 && n2 ? f(u2) : `
    let col = colIn * ${u2};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u2)}
    }
    return ${Ae(u2, c2)}(0.0);` : `
    let col = colIn * ${u2};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u2)}
    }
    return ${Ae(u2, c2)}(0.0);`, A = Ae(d2, c2), I = e2 ? Ae(s2, c2) : Ae(u2, c2), z = e2 ? Ae(u2, c2) : Ae(s2, c2), D = Ke(a2, A, c2);
    return `
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e2 ? T : C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e2 ? C : T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${d2};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e2 ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
      ${_}
      ${Vu(o2)}
      ${D}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`;
  }, Hu = (e2, t2, n2, r2, o2, a2, s2, u2, d2) => {
    let c2 = t2.format === "NHWC", m = c2 ? e2[0].dims[3] : e2[0].dims[1], f = n2[0], g2 = c2 ? n2[2] : n2[3], _ = c2 ? n2[1] : n2[2], b = c2 ? n2[3] : n2[1], w = c2 && (m % 4 === 0 || m % 3 === 0) && b % 4 === 0, x = c2 ? b : g2 * _, v = c2 ? g2 * _ : b, $ = [8, 8, 1], T = r2 <= 8 ? [4, 1, 1] : [4, 4, 1], C = [Math.ceil(x / $[0] / T[0]), Math.ceil(v / $[1] / T[1]), Math.ceil(f / $[2] / T[2])];
    le("verbose", () => `[conv2d_mm_webgpu] dispatch = ${C}`);
    let A = w ? c2 && m % 4 !== 0 ? 3 : 4 : 1, I = $[1] * T[1], z = $[0] * T[0], D = Math.max($[0] * A, $[1]), R = r2 % I === 0, H = o2 % z === 0, q = a2 % D === 0, Y = w ? [A, 4, 4] : [1, 1, 1], ne = [{ type: 6, data: r2 }, { type: 6, data: o2 }, { type: 6, data: a2 }, { type: 6, data: [t2.pads[0], t2.pads[1]] }, { type: 6, data: t2.strides }, { type: 6, data: t2.dilations }];
    Ze(t2, ne), ne.push(...W(e2[0].dims, e2[1].dims));
    let F = ["rank", "rank"];
    s2 && (ne.push(...W(e2[2].dims)), F.push("rank")), ne.push(...W(n2));
    let me = (oe) => {
      let j = [{ name: "dim_a_outer", type: "i32" }, { name: "dim_b_outer", type: "i32" }, { name: "dim_inner", type: "i32" }, { name: "pad", type: "i32", length: 2 }, { name: "stride", type: "i32", length: 2 }, { name: "dilation", type: "i32", length: 2 }];
      Qe(t2, j);
      let ie = w ? 4 : 1, Z = ve(e2[0].dataType), ce = `
      fn setOutputAtIndex(flatIndex : i32, value : ${w ? `vec4<${Z}>` : Z}) {
        result[flatIndex] = ${w ? `vec4<${Z}>` : Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w ? `vec4<${Z}>` : Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w ? "/ 4" : ""}, value);
      }`, Te = P("x", e2[0].dataType, e2[0].dims.length, A === 3 ? 1 : A), pe = P("w", e2[1].dataType, e2[1].dims.length, ie), J = [Te, pe], V = N("result", e2[0].dataType, n2.length, ie);
      if (s2) {
        let O = P("bias", e2[2].dataType, e2[2].dims.length, ie);
        J.push(O), ce += `
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w ? `vec4<${Z}>` : Z} {
          return bias[coords.${c2 ? "w" : "y"}${w ? "/ 4" : ""}];
        }`;
      }
      return `
        ${Lu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${oe.registerUniforms(j).declareVariables(...J, V)}
        ${ce}
        ${yf(c2, R, H, q, s2, t2, Y[0], Y[1], Y[2], Z)}
        ${w ? wo(T, $, Z, void 0, !c2, D) : vo(T, $, Z, void 0, !c2, D, false, void 0, u2)}`;
    };
    return { name: "Conv2DMatMul", shaderCache: { hint: `${t2.cacheKey};${A};${w};${R};${H};${q};${I};${z};${D}`, inputDependencies: F }, getRunData: () => ({ outputs: [{ dims: d2 ? d2(n2) : n2, dataType: e2[0].dataType }], dispatchGroup: { x: C[0], y: C[1], z: C[2] }, programUniforms: ne }), getShaderSource: me };
  };
});
var bf;
var qu;
var an;
var _f;
var ju;
var wf;
var Ku;
var Zu;
var Qu = L(() => {
  "use strict";
  ee();
  et();
  ae();
  ue();
  Tt();
  tn();
  bf = (e2) => {
    let t2 = 1;
    for (let n2 = 0; n2 < e2.length; n2++) t2 *= e2[n2];
    return t2;
  }, qu = (e2) => typeof e2 == "number" ? [e2, e2, e2] : e2, an = (e2, t2) => t2 <= 1 ? e2 : e2 + (e2 - 1) * (t2 - 1), _f = (e2, t2, n2, r2 = 1) => {
    let o2 = an(t2, r2);
    return Math.floor((e2[0] * (n2 - 1) - n2 + o2) / 2);
  }, ju = (e2, t2, n2, r2, o2) => {
    o2 == null && (o2 = _f(e2, t2[0], r2[0]));
    let a2 = [0, 0, 0, n2];
    for (let s2 = 0; s2 < 3; s2++) e2[s2] + 2 * o2 >= t2[s2] && (a2[s2] = Math.trunc((e2[s2] - t2[s2] + 2 * o2) / r2[s2] + 1));
    return a2;
  }, wf = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2) => {
    let m, f, g2, _;
    if (e2 === "VALID" && (e2 = 0), typeof e2 == "number") {
      m = { top: e2, bottom: e2, left: e2, right: e2, front: e2, back: e2 };
      let b = ju([t2, n2, r2, 1], [u2, d2, c2], 1, [o2, a2, s2], e2);
      f = b[0], g2 = b[1], _ = b[2];
    } else if (Array.isArray(e2)) {
      if (!e2.every((w, x, v) => w === v[0])) throw Error(`Unsupported padding parameter: ${e2}`);
      m = { top: e2[0], bottom: e2[1], left: e2[2], right: e2[3], front: e2[4], back: e2[5] };
      let b = ju([t2, n2, r2, 1], [u2, d2, c2], 1, [o2, a2, s2], e2[0]);
      f = b[0], g2 = b[1], _ = b[2];
    } else if (e2 === "SAME_UPPER") {
      f = Math.ceil(t2 / o2), g2 = Math.ceil(n2 / a2), _ = Math.ceil(r2 / s2);
      let b = (f - 1) * o2 + u2 - t2, w = (g2 - 1) * a2 + d2 - n2, x = (_ - 1) * s2 + c2 - r2, v = Math.floor(b / 2), $ = b - v, T = Math.floor(w / 2), C = w - T, A = Math.floor(x / 2), I = x - A;
      m = { top: T, bottom: C, left: A, right: I, front: v, back: $ };
    } else throw Error(`Unknown padding parameter: ${e2}`);
    return { padInfo: m, outDepth: f, outHeight: g2, outWidth: _ };
  }, Ku = (e2, t2, n2, r2, o2, a2 = false, s2 = "channelsLast") => {
    let u2, d2, c2, m, f;
    if (s2 === "channelsLast") [u2, d2, c2, m, f] = e2;
    else if (s2 === "channelsFirst") [u2, f, d2, c2, m] = e2;
    else throw new Error(`Unknown dataFormat ${s2}`);
    let [g2, , _, b, w] = t2, [x, v, $] = qu(n2), [T, C, A] = qu(r2), I = an(_, T), z = an(b, C), D = an(w, A), { padInfo: R, outDepth: H, outHeight: q, outWidth: Y } = wf(o2, d2, c2, m, x, v, $, I, z, D), ne = a2 ? g2 * f : g2, F = [0, 0, 0, 0, 0];
    return s2 === "channelsFirst" ? F = [u2, ne, H, q, Y] : s2 === "channelsLast" && (F = [u2, H, q, Y, ne]), { batchSize: u2, dataFormat: s2, inDepth: d2, inHeight: c2, inWidth: m, inChannels: f, outDepth: H, outHeight: q, outWidth: Y, outChannels: ne, padInfo: R, strideDepth: x, strideHeight: v, strideWidth: $, filterDepth: _, filterHeight: b, filterWidth: w, effectiveFilterDepth: I, effectiveFilterHeight: z, effectiveFilterWidth: D, dilationDepth: T, dilationHeight: C, dilationWidth: A, inShape: e2, outShape: F, filterShape: t2 };
  }, Zu = (e2, t2, n2, r2, o2, a2) => {
    let s2 = a2 === "channelsLast", u2 = s2 ? e2[0].dims[3] : e2[0].dims[1], d2 = false, c2 = [64, 1, 1], m = { x: n2.map(($, T) => T) }, f = [Math.ceil(bf(m.x.map(($) => n2[$])) / c2[0]), 1, 1];
    le("verbose", () => `[conv3d_naive_webgpu] dispatch = ${f}`);
    let g2 = d2 ? s2 && u2 % 4 !== 0 ? 3 : 4 : 1, _ = E.size(n2), b = [{ type: 12, data: _ }, { type: 12, data: r2 }, { type: 12, data: o2 }, { type: 12, data: t2.strides }, { type: 12, data: t2.dilations }];
    Ze(t2, b), b.push(...W(e2[0].dims, e2[1].dims));
    let w = ["rank", "rank"], x = e2.length === 3;
    x && (b.push(...W(e2[2].dims)), w.push("rank")), b.push(...W(n2));
    let v = ($) => {
      let T = [{ name: "output_size", type: "u32" }, { name: "filter_dims", type: "u32", length: r2.length }, { name: "pads", type: "u32", length: o2.length }, { name: "strides", type: "u32", length: t2.strides.length }, { name: "dilations", type: "u32", length: t2.dilations.length }];
      Qe(t2, T);
      let C = d2 ? 4 : 1, A = ve(e2[0].dataType), I = P("x", e2[0].dataType, e2[0].dims.length, g2 === 3 ? 1 : g2), z = P("W", e2[1].dataType, e2[1].dims.length, C), D = [I, z], R = N("result", e2[0].dataType, n2.length, C), H = "";
      if (x) {
        let ne = P("bias", e2[2].dataType, e2[2].dims.length, C);
        D.push(ne), H += `
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d2 ? `vec4<${A}>` : A} {
          return bias[${s2 ? K("coords", 4, 5) : K("coords", 1, 5)}${d2 ? "/ 4" : ""}];
        }`;
      }
      let q = Ae(g2, A), Y = Ke(t2, q, A);
      return `
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${$.registerUniforms(T).declareVariables(...D, R)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${K("coords", 0, I.rank)};
              let d2 = ${s2 ? K("coords", I.rank - 1, I.rank) : K("coords", 1, I.rank)};
              let xFRCCorner = vec3<u32>(${s2 ? K("coords", 1, I.rank) : K("coords", 2, I.rank)},
              ${s2 ? K("coords", 2, I.rank) : K("coords", 3, I.rank)},
              ${s2 ? K("coords", 3, I.rank) : K("coords", 4, I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s2 ? K("uniforms.x_shape", 1, I.rank) : K("uniforms.x_shape", 2, I.rank)};
              let xShapeZ = ${s2 ? K("uniforms.x_shape", 2, I.rank) : K("uniforms.x_shape", 3, I.rank)};
              let xShapeW = ${s2 ? K("uniforms.x_shape", 3, I.rank) : K("uniforms.x_shape", 4, I.rank)};
              let xShapeU = ${s2 ? K("uniforms.x_shape", 4, I.rank) : K("uniforms.x_shape", 1, I.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s2 ? `let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            ` : `let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s2 ? `value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);` : `value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s2 ? `let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      ` : `let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s2 ? `let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      ` : `let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${x ? "value = value + getBiasByOutputCoords(coords)" : ""};
              ${Y}
              result[global_idx] = f32(value);
          }`;
    };
    return { name: "Conv3DNaive", shaderCache: { hint: `${t2.cacheKey};${s2};${g2};${x}`, inputDependencies: w }, getRunData: () => ({ outputs: [{ dims: n2, dataType: e2[0].dataType }], dispatchGroup: { x: f[0], y: f[1], z: f[2] }, programUniforms: b }), getShaderSource: v };
  };
});
var Yu;
var Xu;
var Ju = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Tt();
  Yu = (e2, t2, n2, r2) => {
    let o2 = e2.length > 2, a2 = o2 ? "value += b[output_channel];" : "", s2 = e2[0].dims, u2 = e2[1].dims, d2 = t2.format === "NHWC", c2 = d2 ? n2[3] : n2[1], m = c2 / t2.group, f = d2 && m >= 4 ? he(c2) : 1, g2 = E.size(n2) / f, _ = [{ type: 12, data: g2 }, { type: 12, data: t2.dilations }, { type: 12, data: [t2.strides[0], t2.strides[1]] }, { type: 12, data: [t2.pads[0], t2.pads[1]] }, { type: 12, data: m }];
    Ze(t2, _), _.push(...W(s2, [u2[0], u2[1], u2[2], u2[3] / f]));
    let b = o2 ? ["rank", "rank", "rank"] : ["rank", "rank"];
    _.push(...W([n2[0], n2[1], n2[2], n2[3] / f]));
    let w = (x) => {
      let v = N("output", e2[0].dataType, n2.length, f), $ = ve(v.type.tensor), T = Ke(t2, v.type.value, $), C = P("x", e2[0].dataType, s2.length), A = P("w", e2[1].dataType, u2.length, f), I = [C, A];
      o2 && I.push(P("b", e2[2].dataType, e2[2].dims, f));
      let z = [{ name: "output_size", type: "u32" }, { name: "dilations", type: "u32", length: t2.dilations.length }, { name: "strides", type: "u32", length: 2 }, { name: "pads", type: "u32", length: 2 }, { name: "output_channels_per_group", type: "u32" }];
      Qe(t2, z);
      let D = d2 ? `
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${C.get("batch", "xHeight", "xWidth", "input_channel")};
            let wVal = ${A.get("wHeight", "wWidth", "wInChannel", "output_channel")};
            value += xVal * wVal;
          }
        }
      }
      ` : `
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${C.get("batch", "input_channel", "xHeight", "xWidth")};
            let wVal = ${A.get("output_channel", "wInChannel", "wHeight", "wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;
      return `
  ${x.registerUniforms(z).declareVariables(...I, v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d2 ? 3 : 1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d2 ? 1 : 2}], outputIndices[${d2 ? 2 : 3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d2 ? 2 : 1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${D}
    ${a2}
    ${T}
    ${v.setByOffset("global_idx", "value")}
  }`;
    };
    return { name: "GroupedConv", shaderCache: { hint: `${t2.cacheKey}_${f}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: r2 ? r2(n2) : n2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(g2 / 64) }, programUniforms: _ }), getShaderSource: w };
  }, Xu = (e2, t2, n2, r2) => {
    let o2 = e2.length > 2, a2 = he(n2[3]), s2 = he(n2[2]), u2 = E.size(n2) / a2 / s2, d2 = [e2[0].dims[0], e2[0].dims[1], e2[0].dims[2], e2[0].dims[3] / a2], c2 = [e2[1].dims[0], e2[1].dims[1], e2[1].dims[2], e2[1].dims[3] / a2], m = [n2[0], n2[1], n2[2], n2[3] / a2], f = [{ type: 12, data: u2 }, { type: 6, data: [t2.strides[0], t2.strides[1]] }, { type: 6, data: [t2.pads[0], t2.pads[1]] }];
    Ze(t2, f), f.push(...W(d2, c2, m));
    let g2 = (s2 - 1) * t2.strides[1] + c2[1], _ = (b) => {
      let w = N("output", e2[0].dataType, m.length, a2), x = ve(w.type.tensor), v = Ke(t2, w.type.value, x), $ = P("x", e2[0].dataType, d2.length, a2), T = P("w", e2[1].dataType, c2.length, a2), C = [$, T];
      o2 && C.push(P("b", e2[2].dataType, e2[2].dims, a2));
      let A = o2 ? "value += b[output_channel];" : "", I = [{ name: "output_size", type: "u32" }, { name: "strides", type: "i32", length: 2 }, { name: "pads", type: "i32", length: 2 }];
      return Qe(t2, I), `
  ${b.registerUniforms(I).declareVariables(...C, w)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s2}u;
    let col = (index1 % width1) * ${s2}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${g2}>;
    var values: array<${w.type.value}, ${s2}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c2[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g2}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch", "u32(x_height)", "u32(x_width)", "input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c2[1]}; w_width++) {
          let w_val = ${T.get("w_height", "w_width", "0", "output_channel")};
          for (var i = 0u; i < ${s2}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s2}u; i++) {
      var value = values[i];
      ${A}
      ${v}
      ${w.set("batch", "row", "col + i", "output_channel", "value")};
    }
  }`;
    };
    return { name: "GroupedConv-Vectorize", shaderCache: { hint: `${t2.cacheKey};${a2};${s2};${g2};${c2[0]};${c2[1]}`, inputDependencies: o2 ? ["rank", "rank", "type"] : ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: r2 ? r2(n2) : n2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(u2 / 64) }, programUniforms: f }), getShaderSource: _ };
  };
});
var vf;
var $o;
var $f;
var xo;
var So;
var el;
var xf;
var Sf;
var To;
var tl = L(() => {
  "use strict";
  ae();
  Fu();
  Qu();
  on();
  Ju();
  Tt();
  nn();
  ct();
  vf = (e2, t2, n2, r2, o2, a2) => {
    let s2 = e2[0], u2 = e2.slice(a2 ? 1 : 2, a2 ? 3 : 4), d2 = u2.length, c2 = t2[0], f = t2.slice(2).map((b, w) => b + (b - 1) * (n2[w] - 1)), _ = u2.map((b, w) => b + r2[w] + r2[w + d2]).map((b, w) => Math.floor((b - f[w] + o2[w]) / o2[w]));
    return _.splice(0, 0, s2), _.splice(a2 ? 3 : 1, 0, c2), _;
  }, $o = [2, 3, 1, 0], $f = (e2, t2) => {
    if (!e2 || e2.length !== 2 && e2.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
    if (e2[0].dims.length > 5) throw new Error("greater than 5D is not supported");
    if (e2[0].dims.length !== e2[1].dims.length) throw new Error("filter does not have same dimension as input");
    let n2 = e2[0].dims[t2.format === "NHWC" ? e2[0].dims.length - 1 : 1], r2 = e2[1].dims[1] * t2.group;
    if (n2 !== r2) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
    if (e2.length === 3 && (e2[2].dims.length !== 1 || e2[1].dims[0] !== e2[2].dims[0])) throw new Error("invalid bias");
    let o2 = e2[0].dims.length - 2;
    if (t2.dilations.length !== o2) throw new Error(`dilations should be ${o2}D`);
    if (t2.strides.length !== o2) throw new Error(`strides should be ${o2}D`);
    if (t2.pads.length !== o2 * 2) throw new Error(`pads should be ${o2 * 2}D`);
    if (t2.kernelShape.length !== 0 && t2.kernelShape.length !== e2[1].dims.length - 2) throw new Error("invalid kernel shape");
  }, xo = (e2, t2) => {
    let n2 = e2.kernelShape.slice();
    n2.length < t2[1].dims.length - 2 && n2.push(...Array(t2[1].dims.length - 2 - n2.length).fill(0));
    for (let a2 = 2; a2 < t2[1].dims.length; ++a2) n2[a2 - 2] === 0 && (n2[a2 - 2] = t2[1].dims[a2]);
    let r2 = e2.pads.slice();
    Dt.adjustPadsBasedOnAutoPad(t2[0].dims, e2.strides, e2.dilations, n2, r2, e2.format === "NHWC", e2.autoPad);
    let o2 = Object.assign({}, e2);
    return Object.assign(o2, { kernelShape: n2, pads: r2 }), o2;
  }, So = (e2) => {
    let t2 = en(e2), n2 = e2.format, r2 = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e2.auto_pad], o2 = e2.dilations, a2 = e2.group, s2 = e2.kernel_shape, u2 = e2.pads, d2 = e2.strides, c2 = e2.w_is_const();
    return { autoPad: r2, format: n2, dilations: o2, group: a2, kernelShape: s2, pads: u2, strides: d2, wIsConst: c2, ...t2, cacheKey: `${e2.format};${t2.activation};` };
  }, el = (e2, t2, n2, r2) => {
    let o2 = n2.format === "NHWC", a2 = vf(t2[0].dims, t2[1].dims, n2.dilations, n2.pads, n2.strides, o2);
    if (n2.group !== 1) {
      let I = [t2[0]];
      if (o2) {
        let D = e2.kernelCustomData.wT ?? e2.compute(Pe(t2[1], $o), { inputs: [1], outputs: [n2.wIsConst ? -2 : -1] })[0];
        n2.wIsConst && !e2.kernelCustomData.wT && (e2.kernelCustomData.wT = D), I.push(D);
      } else I.push(t2[1]);
      t2.length === 3 && I.push(t2[2]), !e2.adapterInfo.isArchitecture("ampere") && o2 && t2[1].dims[0] === n2.group && t2[1].dims[1] === 1 && n2.dilations[0] === 1 && n2.dilations[1] === 1 ? e2.compute(Xu(I, n2, a2, r2), { inputs: I }) : e2.compute(Yu(I, n2, a2, r2), { inputs: I });
      return;
    }
    let s2 = t2.length === 3, u2 = t2[0].dims[o2 ? 1 : 2], d2 = t2[0].dims[o2 ? 2 : 3], c2 = t2[0].dims[o2 ? 3 : 1], m = t2[1].dims[2], f = t2[1].dims[3], g2 = a2[o2 ? 1 : 2], _ = a2[o2 ? 2 : 3], b = a2[o2 ? 3 : 1], w = o2 && m === u2 && f === d2 && n2.pads[0] === 0 && n2.pads[1] === 0;
    if (w || m === 1 && f === 1 && n2.dilations[0] === 1 && n2.dilations[1] === 1 && n2.strides[0] === 1 && n2.strides[1] === 1 && n2.pads[0] === 0 && n2.pads[1] === 0) {
      let I = a2[0], z, D, R, H = [];
      if (o2) {
        let ne = e2.kernelCustomData.wT ?? e2.compute(Pe(t2[1], $o), { inputs: [1], outputs: [n2.wIsConst ? -2 : -1] })[0];
        if (n2.wIsConst && !e2.kernelCustomData.wT && (e2.kernelCustomData.wT = ne), w) {
          let F = u2 * d2 * c2;
          z = t2[0].reshape([1, I, F]), D = ne.reshape([1, F, b]), R = [1, I, b];
        } else z = t2[0].reshape([I, u2 * d2, c2]), D = ne.reshape([1, c2, b]), R = [I, g2 * _, b];
        H.push(z), H.push(D);
      } else z = t2[0].reshape([I, c2, u2 * d2]), D = t2[1].reshape([1, b, c2]), R = [I, b, g2 * _], H.push(D), H.push(z);
      s2 && H.push(t2[2]);
      let q = R[2], Y = H[0].dims[H[0].dims.length - 1];
      q < 8 && Y < 8 ? e2.compute(rn(H, n2, a2, R, o2, r2), { inputs: H }) : e2.compute(ar(H, n2, a2, R, o2, r2), { inputs: H });
      return;
    }
    let x = true, v = e2.kernelCustomData.wT ?? e2.compute(Pe(t2[1], $o), { inputs: [1], outputs: [n2.wIsConst ? -2 : -1] })[0];
    n2.wIsConst && !e2.kernelCustomData.wT && (e2.kernelCustomData.wT = v);
    let $ = [t2[0], v];
    s2 && $.push(t2[2]);
    let T = o2 ? g2 * _ : b, C = o2 ? b : g2 * _, A = m * f * c2;
    e2.compute(Hu($, n2, a2, T, C, A, s2, x, r2), { inputs: $ });
  }, xf = (e2, t2) => {
    let n2 = t2.format === "NHWC", r2 = [e2.inputs[0].reshape(n2 ? [e2.inputs[0].dims[0], 1, e2.inputs[0].dims[1], e2.inputs[0].dims[2]] : [e2.inputs[0].dims[0], e2.inputs[0].dims[1], 1, e2.inputs[0].dims[2]]), e2.inputs[1].reshape([e2.inputs[1].dims[0], e2.inputs[1].dims[1], 1, e2.inputs[1].dims[2]])];
    e2.inputs.length === 3 && r2.push(e2.inputs[2]);
    let o2 = [0, t2.pads[0], 0, t2.pads[1]], a2 = [1].concat(t2.strides), s2 = [1].concat(t2.dilations), u2 = [1].concat(t2.kernelShape), d2 = xo({ ...t2, pads: o2, strides: a2, dilations: s2, kernelShape: u2 }, r2);
    el(e2, r2, d2, (c2) => n2 ? [c2[0], c2[2], c2[3]] : [c2[0], c2[1], c2[3]]);
  }, Sf = (e2, t2, n2) => {
    let r2 = n2.format === "NHWC" ? "channelsLast" : "channelsFirst", o2 = xo(n2, t2), a2 = n2.autoPad === "NOTSET" ? n2.pads : n2.autoPad, s2 = Ku(t2[0].dims, t2[1].dims, n2.strides, n2.dilations, a2, false, r2);
    e2.compute(Zu(t2, o2, s2.outShape, [s2.filterDepth, s2.filterHeight, s2.filterWidth], [s2.padInfo.front, s2.padInfo.top, s2.padInfo.left], r2));
  }, To = (e2, t2) => {
    if ($f(e2.inputs, t2), e2.inputs[0].dims.length === 3) xf(e2, t2);
    else if (e2.inputs[0].dims.length === 5) Sf(e2, e2.inputs, t2);
    else {
      let n2 = xo(t2, e2.inputs);
      el(e2, e2.inputs, n2);
    }
  };
});
var rl;
var nl = L(() => {
  "use strict";
  ee();
  et();
  ae();
  ue();
  rl = (e2, t2, n2) => {
    let r2 = e2.length > 2, o2 = t2.outputShape, a2 = t2.format === "NHWC", s2 = t2.group, u2 = e2[1].dims, d2 = u2[2] / s2, c2 = u2[3], m = a2 ? he(d2) : 1, f = a2 && c2 === 1 && d2 >= 4, g2 = f ? Math.floor(d2 / 4) * 4 : Math.floor(d2 / m) * m, _ = d2 - g2, b = a2 ? he(c2) : 1, w = a2 ? c2 === 1 ? m : b : 1, x = E.size(o2) / b, v = [Math.ceil(x / 64), 1, 1];
    le("verbose", () => `[conv2d_backprop_webgpu] dispatch = ${v}`);
    let $ = ["rank", "rank"], T = [t2.strides[0], t2.strides[1]], C = [t2.kernelShape[a2 ? 1 : 2], t2.kernelShape[a2 ? 2 : 3]], A = [t2.dilations[0], t2.dilations[1]], I = [C[0] + (t2.dilations[0] <= 1 ? 0 : (t2.kernelShape[a2 ? 1 : 2] - 1) * (t2.dilations[0] - 1)), C[1] + (t2.dilations[1] <= 1 ? 0 : (t2.kernelShape[a2 ? 2 : 3] - 1) * (t2.dilations[1] - 1))], z = [I[0] - 1 - Math.floor((t2.pads[0] + t2.pads[2]) / 2), I[1] - 1 - Math.floor((t2.pads[1] + t2.pads[3]) / 2)], D = [{ type: 12, data: x }, { type: 12, data: T }, { type: 12, data: C }, { type: 12, data: A }, { type: 12, data: I }, { type: 6, data: z }, { type: 12, data: g2 }, { type: 12, data: d2 }, { type: 12, data: c2 }, ...W(e2[0].dims, e2[1].dims)];
    r2 && (D.push(...W(e2[2].dims)), $.push("rank")), D.push(...W(o2));
    let R = (H) => {
      let q = [{ name: "output_size", type: "u32" }, { name: "strides", type: "u32", length: T.length }, { name: "filter_dims", type: "u32", length: C.length }, { name: "dilations", type: "u32", length: C.length }, { name: "effective_filter_dims", type: "u32", length: I.length }, { name: "pads", type: "i32", length: z.length }, { name: "input_channels_per_group_int", type: "u32" }, { name: "input_channels_per_group", type: "u32" }, { name: "output_channels_per_group", type: "u32" }], Y = ve(e2[0].dataType), ne = a2 ? 1 : 2, F = a2 ? 2 : 3, me = a2 ? 3 : 1, oe = P("W", e2[1].dataType, e2[1].dims.length, w), j = P("Dy", e2[0].dataType, e2[0].dims.length, m), ie = [j, oe];
      r2 && ie.push(P("bias", e2[2].dataType, [o2[me]].length, b));
      let Z = N("result", e2[0].dataType, o2.length, b), ce = () => {
        let J = "";
        if (f) m === 4 ? J += `
        let xValue = ${j.getByOffset("x_offset")};
        let wValue = ${oe.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;` : m === 2 ? J += `
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;` : m === 1 && (J += `
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}, ${j.getByOffset("x_offset + 2u")}, ${j.getByOffset("x_offset + 3u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}, ${oe.getByOffset("w_offset + 2u")}, ${oe.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);
        else if (J += `
                  let xValue = ${a2 ? j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m}`) : j.get("batch", "inputChannel", "idyR", "idyC")};
        `, m === 1) J += `
          let w_offset = ${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${oe.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;
        else for (let V = 0; V < m; V++) J += `
            let wValue${V} = ${oe.getByOffset(`${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;
        return J;
      }, Te = () => {
        if (_ === 0) return "";
        if (!f) throw new Error(`packInputAs4 ${f} is not true.`);
        let J = "";
        if (m === 1) {
          J += "dotProd = dotProd";
          for (let V = 0; V < _; V++) J += `
            + ${j.getByOffset(`x_offset + ${V}`)} * ${oe.getByOffset(`w_offset + ${V}`)}`;
          J += ";";
        } else if (m === 2) {
          if (_ !== 2) throw new Error(`Invalid inputChannelsRemainder ${_}.`);
          J += `
          let xValue = ${j.getByOffset("x_offset")};
          let wValue = ${oe.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`;
        }
        return J;
      }, pe = `
            let outputIndices = ${Z.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${Z.indicesGet("outputIndices", 0)};
            let d1 = ${Z.indicesGet("outputIndices", me)};
            let r = ${Z.indicesGet("outputIndices", ne)};
            let c = ${Z.indicesGet("outputIndices", F)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Z.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Y}(dyRCorner) + ${Y}(wR)) / ${Y}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Y}(uniforms.Dy_shape[${ne}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Y}(dyCCorner) + ${Y}(wC)) / ${Y}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${F}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f ? `
                var x_offset = ${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m};
                var w_offset = ${oe.indicesToOffset(`${oe.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  ` : ""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f ? 4 : m}) {
                  ${ce()}
                  inputChannel = inputChannel + ${f ? 4 : m};
                }
                ${Te()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r2 ? ` + bias[d1 / ${b}]` : ""};
            ${Z.setByOffset("global_idx", "value")};
          `;
      return `
    ${H.registerUniforms(q).declareVariables(...ie, Z)}
      ${H.mainStart()}
      ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${pe}}`;
    };
    return { name: "ConvTranspose2D", shaderCache: { hint: `${t2.cacheKey};${m}${w}${b}${f}${_}`, inputDependencies: $ }, getRunData: () => ({ dispatchGroup: { x: v[0], y: v[1], z: v[2] }, outputs: [{ dims: n2 ? n2(o2) : o2, dataType: e2[0].dataType }], programUniforms: D }), getShaderSource: R };
  };
});
var Tf;
var Cf;
var If;
var ol;
var il;
var Af;
var al;
var Ef;
var sl;
var ul = L(() => {
  "use strict";
  nl();
  Tt();
  ct();
  Tf = (e2, t2, n2, r2, o2, a2) => (e2 - 1) * t2 + n2 + (r2 - 1) * o2 + 1 - a2, Cf = (e2, t2, n2, r2, o2) => {
    let a2 = Math.floor(e2 / 2);
    t2 === "SAME_UPPER" ? (n2[r2] = a2, n2[o2] = e2 - a2) : t2 === "SAME_LOWER" && (n2[r2] = e2 - a2, n2[o2] = a2);
  }, If = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2) => {
    let m = e2.length - 2, f = c2.length === 0;
    d2.length < m && d2.push(...Array(m - d2.length).fill(0));
    let g2 = e2[0], _ = t2[u2 ? 3 : 1] * o2;
    for (let b = 0, w = e2.length - m - (u2 ? 1 : 0); b < m; ++b, ++w) {
      let x = e2[w], v = f ? x * s2[b] : c2[b], $ = Tf(x, s2[b], a2[b], t2[w], n2[b], v);
      Cf($, r2, a2, b, b + m), f && c2.push(s2[b] * (x - 1) + d2[b] + (t2[w] - 1) * n2[b] + 1 - a2[b] - a2[b + m]);
    }
    c2.splice(0, 0, g2), c2.splice(u2 ? 3 : 1, 0, _);
  }, ol = (e2, t2) => {
    let n2 = e2.kernelShape.slice();
    if (e2.kernelShape.length === 0 || e2.kernelShape.reduce((f, g2) => f * g2, 1) === 0) {
      n2.length = 0;
      for (let f = 2; f < t2[1].dims.length; ++f) n2.push(t2[1].dims[f]);
    }
    let r2 = e2.format === "NHWC";
    n2.splice(0, 0, t2[1].dims[0]), n2.splice(r2 ? 3 : 1, 0, t2[1].dims[1]);
    let o2 = e2.pads.slice(), a2 = e2.outputShape.slice(), s2 = e2.outputPadding.slice(), u2 = t2[0].dims, d2 = e2.dilations.slice();
    if (d2.reduce((f, g2) => f + g2, 0) === 0) {
      let f = t2[0].dims.length - 2;
      d2 = new Array(f).fill(1);
    }
    let c2 = e2.strides.slice();
    if (c2.reduce((f, g2) => f + g2, 0) === 0) {
      let f = t2[0].dims.length - 2;
      c2 = new Array(f).fill(1);
    }
    If(u2, n2, d2, e2.autoPad, e2.group, o2, c2, r2, s2, a2);
    let m = Object.assign({}, e2);
    return Object.assign(m, { kernelShape: n2, pads: o2, outputPadding: s2, outputShape: a2, dilations: d2, strides: c2 }), m;
  }, il = (e2) => {
    let t2 = en(e2), n2 = e2.format, r2 = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][typeof e2.autoPad > "u" ? 0 : e2.autoPad], o2 = e2.dilations, a2 = e2.group, s2 = e2.kernelShape, u2 = e2.pads, d2 = e2.strides, c2 = e2.wIsConst(), m = e2.outputPadding, f = e2.outputShape;
    return { autoPad: r2, format: n2, dilations: o2, group: a2, kernelShape: s2, outputPadding: m, outputShape: f, pads: u2, strides: d2, wIsConst: c2, ...t2, cacheKey: `${e2.format};${t2.activation};` };
  }, Af = (e2, t2) => {
    if (!e2 || e2.length !== 2 && e2.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
    if (e2[0].dims.length !== 4 && e2[0].dims.length !== 3) throw new Error("currently only support 2-dimensional conv");
    if (e2[0].dims.length !== e2[1].dims.length) throw new Error("filter does not have same dimension as input");
    let n2 = e2[0].dims[t2.format === "NHWC" ? e2[0].dims.length - 1 : 1], r2 = e2[1].dims[0];
    if (n2 !== r2) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
    let o2 = e2[1].dims[1] * t2.group;
    if (e2.length === 3 && (e2[2].dims.length !== 1 || e2[2].dims[0] !== o2)) throw new Error("invalid bias");
    let a2 = e2[0].dims.length - 2;
    if (t2.dilations.reduce((m, f) => m + f, 0) > 0 && t2.dilations.length !== a2) throw new Error(`dilations should be ${a2}D`);
    if (t2.strides.reduce((m, f) => m + f, 0) > 0 && t2.strides.length !== a2) throw new Error(`strides should be ${a2}D`);
    if (t2.pads.reduce((m, f) => m + f, 0) > 0 && t2.pads.length !== a2 * 2) throw new Error(`pads should be ${a2 * 2}D`);
    if (t2.outputPadding.length !== a2 && t2.outputPadding.length !== 0) throw new Error(`output_padding should be ${a2}D`);
    if (t2.kernelShape.reduce((m, f) => m + f, 0) > 0 && t2.kernelShape.length !== 0 && t2.kernelShape.length !== e2[1].dims.length - 2) throw new Error("invalid kernel shape");
    if (t2.outputShape.length !== 0 && t2.outputShape.length !== e2[0].dims.length - 2) throw new Error("invalid output shape");
  }, al = (e2, t2, n2, r2) => {
    let o2 = e2.kernelCustomData.wT ?? e2.compute(Pe(t2[1], [2, 3, 0, 1]), { inputs: [1], outputs: [n2.wIsConst ? -2 : -1] })[0];
    n2.wIsConst && !e2.kernelCustomData.wT && (e2.kernelCustomData.wT = o2);
    let a2 = [t2[0], o2];
    t2.length === 3 && a2.push(t2[2]), e2.compute(rl(a2, n2, r2), { inputs: a2 });
  }, Ef = (e2, t2) => {
    let n2 = t2.format === "NHWC", r2 = [e2.inputs[0].reshape(n2 ? [e2.inputs[0].dims[0], 1, e2.inputs[0].dims[1], e2.inputs[0].dims[2]] : [e2.inputs[0].dims[0], e2.inputs[0].dims[1], 1, e2.inputs[0].dims[2]]), e2.inputs[1].reshape([e2.inputs[1].dims[0], e2.inputs[1].dims[1], 1, e2.inputs[1].dims[2]])];
    e2.inputs.length === 3 && r2.push(e2.inputs[2]);
    let o2 = t2.kernelShape;
    (o2.length === 0 || o2[0] === 0) && (o2 = [e2.inputs[1].dims[2]]);
    let a2 = t2.dilations;
    (a2.length === 0 || a2[0] === 0) && (a2 = [1]);
    let s2 = t2.strides;
    (s2.length === 0 || s2[0] === 0) && (s2 = [1]);
    let u2 = t2.pads;
    u2.length === 0 && (u2 = [0, 0]), u2 = [0, u2[0], 0, u2[1]], s2 = [1].concat(s2), a2 = [1].concat(a2), o2 = [1].concat(o2);
    let d2 = t2.outputPadding;
    d2 = [0].concat(d2);
    let c2 = ol({ ...t2, pads: u2, strides: s2, dilations: a2, kernelShape: o2, outputPadding: d2 }, r2);
    al(e2, r2, c2, (m) => n2 ? [m[0], m[2], m[3]] : [m[0], m[1], m[3]]);
  }, sl = (e2, t2) => {
    if (Af(e2.inputs, t2), e2.inputs[0].dims.length === 3) Ef(e2, t2);
    else {
      let n2 = ol(t2, e2.inputs);
      al(e2, e2.inputs, n2);
    }
  };
});
var kf;
var ll;
var dl;
var cl = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  kf = (e2, t2, n2, r2) => {
    let o2 = E.size(t2), a2 = t2.length, s2 = P("input", e2, a2), u2 = N("output", e2, a2), d2 = n2.dataType === 6 ? n2.getInt32Array()[0] : Number(n2.getBigInt64Array()[0]), c2 = E.normalizeAxis(d2, a2), m = (f) => {
      let g2 = ` i32(${s2.indicesGet("inputIndices", "uniforms.axis")}) `, _ = K("uniforms.input_shape", "uniforms.axis", a2), b = r2.reverse ? g2 + (r2.exclusive ? " + 1" : "") : "0", w = r2.reverse ? _ : g2 + (r2.exclusive ? "" : " + 1");
      return `
                ${f.registerUniform("outputSize", "u32").registerUniform("axis", "u32").declareVariables(s2, u2)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u2.offsetToIndices("global_idx")};
                  var sum = ${u2.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s2.indicesSet("inputIndices", "uniforms.axis", "u32(i)")};
                    sum = sum + ${s2.getByIndices("inputIndices")};
                  }
                  ${u2.setByOffset("global_idx", "sum")};
                }`;
    };
    return { name: "CumSum", shaderCache: { hint: r2.cacheKey, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: t2, dataType: e2 }], dispatchGroup: { x: Math.ceil(o2 / 64) }, programUniforms: [{ type: 12, data: o2 }, { type: 12, data: c2 }, ...W(t2, t2)] }), getShaderSource: m };
  }, ll = (e2, t2) => {
    let n2 = e2.inputs[0].dims, r2 = e2.inputs[0].dataType, o2 = e2.inputs[1];
    e2.compute(kf(r2, n2, o2, t2), { inputs: [0] });
  }, dl = (e2) => {
    let t2 = e2.exclusive === 1, n2 = e2.reverse === 1;
    return te({ exclusive: t2, reverse: n2 });
  };
});
var Pf;
var Of;
var zf;
var pl;
var ml;
var fl = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Pf = (e2) => {
    if (!e2 || e2.length !== 1) throw new Error("DepthToSpace requires 1 input.");
    if (e2[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.");
  }, Of = (e2, t2, n2, r2) => {
    let o2 = [];
    o2.push(`fn perm(i: ${r2.type.indices}) -> ${n2.type.indices} {
    var a: ${n2.type.indices};`);
    for (let a2 = 0; a2 < t2; ++a2) o2.push(n2.indicesSet("a", e2[a2], `i[${a2}]`));
    return o2.push("return a;}"), o2.join(`
`);
  }, zf = (e2, t2) => {
    let n2, r2, o2, a2, s2, u2, d2 = t2.format === "NHWC", c2 = t2.blocksize, m = t2.mode === "DCR";
    d2 ? ([n2, r2, o2, a2] = e2.dims, s2 = m ? [n2, r2, o2, c2, c2, a2 / c2 ** 2] : [n2, r2, o2, a2 / c2 ** 2, c2, c2], u2 = m ? [0, 1, 3, 2, 4, 5] : [0, 1, 4, 2, 5, 3]) : ([n2, r2, o2, a2] = [e2.dims[0], e2.dims[2], e2.dims[3], e2.dims[1]], s2 = m ? [n2, c2, c2, a2 / c2 ** 2, r2, o2] : [n2, a2 / c2 ** 2, c2, c2, r2, o2], u2 = m ? [0, 3, 4, 1, 5, 2] : [0, 1, 4, 2, 5, 3]);
    let f = e2.reshape(s2), g2 = f.dims.length, _ = e2.dataType, b = P("a", _, g2), w = N("output", _, g2), x = (v) => `
  ${v.registerUniform("output_size", "u32").declareVariables(b, w)}

  ${Of(u2, g2, b, w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx", b.getByIndices("aIndices"))}
  }`;
    return { name: "DepthToSpace", shaderCache: { hint: `${e2.dims};${t2.blocksize};${t2.mode}`, inputDependencies: ["rank"] }, getRunData: (v) => {
      let $ = d2 ? [n2, r2 * c2, o2 * c2, a2 / c2 ** 2] : [n2, a2 / c2 ** 2, r2 * c2, o2 * c2], T = E.size($), C = f.dims, A = E.sortBasedOnPerm(C, u2);
      return { outputs: [{ dims: $, dataType: v[0].dataType }], dispatchGroup: { x: Math.ceil(T / 64) }, programUniforms: [{ type: 12, data: T }, ...W(C, A)] };
    }, getShaderSource: x };
  }, pl = (e2, t2) => {
    Pf(e2.inputs), e2.compute(zf(e2.inputs[0], t2));
  }, ml = (e2) => te({ blocksize: e2.blocksize, mode: e2.mode, format: e2.format });
});
var Co;
var sn;
var hl;
var Df;
var Bf;
var Io;
var Ao;
var gl;
var Mf;
var yl;
var bl;
var _l = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Co = "[a-zA-Z]|\\.\\.\\.", sn = "(" + Co + ")+", hl = "^" + sn + "$", Df = "(" + sn + ",)*" + sn, Bf = "^" + Df + "$", Io = class {
    constructor(t2 = -1) {
      this.symbolToIndices = /* @__PURE__ */ new Map(), this.inputIndex = t2;
    }
    addSymbol(t2, n2) {
      let r2 = this.symbolToIndices.get(t2);
      r2 === void 0 ? r2 = [n2] : r2.push(n2), this.symbolToIndices.set(t2, r2);
    }
  }, Ao = class {
    constructor(t2, n2) {
      this.equation = n2;
      this.hasEllipsis = false, this.symbolToInfo = /* @__PURE__ */ new Map(), this.lhs = new Array(), this.outputDims = [];
      let [r2, o2] = n2.includes("->") ? n2.split("->", 2) : [n2, ""];
      if (!r2.match(RegExp(Bf))) throw new Error("Invalid LHS term");
      if (r2.split(",").forEach((u2, d2) => {
        let c2 = t2[d2].dims.slice();
        if (!u2.match(RegExp(hl))) throw new Error("Invalid LHS term");
        let m = this.processTerm(u2, true, c2, d2);
        this.lhs.push(m);
      }), o2 === "") o2 += [...this.symbolToInfo.entries()].filter(([u2, d2]) => d2.count === 1 || u2 === "...").map(([u2]) => u2).join("");
      else if (!o2.match(RegExp(sn))) throw new Error("Invalid RHS");
      o2.match(RegExp(Co, "g"))?.forEach((u2) => {
        if (u2 === "...") this.outputDims = this.outputDims.concat(this.ellipsisDims);
        else {
          let d2 = this.symbolToInfo.get(u2);
          if (d2 === void 0) throw new Error("Invalid RHS symbol");
          this.outputDims.push(d2.dimValue);
        }
      }), this.rhs = this.processTerm(o2, false, this.outputDims);
    }
    addSymbol(t2, n2, r2) {
      let o2 = this.symbolToInfo.get(t2);
      if (o2 !== void 0) {
        if (o2.dimValue !== n2 && o2.count !== 1) throw new Error("Dimension mismatch");
        o2.count++, o2.inputIndices.push(r2);
      } else o2 = { count: 1, dimValue: n2, inputIndices: [r2] };
      this.symbolToInfo.set(t2, o2);
    }
    processTerm(t2, n2, r2, o2 = -1) {
      let a2 = r2.length, s2 = false, u2 = [], d2 = 0;
      if (!t2.match(RegExp(hl)) && !n2 && t2 !== "") throw new Error("Invalid LHS term");
      let c2 = t2.match(RegExp(Co, "g")), m = new Io(o2);
      return c2?.forEach((f, g2) => {
        if (f === "...") {
          if (s2) throw new Error("Only one ellipsis is allowed per input term");
          s2 = true;
          let _ = a2 - c2.length + 1;
          if (_ < 0) throw new Error("Ellipsis out of bounds");
          if (u2 = r2.slice(d2, d2 + _), this.hasEllipsis) {
            if (this.ellipsisDims.length !== u2.length || this.ellipsisDims.toString() !== u2.toString()) throw new Error("Ellipsis dimensions mismatch");
          } else if (n2) this.hasEllipsis = true, this.ellipsisDims = u2;
          else throw new Error("Ellipsis must be specified in the LHS");
          for (let b = 0; b < u2.length; b++) {
            let w = String.fromCharCode(48 + b);
            m.addSymbol(w, g2 + b), this.addSymbol(w, r2[d2++], o2);
          }
        } else m.addSymbol(f, g2 + (this.hasEllipsis ? this.ellipsisDims.length - 1 : 0)), this.addSymbol(f, r2[d2++], o2);
      }), m;
    }
  }, gl = (e2) => e2 + "_max", Mf = (e2, t2, n2, r2) => {
    let a2 = e2.map((m) => m.length).map((m, f) => P(`input${f}`, t2, m)), s2 = E.size(r2), u2 = N("output", t2, r2.length), d2 = [...n2.symbolToInfo.keys()].filter((m) => !n2.rhs.symbolToIndices.has(m)), c2 = (m) => {
      let f = [], g2 = "var prod = 1.0;", _ = "var sum = 0.0;", b = "sum += prod;", w = [], x = [], v = [], $ = [], T = n2.symbolToInfo.size === n2.rhs.symbolToIndices.size;
      n2.symbolToInfo.forEach((A, I) => {
        if (n2.rhs.symbolToIndices.has(I)) {
          let z = n2.rhs.symbolToIndices.get(I)?.[0];
          z !== void 0 && n2.lhs.forEach((D, R) => {
            if (A.inputIndices.includes(R)) {
              let H = D.symbolToIndices.get(I);
              if (H === void 0) throw new Error("Invalid symbol error");
              H.forEach((q) => {
                f.push(`${a2[R].indicesSet(`input${R}Indices`, q, u2.indicesGet("outputIndices", z))}`);
              });
            }
          });
        } else n2.lhs.forEach((z, D) => {
          if (A.inputIndices.includes(D)) {
            let R = z.symbolToIndices.get(I);
            if (R === void 0) throw new Error("Invalid symbol error");
            R.forEach((H) => {
              w.push(`${a2[D].indicesSet(`input${D}Indices`, H, `${I}`)}`);
            }), $.push(`prod *= ${a2[D].getByIndices(`input${D}Indices`)};`);
          }
        }), x.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${gl(I)}; ${I}++) {`), v.push("}");
      });
      let C = T ? [...f, `let sum = ${a2.map((A, I) => A.getByIndices(`input${I}Indices`)).join(" * ")};`] : [...f, _, ...x, ...w, g2, ...$, b, ...v];
      return `
            ${m.registerUniforms(d2.map((A) => ({ name: `${gl(A)}`, type: "u32" }))).registerUniform("outputSize", "u32").declareVariables(...a2, u2)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u2.offsetToIndices("global_idx")};
            ${a2.map((A, I) => `var input${I}Indices: ${a2[I].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${u2.setByOffset("global_idx", "sum")};
          }`;
    };
    return { name: "Einsum", shaderCache: { hint: n2.equation, inputDependencies: e2.map(() => "rank") }, getRunData: () => {
      let m = d2.filter((g2) => n2.symbolToInfo.has(g2)).map((g2) => ({ type: 12, data: n2.symbolToInfo.get(g2)?.dimValue || 0 }));
      m.push({ type: 12, data: s2 });
      let f = e2.map((g2, _) => [...W(g2)]).reduce((g2, _) => g2.concat(_), m);
      return f.push(...W(r2)), { outputs: [{ dims: r2, dataType: t2 }], dispatchGroup: { x: Math.ceil(s2 / 64) }, programUniforms: f };
    }, getShaderSource: c2 };
  }, yl = (e2, t2) => {
    let n2 = new Ao(e2.inputs, t2.equation), r2 = n2.outputDims, o2 = e2.inputs.map((a2, s2) => a2.dims);
    e2.compute(Mf(o2, e2.inputs[0].dataType, n2, r2));
  }, bl = (e2) => {
    let t2 = e2.equation.replace(/\s+/g, "");
    return te({ equation: t2 });
  };
});
var Rf;
var wl;
var Uf;
var Nf;
var vl;
var $l = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Rf = (e2) => {
    if (!e2 || e2.length !== 2) throw new Error("Expand requires 2 input.");
    let t2 = e2[0].dims, n2 = Array.from(e2[1].getBigInt64Array(), Number), r2 = n2.length < t2.length ? 0 : n2.length - t2.length, o2 = t2.length < n2.length ? 0 : t2.length - n2.length;
    for (; r2 < n2.length && o2 < t2.length; ++r2, ++o2) if (n2[r2] !== t2[o2] && n2[r2] !== 1 && t2[o2] !== 1) throw new Error("Expand requires shape to be broadcastable to input");
  }, wl = (e2, t2) => {
    let n2 = e2.length - t2.length, r2 = [];
    for (let o2 = 0; o2 < n2; ++o2) r2.push(e2[o2]);
    for (let o2 = 0; o2 < t2.length; ++o2) r2.push(t2[o2] === 1 ? e2[o2 + n2] : t2[o2]);
    return r2;
  }, Uf = (e2, t2) => e2.length > t2.length ? wl(e2, t2) : wl(t2, e2), Nf = (e2) => {
    let t2 = e2[0].dims, n2 = Array.from(e2[1].getBigInt64Array(), Number), r2 = Uf(t2, n2), o2 = e2[0].dataType, a2 = o2 === 9 || E.size(t2) === 1, s2 = o2 === 9 || t2.length > 0 && t2[t2.length - 1] % 4 === 0 ? 4 : 1, u2 = a2 || r2.length > 0 && r2[r2.length - 1] % 4 === 0 ? 4 : 1, d2 = Math.ceil(E.size(r2) / u2), c2 = (f) => {
      let g2 = P("input", o2, t2.length, s2), _ = N("output", o2, r2.length, u2), b;
      if (o2 === 9) {
        let w = (x, v, $ = "") => `
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g2.broadcastedIndicesToOffset(`outputIndices${v}`, _)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${$}(${g2.getByOffset(`index${v}`)}[component${v}]);
        `;
        b = `
        let outputOffset = global_idx * ${u2};
        var data = vec4<u32>(0);
        ${w("data", 0, "u32")}
        ${w("data", 1, "u32")}
        ${w("data", 2, "u32")}
        ${w("data", 3, "u32")}
        ${_.setByOffset("global_idx", "data")}
      }`;
      } else b = `
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u2}`)};
        let inputOffset = ${g2.broadcastedIndicesToOffset("outputIndices", _)};
        let data = ${_.type.value}(${g2.getByOffset(`inputOffset / ${s2}`)});
        ${_.setByOffset("global_idx", "data")}
      }`;
      return `
    ${f.registerUniform("vec_size", "u32").declareVariables(g2, _)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`;
    }, m = [{ type: 12, data: d2 }, ...W(t2, r2)];
    return { name: "Expand", shaderCache: { hint: `${r2.length};${s2}${u2}`, inputDependencies: ["rank"] }, getShaderSource: c2, getRunData: () => ({ outputs: [{ dims: r2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(d2 / 64) }, programUniforms: m }) };
  }, vl = (e2) => {
    Rf(e2.inputs), e2.compute(Nf(e2.inputs), { inputs: [0] });
  };
});
var Vf;
var xl;
var Sl = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Jr();
  Vf = (e2) => {
    let t2 = e2[0].dataType, n2 = E.size(e2[0].dims), r2 = E.size(e2[1].dims), o2 = r2 % 4 === 0, a2 = (s2) => {
      let u2 = P("x", t2, [1], 4), d2 = P("bias", t2, [1], 4), c2 = N("y", t2, [1], 4), m = [{ name: "output_vec_size", type: "u32" }, { name: "bias_size", type: "u32" }], f = (_) => `
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d2.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`, g2 = o2 ? `
      let bias = ${d2.getByOffset("global_idx % (uniforms.bias_size / 4)")};` : `${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u2.type.value}(bias0, bias1, bias2, bias3);`;
      return `${s2.registerUniforms(m).declareVariables(u2, d2, c2)}

    ${bo(ke(t2))}

    ${s2.mainStart(Bt)}
      ${s2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u2.getByOffset("global_idx")};
      ${g2}
      let x_in = x + bias;
      ${c2.setByOffset("global_idx", _o("x_in"))}
    }`;
    };
    return { name: "FastGeluWithBias", shaderCache: { hint: `${o2}`, inputDependencies: ["type", "type"] }, getShaderSource: a2, getRunData: (s2) => ({ outputs: [{ dims: s2[0].dims, dataType: s2[0].dataType }], programUniforms: [{ type: 12, data: Math.ceil(n2 / 4) }, { type: 12, data: r2 }], dispatchGroup: { x: Math.ceil(n2 / Bt / 4) } }) };
  }, xl = (e2) => {
    e2.inputs.length < 2 || E.size(e2.inputs[1].dims) === 0 ? _u(e2) : e2.compute(Vf(e2.inputs));
  };
});
var Lf;
var Wf;
var Tl;
var Cl;
var Il = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Lf = (e2) => {
    if (!e2 || e2.length !== 2) throw new Error("Gather requires 2 inputs.");
  }, Wf = (e2, t2) => {
    let n2 = e2[0].dims, r2 = e2[1].dims, o2 = n2.length, a2 = E.normalizeAxis(t2.axis, o2), s2 = n2.slice(0);
    s2.splice(a2, 1, ...r2);
    let u2 = n2[a2], d2 = e2[0].dataType === 9 ? 4 : 1, c2 = Math.ceil(E.size(s2) / d2), m = [{ type: 12, data: c2 }, { type: 6, data: u2 }, { type: 12, data: a2 }, ...W(e2[0].dims, e2[1].dims, s2)], f = (g2) => {
      let _ = P("data", e2[0].dataType, e2[0].dims.length, d2), b = P("inputIndices", e2[1].dataType, e2[1].dims.length), w = N("output", e2[0].dataType, s2.length, d2), x = ($) => {
        let T = r2.length, C = `var indicesIndices${$}  = ${b.type.indices}(0);`;
        for (let A = 0; A < T; A++) C += `${T > 1 ? `indicesIndices${$}[${A}]` : `indicesIndices${$}`} = ${s2.length > 1 ? `outputIndices${$}[uniforms.axis + ${A}]` : `outputIndices${$}`};`;
        C += `
          var idx${$} = ${b.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;
        for (let A = 0, I = 0; A < o2; A++) A === a2 ? (C += `${o2 > 1 ? `dataIndices${$}[${A}]` : `dataIndices${$}`} = u32(idx${$});`, I += T) : (C += `${o2 > 1 ? `dataIndices${$}[${A}]` : `dataIndices${$}`} = ${s2.length > 1 ? `outputIndices${$}[${I}]` : `outputIndices${$}`};`, I++);
        return C;
      }, v;
      if (e2[0].dataType === 9) {
        let $ = (T, C, A = "") => `
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${x(C)};
          let offset${C} = ${_.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${T}[${C}] = ${A}(${_.getByOffset(`index${C}`)}[component${C}]);
        `;
        v = `
        let outputOffset = global_idx * ${d2};
        var value = vec4<u32>(0);
        ${$("value", 0, "u32")}
        ${$("value", 1, "u32")}
        ${$("value", 2, "u32")}
        ${$("value", 3, "u32")}
        ${w.setByOffset("global_idx", "value")}
      `;
      } else v = `
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx", "value")};
      `;
      return `
      ${g2.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(_, b, w)}
      ${g2.mainStart()}
        ${g2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`;
    };
    return { name: "Gather", shaderCache: { hint: t2.cacheKey, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: s2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(c2 / 64) }, programUniforms: m }), getShaderSource: f };
  }, Tl = (e2) => te({ axis: e2.axis }), Cl = (e2, t2) => {
    let n2 = e2.inputs;
    Lf(n2), e2.compute(Wf(e2.inputs, t2));
  };
});
var Gf;
var Al;
var El;
var kl = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Gf = (e2, t2, n2, r2, o2, a2, s2, u2, d2) => {
    let c2 = [{ type: 12, data: a2 }, { type: 12, data: r2 }, { type: 12, data: o2 }, { type: 12, data: n2 }, { type: 12, data: s2 }, { type: 12, data: u2 }, { type: 12, data: d2 }], m = [a2];
    c2.push(...W(t2.dims, m));
    let f = (g2) => {
      let _ = P("indices_data", t2.dataType, t2.dims.length), b = N("input_slice_offsets_data", 12, 1, 1), w = [_, b], x = [{ name: "output_size", type: "u32" }, { name: "batch_dims", type: "u32" }, { name: "input_dims", type: "u32", length: o2.length }, { name: "sizes_from_slice_dims_data", type: "u32", length: n2.length }, { name: "num_slices_per_batch", type: "u32" }, { name: "input_batch_stride", type: "u32" }, { name: "num_slice_dims", type: "u32" }];
      return `
  ${g2.registerUniforms(x).declareVariables(...w)}
  ${g2.mainStart()}
    ${g2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${o2.length === 1 ? "index += i32(uniforms.input_dims);" : "index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n2.length === 1 ? "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);" : "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`;
    };
    return e2.compute({ name: "computeSliceOffsets", shaderCache: { hint: `${o2.length}_${n2.length}`, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: m, dataType: e2.inputs[1].dataType }], dispatchGroup: { x: Math.ceil(a2 / 64) }, programUniforms: c2 }), getShaderSource: f }, { inputs: [t2], outputs: [-1] })[0];
  }, Al = (e2, t2) => {
    let n2 = e2.inputs, r2 = n2[0].dims, o2 = n2[0].dataType, a2 = n2[1].dims, s2 = a2[a2.length - 1], u2 = E.sizeToDimension(a2, a2.length - 1), d2 = E.sizeFromDimension(r2, t2.batchDims + s2), c2 = E.sizeToDimension(r2, t2.batchDims), m = E.sizeFromDimension(r2, t2.batchDims), f = u2 / c2, g2 = new Array(s2), _ = d2;
    for (let C = 0; C < s2; ++C) g2[s2 - 1 - C] = _, _ *= r2[t2.batchDims + s2 - 1 - C];
    let b = Gf(e2, n2[1], g2, t2.batchDims, r2, u2, f, m, s2), w = t2.batchDims + s2;
    if (w > r2.length) throw new Error("last dimension of indices must not be larger than rank of input tensor");
    let x = a2.slice(0, -1).concat(r2.slice(w)), v = E.size(x), $ = [{ type: 12, data: v }, { type: 12, data: d2 }, ...W(n2[0].dims, b.dims, x)], T = (C) => {
      let A = P("data", n2[0].dataType, n2[0].dims.length), I = P("slice_offsets", 12, b.dims.length), z = N("output", n2[0].dataType, x.length);
      return `
          ${C.registerUniform("output_size", "u32").registerUniform("slice_size", "u32").declareVariables(A, I, z)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`;
    };
    e2.compute({ name: "GatherND", shaderCache: { hint: t2.cacheKey, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: x, dataType: o2 }], dispatchGroup: { x: Math.ceil(v / 64) }, programUniforms: $ }), getShaderSource: T }, { inputs: [n2[0], b] });
  }, El = (e2) => ({ batchDims: e2.batch_dims, cacheKey: "" });
});
var Hf;
var Ff;
var Pl;
var Ol;
var zl = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Hf = (e2, t2) => {
    if (e2.length < 3 || e2.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");
    let n2 = E.normalizeAxis(t2.quantizeAxis, e2[0].dims.length), r2 = t2.blockSize, o2 = e2[0], a2 = e2[2], s2 = e2.length === 4 ? e2[3] : void 0;
    if (a2.dims.length !== o2.dims.length || !o2.dims.map((u2, d2) => d2 === n2 ? Math.ceil(u2 / r2) === a2.dims[d2] : u2 === a2.dims[d2]).reduce((u2, d2) => u2 && d2, true)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");
    if (s2) {
      if (s2.dataType !== o2.dataType) throw new Error("Zero point must have the same data type as the input tensor.");
      if (s2.dims.length !== a2.dims.length || !s2.dims.map((u2, d2) => u2 === a2.dims[d2]).reduce((u2, d2) => u2 && d2, true)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.");
    }
  }, Ff = (e2, t2) => {
    let n2 = e2[0].dims, r2 = e2[1].dims, o2 = n2.length, a2 = E.normalizeAxis(t2.gatherAxis, o2), s2 = E.normalizeAxis(t2.quantizeAxis, o2), u2 = n2.slice(0);
    u2.splice(a2, 1, ...r2);
    let d2 = E.size(u2), c2 = e2[2].dataType, f = e2[0].dataType === 22, g2 = [{ type: 12, data: d2 }, { type: 12, data: s2 }, { type: 12, data: a2 }, { type: 12, data: t2.blockSize }, ...W(...e2.map((b, w) => b.dims), u2)], _ = (b) => {
      let w = P("data", e2[0].dataType, e2[0].dims.length), x = P("inputIndices", e2[1].dataType, e2[1].dims.length), v = P("scales", e2[2].dataType, e2[2].dims.length), $ = e2.length > 3 ? P("zeroPoint", e2[3].dataType, e2[3].dims.length) : void 0, T = N("output", c2, u2.length), C = [w, x, v];
      $ && C.push($);
      let A = [{ name: "output_size", type: "u32" }, { name: "quantize_axis", type: "u32" }, { name: "gather_axis", type: "u32" }, { name: "block_size", type: "u32" }];
      return `
        ${b.registerUniforms(A).declareVariables(...C, T)}
        ${b.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${r2.length > 1 ? `
          for (var i: u32 = 0; i < ${r2.length}; i++) {
            let index = ${T.indicesGet("output_indices", "uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices", "i", "index")};
          }` : `indices_indices = ${T.indicesGet("output_indices", "uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${T.indicesGet("output_indices", "i")};
          ${w.indicesSet("data_indices", "i", "index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n2[a2]};
        }
        ${w.indicesSet("data_indices", "uniforms.gather_axis", "u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u2.length}; i++) {
          let index = ${T.indicesGet("output_indices", `i + ${r2.length} - 1`)};
          ${w.indicesSet("data_indices", "i", "index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${v.indicesGet("data_indices", "uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices", "uniforms.quantize_axis", "quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${$ ? `
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];` : "var zero_point = 0"};
        let dequantized_data = ${ke(c2)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx", "dequantized_data")};
    }`;
    };
    return { name: "GatherBlockQuantized", shaderCache: { hint: `${t2.cacheKey};${e2.filter((b, w) => w !== 1).map((b) => b.dims.join("_")).join(";")}`, inputDependencies: Array.from({ length: e2.length }, (b, w) => "rank") }, getRunData: () => ({ outputs: [{ dims: u2, dataType: c2 }], dispatchGroup: { x: Math.ceil(d2 / 64) }, programUniforms: g2 }), getShaderSource: _ };
  }, Pl = (e2, t2) => {
    let n2 = e2.inputs;
    Hf(n2, t2), e2.compute(Ff(e2.inputs, t2));
  }, Ol = (e2) => te({ blockSize: e2.blockSize, gatherAxis: e2.gatherAxis, quantizeAxis: e2.quantizeAxis });
});
var qf;
var jf;
var Dl;
var Bl;
var Ml = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  qf = (e2) => {
    if (!e2 || e2.length !== 2) throw new Error("GatherElements requires 2 inputs.");
    if (e2[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1.");
    if (e2[0].dims.length !== e2[1].dims.length) throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`);
  }, jf = (e2, t2) => {
    let n2 = e2[0].dims, r2 = e2[0].dataType, o2 = n2.length, a2 = e2[1].dims, s2 = e2[1].dataType, u2 = E.normalizeAxis(t2.axis, o2), d2 = n2[u2], c2 = a2.slice(0), m = E.size(c2), f = P("input", r2, o2), g2 = P("indicesInput", s2, a2.length), _ = N("output", r2, c2.length), b = [{ type: 12, data: m }, { type: 6, data: d2 }, { type: 12, data: u2 }];
    return b.push(...W(n2, a2, c2)), { name: "GatherElements", shaderCache: { inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: c2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(m / 64) }, programUniforms: b }), getShaderSource: (v) => `
      ${v.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(f, g2, _)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g2.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices", "uniforms.axis", "u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx", "value")};
  }` };
  }, Dl = (e2) => te({ axis: e2.axis }), Bl = (e2, t2) => {
    let n2 = e2.inputs;
    qf(n2), e2.compute(jf(e2.inputs, t2));
  };
});
var Kf;
var Zf;
var Rl;
var Ul;
var Nl = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Kf = (e2) => {
    if (!e2) throw new Error("Input is missing");
    if (e2.length < 2 || e2.length > 3) throw new Error("Invaid input number.");
    if (e2.length === 3 && e2[2].dims.length > 2) throw new Error("Invalid input shape of C");
    if (e2[0].dataType !== e2[1].dataType || e2.length === 3 && e2[0].dataType !== e2[2].dataType) throw new Error("Input types are mismatched");
  }, Zf = (e2, t2) => {
    let n2 = e2[0].dims.slice(), r2 = e2[1].dims.slice(), [o2, a2, s2] = Vr.getShapeOfGemmResult(n2, t2.transA, r2, t2.transB, e2.length === 3 ? e2[2].dims : void 0), u2 = [o2, a2];
    if (!u2) throw new Error("Can't use gemm on the given tensors");
    let d2 = 16, c2 = Math.ceil(a2 / d2), m = Math.ceil(o2 / d2), f = true, g2 = E.size(u2), _ = [{ type: 12, data: f ? c2 : g2 }, { type: 12, data: o2 }, { type: 12, data: a2 }, { type: 12, data: s2 }, { type: 1, data: t2.alpha }, { type: 1, data: t2.beta }], b = ["type", "type"];
    e2.length === 3 && (_.push(...W(e2[2].dims)), b.push("rank")), _.push(...W(u2));
    let w = (v) => {
      let $ = "";
      t2.transA && t2.transB ? $ = "value += a[k * uniforms.M + m] * b[n * uniforms.K + k];" : t2.transA && !t2.transB ? $ = "value += a[k * uniforms.M + m] * b[k * uniforms.N + n];" : !t2.transA && t2.transB ? $ = "value += a[m * uniforms.K + k] * b[n * uniforms.K + k];" : !t2.transA && !t2.transB && ($ = "value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");
      let T = t2.alpha === 1 ? "" : "value *= uniforms.alpha;", C = P("a", e2[0].dataType, e2[0].dims), A = P("b", e2[1].dataType, e2[1].dims), I = C.type.value, z = null, D = [C, A];
      e2.length === 3 && (z = P("c", e2[2].dataType, e2[2].dims.length), D.push(z));
      let R = N("output", e2[0].dataType, u2.length);
      D.push(R);
      let H = [{ name: "output_size", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }, { name: "alpha", type: "f32" }, { name: "beta", type: "f32" }];
      return `
  ${v.registerUniforms(H).declareVariables(...D)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${T}
    ${z != null ? `let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)", R)}; value += ${I}(uniforms.beta) * ${z.getByOffset("cOffset")};` : ""}
    output[global_idx] = value;
  }`;
    }, x = (v) => {
      let $ = P("a", e2[0].dataType, e2[0].dims), T = P("b", e2[1].dataType, e2[1].dims), C = null, A = [$, T];
      e2.length === 3 && (C = P("c", e2[2].dataType, e2[2].dims.length), A.push(C));
      let I = N("output", e2[0].dataType, u2.length);
      A.push(I);
      let z = [{ name: "num_tile_n", type: "u32" }, { name: "M", type: "u32" }, { name: "N", type: "u32" }, { name: "K", type: "u32" }, { name: "alpha", type: "f32" }, { name: "beta", type: "f32" }], D = "", R = "";
      t2.transA && t2.transB ? (R = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `, D = "value += tile_a[k][local_id.y] * tile_b[local_id.x][k];") : t2.transA && !t2.transB ? (R = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `, D = "value += tile_a[k][local_id.y] * tile_b[k][local_id.x];") : !t2.transA && t2.transB ? (R = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `, D = "value += tile_a[local_id.y][k] * tile_b[local_id.x][k];") : !t2.transA && !t2.transB && (R = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `, D = "value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");
      let H = t2.alpha === 1 ? "" : "value *= uniforms.alpha;";
      return `
  ${v.registerUniforms(z).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d2}>, ${d2}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d2}>, ${d2}>;
  ${v.mainStart([d2, d2, 1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d2};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d2};
    let num_tiles = (uniforms.K - 1) / ${d2} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${d2};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d2}; k++) {
        ${D}
      }
      workgroupBarrier();
    }

    ${H}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C != null ? `let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)", I)}; value += ${I.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};` : ""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`;
    };
    return f ? { name: "GemmShared", shaderCache: { hint: `${t2.cacheKey}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: u2, dataType: e2[0].dataType }], dispatchGroup: { x: c2 * m }, programUniforms: _ }), getShaderSource: x } : { name: "Gemm", shaderCache: { hint: `${t2.cacheKey}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: u2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(g2 / 64) }, programUniforms: _ }), getShaderSource: w };
  }, Rl = (e2) => {
    let t2 = e2.transA, n2 = e2.transB, r2 = e2.alpha, o2 = e2.beta;
    return { transA: t2, transB: n2, alpha: r2, beta: o2, cacheKey: `${e2.transA};${e2.transB};${e2.alpha === 1}` };
  }, Ul = (e2, t2) => {
    Kf(e2.inputs), e2.compute(Zf(e2.inputs, t2));
  };
});
var pt;
var Ct;
var Ft;
var qt;
var Qf;
var Yf;
var Xf;
var Jf;
var eh;
var th;
var rh;
var nh;
var Vl;
var Ll;
var Wl = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  [pt, Ct, Ft, qt] = [0, 1, 2, 3], Qf = (e2) => {
    if (e2[0].dims.length !== 4) throw new Error("only 4-D tensor is supported.");
    if (e2[0].dims.length !== e2[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions");
    if (e2[0].dims.length - 2 !== e2[1].dims[e2[1].dims.length - 1]) throw new Error(`last dimension of grid must be equal to ${e2[0].dims.length - 2}`);
    if (e2[0].dims[0] !== e2[1].dims[0]) throw new Error("grid batch size must match input batch size");
  }, Yf = `
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`, Xf = (e2) => `
  fn gs_bicubic_interpolate(p: mat4x4<${e2}>, x: f32, y: f32) -> ${e2} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e2}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`, Jf = (e2) => `
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e2.alignCorners === 0 ? `
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    ` : `
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`, eh = (e2) => `
  ${e2.paddingMode === "reflection" ? `
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }` : ""}
`, th = (e2, t2, n2) => `
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t2} {
     var pixel = ${t2}(0);
     var indices = vec4<u32>(0);
     indices[${pt}] = batch;
     indices[${Ct}] = channel;` + (() => {
    switch (n2.paddingMode) {
      case "zeros":
        return `
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ft}] = u32(r);
            indices[${qt}] = u32(c);
          } else {
            return ${t2}(0);
          }
        `;
      case "border":
        return `
          indices[${Ft}] = u32(clamp(r, 0, H - 1));
          indices[${qt}] = u32(clamp(c, 0, W - 1));
        `;
      case "reflection":
        return `
          indices[${Ft}] = gs_reflect(r, border[1], border[3]);
          indices[${qt}] = gs_reflect(c, border[0], border[2]);
        `;
      default:
        throw new Error(`padding mode ${n2.paddingMode} is not supported`);
    }
  })() + `
    return ${e2.getByIndices("indices")};
  }
`, rh = (e2, t2, n2) => (() => {
    switch (n2.mode) {
      case "nearest":
        return `
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${pt}], indices[${Ct}], border);
        `;
      case "bilinear":
        return `
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${pt}], indices[${Ct}], border);

          let dx2 = ${t2}(f32(x2) - x);
          let dx1 = ${t2}(x - f32(x1));
          let dy2 = ${t2}(f32(y2) - y);
          let dy1 = ${t2}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;
      case "bicubic":
        return `
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t2}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${pt}], indices[${Ct}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;
      default:
        throw new Error(`mode ${n2.mode} is not supported`);
    }
  })() + `${e2.setByOffset("global_idx", "result")}`, nh = (e2, t2) => {
    let n2 = P("x", e2[0].dataType, e2[0].dims.length), r2 = [e2[1].dims[0], e2[1].dims[1], e2[1].dims[2]], o2 = P("grid", e2[1].dataType, r2.length, 2), a2 = [e2[0].dims[0], e2[0].dims[1], e2[1].dims[1], e2[1].dims[2]];
    t2.format === "NHWC" && (a2 = [e2[0].dims[0], e2[1].dims[1], e2[1].dims[2], e2[0].dims[3]], [pt, Ct, Ft, qt] = [0, 3, 1, 2]);
    let s2 = N("output", e2[0].dataType, a2.length), u2 = n2.type.value, d2 = E.size(a2), c2 = [{ type: 12, data: d2 }, ...W(e2[0].dims, r2, a2)], m = (f) => `
  ${f.registerUniform("output_size", "u32").declareVariables(n2, o2, s2)}
  ${Yf}
  ${Xf(u2)}
  ${Jf(t2)}
  ${eh(t2)}
  ${th(n2, u2, t2)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ft}]);
      let W_in = i32(uniforms.x_shape[${qt}]);

      ${t2.alignCorners === 0 ? `
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      ` : `
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s2.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${pt}], indices[${Ft}], indices[${qt}]);
      let nxy = ${o2.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${rh(s2, u2, t2)}
  }`;
    return { name: "GridSample", shaderCache: { hint: `${t2.cacheKey}`, inputDependencies: ["type", "type"] }, getRunData: (f) => {
      let g2 = E.size(a2);
      return { outputs: [{ dims: a2, dataType: f[0].dataType }], dispatchGroup: { x: Math.ceil(g2 / 64) }, programUniforms: c2 };
    }, getShaderSource: m };
  }, Vl = (e2, t2) => {
    Qf(e2.inputs), e2.compute(nh(e2.inputs, t2));
  }, Ll = (e2) => te({ alignCorners: e2.align_corners, mode: e2.mode, paddingMode: e2.padding_mode, format: e2.format });
});
var Re;
var ah;
var Hl;
var Gl;
var sh;
var sr;
var Fl;
var Eo = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  qr();
  Yr();
  ue();
  ct();
  Re = (e2, t2) => e2.length > t2 && e2[t2].dims.length > 0 ? e2[t2] : void 0, ah = (e2, t2) => {
    let n2 = e2[0], r2 = Re(e2, 1), o2 = Re(e2, 2), a2 = Re(e2, 3), s2 = Re(e2, 4), u2 = Re(e2, 5), d2 = Re(e2, 6), c2 = Re(e2, 7);
    if (n2.dims.length !== 3 && n2.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
    let m = n2.dims[0], f = n2.dims[1], g2 = n2.dims.length === 3 ? n2.dims[2] : t2.numHeads * n2.dims[4], _ = f, b = 0, w = 0, x = Math.floor(g2 / t2.numHeads);
    if (d2 && c2 && E.size(d2.dims) && E.size(c2.dims)) {
      if (d2.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
      if (d2.dims[0] !== m || d2.dims[1] !== t2.numHeads || d2.dims[3] !== x) throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');
      if (c2.dims[0] !== m || c2.dims[1] !== t2.numHeads || c2.dims[3] !== x) throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');
      if (d2.dims[2] !== c2.dims[2]) throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');
      if (c2.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
      b = d2.dims[2], w = d2.dims[2];
    } else if (d2 && E.size(d2.dims) || c2 && E.size(c2.dims)) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
    let v;
    if (r2 && E.size(r2.dims) > 0) {
      if (n2.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
      if (r2.dims.length < 3 || r2.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
      if (n2.dims[0] !== r2.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
      if (r2.dims.length === 3) {
        if (r2.dims[2] !== n2.dims[2]) throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');
        v = 2, _ = r2.dims[1];
      } else if (r2.dims.length === 5) {
        if (r2.dims[2] !== t2.numHeads || r2.dims[3] !== 2 || r2.dims[4] !== x) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
        if (o2) throw new Error('Expect "value" be none when "key" has packed kv format.');
        v = 5, _ = r2.dims[1];
      } else {
        if (r2.dims[1] !== t2.numHeads || r2.dims[3] !== x) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
        v = 0, _ = r2.dims[2];
      }
    } else {
      if (n2.dims.length !== 5) throw new Error('Input "query" is expected to have 5 dimensions when key is empty');
      if (n2.dims[2] !== t2.numHeads || n2.dims[3] !== 3) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
      v = 3;
    }
    if (a2 && E.size(a2.dims) > 0) {
      if (a2.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimension');
      if (r2 && r2.dims.length === 5 && r2.dims[3] === 2) throw new Error("bias is not allowed for packed kv.");
    }
    let $ = b + _, T = 0;
    if (s2 && E.size(s2.dims) > 0) {
      T = 8;
      let z = s2.dims;
      throw z.length === 1 ? z[0] === m ? T = 1 : z[0] === 3 * m + 2 && (T = 3) : z.length === 2 && z[0] === m && z[1] === $ && (T = 5), T === 8 ? new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)') : new Error("Mask not supported");
    }
    let C = false, A = g2;
    if (o2 && E.size(o2.dims) > 0) {
      if (o2.dims.length !== 3 && o2.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
      if (n2.dims[0] !== o2.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
      if (o2.dims.length === 3) {
        if (_ !== o2.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
        A = o2.dims[2];
      } else {
        if (_ !== o2.dims[2]) throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');
        A = o2.dims[1] * o2.dims[3], C = true;
      }
    }
    let I = false;
    if (s2 && E.size(s2.dims) > 0) throw new Error("Key padding mask is not supported");
    if (u2 && E.size(u2.dims) > 0) {
      if (u2.dims.length !== 4) throw new Error('Input "attention_bias" is expected to have 4 dimensions');
      if (u2.dims[0] !== m || u2.dims[1] !== t2.numHeads || u2.dims[2] !== f || u2.dims[3] !== $) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
    }
    return { batchSize: m, sequenceLength: f, pastSequenceLength: b, kvSequenceLength: _, totalSequenceLength: $, maxSequenceLength: w, inputHiddenSize: 0, hiddenSize: g2, vHiddenSize: A, headSize: x, vHeadSize: Math.floor(A / t2.numHeads), numHeads: t2.numHeads, isUnidirectional: false, pastPresentShareBuffer: false, maskFilterValue: t2.maskFilterValue, maskType: T, scale: t2.scale, broadcastResPosBias: I, passPastInKv: C, qkvFormat: v };
  }, Hl = (e2) => te({ ...e2 }), Gl = te({ perm: [0, 2, 1, 3] }), sh = (e2, t2, n2, r2, o2, a2, s2) => {
    let u2 = [r2, o2, a2], d2 = E.size(u2), c2 = [{ type: 12, data: d2 }, { type: 12, data: s2 }, { type: 12, data: a2 }], m = (f) => {
      let g2 = N("qkv_with_bias", t2.dataType, u2), _ = P("qkv", t2.dataType, u2), b = P("bias", n2.dataType, u2), w = [{ name: "output_size", type: "u32" }, { name: "bias_offset", type: "u32" }, { name: "hidden_size", type: "u32" }];
      return `
  ${f.registerUniforms(w).declareVariables(_, b, g2)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`;
    };
    return e2.compute({ name: "MultiHeadAttentionAddBias", shaderCache: { inputDependencies: ["type", "type"] }, getRunData: () => ({ outputs: [{ dims: u2, dataType: t2.dataType, gpuDataType: 0 }], dispatchGroup: { x: Math.ceil(d2 / 64) }, programUniforms: c2 }), getShaderSource: m }, { inputs: [t2, n2], outputs: [-1] })[0];
  }, sr = (e2, t2, n2, r2, o2, a2, s2, u2) => {
    let d2 = a2;
    if (s2 && E.size(s2.dims) > 0) {
      if (r2 === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");
      return d2 = sh(e2, a2, s2, t2, r2, n2 * o2, u2), d2 = d2.reshape([t2, r2, n2, o2]), n2 === 1 || r2 === 1 ? d2 : e2.compute(Pe(d2, Gl.perm), { inputs: [d2], outputs: [-1] })[0];
    } else return a2.dims.length === 3 && (d2 = a2.reshape([t2, r2, n2, o2])), n2 === 1 || r2 === 1 ? d2 : e2.compute(Pe(d2, Gl.perm), { inputs: [d2], outputs: [-1] })[0];
  }, Fl = (e2, t2) => {
    let n2 = ah(e2.inputs, t2), r2 = e2.inputs[0], o2 = Re(e2.inputs, 1), a2 = Re(e2.inputs, 2), s2 = Re(e2.inputs, 3), u2 = Re(e2.inputs, 4), d2 = Re(e2.inputs, 5), c2 = Re(e2.inputs, 6), m = Re(e2.inputs, 7);
    if (r2.dims.length === 5) throw new Error("Packed QKV is not implemented");
    if (o2?.dims.length === 5) throw new Error("Packed KV is not implemented");
    let f = o2 && a2 && o2.dims.length === 4 && a2.dims.length === 4, g2 = sr(e2, n2.batchSize, n2.numHeads, n2.sequenceLength, n2.headSize, r2, s2, 0);
    if (f) return Ht(e2, g2, o2, a2, u2, void 0, c2, m, d2, n2);
    if (!o2 || !a2) throw new Error("key and value must be provided");
    let _ = sr(e2, n2.batchSize, n2.numHeads, n2.kvSequenceLength, n2.headSize, o2, s2, n2.hiddenSize), b = sr(e2, n2.batchSize, n2.numHeads, n2.kvSequenceLength, n2.vHeadSize, a2, s2, 2 * n2.hiddenSize);
    Ht(e2, g2, _, b, u2, void 0, c2, m, d2, n2);
  };
});
var uh;
var lh;
var dh;
var ch;
var ko;
var ql;
var jl;
var Po = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  uh = (e2) => {
    if (!e2 || e2.length < 1) throw new Error("too few inputs");
  }, lh = (e2, t2) => {
    let n2 = [], r2 = t2.numOutputs;
    return e2[1].dims[0] > 0 && (e2[1].getBigInt64Array().forEach((o2) => n2.push(Number(o2))), r2 = n2.length), te({ numOutputs: r2, axis: t2.axis, splitSizes: n2 });
  }, dh = (e2) => `
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e2}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis", "i", e2)}) {
        return i;
    }
    }
    return ${e2}u;
}`, ch = (e2) => {
    let t2 = e2.length, n2 = [];
    for (let r2 = 0; r2 < t2; ++r2) {
      let o2 = e2[r2].setByIndices("indices", "input[global_idx]");
      t2 === 1 ? n2.push(o2) : r2 === 0 ? n2.push(`if (output_number == ${r2}u) { ${o2} }`) : r2 === t2 - 1 ? n2.push(`else { ${o2} }`) : n2.push(`else if (output_number == ${r2}) { ${o2} }`);
    }
    return `
      fn writeBufferData(output_number: u32, indices: ${e2[0].type.indices}, global_idx: u32) {
        ${n2.join(`
`)}
      }`;
  }, ko = (e2, t2) => {
    let n2 = e2[0].dims, r2 = E.size(n2), o2 = e2[0].dataType, a2 = E.normalizeAxis(t2.axis, n2.length), s2 = new Array(t2.numOutputs), u2 = P("input", o2, n2.length), d2 = new Array(t2.numOutputs), c2 = [], m = [], f = 0, g2 = [{ type: 12, data: r2 }];
    for (let b = 0; b < t2.numOutputs; b++) {
      f += t2.splitSizes[b], d2[b] = f;
      let w = n2.slice();
      w[a2] = t2.splitSizes[b], m.push(w), s2[b] = N(`output${b}`, o2, w.length), c2.push({ dims: m[b], dataType: e2[0].dataType });
    }
    g2.push({ type: 12, data: d2 }, ...W(n2, ...m));
    let _ = (b) => `
  ${b.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", d2.length).declareVariables(u2, ...s2)}
  ${dh(d2.length)}
  ${ch(s2)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u2.offsetToIndices("global_idx")};
    var index = ${u2.indicesGet("indices", a2)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis", "output_number - 1u", d2.length)};
      ${u2.indicesSet("indices", a2, "index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;
    return { name: "Split", shaderCache: { hint: t2.cacheKey, inputDependencies: ["rank"] }, getShaderSource: _, getRunData: () => ({ outputs: c2, dispatchGroup: { x: Math.ceil(r2 / 64) }, programUniforms: g2 }) };
  }, ql = (e2, t2) => {
    uh(e2.inputs);
    let n2 = e2.inputs.length === 1 ? t2 : lh(e2.inputs, t2);
    e2.compute(ko(e2.inputs, n2), { inputs: [0] });
  }, jl = (e2) => {
    let t2 = e2.axis, n2 = e2.splitSizes, r2 = e2.numOutputs < 0 ? n2.length : e2.numOutputs;
    if (r2 !== n2.length) throw new Error("numOutputs and splitSizes length must be equal");
    return te({ axis: t2, numOutputs: r2, splitSizes: n2 });
  };
});
var ph;
var un;
var Kl;
var Oo = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  ph = (e2, t2) => {
    let [n2, r2, o2, a2] = e2, { numHeads: s2, rotaryEmbeddingDim: u2 } = t2;
    if (n2.dims.length !== 3 && n2.dims.length !== 4) throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n2.dims.length}`);
    if (!E.areEqual(r2.dims, []) && !E.areEqual(r2.dims, [1]) && r2.dims.length !== 2) throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r2.dims.length}`);
    if (o2.dims.length !== 2) throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o2.dims.length}`);
    if (a2.dims.length !== 2) throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a2.dims.length}`);
    if (!E.areEqual(o2.dims, a2.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");
    if (u2 > 0 && s2 === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified");
    let d2 = n2.dims[0], c2 = n2.dims[n2.dims.length - 2], m = o2.dims[0], f = E.sizeFromDimension(n2.dims, 1) / c2, g2 = u2 === 0 ? o2.dims[1] * 2 : f / s2;
    if (u2 > g2) throw new Error("rotary_embedding_dim must be less than or equal to head_size");
    if (r2.dims.length === 2) {
      if (d2 !== r2.dims[0]) throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r2.dims[0]}`);
      if (c2 !== r2.dims[1]) throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r2.dims[1]}`);
    }
    if (g2 / 2 !== o2.dims[1] && u2 / 2 !== o2.dims[1]) throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o2.dims[1]}`);
    if (c2 > m) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");
  }, un = (e2, t2) => {
    let { interleaved: n2, numHeads: r2, rotaryEmbeddingDim: o2, scale: a2 } = t2, s2 = e2[0].dims[0], u2 = E.sizeFromDimension(e2[0].dims, 1), d2 = e2[0].dims[e2[0].dims.length - 2], c2 = u2 / d2, m = e2[2].dims[1], f = o2 === 0 ? m * 2 : c2 / r2, g2 = new Array(s2, d2, c2 / f, f - m), _ = E.computeStrides(g2), b = [{ type: 1, data: a2 }, { type: 12, data: g2 }, { type: 12, data: _ }, ...e2[0].dims.length === 3 ? new Array({ type: 12, data: [u2, c2, f, 1] }) : [], ...e2[0].dims.length === 4 ? new Array({ type: 12, data: [u2, f, d2 * f, 1] }) : [], ...W(e2[0].dims, e2[1].dims, e2[2].dims, e2[3].dims, e2[0].dims)], w = (x) => {
      let v = P("input", e2[0].dataType, e2[0].dims.length), $ = P("position_ids", e2[1].dataType, e2[1].dims.length), T = P("cos_cache", e2[2].dataType, e2[2].dims.length), C = P("sin_cache", e2[3].dataType, e2[3].dims.length), A = N("output", e2[0].dataType, e2[0].dims.length);
      return x.registerUniforms([{ name: "scale", type: "f32" }, { name: "global_shape", type: "u32", length: g2.length }, { name: "global_strides", type: "u32", length: _.length }, { name: "input_output_strides", type: "u32", length: _.length }]), `
        ${x.declareVariables(v, $, T, C, A)}

        ${x.mainStart(Bt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy", N("", $.type.tensor, 2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n2});
            let j = i + select(half_rotary_emb_dim, 1, ${n2});
            let re = ${v.getByOffset("i")} * ${T.get("position_id", "bsnh[3]")} -
                ${v.getByOffset("j")} * ${C.get("position_id", "bsnh[3]")};
            ${A.setByOffset("i", "re")}
            let im = ${v.getByOffset("i")} * ${C.get("position_id", "bsnh[3]")} +
                ${v.getByOffset("j")} * ${T.get("position_id", "bsnh[3]")};
            ${A.setByOffset("j", "im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k", v.getByOffset("k"))}
          }
        }`;
    };
    return { name: "RotaryEmbedding", shaderCache: { hint: te({ interleaved: n2 }).cacheKey, inputDependencies: ["rank", "rank", "rank", "rank"] }, getShaderSource: w, getRunData: () => ({ outputs: [{ dims: e2[0].dims, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(E.size(g2) / Bt) }, programUniforms: b }) };
  }, Kl = (e2, t2) => {
    ph(e2.inputs, t2), e2.compute(un(e2.inputs, t2));
  };
});
var mh;
var fh;
var Zl;
var hh;
var Ql;
var Yl = L(() => {
  "use strict";
  Se();
  ee();
  Yr();
  Eo();
  Po();
  ct();
  Oo();
  ue();
  mh = (e2, t2) => {
    if (t2.doRotary && e2.length <= 7) throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");
    let n2 = e2[0], r2 = e2[1], o2 = e2[2], a2 = e2[3], s2 = e2[4];
    if (t2.doRotary !== 0 && e2.length <= 7) throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");
    if (t2.localWindowSize !== -1) throw new Error("Local attention is not supported");
    if (t2.softcap !== 0) throw new Error("Softcap is not supported");
    if (t2.rotaryInterleaved !== 0) throw new Error("Rotary interleaved is not supported");
    if (t2.smoothSoftmax) throw new Error("Smooth softmax is not supported");
    if (n2.dims.length !== 3 && n2.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
    let u2 = false, d2 = n2.dims[0], c2 = n2.dims[1], m = n2.dims.length === 3 ? u2 ? n2.dims[2] / 3 : n2.dims[2] : t2.numHeads * n2.dims[4], f = c2, g2 = 0, _ = !r2 || r2.dims.length === 0, b = Math.floor(_ ? m / (t2.numHeads + 2 * t2.kvNumHeads) : m / t2.numHeads);
    _ && (m = b * t2.numHeads);
    let w = a2 && a2.dims.length !== 0, x = s2 && s2.dims.length !== 0;
    if (w && a2.dims.length === 4 && a2.dims[0] === d2 && a2.dims[1] !== t2.kvNumHeads && a2.dims[2] === t2.kvNumHeads && a2.dims[3] === b) throw new Error("BSNH pastKey/pastValue is not supported");
    if (w && x) {
      if (a2.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
      if (s2.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
      g2 = a2.dims[2];
    } else if (w || x) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
    let $ = 1;
    if (r2 && r2.dims.length > 0) {
      if (n2.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
      if (r2.dims.length < 3 || r2.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
      if (n2.dims[0] !== r2.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
      if (r2.dims.length === 3) {
        if (n2.dims[2] % r2.dims[2] !== 0) throw new Error('Dimension 2 of "query" should be a multiple of "key"');
        f = r2.dims[1];
      } else if (r2.dims.length === 5) {
        if (r2.dims[2] !== t2.numHeads || r2.dims[3] !== 2 || r2.dims[4] !== b) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
        if (o2) throw new Error('Expect "value" be none when "key" has packed kv format.');
        f = r2.dims[1];
      } else {
        if (r2.dims[1] !== t2.numHeads || r2.dims[3] !== b) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
        f = r2.dims[2];
      }
    } else {
      if (n2.dims.length !== 3 && n2.dims.length !== 5) throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');
      if (n2.dims.length === 5 && (n2.dims[2] !== t2.numHeads || n2.dims[3] !== 3)) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
      $ = 3;
    }
    let T = 0, C = false, A = t2.kvNumHeads ? b * t2.kvNumHeads : m;
    if (o2 && o2.dims.length > 0) {
      if (o2.dims.length !== 3 && o2.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
      if (n2.dims[0] !== o2.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
      if (o2.dims.length === 3) {
        if (f !== o2.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
        A = o2.dims[2];
      } else {
        if (f !== o2.dims[2]) throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');
        A = o2.dims[1] * o2.dims[3], C = true;
      }
    }
    let I = e2.length > 4 ? e2[5] : void 0;
    if (I && I.dims.length !== 1 && I.dims[0] !== d2) throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');
    return { batchSize: d2, sequenceLength: c2, pastSequenceLength: g2, kvSequenceLength: f, totalSequenceLength: -1, maxSequenceLength: -1, inputHiddenSize: 0, hiddenSize: m, vHiddenSize: A, headSize: b, vHeadSize: Math.floor(A / t2.kvNumHeads), numHeads: t2.numHeads, kvNumHeads: t2.kvNumHeads, nReps: t2.numHeads / t2.kvNumHeads, pastPresentShareBuffer: false, maskType: T, scale: t2.scale, broadcastResPosBias: false, passPastInKv: C, qkvFormat: $ };
  }, fh = te({ perm: [0, 2, 1, 3] }), Zl = (e2, t2, n2) => {
    let r2 = t2, o2 = n2.kvNumHeads;
    return t2.dims.length === 3 && n2.kvSequenceLength !== 0 && (r2 = t2.reshape([n2.batchSize, n2.kvSequenceLength, o2, n2.headSize]), r2 = e2.compute(Pe(r2, fh.perm), { inputs: [r2], outputs: [-1] })[0]), r2;
  }, hh = (e2, t2, n2, r2) => {
    let o2 = 7, a2 = ["type", "type"], s2 = [e2 * t2], u2 = e2 * t2, d2 = [{ type: 12, data: u2 }, { type: 12, data: t2 }, { type: 12, data: e2 }], c2 = (m) => {
      let f = P("seq_lens", n2.dataType, n2.dims), g2 = P("total_seq_lens", r2.dataType, r2.dims), _ = N("pos_ids", o2, s2), b = [{ name: "output_size", type: "u32" }, { name: "sequence_length", type: "u32" }, { name: "batch_size", type: "u32" }];
      return `
  ${m.registerUniforms(b).declareVariables(f, g2, _)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g2.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx", "pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx", "pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx", "seqlen")}
    };
  }
  `;
    };
    return { name: "GeneratePositionIds", shaderCache: { hint: `${e2};${t2}`, inputDependencies: a2 }, getRunData: () => ({ outputs: [{ dims: s2, dataType: o2 }], dispatchGroup: { x: Math.ceil(u2 / 64) }, programUniforms: d2 }), getShaderSource: c2 };
  }, Ql = (e2, t2) => {
    let n2 = mh(e2.inputs, t2);
    if (e2.inputs[0].dims.length === 5) throw new Error("Packed QKV is not implemented");
    if (e2.inputs[1]?.dims.length === 5) throw new Error("Packed KV is not implemented");
    let r2 = e2.inputs[0], o2 = e2.inputs[1] && e2.inputs[1].dims.length > 0 ? e2.inputs[1] : void 0, a2 = e2.inputs[2] && e2.inputs[2].dims.length > 0 ? e2.inputs[2] : void 0, s2 = e2.inputs[3] && e2.inputs[3].dims.length !== 0 ? e2.inputs[3] : void 0, u2 = e2.inputs[4] && e2.inputs[4].dims.length !== 0 ? e2.inputs[4] : void 0, d2 = e2.inputs.length > 4 ? e2.inputs[5] : void 0, c2 = e2.inputs.length > 5 ? e2.inputs[6] : void 0, m = n2.kvNumHeads ? n2.kvNumHeads : n2.numHeads, f = te({ axis: 2, numOutputs: 3, splitSizes: [n2.numHeads * n2.headSize, m * n2.headSize, m * n2.headSize] }), [g2, _, b] = !o2 && !a2 ? e2.compute(ko([r2], f), { inputs: [r2], outputs: [-1, -1, -1] }) : [r2, o2, a2], w, x;
    if (t2.doRotary) {
      let C = e2.compute(hh(n2.batchSize, n2.sequenceLength, d2, c2), { inputs: [d2, c2], outputs: [-1] })[0], A = e2.inputs[7], I = e2.inputs[8], z = te({ interleaved: t2.rotaryInterleaved !== 0, numHeads: n2.numHeads, rotaryEmbeddingDim: 0, scale: t2.scale }), D = [g2, C, A, I], R = [-1];
      w = e2.compute(un(D, z), { inputs: D, outputs: R })[0], D.splice(0, 1, _);
      let H = te({ interleaved: t2.rotaryInterleaved !== 0, numHeads: n2.kvNumHeads, rotaryEmbeddingDim: 0, scale: t2.scale });
      x = e2.compute(un(D, H), { inputs: D, outputs: R })[0];
    }
    let v = sr(e2, n2.batchSize, n2.numHeads, n2.sequenceLength, n2.headSize, t2.doRotary ? w : g2, void 0, 0), $ = Zl(e2, t2.doRotary ? x : _, n2), T = Zl(e2, b, n2);
    Ht(e2, v, $, T, void 0, void 0, s2, u2, void 0, n2, d2, c2);
  };
});
var Xl;
var gh;
var yh;
var Jl;
var ed = L(() => {
  "use strict";
  ee();
  ae();
  ct();
  ue();
  Xl = (e2, t2, n2, r2, o2, a2, s2, u2) => {
    let d2 = he(a2), c2 = d2 === 1 ? "f32" : `vec${d2}f`, m = d2 === 1 ? "vec2f" : `mat2x${d2}f`, f = o2 * s2, g2 = 64;
    f === 1 && (g2 = 256);
    let _ = [o2, s2, a2 / d2], b = [o2, s2, 2], w = ["rank", "type", "type"], x = [];
    x.push(...W(_, b));
    let v = ($) => {
      let T = P("x", t2.dataType, 3, d2), C = P("scale", n2.dataType, n2.dims), A = P("bias", r2.dataType, r2.dims), I = N("output", 1, 3, 2), z = [T, C, A, I];
      return `
  var<workgroup> workgroup_shared : array<${m}, ${g2}>;
  const workgroup_size = ${g2}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(g2)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c2}(0);
    var squared_sum = ${c2}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c2}(${T.get("batch", "channel", "h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${je("workgroup_shared[0][0]", d2)} / f32(hight * ${d2});
      let squared_sum_final = ${je("workgroup_shared[0][1]", d2)} / f32(hight * ${d2});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u2}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`;
    };
    return e2.compute({ name: "InstanceNormComputeChannelScaleShift", shaderCache: { hint: `${d2};${u2};${g2}`, inputDependencies: w }, getRunData: () => ({ outputs: [{ dims: b, dataType: 1 }], dispatchGroup: { x: f }, programUniforms: x }), getShaderSource: v }, { inputs: [t2, n2, r2], outputs: [-1] })[0];
  }, gh = (e2, t2, n2) => {
    let r2 = t2[0].dims, o2 = r2, a2 = 2, s2 = r2[0], u2 = r2[1], d2 = E.sizeFromDimension(r2, a2), c2 = he(d2), m = E.size(o2) / c2, f = Xl(e2, t2[0], t2[1], t2[2], s2, d2, u2, n2.epsilon), g2 = [s2, u2, d2 / c2], _ = [s2, u2], b = ["type", "none"], w = (x) => {
      let v = P("x", t2[0].dataType, g2.length, c2), $ = P("scale_shift", 1, _.length, 2), T = N("output", t2[0].dataType, g2.length, c2), C = [v, $, T];
      return `
  ${x.registerUniform("output_size", "u32").declareVariables(...C)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx", "value")};
  }`;
    };
    e2.compute({ name: "InstanceNormalization", shaderCache: { hint: `${c2}`, inputDependencies: b }, getRunData: () => ({ outputs: [{ dims: o2, dataType: t2[0].dataType }], dispatchGroup: { x: Math.ceil(m / 64) }, programUniforms: [{ type: 12, data: m }, ...W(g2, _, g2)] }), getShaderSource: w }, { inputs: [t2[0], f] });
  }, yh = (e2, t2, n2) => {
    let r2 = t2[0].dims, o2 = r2, a2 = r2[0], s2 = r2[r2.length - 1], u2 = E.sizeFromDimension(r2, 1) / s2, d2 = he(s2), c2 = E.size(o2) / d2, m = [{ type: 12, data: u2 }, { type: 12, data: Math.floor(s2 / d2) }], f = ["type", "type"], g2 = false, _ = [0, r2.length - 1];
    for (let v = 0; v < r2.length - 2; v++) g2 = g2 || r2[v + 1] !== 1, _.push(v + 1);
    g2 = g2 && r2[r2.length - 1] !== 1;
    let b = g2 ? e2.compute(Pe(e2.inputs[0], _), { inputs: [e2.inputs[0]], outputs: [-1] })[0] : e2.inputs[0].reshape(Array.from({ length: r2.length }, (v, $) => r2[_[$]])), w = Xl(e2, b, t2[1], t2[2], a2, u2, s2, n2.epsilon), x = (v) => {
      let $ = ve(t2[0].dataType), T = d2 === 1 ? "vec2f" : `mat${d2}x2f`, C = (z) => {
        let D = z === 0 ? "x" : "y", R = d2 === 1 ? "f32" : `vec${d2}f`;
        switch (d2) {
          case 1:
            return `${$}(${R}(scale.${D}))`;
          case 2:
            return `vec2<${$}>(${R}(scale[0].${D}, scale[1].${D}))`;
          case 4:
            return `vec4<${$}>(${R}(scale[0].${D}, scale[1].${D}, scale[2].${D}, scale[3].${D}))`;
          default:
            throw new Error(`Not supported compoents ${d2}`);
        }
      }, A = P("input", t2[0].dataType, t2[0].dims, d2), I = N("output", t2[0].dataType, o2, d2);
      return `
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`;
    };
    e2.compute({ name: "InstanceNormalizationNHWC", shaderCache: { hint: `${d2}`, inputDependencies: f }, getRunData: () => ({ outputs: [{ dims: o2, dataType: t2[0].dataType }], dispatchGroup: { x: Math.ceil(c2 / 64) }, programUniforms: m }), getShaderSource: x }, { inputs: [t2[0], w] });
  }, Jl = (e2, t2) => {
    t2.format === "NHWC" ? yh(e2, e2.inputs, t2) : gh(e2, e2.inputs, t2);
  };
});
var bh;
var _h;
var td;
var rd = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  bh = (e2) => {
    if (!e2 || e2.length < 2) throw new Error("layerNorm requires at least 2 inputs.");
  }, _h = (e2, t2, n2) => {
    let r2 = t2.simplified, o2 = e2[0].dims, a2 = e2[1], s2 = !r2 && e2[2], u2 = o2, d2 = E.normalizeAxis(t2.axis, o2.length), c2 = E.sizeToDimension(o2, d2), m = E.sizeFromDimension(o2, d2), f = E.size(a2.dims), g2 = s2 ? E.size(s2.dims) : 0;
    if (f !== m || s2 && g2 !== m) throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g2}`);
    let _ = [];
    for (let A = 0; A < o2.length; ++A) A < d2 ? _.push(o2[A]) : _.push(1);
    let b = he(m), w = ["type", "type"], x = [{ type: 12, data: c2 }, { type: 1, data: m }, { type: 12, data: Math.floor(m / b) }, { type: 1, data: t2.epsilon }];
    s2 && w.push("type");
    let v = n2 > 1, $ = n2 > 2, T = (A) => {
      let I = ve(e2[0].dataType), z = [P("x", e2[0].dataType, e2[0].dims, b), P("scale", a2.dataType, a2.dims, b)];
      s2 && z.push(P("bias", s2.dataType, s2.dims, b)), z.push(N("output", e2[0].dataType, u2, b)), v && z.push(N("mean_data_output", 1, _)), $ && z.push(N("inv_std_output", 1, _));
      let D = [{ name: "norm_count", type: "u32" }, { name: "norm_size", type: "f32" }, { name: "norm_size_vectorized", type: "u32" }, { name: "epsilon", type: "f32" }];
      return `
  ${A.registerUniforms(D).declareVariables(...z)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${fo("f32", b)};
    var mean_square_vector = ${fo("f32", b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Mt(I, b, "x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${je("mean_vector", b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${je("mean_square_vector", b)} / uniforms.norm_size ${r2 ? "" : "- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Mt(I, b, "x[j + offset]")};
      let f32scale = ${Mt(I, b, "scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${r2 ? "" : "- mean"}) * inv_std_dev * f32scale
        ${s2 ? `+ ${Mt(I, b, "bias[j]")}` : ""}
      );
    }

    ${v ? "mean_data_output[global_idx] = mean" : ""};
    ${$ ? "inv_std_output[global_idx] = inv_std_dev" : ""};
  }`;
    }, C = [{ dims: u2, dataType: e2[0].dataType }];
    return v && C.push({ dims: _, dataType: 1 }), $ && C.push({ dims: _, dataType: 1 }), { name: "LayerNormalization", shaderCache: { hint: `${b};${n2};${r2}`, inputDependencies: w }, getRunData: () => ({ outputs: C, dispatchGroup: { x: Math.ceil(c2 / 64) }, programUniforms: x }), getShaderSource: T };
  }, td = (e2, t2) => {
    bh(e2.inputs), e2.compute(_h(e2.inputs, t2, e2.outputCount));
  };
});
var wh;
var nd;
var od = L(() => {
  "use strict";
  ae();
  nn();
  on();
  wh = (e2) => {
    if (!e2 || e2.length !== 2) throw new Error("MatMul requires 2 inputs.");
    if (e2[0].dims[e2[0].dims.length - 1] !== e2[1].dims[e2[1].dims.length - 2]) throw new Error("shared dimension does not match.");
  }, nd = (e2) => {
    wh(e2.inputs);
    let t2 = tt.calcShape(e2.inputs[0].dims, e2.inputs[1].dims, true);
    if (!t2) throw new Error("Can't use matmul on the given tensors");
    let n2 = t2[t2.length - 1], r2 = e2.inputs[0].dims[e2.inputs[0].dims.length - 1];
    if (n2 < 8 && r2 < 8) e2.compute(rn(e2.inputs, { activation: "" }, t2));
    else {
      let o2 = t2[t2.length - 2], a2 = E.size(e2.inputs[0].dims.slice(0, -2)), s2 = E.size(e2.inputs[1].dims.slice(0, -2));
      if (a2 !== 1 && o2 === 1 && s2 === 1) {
        let u2 = e2.inputs[0].reshape([1, a2, r2]), d2 = e2.inputs[1].reshape([1, r2, n2]), c2 = [1, a2, n2], m = [u2, d2];
        e2.compute(ar(m, { activation: "" }, t2, c2), { inputs: m });
      } else e2.compute(ar(e2.inputs, { activation: "" }, t2));
    }
  };
});
var vh;
var $h;
var xh;
var id;
var ad;
var sd = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  vh = (e2, t2) => {
    if (e2.length < 3 || e2.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs");
    let n2 = e2[0], r2 = n2.dims.length;
    if (n2.dims[r2 - 1] !== t2.k) throw new Error("The last dim of input shape does not match the k value");
    let o2 = Math.floor((t2.k + t2.blockSize - 1) / t2.blockSize), a2 = t2.blockSize / 8 * t2.bits, s2 = e2[1];
    if (!E.areEqual(s2.dims, [t2.n, o2, a2])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");
    let d2 = e2[2].dims;
    if (E.size(d2) !== t2.n * o2) throw new Error("scales input size error.");
    if (e2.length === 4) {
      let m = e2[3].dims, f = t2.n * (t2.bits === 8 ? o2 : Math.floor((o2 * t2.bits + 7) / 8));
      if (E.size(m) !== f) throw new Error("zeroPoints input size error.");
    }
  }, $h = (e2, t2) => {
    let n2 = e2[0].dims, r2 = n2.length, o2 = n2[r2 - 2], a2 = t2.k, s2 = t2.n, u2 = n2.slice(0, r2 - 2), d2 = E.size(u2), m = e2[1].dims[2] / 4, f = e2[0].dataType, g2 = he(t2.k), _ = he(m), b = he(s2), w = u2.concat([o2, s2]), x = o2 > 1 && s2 / b % 2 === 0 ? 2 : 1, v = E.size(w) / b / x, $ = 64, T = [], C = [d2, o2, a2 / g2], A = E.convertShape(e2[1].dims).slice();
    A.splice(-1, 1, m / _), T.push(...W(C)), T.push(...W(A)), T.push(...W(e2[2].dims)), e2.length === 4 && T.push(...W(E.convertShape(e2[3].dims)));
    let I = [d2, o2, s2 / b];
    T.push(...W(I));
    let z = (D) => {
      let R = C.length, H = P("a", e2[0].dataType, R, g2), q = P("b", 12, A.length, _), Y = P("scales", e2[2].dataType, e2[2].dims.length), ne = [H, q, Y], F = e2.length === 4 ? P("zero_points", 12, e2[3].dims.length) : void 0;
      F && ne.push(F);
      let me = I.length, oe = N("output", e2[0].dataType, me, b), j = ve(e2[0].dataType), ie = (() => {
        switch (g2) {
          case 1:
            return `array<${j}, 8>`;
          case 2:
            return `mat4x2<${j}>`;
          case 4:
            return `mat2x4<${j}>`;
          default:
            throw new Error(`${g2}-component is not supported.`);
        }
      })(), Z = () => {
        let pe = `
          // reuse a data
            var input_offset = ${H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8 / g2}; j++) {
              a_data[j] = ${H.getByOffset("input_offset")};
              input_offset++;
            }
          `;
        for (let J = 0; J < b * x; J++) pe += `
            b_value = ${_ === 1 ? `b${J}_data` : `b${J}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({ length: 4 }, (V, O) => `${j}(b_value_lower[${O}]), ${j}(b_value_upper[${O}])`).join(", ")});
            b_dequantized_values = ${g2 === 1 ? `${ie}(${Array.from({ length: 8 }, (V, O) => `(b_quantized_values[${O}] - ${F ? `zero_point${J}` : "zero_point"}) * scale${J}`).join(", ")});` : `(b_quantized_values - ${ie}(${Array(8).fill(`${F ? `zero_point${J}` : "zero_point"}`).join(",")})) * scale${J};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(J / b)}]${b > 1 ? `[${J % b}]` : ""} += ${Array.from({ length: 8 / g2 }, (V, O) => `${g2 === 1 ? `a_data[${O}] * b_dequantized_values[${O}]` : `dot(a_data[${O}], b_dequantized_values[${O}])`}`).join(" + ")};
          `;
        return pe;
      }, ce = () => {
        let pe = `
            var col_index = col * ${b};
            ${F ? `
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;` : `
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            `;
        for (let J = 0; J < b * x; J++) pe += `
            let scale${J} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${F ? `
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${J} = ${j}((zero_point_word) & 0xFu);` : ""}
            col_index += 1;`;
        return pe;
      }, Te = () => {
        let pe = `col_index = col * ${b};`;
        for (let J = 0; J < b * x; J++) pe += `
            let b${J}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;
        return pe += `
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`, pe;
      };
      return `
        var<workgroup> workgroup_shared: array<${oe.type.value}, ${x * $}>;
        ${D.declareVariables(...ne, oe)}
        ${D.mainStart([$, 1, 1])}
          let output_indices = ${oe.offsetToIndices(`(global_idx / ${$}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t2.blockSize / g2};
            ${ce()}
            for (var word: u32 = 0; word < ${m}; word += ${_}) {
              ${Te()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${Z()}
                word_offset += ${8 / g2};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_id.x)`, "output_value")};
          }
        }`;
    };
    return { name: "MatMulNBits", shaderCache: { hint: `${t2.blockSize};${t2.bits};${g2};${_};${b};${x};${$}`, inputDependencies: Array(e2.length).fill("rank") }, getRunData: () => ({ outputs: [{ dims: w, dataType: f }], dispatchGroup: { x: v }, programUniforms: T }), getShaderSource: z };
  }, xh = (e2, t2) => {
    let n2 = e2[0].dims, r2 = n2.length, o2 = n2[r2 - 2], a2 = t2.k, s2 = t2.n, u2 = n2.slice(0, r2 - 2), d2 = E.size(u2), m = e2[1].dims[2] / 4, f = e2[0].dataType, g2 = he(t2.k), _ = he(m), b = u2.concat([o2, s2]), w = 128, x = s2 % 8 === 0 ? 8 : s2 % 4 === 0 ? 4 : 1, v = w / x, $ = v * _ * 8, T = $ / g2, C = $ / t2.blockSize, A = E.size(b) / x, I = [], z = [d2, o2, a2 / g2], D = E.convertShape(e2[1].dims).slice();
    D.splice(-1, 1, m / _), I.push(...W(z)), I.push(...W(D)), I.push(...W(e2[2].dims)), e2.length === 4 && I.push(...W(E.convertShape(e2[3].dims)));
    let R = [d2, o2, s2];
    I.push(...W(R));
    let H = (q) => {
      let Y = z.length, ne = P("a", e2[0].dataType, Y, g2), F = P("b", 12, D.length, _), me = P("scales", e2[2].dataType, e2[2].dims.length), oe = [ne, F, me], j = e2.length === 4 ? P("zero_points", 12, e2[3].dims.length) : void 0;
      j && oe.push(j);
      let ie = R.length, Z = N("output", e2[0].dataType, ie), ce = ve(e2[0].dataType), Te = () => {
        switch (g2) {
          case 1:
            return `
          let a_data0 = vec4<${ce}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ce}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;
          case 2:
            return `
          let a_data0 = vec4<${ce}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ce}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;
          case 4:
            return `
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;
          default:
            throw new Error(`${g2}-component is not supported.`);
        }
      };
      return `
        var<workgroup> sub_a: array<${ne.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${v}>, ${x}>;
        ${q.declareVariables(...oe, Z)}
        ${q.mainStart([v, x, 1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ne.getByIndices(`${ne.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ne.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
            ${j ? `
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ce}((zero_point_word) & 0xFu);` : `
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ce}(8);`}
            let scale = ${me.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t2.blockSize / g2};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${Te()}
              let b_value = ${_ === 1 ? "b_data" : "b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ce}>(${Array.from({ length: 4 }, (pe, J) => `${ce}(b_value_lower[${J}]), ${ce}(b_value_upper[${J}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ce}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({ length: 2 }, (pe, J) => `${`dot(a_data${J}, b_dequantized_values[${J}])`}`).join(" + ")};
              word_offset += ${8 / g2};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`, "output_value")}
            }
          }
        }`;
    };
    return { name: "BlockwiseMatMulNBits32", shaderCache: { hint: `${t2.blockSize};${g2};${_};${v};${x}`, inputDependencies: Array(e2.length).fill("rank") }, getRunData: () => ({ outputs: [{ dims: b, dataType: f }], dispatchGroup: { x: A }, programUniforms: I }), getShaderSource: H };
  }, id = (e2, t2) => {
    vh(e2.inputs, t2), t2.blockSize === 32 && e2.adapterInfo.isVendor("intel") && e2.adapterInfo.isArchitecture("gen-12lp") ? e2.compute(xh(e2.inputs, t2)) : e2.compute($h(e2.inputs, t2));
  }, ad = (e2) => te(e2);
});
var Sh;
var Th;
var Ch;
var Ih;
var Ah;
var Eh;
var kh;
var Ph;
var ud;
var ld = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Sh = (e2) => {
    if (!e2 || e2.length < 1) throw new Error("Too few inputs");
    if (e2[0].dataType !== 1 && e2[0].dataType !== 10) throw new Error("Input type must be float or float16.");
    if (e2.length >= 2) {
      let t2 = e2[0].dims.length * 2 === e2[1].dims[0];
      if (e2.length === 4 && (t2 = e2[3].dims[0] * 2 === e2[1].dims[0]), !t2) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].");
    }
  }, Th = (e2, t2, n2) => {
    let r2 = "";
    for (let o2 = t2 - 1; o2 >= 0; --o2) r2 += `
            k = i32(${e2.indicesGet("indices", o2)}) - ${K("uniforms.pads", o2, n2)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape", o2, t2)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides", o2, t2)});
        `;
    return `
          value = ${e2.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r2}
            value = x[offset];
          }
      `;
  }, Ch = (e2, t2, n2) => {
    let r2 = "";
    for (let o2 = t2 - 1; o2 >= 0; --o2) r2 += `
                k = i32(${e2.indicesGet("indices", o2)}) - ${K("uniforms.pads", o2, n2)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape", o2, t2)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape", o2, t2)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides", o2, t2)});
            `;
    return `
              var offset = 0;
              var k = 0;
              ${r2}
              value = x[offset];
          `;
  }, Ih = (e2, t2, n2) => {
    let r2 = "";
    for (let o2 = t2 - 1; o2 >= 0; --o2) r2 += `
                k = i32(${e2.indicesGet("indices", o2)}) - ${K("uniforms.pads", o2, n2)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape", o2, t2)})) {
                  k = i32(${K("uniforms.x_shape", o2, t2)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides", o2, t2)});
            `;
    return `
              var offset = 0;
              var k = 0;
              ${r2}
              value = x[offset];
          `;
  }, Ah = (e2, t2, n2) => {
    let r2 = "";
    for (let o2 = t2 - 1; o2 >= 0; --o2) r2 += `
                k = i32(${e2.indicesGet("indices", o2)}) - ${K("uniforms.pads", o2, n2)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape", o2, t2)}]);
                }
                if (k >= i32(${K("uniforms.x_shape", o2, t2)})) {
                  k -= i32(${K("uniforms.x_shape", o2, t2)});
                }
                offset += k * i32(${K("uniforms.x_strides", o2, t2)});
            `;
    return `
              var offset = 0;
              var k = 0;
              ${r2}
              value = x[offset];
          `;
  }, Eh = (e2, t2, n2) => {
    switch (n2.mode) {
      case 0:
        return Th(e2, t2, n2.pads.length);
      case 1:
        return Ch(e2, t2, n2.pads.length);
      case 2:
        return Ih(e2, t2, n2.pads.length);
      case 3:
        return Ah(e2, t2, n2.pads.length);
      default:
        throw new Error("Invalid mode");
    }
  }, kh = (e2, t2) => {
    let n2 = E.padShape(e2[0].dims.slice(), t2.pads), r2 = e2[0].dims, o2 = E.size(n2), a2 = [{ type: 12, data: o2 }, { type: 6, data: t2.pads }], s2 = e2.length >= 3 && e2[2].data;
    t2.mode === 0 && a2.push({ type: s2 ? e2[2].dataType : 1, data: t2.value }), a2.push(...W(e2[0].dims, n2));
    let u2 = ["rank"], d2 = (c2) => {
      let m = N("output", e2[0].dataType, n2.length), f = P("x", e2[0].dataType, r2.length), g2 = f.type.value, _ = Eh(m, r2.length, t2), b = [{ name: "output_size", type: "u32" }, { name: "pads", type: "i32", length: t2.pads.length }];
      return t2.mode === 0 && b.push({ name: "constant_value", type: s2 ? g2 : "f32" }), `
            ${c2.registerUniforms(b).declareVariables(f, m)}
            ${c2.mainStart()}
            ${c2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${g2}(0);
            ${_}
            output[global_idx] = value;
        }`;
    };
    return { name: "Pad", shaderCache: { hint: `${t2.mode}${s2}`, inputDependencies: u2 }, getRunData: () => ({ outputs: [{ dims: n2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(E.size(n2) / 64) }, programUniforms: a2 }), getShaderSource: d2 };
  }, Ph = (e2, t2) => {
    if (e2.length > 1) {
      let n2 = e2[1].getBigInt64Array(), r2 = e2.length >= 3 && e2[2].data ? e2[2].dataType === 10 ? e2[2].getUint16Array()[0] : e2[2].getFloat32Array()[0] : 0, o2 = e2[0].dims.length, a2 = new Int32Array(2 * o2).fill(0);
      if (e2.length >= 4) {
        let u2 = e2[3].getBigInt64Array();
        for (let d2 = 0; d2 < u2.length; d2++) a2[Number(u2[d2])] = Number(n2[d2]), a2[Number(u2[d2]) + o2] = Number(n2[d2 + u2.length]);
      } else n2.forEach((u2, d2) => a2[Number(d2)] = Number(u2));
      let s2 = [];
      return a2.forEach((u2) => s2.push(u2)), { mode: t2.mode, value: r2, pads: s2 };
    } else return t2;
  }, ud = (e2, t2) => {
    Sh(e2.inputs);
    let n2 = Ph(e2.inputs, t2);
    e2.compute(kh(e2.inputs, n2), { inputs: [0] });
  };
});
var ln;
var dd;
var cd;
var pd;
var md;
var Oh;
var zh;
var fd;
var hd;
var gd;
var yd;
var bd;
var _d;
var wd;
var vd;
var $d;
var xd;
var Sd;
var Td;
var Cd = L(() => {
  "use strict";
  Ve();
  ee();
  ae();
  ue();
  ln = (e2) => {
    if (we.webgpu.validateInputContent && (!e2 || e2.length !== 1)) throw new Error("Pool ops requires 1 input.");
  }, dd = (e2, t2, n2) => {
    let r2 = t2.format === "NHWC", o2 = e2.dims.slice();
    r2 && o2.splice(1, 0, o2.pop());
    let a2 = Object.hasOwnProperty.call(t2, "dilations"), s2 = t2.kernelShape.slice(), u2 = t2.strides.slice(), d2 = a2 ? t2.dilations.slice() : [], c2 = t2.pads.slice();
    Dt.adjustPoolAttributes(n2, o2, s2, u2, d2, c2);
    let m = Dt.computePoolOutputShape(n2, o2, u2, d2, s2, c2, t2.autoPad), f = Object.assign({}, t2);
    a2 ? Object.assign(f, { kernelShape: s2, strides: u2, pads: c2, dilations: d2, cacheKey: t2.cacheKey }) : Object.assign(f, { kernelShape: s2, strides: u2, pads: c2, cacheKey: t2.cacheKey });
    let g2 = m.slice();
    return g2.push(g2.splice(1, 1)[0]), [f, r2 ? g2 : m];
  }, cd = (e2, t2) => {
    let n2 = t2.format === "NHWC", r2 = E.size(e2), o2 = E.size(t2.kernelShape), a2 = [{ type: 12, data: r2 }, { type: 12, data: o2 }], s2 = [{ name: "outputSize", type: "u32" }, { name: "kernelSize", type: "u32" }];
    if (t2.kernelShape.length <= 2) {
      let u2 = t2.kernelShape[t2.kernelShape.length - 1], d2 = t2.strides[t2.strides.length - 1], c2 = t2.pads[t2.pads.length / 2 - 1], m = t2.pads[t2.pads.length - 1], f = !!(c2 + m);
      a2.push({ type: 12, data: u2 }, { type: 12, data: d2 }, { type: 12, data: c2 }, { type: 12, data: m }), s2.push({ name: "kw", type: "u32" }, { name: "sw", type: "u32" }, { name: "pwStart", type: "u32" }, { name: "pwEnd", type: "u32" });
      let g2 = false;
      if (t2.kernelShape.length === 2) {
        let _ = t2.kernelShape[t2.kernelShape.length - 2], b = t2.strides[t2.strides.length - 2], w = t2.pads[t2.pads.length / 2 - 2], x = t2.pads[t2.pads.length - 2];
        g2 = !!(w + x), a2.push({ type: 12, data: _ }, { type: 12, data: b }, { type: 12, data: w }, { type: 12, data: x }), s2.push({ name: "kh", type: "u32" }, { name: "sh", type: "u32" }, { name: "phStart", type: "u32" }, { name: "phEnd", type: "u32" });
      }
      return [a2, s2, true, f, g2];
    } else {
      if (n2) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
      let u2 = E.computeStrides(t2.kernelShape);
      a2.push({ type: 12, data: u2 }, { type: 12, data: t2.pads }, { type: 12, data: t2.strides }), s2.push({ name: "kernelStrides", type: "u32", length: u2.length }, { name: "pads", type: "u32", length: t2.pads.length }, { name: "strides", type: "u32", length: t2.strides.length });
      let d2 = t2.pads.reduce((c2, m) => c2 + m);
      return [a2, s2, !!d2, false, false];
    }
  }, pd = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2, m, f) => {
    let g2 = o2.format === "NHWC", _ = t2.type.value, b = N("output", t2.type.tensor, r2);
    if (o2.kernelShape.length <= 2) {
      let w = "", x = "", v = "", $ = n2 - (g2 ? 2 : 1);
      if (m ? w = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t2.indicesToOffset("xIndices")}];
                  ${a2}
                }` : w = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t2.indicesToOffset("xIndices")}];
                  ${a2}
                }`, o2.kernelShape.length === 2) {
        let C = n2 - (g2 ? 3 : 2);
        f ? x = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              ` : x = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `, v = `
              }
            `;
      }
      return `
            ${e2.registerUniforms(d2).declareVariables(t2, b)}

            ${e2.mainStart()}
              ${e2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${_}(${u2});
              var pad = 0;
              ${x}
              ${w}
              ${v}
              ${s2}

              output[global_idx] = value;
            }`;
    } else {
      if (g2) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
      let w = o2.kernelShape.length, x = o2.pads.length, v = "";
      return c2 ? v = `
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t2.indicesToOffset("xIndices")}];
                ${a2}
              }` : v = `
              }
              let x_val = x[${t2.indicesToOffset("xIndices")}];
              ${a2}
            `, `
            ${e2.registerUniforms(d2).declareVariables(t2, b)}

            ${e2.mainStart()}
              ${e2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${u2});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w - 1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides", "j", w)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides", "j", w)};
                }
                offsets[${w - 1}] = offset;

                isPad = false;
                for (var j = ${n2 - w}u; j < ${n2}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides", `j - ${n2 - w}u`, w)}
                    + offsets[j - ${n2 - w}u] - ${K("uniforms.pads", "j - 2u", x)};
                  ${v}
              }
              ${s2}

              output[global_idx] = value;
            }`;
    }
  }, md = (e2) => `${e2.format};${e2.ceilMode};${e2.autoPad};${e2.kernelShape.length}`, Oh = (e2) => `${md(e2)};${e2.countIncludePad}`, zh = (e2) => `${md(e2)};${e2.storageOrder};${e2.dilations}`, fd = (e2) => ({ format: e2.format, autoPad: ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e2.auto_pad], ceilMode: e2.ceil_mode, kernelShape: e2.kernel_shape, strides: e2.strides, pads: e2.pads }), hd = (e2, t2, n2, r2) => {
    let [o2, a2] = dd(t2, r2, n2), s2 = P("x", t2.dataType, t2.dims.length), u2 = s2.type.value, d2 = "value += x_val;", c2 = "";
    o2.countIncludePad ? c2 += `value /= ${u2}(uniforms.kernelSize);` : c2 += `value /= ${u2}(i32(uniforms.kernelSize) - pad);`;
    let [m, f, g2, _, b] = cd(a2, o2);
    m.push(...W(t2.dims, a2));
    let w = ["rank"];
    return { name: e2, shaderCache: { hint: `${r2.cacheKey};${g2};${_};${b}`, inputDependencies: w }, getRunData: () => ({ outputs: [{ dims: a2, dataType: t2.dataType }], dispatchGroup: { x: Math.ceil(E.size(a2) / 64) }, programUniforms: m }), getShaderSource: (x) => pd(x, s2, t2.dims.length, a2.length, o2, d2, c2, 0, f, g2, _, b) };
  }, gd = (e2) => {
    let t2 = e2.count_include_pad !== 0, n2 = fd(e2);
    if (n2.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
    let r2 = { countIncludePad: t2, ...n2, cacheKey: "" };
    return { ...r2, cacheKey: Oh(r2) };
  }, yd = (e2, t2) => {
    ln(e2.inputs), e2.compute(hd("AveragePool", e2.inputs[0], false, t2));
  }, bd = { autoPad: "", ceilMode: 0, countIncludePad: false, kernelShape: [], strides: [], pads: [], storageOrder: 0, dilations: [] }, _d = (e2) => {
    let t2 = e2.format;
    return { format: t2, ...bd, cacheKey: t2 };
  }, wd = (e2, t2) => {
    ln(e2.inputs), e2.compute(hd("GlobalAveragePool", e2.inputs[0], true, t2));
  }, vd = (e2, t2, n2, r2) => {
    let [o2, a2] = dd(t2, r2, n2), s2 = `
      value = max(x_val, value);
    `, u2 = "", d2 = P("x", t2.dataType, t2.dims.length), c2 = ["rank"], [m, f, g2, _, b] = cd(a2, o2);
    return m.push(...W(t2.dims, a2)), { name: e2, shaderCache: { hint: `${r2.cacheKey};${g2};${_};${b}`, inputDependencies: c2 }, getRunData: () => ({ outputs: [{ dims: a2, dataType: t2.dataType }], dispatchGroup: { x: Math.ceil(E.size(a2) / 64) }, programUniforms: m }), getShaderSource: (w) => pd(w, d2, t2.dims.length, a2.length, o2, s2, u2, t2.dataType === 10 ? -65504 : -1e5, f, g2, _, b) };
  }, $d = (e2, t2) => {
    ln(e2.inputs), e2.compute(vd("MaxPool", e2.inputs[0], false, t2));
  }, xd = (e2) => {
    let t2 = e2.storage_order, n2 = e2.dilations, r2 = fd(e2);
    if (t2 !== 0) throw new Error("column major storage order is not yet supported for MaxPool");
    if (r2.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for MaxPool");
    let o2 = { storageOrder: t2, dilations: n2, ...r2, cacheKey: "" };
    return { ...o2, cacheKey: zh(o2) };
  }, Sd = (e2) => {
    let t2 = e2.format;
    return { format: t2, ...bd, cacheKey: t2 };
  }, Td = (e2, t2) => {
    ln(e2.inputs), e2.compute(vd("GlobalMaxPool", e2.inputs[0], true, t2));
  };
});
var Bh;
var Mh;
var Id;
var Ad;
var Ed = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Bh = (e2, t2) => {
    if (e2.length < 2 || e2.length > 3) throw new Error("DequantizeLinear requires 2 or 3 inputs.");
    if (e2.length === 3 && e2[1].dims === e2[2].dims) throw new Error("x-scale and x-zero-point must have the same shape.");
    if (e2.length === 3 && e2[0].dataType !== e2[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
    if (e2[0].dataType === 6 && e2.length > 2) throw new Error("In the case of dequantizing int32 there is no zero point.");
    if (e2[1].dims.length !== 0 && e2[1].dims.length !== 1 && e2[1].dims.length !== e2[0].dims.length) throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");
    if (e2.length > 2) {
      if (e2[0].dataType !== e2[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
      if (e2[1].dims.length !== e2[2].dims.length) throw new Error("scale and zero-point inputs must have the same rank.");
      if (!e2[1].dims.map((n2, r2) => n2 === e2[2].dims[r2]).reduce((n2, r2) => n2 && r2, true)) throw new Error("scale and zero-point inputs must have the same shape.");
    }
    if (t2.blockSize > 0) {
      if (e2[1].dims.length === 0 || e2[1].dims.length === 1 && e2[1].dims[0] === 1) throw new Error("blockSize must be set only for block quantization.");
      if (!e2[1].dims.map((o2, a2) => a2 === t2.axis || o2 === e2[0].dims[a2]).reduce((o2, a2) => o2 && a2, true)) throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");
      if (e2[1].dims.length !== e2[0].dims.length) throw new Error("For block qunatization the scale input rank must be the same as the x rank.");
      let n2 = e2[0].dims[t2.axis], r2 = e2[1].dims[t2.axis];
      if (t2.blockSize < Math.ceil(n2 / r2) || t2.blockSize > Math.ceil(n2 / (r2 - 1) - 1)) throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].");
    }
  }, Mh = (e2, t2) => {
    let n2 = E.normalizeAxis(t2.axis, e2[0].dims.length), r2 = e2[0].dataType, o2 = r2 === 3, a2 = e2[0].dims, s2 = e2[1].dataType, u2 = E.size(a2), d2 = r2 === 3 || r2 === 2, c2 = d2 ? [Math.ceil(E.size(e2[0].dims) / 4)] : e2[0].dims, m = e2[1].dims, f = e2.length > 2 ? e2[2] : void 0, g2 = f ? d2 ? [Math.ceil(E.size(f.dims) / 4)] : f.dims : void 0, _ = m.length === 0 || m.length === 1 && m[0] === 1, b = _ === false && m.length === 1, w = he(u2), x = _ && (!d2 || w === 4), v = x ? w : 1, $ = x && !d2 ? w : 1, T = P("input", d2 ? 12 : r2, c2.length, $), C = P("scale", s2, m.length), A = f ? P("zero_point", d2 ? 12 : r2, g2.length) : void 0, I = N("output", s2, a2.length, v), z = [T, C];
    A && z.push(A);
    let D = [c2, m];
    f && D.push(g2);
    let R = [{ type: 12, data: u2 / v }, { type: 12, data: n2 }, { type: 12, data: t2.blockSize }, ...W(...D, a2)], H = (q) => {
      let Y = [{ name: "output_size", type: "u32" }, { name: "axis", type: "u32" }, { name: "block_size", type: "u32" }];
      return `
      ${q.registerUniforms(Y).declareVariables(...z, I)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${d2 ? `
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o2 ? "unpack4xI8(input)" : "unpack4xU8(input)"};
            let x_value = ${v === 1 ? "x_vec[global_idx % 4]" : "x_vec"};` : `let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_ ? `let scale_value= ${C.getByOffset("0")}` : b ? `
            let scale_index = ${I.indicesGet("output_indices", "uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};` : `
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices", "uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices", "uniforms.axis", "index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A ? _ ? d2 ? `
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o2 ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]` : `let zero_point_value = ${A.getByOffset("0")}` : b ? d2 ? `
                let zero_point_index = ${I.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o2 ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]` : `
                let zero_point_index = ${I.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};` : d2 ? `
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o2 ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];` : `let zero_point_value = ${A.getByIndices("scale_indices")};` : `let zero_point_value = ${d2 ? o2 ? "i32" : "u32" : T.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx", `${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`;
    };
    return { name: "DequantizeLinear", shaderCache: { hint: t2.cacheKey, inputDependencies: A ? ["rank", "rank", "rank"] : ["rank", "rank"] }, getShaderSource: H, getRunData: () => ({ outputs: [{ dims: a2, dataType: s2 }], dispatchGroup: { x: Math.ceil(u2 / v / 64), y: 1, z: 1 }, programUniforms: R }) };
  }, Id = (e2, t2) => {
    Bh(e2.inputs, t2), e2.compute(Mh(e2.inputs, t2));
  }, Ad = (e2) => te({ axis: e2.axis, blockSize: e2.blockSize });
});
var Rh;
var Uh;
var kd;
var Pd = L(() => {
  "use strict";
  Ve();
  ee();
  ue();
  Rh = (e2, t2, n2) => {
    let r2 = e2 === t2, o2 = e2 < t2 && n2 < 0, a2 = e2 > t2 && n2 > 0;
    if (r2 || o2 || a2) throw new Error("Range these inputs' contents are invalid.");
  }, Uh = (e2, t2, n2, r2) => {
    let o2 = Math.abs(Math.ceil((t2 - e2) / n2)), a2 = [o2], s2 = o2, u2 = [{ type: 12, data: s2 }, { type: r2, data: e2 }, { type: r2, data: n2 }, ...W(a2)], d2 = (c2) => {
      let m = N("output", r2, a2.length), f = m.type.value, g2 = [{ name: "outputSize", type: "u32" }, { name: "start", type: f }, { name: "delta", type: f }];
      return `
        ${c2.registerUniforms(g2).declareVariables(m)}
        ${c2.mainStart()}
        ${c2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`;
    };
    return { name: "Range", shaderCache: { hint: `${r2}` }, getShaderSource: d2, getRunData: () => ({ outputs: [{ dims: a2, dataType: r2 }], dispatchGroup: { x: Math.ceil(s2 / 64) }, programUniforms: u2 }) };
  }, kd = (e2) => {
    let t2 = 0, n2 = 0, r2 = 0;
    e2.inputs[0].dataType === 6 ? (t2 = e2.inputs[0].getInt32Array()[0], n2 = e2.inputs[1].getInt32Array()[0], r2 = e2.inputs[2].getInt32Array()[0]) : e2.inputs[0].dataType === 1 && (t2 = e2.inputs[0].getFloat32Array()[0], n2 = e2.inputs[1].getFloat32Array()[0], r2 = e2.inputs[2].getFloat32Array()[0]), we.webgpu.validateInputContent && Rh(t2, n2, r2), e2.compute(Uh(t2, n2, r2, e2.inputs[0].dataType), { inputs: [] });
  };
});
var Nh;
var Vh;
var Od;
var zd;
var Dd = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Nh = (e2, t2, n2, r2) => {
    if (e2 !== "none" && r2 !== "i32" && r2 !== "u32" && r2 !== "f32") throw new Error(`Input ${r2} is not supported with reduction ${e2}.`);
    let o2 = `{
                var oldValue = 0;
                loop {
                  let newValueF32 =`, a2 = `;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t2}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;
    switch (e2) {
      case "none":
        return `${t2}=${n2};`;
      case "add":
        return r2 === "i32" || r2 === "u32" ? `atomicAdd(&${t2}, bitcast<${r2}>(${n2}));` : `
              ${o2}bitcast<${r2}>(oldValue) + (${n2})${a2}`;
      case "max":
        return r2 === "i32" || r2 === "u32" ? `atomicMax(&${t2}, bitcast<${r2}>(${n2}));` : `
                ${o2}max(bitcast<f32>(oldValue), (${n2}))${a2}`;
      case "min":
        return r2 === "i32" || r2 === "u32" ? `atomicMin(&${t2}, bitcast<${r2}>(${n2}));` : `${o2}min(bitcast<${r2}>(oldValue), (${n2}))${a2}`;
      case "mul":
        return `${o2}(bitcast<${r2}>(oldValue) * (${n2}))${a2}`;
      default:
        throw new Error(`Reduction ${e2} is not supported.`);
    }
  }, Vh = (e2, t2) => {
    let n2 = e2[0].dims, r2 = e2[1].dims, o2 = n2, a2 = 1, s2 = Math.ceil(E.sizeToDimension(r2, r2.length - 1) / a2), u2 = r2[r2.length - 1], d2 = E.sizeFromDimension(n2, u2), c2 = [{ type: 12, data: s2 }, { type: 12, data: u2 }, { type: 12, data: d2 }, ...W(e2[1].dims, e2[2].dims, o2)], m = (f) => {
      let g2 = P("indices", e2[1].dataType, e2[1].dims.length), _ = P("updates", e2[2].dataType, e2[2].dims.length, a2), b = t2.reduction !== "none" && t2.reduction !== "" ? as("output", e2[0].dataType, o2.length) : N("output", e2[0].dataType, o2.length, a2);
      return `
      ${f.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(g2, _, b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e2[0].dims.length === 1 ? `
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;` : `
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Nh(t2.reduction, "output[data_offset + i]", "value", b.type.value)}
  }

      }`;
    };
    return { name: "ScatterND", shaderCache: { hint: `${t2.cacheKey}_${t2.reduction}`, inputDependencies: ["rank", "rank"] }, getRunData: () => ({ outputs: [{ dims: o2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(s2 / 64) }, programUniforms: c2 }), getShaderSource: m };
  }, Od = (e2) => te({ reduction: e2.reduction }), zd = (e2, t2) => {
    e2.compute(Vh(e2.inputs, t2), { inputs: [e2.inputs[1], e2.inputs[2]], outputs: [] });
  };
});
var Lh;
var Wh;
var Gh;
var Bd;
var Hh;
var Fh;
var qh;
var jh;
var Kh;
var Zh;
var Qh;
var Yh;
var Md;
var Xh;
var Jh;
var eg;
var tg;
var rg;
var Rd;
var Ud;
var Nd = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  Lh = (e2, t2) => {
    if (e2.every((n2) => n2 > 0 || (() => {
      throw new Error("Resize requires scales input values to be positive");
    })), e2.length > 0) {
      if (t2.mode === "linear") {
        if (!(e2.length === 2 || e2.length === 3 || e2.length === 4 && e2[0] === 1 && e2[1] === 1 || e2.length === 4 && e2[0] === 1 && e2[3] === 1 || e2.length === 5 && e2[0] === 1 && e2[1] === 1)) throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`);
      } else if (t2.mode === "cubic" && !(e2.length === 2 || e2.length === 4 && e2[0] === 1 && e2[1] === 1 || e2.length === 4 && e2[0] === 1 && e2[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode");
    }
  }, Wh = (e2, t2, n2) => {
    t2.every((o2) => o2 >= 0 && o2 < n2 || (() => {
      throw new Error("Resize requires axes input values to be positive and less than rank");
    }));
    let r2 = new Array(n2).fill(1);
    return t2.forEach((o2, a2) => r2[o2] = e2[a2]), r2;
  }, Gh = (e2, t2, n2, r2, o2, a2) => {
    let [s2, u2, d2] = n2 > 10 ? [1, 2, 3] : [-1, e2.length > 1 ? 1 : -1, -1], c2 = e2[0].dims.length;
    if (s2 > 0 && e2.length > s2 && e2[s2].dims.length > 0) e2[s2].getFloat32Array().forEach((m) => a2.push(m));
    else if (t2.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");
    if (u2 > 0 && e2.length > u2 && e2[u2].dims.length === 1 && e2[u2].dims[0] > 0) {
      if (e2[u2].getFloat32Array().forEach((m) => r2.push(m)), r2.length !== 0 && r2.length !== c2 && n2 >= 18 && r2.length !== t2.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");
      Lh(r2, t2), t2.axes.length > 0 && Wh(r2, t2.axes, c2).forEach((m, f) => r2[f] = m);
    }
    if (d2 > 0 && e2.length > d2 && e2[d2].dims.length === 1 && e2[d2].dims[0] > 0 && (e2[d2].getBigInt64Array().forEach((m) => o2.push(Number(m))), o2.length !== 0 && o2.length !== c2 && n2 >= 18 && o2.length !== t2.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");
    if (t2.axes.length > 0) {
      if (r2.length !== 0 && r2.length !== t2.axes.length) throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');
      if (o2.length !== 0 && o2.length !== t2.axes.length) throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified');
    }
    if (typeof r2 < "u" && typeof o2 < "u" && r2.length > 0 && o2.length > c2) throw new Error("Resize requires only of scales or sizes to be specified");
  }, Bd = (e2, t2, n2, r2) => `
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e2}) * (${t2});
  let whole = ${r2}(big / (${n2}));
  let fract = ${r2}(big % (${n2})) / ${r2}(${n2});
  return whole + fract;
`, Hh = (e2, t2) => `fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t2} { ` + (() => {
    switch (e2) {
      case "asymmetric":
        return `
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t2}(xResized) / ${t2}(xScale);
          } else {
            ${Bd("xResized", "lengthOriginal", "lengthResized", t2)}
          }
        `;
      case "pytorch_half_pixel":
        return `if (lengthResized > 1) {
                    return (${t2}(xResized) + 0.5) / ${t2}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;
      case "tf_half_pixel_for_nn":
        return `return (${t2}(xResized) + 0.5) / ${t2}(xScale);`;
      case "align_corners":
        return `if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Bd("xResized", "lengthOriginal - 1", "lengthResized - 1", t2)}
                  }`;
      case "tf_crop_and_resize":
        return `if (lengthResized > 1) {
                    return ${t2}(roiStart) * ${t2}(lengthOriginal - 1) +
                        (${t2}(xResized) * ${t2}(roiEnd - roiStart) * ${t2}(lengthOriginal - 1)) /
                        ${t2}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t2}(roiStart + roiEnd) * ${t2}(lengthOriginal - 1);
                  }`;
      case "half_pixel_symmetric":
        return `const outputWidth = ${t2}xScale * ${t2}(lengthResized);
                  const adjustment = ${t2}(lengthResized) / outputWidth;
                  const center = ${t2}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t2}(xResized) + 0.5) / ${t2}(xScale)) - 0.5;`;
      case "half_pixel":
        return `return ((${t2}(xResized) + 0.5) / ${t2}(xScale)) - 0.5;`;
      default:
        throw new Error(`Coordinate transform mode ${e2} is not supported`);
    }
  })() + "}", Fh = (e2, t2, n2) => `fn getNearestPixelFromOriginal(xOriginal: ${n2}, isDownSample: bool) -> ${n2} {` + (() => {
    switch (e2) {
      case "round_prefer_ceil":
        return "if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";
      case "floor":
        return "return floor(xOriginal);";
      case "ceil":
        return "return ceil(xOriginal);";
      case "round_prefer_floor":
        return "if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";
      case "simple":
      default:
        if (t2 < 11) return "if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";
        throw new Error(`Nearest mode ${e2} is not supported`);
    }
  })() + "}", qh = (e2, t2, n2) => {
    let r2 = new Array(n2).fill(0).concat(new Array(n2).fill(1)), o2 = e2.length === 0 ? r2 : e2.slice();
    return t2.length > 0 ? (t2.forEach((a2, s2) => {
      r2[a2] = o2[s2], r2[s2 + n2] = o2[t2.length + s2];
    }), r2) : o2;
  }, jh = (e2, t2, n2, r2) => {
    let o2 = [];
    if (n2.length > 0) if (r2.length > 0) {
      if (e2.forEach((a2) => o2.push(a2)), Math.max(...r2) > e2.length) throw new Error("axes is out of bound");
      r2.forEach((a2, s2) => o2[a2] = n2[s2]);
    } else n2.forEach((a2) => o2.push(a2));
    else {
      if (t2.length === 0) throw new Error("Resize requires either scales or sizes.");
      o2 = e2.map((a2, s2) => Math.round(a2 * t2[s2]));
    }
    return o2;
  }, Kh = (e2, t2, n2) => {
    let r2 = (() => {
      switch (n2.keepAspectRatioPolicy) {
        case "not_larger":
          return n2.axes.length > 0 ? Math.min(...n2.axes.map((a2) => t2[a2]), Number.MAX_VALUE) : Math.min(...t2, Number.MAX_VALUE);
        case "not_smaller":
          return n2.axes.length > 0 ? Math.max(...n2.axes.map((a2) => t2[a2]), Number.MIN_VALUE) : Math.max(...t2, Number.MIN_VALUE);
        default:
          throw new Error(`Keep aspect ratio policy ${n2.keepAspectRatioPolicy} is not supported`);
      }
    })();
    t2.fill(1, 0, t2.length);
    let o2 = e2.slice();
    return n2.axes.length > 0 ? (n2.axes.forEach((a2) => t2[a2] = r2), n2.axes.forEach((a2) => o2[a2] = Math.round(e2[a2] * t2[a2]))) : (t2.fill(r2, 0, t2.length), o2.forEach((a2, s2) => o2[s2] = Math.round(a2 * t2[s2]))), o2;
  }, Zh = (e2, t2, n2, r2, o2) => `
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e2.type.indices}) -> array<${e2.type.value}, ${n2.length}> {
      var original_indices: array<${e2.type.value}, ${n2.length}>;
      for (var i:u32 = 0; i < ${n2.length}; i++) {
        var output_index = ${e2.indicesGet("output_indices", "i")};
        var scale = ${K("uniforms.scales", "i", r2)};
        var roi_low = ${K("uniforms.roi", "i", o2)};
        var roi_hi = ${K("uniforms.roi", `i + ${t2.length}`, o2)};
        if (scale == 1.0) {
          original_indices[i] = ${e2.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape", "i", t2.length)};
          var output_shape_i = ${K("uniforms.output_shape", "i", n2.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`, Qh = (e2, t2, n2, r2, o2, a2, s2) => `
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t2.type.indices}) -> ${e2.type.indices} {
      var input_indices: ${e2.type.indices};
      for (var i:u32 = 0; i < ${r2.length}; i++) {
        var output_index = ${t2.indicesGet("output_indices", "i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales", "i", o2)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi", "i", a2)};
          var roi_hi = ${K("uniforms.roi", `i + ${n2.length}`, a2)};
          var input_shape_i = ${K("uniforms.input_shape", "i", n2.length)};
          var output_shape_i = ${K("uniforms.output_shape", "i", r2.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s2} || (original_idx >= 0 && original_idx < ${t2.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t2.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e2.indicesSet("input_indices", "i", "input_index")}
      }
      return input_indices;
    }`, Yh = (e2, t2) => `
    fn checkInputIndices(input_indices: ${e2.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t2.length}; i++) {
        var input_index = ${e2.indicesGet("input_indices", "i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape", "i", t2.length)}) {
          return false;
        }
      }
      return true;
    }`, Md = (e2, t2, n2, r2) => e2.rank > r2 ? `
    ${e2.indicesSet("input_indices", t2, "channel")};
    ${e2.indicesSet("input_indices", n2, "batch")};
` : "", Xh = (e2, t2, n2, r2, o2) => {
    let [s2, u2, d2, c2] = n2.length === 2 ? [-1, 0, 1, -1] : [0, 2, 3, 1], m = e2.type.value;
    return `
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e2.type.indices};
      ${e2.indicesSet("input_indices", u2, `max(0, min(row, ${n2[u2]} - 1))`)};
      ${e2.indicesSet("input_indices", d2, `max(0, min(col, ${n2[d2]} - 1))`)};
      ${Md(e2, c2, s2, 2)}
      return ${e2.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t2.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${u2}];
      var col:${m} = originalIndices[${d2}];
      ${r2 ? `if (row < 0 || row > (${n2[u2]} - 1) || col < 0 || col > (${n2[d2]} - 1)) {
        return ${o2};
      }` : ""};
      row = max(0, min(row, ${n2[u2]} - 1));
      col = max(0, min(col, ${n2[d2]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n2.length > 2 ? `u32(originalIndices[${c2}])` : "0"};
      var batch: u32 =  ${n2.length > 2 ? `u32(originalIndices[${s2}])` : "0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`;
  }, Jh = (e2, t2, n2, r2, o2, a2, s2, u2, d2, c2) => {
    let m = n2.length === 2, f = true, [g2, _] = m ? [0, 1] : f ? [2, 3] : [1, 2], b = e2.type.value, w = (x) => {
      let v = x === g2 ? "row" : "col";
      return `
      fn ${v}CubicInterpolation(input_indices: ${e2.type.indices}, output_indices: ${t2.type.indices}) -> ${b} {
        var output_index = ${t2.indicesGet("output_indices", x)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o2[x]},
        ${r2[x]}, ${n2[x]}, ${a2[x]}, ${a2[x]} + ${n2.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u2} && (originalIdx < 0 || originalIdx > (${n2[x]} - 1))) {
          return ${d2};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${b} = originalIdx + ${b}(i);
          if (${v} < 0 || ${v} >= ${n2[x]}) {
            ${c2 ? `coefs[i + 1] = 0.0;
                        continue;` : u2 ? `return ${d2};` : `${v} = max(0, min(${v}, ${n2[x]} - 1));`};
          }
        var input_indices_copy: ${e2.type.indices} = input_indices;
          ${e2.indicesSet("input_indices_copy", x, `u32(${v})`)};
          data[i + 1] = ${x === g2 ? e2.getByIndices("input_indices_copy") : "rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`;
    };
    return `
    ${w(g2)};
    ${w(_)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${s2} * onePlusAbsS - 5 * ${s2}) * onePlusAbsS + 8 * ${s2}) * onePlusAbsS - 4 * ${s2};
    coeffs[1] = ((${s2} + 2) * absS - (${s2} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s2} + 2) * oneMinusAbsS - (${s2} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s2} * twoMinusAbsS - 5 * ${s2}) * twoMinusAbsS + 8 * ${s2}) * twoMinusAbsS - 4 * ${s2};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t2.type.indices}) -> ${b} {
    var input_indices: ${e2.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `;
  }, eg = (e2, t2, n2, r2, o2) => {
    let [s2, u2, d2, c2, m] = n2.length === 3 ? [-1, 0, 1, 2, -1] : [0, 2, 3, 4, 1], f = e2.type.value;
    return `
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e2.type.indices};
      ${e2.indicesSet("input_indices", u2, `max(0, min(depth, ${n2[u2]} - 1))`)};
      ${e2.indicesSet("input_indices", d2, `max(0, min(height, ${n2[d2]} - 1))`)};
      ${e2.indicesSet("input_indices", c2, `max(0, min(width, ${n2[c2]} - 1))`)};
      ${Md(e2, m, s2, 3)}
      return ${e2.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t2.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${u2}];
      var height:${f} = originalIndices[${d2}];
      var width:${f} = originalIndices[${c2}];
      ${r2 ? `if (depth < 0 || depth > (${n2[u2]} - 1) || height < 0 || height > (${n2[d2]} - 1) || width < 0 || (width > ${n2[c2]} - 1)) {
      return ${o2};
        }` : ""};

    depth = max(0, min(depth, ${n2[u2]} - 1));
      height = max(0, min(height, ${n2[d2]} - 1));
      width = max(0, min(width, ${n2[c2]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n2.length > 3 ? `u32(originalIndices[${m}])` : "0"};
      var batch: u32 =  ${n2.length > 3 ? `u32(originalIndices[${s2}])` : "0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`;
  }, tg = (e2, t2, n2, r2, o2, a2) => {
    let s2 = e2.dims, u2 = qh(a2, t2.axes, s2.length), d2 = jh(s2, r2, o2, t2.axes), c2 = r2.slice();
    r2.length === 0 && (c2 = s2.map(($, T) => $ === 0 ? 1 : d2[T] / $), t2.keepAspectRatioPolicy !== "stretch" && (d2 = Kh(s2, c2, t2)));
    let m = N("output", e2.dataType, d2.length), f = P("input", e2.dataType, s2.length), g2 = E.size(d2), _ = s2.length === d2.length && s2.every(($, T) => $ === d2[T]), b = t2.coordinateTransformMode === "tf_crop_and_resize", w = t2.extrapolationValue, x = f.type.value, v = ($) => `
      ${_ ? "" : `
      ${Hh(t2.coordinateTransformMode, x)};
      ${(() => {
      switch (t2.mode) {
        case "nearest":
          return `
              ${Yh(f, s2)};
              ${Fh(t2.nearestMode, n2, x)};
              ${Qh(f, m, s2, d2, c2.length, u2.length, b)};
              `;
        case "linear":
          return `
              ${Zh(m, s2, d2, c2.length, u2.length)};
              ${(() => {
            if (s2.length === 2 || s2.length === 4) return `${Xh(f, m, s2, b, w)}`;
            if (s2.length === 3 || s2.length === 5) return `${eg(f, m, s2, b, w)}`;
            throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.");
          })()};
            `;
        case "cubic":
          return `
            ${(() => {
            if (s2.length === 2 || s2.length === 4) return `${Jh(f, m, s2, d2, c2, u2, t2.cubicCoeffA, b, t2.extrapolationValue, t2.excludeOutside)}`;
            throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.");
          })()};
            `;
        default:
          throw Error("Invalid resize mode");
      }
    })()};
      `}
      ${$.registerUniform("output_size", "u32").registerUniform("scales", "f32", c2.length).registerUniform("roi", "f32", u2.length).declareVariables(f, m)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_ ? "output[global_idx] = input[global_idx];" : `
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(() => {
      switch (t2.mode) {
        case "nearest":
          return `input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t2.extrapolationValue};
                }`;
        case "linear":
          return `output[global_idx] = ${s2.length === 2 || s2.length === 4 ? "bilinearInterpolation" : "trilinearInterpolation"}(output_indices);`;
        case "cubic":
          return "output[global_idx] = bicubicInterpolation(output_indices);";
        default:
          throw Error(`Unsupported resize mode: ${t2.mode}`);
      }
    })()};
`}
      }`;
    return { name: "Resize", shaderCache: { hint: `${t2.cacheKey}|${n2}|${c2.length > 0 ? t2.mode === "cubic" ? c2 : c2.length : ""}|${o2.length > 0 ? o2 : ""}|${u2.length > 0 ? u2 : ""}|${_}|${t2.mode === "nearest" ? s2.length : s2}`, inputDependencies: ["rank"] }, getShaderSource: v, getRunData: () => ({ outputs: [{ dims: d2, dataType: e2.dataType }], dispatchGroup: { x: Math.ceil(g2 / 64) }, programUniforms: [{ type: 12, data: g2 }, { type: 1, data: c2 }, { type: 1, data: u2 }, ...W(s2, d2)] }) };
  }, rg = (e2) => {
    let t2 = e2.customDataBuffer;
    return new Uint32Array(t2, t2.byteOffset, 1)[0];
  }, Rd = (e2, t2) => {
    let n2 = [], r2 = [], o2 = [], a2 = rg(e2);
    if (t2.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported");
    Gh(e2.inputs, t2, a2, n2, r2, o2), e2.compute(tg(e2.inputs[0], t2, a2, n2, r2, o2), { inputs: [0] });
  }, Ud = (e2) => {
    let t2 = e2.antialias, n2 = e2.axes, r2 = e2.coordinateTransformMode, o2 = e2.cubicCoeffA, a2 = e2.excludeOutside !== 0, s2 = e2.extrapolationValue, u2 = e2.keepAspectRatioPolicy, d2 = e2.mode, c2 = e2.nearestMode === "" ? "simple" : e2.nearestMode;
    return te({ antialias: t2, axes: n2, coordinateTransformMode: r2, cubicCoeffA: o2, excludeOutside: a2, extrapolationValue: s2, keepAspectRatioPolicy: u2, mode: d2, nearestMode: c2 });
  };
});
var ng;
var og;
var Vd;
var Ld = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  ng = (e2) => {
    if (!e2 || e2.length < 3) throw new Error("layerNorm requires at least 3 inputs.");
    let t2 = e2[0], n2 = e2[1], r2 = e2[2];
    if (t2.dataType !== n2.dataType || t2.dataType !== r2.dataType) throw new Error("All inputs must have the same data type");
    if (t2.dims.length !== 3 && t2.dims.length !== 2) throw new Error("Input must be 2D or 3D");
    if (n2.dims.length !== 3 && n2.dims.length !== 2) throw new Error("Skip must be 2D or 3D");
    let o2 = t2.dims[t2.dims.length - 1], a2 = t2.dims[t2.dims.length - 2];
    if (n2.dims[n2.dims.length - 1] !== o2) throw new Error("Skip must have the same hidden size as input");
    if (n2.dims[n2.dims.length - 2] !== a2) throw new Error("Skip must have the same sequence length as input");
    if (r2.dims.length !== 1) throw new Error("Gamma must be 1D");
    if (r2.dims[r2.dims.length - 1] !== o2) throw new Error("Gamma must have the same hidden size as input");
    if (e2.length > 3) {
      let s2 = e2[3];
      if (s2.dims.length !== 1) throw new Error("Beta must be 1D");
      if (s2.dims[s2.dims.length - 1] !== o2) throw new Error("Beta must have the same hidden size as input");
    }
    if (e2.length > 4) {
      let s2 = e2[4];
      if (s2.dims.length !== 1) throw new Error("Bias must be 1D");
      if (s2.dims[s2.dims.length - 1] !== o2) throw new Error("Bias must have the same hidden size as input");
    }
  }, og = (e2, t2, n2, r2) => {
    let o2 = t2.simplified, a2 = e2[0].dims, s2 = E.size(a2), u2 = a2, d2 = s2, c2 = a2.slice(-1)[0], m = r2 ? a2.slice(0, -1).concat(1) : [], f = !o2 && e2.length > 3, g2 = e2.length > 4, _ = r2 && n2 > 1, b = r2 && n2 > 2, w = n2 > 3, x = 64, v = he(c2), $ = [{ type: 12, data: d2 }, { type: 12, data: v }, { type: 12, data: c2 }, { type: 1, data: t2.epsilon }], T = (A) => {
      let I = [{ name: "output_size", type: "u32" }, { name: "components", type: "u32" }, { name: "hidden_size", type: "u32" }, { name: "epsilon", type: "f32" }], z = [P("x", e2[0].dataType, e2[0].dims, v), P("skip", e2[1].dataType, e2[1].dims, v), P("gamma", e2[2].dataType, e2[2].dims, v)];
      f && z.push(P("beta", e2[3].dataType, e2[3].dims, v)), g2 && z.push(P("bias", e2[4].dataType, e2[4].dims, v)), z.push(N("output", e2[0].dataType, u2, v)), _ && z.push(N("mean_output", 1, m)), b && z.push(N("inv_std_output", 1, m)), w && z.push(N("input_skip_bias_sum", e2[0].dataType, u2, v));
      let D = ve(e2[0].dataType), R = ve(1, v);
      return `

      ${A.registerUniforms(I).declareVariables(...z)}
      var<workgroup> sum_shared : array<${R}, ${x}>;
      var<workgroup> sum_squared_shared : array<${R}, ${x}>;

      ${A.mainStart([x, 1, 1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x - 1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g2 ? "bias[offset1d + i]" : D + "(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w ? "input_skip_bias_sum[offset + i] = value;" : ""}
          output[offset + i] = value;
          let f32_value = ${Mt(D, v, "value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${je("sum", v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${je("square_sum", v)} / f32(uniforms.hidden_size) ${o2 ? "" : "- mean * mean"} + uniforms.epsilon);
        ${_ ? "mean_output[global_idx] = mean;" : ""}
        ${b ? "inv_std_output[global_idx] = inv_std_dev;" : ""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o2 ? "" : `- ${D}(mean)`}) *
            ${D}(inv_std_dev) * gamma[offset1d + i]
            ${f ? "+ beta[offset1d + i]" : ""};
        }
      }`;
    }, C = [{ dims: u2, dataType: e2[0].dataType }];
    return n2 > 1 && C.push({ dims: m, dataType: 1 }), n2 > 2 && C.push({ dims: m, dataType: 1 }), n2 > 3 && C.push({ dims: a2, dataType: e2[0].dataType }), { name: "SkipLayerNormalization", shaderCache: { hint: `${v};${_};${b};${w}`, inputDependencies: e2.map((A, I) => "type") }, getShaderSource: T, getRunData: () => ({ outputs: C, dispatchGroup: { x: Math.ceil(d2 / c2) }, programUniforms: $ }) };
  }, Vd = (e2, t2) => {
    ng(e2.inputs);
    let r2 = [0];
    e2.outputCount > 1 && r2.push(-3), e2.outputCount > 2 && r2.push(-3), e2.outputCount > 3 && r2.push(3), e2.compute(og(e2.inputs, t2, e2.outputCount, false), { outputs: r2 });
  };
});
var ig;
var dn;
var ag;
var Wd;
var sg;
var ug;
var Gd;
var Hd;
var Fd = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ue();
  ig = (e2, t2) => {
    if (!e2 || e2.length < 1) throw new Error("too few inputs");
    if (t2.axes.length !== 0) {
      if (t2.axes.length !== t2.starts.length || t2.axes.length !== t2.ends.length) throw new Error("axes, starts and ends must have the same length");
    } else if (t2.starts.length !== t2.ends.length) throw new Error("starts and ends must have the same length");
    e2.slice(1).forEach((n2, r2) => {
      if (e2[r2 + 1].dataType !== 6 && e2[r2 + 1].dataType !== 7) throw new Error(`Input ${r2} must be an array of int32 or int64`);
    });
  }, dn = (e2, t2) => {
    let n2 = [];
    if (e2.length > t2) if (e2[t2].dataType === 7) e2[t2].getBigInt64Array().forEach((r2) => n2.push(Number(r2)));
    else if (e2[t2].dataType === 6) e2[t2].getInt32Array().forEach((r2) => n2.push(Number(r2)));
    else throw new Error(`Input ${t2} must be an array of int32 or int64`);
    return n2;
  }, ag = (e2, t2) => {
    if (e2.length > 1) {
      let n2 = dn(e2, 1), r2 = dn(e2, 2), o2 = dn(e2, 3);
      return o2.length === 0 && (o2 = [...Array(e2[0].dims.length).keys()]), te({ starts: n2, ends: r2, axes: o2 });
    } else return t2;
  }, Wd = (e2, t2, n2, r2, o2) => {
    let a2 = e2;
    return e2 < 0 && (a2 += n2[r2[t2]]), o2[t2] < 0 ? Math.max(0, Math.min(a2, n2[r2[t2]] - 1)) : Math.max(0, Math.min(a2, n2[r2[t2]]));
  }, sg = (e2, t2, n2) => `fn calculateInputIndices(output_indices: ${t2.type.indices}) -> ${e2.type.indices} {
          var input_indices: ${e2.type.indices};
          var carry = 0u;
          for (var i = ${n2.length - 1}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape", "i", n2.length)};
            let steps_i = ${K("uniforms.steps", "i", n2.length)};
            let signs_i = ${K("uniforms.signs", "i", n2.length)};
            let starts_i = ${K("uniforms.starts", "i", n2.length)};
            var output_index = ${t2.indicesGet("output_indices", "i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e2.indicesSet("input_indices", "i", "input_index")};
          }
          return input_indices;
      }`, ug = (e2, t2) => {
    let n2 = e2[0].dims, r2 = E.size(n2), o2 = t2.axes.length > 0 ? E.normalizeAxes(t2.axes, n2.length) : [...Array(n2.length).keys()], a2 = dn(e2, 4);
    a2.forEach((v) => v !== 0 || (() => {
      throw new Error("step cannot be 0");
    })), a2.length === 0 && (a2 = Array(o2.length).fill(1));
    let s2 = t2.starts.map((v, $) => Wd(v, $, n2, o2, a2)), u2 = t2.ends.map((v, $) => Wd(v, $, n2, o2, a2));
    if (o2.length !== s2.length || o2.length !== u2.length) throw new Error("start, ends and axes should have the same number of elements");
    if (o2.length !== n2.length) for (let v = 0; v < n2.length; ++v) o2.includes(v) || (s2.splice(v, 0, 0), u2.splice(v, 0, n2[v]), a2.splice(v, 0, 1));
    let d2 = a2.map((v) => Math.sign(v));
    a2.forEach((v, $, T) => {
      if (v < 0) {
        let C = (u2[$] - s2[$]) / v, A = s2[$], I = A + C * a2[$];
        s2[$] = I, u2[$] = A, T[$] = -v;
      }
    });
    let c2 = n2.slice(0);
    o2.forEach((v, $) => {
      c2[v] = Math.ceil((u2[v] - s2[v]) / a2[v]);
    });
    let m = { dims: c2, dataType: e2[0].dataType }, f = N("output", e2[0].dataType, c2.length), g2 = P("input", e2[0].dataType, e2[0].dims.length), _ = E.size(c2), b = [{ name: "outputSize", type: "u32" }, { name: "starts", type: "u32", length: s2.length }, { name: "signs", type: "i32", length: d2.length }, { name: "steps", type: "u32", length: a2.length }], w = [{ type: 12, data: _ }, { type: 12, data: s2 }, { type: 6, data: d2 }, { type: 12, data: a2 }, ...W(e2[0].dims, c2)], x = (v) => `
      ${v.registerUniforms(b).declareVariables(g2, f)}
        ${sg(g2, f, n2)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx", g2.getByIndices("input_indices"))}
      }`;
    return { name: "Slice", shaderCache: { hint: `${d2.length}_${s2.length}_${a2.length}`, inputDependencies: ["rank"] }, getShaderSource: x, getRunData: () => ({ outputs: [m], dispatchGroup: { x: Math.ceil(r2 / 64) }, programUniforms: w }) };
  }, Gd = (e2, t2) => {
    ig(e2.inputs, t2);
    let n2 = ag(e2.inputs, t2);
    e2.compute(ug(e2.inputs, n2), { inputs: [0] });
  }, Hd = (e2) => {
    let t2 = e2.starts, n2 = e2.ends, r2 = e2.axes;
    return te({ starts: t2, ends: n2, axes: r2 });
  };
});
var lg;
var dg;
var qd;
var jd;
var Kd = L(() => {
  "use strict";
  ee();
  ae();
  Se();
  ct();
  ue();
  lg = (e2) => {
    if (!e2 || e2.length !== 1) throw new Error("Softmax op requires 1 input.");
  }, dg = (e2, t2) => {
    let n2 = e2.inputs[0], r2 = n2.dims, o2 = E.size(r2), a2 = r2.length, s2 = E.normalizeAxis(t2.axis, a2), u2 = s2 < r2.length - 1, d2, c2 = [];
    u2 ? (c2 = Array.from({ length: a2 }, (z, D) => D), c2[s2] = a2 - 1, c2[a2 - 1] = s2, d2 = e2.compute(Pe(n2, c2), { inputs: [n2], outputs: [-1] })[0]) : d2 = n2;
    let m = d2.dims, f = m[a2 - 1], g2 = o2 / f, _ = he(f), b = f / _, w = 64;
    g2 === 1 && (w = 256);
    let x = (z, D) => D === 4 ? `max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))` : D === 2 ? `max(${z}.x, ${z}.y)` : D === 3 ? `max(max(${z}.x, ${z}.y), ${z}.z)` : z, v = P("x", d2.dataType, d2.dims, _), $ = N("result", d2.dataType, d2.dims, _), T = v.type.value, C = ve(d2.dataType) === "f32" ? `var threadMax = ${T}(-3.402823e+38f);` : `var threadMax = ${T}(-65504.0h);`, A = (z) => `
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols", "i32").declareVariables(v, $)}
      ${z.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${x("threadShared[0]", _)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${je("threadShared[0]", _)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`, I = e2.compute({ name: "Softmax", shaderCache: { hint: `${_};${w}`, inputDependencies: ["type"] }, getRunData: () => ({ outputs: [{ dims: m, dataType: d2.dataType }], dispatchGroup: { x: g2 }, programUniforms: [{ type: 6, data: b }] }), getShaderSource: A }, { inputs: [d2], outputs: [u2 ? -1 : 0] })[0];
    u2 && e2.compute(Pe(I, c2), { inputs: [I] });
  }, qd = (e2, t2) => {
    lg(e2.inputs), dg(e2, t2);
  }, jd = (e2) => te({ axis: e2.axis });
});
var Zd;
var cg;
var pg;
var mg;
var Qd;
var Yd = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  Zd = (e2) => Array.from(e2.getBigInt64Array(), Number), cg = (e2) => {
    if (!e2 || e2.length !== 2) throw new Error("Tile requires 2 inputs.");
    if (e2[0].dataType !== 1 && e2[0].dataType !== 10 && e2[0].dataType !== 6 && e2[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types");
    if (e2[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type");
    if (e2[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D");
    if (Zd(e2[1]).length !== e2[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor");
  }, pg = (e2, t2) => {
    let n2 = [];
    for (let r2 = 0; r2 < e2.length; ++r2) n2.push(e2[r2] * t2[r2]);
    return n2;
  }, mg = (e2, t2) => {
    let n2 = e2[0].dims, r2 = t2 ?? Zd(e2[1]), o2 = pg(n2, r2), a2 = E.size(o2), s2 = e2[0].dataType, u2 = P("input", s2, n2.length), d2 = N("output", s2, o2.length), c2 = (m) => `
      const inputShape = ${u2.indices(...n2)};
      ${m.registerUniform("output_size", "u32").declareVariables(u2, d2)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d2.offsetToIndices("global_idx")};
      var input_indices: ${u2.type.indices};
      for (var i = 0; i < ${n2.length}; i++) {
        let input_dim_i = ${u2.indicesGet("uniforms.input_shape", "i")};
        let input_dim_value = ${d2.indicesGet("output_indices", "i")}  % input_dim_i;

        ${u2.indicesSet("input_indices", "i", "input_dim_value")}
      }
      ${d2.setByOffset("global_idx", u2.getByIndices("input_indices"))}
    }`;
    return { name: "Tile", shaderCache: { hint: `${r2}`, inputDependencies: ["rank"] }, getRunData: () => ({ outputs: [{ dims: o2, dataType: e2[0].dataType }], dispatchGroup: { x: Math.ceil(a2 / 64) }, programUniforms: [{ type: 12, data: a2 }, ...W(e2[0].dims, o2)] }), getShaderSource: c2 };
  }, Qd = (e2) => {
    cg(e2.inputs), e2.compute(mg(e2.inputs), { inputs: [0] });
  };
});
var fg;
var hg;
var Xd;
var Jd = L(() => {
  "use strict";
  ee();
  ae();
  ue();
  fg = (e2, t2, n2, r2, o2) => {
    let a2 = N("output_data", o2, n2.length, 4), s2 = P("a_data", t2[1].dataType, t2[1].dims.length, 4), u2 = P("b_data", t2[2].dataType, t2[2].dims.length, 4), d2 = P("c_data", t2[0].dataType, t2[0].dims.length, 4), c2, m = (f, g2, _) => `select(${g2}, ${f}, ${_})`;
    if (!r2) c2 = a2.setByOffset("global_idx", m(s2.getByOffset("global_idx"), u2.getByOffset("global_idx"), d2.getByOffset("global_idx")));
    else {
      let f = (g2, _, b = "") => {
        let w = `a_data[index_a${_}][component_a${_}]`, x = `b_data[index_b${_}][component_b${_}]`, v = `bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;
        return `
            let output_indices${_} = ${a2.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s2.broadcastedIndicesToOffset(`output_indices${_}`, a2)};
            let offset_b${_} = ${u2.broadcastedIndicesToOffset(`output_indices${_}`, a2)};
            let offset_c${_} = ${d2.broadcastedIndicesToOffset(`output_indices${_}`, a2)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g2}[${_}] = ${b}(${m(w, x, v)});
          `;
      };
      o2 === 9 ? c2 = `
            var data = vec4<u32>(0);
            ${f("data", 0, "u32")}
            ${f("data", 1, "u32")}
            ${f("data", 2, "u32")}
            ${f("data", 3, "u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : c2 = `
            ${f("output_data[global_idx]", 0)}
            ${f("output_data[global_idx]", 1)}
            ${f("output_data[global_idx]", 2)}
            ${f("output_data[global_idx]", 3)}
          `;
    }
    return `
        ${e2.registerUniform("vec_size", "u32").declareVariables(d2, s2, u2, a2)}
        ${e2.mainStart()}
        ${e2.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c2}
      }`;
  }, hg = (e2) => {
    let t2 = e2[1].dims, n2 = e2[2].dims, r2 = e2[0].dims, o2 = e2[1].dataType, a2 = !(E.areEqual(t2, n2) && E.areEqual(n2, r2)), s2 = t2, u2 = E.size(t2);
    if (a2) {
      let c2 = tt.calcShape(tt.calcShape(t2, n2, false), r2, false);
      if (!c2) throw new Error("Can't perform where op on the given tensors");
      s2 = c2, u2 = E.size(s2);
    }
    let d2 = Math.ceil(u2 / 4);
    return { name: "Where", shaderCache: { inputDependencies: ["rank", "rank", "rank"] }, getShaderSource: (c2) => fg(c2, e2, s2, a2, o2), getRunData: () => ({ outputs: [{ dims: s2, dataType: o2 }], dispatchGroup: { x: Math.ceil(u2 / 64 / 4) }, programUniforms: [{ type: 12, data: d2 }, ...W(r2, t2, n2, s2)] }) };
  }, Xd = (e2) => {
    e2.compute(hg(e2.inputs));
  };
});
var ec;
var tc = L(() => {
  "use strict";
  Bs();
  Yr();
  Us();
  Vs();
  Tu();
  Mu();
  Nu();
  tl();
  ul();
  cl();
  fl();
  _l();
  $l();
  Sl();
  Il();
  kl();
  zl();
  Ml();
  Nl();
  Wl();
  Yl();
  ed();
  rd();
  od();
  sd();
  Eo();
  ld();
  Cd();
  Ed();
  Pd();
  Dd();
  Zr();
  Nd();
  Oo();
  Ld();
  Fd();
  Kd();
  Po();
  Yd();
  ct();
  Jr();
  Jd();
  ec = /* @__PURE__ */ new Map([["Abs", [Ls]], ["Acos", [Ws]], ["Acosh", [Gs]], ["Add", [Cu]], ["ArgMax", [Ds, go]], ["ArgMin", [zs, go]], ["Asin", [Hs]], ["Asinh", [Fs]], ["Atan", [qs]], ["Atanh", [js]], ["Attention", [Ms]], ["AveragePool", [yd, gd]], ["BatchNormalization", [Rs]], ["BiasAdd", [Ns]], ["BiasSplitGelu", [Su]], ["Cast", [Zs, Ks]], ["Ceil", [Ys]], ["Clip", [Qs]], ["Concat", [Ru, Uu]], ["Conv", [To, So]], ["ConvTranspose", [sl, il]], ["Cos", [Xs]], ["Cosh", [Js]], ["CumSum", [ll, dl]], ["DepthToSpace", [pl, ml]], ["DequantizeLinear", [Id, Ad]], ["Div", [Iu]], ["Einsum", [yl, bl]], ["Elu", [eu, or]], ["Equal", [Au]], ["Erf", [tu]], ["Exp", [ru]], ["Expand", [vl]], ["FastGelu", [xl]], ["Floor", [nu]], ["FusedConv", [To, So]], ["Gather", [Cl, Tl]], ["GatherElements", [Bl, Dl]], ["GatherBlockQuantized", [Pl, Ol]], ["GatherND", [Al, El]], ["Gelu", [ou]], ["Gemm", [Ul, Rl]], ["GlobalAveragePool", [wd, _d]], ["GlobalMaxPool", [Td, Sd]], ["Greater", [Ou]], ["GreaterOrEqual", [Du]], ["GridSample", [Vl, Ll]], ["GroupQueryAttention", [Ql]], ["HardSigmoid", [pu, cu]], ["InstanceNormalization", [Jl]], ["LayerNormalization", [td]], ["LeakyRelu", [iu, or]], ["Less", [zu]], ["LessOrEqual", [Bu]], ["Log", [vu]], ["MatMul", [nd]], ["MatMulNBits", [id, ad]], ["MaxPool", [$d, xd]], ["Mul", [Eu]], ["MultiHeadAttention", [Fl, Hl]], ["Neg", [su]], ["Not", [au]], ["Pad", [ud]], ["Pow", [ku]], ["QuickGelu", [$u, or]], ["Range", [kd]], ["Reciprocal", [uu]], ["ReduceMin", [Is]], ["ReduceMean", [$s]], ["ReduceMax", [Cs]], ["ReduceSum", [Es]], ["ReduceProd", [As]], ["ReduceL1", [xs]], ["ReduceL2", [Ss]], ["ReduceLogSum", [Ps]], ["ReduceLogSumExp", [Ts]], ["ReduceSumSquare", [ks]], ["Relu", [lu]], ["Resize", [Rd, Ud]], ["RotaryEmbedding", [Kl]], ["ScatterND", [zd, Od]], ["Sigmoid", [du]], ["Sin", [mu]], ["Sinh", [fu]], ["Slice", [Gd, Hd]], ["SkipLayerNormalization", [Vd]], ["Split", [ql, jl]], ["Sqrt", [hu]], ["Softmax", [qd, jd]], ["Sub", [Pu]], ["Tan", [gu]], ["Tanh", [bu]], ["ThresholdedRelu", [wu, or]], ["Tile", [Qd]], ["Transpose", [ls, ds]], ["Where", [Xd]]]);
});
var cn;
var rc = L(() => {
  "use strict";
  Ve();
  et();
  ue();
  cn = class {
    constructor(t2) {
      this.backend = t2;
      this.repo = /* @__PURE__ */ new Map(), this.attributesBound = false;
    }
    getArtifact(t2) {
      return this.repo.get(t2);
    }
    setArtifact(t2, n2) {
      this.repo.set(t2, n2);
    }
    run(t2, n2, r2, o2, a2) {
      Ne(t2.programInfo.name);
      let s2 = this.backend.device, u2 = this.backend.getComputePassEncoder();
      this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2);
      let d2 = [];
      for (let m of n2) d2.push({ binding: d2.length, resource: { buffer: m.buffer } });
      for (let m of r2) d2.push({ binding: d2.length, resource: { buffer: m.buffer } });
      a2 && d2.push({ binding: d2.length, resource: a2 });
      let c2 = s2.createBindGroup({ layout: t2.computePipeline.getBindGroupLayout(0), entries: d2, label: t2.programInfo.name });
      if (this.backend.sessionStatus === "capturing") {
        let m = { kernelId: this.backend.currentKernelId, computePipeline: t2.computePipeline, bindGroup: c2, dispatchGroup: o2 };
        this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m);
      }
      u2.setPipeline(t2.computePipeline), u2.setBindGroup(0, c2), u2.dispatchWorkgroups(...o2), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), Me(t2.programInfo.name);
    }
    dispose() {
    }
    build(t2, n2) {
      Ne(t2.name);
      let r2 = this.backend.device, o2 = [];
      [{ feature: "shader-f16", extension: "f16" }, { feature: "subgroups", extension: "subgroups" }].forEach((f) => {
        r2.features.has(f.feature) && o2.push(`enable ${f.extension};`);
      });
      let s2 = ss(n2, this.backend.device.limits), u2 = t2.getShaderSource(s2), d2 = `${o2.join(`
`)}
${s2.additionalImplementations}
${u2}`, c2 = r2.createShaderModule({ code: d2, label: t2.name });
      le("verbose", () => `[WebGPU] ${t2.name} shader code: ${d2}`);
      let m = r2.createComputePipeline({ compute: { module: c2, entryPoint: "main" }, layout: "auto", label: t2.name });
      return Me(t2.name), { programInfo: t2, computePipeline: m, uniformVariablesInfo: s2.variablesInfo };
    }
    normalizeDispatchGroupSize(t2) {
      let n2 = typeof t2 == "number" ? t2 : t2.x, r2 = typeof t2 == "number" ? 1 : t2.y || 1, o2 = typeof t2 == "number" ? 1 : t2.z || 1, a2 = this.backend.device.limits.maxComputeWorkgroupsPerDimension;
      if (n2 <= a2 && r2 <= a2 && o2 <= a2) return [n2, r2, o2];
      let s2 = n2 * r2 * o2, u2 = Math.ceil(Math.sqrt(s2));
      if (u2 > a2) {
        if (u2 = Math.ceil(Math.cbrt(s2)), u2 > a2) throw new Error("Total dispatch size exceeds WebGPU maximum.");
        return [u2, u2, u2];
      } else return [u2, u2, 1];
    }
  };
});
var nc = {};
Wt(nc, { WebGpuBackend: () => Do });
var gg;
var yg;
var zo;
var Do;
var oc = L(() => {
  "use strict";
  Ve();
  ee();
  et();
  no();
  is();
  tc();
  rc();
  gg = (e2, t2) => {
    if (t2.length !== e2.length) throw new Error(`inputDependencies length ${t2.length} is not equal to inputTensors length ${e2.length}.`);
    let n2 = [];
    for (let r2 = 0; r2 < e2.length; ++r2) {
      let o2 = e2[r2].dataType;
      switch (t2[r2]) {
        case "none": {
          n2.push("");
          break;
        }
        case "type": {
          n2.push(`${o2}`);
          break;
        }
        case "rank": {
          let a2 = e2[r2].dims.length;
          n2.push(`${o2};${a2}`);
          break;
        }
        case "dims": {
          let a2 = e2[r2].dims.join(",");
          n2.push(`${o2};${a2}`);
          break;
        }
        default:
          throw new Error(`unsupported input dependency: ${t2[r2]}`);
      }
    }
    return n2.join("|");
  }, yg = (e2, t2, n2) => {
    let r2 = e2.name;
    return e2.shaderCache?.hint && (r2 += "[" + e2.shaderCache.hint + "]"), r2 += ":" + n2 + `:${gg(t2, e2.shaderCache?.inputDependencies ?? new Array(t2.length).fill("dims"))}`, r2;
  }, zo = class {
    constructor(t2) {
      t2 && (this.architecture = t2.architecture, this.vendor = t2.vendor);
    }
    isArchitecture(t2) {
      return this.architecture === t2;
    }
    isVendor(t2) {
      return this.vendor === t2;
    }
  }, Do = class {
    constructor() {
      this.currentSessionId = null;
      this.currentKernelId = null;
      this.commandEncoder = null;
      this.computePassEncoder = null;
      this.maxDispatchNumber = 16;
      this.pendingDispatchNumber = 0;
      this.pendingKernels = [];
      this.pendingQueries = /* @__PURE__ */ new Map();
      this.sessionStatus = "default";
      this.capturedCommandList = /* @__PURE__ */ new Map();
      this.capturedPendingKernels = /* @__PURE__ */ new Map();
      this.sessionExternalDataMapping = /* @__PURE__ */ new Map();
    }
    get currentKernelCustomData() {
      if (this.currentKernelId === null) throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");
      let t2 = this.kernelCustomData.get(this.currentKernelId);
      return t2 || (t2 = {}, this.kernelCustomData.set(this.currentKernelId, t2)), t2;
    }
    async initialize(t2, n2) {
      this.env = t2;
      let r2 = [], o2 = { requiredLimits: { maxComputeWorkgroupStorageSize: n2.limits.maxComputeWorkgroupStorageSize, maxComputeWorkgroupsPerDimension: n2.limits.maxComputeWorkgroupsPerDimension, maxStorageBufferBindingSize: n2.limits.maxStorageBufferBindingSize, maxBufferSize: n2.limits.maxBufferSize, maxComputeInvocationsPerWorkgroup: n2.limits.maxComputeInvocationsPerWorkgroup, maxComputeWorkgroupSizeX: n2.limits.maxComputeWorkgroupSizeX, maxComputeWorkgroupSizeY: n2.limits.maxComputeWorkgroupSizeY, maxComputeWorkgroupSizeZ: n2.limits.maxComputeWorkgroupSizeZ }, requiredFeatures: r2 }, a2 = (s2) => n2.features.has(s2) && r2.push(s2) && true;
      a2("chromium-experimental-timestamp-query-inside-passes") || a2("timestamp-query"), a2("shader-f16"), a2("subgroups"), this.device = await n2.requestDevice(o2), this.adapterInfo = new zo(n2.info || await n2.requestAdapterInfo()), this.gpuDataManager = os(this), this.programManager = new cn(this), this.kernels = /* @__PURE__ */ new Map(), this.kernelPersistentData = /* @__PURE__ */ new Map(), this.kernelCustomData = /* @__PURE__ */ new Map(), Nr(t2.logLevel, !!t2.debug), this.device.onuncapturederror = (s2) => {
        s2.error instanceof GPUValidationError && console.error(`An uncaught WebGPU validation error was raised: ${s2.error.message}`);
      }, Object.defineProperty(this.env.webgpu, "device", { value: this.device, writable: false, enumerable: true, configurable: false }), Object.defineProperty(this.env.webgpu, "adapter", { value: n2, writable: false, enumerable: true, configurable: false }), this.setQueryType();
    }
    dispose() {
      typeof this.querySet < "u" && this.querySet.destroy(), this.gpuDataManager.dispose();
    }
    getCommandEncoder() {
      return this.commandEncoder || (this.commandEncoder = this.device.createCommandEncoder()), this.commandEncoder;
    }
    getComputePassEncoder() {
      if (!this.computePassEncoder) {
        let t2 = this.getCommandEncoder(), n2 = {};
        this.queryType === "at-passes" && (n2.timestampWrites = { querySet: this.querySet, beginningOfPassWriteIndex: this.pendingDispatchNumber * 2, endOfPassWriteIndex: this.pendingDispatchNumber * 2 + 1 }), this.computePassEncoder = t2.beginComputePass(n2);
      }
      return this.computePassEncoder;
    }
    endComputePass() {
      this.computePassEncoder && (this.computePassEncoder.end(), this.computePassEncoder = null);
    }
    flush() {
      if (!this.commandEncoder) return;
      Ne(), this.endComputePass();
      let t2;
      this.queryType !== "none" && (this.commandEncoder.resolveQuerySet(this.querySet, 0, this.pendingDispatchNumber * 2, this.queryResolveBuffer, 0), t2 = this.device.createBuffer({ size: this.pendingDispatchNumber * 2 * 8, usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST }), this.pendingQueries.set(t2, this.pendingKernels), this.pendingKernels = [], this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer, 0, t2, 0, this.pendingDispatchNumber * 2 * 8)), this.device.queue.submit([this.commandEncoder.finish()]), this.gpuDataManager.refreshPendingBuffers(), this.commandEncoder = null, this.pendingDispatchNumber = 0, this.queryType !== "none" && t2.mapAsync(GPUMapMode.READ).then(() => {
        let n2 = new BigUint64Array(t2.getMappedRange()), r2 = this.pendingQueries.get(t2);
        for (let o2 = 0; o2 < n2.length / 2; o2++) {
          let a2 = r2[o2], s2 = a2.kernelId, u2 = this.kernels.get(s2), d2 = u2.kernelType, c2 = u2.kernelName, m = a2.programName, f = a2.inputTensorViews, g2 = a2.outputTensorViews, _ = n2[o2 * 2], b = n2[o2 * 2 + 1];
          typeof this.queryTimeBase > "u" && (this.queryTimeBase = _);
          let w = Number(_ - this.queryTimeBase), x = Number(b - this.queryTimeBase);
          if (!Number.isSafeInteger(w) || !Number.isSafeInteger(x)) throw new RangeError("incorrect timestamp range");
          if (this.env.webgpu.profiling?.ondata) this.env.webgpu.profiling.ondata({ version: 1, inputsMetadata: f.map((v) => ({ dims: v.dims, dataType: Je(v.dataType) })), outputsMetadata: g2.map((v) => ({ dims: v.dims, dataType: Je(v.dataType) })), kernelId: s2, kernelType: d2, kernelName: c2, programName: m, startTime: w, endTime: x });
          else {
            let v = "";
            f.forEach((T, C) => {
              v += `input[${C}]: [${T.dims}] | ${Je(T.dataType)}, `;
            });
            let $ = "";
            g2.forEach((T, C) => {
              $ += `output[${C}]: [${T.dims}] | ${Je(T.dataType)}, `;
            }), console.log(`[profiling] kernel "${s2}|${d2}|${c2}|${m}" ${v}${$}start time: ${w} ns, execution time: ${x - w} ns`);
          }
          $r("GPU", `${m}::${_}::${b}`);
        }
        t2.unmap(), this.pendingQueries.delete(t2);
      }), Me();
    }
    run(t2, n2, r2, o2, a2, s2) {
      Ne(t2.name);
      let u2 = [];
      for (let T = 0; T < n2.length; ++T) {
        let C = n2[T].data;
        if (C === 0) continue;
        let A = this.gpuDataManager.get(C);
        if (!A) throw new Error(`no GPU data for input: ${C}`);
        u2.push(A);
      }
      let { outputs: d2, dispatchGroup: c2, programUniforms: m } = t2.getRunData(n2), f = r2.length === 0 ? d2.map((T, C) => C) : r2;
      if (f.length !== d2.length) throw new Error(`Output size ${f.length} must be equal to ${d2.length}.`);
      let g2 = [], _ = [];
      for (let T = 0; T < d2.length; ++T) {
        if (!Number.isInteger(f[T]) || f[T] < -3 || f[T] >= s2) throw new Error(`Invalid output index: ${f[T]}`);
        if (f[T] === -3) continue;
        let C = f[T] === -1, A = f[T] === -2, I = C || A ? a2(d2[T].dataType, d2[T].dims) : o2(f[T], d2[T].dataType, d2[T].dims);
        if (g2.push(I), I.data === 0) continue;
        let z = this.gpuDataManager.get(I.data);
        if (!z) throw new Error(`no GPU data for output: ${I.data}`);
        if (C && this.temporaryData.push(z), A) {
          let D = this.kernelPersistentData.get(this.currentKernelId);
          D || (D = [], this.kernelPersistentData.set(this.currentKernelId, D)), D.push(z);
        }
        _.push(z);
      }
      if (u2.length !== n2.length || _.length !== g2.length) {
        if (_.length === 0) return Me(t2.name), g2;
        throw new Error(`Program ${t2.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`);
      }
      let b;
      if (m) {
        let T = 0, C = [];
        m.forEach((D) => {
          let R = typeof D.data == "number" ? [D.data] : D.data;
          if (R.length === 0) return;
          let H = D.type === 10 ? 2 : 4, q, Y;
          D.type === 10 ? (Y = R.length > 4 ? 16 : R.length > 2 ? 8 : R.length * H, q = R.length > 4 ? 16 : H * R.length) : (Y = R.length <= 2 ? R.length * H : 16, q = 16), T = Math.ceil(T / Y) * Y, C.push(T);
          let ne = D.type === 10 ? 8 : 4;
          T += R.length > 4 ? Math.ceil(R.length / ne) * q : R.length * H;
        });
        let A = 16;
        T = Math.ceil(T / A) * A;
        let I = new ArrayBuffer(T);
        m.forEach((D, R) => {
          let H = C[R], q = typeof D.data == "number" ? [D.data] : D.data;
          if (D.type === 6) new Int32Array(I, H, q.length).set(q);
          else if (D.type === 12) new Uint32Array(I, H, q.length).set(q);
          else if (D.type === 10) new Uint16Array(I, H, q.length).set(q);
          else if (D.type === 1) new Float32Array(I, H, q.length).set(q);
          else throw new Error(`Unsupported uniform type: ${Je(D.type)}`);
        });
        let z = this.gpuDataManager.create(T, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM);
        this.device.queue.writeBuffer(z.buffer, 0, I, 0, T), this.gpuDataManager.release(z.id), b = { offset: 0, size: T, buffer: z.buffer };
      }
      let w = this.programManager.normalizeDispatchGroupSize(c2), x = w[1] === 1 && w[2] === 1, v = yg(t2, n2, x), $ = this.programManager.getArtifact(v);
      if ($ || ($ = this.programManager.build(t2, w), this.programManager.setArtifact(v, $), le("info", () => `[artifact] key: ${v}, programName: ${t2.name}`)), m && $.uniformVariablesInfo) {
        if (m.length !== $.uniformVariablesInfo.length) throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${m.length} in program "${$.programInfo.name}".`);
        for (let T = 0; T < m.length; T++) {
          let C = m[T], A = C.type, I = typeof C.data == "number" ? 1 : C.data.length, [z, D] = $.uniformVariablesInfo[T];
          if (A !== z || I !== D) throw new Error(`Uniform variable ${T} mismatch: expect type ${z} with size ${D}, got type ${A} with size ${I} in program "${$.programInfo.name}".`);
        }
      }
      if (le("info", () => `[ProgramManager] run "${t2.name}" (key=${v}) with ${w[0]}x${w[1]}x${w[2]}`), this.queryType !== "none" || this.sessionStatus === "capturing") {
        let T = { kernelId: this.currentKernelId, programName: $.programInfo.name, inputTensorViews: n2, outputTensorViews: g2 };
        this.pendingKernels.push(T), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(T);
      }
      return this.programManager.run($, u2, _, w, b), Me(t2.name), g2;
    }
    upload(t2, n2) {
      this.gpuDataManager.upload(t2, n2);
    }
    memcpy(t2, n2) {
      this.gpuDataManager.memcpy(t2, n2);
    }
    async download(t2, n2) {
      await this.gpuDataManager.download(t2, n2);
    }
    alloc(t2) {
      return this.gpuDataManager.create(t2).id;
    }
    free(t2) {
      return this.gpuDataManager.release(t2);
    }
    createKernel(t2, n2, r2, o2) {
      let a2 = ec.get(t2);
      if (!a2) throw new Error(`kernel not implemented: ${t2}`);
      let s2 = { kernelType: t2, kernelName: o2, kernelEntry: a2[0], attributes: [a2[1], r2] };
      this.kernels.set(n2, s2);
    }
    releaseKernel(t2) {
      let n2 = this.kernelPersistentData.get(t2);
      if (n2) {
        for (let r2 of n2) this.gpuDataManager.release(r2.id);
        this.kernelPersistentData.delete(t2);
      }
      this.kernelCustomData.delete(t2), this.kernels.delete(t2);
    }
    computeKernel(t2, n2, r2) {
      let o2 = this.kernels.get(t2);
      if (!o2) throw new Error(`kernel not created: ${t2}`);
      let a2 = o2.kernelType, s2 = o2.kernelName, u2 = o2.kernelEntry, d2 = o2.attributes;
      if (this.currentKernelId !== null) throw new Error(`kernel "[${a2}] ${s2}" is not allowed to be called recursively`);
      this.currentKernelId = t2, d2[0] && (d2[1] = d2[0](d2[1]), d2[0] = void 0), le("info", () => `[WebGPU] Start to run kernel "[${a2}] ${s2}"...`);
      let c2 = this.env.debug;
      this.temporaryData = [];
      try {
        return c2 && this.device.pushErrorScope("validation"), u2(n2, d2[1]), 0;
      } catch (m) {
        return r2.push(Promise.resolve(`[WebGPU] Kernel "[${a2}] ${s2}" failed. ${m}`)), 1;
      } finally {
        c2 && r2.push(this.device.popErrorScope().then((m) => m ? `GPU validation error for kernel "[${a2}] ${s2}": ${m.message}` : null));
        for (let m of this.temporaryData) this.gpuDataManager.release(m.id);
        this.temporaryData = [], this.currentKernelId = null;
      }
    }
    registerBuffer(t2, n2, r2, o2) {
      let a2 = this.sessionExternalDataMapping.get(t2);
      a2 || (a2 = /* @__PURE__ */ new Map(), this.sessionExternalDataMapping.set(t2, a2));
      let s2 = a2.get(n2), u2 = this.gpuDataManager.registerExternalBuffer(r2, o2, s2);
      return a2.set(n2, [u2, r2]), u2;
    }
    unregisterBuffers(t2) {
      let n2 = this.sessionExternalDataMapping.get(t2);
      n2 && (n2.forEach((r2) => this.gpuDataManager.unregisterExternalBuffer(r2[0])), this.sessionExternalDataMapping.delete(t2));
    }
    getBuffer(t2) {
      let n2 = this.gpuDataManager.get(t2);
      if (!n2) throw new Error(`no GPU data for buffer: ${t2}`);
      return n2.buffer;
    }
    createDownloader(t2, n2, r2) {
      return async () => {
        let o2 = await lo(this, t2, n2);
        return Lr(o2.buffer, r2);
      };
    }
    writeTimestamp(t2) {
      this.queryType === "inside-passes" && this.computePassEncoder.writeTimestamp(this.querySet, t2);
    }
    setQueryType() {
      this.queryType = "none", (this.env.webgpu.profiling?.mode === "default" || (typeof this.env.trace > "u" ? this.env.wasm.trace : this.env.trace)) && (this.device.features.has("chromium-experimental-timestamp-query-inside-passes") ? this.queryType = "inside-passes" : this.device.features.has("timestamp-query") && (this.queryType = "at-passes"), this.queryType !== "none" && typeof this.querySet > "u" && (this.querySet = this.device.createQuerySet({ type: "timestamp", count: this.maxDispatchNumber * 2 }), this.queryResolveBuffer = this.device.createBuffer({ size: this.maxDispatchNumber * 2 * 8, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.QUERY_RESOLVE })));
    }
    captureBegin() {
      le("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing";
    }
    captureEnd() {
      le("info", "captureEnd"), this.flush(), this.sessionStatus = "default";
    }
    replay() {
      le("info", "replay"), this.sessionStatus = "replaying";
      let t2 = this.capturedCommandList.get(this.currentSessionId), n2 = this.capturedPendingKernels.get(this.currentSessionId), r2 = t2.length;
      this.pendingKernels = [];
      for (let o2 = 0; o2 < r2; o2++) {
        let a2 = this.getComputePassEncoder(), s2 = t2[o2];
        this.writeTimestamp(this.pendingDispatchNumber * 2), a2.setPipeline(s2.computePipeline), a2.setBindGroup(0, s2.bindGroup), a2.dispatchWorkgroups(...s2.dispatchGroup), this.writeTimestamp(this.pendingDispatchNumber * 2 + 1), this.pendingDispatchNumber++, this.queryType !== "none" && this.pendingKernels.push(n2[o2]), (this.pendingDispatchNumber >= this.maxDispatchNumber || this.queryType === "at-passes") && this.endComputePass(), this.pendingDispatchNumber >= this.maxDispatchNumber && this.flush();
      }
      this.flush(), this.sessionStatus = "default";
    }
    onCreateSession() {
      this.gpuDataManager.onCreateSession();
    }
    onReleaseSession(t2) {
      this.unregisterBuffers(t2), this.capturedCommandList.has(t2) && this.capturedCommandList.delete(t2), this.capturedPendingKernels.has(t2) && this.capturedPendingKernels.delete(t2), this.gpuDataManager.onReleaseSession(t2);
    }
    onRunStart(t2) {
      this.currentSessionId = t2, this.setQueryType();
    }
  };
});
var ic = {};
Wt(ic, { init: () => bg });
var ur;
var Bo;
var bg;
var ac = L(() => {
  "use strict";
  ee();
  et();
  ae();
  es();
  ur = class e2 {
    constructor(t2, n2, r2, o2) {
      this.module = t2;
      this.dataType = n2;
      this.data = r2;
      this.dims = o2;
    }
    getFloat32Array() {
      if (this.dataType !== 1) throw new Error("Invalid data type");
      let t2 = E.size(this.dims);
      return t2 === 0 ? new Float32Array() : new Float32Array(this.module.HEAP8.buffer, this.data, t2);
    }
    getBigInt64Array() {
      if (this.dataType !== 7) throw new Error("Invalid data type");
      let t2 = E.size(this.dims);
      return t2 === 0 ? new BigInt64Array() : new BigInt64Array(this.module.HEAP8.buffer, this.data, t2);
    }
    getInt32Array() {
      if (this.dataType !== 6) throw new Error("Invalid data type");
      let t2 = E.size(this.dims);
      return t2 === 0 ? new Int32Array() : new Int32Array(this.module.HEAP8.buffer, this.data, t2);
    }
    getUint16Array() {
      if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type");
      let t2 = E.size(this.dims);
      return t2 === 0 ? new Uint16Array() : new Uint16Array(this.module.HEAP8.buffer, this.data, t2);
    }
    reshape(t2) {
      if (E.size(t2) !== E.size(this.dims)) throw new Error("Invalid new shape");
      return new e2(this.module, this.dataType, this.data, t2);
    }
  }, Bo = class {
    constructor(t2, n2, r2) {
      this.module = t2;
      this.backend = n2;
      this.customDataOffset = 0;
      this.customDataSize = 0;
      this.adapterInfo = n2.adapterInfo;
      let o2 = t2.PTR_SIZE, a2 = r2 / t2.PTR_SIZE, s2 = o2 === 4 ? "i32" : "i64";
      this.opKernelContext = Number(t2.getValue(o2 * a2++, s2));
      let u2 = Number(t2.getValue(o2 * a2++, s2));
      this.outputCount = Number(t2.getValue(o2 * a2++, s2)), this.customDataOffset = Number(t2.getValue(o2 * a2++, "*")), this.customDataSize = Number(t2.getValue(o2 * a2++, s2));
      let d2 = [];
      for (let c2 = 0; c2 < u2; c2++) {
        let m = Number(t2.getValue(o2 * a2++, s2)), f = Number(t2.getValue(o2 * a2++, "*")), g2 = Number(t2.getValue(o2 * a2++, s2)), _ = [];
        for (let b = 0; b < g2; b++) _.push(Number(t2.getValue(o2 * a2++, s2)));
        d2.push(new ur(t2, m, f, _));
      }
      this.inputs = d2;
    }
    get kernelCustomData() {
      return this.backend.currentKernelCustomData;
    }
    get customDataBuffer() {
      return this.module.HEAPU8.subarray(this.customDataOffset, this.customDataOffset + this.customDataSize);
    }
    compute(t2, n2) {
      let r2 = n2?.inputs?.map((u2) => typeof u2 == "number" ? this.inputs[u2] : u2) ?? this.inputs, o2 = n2?.outputs ?? [], a2 = (u2, d2, c2) => new ur(this.module, d2, this.output(u2, c2), c2), s2 = (u2, d2) => {
        let c2 = St(u2, d2);
        if (!c2) throw new Error(`Unsupported data type: ${u2}`);
        let m = c2 > 0 ? this.backend.gpuDataManager.create(c2).id : 0;
        return new ur(this.module, u2, m, d2);
      };
      return this.backend.run(t2, r2, o2, a2, s2, this.outputCount);
    }
    output(t2, n2) {
      let r2 = this.module.stackSave();
      try {
        let o2 = this.module.PTR_SIZE, a2 = o2 === 4 ? "i32" : "i64", s2 = this.module.stackAlloc((1 + n2.length) * o2);
        this.module.setValue(s2, n2.length, a2);
        for (let u2 = 0; u2 < n2.length; u2++) this.module.setValue(s2 + o2 * (u2 + 1), n2[u2], a2);
        return this.module._JsepOutput(this.opKernelContext, t2, s2);
      } catch (o2) {
        throw new Error(`Failed to generate kernel's output[${t2}] with dims [${n2}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o2}`);
      } finally {
        this.module.stackRestore(r2);
      }
    }
  }, bg = async (e2, t2, n2, r2) => {
    let o2 = t2.jsepInit;
    if (!o2) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");
    if (e2 === "webgpu") {
      let a2 = (oc(), Xt(nc)).WebGpuBackend, s2 = new a2();
      await s2.initialize(n2, r2), o2("webgpu", [s2, (u2) => s2.alloc(Number(u2)), (u2) => s2.free(u2), (u2, d2, c2, m = false) => {
        if (m) le("verbose", () => `[WebGPU] jsepCopyGpuToGpu: src=${Number(u2)}, dst=${Number(d2)}, size=${Number(c2)}`), s2.memcpy(Number(u2), Number(d2));
        else {
          le("verbose", () => `[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u2)}, gpuDataId=${Number(d2)}, size=${Number(c2)}`);
          let f = t2.HEAPU8.subarray(Number(u2 >>> 0), Number(u2 >>> 0) + Number(c2));
          s2.upload(Number(d2), f);
        }
      }, async (u2, d2, c2) => {
        le("verbose", () => `[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u2}, dataOffset=${d2}, size=${c2}`), await s2.download(Number(u2), () => t2.HEAPU8.subarray(Number(d2) >>> 0, Number(d2 + c2) >>> 0));
      }, (u2, d2, c2) => s2.createKernel(u2, Number(d2), c2, t2.UTF8ToString(t2._JsepGetNodeName(Number(d2)))), (u2) => s2.releaseKernel(u2), (u2, d2, c2, m) => {
        le("verbose", () => `[WebGPU] jsepRun: sessionHandle=${c2}, kernel=${u2}, contextDataOffset=${d2}`);
        let f = new Bo(t2, s2, Number(d2));
        return s2.computeKernel(Number(u2), f, m);
      }, () => s2.captureBegin(), () => s2.captureEnd(), () => s2.replay()]);
    } else {
      let a2 = new Fr(n2);
      o2("webnn", [a2, () => a2.reserveTensorId(), (s2) => a2.releaseTensorId(s2), async (s2, u2, d2, c2, m) => a2.ensureTensor(s2, u2, d2, c2, m), (s2, u2) => {
        a2.uploadTensor(s2, u2);
      }, async (s2, u2) => a2.downloadTensor(s2, u2), (s2, u2) => a2.registerMLContext(s2, u2), !!n2.trace]);
    }
  };
});
var _g;
var Ir;
var Ar;
var Rt;
var wg;
var sc;
var er;
var Er;
var kr;
var uc;
var Pr;
var Or;
var zr;
var Zn = L(() => {
  "use strict";
  Ve();
  La();
  Ga();
  ee();
  $t();
  Br();
  to();
  _g = (e2, t2) => {
    _e()._OrtInit(e2, t2) !== 0 && ye("Can't initialize onnxruntime.");
  }, Ir = async (e2) => {
    _g(e2.wasm.numThreads, rr(e2.logLevel));
  }, Ar = async (e2, t2) => {
    _e().asyncInit?.();
    let n2 = e2.webgpu.adapter;
    if (t2 === "webgpu") {
      if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
      if (n2) {
        if (typeof n2.limits != "object" || typeof n2.features != "object" || typeof n2.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
      } else {
        let r2 = e2.webgpu.powerPreference;
        if (r2 !== void 0 && r2 !== "low-power" && r2 !== "high-performance") throw new Error(`Invalid powerPreference setting: "${r2}"`);
        let o2 = e2.webgpu.forceFallbackAdapter;
        if (o2 !== void 0 && typeof o2 != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${o2}"`);
        if (n2 = await navigator.gpu.requestAdapter({ powerPreference: r2, forceFallbackAdapter: o2 }), !n2) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
      }
    }
    if (t2 === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
    {
      let r2 = (ac(), Xt(ic)).init;
      t2 === "webgpu" && await r2("webgpu", _e(), e2, n2), t2 === "webnn" && await r2("webnn", _e(), e2);
    }
  }, Rt = /* @__PURE__ */ new Map(), wg = (e2) => {
    let t2 = _e(), n2 = t2.stackSave();
    try {
      let r2 = t2.PTR_SIZE, o2 = t2.stackAlloc(2 * r2);
      t2._OrtGetInputOutputCount(e2, o2, o2 + r2) !== 0 && ye("Can't get session input/output count.");
      let s2 = r2 === 4 ? "i32" : "i64";
      return [Number(t2.getValue(o2, s2)), Number(t2.getValue(o2 + r2, s2))];
    } finally {
      t2.stackRestore(n2);
    }
  }, sc = (e2, t2) => {
    let n2 = _e(), r2 = n2.stackSave(), o2 = 0;
    try {
      let a2 = n2.PTR_SIZE, s2 = n2.stackAlloc(2 * a2);
      n2._OrtGetInputOutputMetadata(e2, t2, s2, s2 + a2) !== 0 && ye("Can't get session input/output metadata.");
      let d2 = Number(n2.getValue(s2, "*"));
      o2 = Number(n2.getValue(s2 + a2, "*"));
      let c2 = n2.HEAP32[o2 / 4];
      if (c2 === 0) return [d2, 0];
      let m = n2.HEAPU32[o2 / 4 + 1], f = [];
      for (let g2 = 0; g2 < m; g2++) {
        let _ = Number(n2.getValue(o2 + 8 + g2 * a2, "*"));
        f.push(_ !== 0 ? n2.UTF8ToString(_) : Number(n2.getValue(o2 + 8 + (g2 + m) * a2, "*")));
      }
      return [d2, c2, f];
    } finally {
      n2.stackRestore(r2), o2 !== 0 && n2._OrtFree(o2);
    }
  }, er = (e2) => {
    let t2 = _e(), n2 = t2._malloc(e2.byteLength);
    if (n2 === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e2.byteLength}.`);
    return t2.HEAPU8.set(e2, n2), [n2, e2.byteLength];
  }, Er = async (e2, t2) => {
    let n2, r2, o2 = _e();
    Array.isArray(e2) ? [n2, r2] = e2 : e2.buffer === o2.HEAPU8.buffer ? [n2, r2] = [e2.byteOffset, e2.byteLength] : [n2, r2] = er(e2);
    let a2 = 0, s2 = 0, u2 = 0, d2 = [], c2 = [], m = [];
    try {
      if ([s2, d2] = await Wa(t2), t2?.externalData && o2.mountExternalData) {
        let C = [];
        for (let A of t2.externalData) {
          let I = typeof A == "string" ? A : A.path;
          C.push(nr(typeof A == "string" ? A : A.data).then((z) => {
            o2.mountExternalData(I, z);
          }));
        }
        await Promise.all(C);
      }
      for (let C of t2?.executionProviders ?? []) if ((typeof C == "string" ? C : C.name) === "webnn") {
        if (o2.shouldTransferToMLTensor = false, typeof C != "string") {
          let I = C, z = I?.context, D = I?.gpuDevice, R = I?.deviceType, H = I?.powerPreference;
          z ? o2.currentContext = z : D ? o2.currentContext = await o2.webnnCreateMLContext(D) : o2.currentContext = await o2.webnnCreateMLContext({ deviceType: R, powerPreference: H });
        } else o2.currentContext = await o2.webnnCreateMLContext();
        break;
      }
      a2 = await o2._OrtCreateSession(n2, r2, s2), o2.webgpuOnCreateSession?.(a2), a2 === 0 && ye("Can't create a session."), o2.jsepOnCreateSession?.(), o2.currentContext && (o2.webnnRegisterMLContext(a2, o2.currentContext), o2.currentContext = void 0, o2.shouldTransferToMLTensor = true);
      let [f, g2] = wg(a2), _ = !!t2?.enableGraphCapture, b = [], w = [], x = [], v = [], $ = [];
      for (let C = 0; C < f; C++) {
        let [A, I, z] = sc(a2, C);
        A === 0 && ye("Can't get an input name."), c2.push(A);
        let D = o2.UTF8ToString(A);
        b.push(D), x.push(I === 0 ? { name: D, isTensor: false } : { name: D, isTensor: true, type: Je(I), shape: z });
      }
      for (let C = 0; C < g2; C++) {
        let [A, I, z] = sc(a2, C + f);
        A === 0 && ye("Can't get an output name."), m.push(A);
        let D = o2.UTF8ToString(A);
        w.push(D), v.push(I === 0 ? { name: D, isTensor: false } : { name: D, isTensor: true, type: Je(I), shape: z });
        {
          if (_ && t2?.preferredOutputLocation === void 0) {
            $.push("gpu-buffer");
            continue;
          }
          let R = typeof t2?.preferredOutputLocation == "string" ? t2.preferredOutputLocation : t2?.preferredOutputLocation?.[D] ?? "cpu", H = o2.webnnIsGraphOutput;
          if (R === "cpu" && H && H(a2, D)) {
            $.push("ml-tensor-cpu-output");
            continue;
          }
          if (R !== "cpu" && R !== "cpu-pinned" && R !== "gpu-buffer" && R !== "ml-tensor") throw new Error(`Not supported preferred output location: ${R}.`);
          if (_ && R !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${R}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
          $.push(R);
        }
      }
      let T = null;
      return $.some((C) => C === "gpu-buffer" || C === "ml-tensor" || C === "ml-tensor-cpu-output") && (u2 = o2._OrtCreateBinding(a2), u2 === 0 && ye("Can't create IO binding."), T = { handle: u2, outputPreferredLocations: $, outputPreferredLocationsEncoded: $.map((C) => C === "ml-tensor-cpu-output" ? "ml-tensor" : C).map((C) => eo(C)) }), Rt.set(a2, [a2, c2, m, T, _, false]), [a2, b, w, x, v];
    } catch (f) {
      throw c2.forEach((g2) => o2._OrtFree(g2)), m.forEach((g2) => o2._OrtFree(g2)), u2 !== 0 && o2._OrtReleaseBinding(u2) !== 0 && ye("Can't release IO binding."), a2 !== 0 && o2._OrtReleaseSession(a2) !== 0 && ye("Can't release session."), f;
    } finally {
      o2._free(n2), s2 !== 0 && o2._OrtReleaseSessionOptions(s2) !== 0 && ye("Can't release session options."), d2.forEach((f) => o2._free(f)), o2.unmountExternalData?.();
    }
  }, kr = (e2) => {
    let t2 = _e(), n2 = Rt.get(e2);
    if (!n2) throw new Error(`cannot release session. invalid session id: ${e2}`);
    let [r2, o2, a2, s2, u2] = n2;
    s2 && (u2 && t2._OrtClearBoundOutputs(s2.handle) !== 0 && ye("Can't clear bound outputs."), t2._OrtReleaseBinding(s2.handle) !== 0 && ye("Can't release IO binding.")), t2.jsepOnReleaseSession?.(e2), t2.webnnOnReleaseSession?.(e2), t2.webgpuOnReleaseSession?.(e2), o2.forEach((d2) => t2._OrtFree(d2)), a2.forEach((d2) => t2._OrtFree(d2)), t2._OrtReleaseSession(r2) !== 0 && ye("Can't release session."), Rt.delete(e2);
  }, uc = async (e2, t2, n2, r2, o2, a2, s2 = false) => {
    if (!e2) {
      t2.push(0);
      return;
    }
    let u2 = _e(), d2 = u2.PTR_SIZE, c2 = e2[0], m = e2[1], f = e2[3], g2 = f, _, b;
    if (c2 === "string" && (f === "gpu-buffer" || f === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
    if (s2 && f !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${a2} when enableGraphCapture is true.`);
    if (f === "gpu-buffer") {
      let v = e2[2].gpuBuffer;
      b = St(xt(c2), m);
      {
        let $ = u2.jsepRegisterBuffer;
        if (!$) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
        _ = $(r2, a2, v, b);
      }
    } else if (f === "ml-tensor") {
      let v = e2[2].mlTensor;
      b = St(xt(c2), m);
      let $ = u2.webnnRegisterMLTensor;
      if (!$) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
      _ = $(r2, v, xt(c2), m);
    } else {
      let v = e2[2];
      if (Array.isArray(v)) {
        b = d2 * v.length, _ = u2._malloc(b), n2.push(_);
        for (let $ = 0; $ < v.length; $++) {
          if (typeof v[$] != "string") throw new TypeError(`tensor data at index ${$} is not a string`);
          u2.setValue(_ + $ * d2, We(v[$], n2), "*");
        }
      } else {
        let $ = u2.webnnIsGraphInput, T = u2.webnnIsGraphOutput;
        if (c2 !== "string" && $ && T) {
          let C = u2.UTF8ToString(o2);
          if ($(r2, C) || T(r2, C)) {
            let A = xt(c2);
            b = St(A, m), g2 = "ml-tensor";
            let I = u2.webnnCreateTemporaryTensor, z = u2.webnnUploadTensor;
            if (!I || !z) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
            let D = await I(r2, A, m);
            z(D, new Uint8Array(v.buffer, v.byteOffset, v.byteLength)), _ = D;
          } else b = v.byteLength, _ = u2._malloc(b), n2.push(_), u2.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, b), _);
        } else b = v.byteLength, _ = u2._malloc(b), n2.push(_), u2.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, b), _);
      }
    }
    let w = u2.stackSave(), x = u2.stackAlloc(4 * m.length);
    try {
      m.forEach(($, T) => u2.setValue(x + T * d2, $, d2 === 4 ? "i32" : "i64"));
      let v = u2._OrtCreateTensor(xt(c2), _, b, x, m.length, eo(g2));
      v === 0 && ye(`Can't create tensor for input/output. session=${r2}, index=${a2}.`), t2.push(v);
    } finally {
      u2.stackRestore(w);
    }
  }, Pr = async (e2, t2, n2, r2, o2, a2) => {
    let s2 = _e(), u2 = s2.PTR_SIZE, d2 = Rt.get(e2);
    if (!d2) throw new Error(`cannot run inference. invalid session id: ${e2}`);
    let c2 = d2[0], m = d2[1], f = d2[2], g2 = d2[3], _ = d2[4], b = d2[5], w = t2.length, x = r2.length, v = 0, $ = [], T = [], C = [], A = [], I = s2.stackSave(), z = s2.stackAlloc(w * u2), D = s2.stackAlloc(w * u2), R = s2.stackAlloc(x * u2), H = s2.stackAlloc(x * u2);
    try {
      [v, $] = Va(a2), wt("wasm prepareInputOutputTensor");
      for (let F = 0; F < w; F++) await uc(n2[F], T, A, e2, m[t2[F]], t2[F], _);
      for (let F = 0; F < x; F++) await uc(o2[F], C, A, e2, f[r2[F]], w + r2[F], _);
      vt("wasm prepareInputOutputTensor");
      for (let F = 0; F < w; F++) s2.setValue(z + F * u2, T[F], "*"), s2.setValue(D + F * u2, m[t2[F]], "*");
      for (let F = 0; F < x; F++) s2.setValue(R + F * u2, C[F], "*"), s2.setValue(H + F * u2, f[r2[F]], "*");
      if (g2 && !b) {
        let { handle: F, outputPreferredLocations: me, outputPreferredLocationsEncoded: oe } = g2;
        if (m.length !== w) throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${m.length}).`);
        wt("wasm bindInputsOutputs");
        for (let j = 0; j < w; j++) {
          let ie = t2[j];
          await s2._OrtBindInput(F, m[ie], T[j]) !== 0 && ye(`Can't bind input[${j}] for session=${e2}.`);
        }
        for (let j = 0; j < x; j++) {
          let ie = r2[j];
          o2[j]?.[3] ? s2._OrtBindOutput(F, f[ie], C[j], 0) !== 0 && ye(`Can't bind pre-allocated output[${j}] for session=${e2}.`) : s2._OrtBindOutput(F, f[ie], 0, oe[ie]) !== 0 && ye(`Can't bind output[${j}] to ${me[j]} for session=${e2}.`);
        }
        vt("wasm bindInputsOutputs"), Rt.set(e2, [c2, m, f, g2, _, true]);
      }
      s2.jsepOnRunStart?.(c2), s2.webnnOnRunStart?.(c2);
      let q;
      g2 ? q = await s2._OrtRunWithBinding(c2, g2.handle, x, R, v) : q = await s2._OrtRun(c2, D, z, w, H, x, R, v), q !== 0 && ye("failed to call OrtRun().");
      let Y = [], ne = [];
      wt("wasm ProcessOutputTensor");
      for (let F = 0; F < x; F++) {
        let me = Number(s2.getValue(R + F * u2, "*"));
        if (me === C[F]) {
          Y.push(o2[F]);
          continue;
        }
        let oe = s2.stackSave(), j = s2.stackAlloc(4 * u2), ie = false, Z, ce = 0;
        try {
          s2._OrtGetTensorData(me, j, j + u2, j + 2 * u2, j + 3 * u2) !== 0 && ye(`Can't access output tensor data on index ${F}.`);
          let pe = u2 === 4 ? "i32" : "i64", J = Number(s2.getValue(j, pe));
          ce = s2.getValue(j + u2, "*");
          let V = s2.getValue(j + u2 * 2, "*"), O = Number(s2.getValue(j + u2 * 3, pe)), X = [];
          for (let xe = 0; xe < O; xe++) X.push(Number(s2.getValue(V + xe * u2, pe)));
          s2._OrtFree(V) !== 0 && ye("Can't free memory for tensor dims.");
          let ze = X.reduce((xe, fe) => xe * fe, 1);
          Z = Je(J);
          let Oe = g2?.outputPreferredLocations[r2[F]];
          if (Z === "string") {
            if (Oe === "gpu-buffer" || Oe === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
            let xe = [];
            for (let fe = 0; fe < ze; fe++) {
              let Fe = s2.getValue(ce + fe * u2, "*"), mt = s2.getValue(ce + (fe + 1) * u2, "*"), ft = fe === ze - 1 ? void 0 : mt - Fe;
              xe.push(s2.UTF8ToString(Fe, ft));
            }
            Y.push([Z, X, xe, "cpu"]);
          } else if (Oe === "gpu-buffer" && ze > 0) {
            let xe = s2.jsepGetBuffer;
            if (!xe) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
            let fe = xe(ce), Fe = St(J, ze);
            if (Fe === void 0 || !Rr(Z)) throw new Error(`Unsupported data type: ${Z}`);
            ie = true, Y.push([Z, X, { gpuBuffer: fe, download: s2.jsepCreateDownloader(fe, Fe, Z), dispose: () => {
              s2._OrtReleaseTensor(me) !== 0 && ye("Can't release tensor.");
            } }, "gpu-buffer"]);
          } else if (Oe === "ml-tensor" && ze > 0) {
            let xe = s2.webnnEnsureTensor, fe = s2.webnnIsGraphInputOutputTypeSupported;
            if (!xe || !fe) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
            if (St(J, ze) === void 0 || !Ur(Z)) throw new Error(`Unsupported data type: ${Z}`);
            if (!fe(e2, Z, false)) throw new Error(`preferredLocation "ml-tensor" for ${Z} output is not supported by current WebNN Context.`);
            let mt = await xe(e2, ce, J, X, false);
            ie = true, Y.push([Z, X, { mlTensor: mt, download: s2.webnnCreateMLTensorDownloader(ce, Z), dispose: () => {
              s2.webnnReleaseTensorId(ce), s2._OrtReleaseTensor(me);
            } }, "ml-tensor"]);
          } else if (Oe === "ml-tensor-cpu-output" && ze > 0) {
            let xe = s2.webnnCreateMLTensorDownloader(ce, Z)(), fe = Y.length;
            ie = true, ne.push((async () => {
              let Fe = [fe, await xe];
              return s2.webnnReleaseTensorId(ce), s2._OrtReleaseTensor(me), Fe;
            })()), Y.push([Z, X, [], "cpu"]);
          } else {
            let xe = Gt(Z), fe = new xe(ze);
            new Uint8Array(fe.buffer, fe.byteOffset, fe.byteLength).set(s2.HEAPU8.subarray(ce, ce + fe.byteLength)), Y.push([Z, X, fe, "cpu"]);
          }
        } finally {
          s2.stackRestore(oe), Z === "string" && ce && s2._free(ce), ie || s2._OrtReleaseTensor(me);
        }
      }
      g2 && !_ && (s2._OrtClearBoundOutputs(g2.handle) !== 0 && ye("Can't clear bound outputs."), Rt.set(e2, [c2, m, f, g2, _, false]));
      for (let [F, me] of await Promise.all(ne)) Y[F][2] = me;
      return vt("wasm ProcessOutputTensor"), Y;
    } finally {
      s2.webnnOnRunEnd?.(c2), s2.stackRestore(I), T.forEach((q) => s2._OrtReleaseTensor(q)), C.forEach((q) => s2._OrtReleaseTensor(q)), A.forEach((q) => s2._free(q)), v !== 0 && s2._OrtReleaseRunOptions(v), $.forEach((q) => s2._free(q));
    }
  }, Or = (e2) => {
    let t2 = _e(), n2 = Rt.get(e2);
    if (!n2) throw new Error("invalid session id");
    let r2 = n2[0], o2 = t2._OrtEndProfiling(r2);
    o2 === 0 && ye("Can't get an profile file name."), t2._OrtFree(o2);
  }, zr = (e2) => {
    let t2 = [];
    for (let n2 of e2) {
      let r2 = n2[2];
      !Array.isArray(r2) && "buffer" in r2 && t2.push(r2.buffer);
    }
    return t2;
  };
});
var Ut;
var He;
var lr;
var mn;
var fn;
var pn;
var Mo;
var Ro;
var jt;
var Kt;
var $g;
var lc;
var dc;
var cc;
var pc;
var mc;
var fc;
var hc;
var Uo = L(() => {
  "use strict";
  Ve();
  Zn();
  $t();
  Tr();
  Ut = () => !!we.wasm.proxy && typeof document < "u", lr = false, mn = false, fn = false, Ro = /* @__PURE__ */ new Map(), jt = (e2, t2) => {
    let n2 = Ro.get(e2);
    n2 ? n2.push(t2) : Ro.set(e2, [t2]);
  }, Kt = () => {
    if (lr || !mn || fn || !He) throw new Error("worker not ready");
  }, $g = (e2) => {
    switch (e2.data.type) {
      case "init-wasm":
        lr = false, e2.data.err ? (fn = true, Mo[1](e2.data.err)) : (mn = true, Mo[0]()), pn && (URL.revokeObjectURL(pn), pn = void 0);
        break;
      case "init-ep":
      case "copy-from":
      case "create":
      case "release":
      case "run":
      case "end-profiling": {
        let t2 = Ro.get(e2.data.type);
        e2.data.err ? t2.shift()[1](e2.data.err) : t2.shift()[0](e2.data.out);
        break;
      }
      default:
    }
  }, lc = async () => {
    if (!mn) {
      if (lr) throw new Error("multiple calls to 'initWasm()' detected.");
      if (fn) throw new Error("previous call to 'initWasm()' failed.");
      if (lr = true, Ut()) return new Promise((e2, t2) => {
        He?.terminate(), Ra().then(([n2, r2]) => {
          try {
            He = r2, He.onerror = (a2) => t2(a2), He.onmessage = $g, Mo = [e2, t2];
            let o2 = { type: "init-wasm", in: we };
            !o2.in.wasm.wasmPaths && (n2 || Yn) && (o2.in.wasm.wasmPaths = { wasm: new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href }), He.postMessage(o2), pn = n2;
          } catch (o2) {
            t2(o2);
          }
        }, t2);
      });
      try {
        await Cr(we.wasm), await Ir(we), mn = true;
      } catch (e2) {
        throw fn = true, e2;
      } finally {
        lr = false;
      }
    }
  }, dc = async (e2) => {
    if (Ut()) return Kt(), new Promise((t2, n2) => {
      jt("init-ep", [t2, n2]);
      let r2 = { type: "init-ep", in: { epName: e2, env: we } };
      He.postMessage(r2);
    });
    await Ar(we, e2);
  }, cc = async (e2) => Ut() ? (Kt(), new Promise((t2, n2) => {
    jt("copy-from", [t2, n2]);
    let r2 = { type: "copy-from", in: { buffer: e2 } };
    He.postMessage(r2, [e2.buffer]);
  })) : er(e2), pc = async (e2, t2) => {
    if (Ut()) {
      if (t2?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
      return Kt(), new Promise((n2, r2) => {
        jt("create", [n2, r2]);
        let o2 = { type: "create", in: { model: e2, options: { ...t2 } } }, a2 = [];
        e2 instanceof Uint8Array && a2.push(e2.buffer), He.postMessage(o2, a2);
      });
    } else return Er(e2, t2);
  }, mc = async (e2) => {
    if (Ut()) return Kt(), new Promise((t2, n2) => {
      jt("release", [t2, n2]);
      let r2 = { type: "release", in: e2 };
      He.postMessage(r2);
    });
    kr(e2);
  }, fc = async (e2, t2, n2, r2, o2, a2) => {
    if (Ut()) {
      if (n2.some((s2) => s2[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
      if (o2.some((s2) => s2)) throw new Error("pre-allocated output tensor is not supported for proxy.");
      return Kt(), new Promise((s2, u2) => {
        jt("run", [s2, u2]);
        let d2 = n2, c2 = { type: "run", in: { sessionId: e2, inputIndices: t2, inputs: d2, outputIndices: r2, options: a2 } };
        He.postMessage(c2, zr(d2));
      });
    } else return Pr(e2, t2, n2, r2, o2, a2);
  }, hc = async (e2) => {
    if (Ut()) return Kt(), new Promise((t2, n2) => {
      jt("end-profiling", [t2, n2]);
      let r2 = { type: "end-profiling", in: e2 };
      He.postMessage(r2);
    });
    Or(e2);
  };
});
var gc;
var xg;
var hn;
var yc = L(() => {
  "use strict";
  Ve();
  Uo();
  ee();
  Sr();
  to();
  gc = (e2, t2) => {
    switch (e2.location) {
      case "cpu":
        return [e2.type, e2.dims, e2.data, "cpu"];
      case "gpu-buffer":
        return [e2.type, e2.dims, { gpuBuffer: e2.gpuBuffer }, "gpu-buffer"];
      case "ml-tensor":
        return [e2.type, e2.dims, { mlTensor: e2.mlTensor }, "ml-tensor"];
      default:
        throw new Error(`invalid data location: ${e2.location} for ${t2()}`);
    }
  }, xg = (e2) => {
    switch (e2[3]) {
      case "cpu":
        return new qe(e2[0], e2[2], e2[1]);
      case "gpu-buffer": {
        let t2 = e2[0];
        if (!Rr(t2)) throw new Error(`not supported data type: ${t2} for deserializing GPU tensor`);
        let { gpuBuffer: n2, download: r2, dispose: o2 } = e2[2];
        return qe.fromGpuBuffer(n2, { dataType: t2, dims: e2[1], download: r2, dispose: o2 });
      }
      case "ml-tensor": {
        let t2 = e2[0];
        if (!Ur(t2)) throw new Error(`not supported data type: ${t2} for deserializing MLTensor tensor`);
        let { mlTensor: n2, download: r2, dispose: o2 } = e2[2];
        return qe.fromMLTensor(n2, { dataType: t2, dims: e2[1], download: r2, dispose: o2 });
      }
      default:
        throw new Error(`invalid data location: ${e2[3]}`);
    }
  }, hn = class {
    async fetchModelAndCopyToWasmMemory(t2) {
      return cc(await nr(t2));
    }
    async loadModel(t2, n2) {
      Ne();
      let r2;
      typeof t2 == "string" ? r2 = await this.fetchModelAndCopyToWasmMemory(t2) : r2 = t2, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await pc(r2, n2), Me();
    }
    async dispose() {
      return mc(this.sessionId);
    }
    async run(t2, n2, r2) {
      Ne();
      let o2 = [], a2 = [];
      Object.entries(t2).forEach((g2) => {
        let _ = g2[0], b = g2[1], w = this.inputNames.indexOf(_);
        if (w === -1) throw new Error(`invalid input '${_}'`);
        o2.push(b), a2.push(w);
      });
      let s2 = [], u2 = [];
      Object.entries(n2).forEach((g2) => {
        let _ = g2[0], b = g2[1], w = this.outputNames.indexOf(_);
        if (w === -1) throw new Error(`invalid output '${_}'`);
        s2.push(b), u2.push(w);
      });
      let d2 = o2.map((g2, _) => gc(g2, () => `input "${this.inputNames[a2[_]]}"`)), c2 = s2.map((g2, _) => g2 ? gc(g2, () => `output "${this.outputNames[u2[_]]}"`) : null), m = await fc(this.sessionId, a2, d2, u2, c2, r2), f = {};
      for (let g2 = 0; g2 < m.length; g2++) f[this.outputNames[u2[g2]]] = s2[g2] ?? xg(m[g2]);
      return Me(), f;
    }
    startProfiling() {
    }
    endProfiling() {
      hc(this.sessionId);
    }
  };
});
var _c = {};
Wt(_c, { OnnxruntimeWebAssemblyBackend: () => gn, initializeFlags: () => bc, wasmBackend: () => Sg });
var bc;
var gn;
var Sg;
var wc = L(() => {
  "use strict";
  Ve();
  Uo();
  yc();
  bc = () => {
    (typeof we.wasm.initTimeout != "number" || we.wasm.initTimeout < 0) && (we.wasm.initTimeout = 0);
    let e2 = we.wasm.simd;
    if (typeof e2 != "boolean" && e2 !== void 0 && e2 !== "fixed" && e2 !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e2}". Reset it to \`false\` and ignore SIMD feature checking.`), we.wasm.simd = false), typeof we.wasm.proxy != "boolean" && (we.wasm.proxy = false), typeof we.wasm.trace != "boolean" && (we.wasm.trace = false), typeof we.wasm.numThreads != "number" || !Number.isInteger(we.wasm.numThreads) || we.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) we.wasm.numThreads = 1;
    else {
      let t2 = typeof navigator > "u" ? Wn("node:os").cpus().length : navigator.hardwareConcurrency;
      we.wasm.numThreads = Math.min(4, Math.ceil((t2 || 1) / 2));
    }
  }, gn = class {
    async init(t2) {
      bc(), await lc(), await dc(t2);
    }
    async createInferenceSessionHandler(t2, n2) {
      let r2 = new hn();
      return await r2.loadModel(t2, n2), r2;
    }
  }, Sg = new gn();
});
Ve();
Ve();
Ve();
var Sa = "1.23.2";
var BS = Kn;
{
  let e2 = (wc(), Xt(_c)).wasmBackend;
  Pt("webgpu", e2, 5), Pt("webnn", e2, 5), Pt("cpu", e2, 10), Pt("wasm", e2, 10);
}
Object.defineProperty(we.versions, "web", { value: Sa, enumerable: true });

// src/utils/onnxClient.js
var ort = BS || ort_bundle_min_exports;
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
var session = null;
var inputName = null;
var outputName = null;
async function initOnnxModel(url) {
  console.log(`Loading ONNX Model from: ${url} with threading enabled...`);
  try {
    session = await ort.InferenceSession.create(url);
    console.log("\u2705 ONNX model loaded successfully (Threaded Mode)");
    const inputs = session.inputNames;
    const outputs = session.outputNames;
    inputName = inputs.length > 0 ? inputs[0] : null;
    outputName = outputs.length > 0 ? outputs[0] : null;
  } catch (e2) {
    console.error("\u274C ONNX init failed:", e2);
    throw e2;
  }
}
async function runOnnx(obsFloat32Array, shape = [1, obsFloat32Array.length]) {
  if (!session) {
    throw new Error("ONNX session not initialized");
  }
  const inputTensor = new ort.Tensor("float32", obsFloat32Array, shape);
  const feeds = {};
  feeds[inputName] = inputTensor;
  const out = await session.run(feeds);
  return out[outputName].data;
}

// src/utils/RobotController.js
var RobotController = class {
  constructor(mujoco2) {
    this.mujoco = mujoco2;
    this.model = null;
    this.data = null;
    this.num_actions = 12;
    this.num_obs = 45;
    this.kps = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
    this.kds = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    this.default_angles = [0.1, 0.8, -1.5, -0.1, 0.8, -1.5, 0.1, 1, -1.5, -0.1, 1, -1.5];
    this.lin_vel_scale = 2;
    this.ang_vel_scale = 0.25;
    this.dof_pos_scale = 1;
    this.dof_vel_scale = 0.05;
    this.action_scale = 0.25;
    this.cmd_scale = [2, 2, 0.25];
    this.currentTarget = new Float32Array(this.default_angles);
    this.currentAction = new Float32Array(12).fill(0);
    this.historyLength = 1;
    this.obsHistory = [];
    this.onnxReady = false;
    this.loadingModel = false;
    this.obsSlices = [
      [0, 3],
      // AngVel
      [3, 6],
      // Gravity
      [6, 9],
      // Commands
      [9, 21],
      // Dof Pos
      [21, 33],
      // Dof Vel
      [33, 45]
      // Previous Action
    ];
  }
  setPhysics(model, data) {
    this.model = model;
    this.data = data;
  }
  async loadModel(config) {
    const { url, history, stacking } = config;
    if (this.onnxReady && this.currentModelUrl === url && this.historyLength === history && this.stackingMode === stacking) {
      return true;
    }
    try {
      this.loadingModel = true;
      this.onnxReady = false;
      console.log(`Loading: ${url} | History: ${history} | Stacking: ${stacking}`);
      await initOnnxModel(url);
      this.currentModelUrl = url;
      this.historyLength = history;
      this.stackingMode = stacking;
      this.obsHistory = [];
      this.onnxReady = true;
      this.loadingModel = false;
      return true;
    } catch (e2) {
      console.error("Model load failed", e2);
      this.loadingModel = false;
      return false;
    }
  }
  resetPose() {
    if (!this.model || !this.data) return;
    console.log("Resetting robot pose...");
    this.data.qpos[2] += 0.2;
    this.data.qpos[3] = 1;
    this.data.qpos[4] = 0;
    this.data.qpos[5] = 0;
    this.data.qpos[6] = 0;
    for (let i2 = 0; i2 < 12; i2++) {
      this.data.qpos[7 + i2] = this.default_angles[i2];
      this.currentTarget[i2] = this.default_angles[i2];
    }
    this.data.qvel.fill(0);
    this.data.qacc.fill(0);
    this.currentAction.fill(0);
    this.obsHistory = [];
    this.mujoco.mj_forward(this.model, this.data);
  }
  buildObservation(cmd_vel) {
    let obs = new Float32Array(this.num_obs);
    const d2 = this.data;
    obs[0] = d2.qvel[3];
    obs[1] = d2.qvel[4];
    obs[2] = d2.qvel[5];
    const qw = d2.qpos[3], qx = d2.qpos[4], qy = d2.qpos[5], qz = d2.qpos[6];
    obs[3] = 2 * (-qz * qx + qw * qy);
    obs[4] = -2 * (qz * qy + qw * qx);
    obs[5] = 1 - 2 * (qw * qw + qz * qz);
    obs[6] = cmd_vel[0] * this.cmd_scale[0];
    obs[7] = cmd_vel[1] * this.cmd_scale[1];
    obs[8] = cmd_vel[2] * this.cmd_scale[2];
    let qj = [], dqj = [];
    for (let i2 = 0; i2 < this.num_actions; i2++) {
      qj.push(d2.qpos[7 + i2]);
      dqj.push(d2.qvel[6 + i2]);
    }
    for (let i2 = 0; i2 < this.num_actions; i2++) {
      obs[9 + i2] = (qj[i2] - this.default_angles[i2]) * this.dof_pos_scale;
      obs[9 + this.num_actions + i2] = dqj[i2] * this.dof_vel_scale;
      obs[9 + 2 * this.num_actions + i2] = this.currentAction[i2];
    }
    return obs;
  }
  flattenHistoryByTerm() {
    const totalSize = this.num_obs * this.historyLength;
    const flatObs = new Float32Array(totalSize);
    let offset = 0;
    for (const [start, end] of this.obsSlices) {
      const sliceSize = end - start;
      for (let t2 = 0; t2 < this.historyLength; t2++) {
        const frameData = this.obsHistory[t2];
        const termData = frameData.subarray(start, end);
        flatObs.set(termData, offset);
        offset += sliceSize;
      }
    }
    return flatObs;
  }
  flattenHistoryByFrame() {
    const totalSize = this.num_obs * this.historyLength;
    const flatObs = new Float32Array(totalSize);
    for (let i2 = 0; i2 < this.historyLength; i2++) {
      flatObs.set(this.obsHistory[i2], i2 * this.num_obs);
    }
    return flatObs;
  }
  async infer(cmd_vel) {
    if (!this.onnxReady) return;
    const currentObs = this.buildObservation(cmd_vel);
    if (this.obsHistory.length === 0) {
      for (let i2 = 0; i2 < this.historyLength - 1; i2++) {
        this.obsHistory.push(new Float32Array(this.num_obs).fill(0));
      }
    }
    if (this.obsHistory.length >= this.historyLength) {
      this.obsHistory.shift();
    }
    this.obsHistory.push(new Float32Array(currentObs));
    let flatObs;
    if (this.stackingMode === "term") {
      flatObs = this.flattenHistoryByTerm();
    } else {
      flatObs = this.flattenHistoryByFrame();
    }
    try {
      const action = await runOnnx(flatObs);
      this.currentAction = action;
      for (let i2 = 0; i2 < 12; i2++) {
        this.currentTarget[i2] = action[i2] * this.action_scale + this.default_angles[i2];
      }
    } catch (e2) {
      console.error("Inference Error", e2);
    }
  }
  computePD(enabledRL) {
    if (!this.model || this.model.nu < 12) return;
    for (let i2 = 0; i2 < 12; i2++) {
      if (enabledRL) {
        let target = this.currentTarget[i2];
        let q = this.data.qpos[7 + i2];
        let dq = this.data.qvel[6 + i2];
        let tau = (target - q) * this.kps[i2] + (0 - dq) * this.kds[i2];
        tau = Math.max(-100, Math.min(100, tau));
        this.data.ctrl[i2] = tau;
      } else {
        this.data.ctrl[i2] = 0;
      }
    }
  }
};

// src/main.js
var mujoco = await load_mujoco();
var initialScene = "go2/cross_stairs.xml";
mujoco.FS.mkdir("/working");
mujoco.FS.mount(mujoco.MEMFS, { root: "." }, "/working");
var MuJoCoDemo = class {
  constructor() {
    this.mujoco = mujoco;
    this.model = null;
    this.data = null;
    this.sceneSetup = new SceneSetup(document.body);
    this.inputHandler = new InputHandler();
    this.visualizer = new ArrowVisualizer(this.sceneSetup.scene);
    this.robotController = new RobotController(mujoco);
    this.inputVisualizer = new InputVisualizer(document.body);
    this.scene = this.sceneSetup.scene;
    this.camera = this.sceneSetup.camera;
    this.renderer = this.sceneSetup.renderer;
    this.controls = this.sceneSetup.controls;
    this.container = this.sceneSetup.container;
    this.modelConfigs = {
      "ppo": {
        url: "./models/ppo.onnx",
        history: 1,
        stacking: "frame"
      },
      "moects": {
        url: "./models/moects.onnx",
        // 你的新模型文件名
        history: 5,
        stacking: "term"
      }
    };
    this.params = {
      scene: initialScene,
      paused: false,
      help: false,
      ctrlnoiserate: 0,
      ctrlnoisestd: 0,
      follow: true,
      enableRL: true,
      showArrows: true,
      model: "moects"
    };
    this.mujoco_time = 0;
    this.bodies = {};
    this.lights = {};
    this.tmpVec = new THREE5.Vector3();
    this.tmpQuat = new THREE5.Quaternion();
    this.updateGUICallbacks = [];
    this.stepCounter = 0;
    this.control_decimation = 10;
    this.dragStateManager = new DragStateManager(this.scene, this.renderer, this.camera, this.container, this.controls);
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  async init() {
    await downloadExampleScenesFolder(mujoco);
    [this.model, this.data, this.bodies, this.lights] = await loadSceneFromURL(mujoco, initialScene, this);
    this.robotController.setPhysics(this.model, this.data);
    this.robotController.resetPose();
    if (this.params.enableRL) {
      await this.toggleRL(true);
    }
    this.gui = new g();
    setupGUI(this);
    addRepoButton("https://github.com/YourUsername/YourRepoName");
  }
  async toggleRL(enabled) {
    if (enabled) {
      const config = this.modelConfigs[this.params.model] || this.modelConfigs["ppo"];
      const success = await this.robotController.loadModel(config);
      if (success) {
        this.robotController.resetPose();
      } else {
        this.params.enableRL = false;
      }
    } else {
      console.log("RL Disabled.");
    }
  }
  async reloadScene(scenePath) {
    this.scene.remove(this.scene.getObjectByName("MuJoCo Root"));
    [this.model, this.data, this.bodies, this.lights] = await loadSceneFromURL(this.mujoco, scenePath, this);
    this.robotController.setPhysics(this.model, this.data);
    this.robotController.resetPose();
    if (this.params.enableRL) {
      this.currentAction.fill(0);
      this.robotController.currentAction.fill(0);
    }
    if (this.dragStateManager) {
      this.dragStateManager.dispose();
    }
    this.dragStateManager = new DragStateManager(
      this.scene,
      this.renderer,
      this.camera,
      this.container,
      this.controls
    );
    this.mujoco.mj_forward(this.model, this.data);
    for (let i2 = 0; i2 < this.updateGUICallbacks.length; i2++) {
      this.updateGUICallbacks[i2](this.model, this.data, this.params);
    }
  }
  async render(timeMS) {
    if (!this.model || !this.data) {
      this.sceneSetup.render();
      return;
    }
    if (this.params.follow && this.bodies[1]) {
      const robotPos = this.bodies[1].position;
      const offset = this.camera.position.clone().sub(this.controls.target);
      this.controls.target.copy(robotPos);
      this.camera.position.copy(robotPos).add(offset);
    }
    this.inputHandler.update();
    const cmd_vel = this.inputHandler.getCmd();
    this.inputVisualizer.update(this.inputHandler);
    this.visualizer.update(this.params.showArrows, this.bodies[1], this.data.qvel, cmd_vel);
    this.controls.update();
    if (!this.params["paused"]) {
      let timestep = this.model.opt.timestep;
      if (timeMS - this.mujoco_time > 35) {
        this.mujoco_time = timeMS;
      }
      while (this.mujoco_time < timeMS) {
        if (this.params.enableRL && this.stepCounter % this.control_decimation === 0) {
          await this.robotController.infer(cmd_vel);
        }
        if (this.params["ctrlnoisestd"] > 0) {
          let rate = Math.exp(-timestep / Math.max(1e-10, this.params["ctrlnoiserate"]));
          let scale = this.params["ctrlnoisestd"] * Math.sqrt(1 - rate * rate);
          let currentCtrl = this.data.ctrl;
          for (let i2 = 0; i2 < currentCtrl.length; i2++) {
            currentCtrl[i2] = rate * currentCtrl[i2] + scale * standardNormal();
          }
        }
        for (let i2 = 0; i2 < this.data.qfrc_applied.length; i2++) {
          this.data.qfrc_applied[i2] = 0;
        }
        let dragged = this.dragStateManager.physicsObject;
        if (dragged && dragged.bodyID) {
          for (let b = 0; b < this.model.nbody; b++) {
            if (this.bodies[b]) {
              getPosition(this.data.xpos, b, this.bodies[b].position);
              getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
              this.bodies[b].updateWorldMatrix();
            }
          }
          let bodyID = dragged.bodyID;
          this.dragStateManager.update();
          let force = toMujocoPos(this.dragStateManager.currentWorld.clone().sub(this.dragStateManager.worldHit).multiplyScalar(this.model.body_mass[bodyID] * 250));
          let point = toMujocoPos(this.dragStateManager.worldHit.clone());
          mujoco.mj_applyFT(
            this.model,
            this.data,
            [force.x, force.y, force.z],
            [0, 0, 0],
            [point.x, point.y, point.z],
            bodyID,
            this.data.qfrc_applied
          );
        }
        this.robotController.computePD(this.params.enableRL);
        mujoco.mj_step(this.model, this.data);
        this.stepCounter++;
        this.mujoco_time += timestep * 1e3;
      }
    } else if (this.params["paused"]) {
      this.dragStateManager.update();
      let dragged = this.dragStateManager.physicsObject;
      if (dragged && dragged.bodyID) {
        let b = dragged.bodyID;
        getPosition(this.data.xpos, b, this.tmpVec, false);
        getQuaternion(this.data.xquat, b, this.tmpQuat, false);
        let offset = toMujocoPos(this.dragStateManager.currentWorld.clone().sub(this.dragStateManager.worldHit).multiplyScalar(0.3));
        if (this.model.body_mocapid[b] >= 0) {
          let addr = this.model.body_mocapid[b] * 3;
          let pos = this.data.mocap_pos;
          pos[addr + 0] += offset.x;
          pos[addr + 1] += offset.y;
          pos[addr + 2] += offset.z;
        } else {
          let root = this.model.body_rootid[b];
          let addr = this.model.jnt_qposadr[this.model.body_jntadr[root]];
          let pos = this.data.qpos;
          pos[addr + 0] += offset.x;
          pos[addr + 1] += offset.y;
          pos[addr + 2] += offset.z;
        }
      }
      mujoco.mj_forward(this.model, this.data);
    }
    for (let b = 0; b < this.model.nbody; b++) {
      if (this.bodies[b]) {
        getPosition(this.data.xpos, b, this.bodies[b].position);
        getQuaternion(this.data.xquat, b, this.bodies[b].quaternion);
        this.bodies[b].updateWorldMatrix();
      }
    }
    for (let l2 = 0; l2 < this.model.nlight; l2++) {
      if (this.lights[l2]) {
        getPosition(this.data.light_xpos, l2, this.lights[l2].position);
        getPosition(this.data.light_xdir, l2, this.tmpVec);
        this.lights[l2].lookAt(this.tmpVec.add(this.lights[l2].position));
      }
    }
    drawTendonsAndFlex(this.mujocoRoot, this.model, this.data);
    this.sceneSetup.render();
  }
};
var demo = new MuJoCoDemo();
await demo.init();
export {
  MuJoCoDemo
};
/*! Bundled license information:

three/examples/jsm/libs/lil-gui.module.min.js:
  (**
   * lil-gui
   * https://lil-gui.georgealways.com
   * @version 0.17.0
   * @author George Michael Brower
   * @license MIT
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.23.2
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
//# sourceMappingURL=main.js.map
