import { useRef as l, useState as O, useEffect as _ } from "react";
function g(t) {
  return (e, r, a) => {
    e[r].madoiMethodConfig_ = {
      ...e[r].madoiMethodConfig_ ? e[r].madoiMethodConfig_ : {},
      ...t
    };
  };
}
function M(t) {
  return (e) => {
    e.madoiClassConfig_ = { className: t };
  };
}
const j = {
  serialized: !0
};
function C(t = j) {
  return g({ distributed: t });
}
function P() {
  return g({ changeState: {} });
}
const w = {
  maxInterval: 5e3,
  minInterval: 3e3
};
function R(t = w) {
  return g({ getState: t });
}
function v() {
  return g({ setState: {} });
}
var E = Object.defineProperty, N = Object.getOwnPropertyDescriptor, m = (t, e, r, a) => {
  for (var s = a > 1 ? void 0 : a ? N(e, r) : e, p = t.length - 1, n; p >= 0; p--)
    (n = t[p]) && (s = (a ? n(e, r, s) : n(s)) || s);
  return a && s && E(e, r, s), s;
};
function D() {
  return (t, e, r) => {
    t[e].madoiReactSuppressRender_ = {};
  };
}
function b(t) {
  return typeof t == "function" ? t() : t;
}
function x(t, e) {
  return typeof e == "function" ? e(t) : e;
}
let d = class {
  state;
  constructor(t) {
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
m([
  C(),
  P()
], d.prototype, "updateState", 1);
m([
  v()
], d.prototype, "setState", 1);
m([
  R()
], d.prototype, "getState", 1);
d = m([
  M("MadoiReactInnerState")
], d);
function I(t, e) {
  const r = l(null), a = l(null), [s, p] = O();
  return r.current === null && (r.current = b(e)), _(() => {
    if (a.current !== null) return;
    const n = new d(r.current);
    a.current = n;
    let o = null;
    for (let i of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      const c = n[i].madoiMethodConfig_;
      c && c.getState && (o = n[i]);
    }
    if (o == null)
      throw new Error(`${typeof n} must declare @GetState method.`);
    for (let i of Object.getOwnPropertyNames(Object.getPrototypeOf(n))) {
      const c = n[i].madoiMethodConfig_;
      if (c) {
        if (c.changeState) {
          const f = n[i], u = function() {
            f.apply(n, arguments), p(o.apply(n));
          };
          u.madoiMethodConfig_ = c, n[i] = u;
        } else if (c.setState) {
          const f = n[i], u = function() {
            f.apply(n, arguments), p(o.apply(n));
          };
          u.madoiMethodConfig_ = c, n[i] = u;
        }
      }
    }
    t.register(n);
  }, []), [
    a.current?.getState() || r.current,
    (n) => {
      a.current?.updateState(
        x(a.current?.getState(), n)
      );
    }
  ];
}
function V(t, e, r = !0) {
  const a = l(null), s = l(!1), [p, n] = O();
  return a.current === null && (a.current = b(e)), _(() => {
    if (s.current) return;
    const o = a.current;
    let i = null;
    for (let c of Object.getOwnPropertyNames(Object.getPrototypeOf(o))) {
      const f = o[c].madoiMethodConfig_;
      f && f.getState && (i = o[c]);
    }
    for (let c of Object.getOwnPropertyNames(Object.getPrototypeOf(o))) {
      let f = o[c].madoiReactSuppressRender_;
      typeof f > "u" && (f = !1);
      const u = o[c].madoiMethodConfig_;
      if (u && (u.distributed || u.changeState || u.setState || u.enterRoomAllowed || u.leaveRoomDone || u.peerEntered || u.peerProfileUpdated || u.peerLeaved)) {
        const S = o[c], h = function() {
          let y = { changed: !f };
          S.apply(o, [...arguments, y]), r && y.changed && (console.debug("[madoi-react] fire render for", o, S.name, f), n(i ? i.apply(o) : new Object()));
        };
        h.madoiMethodConfig_ = u, o[c] = h;
      }
    }
    t.register(o), s.current = !0;
  }, []), a.current;
}
function A(t, e) {
  for (const r of Object.keys(e))
    t.addEventListener(r, e[r]);
  return () => {
    for (const r of Object.keys(e))
      t.removeEventListener(r, e[r]);
  };
}
function z(...t) {
  return () => t.forEach((e) => e());
}
export {
  D as SuppressRender,
  z as bundleCleanups,
  A as eventListnersEffect,
  V as useMadoiModel,
  I as useSharedState
};
