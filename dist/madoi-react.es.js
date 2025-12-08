var j = Object.defineProperty;
var C = (t, e, r) => e in t ? j(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var O = (t, e, r) => C(t, typeof e != "symbol" ? e + "" : e, r);
import { useRef as g, useState as _, useEffect as b } from "react";
function m(t) {
  return (e, r, a) => {
    e[r].madoiMethodConfig_ = {
      ...e[r].madoiMethodConfig_ ? e[r].madoiMethodConfig_ : {},
      ...t
    };
  };
}
function P(t) {
  return (e) => {
    e.madoiClassConfig_ = { className: t };
  };
}
const w = {
  serialized: !0
};
function R(t = w) {
  return m({ distributed: t });
}
function v() {
  return m({ changeState: {} });
}
const E = {
  maxInterval: 5e3,
  minInterval: 3e3
};
function N(t = E) {
  return m({ getState: t });
}
function x() {
  return m({ setState: {} });
}
var L = Object.defineProperty, D = Object.getOwnPropertyDescriptor, S = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? D(e, r) : e, d = t.length - 1, f; d >= 0; d--)
    (f = t[d]) && (i = (a ? f(e, r, i) : f(i)) || i);
  return a && i && L(e, r, i), i;
};
function z() {
  return (t, e, r) => {
    t[e].madoiReactSuppressRender_ = {};
  };
}
function M(t) {
  return typeof t == "function" ? t() : t;
}
function I(t, e) {
  return typeof e == "function" ? e(t) : e;
}
let l = class {
  constructor(t) {
    O(this, "state");
    this.state = t;
  }
  updateState(t) {
    this.state = t;
  }
  setState(t) {
    this.state = t;
  }
  getState() {
    return this.state;
  }
};
S([
  R(),
  v()
], l.prototype, "updateState", 1);
S([
  x()
], l.prototype, "setState", 1);
S([
  N()
], l.prototype, "getState", 1);
l = S([
  P("MadoiReactInnerState")
], l);
function F(t, e) {
  var f;
  const r = g(null), a = g(null), [i, d] = _();
  return r.current === null && (r.current = M(e)), b(() => {
    if (a.current !== null) return;
    const n = new l(r.current);
    a.current = n;
    let s = null;
    for (let o of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      const c = n[o].madoiMethodConfig_;
      c && c.getState && (s = n[o]);
    }
    if (s == null)
      throw new Error(`${typeof n} must declare @GetState method.`);
    for (let o of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      const c = n[o].madoiMethodConfig_;
      if (c) {
        if (c.changeState) {
          const u = n[o], p = function() {
            u.apply(n, arguments), d(s.apply(n));
          };
          p.madoiMethodConfig_ = c, n[o] = p;
        } else if (c.setState) {
          const u = n[o], p = function() {
            u.apply(n, arguments), d(s.apply(n));
          };
          p.madoiMethodConfig_ = c, n[o] = p;
        }
      }
    }
    t.register(n);
  }, []), [
    ((f = a.current) == null ? void 0 : f.getState()) || r.current,
    (n) => {
      var s, o;
      (o = a.current) == null || o.updateState(
        I((s = a.current) == null ? void 0 : s.getState(), n)
      );
    }
  ];
}
function G(t, e, r = !0) {
  const a = g(null), i = g(!1), [d, f] = _();
  return a.current === null && (a.current = M(e)), b(() => {
    if (i.current) return;
    const n = a.current;
    let s = null;
    for (let o of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      const c = n[o].madoiMethodConfig_;
      c && c.getState && (s = n[o]);
    }
    for (let o of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      let c = n[o].madoiReactSuppressRender_;
      typeof c > "u" && (c = !1);
      const u = n[o].madoiMethodConfig_;
      if (u && (u.distributed || u.changeState || u.setState || u.enterRoomAllowed || u.leaveRoomDone || u.peerEntered || u.peerProfileUpdated || u.peerLeaved)) {
        const p = n[o], h = function() {
          let y = { changed: !c };
          p.apply(n, [...arguments, y]), r && y.changed && (console.debug("[madoi-react] fire render for", n, p.name, c), f(s ? s.apply(n) : new Object()));
        };
        h.madoiMethodConfig_ = u, n[o] = h;
      }
    }
    t.register(n), i.current = !0;
  }, []), a.current;
}
function H(t, e) {
  for (const r of Object.keys(e))
    t.addEventListener(r, e[r]);
  return () => {
    for (const r of Object.keys(e))
      t.removeEventListener(r, e[r]);
  };
}
function J(...t) {
  return () => t.forEach((e) => e());
}
export {
  z as SuppressRender,
  J as bundleCleanups,
  H as eventListnersEffect,
  G as useMadoiModel,
  F as useSharedState
};
