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
  for (var i = o > 1 ? void 0 : o ? N(t, n) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (i = (o ? r(t, n, i) : r(i)) || i);
  return o && i && L(t, n, i), i;
};
function x() {
  return (e, t, n) => {
    e[t].madoiReactSuppressRender_ = {};
  };
}
function b(e) {
  return typeof e == "function" ? e() : e;
}
function A(e, t) {
  return typeof t == "function" ? t(e) : t;
}
let d = class {
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
], d.prototype, "updateState", 1);
O([
  E()
], d.prototype, "setState", 1);
O([
  v()
], d.prototype, "getState", 1);
d = O([
  j("MadoiReactInnerState")
], d);
function D(e, t) {
  const n = p(null), o = p(null), [i, l] = g();
  return n.current === null && (n.current = b(t)), S(() => {
    if (o.current !== null) return;
    const r = new d(n.current);
    o.current = r;
    let c = null;
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(r))) {
      const u = r[a].madoiMethodConfig_;
      u && u.getState && (c = r[a]);
    }
    if (c == null)
      throw new Error(`${typeof r} must declare @GetState method.`);
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(r))) {
      const u = r[a].madoiMethodConfig_;
      if (u) {
        if (u.changeState) {
          const f = r[a], s = function() {
            f.apply(r, arguments), l(c.apply(r));
          };
          s.madoiMethodConfig_ = u, r[a] = s;
        } else if (u.setState) {
          const f = r[a], s = function() {
            f.apply(r, arguments), l(c.apply(r));
          };
          s.madoiMethodConfig_ = u, r[a] = s;
        }
      }
    }
    e.register(r);
  }, []), [
    o.current?.getState() || n.current,
    (r) => {
      o.current?.updateState(
        A(o.current?.getState(), r)
      );
    }
  ];
}
function I(e, t, n = !0) {
  const o = p(null), i = p(!1), [l, r] = g();
  return o.current === null && (o.current = b(t)), S(() => {
    if (i.current) return;
    const c = o.current;
    let a = null;
    for (let u of Object.getOwnPropertyNames(Object.getPrototypeOf(c))) {
      const f = c[u].madoiMethodConfig_;
      f && f.getState && (a = c[u]);
    }
    for (let u of Object.getOwnPropertyNames(Object.getPrototypeOf(c))) {
      let f = c[u].madoiReactSuppressRender_;
      typeof f > "u" && (f = !1);
      const s = c[u].madoiMethodConfig_;
      if (s && (s.distributed || s.changeState || s.setState || s.enterRoomAllowed || s.leaveRoomDone || s.peerEntered || s.peerProfileUpdated || s.peerLeaved)) {
        const h = c[u], y = function() {
          let _ = { changed: !f };
          h.apply(c, [...arguments, _]), n && _.changed && (console.debug("[madoi-react] fire render for", c, h.name, f), r(a ? a.apply(c) : new Object()));
        };
        y.madoiMethodConfig_ = s, c[u] = y;
      }
    }
    e.register(c), i.current = !0;
  }, []), o.current;
}
function V(e) {
  const [t, n] = g(new Object()), o = ({ detail: { peerId: i } }) => {
    i === e.getSelfPeer().id && n(new Object());
  };
  return S(() => P(e, { peerProfileUpdated: o })), e.getSelfPeer();
}
function U() {
  const [e, t] = g(new Object());
  return () => t(new Object());
}
function q(e) {
  const t = U(), n = ({ detail: { peerId: o } }) => {
    o !== e.getSelfPeer().id && t();
  };
  return console.log("useOtherPeers"), S(() => P(
    e,
    { enterRoomAllowed: () => {
      console.log("enterRoomAllowed"), t();
    }, peerEntered: t, peerLeaved: t, peerProfileUpdated: n }
  )), e.getOtherPeers();
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
  x as SuppressRender,
  $ as bundleCleanups,
  P as eventListnersEffect,
  U as useKickRender,
  I as useMadoiModel,
  q as useOtherPeers,
  V as useSelfPeer,
  D as useSharedState
};
