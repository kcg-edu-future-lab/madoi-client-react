import { useState as g, useRef as p, useEffect as S } from "react";
function m(e) {
  return (t, n, o) => {
    t[n].madoiMethodConfig_ = {
      ...t[n].madoiMethodConfig_ ? t[n].madoiMethodConfig_ : {},
      ...e
    };
  };
}
function j(e) {
  return (t) => {
    t.madoiClassConfig_ = { className: e };
  };
}
const w = {
  serialized: !0
};
function M(e = w) {
  return m({ distributed: e });
}
function R() {
  return m({ changeState: {} });
}
const C = {
  maxInterval: 5e3,
  minInterval: 3e3
};
function v(e = C) {
  return m({ getState: e });
}
function E() {
  return m({ setState: {} });
}
var L = Object.defineProperty, N = Object.getOwnPropertyDescriptor, O = (e, t, n, o) => {
  for (var s = o > 1 ? void 0 : o ? N(t, n) : t, d = e.length - 1, r; d >= 0; d--)
    (r = e[d]) && (s = (o ? r(t, n, s) : r(s)) || s);
  return o && s && L(t, n, s), s;
};
function A() {
  return (e, t, n) => {
    e[t].madoiReactSuppressRender_ = {};
  };
}
function b(e) {
  return typeof e == "function" ? e() : e;
}
function U(e, t) {
  return typeof t == "function" ? t(e) : t;
}
let l = class {
  state;
  constructor(e) {
    this.state = e;
  }
  updateState(e) {
    this.state = e;
  }
  setState(e) {
    this.state = e;
  }
  getState() {
    return this.state;
  }
};
O([
  M(),
  R()
], l.prototype, "updateState", 1);
O([
  E()
], l.prototype, "setState", 1);
O([
  v()
], l.prototype, "getState", 1);
l = O([
  j("MadoiReactInnerState")
], l);
function D(e, t) {
  const n = p(null), o = p(null), [s, d] = g();
  return n.current === null && (n.current = b(t)), S(() => {
    if (o.current !== null) return;
    const r = new l(n.current);
    o.current = r;
    let u = null;
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(r))) {
      const c = r[a].madoiMethodConfig_;
      c && c.getState && (u = r[a]);
    }
    if (u == null)
      throw new Error(`${typeof r} must declare @GetState method.`);
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(r))) {
      const c = r[a].madoiMethodConfig_;
      if (c) {
        if (c.changeState) {
          const f = r[a], i = function() {
            f.apply(r, arguments), d(u.apply(r));
          };
          i.madoiMethodConfig_ = c, r[a] = i;
        } else if (c.setState) {
          const f = r[a], i = function() {
            f.apply(r, arguments), d(u.apply(r));
          };
          i.madoiMethodConfig_ = c, r[a] = i;
        }
      }
    }
    e.register(r);
  }, []), [
    o.current?.getState() || n.current,
    (r) => {
      o.current?.updateState(
        U(o.current?.getState(), r)
      );
    }
  ];
}
function I(e, t, n = !0) {
  const o = p(null), s = p(!1), [d, r] = g();
  return o.current === null && (o.current = b(t)), S(() => {
    if (s.current) return;
    const u = o.current;
    let a = null;
    for (let c of Object.getOwnPropertyNames(Object.getPrototypeOf(u))) {
      const f = u[c].madoiMethodConfig_;
      f && f.getState && (a = u[c]);
    }
    for (let c of Object.getOwnPropertyNames(Object.getPrototypeOf(u))) {
      let f = u[c].madoiReactSuppressRender_;
      typeof f > "u" && (f = !1);
      const i = u[c].madoiMethodConfig_;
      if (i && (i.distributed || i.changeState || i.setState || i.enterRoomAllowed || i.leaveRoomDone || i.peerEntered || i.peerProfileUpdated || i.peerLeaved)) {
        const h = u[c], y = function() {
          let _ = { changed: !f };
          h.apply(u, [...arguments, _]), n && _.changed && (console.debug("[madoi-react] fire render for", u, h.name, f), r(a ? a.apply(u) : new Object()));
        };
        y.madoiMethodConfig_ = i, u[c] = y;
      }
    }
    e.register(u), s.current = !0;
  }, []), o.current;
}
function V(e) {
  const [t, n] = g(new Object()), o = ({ detail: { peerId: s } }) => {
    s === e.getSelfPeer().id && n(new Object());
  };
  return S(() => P(e, { peerProfileUpdated: o }), []), e.getSelfPeer();
}
function k() {
  const [e, t] = g(new Object());
  return () => t(new Object());
}
function q(e) {
  const t = k(), n = ({ detail: { peerId: o } }) => {
    o !== e.getSelfPeer().id && t();
  };
  return S(() => P(e, {
    enterRoomAllowed: t,
    peerEntered: t,
    peerLeaved: t,
    peerProfileUpdated: n
  }), []), e.getOtherPeers();
}
function P(e, t) {
  for (const n of Object.keys(t))
    e.addEventListener(n, t[n]);
  return () => {
    for (const n of Object.keys(t))
      e.removeEventListener(n, t[n]);
  };
}
function $(...e) {
  return () => e.forEach((t) => t());
}
export {
  A as SuppressRender,
  $ as bundleCleanups,
  P as eventListnersEffect,
  k as useKickRender,
  I as useMadoiModel,
  q as useOtherPeers,
  V as useSelfPeer,
  D as useSharedState
};
