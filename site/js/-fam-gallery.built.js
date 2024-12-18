! function(t) {
    var e = {};

    function s(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, s), r.l = !0, r.exports
    }
    s.m = t, s.c = e, s.d = function(t, e, i) {
        s.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, s.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, s.t = function(t, e) {
        if (1 & e && (t = s(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (s.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) s.d(i, r, function(e) {
                return t[e]
            }.bind(null, r));
        return i
    }, s.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return s.d(e, "a", e), e
    }, s.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, s.p = "", s(s.s = 30)
}([function(t, e, s) {
    "use strict";
    const i = {
        GUI_INSTANCE: null,
        ANIM_INSTANCE: null,
        VIEWPORT_EMITTER_ELEMENT: void 0,
        LOCAL_STORAGE_KEYS: {
            GuiPosition: "anim-ui.position",
            GroupCollapsedStates: "anim-ui.group-collapsed-states",
            scrollY: "anim-ui.scrollY-position",
            path: "anim-ui.path"
        },
        RESIZE_TIMEOUT: -1,
        BREAKPOINTS: [{
            name: "S",
            mediaQuery: "only screen and (max-width: 734px)"
        }, {
            name: "M",
            mediaQuery: "only screen and (max-width: 1068px)"
        }, {
            name: "L",
            mediaQuery: "only screen and (min-width: 1069px)"
        }],
        getBreakpoint: function() {
            for (let t = 0; t < i.BREAKPOINTS.length; t++) {
                let e = i.BREAKPOINTS[t];
                if (window.matchMedia(e.mediaQuery).matches) return e.name
            }
        },
        KeyframeDefaults: {
            ease: 1,
            epsilon: .05,
            preserveState: !1,
            easeFunctionString: "linear",
            easeFunction: "linear",
            hold: !1,
            snapAtCreation: !1,
            toggle: !1,
            breakpointMask: "SMLX",
            event: "",
            disabledWhen: [],
            cssClass: ""
        },
        KeyframeTypes: {
            Interpolation: 0,
            InterpolationForward: 1,
            CSSClass: 2,
            Event: 3
        },
        EVENTS: {
            ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
            ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
            ON_GROUP_CREATED: "ON_GROUP_CREATED",
            ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
            ON_TIMELINE_START: "ON_TIMELINE_START",
            ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
            ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
            ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
            ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
            ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
        },
        PageEvents: {
            ON_SCROLL: "ON_SCROLL",
            ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
            ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
            ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
        },
        KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
        TweenProps: s(19),
        TargetValue: s(1),
        CSSTargetValue: s(9),
        pageMetrics: new function() {
            this.scrollX = 0, this.scrollY = 0, this.windowWidth = 0, this.windowHeight = 0, this.documentOffsetX = 0, this.documentOffsetY = 0, this.previousBreakpoint = "", this.breakpoint = ""
        },
        KeyframeComparison: function(t, e) {
            return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
        }
    };
    t.exports = i
}, function(t, e) {
    t.exports = class {
        constructor(t, e, s, i, r = !1, n) {
            this.epsilon = parseFloat(e), this.snapAtCreation = s, this.initialValue = t, this.target = t, this.current = t, this.previousValue = t, this.isActive = !1, this.key = i, this.round = r, this.suffix = n
        }
        update(t, e, s) {
            this.target = t[0] + e * (t[1] - t[0]), this.previousValue = this.current, this.current += (this.target - this.current) * s;
            let i = this.delta(this.current, this.target);
            return i < this.epsilon && (this.current = this.target, i = 0), i > this.epsilon || 0 === i && this.previousValue !== this.current
        }
        reconcile(t, e) {
            return this.initialValue = t[0], this.update(t, e, 1)
        }
        needsUpdate() {
            return this.delta(this.current, this.target) > this.epsilon
        }
        delta(t, e) {
            return Math.abs(t - e)
        }
        calculateEpsilon(t, e) {
            if (t.epsilon) return void(this.epsilon = t.epsilon);
            let s = this.delta(e[0], e[1]),
                i = Math.min(.001 * s, this.epsilon, .05);
            this.epsilon = Math.max(i, .001)
        }
        set(t) {
            let e = this.current;
            this.round && (e = Math.round(e)), this.suffix && (e += this.suffix), t[this.key] = e
        }
        unset(t) {}
    }
}, function(t, e, s) {
    "use strict";
    t.exports = {
        lerp: function(t, e, s) {
            return e + (s - e) * t
        },
        map: function(t, e, s, i, r) {
            return i + (r - i) * (t - e) / (s - e)
        },
        mapClamp: function(t, e, s, i, r) {
            var n = i + (r - i) * (t - e) / (s - e);
            return Math.max(i, Math.min(r, n))
        },
        norm: function(t, e, s) {
            return (t - e) / (s - e)
        },
        clamp: function(t, e, s) {
            return Math.max(e, Math.min(s, t))
        },
        randFloat: function(t, e) {
            return Math.random() * (e - t) + t
        },
        randInt: function(t, e) {
            return Math.floor(Math.random() * (e - t) + t)
        }
    }
}, function(t, e, s) {
    "use strict";
    var i, r = s(34).EventEmitterMicro,
        n = s(35),
        o = s(38);

    function a(t) {
        t = t || {}, r.call(this), this.id = o.getNewID(), this.executor = t.executor || n, this._reset(), this._willRun = !1, this._didDestroy = !1
    }(i = a.prototype = Object.create(r.prototype)).run = function() {
        return this._willRun || (this._willRun = !0), this._subscribe()
    }, i.cancel = function() {
        this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
    }, i.destroy = function() {
        var t = this.willRun();
        return this.cancel(), this.executor = null, r.prototype.destroy.call(this), this._didDestroy = !0, t
    }, i.willRun = function() {
        return this._willRun
    }, i.isRunning = function() {
        return this._isRunning
    }, i._subscribe = function() {
        return this.executor.subscribe(this)
    }, i._unsubscribe = function() {
        return this.executor.unsubscribe(this)
    }, i._onAnimationFrameStart = function(t) {
        this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
    }, i._onAnimationFrameEnd = function(t) {
        this._willRun || (this.trigger("stop", t), this._reset())
    }, i._reset = function() {
        this._didEmitFrameData = !1, this._isRunning = !1
    }, t.exports = a
}, function(t, e, s) {
    "use strict";
    var i = s(5);
    t.exports = i.requestAnimationFrame("update")
}, function(t, e, s) {
    "use strict";
    var i = s(39),
        r = function() {
            this.events = {}
        },
        n = r.prototype;
    n.requestAnimationFrame = function(t) {
        return this.events[t] || (this.events[t] = new i(t)), this.events[t].requestAnimationFrame
    }, n.cancelAnimationFrame = function(t) {
        return this.events[t] || (this.events[t] = new i(t)), this.events[t].cancelAnimationFrame
    }, t.exports = new r
}, function(t, e, s) {
    "use strict";
    var i = s(5);
    t.exports = i.requestAnimationFrame("draw")
}, function(t, e, s) {
    "use strict";
    const i = s(0),
        r = s(1),
        n = s(9),
        o = s(2),
        a = s(21),
        h = s(42),
        l = s(43),
        u = s(10),
        c = s(44),
        m = s(20),
        p = s(22),
        {
            cssAttributes: d,
            suffixFreeAttributes: f,
            domAttributes: g
        } = s(23);
    class _ {
        constructor(t, e) {
            this.controller = t, this.anchors = [], this.jsonProps = e, this.ease = t.group.defaultEase, this.easeFunction = a.linear, this.start = 0, this.end = 0, this.localT = 0, this.curvedT = 0, this.id = 0, this.event = "", this.needsEventDispatch = !1, this.snapAtCreation = !1, this.isEnabled = !1, this.animValues = {}, this.breakpointMask = i.KeyframeDefaults.breakpointMask, this.disabledWhen = [], this.keyframeType = i.KeyframeTypes.Interpolation, this.hold = !1, this.preserveState = !1, this.markedForRemoval = !1;
            let s = !1;
            Object.defineProperty(this, "hidden", {
                get: () => s,
                set(e) {
                    s = e, t.group.keyframesDirty = !0
                }
            }), this.uuid = p(), this.destroyed = !1
        }
        destroy() {
            this.destroyed = !0, this.controller = null, this.disabledWhen = null, this.anchors = null, this.jsonProps = null, this.easeFunction = null, this.animValues = null
        }
        remove() {
            return this.controller && this.controller.removeKeyframe(this)
        }
        parseOptions(t) {
            this.jsonProps = t, t.relativeTo && console.error(`KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':"${t.relativeTo}"`), void 0 === t.end && void 0 === t.duration && (t.end = t.start), "" !== t.anchors && t.anchors ? (this.anchors = [], t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors], t.anchors.forEach((e, s) => {
                let i = c(e, this.controller.group.element);
                if (!i) {
                    let i = "";
                    return "string" == typeof e && (i = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."), void console.warn("Keyframe on", this.controller.element, ` failed to find anchor at index ${s} in array`, t.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. " + i)
                }
                this.anchors.push(i), this.controller.group.metrics.add(i)
            })) : (this.anchors = [], t.anchors = []), t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease, t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation, t.easeFunction || (t.easeFunction = i.KeyframeDefaults.easeFunctionString), t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask, t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen, t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold, t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = i.KeyframeDefaults.preserveState, this.easeFunction = a[t.easeFunction], a.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = h.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = l.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
            for (let e in t) {
                if (-1 !== i.KeyframeJSONReservedWords.indexOf(e)) continue;
                let s = t[e];
                if (Array.isArray(s)) {
                    if (1 === s.length && (s[1] = s[0], s[0] = null), void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                        let o = 0;
                        this.controller._ownerIsElement || (o = this.controller.element[e] || 0);
                        const a = e.startsWith("--");
                        let h = s[2] || (a || f.includes(e) ? void 0 : "px"),
                            l = this.controller.group.anim.plugins.keyframe.reduce((s, i) => s || i.parseProp.call(this, t, e), null);
                        if (!l && this.controller._ownerIsElement)
                            if (a || d.includes(e)) {
                                let s = m(e),
                                    r = t.round || ["zIndex"].includes(s);
                                o = parseFloat(this.controller.getTargetComputedStyle().getPropertyValue(s)), isNaN(o) && (o = 0), l = new n(o, i.KeyframeDefaults.epsilon, this.snapAtCreation, e, r, h), this.controller.cssAttributes.push(l)
                            } else g.includes(e) && (l = new r(o, i.KeyframeDefaults.epsilon, this.snapAtCreation, e, t.round, h), this.controller.domAttributes.push(l));
                        l || (l = new r(o, i.KeyframeDefaults.epsilon, this.snapAtCreation, e, t.round, h)), this.controller.tweenProps[e] = l
                    }
                    this.animValues[e] = this.controller.group.expressionParser.parseArray(this, s), this.controller.tweenProps[e].calculateEpsilon(t, this.animValues[e])
                }
            }
            this.keyframeType = this.hold ? i.KeyframeTypes.InterpolationForward : i.KeyframeTypes.Interpolation, t.event && (this.event = t.event)
        }
        overwriteProps(t) {
            this.animValues = {};
            let e = Object.assign({}, this.jsonProps, t);
            this.controller.updateKeyframe(this, e)
        }
        updateLocalProgress(t) {
            if (this.start === this.end || t < this.start || t > this.end) return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0, void(this.curvedT = this.easeFunction(this.localT));
            const e = (t - this.start) / (this.end - this.start),
                s = this.hold ? this.localT : 0;
            this.localT = o.clamp(e, s, 1), this.curvedT = this.easeFunction(this.localT)
        }
        reconcile(t) {
            this.controller.tweenProps[t].reconcile(this.animValues[t], this.curvedT) && (this.needsEventDispatch || (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)))
        }
        reset(t) {
            this.localT = t || 0;
            let e = this.ease;
            this.ease = 1;
            for (let t in this.animValues) this.reconcile(t);
            this.ease = e
        }
        onDOMRead(t) {
            let e = this.controller.tweenProps[t].update(this.animValues[t], this.curvedT, this.ease);
            return "" === this.event || this.needsEventDispatch || e && (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)), e
        }
        isInRange(t) {
            return t >= this.start && t <= this.end
        }
        setEnabled(t) {
            t = t || u(Array.from(document.documentElement.classList));
            let e = -1 !== this.breakpointMask.indexOf(i.pageMetrics.breakpoint),
                s = !1;
            return this.disabledWhen.length > 0 && (s = this.disabledWhen.some(e => void 0 !== t[e])), this.isEnabled = e && !s, this.isEnabled
        }
        evaluateConstraints() {
            this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start), this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end), this.evaluateInterpolationConstraints()
        }
        evaluateInterpolationConstraints() {
            for (let t in this.animValues) {
                let e = this.jsonProps[t];
                this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
            }
        }
    }
    _.DATA_ATTRIBUTE = "data-anim-tween", t.exports = _
}, function(t, e) {
    class s {
        constructor() {
            this._events = {}
        }
        on(t, e) {
            return this._events[t] = this._events[t] || [], this._events[t].unshift(e), e
        }
        once(t, e) {
            const s = i => {
                this.off(t, s), void 0 !== i ? e(i) : e()
            };
            return this.on(t, s)
        }
        off(t, e) {
            if (!this.has(t)) return;
            if (!e) return void delete this._events[t];
            const s = this._events[t].indexOf(e); - 1 !== s && this._events[t].splice(s, 1)
        }
        trigger(t, e) {
            if (this.has(t))
                for (let s = this._events[t].length - 1; s >= 0; s--) void 0 !== e ? this._events[t][s](e) : this._events[t][s]()
        }
        has(t) {
            return t in this._events && 0 !== this._events[t].length
        }
        destroy() {
            this._events = null
        }
    }
    s.EventEmitterMicro = s, t.exports = s
}, function(t, e, s) {
    const i = s(1),
        r = s(20);
    t.exports = class extends i {
        constructor(t, e, s, i, n = !1, o) {
            super(t, e, s, i = r(i), n, o)
        }
        set(t) {
            let e = this.current;
            this.round && (e = Math.round(e)), this.suffix && (e += this.suffix), t.setProperty(this.key, e)
        }
        unset(t) {
            t.removeProperty(this.key)
        }
    }
}, function(t, e) {
    t.exports = function(t) {
        return t.reduce((t, e) => (t[e] = e, t), {})
    }
}, function(t, e, s) {
    "use strict";
    const i = s(7),
        r = s(0),
        n = s(1);
    class o extends i {
        constructor(t, e) {
            super(t, e), this.keyframeType = r.KeyframeTypes.CSSClass, this._triggerType = o.TRIGGER_TYPE_CSS_CLASS, this.cssClass = "", this.friendlyName = "", this.style = {
                on: null,
                off: null
            }, this.toggle = r.KeyframeDefaults.toggle, this.isApplied = !1
        }
        parseOptions(t) {
            if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
            if (t.x = void 0, t.y = void 0, t.z = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotationX = void 0, t.rotationY = void 0, t.rotationZ = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, void 0 !== t.toggle && (this.toggle = t.toggle), void 0 !== t.cssClass) this._triggerType = o.TRIGGER_TYPE_CSS_CLASS, this.cssClass = t.cssClass, this.friendlyName = "." + this.cssClass, void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                add: [],
                remove: []
            });
            else {
                if (void 0 === t.style || !this.isValidStyleProperty(t.style)) throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                if (this._triggerType = o.TRIGGER_TYPE_STYLE_PROPERTY, this.style = t.style, this.friendlyName = "style", this.toggle = void 0 !== this.style.off || this.toggle, this.toggle && void 0 === this.style.off) {
                    this.style.off = {};
                    for (let t in this.style.on) this.style.off[t] = ""
                }
                void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
            }
            if (void 0 === t.end && (t.end = t.start), t.toggle = this.toggle, this._triggerType === o.TRIGGER_TYPE_CSS_CLASS) this.isApplied = this.controller.element.classList.contains(this.cssClass);
            else {
                let t = getComputedStyle(this.controller.element);
                this.isApplied = !0;
                for (let e in this.style.on)
                    if (t[e] !== this.style.on[e]) {
                        this.isApplied = !1;
                        break
                    }
            }
            i.prototype.parseOptions.call(this, t), this.animValues[this.friendlyName] = [0, 0], void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new n(0, 1, !1, this.friendlyName)), this.keyframeType = r.KeyframeTypes.CSSClass
        }
        updateLocalProgress(t) {
            this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
        }
        _apply() {
            if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), this.controller.needsClassUpdate = !0;
            else {
                for (let t in this.style.on) this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                this.controller.needsStyleUpdate = !0
            }
            this.isApplied = !0
        }
        _unapply() {
            if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), this.controller.needsClassUpdate = !0;
            else {
                for (let t in this.style.off) this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                this.controller.needsStyleUpdate = !0
            }
            this.isApplied = !1
        }
        isValidStyleProperty(t) {
            if (!t.hasOwnProperty("on")) return !1;
            if ("object" != typeof t.on) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
            if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
            return !0
        }
        reconcile(t) {}
        onDOMRead(t) {}
        evaluateInterpolationConstraints() {}
    }
    o.TRIGGER_TYPE_CSS_CLASS = 0, o.TRIGGER_TYPE_STYLE_PROPERTY = 1, o.DATA_ATTRIBUTE = "data-anim-classname", t.exports = o
}, function(t, e, s) {
    "use strict";
    const i = s(8),
        r = s(2),
        n = s(10),
        o = s(0),
        a = s(25),
        h = s(45),
        l = s(46),
        u = s(26),
        c = s(47),
        m = s(49),
        p = {};
    "undefined" != typeof window && (p.create = s(3), p.update = s(4), p.draw = s(6));
    let d = 0;
    t.exports = class extends i {
        constructor(t, e) {
            super(), this.anim = e, this.element = t, this.name = this.name || t.getAttribute("data-anim-scroll-group"), this.isEnabled = !0, this.position = new h, this.metrics = new u, this.metrics.add(this.element), this.expressionParser = new c(this), this.boundsMin = 0, this.boundsMax = 0, this.timelineUpdateRequired = !1, this._keyframesDirty = !1, this.viewableRange = this.createViewableRange(), this.defaultEase = o.KeyframeDefaults.ease, this.keyframeControllers = [], this.updateProgress(this.getPosition()), this.onDOMRead = this.onDOMRead.bind(this), this.onDOMWrite = this.onDOMWrite.bind(this), this.gui = null, this.computedStyleCache = {}, this.destroyed = !1, this.finalizeInit()
        }
        finalizeInit() {
            this.element._animInfo = new a(this, null, !0), this.setupRAFEmitter()
        }
        destroy() {
            this.destroyed = !0, this.expressionParser.destroy(), this.expressionParser = null;
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].destroy();
            this.keyframeControllers = null, this.position = null, this.viewableRange = null, this.gui && (this.gui.destroy(), this.gui = null), this.metrics.destroy(), this.metrics = null, this.rafEmitter.destroy(), this.rafEmitter = null, this.anim = null, this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null, this.element._animInfo = null), this.element = null, this.isEnabled = !1, super.destroy()
        }
        removeKeyframeController(t) {
            return t.destroyed || !this.keyframeControllers.includes(t) ? Promise.resolve() : (t._allKeyframes.forEach(t => t.markedForRemoval = !0), this.keyframesDirty = !0, new Promise(e => {
                p.draw(() => {
                    const s = this.keyframeControllers.indexOf(t); - 1 !== s ? (this.keyframeControllers.splice(s, 1), t.onDOMWrite(), t.destroy(), this.gui && this.gui.create(), e()) : e()
                })
            }))
        }
        remove() {
            return this.anim && this.anim.removeGroup(this)
        }
        clear() {
            return Promise.all(this.keyframeControllers.map(t => this.removeKeyframeController(t)))
        }
        setupRAFEmitter(t) {
            this.rafEmitter && this.rafEmitter.destroy(), this.rafEmitter = t || new p.create, this.rafEmitter.on("update", this.onDOMRead), this.rafEmitter.on("draw", this.onDOMWrite), this.rafEmitter.once("external", () => this.reconcile())
        }
        requestDOMChange() {
            return !!this.isEnabled && this.rafEmitter.run()
        }
        onDOMRead() {
            this.keyframesDirty && this.onKeyframesDirty();
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMRead(this.position.local)
        }
        onDOMWrite() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMWrite();
            this.needsUpdate() && this.requestDOMChange(), this.computedStyleCache = {}
        }
        needsUpdate() {
            if (this._keyframesDirty) return !0;
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                if (this.keyframeControllers[t].needsUpdate()) return !0;
            return !1
        }
        addKeyframe(t, e) {
            let s = this.getControllerForTarget(t);
            return null === s && (s = new m(this, t), this.keyframeControllers.push(s)), this.keyframesDirty = !0, s.addKeyframe(e)
        }
        addEvent(t, e) {
            e.event = e.event || "Generic-Event-Name-" + d++;
            let s = void 0 !== e.end && e.end !== e.start;
            const i = this.addKeyframe(t, e);
            return s ? (e.onEnterOnce && i.controller.once(e.event + ":enter", e.onEnterOnce), e.onExitOnce && i.controller.once(e.event + ":exit", e.onExitOnce), e.onEnter && i.controller.on(e.event + ":enter", e.onEnter), e.onExit && i.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && i.controller.once(e.event, e.onEventOnce), e.onEventReverseOnce && i.controller.once(e.event + ":reverse", e.onEventReverseOnce), e.onEvent && i.controller.on(e.event, e.onEvent), e.onEventReverse && i.controller.on(e.event + ":reverse", e.onEventReverse)), i
        }
        forceUpdate({
            waitForNextUpdate: t = !0,
            silent: e = !1
        } = {}) {
            this.isEnabled && (this.refreshMetrics(), this.timelineUpdateRequired = !0, t ? this.keyframesDirty = !0 : this.onKeyframesDirty({
                silent: e
            }))
        }
        onKeyframesDirty({
            silent: t = !1
        } = {}) {
            this.determineActiveKeyframes(), this.keyframesDirty = !1, this.metrics.refreshMetrics(this.element), this.viewableRange = this.createViewableRange();
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateAnimationConstraints();
            this.updateBounds(), this.updateProgress(this.getPosition()), t || this.updateTimeline(), this.gui && this.gui.create()
        }
        refreshMetrics() {
            let t = new Set([this.element]);
            this.keyframeControllers.forEach(e => {
                t.add(e.element), e._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e)))
            }), this.metrics.refreshCollection(t), this.viewableRange = this.createViewableRange()
        }
        reconcile() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].reconcile()
        }
        determineActiveKeyframes(t) {
            t = t || n(Array.from(document.documentElement.classList));
            for (let e = 0, s = this.keyframeControllers.length; e < s; e++) this.keyframeControllers[e].determineActiveKeyframes(t)
        }
        updateBounds() {
            if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
            let t = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            for (let e = 0, s = this.keyframeControllers.length; e < s; e++) this.keyframeControllers[e].getBounds(t);
            let e = this.convertTValueToScrollPosition(t.min),
                s = this.convertTValueToScrollPosition(t.max);
            s - e < o.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * o.pageMetrics.windowHeight), t.max = this.convertScrollPositionToTValue(s + .5 * o.pageMetrics.windowHeight)) : (t.min -= .001, t.max += .001), this.boundsMin = t.min, this.boundsMax = t.max, this.timelineUpdateRequired = !0
        }
        createViewableRange() {
            return new l(this.metrics.get(this.element), o.pageMetrics.windowHeight)
        }
        _onBreakpointChange(t, e) {
            this.keyframesDirty = !0, this.determineActiveKeyframes()
        }
        updateProgress(t) {
            this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a), this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
        }
        performTimelineDispatch() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateLocalProgress(this.position.local);
            this.trigger(o.EVENTS.ON_TIMELINE_UPDATE, this.position.local), this.trigger("update", this.position.local), this.timelineUpdateRequired = !1, this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(o.EVENTS.ON_TIMELINE_START, this), this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(o.EVENTS.ON_TIMELINE_START + ":reverse", this), this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(o.EVENTS.ON_TIMELINE_COMPLETE, this), this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(o.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this), this.trigger("complete:reverse", this))), null !== this.gui && this.gui.onScrollUpdate(this.position)
        }
        updateTimeline(t) {
            if (!this.isEnabled) return !1;
            void 0 === t && (t = this.getPosition()), this.updateProgress(t);
            let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax,
                s = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
            if (!this.timelineUpdateRequired && e && s && this.position.lastPosition === t) return void(this.position.local = this.position.localUnclamped);
            if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax) return this.performTimelineDispatch(), this.requestDOMChange(), void(this.position.lastPosition = this.position.localUnclamped);
            let i = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax,
                r = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
            if (i && r) return this.performTimelineDispatch(), this.requestDOMChange(), void(this.position.lastPosition = this.position.localUnclamped);
            const n = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax,
                o = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
            (n || o) && (this.performTimelineDispatch(), this.requestDOMChange(), this.position.lastPosition = this.position.localUnclamped), null !== this.gui && this.gui.onScrollUpdate(this.position)
        }
        _onScroll(t) {
            this.updateTimeline(t)
        }
        convertScrollPositionToTValue(t) {
            return this.hasDuration() ? r.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
        }
        convertTValueToScrollPosition(t) {
            return this.hasDuration() ? r.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
        }
        hasDuration() {
            return this.viewableRange.a !== this.viewableRange.d
        }
        getPosition() {
            return o.pageMetrics.scrollY
        }
        getControllerForTarget(t) {
            if (!t._animInfo || !t._animInfo.controllers) return null;
            if (t._animInfo.controller && t._animInfo.controller.group === this) return t._animInfo.controller;
            const e = t._animInfo.controllers;
            for (let t = 0, s = e.length; t < s; t++)
                if (e[t].group === this) return e[t];
            return null
        }
        trigger(t, e) {
            if (void 0 !== this._events[t])
                for (let s = this._events[t].length - 1; s >= 0; s--) void 0 !== e ? this._events[t][s](e) : this._events[t][s]()
        }
        set keyframesDirty(t) {
            this._keyframesDirty = t, this._keyframesDirty && this.requestDOMChange()
        }
        get keyframesDirty() {
            return this._keyframesDirty
        }
    }
}, function(t, e, s) {
    "use strict";
    t.exports = {
        EventEmitterMicro: s(32)
    }
}, function(t, e, s) {
    t.exports = {
        BaseComponent: s(15)
    }
}, function(t, e, s) {
    const i = s(13).EventEmitterMicro,
        r = {
            create: s(3),
            update: s(4),
            draw: s(6)
        },
        n = () => {};
    let o = 0;
    t.exports = class extends i {
        constructor(t) {
            super(), this.el = t.el, this.gum = t.gum, this.componentName = t.componentName, this._keyframeController = null
        }
        destroy() {
            this.el = null, this.gum = null, this._keyframeController = null, super.destroy()
        }
        addKeyframe(t) {
            const e = t.el || this.el;
            return (t.group || this.anim).addKeyframe(e, t)
        }
        addDiscreteEvent(t) {
            t.event = t.event || "Generic-Event-Name-" + o++;
            let e = void 0 !== t.end && t.end !== t.start;
            const s = this.addKeyframe(t);
            return e ? (t.onEnterOnce && s.controller.once(t.event + ":enter", t.onEnterOnce), t.onExitOnce && s.controller.once(t.event + ":exit", t.onExitOnce), t.onEnter && s.controller.on(t.event + ":enter", t.onEnter), t.onExit && s.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && s.controller.once(t.event, t.onEventOnce), t.onEventReverseOnce && s.controller.once(t.event + ":reverse", t.onEventReverseOnce), t.onEvent && s.controller.on(t.event, t.onEvent), t.onEventReverse && s.controller.on(t.event + ":reverse", t.onEventReverse)), s
        }
        addRAFLoop(t) {
            let e = ["start", "end"];
            if (!e.every(e => t.hasOwnProperty(e))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
            const s = new r.create;
            s.on("update", t.onUpdate || n), s.on("draw", t.onDraw || n), s.on("draw", () => s.run());
            const {
                onEnter: i,
                onExit: o
            } = t;
            return t.onEnter = () => {
                s.run(), i && i()
            }, t.onExit = () => {
                s.cancel(), o && o()
            }, this.addDiscreteEvent(t)
        }
        addContinuousEvent(t) {
            t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), t.event = t.event || "Generic-Event-Name-" + o++;
            let e = this.addKeyframe(t);
            return e.controller.on(t.event, t.onDraw), e
        }
        mounted() {}
        onResizeImmediate(t) {}
        onResizeDebounced(t) {}
        onBreakpointChange(t) {}
        get anim() {
            return this.gum.anim
        }
        get keyframeController() {
            return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
        }
        get pageMetrics() {
            return this.anim.model.pageMetrics
        }
    }
}, function(t, e, s) {
    "use strict";

    function i() {
        this._events = {}
    }
    let r = i.prototype;
    r.on = function(t, e) {
        return this._events[t] = this._events[t] || [], this._events[t].unshift(e), e
    }, r.once = function(t, e) {
        let s = this;
        return this.on(t, (function i(r) {
            s.off(t, i), void 0 !== r ? e(r) : e()
        }))
    }, r.off = function(t, e) {
        if (!this.has(t)) return;
        if (1 === arguments.length) return this._events[t] = null, void delete this._events[t];
        let s = this._events[t].indexOf(e); - 1 !== s && this._events[t].splice(s, 1)
    }, r.trigger = function(t, e) {
        if (this.has(t))
            for (let s = this._events[t].length - 1; s >= 0; s--) void 0 !== e ? this._events[t][s](e) : this._events[t][s]()
    }, r.has = function(t) {
        return t in this._events != !1 && 0 !== this._events[t].length
    }, r.destroy = function() {
        for (let t in this._events) this._events[t] = null;
        this._events = null
    }, t.exports = i
}, function(t, e, s) {
    "use strict";
    t.exports = {
        SharedInstance: s(36)
    }
}, function(t, e) {
    t.exports = {
        majorVersionNumber: "3.x"
    }
}, function(t, e) {
    t.exports = class {}
}, function(t, e) {
    t.exports = function(t) {
        return t.startsWith("--") ? t : t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())
    }
}, function(t, e, s) {
    "use strict";
    t.exports = new class {
        constructor() {
            this.linear = function(t) {
                return t
            }, this.easeInQuad = function(t) {
                return t * t
            }, this.easeOutQuad = function(t) {
                return t * (2 - t)
            }, this.easeInOutQuad = function(t) {
                return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
            }, this.easeInSin = function(t) {
                return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
            }, this.easeOutSin = function(t) {
                return Math.sin(Math.PI / 2 * t)
            }, this.easeInOutSin = function(t) {
                return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
            }, this.easeInElastic = function(t) {
                return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
            }, this.easeOutElastic = function(t) {
                return .04 * t / --t * Math.sin(25 * t)
            }, this.easeInOutElastic = function(t) {
                return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
            }, this.easeOutBack = function(t) {
                return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
            }, this.easeInCubic = function(t) {
                return t * t * t
            }, this.easeOutCubic = function(t) {
                return --t * t * t + 1
            }, this.easeInOutCubic = function(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }, this.easeInQuart = function(t) {
                return t * t * t * t
            }, this.easeOutQuart = function(t) {
                return 1 - --t * t * t * t
            }, this.easeInOutQuart = function(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
            }, this.easeInQuint = function(t) {
                return t * t * t * t * t
            }, this.easeOutQuint = function(t) {
                return 1 + --t * t * t * t * t
            }, this.easeInOutQuint = function(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
            }
        }
    }
}, function(t, e) {
    t.exports = () => Math.random().toString(16).slice(-4)
}, function(t, e) {
    let s = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"];
    s.push(...s.map(t => t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())));
    t.exports = {
        transformAttributes: ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
        cssAttributes: s,
        domAttributes: ["scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
        suffixFreeAttributes: ["opacity", "z-index", "font-weight", "zIndex", "fontWeight", "scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"]
    }
}, function(t, e, s) {
    "use strict";
    const i = s(7),
        r = s(0),
        n = s(1);
    class o extends i {
        constructor(t, e) {
            super(t, e), this.keyframeType = r.KeyframeTypes.Event, this.isApplied = !1, this.hasDuration = !1, this.isCurrentlyInRange = !1
        }
        parseOptions(t) {
            t.x = void 0, t.y = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotation = void 0, t.style = void 0, t.cssClass = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, this.event = t.event, this.animValues[this.event] = [0, 0], void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new n(0, 1, !1, this.event)), super.parseOptions(t), this.keyframeType = r.KeyframeTypes.Event
        }
        updateLocalProgress(t) {
            if (this.hasDuration) {
                let e = this.isCurrentlyInRange,
                    s = t >= this.start && t <= this.end;
                if (e === s) return;
                return this.isCurrentlyInRange = s, void(s && !e ? this._trigger(this.event + ":enter") : e && !s && this._trigger(this.event + ":exit"))
            }!this.isApplied && t >= this.start ? (this.isApplied = !0, this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1, this._trigger(this.event + ":reverse"))
        }
        _trigger(t) {
            this.controller.eventObject.event = t, this.controller.eventObject.keyframe = this, this.controller.trigger(t, this.controller.eventObject)
        }
        evaluateConstraints() {
            super.evaluateConstraints(), this.hasDuration = this.start !== this.end
        }
        reset(t) {
            this.isApplied = !1, this.isCurrentlyInRange = !1, super.reset(t)
        }
        onDOMRead(t) {}
        reconcile(t) {}
        evaluateInterpolationConstraints() {}
    }
    o.DATA_ATTRIBUTE = "data-anim-event", t.exports = o
}, function(t, e, s) {
    const i = s(19);
    t.exports = class {
        constructor(t, e, s = !1) {
            this.isGroup = s, this.group = t, this.controller = e, this.controllers = [], this.tweenProps = new i
        }
    }
}, function(t, e, s) {
    "use strict";
    const i = s(0),
        r = (t, e) => null == t ? e : t;
    class n {
        constructor(t) {
            this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.height = 0, this.width = 0
        }
        toString() {
            return `top:${this.top}, bottom:${this.bottom}, left:${this.left}, right:${this.right}, height:${this.height}, width:${this.width}`
        }
        toObject() {
            return {
                top: this.top,
                bottom: this.bottom,
                left: this.left,
                right: this.right,
                height: this.height,
                width: this.width
            }
        }
    }
    t.exports = class {
        constructor() {
            this.clear()
        }
        clear() {
            this._metrics = new WeakMap
        }
        destroy() {
            this._metrics = null
        }
        add(t) {
            let e = this._metrics.get(t);
            if (e) return e;
            let s = new n(t);
            return this._metrics.set(t, s), this._refreshMetrics(t, s)
        }
        get(t) {
            return this._metrics.get(t)
        }
        refreshCollection(t) {
            t.forEach(t => this._refreshMetrics(t, null))
        }
        refreshMetrics(t) {
            return this._refreshMetrics(t)
        }
        _refreshMetrics(t, e) {
            if (e = e || this._metrics.get(t), !(t instanceof Element)) return e.width = r(t.width, 0), e.height = r(t.height, 0), e.top = r(t.top, r(t.y, 0)), e.left = r(t.left, r(t.x, 0)), e.right = e.left + e.width, e.bottom = e.top + e.height, e;
            if (void 0 === t.offsetWidth) {
                let s = t.getBoundingClientRect();
                return e.width = s.width, e.height = s.height, e.top = i.pageMetrics.scrollY + s.top, e.left = i.pageMetrics.scrollX + s.left, e.right = e.left + e.width, e.bottom = e.top + e.height, e
            }
            e.width = t.offsetWidth, e.height = t.offsetHeight, e.top = i.pageMetrics.documentOffsetY, e.left = i.pageMetrics.documentOffsetX;
            let s = t;
            for (; s;) e.top += s.offsetTop, e.left += s.offsetLeft, s = s.offsetParent;
            return e.right = e.left + e.width, e.bottom = e.top + e.height, e
        }
    }
}, function(t, e, s) {
    "use strict";
    var i = s(5);
    t.exports = i.requestAnimationFrame("external")
}, function(t, e, s) {
    const i = s(1);
    t.exports = class extends i {
        constructor(...t) {
            super(...t);
            const e = t[0];
            this.initialValue = new Float32Array(e), this.target = new Float32Array(e), this.current = new Float32Array(e), this.previousValue = new Float32Array(e)
        }
        update(t, e, s) {
            for (let i = 0, r = this.target.length; i < r; i++) this.target[i] = t[0][i] + e * (t[1][i] - t[0][i]), this.previousValue[i] = this.current[i], this.current[i] += (this.target[i] - this.current[i]) * s;
            let i = this.delta(this.current, this.target);
            return i < this.epsilon && (this.current = new Float32Array(this.target), i = 0), i > this.epsilon || 0 === i && this.previousValue.some((t, e) => t !== this.current[e])
        }
        reconcile(t, e) {
            return this.initialValue.forEach((e, s) => this.initialValue[s] = t[0][s]), this.update(t, e, 1)
        }
        needsUpdate() {
            return this.delta(this.current, this.target) > this.epsilon
        }
        delta(t, e) {
            let s = 0;
            for (let i = 0, r = t.length; i < r; i++) s += Math.abs(t[i] - e[i]);
            return s
        }
        calculateEpsilon(t, e) {
            this.epsilon = t.epsilon || .05
        }
        set(t) {
            throw "ArrayTargetValue does not implement a `set` method. Subclasses must overwrite"
        }
        unset(t) {
            throw "ArrayTargetValue does not implement an `unset` method. Subclasses must overwrite"
        }
    }
}, function(t, e, s) {
    const i = s(0);
    class r {
        constructor(t, e) {
            this._index = 0, this.keyframe = t, e && (this.name = e)
        }
        get start() {
            return this.keyframe.jsonProps.start
        }
        set index(t) {
            this._index = t
        }
        get index() {
            return this._index
        }
    }
    t.exports = class {
        constructor(t) {
            this.timeGroup = t, this.chapters = [], this.chapterNames = {}, this.currentChapter = null, this.tween = null, this.destroyed = !1
        }
        destroy() {
            this.destroyed = !0, this.tween && !this.tween.destroyed && this.tween.remove(), this.tween = null
        }
        addChapter(t) {
            const {
                position: e,
                name: s
            } = t;
            if (void 0 === e) throw ReferenceError("Cannot add chapter without target position.");
            t._impIsFirst || 0 !== this.chapters.length || this.addChapter({
                position: 0,
                _impIsFirst: !0
            });
            let i = this.timeGroup.addKeyframe(this, {
                start: e,
                end: e,
                event: "Chapter"
            });
            this.timeGroup.forceUpdate({
                waitForNextFrame: !1,
                silent: !0
            });
            const n = new r(i, s);
            if (this.chapters.push(n), s) {
                if (this.chapterNames.hasOwnProperty(s)) throw ReferenceError(`Duplicate chapter name assigned - "${s}" is already in use`);
                this.chapterNames[s] = n
            }
            return this.chapters.sort((t, e) => t.start - e.start).forEach((t, e) => t.index = e), this.currentChapter = this.currentChapter || this.chapters[0], n
        }
        playToChapter(t) {
            let e;
            if (t.hasOwnProperty("index")) e = this.chapters[t.index];
            else {
                if (!t.hasOwnProperty("name")) throw ReferenceError("Cannot play to chapter without target index or name");
                e = this.chapterNames[t.name]
            }
            if (!e || this.currentChapter === e && !0 !== t.force) return;
            let s = t.ease || "easeInOutCubic";
            this.tween && this.tween.controller && (this.tween.remove(), s = t.ease || "easeOutQuint"), this.timeGroup.timeScale(t.timeScale || 1);
            const r = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e),
                n = this.timeGroup.time(),
                o = e.start;
            let a = !1;
            return this.tween = this.timeGroup.anim.addTween({
                time: n
            }, {
                easeFunction: s,
                duration: r,
                time: [n, o],
                onStart: () => {
                    this.destroyed || this.timeGroup.trigger(i.EVENTS.ON_CHAPTER_INITIATED, {
                        player: this,
                        next: e
                    })
                },
                onDraw: t => {
                    if (this.destroyed) return;
                    let s = t.tweenProps.time.current;
                    this.timeGroup.time(s), t.keyframe.curvedT > .5 && !a && (a = !0, this.currentIndex = e.index, this.currentChapter = e, this.timeGroup.trigger(i.EVENTS.ON_CHAPTER_OCCURRED, {
                        player: this,
                        current: e
                    }))
                },
                onComplete: t => {
                    this.destroyed || (this.timeGroup.time(t.tweenProps.time.current), this.timeGroup.trigger(i.EVENTS.ON_CHAPTER_COMPLETED, {
                        player: this,
                        current: e
                    }), this.timeGroup.paused(!0), this.tween = null)
                }
            }), this.tween
        }
        getDurationToChapter(t) {
            const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
            return Math.abs(e.start - t.start)
        }
    }
}, function(t, e, s) {
    "use strict";
    const i = s(31),
        r = s(41);
    s(14).famGallery = s(66);
    new i(document.querySelector(".main"), {
        anim: r,
        attribute: "data-fam-component-list"
    })
}, function(t, e, s) {
    const i = s(13).EventEmitterMicro,
        r = s(33),
        n = s(14),
        o = {};
    class a extends i {
        constructor(t, e = {}) {
            if (!e.anim) throw "Anim is no longer bundled with BubbleGum. Please pass Anim when initialize BubbleGum: `new BubbleGum(document.querySelector('main'), {anim: AnimSystem})`";
            super(), this.el = t, this.anim = e.anim, this.componentAttribute = e.attribute || "data-component-list", this.attribute = this.componentAttribute.replace(/-./g, t => t[1].toUpperCase()).replace(/data(.)/, (t, e) => e.toLowerCase()), this.components = [], this.componentsInitialized = !1, r.add(() => {
                this.anim.initialize().then(() => {
                    this.initComponents(), this.setupEvents(), this.components.forEach(t => t.mounted()), this.trigger(a.EVENTS.DOM_COMPONENTS_MOUNTED)
                })
            })
        }
        initComponents() {
            // const t = Array.prototype.slice.call(this.el.querySelectorAll(`[${this.componentAttribute}]`));
            // this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
            for (let e = 0; e < t.length; e++) {
                let s = t[e],
                    i = s.getAttribute(this.componentAttribute).split(" ");
                for (let t = 0, e = i.length; t < e; t++) {
                    let e = i[t];
                    "" !== e && " " !== e && this.addComponent({
                        el: s,
                        componentName: e
                    })
                }
            }
            this.componentsInitialized = !0
        }
        setupEvents() {
            this.onResizeDebounced = this.onResizeDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), this.onBreakpointChange = this.onBreakpointChange.bind(this), this.anim.on(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate), this.anim.on(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced), this.anim.on(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
        }
        addComponent(t) {
            const {
                el: e,
                componentName: s,
                data: i
            } = t;
            if (!n.hasOwnProperty(s)) throw "BubbleGum::addComponent could not add component to '" + e.className + "'. No component type '" + s + "' found!";
            const r = n[s];
            if (!a.componentIsSupported(r, s)) return void 0 === o[s] && (console.log("BubbleGum::addComponent unsupported component '" + s + "'. Reason: '" + s + ".IS_SUPPORTED' returned false"), o[s] = !0), null;
            let h = e.dataset[this.attribute] || "";
            h.includes(s) || (e.dataset[this.attribute] = h.split(" ").concat(s).join(" "));
            let l = new r({
                el: e,
                data: i,
                componentName: t.componentName,
                gum: this,
                pageMetrics: this.anim.model.pageMetrics
            });
            return this.components.push(l), this.componentsInitialized && l.mounted(), l
        }
        removeComponent(t) {
            const e = this.components.indexOf(t); - 1 !== e && (this.components.splice(e, 1), t.el.dataset[this.attribute] = t.el.dataset[this.attribute].split(" ").filter(e => e !== t.componentName).join(" "), t.destroy())
        }
        getComponentOfType(t, e = document.documentElement) {
            const s = `[${this.componentAttribute}*=${t}]`,
                i = e.matches(s) ? e : e.querySelector(s);
            return i ? this.components.find(e => e instanceof n[t] && e.el === i) : null
        }
        getComponentsOfType(t, e = document.documentElement) {
            const s = `[${this.componentAttribute}*=${t}]`,
                i = e.matches(s) ? [e] : Array.from(e.querySelectorAll(s));
            return this.components.filter(e => e instanceof n[t] && i.includes(e.el))
        }
        getComponentsForElement(t) {
            return this.components.filter(e => e.el === t)
        }
        onResizeImmediate() {
            this.components.forEach(t => t.onResizeImmediate(this.anim.model.pageMetrics))
        }
        onResizeDebounced() {
            this.components.forEach(t => t.onResizeDebounced(this.anim.model.pageMetrics))
        }
        onBreakpointChange() {
            this.components.forEach(t => t.onBreakpointChange(this.anim.model.pageMetrics))
        }
        static componentIsSupported(t, e) {
            const s = t.IS_SUPPORTED;
            if (void 0 === s) return !0;
            if ("function" != typeof s) return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
            const i = t.IS_SUPPORTED();
            return void 0 === i ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : i
        }
    }
    a.EVENTS = {
        DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
    }, t.exports = a
}, function(t, e, s) {
    "use strict";

    function i() {
        this._events = {}
    }
    let r = i.prototype;
    r.on = function(t, e) {
        return this._events[t] = this._events[t] || [], this._events[t].unshift(e), e
    }, r.once = function(t, e) {
        let s = this;
        return this.on(t, (function i(r) {
            s.off(t, i), void 0 !== r ? e(r) : e()
        }))
    }, r.off = function(t, e) {
        if (!this.has(t)) return;
        if (1 === arguments.length) return this._events[t] = null, void delete this._events[t];
        let s = this._events[t].indexOf(e); - 1 !== s && this._events[t].splice(s, 1)
    }, r.trigger = function(t, e) {
        if (this.has(t))
            for (let s = this._events[t].length - 1; s >= 0; s--) void 0 !== e ? this._events[t][s](e) : this._events[t][s]()
    }, r.has = function(t) {
        return t in this._events != !1 && 0 !== this._events[t].length
    }, r.destroy = function() {
        for (let t in this._events) this._events[t] = null;
        this._events = null
    }, t.exports = i
}, function(t, e) {
    let s = !1,
        i = !1,
        r = [],
        n = -1;
    t.exports = {
        NUMBER_OF_FRAMES_TO_WAIT: 30,
        add: function(t) {
            if (i && t(), r.push(t), s) return;
            s = !0;
            let e = document.documentElement.scrollHeight,
                o = 0;
            const a = () => {
                let t = document.documentElement.scrollHeight;
                if (e !== t) o = 0;
                else if (o++, o >= this.NUMBER_OF_FRAMES_TO_WAIT) return void r.forEach(t => t());
                e = t, n = requestAnimationFrame(a)
            };
            n = requestAnimationFrame(a)
        },
        reset() {
            cancelAnimationFrame(n), s = !1, i = !1, r = []
        }
    }
}, function(t, e, s) {
    "use strict";
    t.exports = {
        EventEmitterMicro: s(16)
    }
}, function(t, e, s) {
    "use strict";
    var i = s(17).SharedInstance,
        r = s(18).majorVersionNumber,
        n = s(37);
    t.exports = i.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", r, n)
}, function(t, e, s) {
    "use strict";
    var i, r = "undefined" != typeof window ? window : {},
        n = r.AC,
        o = (i = {}, {
            get: function(t, e) {
                var s = null;
                return i[t] && i[t][e] && (s = i[t][e]), s
            },
            set: function(t, e, s) {
                return i[t] || (i[t] = {}), i[t][e] = "function" == typeof s ? new s : s, i[t][e]
            },
            share: function(t, e, s) {
                var i = this.get(t, e);
                return i || (i = this.set(t, e, s)), i
            },
            remove: function(t, e) {
                var s = typeof e;
                if ("string" !== s && "number" !== s) i[t] && (i[t] = null);
                else {
                    if (!i[t] || !i[t][e]) return;
                    i[t][e] = null
                }
            }
        });
    n || (n = r.AC = {}), n.SharedInstance || (n.SharedInstance = o), t.exports = n.SharedInstance
}, function(t, e, s) {
    "use strict";
    var i, r = s(16);

    function n(t) {
        t = t || {}, this._reset(), this.updatePhases(), this.eventEmitter = new r, this._willRun = !1, this._totalSubscribeCount = -1;
        var e = null,
            s = null;
        "undefined" != typeof window ? (e = window.requestAnimationFrame, s = window.cancelAnimationFrame) : e = s = function() {}, this._requestAnimationFrame = e, this._cancelAnimationFrame = s, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
    }(i = n.prototype).frameRequestedPhase = "requested", i.startPhase = "start", i.runPhases = ["update", "external", "draw"], i.endPhase = "end", i.disabledPhase = "disabled", i.beforePhaseEventPrefix = "before:", i.afterPhaseEventPrefix = "after:", i.subscribe = function(t, e) {
        return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
    }, i.subscribeImmediate = function(t, e) {
        return this._totalSubscribeCount++, this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id), this._subscribers[t.id] = t, this._subscriberArrayLength++, this._subscriberCount++), this._totalSubscribeCount
    }, i.unsubscribe = function(t) {
        return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
    }, i.getSubscribeID = function() {
        return this._totalSubscribeCount += 1
    }, i.destroy = function() {
        var t = this._cancel();
        return this.eventEmitter.destroy(), this.eventEmitter = null, this.phases = null, this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
    }, i.useExternalAnimationFrame = function(t) {
        if ("boolean" == typeof t) {
            var e = this._isUsingExternalAnimationFrame;
            return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
        }
    }, i.updatePhases = function() {
        this.phases || (this.phases = []), this.phases.length = 0, this.phases.push(this.frameRequestedPhase), this.phases.push(this.startPhase), Array.prototype.push.apply(this.phases, this.runPhases), this.phases.push(this.endPhase), this._runPhasesLength = this.runPhases.length, this._phasesLength = this.phases.length
    }, i._run = function() {
        if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this.phase === this.disabledPhase && (this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex]), !0
    }, i._cancel = function() {
        var t = !1;
        return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
    }, i._onAnimationFrame = function(t) {
        for (this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex], this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
        for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
            for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
        }
        for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
        this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? (this.phaseIndex = 0, this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
    }, i._onExternalAnimationFrame = function(t) {
        this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
    }, i._reset = function() {
        this._rafData || (this._rafData = {}), this._rafData.time = 0, this._rafData.delta = 0, this._rafData.fps = 0, this._rafData.naturalFps = 0, this._rafData.timeNow = 0, this._subscribers = {}, this._subscribersOrder = [], this._currentSubscriberIndex = -1, this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0, this._runPhaseIndex = -1, this.phaseIndex = -1, this.phase = this.disabledPhase
    }, t.exports = n
}, function(t, e, s) {
    "use strict";
    var i = s(17).SharedInstance,
        r = s(18).majorVersionNumber,
        n = function() {
            this._currentID = 0
        };
    n.prototype.getNewID = function() {
        return this._currentID++, "raf:" + this._currentID
    }, t.exports = i.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", r, n)
}, function(t, e, s) {
    "use strict";
    var i = s(40),
        r = function(t) {
            this.phase = t, this.rafEmitter = new i, this._cachePhaseIndex(), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this), this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this), this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this), this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)), this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart), this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase), this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase), this._frameCallbacks = [], this._currentFrameCallbacks = [], this._nextFrameCallbacks = [], this._phaseActive = !1, this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._currentFrameCallbacksLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
        },
        n = r.prototype;
    n.requestAnimationFrame = function(t, e) {
        return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0), this._frameCallbacks.push(this._currentFrameID, t), this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1), this._currentFrameCallbacks.push(this._currentFrameID, t), this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2), this._currentFrameID
    }, n.cancelAnimationFrame = function(t) {
        this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
    }, n._onRAFExecuted = function(t) {
        for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
        this._frameCallbacks.length = 0, this._frameCallbackLength = 0
    }, n._onBeforeRAFExecutorStart = function() {
        Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)), this._currentFrameCallbacksLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks.length = 0, this._nextFrameCallbacksLength = 0
    }, n._onBeforeRAFExecutorPhase = function() {
        this._phaseActive = !0, Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)), this._frameCallbackLength = this._currentFrameCallbacksLength, this._currentFrameCallbacks.length = 0, this._currentFrameCallbacksLength = 0
    }, n._onAfterRAFExecutorPhase = function() {
        this._phaseActive = !1
    }, n._cachePhaseIndex = function() {
        this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
    }, n._cancelRunningAnimationFrame = function() {
        this._frameCallbacks.splice(this._cancelFrameIdx, 2), this._frameCallbackLength -= 2
    }, n._cancelCurrentAnimationFrame = function() {
        this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), this._currentFrameCallbacksLength -= 2
    }, n._cancelNextAnimationFrame = function() {
        this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
    }, t.exports = r
}, function(t, e, s) {
    "use strict";
    var i = s(3),
        r = function(t) {
            i.call(this, t)
        };
    (r.prototype = Object.create(i.prototype))._subscribe = function() {
        return this.executor.subscribe(this, !0)
    }, t.exports = r
}, function(t, e, s) {
    "use strict";
    const i = s(8),
        r = s(0),
        n = s(7),
        o = s(11),
        a = s(24),
        h = s(12),
        l = s(62),
        u = s(63),
        c = s(64),
        m = {};
    "undefined" != typeof window && (m.update = s(4), m.cancelUpdate = s(65), m.external = s(27), m.draw = s(6));
    let p = null;
    class d extends i {
        constructor() {
            if (super(), p) throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
            p = this, this.groups = [], this.scrollSystems = [], this.timeSystems = [], this.tweenGroup = null, this._forceUpdateRAFId = -1, this.initialized = !1, this.model = r, this.plugins = {
                keyframe: [],
                parser: []
            }, this.version = c.version, this._resolveReady = () => {}, this.ready = new Promise(t => this._resolveReady = t), this.onScroll = this.onScroll.bind(this), this.onResizedDebounced = this.onResizedDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this)
        }
        initialize() {
            return this.initialized || "undefined" == typeof window || (this.initialized = !0, this.timeSystems = [], this.scrollSystems = [], this.groups = [], this.setupEvents(), this.initializeResizeFilter(), this.initializeModel(), this.createDOMGroups(), this.createDOMKeyframes(), this.tweenGroup = new u(null, this), this.groups.unshift(this.tweenGroup), this._resolveReady()), this.ready
        }
        use(t, e) {
            t.install(this, e)
        }
        remove() {
            return this.initialized ? Promise.all(this.groups.map(t => t.remove())).then(() => {
                this.groups = null, this.scrollSystems = null, this.timeSystems = null, window.clearTimeout(r.RESIZE_TIMEOUT), window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), this._events = {}, this.initialized = !1, this.ready = new Promise(t => this._resolveReady = t)
            }) : (this.ready = new Promise(t => this._resolveReady = t), Promise.resolve())
        }
        destroy() {
            return this.remove()
        }
        createTimeGroup(t, e) {
            t instanceof HTMLElement || (t = (e = t || {}).el);
            let s = new l(t, this);
            return e && e.name && (s.name = e.name), this.groups.push(s), this.timeSystems.push(s), this.trigger(r.EVENTS.ON_GROUP_CREATED, s), s
        }
        createScrollGroup(t, e) {
            if (!t) throw "AnimSystem scroll based groups must supply an HTMLElement";
            let s = new h(t, this);
            return (e = e || {}).name && (s.name = e.name), e.getPosition && e.getMaxPosition && (s.getPosition = e.getPosition, s.createViewableRange = () => ({
                a: 0,
                d: e.getMaxPosition()
            })), s.getPosition = e.getPosition || s.getPosition, s.getPosition = e.getPosition || s.getPosition, this.groups.push(s), this.scrollSystems.push(s), this.trigger(r.EVENTS.ON_GROUP_CREATED, s), s
        }
        removeGroup(t) {
            return t.destroyed || t.anim !== this ? Promise.resolve() : Promise.all(t.keyframeControllers.map(e => t.removeKeyframeController(e))).then(() => {
                let e = this.groups.indexOf(t); - 1 !== e && this.groups.splice(e, 1), e = this.scrollSystems.indexOf(t), -1 !== e && this.scrollSystems.splice(e, 1), e = this.timeSystems.indexOf(t), -1 !== e && this.timeSystems.splice(e, 1), t.destroyed || t.destroy()
            })
        }
        createDOMGroups() {
            document.body.setAttribute("data-anim-scroll-group", "body"), document.querySelectorAll("[data-anim-scroll-group]").forEach(t => this.createScrollGroup(t)), document.querySelectorAll("[data-anim-time-group]").forEach(t => this.createTimeGroup(t)), this.trigger(r.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
        }
        createDOMKeyframes() {
            let t = [];
            ["data-anim-keyframe", n.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE].forEach((function(e) {
                for (let s = 0; s < 12; s++) t.push(e + (0 === s ? "" : "-" + (s - 1)))
            }));
            for (let e = 0; e < t.length; e++) {
                let s = t[e],
                    i = document.querySelectorAll("[" + s + "]");
                for (let t = 0; t < i.length; t++) {
                    const e = i[t],
                        r = JSON.parse(e.getAttribute(s));
                    this.addKeyframe(e, r)
                }
            }
            m.update(() => {
                null !== this.groups && (this.groups.forEach(t => t.onKeyframesDirty({
                    silent: !0
                })), this.groups.forEach(t => t.trigger(r.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)), this.trigger(r.EVENTS.ON_DOM_KEYFRAMES_CREATED, this), this.groups.forEach(t => {
                    t.forceUpdate({
                        waitForNextUpdate: !1,
                        silent: !0
                    }), t.reconcile()
                }), this.onScroll())
            }, !0)
        }
        initializeResizeFilter() {
            if (r.cssDimensionsTracker) return;
            const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
            t.setAttribute("cssDimensionsTracker", "true"), t.style.position = "fixed", t.style.top = "0", t.style.width = "100%", t.style.height = "100vh", t.style.pointerEvents = "none", t.style.visibility = "hidden", t.style.zIndex = "-1", document.documentElement.appendChild(t), r.cssDimensionsTracker = t
        }
        initializeModel() {
            r.pageMetrics.windowHeight = r.cssDimensionsTracker.clientHeight, r.pageMetrics.windowWidth = r.cssDimensionsTracker.clientWidth, r.pageMetrics.scrollY = window.scrollY || window.pageYOffset, r.pageMetrics.scrollX = window.scrollX || window.pageXOffset, r.pageMetrics.breakpoint = r.getBreakpoint();
            let t = document.documentElement.getBoundingClientRect();
            r.pageMetrics.documentOffsetX = t.left + r.pageMetrics.scrollX, r.pageMetrics.documentOffsetY = t.top + r.pageMetrics.scrollY
        }
        setupEvents() {
            window.removeEventListener("scroll", this.onScroll), window.addEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), window.addEventListener("resize", this.onResizeImmediate)
        }
        onScroll() {
            r.pageMetrics.scrollY = window.scrollY || window.pageYOffset, r.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
            for (let t = 0, e = this.scrollSystems.length; t < e; t++) this.scrollSystems[t].updateTimeline();
            this.trigger(r.PageEvents.ON_SCROLL, r.pageMetrics)
        }
        onResizeImmediate() {
            let t = r.cssDimensionsTracker.clientWidth,
                e = r.cssDimensionsTracker.clientHeight;
            if (t === r.pageMetrics.windowWidth && e === r.pageMetrics.windowHeight) return;
            r.pageMetrics.windowWidth = t, r.pageMetrics.windowHeight = e, r.pageMetrics.scrollY = window.scrollY || window.pageYOffset, r.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
            let s = document.documentElement.getBoundingClientRect();
            r.pageMetrics.documentOffsetX = s.left + r.pageMetrics.scrollX, r.pageMetrics.documentOffsetY = s.top + r.pageMetrics.scrollY, window.clearTimeout(r.RESIZE_TIMEOUT), r.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250), this.trigger(r.PageEvents.ON_RESIZE_IMMEDIATE, r.pageMetrics)
        }
        onResizedDebounced() {
            m.update(() => {
                let t = r.pageMetrics.breakpoint,
                    e = r.getBreakpoint();
                if (e !== t) {
                    r.pageMetrics.previousBreakpoint = t, r.pageMetrics.breakpoint = e;
                    for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t]._onBreakpointChange();
                    this.trigger(r.PageEvents.ON_BREAKPOINT_CHANGE, r.pageMetrics)
                }
                for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t].forceUpdate({
                    waitForNextUpdate: !1
                });
                this.trigger(r.PageEvents.ON_RESIZE_DEBOUNCED, r.pageMetrics)
            }, !0)
        }
        forceUpdate({
            waitForNextUpdate: t = !0,
            silent: e = !1
        } = {}) {
            -1 !== this._forceUpdateRAFId && m.cancelUpdate(this._forceUpdateRAFId);
            let s = () => {
                for (let t = 0, s = this.groups.length; t < s; t++) {
                    this.groups[t].forceUpdate({
                        waitForNextUpdate: !1,
                        silent: e
                    })
                }
                return -1
            };
            this._forceUpdateRAFId = t ? m.update(s, !0) : s()
        }
        addKeyframe(t, e) {
            let s = this.getGroupForTarget(t);
            return s = s || this.getGroupForTarget(document.body), s.addKeyframe(t, e)
        }
        addEvent(t, e) {
            let s = this.getGroupForTarget(t);
            return s = s || this.getGroupForTarget(document.body), s.addEvent(t, e)
        }
        getTimeGroupForTarget(t) {
            return this._getGroupForTarget(t, t => t instanceof l)
        }
        getScrollGroupForTarget(t) {
            return this._getGroupForTarget(t, t => !(t instanceof l))
        }
        getGroupForTarget(t) {
            return this._getGroupForTarget(t, () => !0)
        }
        getGroupByName(t) {
            return this.groups.find(e => e.name === t)
        }
        _getGroupForTarget(t, e) {
            if (t._animInfo && t._animInfo.group && e(t._animInfo.group)) return t._animInfo.group;
            let s = t;
            for (; s;) {
                if (s._animInfo && s._animInfo.isGroup && e(s._animInfo.group)) return s._animInfo.group;
                s = s.parentElement
            }
        }
        getControllerForTarget(t) {
            return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
        }
        addTween(t, e) {
            return this.tweenGroup.addKeyframe(t, e)
        }
    }
    t.exports = "undefined" == typeof window ? new d : window.AC.SharedInstance.share("AnimSystem", c.major, d), t.exports.default = t.exports
}, function(t, e, s) {
    "use strict";
    const i = Math.abs;
    class r {
        constructor(t, e, s, i) {
            this.cp = new Float32Array(6), this.cp[0] = 3 * t, this.cp[1] = 3 * (s - t) - this.cp[0], this.cp[2] = 1 - this.cp[0] - this.cp[1], this.cp[3] = 3 * e, this.cp[4] = 3 * (i - e) - this.cp[3], this.cp[5] = 1 - this.cp[3] - this.cp[4]
        }
        sampleCurveX(t) {
            return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
        }
        sampleCurveY(t) {
            return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
        }
        sampleCurveDerivativeX(t) {
            return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
        }
        solveCurveX(t) {
            var e, s, r, n, o, a;
            for (r = t, a = 0; a < 5; a++) {
                if (n = this.sampleCurveX(r) - t, i(n) < 1e-5) return r;
                if (o = this.sampleCurveDerivativeX(r), i(o) < 1e-5) break;
                r -= n / o
            }
            if ((r = t) < (e = 0)) return e;
            if (r > (s = 1)) return s;
            for (; e < s;) {
                if (n = this.sampleCurveX(r), i(n - t) < 1e-5) return r;
                t > n ? e = r : s = r, r = .5 * (s - e) + e
            }
            return r
        }
        solve(t) {
            return this.sampleCurveY(this.solveCurveX(t))
        }
    }
    const n = /\d*\.?\d+/g;
    r.fromCSSString = function(t) {
        let e = t.match(n);
        if (4 !== e.length) throw `UnitBezier could not convert ${t} to cubic-bezier`;
        let s = e.map(Number),
            i = new r(s[0], s[1], s[2], s[3]);
        return i.solve.bind(i)
    }, t.exports = r
}, function(t, e, s) {
    "use strict";
    const {
        map: i
    } = s(2), r = {};
    class n {
        constructor(t, e, s, i) {
            this.mass = t, this.stiffness = e, this.damping = s, this.initialVelocity = i, this.m_w0 = Math.sqrt(this.stiffness / this.mass), this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)), this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta), this.m_A = 1, this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0, this.m_A = 1, this.m_B = -this.initialVelocity + this.m_w0)
        }
        solve(t) {
            return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
        }
    }
    const o = /\d*\.?\d+/g;
    n.fromCSSString = function(t) {
        let e = t.match(o);
        if (4 !== e.length) throw `SpringEasing could not convert ${cssString} to spring params`;
        let s = e.map(Number),
            a = new n(...s);
        const h = a.solve.bind(a);
        let l = 0;
        let u = function() {
            if (r[t]) return r[t];
            let e, s = 0;
            for (;;) {
                l += 1 / 6;
                if (1 === h(l)) {
                    if (s++, s >= 16) {
                        e = l * (1 / 6);
                        break
                    }
                } else s = 0
            }
            return r[t] = e, r[t]
        }();
        return function(t) {
            return 0 === t || 1 === t ? t : h(i(t, 0, 1, 0, u))
        }
    }, t.exports = n
}, function(t, e) {
    t.exports = function(t, e) {
        if ("string" != typeof t) return t;
        try {
            return (e || document).querySelector(t) || document.querySelector(t)
        } catch (t) {
            return !1
        }
    }
}, function(t, e) {
    t.exports = class {
        constructor() {
            this.local = 0, this.localUnclamped = 0, this.lastPosition = 0
        }
    }
}, function(t, e) {
    t.exports = class {
        constructor(t, e) {
            this.a = t.top - e, this.a < 0 && (this.a = t.top), this.b = t.top, this.d = t.bottom, this.c = Math.max(this.d - e, this.b)
        }
    }
}, function(t, e, s) {
    "use strict";
    const i = s(48),
        r = new(s(26));
    class n {
        constructor(t) {
            this.group = t, this.data = {
                target: null,
                anchors: null,
                metrics: this.group.metrics
            }
        }
        parseArray(t, e) {
            return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
        }
        parseExpression(t, e) {
            if (null == e) return null;
            if ("number" == typeof e) return e;
            if ("string" != typeof e) throw `Expression must be a string, received ${typeof e}: ${e}`;
            return this.data.target = t.controller.element, this.data.anchors = t.anchors, this.data.keyframe = t.keyframe, this.group.anim.plugins.parser.reduce((s, i) => s || i.parseExpression.call(this, t, e), null) || n._parse(e, this.data)
        }
        parseTimeValue(t, e) {
            if ("number" == typeof e) return e;
            let s = this.group.expressionParser.parseExpression(t, e);
            return this.group.convertScrollPositionToTValue(s)
        }
        destroy() {
            this.group = null
        }
        static parse(t, e) {
            return (e = e || {}) && (r.clear(), e.target && r.add(e.target), e.anchors && e.anchors.forEach(t => r.add(t))), e.metrics = r, n._parse(t, e)
        }
        static _parse(t, e) {
            return i.Parse(t).execute(e)
        }
    }
    n.programs = i.programs, "undefined" != typeof window && (window.ExpressionParser = n), t.exports = n
}, function(t, e, s) {
    const i = s(0),
        r = s(2),
        n = s(21),
        o = {},
        a = {
            smoothstep: (t, e, s) => (s = a.clamp((s - t) / (e - t), 0, 1)) * s * (3 - 2 * s),
            deg: t => 180 * t / Math.PI,
            rad: t => t * Math.PI / 180,
            random: (t, e) => Math.random() * (e - t) + t,
            atan: Math.atan2
        };
    Object.getOwnPropertyNames(Math).forEach(t => a[t] ? null : a[t.toLowerCase()] = Math[t]), Object.getOwnPropertyNames(r).forEach(t => a[t] ? null : a[t.toLowerCase()] = r[t]), Object.getOwnPropertyNames(n).forEach(t => a[t] = n[t]);
    let h = null;
    const l = "a",
        u = "ALPHA",
        c = "(",
        m = ")",
        p = "PLUS",
        d = "MINUS",
        f = "MUL",
        g = "DIV",
        _ = "INTEGER_CONST",
        y = "FLOAT_CONST",
        b = ",",
        v = "EOF",
        E = {
            NUMBERS: /\d|\d\.\d/,
            DIGIT: /\d/,
            OPERATOR: /[-+*/]/,
            PAREN: /[()]/,
            WHITE_SPACE: /\s/,
            ALPHA: /[a-zA-Z]|%/,
            ALPHANUMERIC: /[a-zA-Z0-9]/,
            OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
            GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
            ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw|rad|deg)$/,
            MATH_FUNCTION: new RegExp(`\\b(${Object.keys(a).join("|")})\\b`, "i")
        },
        w = function(t, e, s, i = "") {
            let r = e.slice(Math.max(s, 0), Math.min(e.length, s + 3)),
                n = new Error(`Expression Error. ${t} in expression "${e}", near "${r}"`);
            throw console.error(n.message, h ? h.keyframe || h.target : ""), n
        },
        x = {
            round: 1,
            clamp: 3,
            lerp: 3,
            random: 2,
            atan: 2,
            floor: 1,
            ceil: 1,
            abs: 1,
            cos: 1,
            sin: 1,
            smoothstep: 3,
            rad: 1,
            deg: 1,
            pow: 2,
            calc: 1
        };
    class T {
        constructor(t, e) {
            this.type = t, this.value = e
        }
    }
    T.ONE = new T("100", 100), T.EOF = new T(v, null);
    class A {
        constructor(t) {
            this.type = t
        }
    }
    class P extends A {
        constructor(t, e) {
            super("UnaryOp"), this.token = this.op = t, this.expr = e
        }
    }
    class S extends A {
        constructor(t, e, s) {
            super("BinOp"), this.left = t, this.op = e, this.right = s
        }
    }
    class C extends A {
        constructor(t, e) {
            if (super("MathOp"), this.op = t, this.list = e, x[t.value] && e.length !== x[t.value]) throw new Error(`Incorrect number of arguments for '${t.value}'. Received ${e.length}, expected ${x[t.value]}`)
        }
    }
    class I extends A {
        constructor(t) {
            super("Num"), this.token = t, this.value = t.value
        }
    }
    class O extends A {
        constructor(t, e, s) {
            super("RefValue"), this.num = t, this.ref = e, this.unit = s
        }
    }
    class M extends A {
        constructor(t, e) {
            super("CSSValue"), this.ref = t, this.propertyName = e
        }
    }
    class R extends A {
        constructor(t, e) {
            super("PropValue"), this.ref = t, this.propertyName = e
        }
    }
    class k {
        constructor(t) {
            let e;
            for (this.text = t, this.pos = 0, this.char = this.text[this.pos], this.tokens = [];
                (e = this.getNextToken()) && e !== T.EOF;) this.tokens.push(e);
            this.tokens.push(e)
        }
        advance() {
            this.char = this.text[++this.pos]
        }
        skipWhiteSpace() {
            for (; null != this.char && E.WHITE_SPACE.test(this.char);) this.advance()
        }
        name() {
            let t = "";
            for (; null != this.char && E.ALPHA.test(this.char);) t += this.char, this.advance();
            return new T(u, t)
        }
        number() {
            let t = "";
            for ("." === this.char && (t += this.char, this.advance()); null != this.char && E.DIGIT.test(this.char);) t += this.char, this.advance();
            if (null != this.char && "." === this.char)
                for (t.includes(".") && w("Number appears to contain 2 decimal points", this.text, this.pos), t += this.char, this.advance(); null != this.char && E.DIGIT.test(this.char);) t += this.char, this.advance();
            return "." === t && w("Attempted to parse a number, but found only a decimal point", this.text, this.pos), t.includes(".") ? new T(y, parseFloat(t)) : new T(_, parseInt(t))
        }
        getNextToken() {
            for (; null != this.char;)
                if (E.WHITE_SPACE.test(this.char)) this.skipWhiteSpace();
                else {
                    if ("." === this.char || E.DIGIT.test(this.char)) return this.number();
                    if ("," === this.char) return this.advance(), new T(b, ",");
                    if (E.OPERATOR.test(this.char)) {
                        let t = "",
                            e = this.char;
                        switch (e) {
                            case "+":
                                t = p;
                                break;
                            case "-":
                                t = d;
                                break;
                            case "*":
                                t = f;
                                break;
                            case "/":
                                t = g
                        }
                        return this.advance(), new T(t, e)
                    }
                    if (E.PAREN.test(this.char)) {
                        let t = "",
                            e = this.char;
                        switch (e) {
                            case "(":
                                t = c;
                                break;
                            case ")":
                                t = m
                        }
                        return this.advance(), new T(t, e)
                    }
                    if (E.ALPHA.test(this.char)) return this.name();
                    w(`Unexpected character "${this.char}"`, this.text, this.pos)
                } return T.EOF
        }
    }
    class F {
        constructor(t) {
            this.lexer = t, this.pos = 0
        }
        get currentToken() {
            return this.lexer.tokens[this.pos]
        }
        error(t, e = "") {
            w(t, e, this.lexer.text, this.pos)
        }
        consume(t) {
            let e = this.currentToken;
            return e.type === t ? this.pos += 1 : this.error(`Invalid token ${this.currentToken.value}, expected ${t}`), e
        }
        consumeList(t) {
            t.includes(this.currentToken) ? this.pos += 1 : this.error(`Invalid token ${this.currentToken.value}, expected ${tokenType}`)
        }
        expr() {
            let t = this.term();
            for (; this.currentToken.type === p || this.currentToken.type === d;) {
                const e = this.currentToken;
                switch (e.value) {
                    case "+":
                        this.consume(p);
                        break;
                    case "-":
                        this.consume(d)
                }
                t = new S(t, e, this.term())
            }
            return t
        }
        term() {
            let t = this.factor();
            for (; this.currentToken.type === f || this.currentToken.type === g;) {
                const e = this.currentToken;
                switch (e.value) {
                    case "*":
                        this.consume(f);
                        break;
                    case "/":
                        this.consume(g)
                }
                t = new S(t, e, this.factor())
            }
            return t
        }
        factor() {
            if (this.currentToken.type === p) return new P(this.consume(p), this.factor());
            if (this.currentToken.type === d) return new P(this.consume(d), this.factor());
            if (this.currentToken.type === _ || this.currentToken.type === y) {
                let t = new I(this.currentToken);
                if (this.pos += 1, E.OPERATOR.test(this.currentToken.value) || this.currentToken.type === m || this.currentToken.type === b || this.currentToken.type === v) return t;
                if (this.currentToken.type === u && this.currentToken.value === l) return this.consume(u), new O(t, this.anchorIndex(), this.unit(E.ANY_UNIT));
                if (this.currentToken.type === u) return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"), new O(t, null, this.unit());
                this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
            } else {
                if (E.OBJECT_UNIT.test(this.currentToken.value)) return new O(new I(T.ONE), null, this.unit());
                if (this.currentToken.value === l) {
                    this.consume(u);
                    const t = this.anchorIndex();
                    if (E.OBJECT_UNIT.test(this.currentToken.value)) return new O(new I(T.ONE), t, this.unit())
                } else if (this.currentToken.type === u) {
                    if ("calc" === this.currentToken.value) return this.consume(u), this.expr();
                    if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                        const t = "prop" !== this.currentToken.value ? M : R;
                        this.consume(u), this.consume(c);
                        const e = this.propertyName();
                        let s = null;
                        return this.currentToken.type === b && (this.consume(b), this.consume(u), s = this.anchorIndex()), this.consume(m), new t(s, e)
                    }
                    if (E.MATH_FUNCTION.test(this.currentToken.value)) {
                        const t = this.currentToken.value,
                            e = t.toLowerCase();
                        if ("number" == typeof a[e]) return this.consume(u), new I(new T(u, a[e]));
                        const s = T[t] || new T(t, t),
                            i = [];
                        this.consume(u), this.consume(c);
                        let r = null;
                        do {
                            this.currentToken.value === b && this.consume(b), r = this.expr(), i.push(r)
                        } while (this.currentToken.value === b);
                        return this.consume(m), new C(s, i)
                    }
                } else if (this.currentToken.type === c) {
                    this.consume(c);
                    let t = this.expr();
                    return this.consume(m), t
                }
            }
            this.error("Unexpected token " + this.currentToken.value)
        }
        propertyName() {
            let t = "";
            for (; this.currentToken.type === u || this.currentToken.type === d;) t += this.currentToken.value, this.pos += 1;
            return t
        }
        unit(t = E.ANY_UNIT) {
            const e = this.currentToken;
            if (e.type === u && t.test(e.value)) return this.consume(u), new T(u, e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
            this.error("Expected unit type")
        }
        anchorIndex() {
            const t = this.currentToken;
            if (t.type === _) return this.consume(_), new I(t);
            this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
        }
        parse() {
            const t = this.expr();
            return this.currentToken !== T.EOF && this.error("Unexpected token " + this.currentToken.value), t
        }
    }
    class D {
        constructor(t) {
            this.parser = t, this.root = t.parse()
        }
        visit(t) {
            let e = this[t.type];
            if (!e) throw new Error("No visit method named, " + e);
            return e.call(this, t)
        }
        BinOp(t) {
            switch (t.op.type) {
                case p:
                    return this.visit(t.left) + this.visit(t.right);
                case d:
                    return this.visit(t.left) - this.visit(t.right);
                case f:
                    return this.visit(t.left) * this.visit(t.right);
                case g:
                    return this.visit(t.left) / this.visit(t.right)
            }
        }
        RefValue(t) {
            let e = this.unwrapReference(t),
                s = t.unit.value,
                r = t.num.value;
            const n = h.metrics.get(e);
            switch (s) {
                case "h":
                    return .01 * r * n.height;
                case "t":
                    return .01 * r * n.top;
                case "vh":
                    return .01 * r * i.pageMetrics.windowHeight;
                case "vw":
                    return .01 * r * i.pageMetrics.windowWidth;
                case "px":
                    return r;
                case "w":
                    return .01 * r * n.width;
                case "b":
                    return .01 * r * n.bottom;
                case "l":
                    return .01 * r * n.left;
                case "r":
                    return .01 * r * n.right;
                case "rad":
                    return 180 * r / Math.PI;
                case "deg":
                    return r
            }
        }
        PropValue(t) {
            return (null === t.ref ? h.target : h.anchors[t.ref.value])[t.propertyName]
        }
        CSSValue(t) {
            let e = this.unwrapReference(t);
            const s = getComputedStyle(e).getPropertyValue(t.propertyName);
            return "" === s ? 0 : D.Parse(s).execute(h)
        }
        Num(t) {
            return t.value
        }
        UnaryOp(t) {
            return t.op.type === p ? +this.visit(t.expr) : t.op.type === d ? -this.visit(t.expr) : void 0
        }
        MathOp(t) {
            let e = t.list.map(t => this.visit(t));
            return a[t.op.value].apply(null, e)
        }
        unwrapReference(t) {
            return null === t.ref ? h.target : (t.ref.value >= h.anchors.length && console.error("Not enough anchors supplied for expression " + this.parser.lexer.text, h.target), h.anchors[t.ref.value])
        }
        execute(t) {
            return h = t, this.visit(this.root)
        }
        static Parse(t) {
            return o[t] || (o[t] = new D(new F(new k(t))))
        }
    }
    D.programs = o, t.exports = D
}, function(t, e, s) {
    "use strict";
    const i = s(0),
        r = s(1),
        n = s(50),
        o = s(25),
        a = s(11),
        h = s(51),
        l = s(10),
        u = s(22),
        c = s(8),
        m = s(52),
        p = {};
    "undefined" != typeof window && (p.update = s(4), p.external = s(27), p.draw = s(6));
    const {
        transformAttributes: d,
        cssAttributes: f,
        domAttributes: g
    } = s(23), _ = s(53), y = s(9), b = s(54), v = Math.PI / 180, E = {
        create: s(57),
        rotateX: s(58),
        rotateY: s(59),
        rotateZ: s(60),
        scale: s(61)
    };
    t.exports = class extends c {
        constructor(t, e) {
            super(), this._events.draw = [], this.uuid = u(), this.group = t, this.element = e, this._ownerIsElement = this.element instanceof Element, this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid, this.element._animInfo = this.element._animInfo || new o(t, this), this.element._animInfo.controller = this, this.element._animInfo.group = this.group, this.element._animInfo.controllers.push(this), this.tweenProps = this.element._animInfo.tweenProps, this.eventObject = new n(this), this.needsStyleUpdate = !1, this.needsClassUpdate = !1, this.elementMetrics = this.group.metrics.add(this.element), this.attributes = [], this.cssAttributes = [], this.domAttributes = [], this.keyframes = {}, this._allKeyframes = [], this._activeKeyframes = [], this.keyframesRequiringDispatch = [], this.updateCachedValuesFromElement(), this.boundsMin = 0, this.boundsMax = 0, this.mat2d = new Float32Array(6), this.mat4 = E.create(), this.needsWrite = !0, this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
        }
        destroy() {
            if (this.element._animInfo) {
                this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                let t = this.element._animInfo.controllers.indexOf(this);
                if (-1 !== t && this.element._animInfo.controllers.splice(t, 1), 0 === this.element._animInfo.controllers.length) this.element._animInfo = null;
                else {
                    let t = this.element._animInfo.controllers.find(t => t.group !== t.group.anim.tweenGroup);
                    t && (this.element._animInfo.controller = t, this.element._animInfo.group = t.group)
                }
            }
            this.eventObject.controller = null, this.eventObject.element = null, this.eventObject.keyframe = null, this.eventObject.tweenProps = null, this.eventObject = null, this.elementMetrics = null, this.group = null, this.keyframesRequiringDispatch = null;
            for (let t = 0; t < this._allKeyframes.length; t++) this._allKeyframes[t].destroy();
            this._allKeyframes = null, this._activeKeyframes = null, this.attributes = null, this.keyframes = null, this.element = null, this.tweenProps = null, this.destroyed = !0, super.destroy()
        }
        remove() {
            return this.group && this.group.removeKeyframeController(this)
        }
        updateCachedValuesFromElement() {
            if (!this._ownerIsElement) return;
            const t = this.getTargetComputedStyle(!0);
            let e = new DOMMatrix(t.getPropertyValue("transform")),
                s = m(e),
                n = i.KeyframeDefaults.epsilon;
            ["x", "y", "z"].forEach((t, e) => {
                this.tweenProps[t] = new r(s.translation[e], n, !1, t)
            }), this.tweenProps.rotation = new r(s.rotation[2], n, !1, "rotation"), ["rotationX", "rotationY", "rotationZ"].forEach((t, e) => {
                this.tweenProps[t] = new r(s.rotation[e], n, !1, t)
            }), this.tweenProps.scale = new r(s.scale[0], n, !1, "scale"), ["scaleX", "scaleY", "scaleZ"].forEach((t, e) => {
                this.tweenProps[t] = new r(s.scale[e], n, !1, t)
            })
        }
        addKeyframe(t) {
            let e = h(t);
            if (!e) throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
            let s = new e(this, t);
            return s.parseOptions(t), s.id = this._allKeyframes.length, this._allKeyframes.push(s), s
        }
        needsUpdate() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
                let e = this.attributes[t];
                if (this.tweenProps[e].needsUpdate()) return !0
            }
            return !1
        }
        updateLocalProgress(t) {
            for (let e = 0, s = this.attributes.length; e < s; e++) {
                let s = this.attributes[e],
                    i = this.keyframes[this.attributes[e]];
                if (1 === i.length) {
                    i[0].updateLocalProgress(t);
                    continue
                }
                let r = this.getNearestKeyframeForAttribute(s, t);
                r && r.updateLocalProgress(t)
            }
        }
        reconcile() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
                let e = this.attributes[t],
                    s = this.getNearestKeyframeForAttribute(e, this.group.position.local);
                s.updateLocalProgress(this.group.position.local), s.snapAtCreation && s.reconcile(e)
            }
        }
        determineActiveKeyframes(t) {
            t = t || l(Array.from(document.documentElement.classList));
            let e = this._activeKeyframes,
                s = this.attributes,
                i = {};
            this._activeKeyframes = [], this.attributes = [], this.keyframes = {};
            for (let e = 0; e < this._allKeyframes.length; e++) {
                let s = this._allKeyframes[e];
                if (s.markedForRemoval || s.hidden || !s.setEnabled(t))
                    for (let t in s.animValues) this.tweenProps[t].isActive = s.preserveState, s.preserveState && (i[t] = !0);
                else {
                    this._activeKeyframes.push(s);
                    for (let t in s.animValues) this.keyframes[t] = this.keyframes[t] || [], this.keyframes[t].push(s), -1 === this.attributes.indexOf(t) && (i[t] = !0, this.attributes.push(t), this.tweenProps[t].isActive = !0)
                }
            }
            this.attributes.forEach(t => this.tweenProps[t].isActive = !0), this.cssAttributes = this.attributes.filter(t => f.includes(t) || t.startsWith("--")).map(t => this.tweenProps[t]), this.domAttributes = this.attributes.filter(t => g.includes(t)).map(t => this.tweenProps[t]);
            let r = e.filter(t => -1 === this._activeKeyframes.indexOf(t));
            if (0 === r.length) return;
            let n = s.filter(t => -1 === this.attributes.indexOf(t) && !i.hasOwnProperty(t));
            if (0 !== n.length)
                if (this.needsWrite = !0, this._ownerIsElement) p.external(() => {
                    let t = n.some(t => d.includes(t)),
                        e = t && Object.keys(i).some(t => d.includes(t));
                    t && !e && this.element.style.removeProperty("transform");
                    for (let t = 0, e = n.length; t < e; ++t) {
                        let e = n[t],
                            s = this.tweenProps[e],
                            i = s.isActive ? s.target : s.initialValue;
                        if (s.current = s.target = i, !s.isActive) switch (!0) {
                            case s instanceof _:
                            case s instanceof y:
                                s.unset(this.element.style);
                                break;
                            case s instanceof b:
                                s.unset(s.applyToStyle ? this.element.style : this.element)
                        }
                    }
                    for (let t = 0, e = r.length; t < e; ++t) {
                        let e = r[t];
                        e instanceof a && !e.preserveState && e._unapply()
                    }
                }, !0);
                else
                    for (let t = 0, e = n.length; t < e; ++t) {
                        let e = this.tweenProps[n[t]];
                        e.current = e.target, e.isActive = !1
                    }
        }
        onDOMRead(t) {
            for (let e = 0, s = this.attributes.length; e < s; e++) {
                let s = this.attributes[e],
                    i = this.getNearestKeyframeForAttribute(s, t);
                i && i.onDOMRead(s) && (this.needsWrite = !0)
            }
        }
        onDOMWrite() {
            (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1, this.onDOMWriteImp(), this.handleEventDispatch())
        }
        onDOMWriteForObject() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
                let e = this.attributes[t];
                this.element[e] = this.tweenProps[e].current
            }
        }
        onDOMWriteForElement(t = this.element.style) {
            this.handleStyleTransform(t);
            for (let e = 0, s = this.cssAttributes.length; e < s; e++) this.cssAttributes[e].set(t);
            for (let t = 0, e = this.domAttributes.length; t < e; t++) this.domAttributes[t].set(this.element);
            if (this.needsStyleUpdate) {
                for (let t in this.tweenProps.targetStyles) null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]), this.tweenProps.targetStyles[t] = null;
                this.needsStyleUpdate = !1
            }
            this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add), this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove), this.tweenProps.targetClasses.add.length = 0, this.tweenProps.targetClasses.remove.length = 0, this.needsClassUpdate = !1)
        }
        handleStyleTransform(t = this.element.style) {
            let e = this.tweenProps;
            if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
                const s = this.mat4;
                s[0] = 1, s[1] = 0, s[2] = 0, s[3] = 0, s[4] = 0, s[5] = 1, s[6] = 0, s[7] = 0, s[8] = 0, s[9] = 0, s[10] = 1, s[11] = 0, s[12] = 0, s[13] = 0, s[14] = 0, s[15] = 1;
                const i = e.x.current,
                    r = e.y.current,
                    n = e.z.current;
                if (s[12] = s[0] * i + s[4] * r + s[8] * n + s[12], s[13] = s[1] * i + s[5] * r + s[9] * n + s[13], s[14] = s[2] * i + s[6] * r + s[10] * n + s[14], s[15] = s[3] * i + s[7] * r + s[11] * n + s[15], 0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                    const t = (e.rotation.current || e.rotationZ.current) * v;
                    E.rotateZ(s, s, t)
                }
                if (0 !== e.rotationX.current) {
                    const t = e.rotationX.current * v;
                    E.rotateX(s, s, t)
                }
                if (0 !== e.rotationY.current) {
                    const t = e.rotationY.current * v;
                    E.rotateY(s, s, t)
                }
                1 === e.scale.current && 1 === e.scaleX.current && 1 === e.scaleY.current || E.scale(s, s, [e.scale.current, e.scale.current, 1]), t.transform = "matrix3d(" + s[0] + "," + s[1] + "," + s[2] + "," + s[3] + "," + s[4] + "," + s[5] + "," + s[6] + "," + s[7] + "," + s[8] + "," + s[9] + "," + s[10] + "," + s[11] + "," + s[12] + "," + s[13] + "," + s[14] + "," + s[15] + ")"
            } else if (e.x.isActive || e.y.isActive || e.rotation.isActive || e.rotationZ.isActive || e.scale.isActive || e.scaleX.isActive || e.scaleY.isActive) {
                const s = this.mat2d;
                s[0] = 1, s[1] = 0, s[2] = 0, s[3] = 1, s[4] = 0, s[5] = 0;
                const i = e.x.current,
                    r = e.y.current,
                    n = s[0],
                    o = s[1],
                    a = s[2],
                    h = s[3],
                    l = s[4],
                    u = s[5];
                if (s[0] = n, s[1] = o, s[2] = a, s[3] = h, s[4] = n * i + a * r + l, s[5] = o * i + h * r + u, 0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                    const t = (e.rotation.current || e.rotationZ.current) * v,
                        i = s[0],
                        r = s[1],
                        n = s[2],
                        o = s[3],
                        a = s[4],
                        h = s[5],
                        l = Math.sin(t),
                        u = Math.cos(t);
                    s[0] = i * u + n * l, s[1] = r * u + o * l, s[2] = i * -l + n * u, s[3] = r * -l + o * u, s[4] = a, s[5] = h
                }
                e.scaleX.isActive || e.scaleY.isActive ? (s[0] = s[0] * e.scaleX.current, s[1] = s[1] * e.scaleX.current, s[2] = s[2] * e.scaleY.current, s[3] = s[3] * e.scaleY.current) : (s[0] = s[0] * e.scale.current, s[1] = s[1] * e.scale.current, s[2] = s[2] * e.scale.current, s[3] = s[3] * e.scale.current), t.transform = "matrix(" + s[0] + ", " + s[1] + ", " + s[2] + ", " + s[3] + ", " + s[4] + ", " + s[5] + ")"
            }
        }
        handleEventDispatch() {
            if (0 !== this.keyframesRequiringDispatch.length) {
                for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                    let e = this.keyframesRequiringDispatch[t];
                    e.needsEventDispatch = !1, this.eventObject.keyframe = e, this.eventObject.pageMetrics = i.pageMetrics, this.eventObject.event = e.event, this.trigger(e.event, this.eventObject)
                }
                this.keyframesRequiringDispatch.length = 0
            }
            if (0 !== this._events.draw.length) {
                this.eventObject.keyframe = null, this.eventObject.event = "draw";
                for (let t = this._events.draw.length - 1; t >= 0; t--) this._events.draw[t](this.eventObject)
            }
        }
        updateAnimationConstraints() {
            for (let t = 0, e = this._activeKeyframes.length; t < e; t++) this._activeKeyframes[t].evaluateConstraints();
            this.attributes.forEach(t => {
                1 !== this.keyframes[t].length && this.keyframes[t].sort(i.KeyframeComparison)
            }), this.updateDeferredPropertyValues()
        }
        refreshMetrics() {
            let t = new Set([this.element]);
            this._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e))), this.group.metrics.refreshCollection(t), this.group.keyframesDirty = !0
        }
        getTargetComputedStyle(t = !1) {
            return this._ownerIsElement ? ((t || void 0 === this.group.computedStyleCache[this.uuid]) && (this.group.computedStyleCache[this.uuid] = getComputedStyle(this.element)), this.group.computedStyleCache[this.uuid]) : null
        }
        updateDeferredPropertyValues() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
                let e = this.attributes[t],
                    s = this.keyframes[e];
                if (!(s[0].keyframeType > i.KeyframeTypes.InterpolationForward))
                    for (let t = 0, i = s.length; t < i; t++) {
                        let r = s[t];
                        null === r.jsonProps[e][0] && (0 === t ? r.jsonProps[e][0] = r.animValues[e][0] = this.tweenProps[e].current : r.animValues[e][0] = s[t - 1].animValues[e][1]), null === r.jsonProps[e][1] && (r.animValues[e][1] = t === i - 1 ? this.tweenProps[e].current : s[t + 1].animValues[e][0]), r.snapAtCreation && (r.jsonProps[e][0] = r.animValues[e][0], r.jsonProps[e][1] = r.animValues[e][1])
                    }
            }
        }
        getBounds(t) {
            this.boundsMin = Number.MAX_VALUE, this.boundsMax = -Number.MAX_VALUE;
            for (let e = 0, s = this.attributes.length; e < s; e++) {
                let s = this.keyframes[this.attributes[e]];
                for (let e = 0; e < s.length; e++) {
                    let i = s[e];
                    this.boundsMin = Math.min(i.start, this.boundsMin), this.boundsMax = Math.max(i.end, this.boundsMax), t.min = Math.min(i.start, t.min), t.max = Math.max(i.end, t.max)
                }
            }
        }
        getNearestKeyframeForAttribute(t, e) {
            e = void 0 !== e ? e : this.group.position.local;
            let s = null,
                i = Number.POSITIVE_INFINITY,
                r = this.keyframes[t];
            if (void 0 === r) return null;
            let n = r.length;
            if (0 === n) return null;
            if (1 === n) return r[0];
            for (let t = 0; t < n; t++) {
                let n = r[t];
                if (n.isInRange(e)) {
                    s = n;
                    break
                }
                let o = Math.min(Math.abs(e - n.start), Math.abs(e - n.end));
                o < i && (i = o, s = n)
            }
            return s
        }
        getAllKeyframesForAttribute(t) {
            return this.keyframes[t]
        }
        updateKeyframe(t, e) {
            t.parseOptions(e), t.evaluateConstraints(), this.group.keyframesDirty = !0, p.update(() => {
                this.trigger(i.EVENTS.ON_KEYFRAME_UPDATED, t), this.group.trigger(i.EVENTS.ON_KEYFRAME_UPDATED, t)
            }, !0)
        }
        removeKeyframe(t) {
            return t.destroyed || t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0, this.group.keyframesDirty = !0, new Promise(e => {
                this.group.rafEmitter.executor.eventEmitter.once("before:draw", () => {
                    e(t), t.destroy();
                    let s = this._allKeyframes.indexOf(t); - 1 !== s && this._allKeyframes.splice(s, 1)
                })
            }))
        }
        updateAnimation(t, e) {
            return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(t, e)
        }
    }
}, function(t, e) {
    t.exports = class {
        constructor(t) {
            this.controller = t, this.element = this.controller.element, this.keyframe = null, this.event = "", this.tweenProps = this.controller.tweenProps
        }
    }
}, function(t, e, s) {
    "use strict";
    const i = s(0),
        r = s(7),
        n = s(24),
        o = s(11),
        a = function(t) {
            for (let e in t) {
                let s = t[e];
                if (-1 === i.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(s)) return !0
            }
            return !1
        };
    t.exports = function(t) {
        if (void 0 !== t.cssClass || void 0 !== t.style) {
            if (a(t)) throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
            return o
        }
        if (a(t)) return r;
        if (t.event) return n;
        throw delete t.anchors, "Could not determine tween type based on " + JSON.stringify(t)
    }
}, function(t, e, s) {
    "use strict";
    "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
    const i = 180 / Math.PI,
        r = t => Math.round(1e6 * t) / 1e6;

    function n(t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
    }

    function o(t, e) {
        return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
    }

    function a(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }

    function h(t, e, s, i) {
        return [t[0] * s + e[0] * i, t[1] * s + e[1] * i, t[2] * s + e[2] * i]
    }

    function l(t) {
        const e = new Float32Array(4),
            s = new Float32Array(3),
            l = new Float32Array(3),
            u = new Float32Array(3);
        u[0] = t[3][0], u[1] = t[3][1], u[2] = t[3][2];
        const c = new Array(3);
        for (let e = 0; e < 3; e++) c[e] = t[e].slice(0, 3);
        s[0] = n(c[0]), c[0] = o(c[0], s[0]), l[0] = a(c[0], c[1]), c[1] = h(c[1], c[0], 1, -l[0]), s[1] = n(c[1]), c[1] = o(c[1], s[1]), l[0] /= s[1], l[1] = a(c[0], c[2]), c[2] = h(c[2], c[0], 1, -l[1]), l[2] = a(c[1], c[2]), c[2] = h(c[2], c[1], 1, -l[2]), s[2] = n(c[2]), c[2] = o(c[2], s[2]), l[1] /= s[2], l[2] /= s[2];
        const m = (p = c[1], d = c[2], [p[1] * d[2] - p[2] * d[1], p[2] * d[0] - p[0] * d[2], p[0] * d[1] - p[1] * d[0]]);
        var p, d;
        if (a(c[0], m) < 0)
            for (let t = 0; t < 3; t++) s[t] *= -1, c[t][0] *= -1, c[t][1] *= -1, c[t][2] *= -1;
        let f;
        return e[0] = .5 * Math.sqrt(Math.max(1 + c[0][0] - c[1][1] - c[2][2], 0)), e[1] = .5 * Math.sqrt(Math.max(1 - c[0][0] + c[1][1] - c[2][2], 0)), e[2] = .5 * Math.sqrt(Math.max(1 - c[0][0] - c[1][1] + c[2][2], 0)), e[3] = .5 * Math.sqrt(Math.max(1 + c[0][0] + c[1][1] + c[2][2], 0)), c[2][1] > c[1][2] && (e[0] = -e[0]), c[0][2] > c[2][0] && (e[1] = -e[1]), c[1][0] > c[0][1] && (e[2] = -e[2]), f = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, r(180 * Math.atan2(c[0][1], c[0][0]) / Math.PI)] : function(t) {
            const [e, s, n, o] = t, a = e * e, h = s * s, l = n * n, u = e * s + n * o, c = o * o + a + h + l;
            return u > .49999 * c ? [0, 2 * Math.atan2(e, o) * i, 90] : u < -.49999 * c ? [0, -2 * Math.atan2(e, o) * i, -90] : [r(Math.atan2(2 * e * o - 2 * s * n, 1 - 2 * a - 2 * l) * i), r(Math.atan2(2 * s * o - 2 * e * n, 1 - 2 * h - 2 * l) * i), r(Math.asin(2 * e * s + 2 * n * o) * i)]
        }(e), {
            translation: u,
            rotation: f,
            eulerRotation: f,
            scale: [r(s[0]), r(s[1]), r(s[2])]
        }
    }
    t.exports = function(t) {
        t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
        let e = t instanceof DOMMatrix ? t : new DOMMatrix(t);
        const s = new Array(4);
        for (let t = 1; t < 5; t++) {
            const i = s[t - 1] = new Float32Array(4);
            for (let s = 1; s < 5; s++) i[s - 1] = e[`m${t}${s}`]
        }
        return l(s)
    }
}, function(t, e, s) {
    const i = s(28);
    t.exports = class extends i {
        set(t) {
            const e = `rgba(${Math.round(this.current[0])},${Math.round(this.current[1])},${Math.round(this.current[2])},${this.current[3]})`;
            t.setProperty(this.key, e)
        }
        unset(t) {
            t.removeProperty(this.key)
        }
    }
}, function(t, e, s) {
    const i = s(28),
        r = s(55);
    t.exports = class extends i {
        constructor(t, e, s, i, n, o, a) {
            super(r.parseExpression(null, t), e, s, i, n, o), this.applyToStyle = a, this.pathStrings = r.getPathStrings(t)
        }
        update(t, e, s) {
            if (t[0].length !== t[1].length) throw new Error("Path length mismatch. Start/end paths must must contain the same number of points. Start value: \r " + r.reconstructPath(t[0], this.pathStrings));
            return super.update(t, e, s)
        }
        set(t) {
            const e = r.reconstructPath(this.current, this.pathStrings);
            this.applyToStyle ? t.setProperty(this.key, e) : t.setAttribute("d", e)
        }
        unset(t) {
            if (this.applyToStyle) t.removeProperty(this.key);
            else {
                const e = r.reconstructPath(this.initialValue, this.pathStrings);
                t.setAttribute("d", e)
            }
        }
    }
}, function(t, e, s) {
    const {
        trim: i,
        getStringNumbers: r,
        getStringNonNumbers: n,
        reconstructStringWithNumbers: o
    } = s(56), a = /^\s*?M[(-?\d)|\s]/, h = /^(inset|circle|ellipse|polygon|path)\(/, l = t => a.test(t), u = t => h.test(t);
    t.exports = {
        install(t, e) {
            t.plugins.parser.includes(this) || t.plugins.parser.push(this)
        },
        parseExpression: (t, e) => "string" == typeof e && (l(e) || u(e)) ? r(e) : null,
        scalePath(t, e) {
            const s = this.parseExpression(null, t),
                i = n(t);
            for (let t = 0, i = s.length; t < i; t++) s[t] = s[t] * e;
            return this.reconstructPath(s, i)
        },
        trim: i,
        getPathStrings: n,
        getPathNumbers: r,
        reconstructPath: o
    }
}, function(t, e) {
    const s = /-?\d*\.?\d+/gm;
    t.exports = {
        getStringNumbers: t => t.match(s).map(t => Number.parseFloat(t)),
        getStringNonNumbers: t => t.split(s),
        reconstructStringWithNumbers(t, e) {
            let s = "";
            for (var i = 0, r = t.length; i < r; i++) s += e[i] + t[i];
            return s += e[r], s
        },
        trim: t => null === t ? t : t.replace(/\s+/gm, " ").trim()
    }
}, function(t, e) {
    t.exports = function() {
        var t = new Float32Array(16);
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
    }
}, function(t, e) {
    t.exports = function(t, e, s) {
        var i = Math.sin(s),
            r = Math.cos(s),
            n = e[4],
            o = e[5],
            a = e[6],
            h = e[7],
            l = e[8],
            u = e[9],
            c = e[10],
            m = e[11];
        e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
        return t[4] = n * r + l * i, t[5] = o * r + u * i, t[6] = a * r + c * i, t[7] = h * r + m * i, t[8] = l * r - n * i, t[9] = u * r - o * i, t[10] = c * r - a * i, t[11] = m * r - h * i, t
    }
}, function(t, e) {
    t.exports = function(t, e, s) {
        var i = Math.sin(s),
            r = Math.cos(s),
            n = e[0],
            o = e[1],
            a = e[2],
            h = e[3],
            l = e[8],
            u = e[9],
            c = e[10],
            m = e[11];
        e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
        return t[0] = n * r - l * i, t[1] = o * r - u * i, t[2] = a * r - c * i, t[3] = h * r - m * i, t[8] = n * i + l * r, t[9] = o * i + u * r, t[10] = a * i + c * r, t[11] = h * i + m * r, t
    }
}, function(t, e) {
    t.exports = function(t, e, s) {
        var i = Math.sin(s),
            r = Math.cos(s),
            n = e[0],
            o = e[1],
            a = e[2],
            h = e[3],
            l = e[4],
            u = e[5],
            c = e[6],
            m = e[7];
        e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
        return t[0] = n * r + l * i, t[1] = o * r + u * i, t[2] = a * r + c * i, t[3] = h * r + m * i, t[4] = l * r - n * i, t[5] = u * r - o * i, t[6] = c * r - a * i, t[7] = m * r - h * i, t
    }
}, function(t, e) {
    t.exports = function(t, e, s) {
        var i = s[0],
            r = s[1],
            n = s[2];
        return t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t[3] = e[3] * i, t[4] = e[4] * r, t[5] = e[5] * r, t[6] = e[6] * r, t[7] = e[7] * r, t[8] = e[8] * n, t[9] = e[9] * n, t[10] = e[10] * n, t[11] = e[11] * n, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
    }
}, function(t, e, s) {
    "use strict";
    const i = s(12),
        r = s(29),
        n = s(2);
    let o = 0;
    const a = {};
    "undefined" != typeof window && (a.create = s(3));
    class h extends i {
        constructor(t, e) {
            t || ((t = document.createElement("div")).className = "TimeGroup-" + o++), super(t, e), this.name = this.name || t.getAttribute("data-anim-time-group"), this._isPaused = !0, this._repeats = 0, this._isReversed = !1, this._timeScale = 1, this._chapterPlayer = new r(this), this.now = performance.now()
        }
        finalizeInit() {
            if (!this.anim) throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
            this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this), super.finalizeInit()
        }
        progress(t) {
            if (void 0 === t) return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
            let e = t * this.boundsMax;
            this.timelineUpdateRequired = !0, this.updateTimeline(e)
        }
        time(t) {
            if (void 0 === t) return this.position.local;
            t = n.clamp(t, this.boundsMin, this.duration), this.timelineUpdateRequired = !0, this.updateTimeline(t)
        }
        play(t) {
            this.reversed(!1), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
        }
        reverse(t) {
            this.reversed(!0), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
        }
        reversed(t) {
            if (void 0 === t) return this._isReversed;
            this._isReversed = t
        }
        restart() {
            this._isReversed ? (this.progress(1), this.reverse(this.time())) : (this.progress(0), this.play(this.time()))
        }
        pause(t) {
            this.time(t), this._isPaused = !0
        }
        paused(t) {
            return void 0 === t ? this._isPaused : (this._isPaused = t, this._isPaused || this.play(), this)
        }
        onPlayTimeUpdate() {
            if (this._isPaused) return;
            let t = performance.now(),
                e = (t - this.now) / 1e3;
            this.now = t, this._isReversed && (e = -e);
            let s = this.time() + e * this._timeScale;
            if (this._repeats === h.REPEAT_FOREVER || this._repeats > 0) {
                let t = !1;
                !this._isReversed && s > this.boundsMax ? (s -= this.boundsMax, t = !0) : this._isReversed && s < 0 && (s = this.boundsMax + s, t = !0), t && (this._repeats = this._repeats === h.REPEAT_FOREVER ? h.REPEAT_FOREVER : this._repeats - 1)
            }
            this.time(s);
            let i = !this._isReversed && this.position.local !== this.duration,
                r = this._isReversed && 0 !== this.position.local;
            i || r ? this._playheadEmitter.run() : this.paused(!0)
        }
        updateProgress(t) {
            this.hasDuration() ? (this.position.localUnclamped = t, this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
        }
        updateBounds() {
            if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
            let t = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            for (let e = 0, s = this.keyframeControllers.length; e < s; e++) this.keyframeControllers[e].getBounds(t);
            this.boundsMin = 0, this.boundsMax = t.max, this.viewableRange.a = this.viewableRange.b = 0, this.viewableRange.c = this.viewableRange.d = this.boundsMax, this.timelineUpdateRequired = !0
        }
        setupRAFEmitter(t) {
            this._playheadEmitter = new a.create, this._playheadEmitter.on("update", this.onPlayTimeUpdate), super.setupRAFEmitter(t)
        }
        get duration() {
            return this.keyframesDirty && this.onKeyframesDirty({
                silent: !0
            }), this.boundsMax
        }
        timeScale(t) {
            return void 0 === t ? this._timeScale : (this._timeScale = t, this)
        }
        repeats(t) {
            if (void 0 === t) return this._repeats;
            this._repeats = t
        }
        getPosition() {
            return this.position.local
        }
        addChapter(t) {
            return this._chapterPlayer.addChapter(t)
        }
        playToChapter(t) {
            return this._chapterPlayer.playToChapter(t)
        }
        convertScrollPositionToTValue(t) {
            return t
        }
        convertTValueToScrollPosition(t) {
            return t
        }
        hasDuration() {
            return this.duration > 0
        }
        destroy() {
            this._chapterPlayer.destroy(), this._playheadEmitter.destroy(), this._playheadEmitter = null, super.destroy()
        }
        get timelineProgress() {
            return this.progress()
        }
        set timelineProgress(t) {
            this.progress(t)
        }
        get progressValue() {
            return this.progress()
        }
        set progressValue(t) {
            this.progress(t)
        }
        get timeValue() {
            return this.time()
        }
        set timeValue(t) {
            this.time(t)
        }
    }
    h.REPEAT_FOREVER = -1, t.exports = h
}, function(t, e, s) {
    const i = s(12),
        r = (s(29), s(2));
    let n = 0;
    const o = {};
    "undefined" != typeof window && (o.create = s(3));
    t.exports = class extends i {
        constructor(t, e) {
            t || ((t = document.createElement("div")).className = "TweenGroup-" + n++), super(t, e), this.name = "Tweens", this.keyframes = [], this._isPaused = !1, this.now = performance.now()
        }
        finalizeInit() {
            this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this), this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this), super.finalizeInit()
        }
        destroy() {
            this._timeEmitter.destroy(), this._timeEmitter = null, this._keyframes = [], super.destroy()
        }
        setupRAFEmitter(t) {
            this.now = performance.now(), this._timeEmitter = new o.create, this._timeEmitter.on("update", this.onTimeEmitterUpdate), this._timeEmitter.run(), super.setupRAFEmitter(t)
        }
        addKeyframe(t, e) {
            if (void 0 !== e.start || void 0 !== e.end) throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
            if ("number" != typeof e.duration) throw Error("Tween options.duration is undefined, or is not a number");
            let s, i;
            e.start = (e.delay || 0) + this.position.localUnclamped, e.end = e.start + e.duration, e.preserveState = !0, e.snapAtCreation = !0, t._animInfo && (s = t._animInfo.group, i = t._animInfo.controller);
            let r = super.addKeyframe(t, e);
            return t._animInfo.group = s, t._animInfo.controller = i, [
                ["onStart", "once"],
                ["onDraw", "on"]
            ].forEach(([t, s]) => {
                if (!e[t]) return;
                let i = e[t];
                e[t] = r.controller[s]("draw", t => {
                    r.markedForRemoval || (t.keyframe = r, i(t), t.keyframe = null)
                })
            }), this.removeOverlappingProps(r), this.keyframes.push(r), this._timeEmitter.willRun() || (this.now = performance.now(), this._timeEmitter.run()), r
        }
        removeOverlappingProps(t) {
            if (t.controller._allKeyframes.length <= 1) return;
            let e = Object.keys(t.animValues),
                s = t.controller;
            for (let i = 0, r = s._allKeyframes.length; i < r; i++) {
                const r = s._allKeyframes[i];
                if (r === t) continue;
                if (r.markedForRemoval) continue;
                let n = Object.keys(r.animValues),
                    o = n.filter(t => e.includes(t));
                o.length !== n.length ? o.forEach(t => delete r.animValues[t]) : (r.markedForRemoval = !0, r.jsonProps.onDraw && r.controller.off("draw", r.jsonProps.onDraw))
            }
        }
        onTimeEmitterUpdate(t) {
            if (this._isPaused || 0 === this.keyframeControllers.length) return;
            let e = performance.now(),
                s = (e - this.now) / 1e3;
            this.now = e;
            let i = this.position.local + s;
            this.position.local = this.position.localUnclamped = i, this.onTimeUpdate()
        }
        onTimeUpdate() {
            for (let t = 0, e = this.keyframes.length; t < e; t++) this.keyframes[t].markedForRemoval || this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
            this.requestDOMChange(), this._timeEmitter.run(), null !== this.gui && this.gui.onScrollUpdate(this.position)
        }
        onDOMRead() {
            if (this.keyframesDirty && this.onKeyframesDirty(), 0 !== this.keyframes.length)
                for (let t = 0, e = this.keyframes.length; t < e; t++) {
                    this.keyframes[t].controller.needsWrite = !0;
                    for (let e in this.keyframes[t].animValues) this.keyframes[t].onDOMRead(e)
                }
        }
        onDOMWrite() {
            super.onDOMWrite(), this.removeExpiredKeyframes()
        }
        removeExpiredKeyframes() {
            let t = this.keyframes.length,
                e = t;
            for (; t--;) {
                let e = this.keyframes[t];
                e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e, e.jsonProps.onComplete(e.controller.eventObject), e.jsonProps.onComplete = null), null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(), this.keyframes.splice(t, 1)), e.jsonProps.onStart && e.controller.off("draw", e.jsonProps.onStart), e.jsonProps.onDraw && e.controller.off("draw", e.jsonProps.onDraw)), 1 === e.localT && (e.markedForRemoval = !0))
            }
            this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
        }
        removeExpiredKeyframeControllers() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
                let e = !0,
                    s = this.keyframeControllers[t];
                for (let t = 0, i = s._allKeyframes.length; t < i; t++)
                    if (!s._allKeyframes[t].destroyed) {
                        e = !1;
                        break
                    } e && s.remove()
            }
        }
        updateBounds() {
            this.boundsMin = Math.min(...this.keyframes.map(t => t.start)), this.boundsMax = Math.max(...this.keyframes.map(t => t.end))
        }
        play() {
            this.isEnabled = !0, this._isPaused = !1, this.now = performance.now(), this._timeEmitter.run()
        }
        pause() {
            this._isPaused = !0
        }
        paused() {
            return this._isPaused
        }
        time(t) {
            if (void 0 === t) return this.position.local;
            this.position.local = this.position.localUnclamped = r.clamp(t, this.boundsMin, this.boundsMax), this.onTimeUpdate()
        }
        performTimelineDispatch() {}
        hasDuration() {
            return !0
        }
        getPosition() {
            return this.position.local
        }
        updateProgress(t) {}
        get duration() {
            return this.boundsMax
        }
    }
}, function(t, e) {
    t.exports = {
        version: "3.8.0",
        major: "3.x",
        majorMinor: "3.8"
    }
}, function(t, e, s) {
    "use strict";
    var i = s(5);
    t.exports = i.cancelAnimationFrame("update")
}, function(t, e, s) {
    const i = s(15);
    t.exports = class extends i {
        constructor(t) {
            super(t), this.PAUSED_EXT_CLASS = "fam-gallery-ext-paused", this.gallery = this.el, this.marquee = this.gallery.querySelector(".fam-gallery-marquee"), this.isReducedMotion = document.documentElement.classList.contains("reduced-motion"), this.scrollGroup = this.gallery._animInfo.group, this.timeGroup = this.marquee._animInfo.group, this.marqueeKeyframe = null, this.observers = []
        }
        mounted() {
            this._cloneItems(), this._startMarquee(), this._scrollPlayback(), this._listenForTabChange(), this._setupObservers()
        }
        _cloneItems() {
            this.marquee.querySelectorAll(".fam-gallery-item").forEach(t => {
                const e = t.cloneNode(!0);
                e.classList.add("fgi-clone"), this.marquee.appendChild(e)
            })
        }
        _startMarquee() {
            const t = (this.marquee.scrollWidth + this._getCSSVarNum(this.gallery, "--fam-item-margin")) / 2;
            this.marqueeKeyframe = this.addRAFLoop({
                el: this.marquee,
                start: 0,
                end: this._getAnimEnd(t),
                x: [0, t + " * -1"]
            }), this.timeGroup.repeats(-1), this.marquee.addEventListener("mouseenter", () => {
                this.timeGroup.timeScale(.3)
            }), this.marquee.addEventListener("mouseleave", () => {
                this.timeGroup.timeScale(1)
            })
        }
        _scrollPlayback() {
            let t = !1;
            const e = this.scrollGroup.addKeyframe(this.gallery, {
                start: "t - 100vh",
                end: "b",
                event: "famGalleryVisible"
            });
            e.controller.on("famGalleryVisible:enter", e => {
                if (this.gallery.classList.contains(this.PAUSED_EXT_CLASS) || (this.timeGroup.play(), this.marquee.style.willChange = "transform", this._startObserving()), !t) {
                    this.gallery.querySelectorAll("[data-fam-lazy-image]").forEach(t => t.removeAttribute("data-fam-lazy-image")), t = !0
                }
            }), e.controller.on("famGalleryVisible:exit", t => {
                this.timeGroup.pause(), this.marquee.style.willChange = "", this._stopObserving()
            })
        }
        _getAnimEnd(t) {
            return `${t} * ${1 / 60} * 1`
        }
        _getCSSVarNum(t, e) {
            return Number(getComputedStyle(t).getPropertyValue(e).replace("px", ""))
        }
        _listenForTabChange() {
            document.addEventListener("visibilitychange", () => {
                document.hidden || this.gallery.classList.contains(this.PAUSED_EXT_CLASS) || this.isReducedMotion || (this.timeGroup.play(), this.marquee.style.willChange = "transform")
            })
        }
        _debounce(t, e) {
            let s;
            return function(...i) {
                clearTimeout(s), s = setTimeout(() => {
                    t.apply(this, i)
                }, e)
            }
        }
        _setupObservers() {
            const t = {
                root: this.gallery,
                rootMargin: "0px",
                threshold: .9
            };
            Array.from(this.marquee.querySelectorAll(".fam-gallery-link")).map(e => {
                const s = this._debounce(t => {
                        t.forEach(t => {
                            t.isIntersecting ? (e.removeAttribute("aria-hidden"), e.removeAttribute("tabindex")) : (e.setAttribute("aria-hidden", !0), e.setAttribute("tabindex", "-1"))
                        })
                    }, 200),
                    i = new IntersectionObserver(s, t);
                this.observers.push({
                    observer: i,
                    link: e
                })
            })
        }
        _startObserving() {
            this.observers.forEach(t => {
                t.observer.observe(t.link)
            })
        }
        _stopObserving() {
            this.observers.forEach(t => {
                t.observer.disconnect()
            })
        }
        onBreakpointChange(t) {
            const e = (this.marquee.scrollWidth + this._getCSSVarNum(this.gallery, "--fam-item-margin")) / 2;
            this.marqueeKeyframe.overwriteProps({
                end: this._getAnimEnd(e),
                x: [0, e + " * -1"]
            })
        }
    }
}]);