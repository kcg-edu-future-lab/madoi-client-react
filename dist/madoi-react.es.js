var K = Object.create;
var E = Object.defineProperty;
var Q = Object.getOwnPropertyDescriptor;
var V = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), y = (e) => {
  throw TypeError(e);
};
var q = (e, t, n) => t in e ? E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var U = (e, t) => E(e, "name", { value: t, configurable: !0 });
var A = (e) => [, , , K(e?.[V("metadata")] ?? null)], $ = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], b = (e) => e !== void 0 && typeof e != "function" ? y("Function expected") : e, W = (e, t, n, c, i) => ({ kind: $[e], name: t, metadata: c, addInitializer: (f) => n._ ? y("Already initialized") : i.push(b(f || null)) }), X = (e, t) => q(t, V("metadata"), e[3]), v = (e, t, n, c) => {
  for (var i = 0, f = e[t >> 1], o = f && f.length; i < o; i++) t & 1 ? f[i].call(n) : c = f[i].call(n, c);
  return c;
}, j = (e, t, n, c, i, f) => {
  var o, u, a, s, d, r = t & 7, O = !!(t & 8), l = !!(t & 16), S = r > 3 ? e.length + 1 : r ? O ? 1 : 2 : 0, N = $[r + 5], k = r > 3 && (e[S - 1] = []), J = e[S] || (e[S] = []), g = r && (!l && !O && (i = i.prototype), r < 5 && (r > 3 || !l) && Q(r < 4 ? i : { get [n]() {
    return x(this, f);
  }, set [n](p) {
    return I(this, f, p);
  } }, n));
  r ? l && r < 4 && U(f, (r > 2 ? "set " : r > 1 ? "get " : "") + n) : U(i, n);
  for (var C = c.length - 1; C >= 0; C--)
    s = W(r, n, a = {}, e[3], J), r && (s.static = O, s.private = l, d = s.access = { has: l ? (p) => Y(i, p) : (p) => n in p }, r ^ 3 && (d.get = l ? (p) => (r ^ 1 ? x : Z)(p, i, r ^ 4 ? f : g.get) : (p) => p[n]), r > 2 && (d.set = l ? (p, R) => I(p, i, R, r ^ 4 ? f : g.set) : (p, R) => p[n] = R)), u = (0, c[C])(r ? r < 4 ? l ? f : g[N] : r > 4 ? void 0 : { get: g.get, set: g.set } : i, s), a._ = 1, r ^ 4 || u === void 0 ? b(u) && (r > 4 ? k.unshift(u) : r ? l ? f = u : g[N] = u : i = u) : typeof u != "object" || u === null ? y("Object expected") : (b(o = u.get) && (g.get = o), b(o = u.set) && (g.set = o), b(o = u.init) && k.unshift(o));
  return r || X(e, i), g && E(i, n, g), l ? r ^ 4 ? f : g : i;
}, z = (e, t, n) => q(e, typeof t != "symbol" ? t + "" : t, n), L = (e, t, n) => t.has(e) || y("Cannot " + n), Y = (e, t) => Object(t) !== t ? y('Cannot use the "in" operator on this value') : e.has(t), x = (e, t, n) => (L(e, t, "read from private field"), n ? n.call(e) : t.get(e));
var I = (e, t, n, c) => (L(e, t, "write to private field"), c ? c.call(e, n) : t.set(e, n), n), Z = (e, t, n) => (L(e, t, "access private method"), n);
import { useRef as _, useState as M, useEffect as P } from "react";
function w(e) {
  return (t, n) => {
    const c = t;
    return c.madoiMethodConfig_ = {
      ...c.madoiMethodConfig_ ? c.madoiMethodConfig_ : {},
      ...e
    }, t;
  };
}
function ee(e) {
  return (t, n) => {
    t.madoiClassConfig_ = { className: e };
  };
}
const te = {
  serialized: !0
};
function ne(e = te) {
  return w({ distributed: e });
}
function re() {
  return w({ changeState: {} });
}
const oe = {
  maxInterval: 5e3,
  minInterval: 3e3
};
function ce(e = oe) {
  return w({ getState: e });
}
function ue() {
  return w({ setState: {} });
}
function ae() {
  return (e, t, n) => {
    e[t].madoiReactSuppressRender_ = {};
  };
}
function B(e) {
  return typeof e == "function" ? e() : e;
}
function ie(e, t) {
  return typeof t == "function" ? t(e) : t;
}
var D, F, G, T, m;
T = [ee("MadoiReactInnerState")], G = [ne(), re()], F = [ue()], D = [ce()];
class h {
  constructor(t) {
    v(m, 5, this);
    z(this, "state");
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
}
m = A(null), j(m, 1, "updateState", G, h), j(m, 1, "setState", F, h), j(m, 1, "getState", D, h), h = j(m, 0, "State", T, h), v(m, 1, h);
function de(e, t) {
  const n = _(null), c = _(null), [i, f] = M();
  return n.current === null && (n.current = B(t)), P(() => {
    if (c.current !== null) return;
    const o = new h(n.current);
    c.current = o;
    let u = null;
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(o))) {
      const s = o[a].madoiMethodConfig_;
      s && s.getState && (u = o[a]);
    }
    if (u == null)
      throw new Error(`${typeof o} must declare @GetState method.`);
    for (let a of Object.getOwnPropertyNames(Object.getPrototypeOf(o))) {
      const s = o[a].madoiMethodConfig_;
      if (s) {
        if (s.changeState) {
          const d = o[a], r = function() {
            d.apply(o, arguments), f(u.apply(o));
          };
          r.madoiMethodConfig_ = s, o[a] = r;
        } else if (s.setState) {
          const d = o[a], r = function() {
            d.apply(o, arguments), f(u.apply(o));
          };
          r.madoiMethodConfig_ = s, o[a] = r;
        }
      }
    }
    e.register(o);
  }, []), [
    c.current?.getState() || n.current,
    (o) => {
      c.current?.updateState(
        ie(c.current?.getState(), o)
      );
    }
  ];
}
function le(e, t, n = !0) {
  const c = _(null), i = _(!1), [f, o] = M();
  return c.current === null && (c.current = B(t)), P(() => {
    if (i.current) return;
    const u = c.current;
    let a = null;
    for (let s of Object.getOwnPropertyNames(Object.getPrototypeOf(u))) {
      const d = u[s].madoiMethodConfig_;
      d && d.getState && (a = u[s]);
    }
    for (let s of Object.getOwnPropertyNames(Object.getPrototypeOf(u))) {
      let d = u[s].madoiReactSuppressRender_;
      typeof d > "u" && (d = !1);
      const r = u[s].madoiMethodConfig_;
      if (r && (r.distributed || r.changeState || r.setState || r.enterRoomAllowed || r.leaveRoomDone || r.peerEntered || r.peerProfileUpdated || r.peerLeaved)) {
        const O = u[s], l = function() {
          let S = { changed: !d };
          O.apply(u, [...arguments, S]), n && S.changed && (console.debug("[madoi-react] fire render for", u, O.name, d), o(a ? a.apply(u) : new Object()));
        };
        l.madoiMethodConfig_ = r, u[s] = l;
      }
    }
    e.register(u), i.current = !0;
  }, []), c.current;
}
function pe(e) {
  const [t, n] = M(new Object()), c = ({ detail: { peerId: i } }) => {
    i === e.getSelfPeer().id && n(new Object());
  };
  return P(() => H(e, { peerProfileUpdated: c })), e.getSelfPeer();
}
function ge(e) {
  const [t, n] = M(new Object()), c = () => n(new Object()), i = () => n(new Object()), f = ({ detail: { peerId: o } }) => {
    o !== e.getSelfPeer().id && n(new Object());
  };
  return P(() => H(e, { peerEntered: c, peerLeaved: i, peerProfileUpdated: f })), e.getOtherPeers();
}
function H(e, t) {
  for (const n of Object.keys(t))
    e.addEventListener(n, t[n]);
  return () => {
    for (const n of Object.keys(t))
      e.removeEventListener(n, t[n]);
  };
}
function me(...e) {
  return () => e.forEach((t) => t());
}
export {
  ae as SuppressRender,
  me as bundleCleanups,
  H as eventListnersEffect,
  le as useMadoiModel,
  ge as useOtherPeers,
  pe as useSelfPeer,
  de as useSharedState
};
