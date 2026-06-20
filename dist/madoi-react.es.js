import { useRef as l, useState as g, useEffect as S } from "react";
function O(e) {
  return (t, n, o) => {
    t[n].madoiMethodConfig_ = {
      ...t[n].madoiMethodConfig_ ? t[n].madoiMethodConfig_ : {},
      ...e
    };
  };
}
function P(e) {
  return (t) => {
    t.madoiClassConfig_ = { className: e };
  };
}
const w = {
  serialized: !0
};
function M(e = w) {
  return O({ distributed: e });
}
function C() {
  return O({ changeState: {} });
}
const R = {
  maxInterval: 5e3,
  minInterval: 3e3
};
function v(e = R) {
  return O({ getState: e });
}
function E() {
  return O({ setState: {} });
}
var L = Object.defineProperty, N = Object.getOwnPropertyDescriptor, m = (e, t, n, o) => {
  for (var i = o > 1 ? void 0 : o ? N(t, n) : t, d = e.length - 1, r; d >= 0; d--)
    (r = e[d]) && (i = (o ? r(t, n, i) : r(i)) || i);
  return o && i && L(t, n, i), i;
};
function D() {
  return (e, t, n) => {
    e[t].madoiReactSuppressRender_ = {};
  };
}
function _(e) {
  return typeof e == "function" ? e() : e;
}
function U(e, t) {
  return typeof t == "function" ? t(e) : t;
}
let p = class {
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
m([
  M(),
  C()
], p.prototype, "updateState", 1);
m([
  E()
], p.prototype, "setState", 1);
m([
  v()
], p.prototype, "getState", 1);
p = m([
  P("MadoiReactInnerState")
], p);
function I(e, t) {
  const n = l(null), o = l(null), [i, d] = g();
  return n.current === null && (n.current = _(t)), S(() => {
    if (o.current !== null) return;
    const r = new p(n.current);
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
            f.apply(r, arguments), d(c.apply(r));
          };
          s.madoiMethodConfig_ = u, r[a] = s;
        } else if (u.setState) {
          const f = r[a], s = function() {
            f.apply(r, arguments), d(c.apply(r));
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
        U(o.current?.getState(), r)
      );
    }
  ];
}
function V(e, t, n = !0) {
  const o = l(null), i = l(!1), [d, r] = g();
  return o.current === null && (o.current = _(t)), S(() => {
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
          let b = { changed: !f };
          h.apply(c, [...arguments, b]), n && b.changed && (console.debug("[madoi-react] fire render for", c, h.name, f), r(a ? a.apply(c) : new Object()));
        };
        y.madoiMethodConfig_ = s, c[u] = y;
      }
    }
    e.register(c), i.current = !0;
  }, []), o.current;
}
function q(e) {
  const [t, n] = g(new Object()), o = ({ detail: { peerId: i } }) => {
    i === e.getSelfPeer().id && n(new Object());
  };
  return S(() => j(e, { peerProfileUpdated: o })), e.getSelfPeer();
}
function A(e) {
  const [t, n] = g(new Object()), o = () => n(new Object()), i = () => n(new Object()), d = ({ detail: { peerId: r } }) => {
    r !== e.getSelfPeer().id && n(new Object());
  };
  return S(() => j(e, { peerEntered: o, peerLeaved: i, peerProfileUpdated: d })), e.getOtherPeers();
}
function j(e, t) {
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
  D as SuppressRender,
  $ as bundleCleanups,
  j as eventListnersEffect,
  V as useMadoiModel,
  A as useOtherPeers,
  q as useSelfPeer,
  I as useSharedState
};
