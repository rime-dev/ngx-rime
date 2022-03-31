(self.webpackChunkngx-rime = self.webpackChunkngx-rime || []).push([
  [179],
  {
    667: (t) => {
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        });
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 667), (t.exports = e);
    },
    99: (t, e, n) => {
      'use strict';
      function r(t) {
        return 'function' == typeof t;
      }
      let s = !1;
      const o = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
                t.stack
            );
          } else s && console.log('RxJS: Back to a better error behavior. Thank you. <3');
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function i(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const l = {
          closed: !0,
          next(t) {},
          error(t) {
            if (o.useDeprecatedSynchronousErrorHandling) throw t;
            i(t);
          },
          complete() {},
        },
        u = Array.isArray || ((t) => t && 'number' == typeof t.length);
      function c(t) {
        return null !== t && 'object' == typeof t;
      }
      const a = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join('\n  ')}`
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class h {
        constructor(t) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
        }
        unsubscribe() {
          let t;
          if (this.closed) return;
          let {_parentOrParents: e, _ctorUnsubscribe: n, _unsubscribe: s, _subscriptions: o} = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            e instanceof h)
          )
            e.remove(this);
          else if (null !== e) for (let r = 0; r < e.length; ++r) e[r].remove(this);
          if (r(s)) {
            n && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (i) {
              t = i instanceof a ? d(i.errors) : [i];
            }
          }
          if (u(o)) {
            let e = -1,
              n = o.length;
            for (; ++e < n; ) {
              const n = o[e];
              if (c(n))
                try {
                  n.unsubscribe();
                } catch (i) {
                  (t = t || []), i instanceof a ? (t = t.concat(d(i.errors))) : t.push(i);
                }
            }
          }
          if (t) throw new a(t);
        }
        add(t) {
          let e = t;
          if (!t) return h.EMPTY;
          switch (typeof t) {
            case 'function':
              e = new h(t);
            case 'object':
              if (e === this || e.closed || 'function' != typeof e.unsubscribe) return e;
              if (this.closed) return e.unsubscribe(), e;
              if (!(e instanceof h)) {
                const t = e;
                (e = new h()), (e._subscriptions = [t]);
              }
              break;
            default:
              throw new Error('unrecognized teardown ' + t + ' added to Subscription.');
          }
          let {_parentOrParents: n} = e;
          if (null === n) e._parentOrParents = this;
          else if (n instanceof h) {
            if (n === this) return e;
            e._parentOrParents = [n, this];
          } else {
            if (-1 !== n.indexOf(this)) return e;
            n.push(this);
          }
          const r = this._subscriptions;
          return null === r ? (this._subscriptions = [e]) : r.push(e), e;
        }
        remove(t) {
          const e = this._subscriptions;
          if (e) {
            const n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          }
        }
      }
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof a ? e.errors : e), []);
      }
      h.EMPTY = (function (t) {
        return (t.closed = !0), t;
      })(new h());
      const f =
        'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random();
      class p extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l;
              break;
            case 1:
              if (!t) {
                this.destination = l;
                break;
              }
              if ('object' == typeof t) {
                t instanceof p
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0), (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0), (this.destination = new g(this, t, e, n));
          }
        }
        [f]() {
          return this;
        }
        static create(t, e, n) {
          const r = new p(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const {_parentOrParents: t} = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends p {
        constructor(t, e, n, s) {
          let o;
          super(), (this._parentSubscriber = t);
          let i = this;
          r(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (s = e.complete),
              e !== l &&
                ((i = Object.create(e)),
                r(i.unsubscribe) && this.add(i.unsubscribe.bind(i)),
                (i.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = i),
            (this._next = o),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const {_parentSubscriber: e} = this;
            o.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const {_parentSubscriber: e} = this,
              {useDeprecatedSynchronousErrorHandling: n} = o;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : i(t), this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              i(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const {_parentSubscriber: t} = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              o.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling)) throw n;
            i(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!o.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
          try {
            e.call(this._context, n);
          } catch (r) {
            return o.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (i(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const {_parentSubscriber: t} = this;
          (this._context = null), (this._parentSubscriber = null), t.unsubscribe();
        }
      }
      const _ = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function y(t) {
        return t;
      }
      let m = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const {operator: r} = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof p) return t;
                  if (t[f]) return t[f]();
                }
                return t || e || n ? new p(t, e, n) : new p(l);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (o.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              o.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              o.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const {closed: e, destination: n, isStopped: r} = t;
                    if (e || r) return !1;
                    t = n && n instanceof p ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = b(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const {source: e} = this;
            return e && e.subscribe(t);
          }
          [_]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = b(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function b(t) {
        if ((t || (t = o.Promise || Promise), !t)) throw new Error('no Promise impl found');
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'object unsubscribed'),
            (this.name = 'ObjectUnsubscribedError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(), (this.subject = t), (this.subscriber = e), (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (((this.subject = null), !e || 0 === e.length || t.isStopped || t.closed)) return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class C extends p {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let x = (() => {
        class t extends m {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new C(this);
          }
          lift(t) {
            const e = new k(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const {observers: e} = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const {observers: e} = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const {observers: t} = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new m();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new k(t, e)), t;
      })();
      class k extends x {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const {destination: e} = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const {destination: e} = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const {destination: t} = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const {source: e} = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      class E {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new T(t, this.project, this.thisArg));
        }
      }
      class T extends p {
        constructor(t, e, n) {
          super(t), (this.project = e), (this.count = 0), (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const S = (t) => (e) => {
          for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.complete();
        },
        I = 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      const A = (t) => {
        if (t && 'function' == typeof t[_])
          return (
            (s = t),
            (t) => {
              const e = s[_]();
              if ('function' != typeof e.subscribe)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              return e.subscribe(t);
            }
          );
        if ((e = t) && 'number' == typeof e.length && 'function' != typeof e) return S(t);
        var e, n, r, s;
        if ((n = t) && 'function' != typeof n.subscribe && 'function' == typeof n.then)
          return ((t) => (e) =>
            t
              .then(
                (t) => {
                  e.closed || (e.next(t), e.complete());
                },
                (t) => e.error(t)
              )
              .then(null, i),
          e)(t);
        if (t && 'function' == typeof t[I])
          return (
            (r = t),
            (t) => {
              const e = r[I]();
              for (;;) {
                let r;
                try {
                  r = e.next();
                } catch (n) {
                  return t.error(n), t;
                }
                if (r.done) {
                  t.complete();
                  break;
                }
                if ((t.next(r.value), t.closed)) break;
              }
              return (
                'function' == typeof e.return &&
                  t.add(() => {
                    e.return && e.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? 'an invalid object' : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
      };
      class O extends p {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class D extends p {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function P(t, e, n = Number.POSITIVE_INFINITY) {
        return 'function' == typeof e
          ? (r) =>
              r.pipe(
                P((n, r) => {
                  return ((s = t(n, r)), s instanceof m ? s : new m(A(s))).pipe(
                    (function (t, e) {
                      return function (e) {
                        return e.lift(new E(t, void 0));
                      };
                    })((t, s) => e(n, t, r, s))
                  );
                  var s;
                }, n)
              )
          : ('number' == typeof e && (n = e), (e) => e.lift(new M(t, n)));
      }
      class M {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new H(t, this.project, this.concurrent));
        }
      }
      class H extends D {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new O(this),
            n = this.destination;
          n.add(e);
          const r = (function (t, e) {
            if (e.closed) return;
            if (t instanceof m) return t.subscribe(e);
            let n;
            try {
              n = A(t)(e);
            } catch (r) {
              e.error(r);
            }
            return n;
          })(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active && 0 === this.buffer.length && this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active && this.hasCompleted && this.destination.complete();
        }
      }
      function j() {
        return function (t) {
          return t.lift(new R(t));
        };
      }
      class R {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const {connectable: n} = this;
          n._refCount++;
          const r = new N(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class N extends p {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const {connectable: t} = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1)) return void (this.connection = null);
          const {connection: n} = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class F extends m {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject;
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new L(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return j()(this);
        }
      }
      const V = (() => {
        const t = F.prototype;
        return {
          operator: {value: null},
          _refCount: {value: 0, writable: !0},
          _subject: {value: null, writable: !0},
          _connection: {value: null, writable: !0},
          _subscribe: {value: t._subscribe},
          _isComplete: {value: t._isComplete, writable: !0},
          getSubject: {value: t.getSubject},
          connect: {value: t.connect},
          refCount: {value: t.refCount},
        };
      })();
      class L extends C {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0), this._unsubscribe(), super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe();
          }
        }
      }
      function Z() {
        return new x();
      }
      function B(t) {
        for (let e in t) if (t[e] === B) return e;
        throw Error('Could not find renamed property on target object.');
      }
      function $(t) {
        if ('string' == typeof t) return t;
        if (Array.isArray(t)) return '[' + t.map($).join(', ') + ']';
        if (null == t) return '' + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return '' + e;
        const n = e.indexOf('\n');
        return -1 === n ? e : e.substring(0, n);
      }
      function z(t, e) {
        return null == t || '' === t
          ? null === e
            ? ''
            : e
          : null == e || '' === e
          ? t
          : t + ' ' + e;
      }
      const U = B({__forward_ref__: B});
      function W(t) {
        return (
          (t.__forward_ref__ = W),
          (t.toString = function () {
            return $(this());
          }),
          t
        );
      }
      function q(t) {
        return 'function' == typeof (e = t) && e.hasOwnProperty(U) && e.__forward_ref__ === W
          ? t()
          : t;
        var e;
      }
      class G extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ''}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function Q(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t);
      }
      function J(t) {
        return 'function' == typeof t
          ? t.name || t.toString()
          : 'object' == typeof t && null != t && 'function' == typeof t.type
          ? t.type.name || t.type.toString()
          : Q(t);
      }
      function K(t, e) {
        const n = e ? ` in ${e}` : '';
        throw new G('201', `No provider for ${J(t)} found${n}`);
      }
      function Y(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function X(t) {
        return {providers: t.providers || [], imports: t.imports || []};
      }
      function tt(t) {
        return et(t, rt) || et(t, ot);
      }
      function et(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function nt(t) {
        return t && (t.hasOwnProperty(st) || t.hasOwnProperty(it)) ? t[st] : null;
      }
      const rt = B({'\u0275prov': B}),
        st = B({'\u0275inj': B}),
        ot = B({ngInjectableDef: B}),
        it = B({ngInjectorDef: B});
      var lt = (() => (
        ((lt = lt || {})[(lt.Default = 0)] = 'Default'),
        (lt[(lt.Host = 1)] = 'Host'),
        (lt[(lt.Self = 2)] = 'Self'),
        (lt[(lt.SkipSelf = 4)] = 'SkipSelf'),
        (lt[(lt.Optional = 8)] = 'Optional'),
        lt
      ))();
      let ut;
      function ct(t) {
        const e = ut;
        return (ut = t), e;
      }
      function at(t, e, n) {
        const r = tt(t);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & lt.Optional
          ? null
          : void 0 !== e
          ? e
          : void K($(t), 'Injector');
      }
      function ht(t) {
        return {toString: t}.toString();
      }
      var dt = (() => (
          ((dt = dt || {})[(dt.OnPush = 0)] = 'OnPush'), (dt[(dt.Default = 1)] = 'Default'), dt
        ))(),
        ft = (() => (
          ((ft = ft || {})[(ft.Emulated = 0)] = 'Emulated'),
          (ft[(ft.None = 2)] = 'None'),
          (ft[(ft.ShadowDom = 3)] = 'ShadowDom'),
          ft
        ))();
      const pt = 'undefined' != typeof globalThis && globalThis,
        gt = 'undefined' != typeof window && window,
        _t =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        yt = 'undefined' != typeof global && global,
        mt = pt || yt || gt || _t,
        bt = {},
        vt = [],
        wt = B({'\u0275cmp': B}),
        Ct = B({'\u0275dir': B}),
        xt = B({'\u0275pipe': B}),
        kt = B({'\u0275mod': B}),
        Et = B({'\u0275loc': B}),
        Tt = B({'\u0275fac': B}),
        St = B({__NG_ELEMENT_ID__: B});
      let It = 0;
      function At(t) {
        return ht(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === dt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || vt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || ft.Emulated,
              id: 'c',
              styles: t.styles || vt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            o = t.pipes;
          return (
            (n.id += It++),
            (n.inputs = Ht(t.inputs, e)),
            (n.outputs = Ht(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r ? () => ('function' == typeof r ? r() : r).map(Ot) : null),
            (n.pipeDefs = o ? () => ('function' == typeof o ? o() : o).map(Dt) : null),
            n
          );
        });
      }
      function Ot(t) {
        return (
          jt(t) ||
          (function (t) {
            return t[Ct] || null;
          })(t)
        );
      }
      function Dt(t) {
        return (function (t) {
          return t[xt] || null;
        })(t);
      }
      const Pt = {};
      function Mt(t) {
        return ht(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || vt,
            declarations: t.declarations || vt,
            imports: t.imports || vt,
            exports: t.exports || vt,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (Pt[t.id] = t.type), e;
        });
      }
      function Ht(t, e) {
        if (null == t) return bt;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              o = s;
            Array.isArray(s) && ((o = s[1]), (s = s[0])), (n[s] = r), e && (e[s] = o);
          }
        return n;
      }
      function jt(t) {
        return t[wt] || null;
      }
      function Rt(t, e) {
        const n = t[kt] || null;
        if (!n && !0 === e) throw new Error(`Type ${$(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Nt = 20,
        Ft = 10;
      function Vt(t) {
        return Array.isArray(t) && 'object' == typeof t[1];
      }
      function Lt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Zt(t) {
        return 0 != (8 & t.flags);
      }
      function Bt(t) {
        return null !== t.template;
      }
      function $t(t, e) {
        return t.hasOwnProperty(Tt) ? t[Tt] : null;
      }
      class zt {
        constructor(t, e, n) {
          (this.previousValue = t), (this.currentValue = e), (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ut() {
        const t = qt(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === bt) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function Wt(t, e, n, r) {
        const s =
            qt(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, {previous: bt, current: null}),
          o = s.current || (s.current = {}),
          i = s.previous,
          l = this.declaredInputs[n],
          u = i[l];
        (o[l] = new zt(u && u.currentValue, e, i === bt)), (t[r] = e);
      }
      function qt(t) {
        return t.__ngSimpleChanges__ || null;
      }
      const Gt = 'http://www.w3.org/2000/svg';
      let Qt;
      function Jt(t) {
        return !!t.listen;
      }
      const Kt = {
        createRenderer: (t, e) =>
          void 0 !== Qt ? Qt : 'undefined' != typeof document ? document : void 0,
      };
      function Yt(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Xt(t, e) {
        return Yt(e[t.index]);
      }
      function te(t, e) {
        const n = e[t];
        return Vt(n) ? n : n[0];
      }
      function ee(t) {
        return 128 == (128 & t[2]);
      }
      function ne(t, e) {
        return null == e ? null : t[e];
      }
      function re(t) {
        t[18] = 0;
      }
      function se(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (; null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5])); )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const oe = {lFrame: Ce(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1};
      function ie() {
        return oe.bindingsEnabled;
      }
      function le() {
        return oe.lFrame.lView;
      }
      function ue() {
        return oe.lFrame.tView;
      }
      function ce() {
        let t = ae();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function ae() {
        return oe.lFrame.currentTNode;
      }
      function he(t, e) {
        const n = oe.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function de() {
        return oe.lFrame.isParent;
      }
      function fe() {
        return oe.isInCheckNoChangesMode;
      }
      function pe(t) {
        oe.isInCheckNoChangesMode = t;
      }
      function ge(t, e) {
        const n = oe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), _e(e);
      }
      function _e(t) {
        oe.lFrame.currentDirectiveIndex = t;
      }
      function ye(t) {
        oe.lFrame.currentQueryIndex = t;
      }
      function me(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function be(t, e, n) {
        if (n & lt.SkipSelf) {
          let r = e,
            s = t;
          for (
            ;
            (r = r.parent),
              !(
                null !== r ||
                n & lt.Host ||
                ((r = me(s)), null === r) ||
                ((s = s[15]), 10 & r.type)
              );

          );
          if (null === r) return !1;
          (e = r), (t = s);
        }
        const r = (oe.lFrame = we());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function ve(t) {
        const e = we(),
          n = t[1];
        (oe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function we() {
        const t = oe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Ce(t) : e;
      }
      function Ce(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function xe() {
        const t = oe.lFrame;
        return (oe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
      }
      const ke = xe;
      function Ee() {
        const t = xe();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Te() {
        return oe.lFrame.selectedIndex;
      }
      function Se(t) {
        oe.lFrame.selectedIndex = t;
      }
      function Ie() {
        oe.lFrame.currentNamespace = Gt;
      }
      function Ae() {
        oe.lFrame.currentNamespace = null;
      }
      function Oe(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: o,
              ngAfterViewChecked: i,
              ngOnDestroy: l,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            o && (t.viewHooks || (t.viewHooks = [])).push(-n, o),
            i &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, i),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, i)),
            null != l && (t.destroyHooks || (t.destroyHooks = [])).push(n, l);
        }
      }
      function De(t, e, n) {
        He(t, e, 3, n);
      }
      function Pe(t, e, n, r) {
        (3 & t[2]) === n && He(t, e, n, r);
      }
      function Me(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function He(t, e, n, r) {
        const s = null != r ? r : -1,
          o = e.length - 1;
        let i = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < o; l++)
          if ('number' == typeof e[l + 1]) {
            if (((i = e[l]), null != r && i >= r)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (i < s || -1 == s) && (je(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function je(t, e, n, r) {
        const s = n[r] < 0,
          o = n[r + 1],
          i = t[s ? -n[r] : n[r]];
        if (s) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              o.call(i);
            } finally {
            }
          }
        } else
          try {
            o.call(i);
          } finally {
          }
      }
      const Re = -1;
      class Ne {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Fe(t, e, n) {
        const r = Jt(t);
        let s = 0;
        for (; s < n.length; ) {
          const o = n[s];
          if ('number' == typeof o) {
            if (0 !== o) break;
            s++;
            const i = n[s++],
              l = n[s++],
              u = n[s++];
            r ? t.setAttribute(e, l, u, i) : e.setAttributeNS(i, l, u);
          } else {
            const i = o,
              l = n[++s];
            64 === i.charCodeAt(0)
              ? r && t.setProperty(e, i, l)
              : r
              ? t.setAttribute(e, i, l)
              : e.setAttribute(i, l),
              s++;
          }
        }
        return s;
      }
      function Ve(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            'number' == typeof s
              ? (n = s)
              : 0 === n || Le(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function Le(t, e, n, r, s) {
        let o = 0,
          i = t.length;
        if (-1 === e) i = -1;
        else
          for (; o < t.length; ) {
            const n = t[o++];
            if ('number' == typeof n) {
              if (n === e) {
                i = -1;
                break;
              }
              if (n > e) {
                i = o - 1;
                break;
              }
            }
          }
        for (; o < t.length; ) {
          const e = t[o];
          if ('number' == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[o + 1] = s));
            if (r === t[o + 1]) return void (t[o + 2] = s);
          }
          o++, null !== r && o++, null !== s && o++;
        }
        -1 !== i && (t.splice(i, 0, e), (o = i + 1)),
          t.splice(o++, 0, n),
          null !== r && t.splice(o++, 0, r),
          null !== s && t.splice(o++, 0, s);
      }
      function Ze(t) {
        return 32767 & t;
      }
      function Be(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let $e = !0;
      function ze(t) {
        const e = $e;
        return ($e = t), e;
      }
      let Ue = 0;
      function We(t, e) {
        const n = Ge(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length), qe(r.data, t), qe(e, null), qe(r.blueprint, null));
        const s = Qe(t, e),
          o = t.injectorIndex;
        if (s !== Re) {
          const t = Ze(s),
            n = Be(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[o + s] = n[t + s] | r[t + s];
        }
        return (e[o + 8] = s), o;
      }
      function qe(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Ge(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Qe(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
        let n = 0,
          r = null,
          s = e;
        for (; null !== s; ) {
          const t = s[1],
            e = t.type;
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r)) return Re;
          if ((n++, (s = s[15]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16);
        }
        return Re;
      }
      function Je(t, e, n) {
        !(function (t, e, n) {
          let r;
          'string' == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(St) && (r = n[St]),
            null == r && (r = n[St] = Ue++);
          const s = 255 & r;
          e.data[t + (s >> 5)] |= 1 << s;
        })(t, e, n);
      }
      function Ke(t, e, n) {
        if (n & lt.Optional) return t;
        K(e, 'NodeInjector');
      }
      function Ye(t, e, n, r) {
        if ((n & lt.Optional && void 0 === r && (r = null), 0 == (n & (lt.Self | lt.Host)))) {
          const s = t[9],
            o = ct(void 0);
          try {
            return s ? s.get(e, r, n & lt.Optional) : at(e, r, n & lt.Optional);
          } finally {
            ct(o);
          }
        }
        return Ke(r, e, n);
      }
      const Xe = {};
      function tn() {
        return new on(ce(), le());
      }
      function en(t, e, n, r, s, o) {
        const i = e[1],
          l = i.data[t + 8],
          u = (function (t, e, n, r, s) {
            const o = t.providerIndexes,
              i = e.data,
              l = 1048575 & o,
              u = t.directiveStart,
              c = o >> 20,
              a = s ? l + c : t.directiveEnd;
            for (let h = r ? l : l + c; h < a; h++) {
              const t = i[h];
              if ((h < u && n === t) || (h >= u && t.type === n)) return h;
            }
            if (s) {
              const t = i[u];
              if (t && Bt(t) && t.type === n) return u;
            }
            return null;
          })(
            l,
            i,
            n,
            null == r
              ? (function (t) {
                  return 2 == (2 & t.flags);
                })(l) && $e
              : r != i && 0 != (3 & l.type),
            s & lt.Host && o === l
          );
        return null !== u ? nn(e, i, u, l) : Xe;
      }
      function nn(t, e, n, r) {
        let s = t[n];
        const o = e.data;
        if (s instanceof Ne) {
          const i = s;
          i.resolving &&
            (function (t, e) {
              throw new G('200', `Circular dependency in DI detected for ${t}`);
            })(J(o[n]));
          const l = ze(i.canSeeViewProviders);
          i.resolving = !0;
          const u = i.injectImpl ? ct(i.injectImpl) : null;
          be(t, r, lt.Default);
          try {
            (s = t[n] = i.factory(void 0, o, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {ngOnChanges: r, ngOnInit: s, ngDoCheck: o} = e.type.prototype;
                  if (r) {
                    const r = ((i = e).type.prototype.ngOnChanges && (i.setInput = Wt), Ut);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r);
                  }
                  var i;
                  s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, o));
                })(n, o[n], e);
          } finally {
            null !== u && ct(u), ze(l), (i.resolving = !1), ke();
          }
        }
        return s;
      }
      function rn(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function sn(t, e) {
        return !(t & lt.Self || (t & lt.Host && e));
      }
      class on {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return (function (t, e, n, r = lt.Default, s) {
            if (null !== t) {
              const o = (function (t) {
                if ('string' == typeof t) return t.charCodeAt(0) || 0;
                const e = t.hasOwnProperty(St) ? t[St] : void 0;
                return 'number' == typeof e ? (e >= 0 ? 255 & e : tn) : e;
              })(n);
              if ('function' == typeof o) {
                if (!be(e, t, r)) return r & lt.Host ? Ke(s, n, r) : Ye(e, n, r, s);
                try {
                  const t = o(r);
                  if (null != t || r & lt.Optional) return t;
                  K(n);
                } finally {
                  ke();
                }
              } else if ('number' == typeof o) {
                let s = null,
                  i = Ge(t, e),
                  l = Re,
                  u = r & lt.Host ? e[16][6] : null;
                for (
                  (-1 === i || r & lt.SkipSelf) &&
                  ((l = -1 === i ? Qe(t, e) : e[i + 8]),
                  l !== Re && sn(r, !1) ? ((s = e[1]), (i = Ze(l)), (e = Be(l, e))) : (i = -1));
                  -1 !== i;

                ) {
                  const t = e[1];
                  if (rn(o, i, t.data)) {
                    const t = en(i, e, n, s, r, u);
                    if (t !== Xe) return t;
                  }
                  (l = e[i + 8]),
                    l !== Re && sn(r, e[1].data[i + 8] === u) && rn(o, i, e)
                      ? ((s = t), (i = Ze(l)), (e = Be(l, e)))
                      : (i = -1);
                }
              }
            }
            return Ye(e, n, r, s);
          })(this._tNode, this._lView, t, void 0, e);
        }
      }
      const ln = '__parameters__';
      function un(t, e, n) {
        return ht(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty(ln)
                ? t[ln]
                : Object.defineProperty(t, ln, {value: []})[ln];
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      class cn {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = Y({
                  token: this,
                  providedIn: e.providedIn || 'root',
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function an(t, e) {
        t.forEach((t) => (Array.isArray(t) ? an(t, e) : e(t)));
      }
      function hn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      const dn = {},
        fn = /\n/gm,
        pn = '__source',
        gn = B({provide: String, useValue: B});
      let _n;
      function yn(t) {
        const e = _n;
        return (_n = t), e;
      }
      function mn(t, e = lt.Default) {
        if (void 0 === _n) throw new Error('inject() must be called from an injection context');
        return null === _n ? at(t, void 0, e) : _n.get(t, e & lt.Optional ? null : void 0, e);
      }
      function bn(t, e = lt.Default) {
        return (ut || mn)(q(t), e);
      }
      function vn(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = q(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Error('Arguments array must have arguments.');
            let t,
              n = lt.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e],
                o = s.__NG_DI_FLAG__;
              'number' == typeof o ? (-1 === o ? (t = s.token) : (n |= o)) : (t = s);
            }
            e.push(bn(t, n));
          } else e.push(bn(r));
        }
        return e;
      }
      function wn(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const Cn = wn(
          un('Inject', (t) => ({token: t})),
          -1
        ),
        xn = wn(un('Optional'), 8),
        kn = wn(un('SkipSelf'), 4);
      function En(t, e) {
        t.__ngContext__ = e;
      }
      function Tn(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Sn(t) {
        return t.ngOriginalError;
      }
      function In(t, ...e) {
        t.error(...e);
      }
      class An {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return (t && t.ngErrorLogger) || In;
            })(t);
          r(this._console, 'ERROR', t),
            e && r(this._console, 'ORIGINAL ERROR', e),
            n && r(this._console, 'ERROR CONTEXT', n);
        }
        _findContext(t) {
          return t
            ? (function (t) {
                return t.ngDebugContext;
              })(t) || this._findContext(Sn(t))
            : null;
        }
        _findOriginalError(t) {
          let e = t && Sn(t);
          for (; e && Sn(e); ) e = Sn(e);
          return e || null;
        }
      }
      const On = (() =>
        (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(
          mt
        ))();
      function Dn(t) {
        return t instanceof Function ? t() : t;
      }
      var Pn = (() => (
        ((Pn = Pn || {})[(Pn.Important = 1)] = 'Important'),
        (Pn[(Pn.DashCase = 2)] = 'DashCase'),
        Pn
      ))();
      function Mn(t, e) {
        return (void 0)(t, e);
      }
      function Hn(t) {
        const e = t[3];
        return Lt(e) ? e[3] : e;
      }
      function jn(t) {
        return Nn(t[13]);
      }
      function Rn(t) {
        return Nn(t[4]);
      }
      function Nn(t) {
        for (; null !== t && !Lt(t); ) t = t[4];
        return t;
      }
      function Fn(t, e, n, r, s) {
        if (null != r) {
          let o,
            i = !1;
          Lt(r) ? (o = r) : Vt(r) && ((i = !0), (r = r[0]));
          const l = Yt(r);
          0 === t && null !== n
            ? null == s
              ? $n(e, n, l)
              : Bn(e, n, l, s || null, !0)
            : 1 === t && null !== n
            ? Bn(e, n, l, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = (function (t, e) {
                  return Jt(t) ? t.parentNode(e) : e.parentNode;
                })(t, e);
                r &&
                  (function (t, e, n, r) {
                    Jt(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, l, i)
            : 3 === t && e.destroyNode(l),
            null != o &&
              (function (t, e, n, r, s) {
                const o = n[7];
                o !== Yt(n) && Fn(e, t, r, o, s);
                for (let i = Ft; i < n.length; i++) {
                  const s = n[i];
                  Gn(s[1], s, t, e, r, o);
                }
              })(e, t, o, n, s);
        }
      }
      function Vn(t, e, n) {
        return Jt(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Ln(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), se(s, -1)), n.splice(r, 1);
      }
      function Zn(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof Ne)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) {
                        const r = t[e[n]],
                          s = e[n + 1];
                        try {
                          s.call(r);
                        } finally {
                        }
                      }
                    else
                      try {
                        e.call(t);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let s = -1;
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ('string' == typeof n[o]) {
                    const t = n[o + 1],
                      i = 'function' == typeof t ? t(e) : Yt(e[t]),
                      l = r[(s = n[o + 2])],
                      u = n[o + 3];
                    'boolean' == typeof u
                      ? i.removeEventListener(n[o], l, u)
                      : u >= 0
                      ? r[(s = u)]()
                      : r[(s = -u)].unsubscribe(),
                      (o += 2);
                  } else {
                    const t = r[(s = n[o + 1])];
                    n[o].call(t);
                  }
              if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && Jt(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && Lt(e[3])) {
            n !== e[3] && Ln(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function Bn(t, e, n, r, s) {
        Jt(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
      }
      function $n(t, e, n) {
        Jt(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function zn(t, e, n, r, s) {
        null !== r ? Bn(t, e, n, r, s) : $n(t, e, n);
      }
      function Un(t, e, n, r) {
        const s = (function (t, e, n) {
            return (function (t, e, n) {
              let r = e;
              for (; null !== r && 40 & r.type; ) r = (e = r).parent;
              if (null === r) return n[0];
              if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation;
                if (e === ft.None || e === ft.Emulated) return null;
              }
              return Xt(r, n);
            })(t, e.parent, n);
          })(t, r, e),
          o = e[11],
          i = (function (t, e, n) {
            return (function (t, e, n) {
              return 40 & t.type ? Xt(t, n) : null;
            })(t, 0, n);
          })(r.parent || e[6], 0, e);
        if (null != s)
          if (Array.isArray(n)) for (let l = 0; l < n.length; l++) zn(o, s, n[l], i, !1);
          else zn(o, s, n, i, !1);
      }
      function Wn(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function qn(t, e, n, r, s, o, i) {
        for (; null != n; ) {
          const l = r[n.index],
            u = n.type;
          if ((i && 0 === e && (l && En(Yt(l), r), (n.flags |= 4)), 64 != (64 & n.flags)))
            if (8 & u) qn(t, e, n.child, r, s, o, !1), Fn(e, t, s, l, o);
            else if (32 & u) {
              const i = Mn(n, r);
              let u;
              for (; (u = i()); ) Fn(e, t, s, u, o);
              Fn(e, t, s, l, o);
            } else 16 & u ? Qn(t, e, r, n, s, o) : Fn(e, t, s, l, o);
          n = i ? n.projectionNext : n.next;
        }
      }
      function Gn(t, e, n, r, s, o) {
        qn(n, r, t.firstChild, e, s, o, !1);
      }
      function Qn(t, e, n, r, s, o) {
        const i = n[16],
          l = i[6].projection[r.projection];
        if (Array.isArray(l)) for (let u = 0; u < l.length; u++) Fn(e, t, s, l[u], o);
        else qn(t, e, l, i[3], s, o, !0);
      }
      function Jn(t, e, n) {
        Jt(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
      }
      function Kn(t, e, n) {
        Jt(t)
          ? '' === n
            ? t.removeAttribute(e, 'class')
            : t.setAttribute(e, 'class', n)
          : (e.className = n);
      }
      function Yn(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Xn = 'ng-template';
      function tr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && 'class' === s) {
            if (((s = t[r]), -1 !== Yn(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && 'string' == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function er(t) {
        return 4 === t.type && t.value !== Xn;
      }
      function nr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Xn);
      }
      function rr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          o = (function (t) {
            for (let n = 0; n < t.length; n++) if (3 === (e = t[n]) || 4 === e || 6 === e) return n;
            var e;
            return t.length;
          })(s);
        let i = !1;
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          if ('number' != typeof u) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)), ('' !== u && !nr(t, u, n)) || ('' === u && 1 === e.length))
                ) {
                  if (sr(r)) return !1;
                  i = !0;
                }
              } else {
                const c = 8 & r ? u : e[++l];
                if (8 & r && null !== t.attrs) {
                  if (!tr(t.attrs, c, n)) {
                    if (sr(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const a = or(8 & r ? 'class' : u, s, er(t), n);
                if (-1 === a) {
                  if (sr(r)) return !1;
                  i = !0;
                  continue;
                }
                if ('' !== c) {
                  let t;
                  t = a > o ? '' : s[a + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== Yn(e, c, 0)) || (2 & r && c !== t)) {
                    if (sr(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !sr(r) && !sr(u)) return !1;
            if (i && sr(u)) continue;
            (i = !1), (r = u | (1 & r));
          }
        }
        return sr(r) || i;
      }
      function sr(t) {
        return 0 == (1 & t);
      }
      function or(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; 'string' == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ('number' == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function ir(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (rr(t, e[r], n)) return !0;
        return !1;
      }
      function lr(t, e) {
        return t ? ':not(' + e.trim() + ')' : e;
      }
      function ur(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = '',
          o = !1;
        for (; n < t.length; ) {
          let i = t[n];
          if ('string' == typeof i)
            if (2 & r) {
              const e = t[++n];
              s += '[' + i + (e.length > 0 ? '="' + e + '"' : '') + ']';
            } else 8 & r ? (s += '.' + i) : 4 & r && (s += ' ' + i);
          else '' === s || sr(i) || ((e += lr(o, s)), (s = '')), (r = i), (o = o || !sr(r));
          n++;
        }
        return '' !== s && (e += lr(o, s)), e;
      }
      const cr = {};
      function ar(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && De(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && Pe(e, r, 0, n);
          }
        Se(n);
      }
      function hr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const n = t.data[o];
              ye(s), n.contentQueries(2, e[o], o);
            }
          }
      }
      function dr(t, e, n, r, s, o, i, l, u, c) {
        const a = e.blueprint.slice();
        return (
          (a[0] = s),
          (a[2] = 140 | r),
          re(a),
          (a[3] = a[15] = t),
          (a[8] = n),
          (a[10] = i || (t && t[10])),
          (a[11] = l || (t && t[11])),
          (a[12] = u || (t && t[12]) || null),
          (a[9] = c || (t && t[9]) || null),
          (a[6] = o),
          (a[16] = 2 == e.type ? t[16] : a),
          a
        );
      }
      function fr(t, e, n, r, s) {
        let o = t.data[e];
        if (null === o)
          (o = (function (t, e, n, r, s) {
            const o = ae(),
              i = de(),
              l = (t.data[e] = (function (t, e, n, r, s, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, i ? o : o && o.parent, n, e, r, s));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== o &&
                (i
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            );
          })(t, e, n, r, s)),
            oe.lFrame.inI18n && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = s);
          const t = (function () {
            const t = oe.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          o.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return he(o, !0), o;
      }
      function pr(t, e, n, r) {
        if (0 === n) return -1;
        const s = e.length;
        for (let o = 0; o < n; o++) e.push(r), t.blueprint.push(r), t.data.push(null);
        return s;
      }
      function gr(t, e, n) {
        ve(e);
        try {
          const r = t.viewQuery;
          null !== r && Nr(1, r, n);
          const s = t.template;
          null !== s && mr(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && hr(t, e),
            t.staticViewQueries && Nr(2, t.viewQuery, n);
          const o = t.components;
          null !== o &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Mr(t, e[n]);
            })(e, o);
        } catch (r) {
          throw (t.firstCreatePass && ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)), r);
        } finally {
          (e[2] &= -5), Ee();
        }
      }
      function _r(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        ve(e);
        const o = fe();
        try {
          re(e), (oe.lFrame.bindingIndex = t.bindingStartIndex), null !== n && mr(t, e, n, 2, r);
          const i = 3 == (3 & s);
          if (!o)
            if (i) {
              const n = t.preOrderCheckHooks;
              null !== n && De(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && Pe(e, n, 0, null), Me(e, 0);
            }
          if (
            ((function (t) {
              for (let e = jn(t); null !== e; e = Rn(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && se(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = jn(t); null !== e; e = Rn(e))
                for (let t = Ft; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  ee(n) && _r(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && hr(t, e),
            !o)
          )
            if (i) {
              const n = t.contentCheckHooks;
              null !== n && De(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && Pe(e, n, 1), Me(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  if (r < 0) Se(~r);
                  else {
                    const s = r,
                      o = n[++t],
                      i = n[++t];
                    ge(o, s), i(2, e[s]);
                  }
                }
              } finally {
                Se(-1);
              }
          })(t, e);
          const l = t.components;
          null !== l &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Dr(t, e[n]);
            })(e, l);
          const u = t.viewQuery;
          if ((null !== u && Nr(2, u, r), !o))
            if (i) {
              const n = t.viewCheckHooks;
              null !== n && De(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && Pe(e, n, 2), Me(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            o || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), se(e[3], -1));
        } finally {
          Ee();
        }
      }
      function yr(t, e, n, r) {
        const s = e[10],
          o = !fe(),
          i = 4 == (4 & e[2]);
        try {
          o && !i && s.begin && s.begin(), i && gr(t, e, r), _r(t, e, n, r);
        } finally {
          o && !i && s.end && s.end();
        }
      }
      function mr(t, e, n, r, s) {
        const o = Te(),
          i = 2 & r;
        try {
          Se(-1), i && e.length > Nt && ar(t, e, Nt, fe()), n(r, s);
        } finally {
          Se(o);
        }
      }
      function br(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = vr(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function vr(t, e, n, r, s, o, i, l, u, c) {
        const a = Nt + r,
          h = a + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : cr);
            return n;
          })(a, h),
          f = 'function' == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: l,
          declTNode: e,
          data: d.slice().fill(null, a),
          bindingStartIndex: a,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof i ? i() : i,
          firstChild: null,
          schemas: u,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function wr(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, s) : (n[r] = [e, s]);
          }
        return n;
      }
      function Cr(t, e, n, r, s, o) {
        const i = o.hostBindings;
        if (i) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const o = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ('number' == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != o && n.push(o),
            n.push(r, s, i);
        }
      }
      function xr(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function kr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Er(t, e, n) {
        if (n) {
          if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Bt(e) && (n[''] = t);
        }
      }
      function Tr(t, e, n) {
        (t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + n), (t.providerIndexes = e);
      }
      function Sr(t, e, n, r, s) {
        t.data[r] = s;
        const o = s.factory || (s.factory = $t(s.type)),
          i = new Ne(o, Bt(s), null);
        (t.blueprint[r] = i), (n[r] = i), Cr(t, e, 0, r, pr(t, n, s.hostVars, cr), s);
      }
      function Ir(t, e, n) {
        const r = Xt(e, t),
          s = br(n),
          o = t[10],
          i = Hr(
            t,
            dr(t, s, null, n.onPush ? 64 : 16, r, e, o, o.createRenderer(r, n), null, null)
          );
        t[e.index] = i;
      }
      function Ar(t, e, n, r, s, o) {
        const i = o[e];
        if (null !== i) {
          const t = r.setInput;
          for (let e = 0; e < i.length; ) {
            const s = i[e++],
              o = i[e++],
              l = i[e++];
            null !== t ? r.setInput(n, l, s, o) : (n[o] = l);
          }
        }
      }
      function Or(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ('number' == typeof s) break;
              t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[r + 1])), (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Dr(t, e) {
        const n = te(e, t);
        if (ee(n)) {
          const t = n[1];
          80 & n[2] ? _r(t, n, t.template, n[8]) : n[5] > 0 && Pr(n);
        }
      }
      function Pr(t) {
        for (let n = jn(t); null !== n; n = Rn(n))
          for (let t = Ft; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              _r(t, e, t.template, e[8]);
            } else e[5] > 0 && Pr(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = te(e[n], t);
            ee(r) && r[5] > 0 && Pr(r);
          }
      }
      function Mr(t, e) {
        const n = te(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
        })(r, n),
          gr(r, n, n[8]);
      }
      function Hr(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function jr(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          _r(t, e, t.template, n);
        } catch (s) {
          throw (
            ((function (t, e) {
              const n = t[9],
                r = n ? n.get(An, null) : null;
              r && r.handleError(e);
            })(e, s),
            s)
          );
        } finally {
          r.end && r.end();
        }
      }
      function Rr(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Tn(n),
              s = r[1];
            yr(s, r, s.template, n);
          }
        })(t[8]);
      }
      function Nr(t, e, n) {
        ye(0), e(t, n);
      }
      const Fr = (() => Promise.resolve(null))();
      function Vr(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          o = 0;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const t = e[i];
            'number' == typeof t
              ? (o = t)
              : 1 == o
              ? (s = z(s, t))
              : 2 == o && (r = z(r, t + ': ' + e[++i] + ';'));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      const Lr = new cn('INJECTOR', -1);
      class Zr {
        get(t, e = dn) {
          if (e === dn) {
            const e = new Error(`NullInjectorError: No provider for ${$(t)}!`);
            throw ((e.name = 'NullInjectorError'), e);
          }
          return e;
        }
      }
      const Br = new cn('Set Injector scope.'),
        $r = {},
        zr = {};
      let Ur;
      function Wr() {
        return void 0 === Ur && (Ur = new Zr()), Ur;
      }
      function qr(t, e = null, n = null, r) {
        return new Gr(t, n, e || Wr(), r);
      }
      class Gr {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && an(e, (n) => this.processProvider(n, t, e)),
            an([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Lr, Jr(void 0, this));
          const o = this.records.get(Br);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ('object' == typeof t ? null : $(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
          }
        }
        get(t, e = dn, n = lt.Default) {
          this.assertNotDestroyed();
          const r = yn(this),
            s = ct(void 0);
          try {
            if (!(n & lt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ('function' == typeof (o = t) || ('object' == typeof o && o instanceof cn)) &&
                  tt(t);
                (e = n && this.injectableDefInScope(n) ? Jr(Qr(t), $r) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & lt.Self ? Wr() : this.parent).get(
              t,
              (e = n & lt.Optional && e === dn ? null : e)
            );
          } catch (i) {
            if ('NullInjectorError' === i.name) {
              if (((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift($(t)), r)) throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e[pn] && s.unshift(e[pn]),
                  (t.message = (function (t, e, n, r = null) {
                    t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.substr(2) : t;
                    let s = $(e);
                    if (Array.isArray(e)) s = e.map($).join(' -> ');
                    else if ('object' == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(n + ':' + ('string' == typeof r ? JSON.stringify(r) : $(r)));
                        }
                      s = `{${t.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${s}]: ${t.replace(fn, '\n  ')}`;
                  })('\n' + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, 'R3InjectorError', this.source);
            }
            throw i;
          } finally {
            ct(s), yn(r);
          }
          var o;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return this.records.forEach((e, n) => t.push($(n))), `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error('Injector has already been destroyed.');
        }
        processInjectorType(t, e, n) {
          if (!(t = q(t))) return !1;
          let r = nt(t);
          const s = (null == r && t.ngModule) || void 0,
            o = void 0 === s ? t : s,
            i = -1 !== n.indexOf(o);
          if ((void 0 !== s && (r = nt(s)), null == r)) return !1;
          if (null != r.imports && !i) {
            let t;
            n.push(o);
            try {
              an(r.imports, (r) => {
                this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const {ngModule: n, providers: r} = t[e];
                an(r, (t) => this.processProvider(t, n, r || vt));
              }
          }
          this.injectorDefTypes.add(o);
          const l = $t(o) || (() => new o());
          this.records.set(o, Jr(l, $r));
          const u = r.providers;
          if (null != u && !i) {
            const e = t;
            an(u, (t) => this.processProvider(t, e, u));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Yr((t = q(t))) ? t : q(t && t.provide);
          const s = (function (t, e, n) {
            return Kr(t)
              ? Jr(void 0, t.useValue)
              : Jr(
                  (function (t, e, n) {
                    let r;
                    if (Yr(t)) {
                      const e = q(t);
                      return $t(e) || Qr(e);
                    }
                    if (Kr(t)) r = () => q(t.useValue);
                    else if ((s = t) && s.useFactory) r = () => t.useFactory(...vn(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => bn(q(t.useExisting));
                    else {
                      const e = q(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return $t(e) || Qr(e);
                      r = () => new e(...vn(t.deps));
                    }
                    var s;
                    return r;
                  })(t),
                  $r
                );
          })(t);
          if (Yr(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e ||
              ((e = Jr(void 0, $r, !0)), (e.factory = () => vn(e.multi)), this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === $r && ((e.value = zr), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              'object' == typeof n &&
              'function' == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = q(t.providedIn);
          return 'string' == typeof e
            ? 'any' === e || e === this.scope
            : this.injectorDefTypes.has(e);
        }
      }
      function Qr(t) {
        const e = tt(t),
          n = null !== e ? e.factory : $t(t);
        if (null !== n) return n;
        if (t instanceof cn) throw new Error(`Token ${$(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push('?');
                return n;
              })(e);
              throw new Error(`Can't resolve all parameters for ${$(t)}: (${n.join(', ')}).`);
            }
            const n = (function (t) {
              const e = t && (t[rt] || t[ot]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty('name')) return t.name;
                  const e = ('' + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? '' : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error('unreachable');
      }
      function Jr(t, e, n = !1) {
        return {factory: t, value: e, multi: n ? [] : void 0};
      }
      function Kr(t) {
        return null !== t && 'object' == typeof t && gn in t;
      }
      function Yr(t) {
        return 'function' == typeof t;
      }
      const Xr = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = qr(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({name: n}, e, t, n);
      };
      class ts {
        static create(t, e) {
          return Array.isArray(t) ? Xr(t, e, '') : Xr(t.providers, t.parent, t.name || '');
        }
      }
      function es(t, e) {
        Oe(Tn(t)[1], ce());
      }
      (ts.THROW_IF_NOT_FOUND = dn),
        (ts.NULL = new Zr()),
        (ts.ɵprov = Y({token: ts, providedIn: 'any', factory: () => bn(Lr)})),
        (ts.__NG_ELEMENT_ID__ = -1);
      let ns = null;
      function rs() {
        if (!ns) {
          const t = mt.Symbol;
          if (t && t.iterator) ns = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              'entries' !== n &&
                'size' !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (ns = n);
            }
          }
        }
        return ns;
      }
      function ss(t) {
        return !!os(t) && (Array.isArray(t) || (!(t instanceof Map) && rs() in t));
      }
      function os(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t);
      }
      function is(t, e, n, r, s) {
        const o = s ? 'class' : 'style';
        !(function (t, e, n, r, s) {
          for (let o = 0; o < n.length; ) {
            const i = n[o++],
              l = n[o++],
              u = e[i],
              c = t.data[i];
            null !== c.setInput ? c.setInput(u, s, r, l) : (u[l] = s);
          }
        })(t, n, e.inputs[o], o, r);
      }
      function ls(t, e, n, r) {
        const s = le(),
          o = ue(),
          i = Nt + t,
          l = s[11],
          u = (s[i] = Vn(l, e, oe.lFrame.currentNamespace)),
          c = o.firstCreatePass
            ? (function (t, e, n, r, s, o, i) {
                const l = e.consts,
                  u = fr(e, t, 2, s, ne(l, o));
                return (
                  (function (t, e, n, r) {
                    let s = !1;
                    if (ie()) {
                      const o = (function (t, e, n) {
                          const r = t.directiveRegistry;
                          let s = null;
                          if (r)
                            for (let o = 0; o < r.length; o++) {
                              const i = r[o];
                              ir(n, i.selectors, !1) &&
                                (s || (s = []),
                                Je(We(n, e), t, i.type),
                                Bt(i) ? (kr(t, n), s.unshift(i)) : s.push(i));
                            }
                          return s;
                        })(t, e, n),
                        i = null === r ? null : {'': -1};
                      if (null !== o) {
                        (s = !0), Tr(n, t.data.length, o.length);
                        for (let t = 0; t < o.length; t++) {
                          const e = o[t];
                          e.providersResolver && e.providersResolver(e);
                        }
                        let r = !1,
                          l = !1,
                          u = pr(t, e, o.length, null);
                        for (let s = 0; s < o.length; s++) {
                          const c = o[s];
                          (n.mergedAttrs = Ve(n.mergedAttrs, c.hostAttrs)),
                            Sr(t, n, e, u, c),
                            Er(u, c, i),
                            null !== c.contentQueries && (n.flags |= 8),
                            (null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars) ||
                              (n.flags |= 128);
                          const a = c.type.prototype;
                          !r &&
                            (a.ngOnChanges || a.ngOnInit || a.ngDoCheck) &&
                            ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), (r = !0)),
                            l ||
                              (!a.ngOnChanges && !a.ngDoCheck) ||
                              ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index),
                              (l = !0)),
                            u++;
                        }
                        !(function (t, e) {
                          const n = e.directiveEnd,
                            r = t.data,
                            s = e.attrs,
                            o = [];
                          let i = null,
                            l = null;
                          for (let u = e.directiveStart; u < n; u++) {
                            const t = r[u],
                              n = t.inputs,
                              c = null === s || er(e) ? null : Or(n, s);
                            o.push(c), (i = wr(n, u, i)), (l = wr(t.outputs, u, l));
                          }
                          null !== i &&
                            (i.hasOwnProperty('class') && (e.flags |= 16),
                            i.hasOwnProperty('style') && (e.flags |= 32)),
                            (e.initialInputs = o),
                            (e.inputs = i),
                            (e.outputs = l);
                        })(t, n);
                      }
                      i &&
                        (function (t, e, n) {
                          if (e) {
                            const r = (t.localNames = []);
                            for (let t = 0; t < e.length; t += 2) {
                              const s = n[e[t + 1]];
                              if (null == s)
                                throw new G('301', `Export of name '${e[t + 1]}' not found!`);
                              r.push(e[t], s);
                            }
                          }
                        })(n, r, i);
                    }
                    n.mergedAttrs = Ve(n.mergedAttrs, n.attrs);
                  })(e, n, u, ne(l, i)),
                  null !== u.attrs && Vr(u, u.attrs, !1),
                  null !== u.mergedAttrs && Vr(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(i, o, s, 0, e, n, r)
            : o.data[i];
        he(c, !0);
        const a = c.mergedAttrs;
        null !== a && Fe(l, u, a);
        const h = c.classes;
        null !== h && Kn(l, u, h);
        const d = c.styles;
        null !== d && Jn(l, u, d),
          64 != (64 & c.flags) && Un(o, s, u, c),
          0 === oe.lFrame.elementDepthCount && En(u, s),
          oe.lFrame.elementDepthCount++,
          (function (t) {
            return 1 == (1 & t.flags);
          })(c) &&
            ((function (t, e, n) {
              ie() &&
                ((function (t, e, n, r) {
                  const s = n.directiveStart,
                    o = n.directiveEnd;
                  t.firstCreatePass || We(n, e), En(r, e);
                  const i = n.initialInputs;
                  for (let l = s; l < o; l++) {
                    const r = t.data[l],
                      o = Bt(r);
                    o && Ir(e, n, r);
                    const u = nn(e, t, l, n);
                    En(u, e), null !== i && Ar(0, l - s, u, r, 0, i), o && (te(n.index, e)[8] = u);
                  }
                })(t, e, n, Xt(n, e)),
                128 == (128 & n.flags) &&
                  (function (t, e, n) {
                    const r = n.directiveStart,
                      s = n.directiveEnd,
                      o = n.index,
                      i = oe.lFrame.currentDirectiveIndex;
                    try {
                      Se(o);
                      for (let n = r; n < s; n++) {
                        const r = t.data[n],
                          s = e[n];
                        _e(n),
                          (null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs) ||
                            xr(r, s);
                      }
                    } finally {
                      Se(-1), _e(i);
                    }
                  })(t, e, n));
            })(o, s, c),
            (function (t, e, n) {
              if (Zt(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(o, c, s)),
          null !== r &&
            (function (t, e, n = Xt) {
              const r = e.localNames;
              if (null !== r) {
                let s = e.index + 1;
                for (let o = 0; o < r.length; o += 2) {
                  const i = r[o + 1],
                    l = -1 === i ? n(e, t) : t[i];
                  t[s++] = l;
                }
              }
            })(s, c);
      }
      function us() {
        let t = ce();
        de() ? (oe.lFrame.isParent = !1) : ((t = t.parent), he(t, !1));
        const e = t;
        oe.lFrame.elementDepthCount--;
        const n = ue();
        n.firstCreatePass && (Oe(n, t), Zt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            is(n, e, le(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            is(n, e, le(), e.stylesWithoutHost, !1);
      }
      function cs(t, e, n, r) {
        ls(t, e, n, r), us();
      }
      function as(t) {
        return !!t && 'function' == typeof t.then;
      }
      function hs(t, e = '') {
        const n = le(),
          r = ue(),
          s = t + Nt,
          o = r.firstCreatePass ? fr(r, s, 1, e, null) : r.data[s],
          i = (n[s] = (function (t, e) {
            return Jt(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        Un(r, n, i, o), he(o, !1);
      }
      function ds(t, e, n) {
        const r = le(),
          s = (function (t, e, n, r) {
            return (function (t, e, n) {
              return !Object.is(t[e], n) && ((t[e] = n), !0);
            })(t, oe.lFrame.bindingIndex++, n)
              ? e + Q(n) + r
              : cr;
          })(r, t, e, n);
        return (
          s !== cr &&
            (function (t, e, n) {
              const r = (function (t, e) {
                return Yt(e[t]);
              })(e, t);
              !(function (t, e, n) {
                Jt(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], r, n);
            })(r, Te(), s),
          ds
        );
      }
      const fs = void 0;
      var ps = [
        'en',
        [['a', 'p'], ['AM', 'PM'], fs],
        [['AM', 'PM'], fs, fs],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        fs,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        fs,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', fs, "{1} 'at' {0}", fs],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function (t) {
          const e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let gs = {};
      function _s(t) {
        return (
          t in gs ||
            (gs[t] = mt.ng && mt.ng.common && mt.ng.common.locales && mt.ng.common.locales[t]),
          gs[t]
        );
      }
      var ys = (() => (
        ((ys = ys || {})[(ys.LocaleId = 0)] = 'LocaleId'),
        (ys[(ys.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (ys[(ys.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (ys[(ys.DaysFormat = 3)] = 'DaysFormat'),
        (ys[(ys.DaysStandalone = 4)] = 'DaysStandalone'),
        (ys[(ys.MonthsFormat = 5)] = 'MonthsFormat'),
        (ys[(ys.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (ys[(ys.Eras = 7)] = 'Eras'),
        (ys[(ys.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (ys[(ys.WeekendRange = 9)] = 'WeekendRange'),
        (ys[(ys.DateFormat = 10)] = 'DateFormat'),
        (ys[(ys.TimeFormat = 11)] = 'TimeFormat'),
        (ys[(ys.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (ys[(ys.NumberSymbols = 13)] = 'NumberSymbols'),
        (ys[(ys.NumberFormats = 14)] = 'NumberFormats'),
        (ys[(ys.CurrencyCode = 15)] = 'CurrencyCode'),
        (ys[(ys.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (ys[(ys.CurrencyName = 17)] = 'CurrencyName'),
        (ys[(ys.Currencies = 18)] = 'Currencies'),
        (ys[(ys.Directionality = 19)] = 'Directionality'),
        (ys[(ys.PluralCase = 20)] = 'PluralCase'),
        (ys[(ys.ExtraData = 21)] = 'ExtraData'),
        ys
      ))();
      const ms = 'en-US';
      let bs = ms;
      function vs(t) {
        var e, n;
        (n = 'Expected localeId to be defined'),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`);
            })(n, e),
          'string' == typeof t && (bs = t.toLowerCase().replace(/_/g, '-'));
      }
      class ws {}
      class Cs {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${$(t)}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      class xs {}
      function ks(...t) {}
      function Es(t, e) {
        return new Ss(Xt(t, e));
      }
      xs.NULL = new Cs();
      const Ts = function () {
        return Es(ce(), le());
      };
      let Ss = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Ts), t;
      })();
      class Is {}
      let As = (() => {
        class t {}
        return (t.ɵprov = Y({token: t, providedIn: 'root', factory: () => null})), t;
      })();
      class Os {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const Ds = new Os('12.2.0');
      class Ps {
        constructor() {}
        supports(t) {
          return ss(t);
        }
        create(t) {
          return new Hs(t);
        }
      }
      const Ms = (t, e) => e;
      class Hs {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Ms);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const o = !n || (e && e.currentIndex < Fs(n, r, s)) ? e : n,
              i = Fs(o, r, s),
              l = o.currentIndex;
            if (o === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == o.previousIndex)) r++;
            else {
              s || (s = []);
              const t = i - r,
                e = l - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    o = r + n;
                  e <= o && o < t && (s[n] = r + 1);
                }
                s[o.previousIndex] = e - t;
              }
            }
            i !== l && t(o, i, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !ss(t)))
            throw new Error(
              `Error trying to diff '${$(t)}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            o = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (o && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (o = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[rs()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (o && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (o = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null, t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, r))
              : (t = this._addAfter(new js(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r && ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t;
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ns()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Ns()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class js {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Rs {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Ns {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Rs()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Fs(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class Vs {
        constructor() {}
        supports(t) {
          return t instanceof Map || os(t);
        }
        create() {
          return new Ls();
        }
      }
      class Ls {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || os(t)))
              throw new Error(`Error trying to diff '${$(t)}'. Only maps and objects are allowed`);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t), (this._appendAfter = e), (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return r && (r._next = s), s && (s._prev = r), (n._next = null), (n._prev = null), n;
          }
          const n = new Zs(t);
          return this._records.set(t, n), (n.currentValue = e), this._addToAdditions(n), n;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Zs {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Bs() {
        return new $s([new Ps()]);
      }
      let $s = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Bs()),
              deps: [[t, new kn(), new xn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`
            );
            var n;
          }
        }
        return (t.ɵprov = Y({token: t, providedIn: 'root', factory: Bs})), t;
      })();
      function zs() {
        return new Us([new Vs()]);
      }
      let Us = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || zs()),
              deps: [[t, new kn(), new xn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.ɵprov = Y({token: t, providedIn: 'root', factory: zs})), t;
      })();
      function Ws(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const o = e[n.index];
          if ((null !== o && r.push(Yt(o)), Lt(o)))
            for (let t = Ft; t < o.length; t++) {
              const e = o[t],
                n = e[1].firstChild;
              null !== n && Ws(e[1], e, n, r);
            }
          const i = n.type;
          if (8 & i) Ws(t, e, n.child, r);
          else if (32 & i) {
            const t = Mn(n, e);
            let s;
            for (; (s = t()); ) r.push(s);
          } else if (16 & i) {
            const t = Wn(e, n);
            if (Array.isArray(t)) r.push(...t);
            else {
              const n = Hn(e[16]);
              Ws(n[1], n, t, r, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return r;
      }
      class qs extends class {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return Ws(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Lt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 &&
                ((function (t, e) {
                  if (t.length <= Ft) return;
                  const n = Ft + e,
                    r = t[n];
                  if (r) {
                    const o = r[17];
                    null !== o && o !== t && Ln(o, r), e > 0 && (t[n - 1][4] = r[4]);
                    const i = hn(t, Ft + e);
                    Gn(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null);
                    const l = i[19];
                    null !== l && l.detachView(i[1]), (r[3] = null), (r[4] = null), (r[2] &= -129);
                  }
                  var s;
                })(t, n),
                hn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          !(function (t, e) {
            if (!(256 & e[2])) {
              const n = e[11];
              Jt(n) && n.destroyNode && Gn(t, e, n, 3, null, null),
                (function (t) {
                  let e = t[13];
                  if (!e) return Zn(t[1], t);
                  for (; e; ) {
                    let n = null;
                    if (Vt(e)) n = e[13];
                    else {
                      const t = e[10];
                      t && (n = t);
                    }
                    if (!n) {
                      for (; e && !e[4] && e !== t; ) Vt(e) && Zn(e[1], e), (e = e[3]);
                      null === e && (e = t), Vt(e) && Zn(e[1], e), (n = e && e[4]);
                    }
                    e = n;
                  }
                })(e);
            }
          })(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function (t, e, n, r) {
            const s = (o = e)[7] || (o[7] = []);
            var o;
            s.push(r);
          })(0, this._lView, 0, t);
        }
        markForCheck() {
          !(function (t) {
            for (; t; ) {
              t[2] |= 64;
              const e = Hn(t);
              if (0 != (512 & t[2]) && !e) return t;
              t = e;
            }
          })(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          jr(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            pe(!0);
            try {
              jr(t, e, n);
            } finally {
              pe(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error('This view is already attached directly to the ApplicationRef!');
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null), Gn(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error('This view is already attached to a ViewContainer!');
          this._appRef = t;
        }
      } {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Rr(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            pe(!0);
            try {
              Rr(t);
            } finally {
              pe(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Gs = [new Vs()],
        Qs = new $s([new Ps()]),
        Js = new Us(Gs);
      class Ks {}
      const Ys = {};
      class Xs extends xs {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = jt(t);
          return new no(e, this.ngModule);
        }
      }
      function to(t) {
        const e = [];
        for (let n in t) t.hasOwnProperty(n) && e.push({propName: t[n], templateName: n});
        return e;
      }
      const eo = new cn('SCHEDULER_TOKEN', {providedIn: 'root', factory: () => On});
      class no extends ws {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(ur).join(',')),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return to(this.componentDef.inputs);
        }
        get outputs() {
          return to(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const o = t.get(n, Ys, s);
                      return o !== Ys || r === Ys ? o : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            o = s.get(Is, Kt),
            i = s.get(As, null),
            l = o.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || 'div',
            c = n
              ? (function (t, e, n) {
                  if (Jt(t)) return t.selectRootElement(e, n === ft.ShadowDom);
                  let r = 'string' == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ''), r;
                })(l, n, this.componentDef.encapsulation)
              : Vn(
                  o.createRenderer(null, this.componentDef),
                  u,
                  (function (t) {
                    const e = t.toLowerCase();
                    return 'svg' === e
                      ? Gt
                      : 'math' === e
                      ? 'http://www.w3.org/1998/MathML/'
                      : null;
                  })(u)
                ),
            a = this.componentDef.onPush ? 576 : 528,
            h = {components: [], scheduler: On, clean: Fr, playerHandler: null, flags: 0},
            d = vr(0, null, null, 1, 0, null, null, null, null, null),
            f = dr(null, d, h, a, null, null, o, l, i, s);
          let p, g;
          ve(f);
          try {
            const t = (function (t, e, n, r, s, o) {
              const i = n[1];
              n[20] = t;
              const l = fr(i, 20, 2, '#host', null),
                u = (l.mergedAttrs = e.hostAttrs);
              null !== u &&
                (Vr(l, u, !0),
                null !== t &&
                  (Fe(s, t, u),
                  null !== l.classes && Kn(s, t, l.classes),
                  null !== l.styles && Jn(s, t, l.styles)));
              const c = r.createRenderer(t, e),
                a = dr(n, br(e), null, e.onPush ? 64 : 16, n[20], l, r, c, null, null);
              return (
                i.firstCreatePass && (Je(We(l, n), i, e.type), kr(i, l), Tr(l, n.length, 1)),
                Hr(n, a),
                (n[20] = a)
              );
            })(c, this.componentDef, f, o, l);
            if (c)
              if (n) Fe(l, c, ['ng-version', Ds.full]);
              else {
                const {attrs: t, classes: e} = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let o = t[r];
                    if ('string' == typeof o)
                      2 === s ? '' !== o && e.push(o, t[++r]) : 8 === s && n.push(o);
                    else {
                      if (!sr(s)) break;
                      s = o;
                    }
                    r++;
                  }
                  return {attrs: e, classes: n};
                })(this.componentDef.selectors[0]);
                t && Fe(l, c, t), e && e.length > 0 && Kn(l, c, e.join(' '));
              }
            if (((g = d.data[20]), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (p = (function (t, e, n, r, s) {
              const o = n[1],
                i = (function (t, e, n) {
                  const r = ce();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Sr(t, r, e, pr(t, e, 1, null), n));
                  const s = nn(e, t, r.directiveStart, r);
                  En(s, e);
                  const o = Xt(r, e);
                  return o && En(o, e), s;
                })(o, n, e);
              if (
                (r.components.push(i), (t[8] = i), s && s.forEach((t) => t(i, e)), e.contentQueries)
              ) {
                const t = ce();
                e.contentQueries(1, i, t.directiveStart);
              }
              const l = ce();
              return (
                !o.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Se(l.index), Cr(n[1], l, 0, l.directiveStart, l.directiveEnd, e), xr(e, i)),
                i
              );
            })(t, this.componentDef, f, h, [es])),
              gr(d, f, null);
          } finally {
            Ee();
          }
          return new ro(this.componentType, p, Es(g, f), f, g);
        }
      }
      class ro extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new qs(r)),
            (this.componentType = t);
        }
        get injector() {
          return new on(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const so = new Map();
      class oo extends Ks {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Xs(this));
          const n = Rt(t),
            r = t[Et] || null;
          r && vs(r),
            (this._bootstrapComponents = Dn(n.bootstrap)),
            (this._r3Injector = qr(
              t,
              e,
              [
                {provide: Ks, useValue: this},
                {provide: xs, useValue: this.componentFactoryResolver},
              ],
              $(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = ts.THROW_IF_NOT_FOUND, n = lt.Default) {
          return t === ts || t === Ks || t === Lr ? this : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class io extends class {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Rt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const r = Rt(n, !0),
                    s = r.id;
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${$(e)} vs ${$(e.name)}`
                        );
                    })(s, so.get(s), n),
                    so.set(s, n));
                  const o = Dn(r.imports);
                  for (const i of o) e.has(i) || (e.add(i), t(i));
                })(t);
              })(t);
        }
        create(t) {
          return new oo(this.moduleType, t);
        }
      }
      function lo(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const uo = class extends x {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          var r, s, o;
          let i = t,
            l = e || (() => null),
            u = n;
          if (t && 'object' == typeof t) {
            const e = t;
            (i = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e)),
              (l = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e)),
              (u = null === (o = e.complete) || void 0 === o ? void 0 : o.bind(e));
          }
          this.__isAsync && ((l = lo(l)), i && (i = lo(i)), u && (u = lo(u)));
          const c = super.subscribe({next: i, error: l, complete: u});
          return t instanceof h && t.add(c), c;
        }
      };
      Symbol;
      const co = new cn('Application Initializer');
      let ao = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = ks),
              (this.reject = ks),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const e = this.appInits[r]();
                if (as(e)) t.push(e);
                else if ((n = e) && 'function' == typeof n.subscribe) {
                  const n = new Promise((t, n) => {
                    e.subscribe({complete: t, error: n});
                  });
                  t.push(n);
                }
              }
            var n;
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(co, 8));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const ho = new cn('AppId'),
        fo = {
          provide: ho,
          useFactory: function () {
            return `${po()}${po()}${po()}`;
          },
          deps: [],
        };
      function po() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const go = new cn('Platform Initializer'),
        _o = new cn('Platform ID'),
        yo = new cn('appBootstrapListener');
      let mo = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const bo = new cn('LocaleId'),
        vo = new cn('DefaultCurrencyCode');
      class wo {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const Co = function (t) {
          return new io(t);
        },
        xo = Co,
        ko = function (t) {
          return Promise.resolve(Co(t));
        },
        Eo = function (t) {
          const e = Co(t),
            n = Dn(Rt(t).declarations).reduce((t, e) => {
              const n = jt(e);
              return n && t.push(new no(n)), t;
            }, []);
          return new wo(e, n);
        },
        To = Eo,
        So = function (t) {
          return Promise.resolve(Eo(t));
        };
      let Io = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = xo),
              (this.compileModuleAsync = ko),
              (this.compileModuleAndAllComponentsSync = To),
              (this.compileModuleAndAllComponentsAsync = So);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const Ao = (() => Promise.resolve(0))();
      function Oo(t) {
        'undefined' == typeof Zone
          ? Ao.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t);
      }
      class Do {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new uo(!1)),
            (this.onMicrotaskEmpty = new uo(!1)),
            (this.onStable = new uo(!1)),
            (this.onError = new uo(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js');
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let t = mt.requestAnimationFrame,
                e = mt.cancelAnimationFrame;
              if ('undefined' != typeof Zone && t && e) {
                const n = t[Zone.__symbol__('OriginalDelegate')];
                n && (t = n);
                const r = e[Zone.__symbol__('OriginalDelegate')];
                r && (e = r);
              }
              return {nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e};
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(mt, () => {
                      t.fakeTopEventTask ||
                        (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (t.lastRequestAnimationFrameId = -1),
                              Ho(t),
                              (t.isCheckStableRunning = !0),
                              Mo(t),
                              (t.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        t.fakeTopEventTask.invoke();
                    })),
                    Ho(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: 'angular',
                properties: {isAngularZone: !0},
                onInvokeTask: (n, r, s, o, i, l) => {
                  try {
                    return jo(t), n.invokeTask(s, o, i, l);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection && 'eventTask' === o.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ro(t);
                  }
                },
                onInvoke: (n, r, s, o, i, l, u) => {
                  try {
                    return jo(t), n.invoke(s, o, i, l, u);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ro(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ('microTask' == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask), Ho(t), Mo(t))
                        : 'macroTask' == s.change && (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!Do.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
        static assertNotInAngularZone() {
          if (Do.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            o = s.scheduleEventTask('NgZoneEvent: ' + r, t, Po, ks, ks);
          try {
            return s.runTask(o, e, n);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Po = {};
      function Mo(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ho(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function jo(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ro(t) {
        t._nesting--, Mo(t);
      }
      class No {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new uo()),
            (this.onMicrotaskEmpty = new uo()),
            (this.onStable = new uo()),
            (this.onError = new uo());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Fo = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Do.assertNotInAngularZone(),
                        Oo(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Oo(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter((t) => t.timeoutId !== r)),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({doneCb: t, timeoutId: r, updateCb: n});
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(bn(Do));
            }),
            (t.ɵprov = Y({token: t, factory: t.ɵfac})),
            t
          );
        })(),
        Vo = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Bo.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Bo.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = Y({token: t, factory: t.ɵfac})),
            t
          );
        })();
      class Lo {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Zo,
        Bo = new Lo(),
        $o = !0,
        zo = !1;
      const Uo = new cn('AllowMultipleToken');
      function Wo(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new cn(r);
        return (e = []) => {
          let o = qo();
          if (!o || o.injector.get(Uo, !1))
            if (t) t(n.concat(e).concat({provide: s, useValue: !0}));
            else {
              const t = n
                .concat(e)
                .concat({provide: s, useValue: !0}, {provide: Br, useValue: 'platform'});
              !(function (t) {
                if (Zo && !Zo.destroyed && !Zo.injector.get(Uo, !1))
                  throw new Error(
                    'There can be only one platform. Destroy the previous one to create a new one.'
                  );
                Zo = t.get(Go);
                const e = t.get(go, null);
                e && e.forEach((t) => t());
              })(ts.create({providers: t, name: r}));
            }
          return (function (t) {
            const e = qo();
            if (!e) throw new Error('No platform exists!');
            if (!e.injector.get(t, null))
              throw new Error(
                'A platform with a different configuration has been created. Please destroy it first.'
              );
            return e;
          })(s);
        };
      }
      function qo() {
        return Zo && !Zo.destroyed ? Zo : null;
      }
      let Go = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    'noop' === t
                      ? new No()
                      : ('zone.js' === t ? void 0 : t) ||
                        new Do({
                          enableLongStackTrace: ((zo = !0), $o),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{provide: Do, useValue: n}];
            return n.run(() => {
              const e = ts.create({providers: r, parent: this.injector, name: t.moduleType.name}),
                s = t.create(e),
                o = s.injector.get(An, null);
              if (!o)
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      o.handleError(t);
                    },
                  });
                  s.onDestroy(() => {
                    Ko(this._modules, s), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return as(r)
                      ? r.catch((n) => {
                          throw (e.runOutsideAngular(() => t.handleError(n)), n);
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(o, n, () => {
                  const t = s.injector.get(ao);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (vs(s.injector.get(bo, ms) || ms), this._moduleDoBootstrap(s), s)
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Qo({}, e);
            return (function (t, e, n) {
              const r = new io(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Jo);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${$(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new Error('The platform has already been destroyed!');
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(ts));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      function Qo(t, e) {
        return Array.isArray(e) ? e.reduce(Qo, t) : Object.assign(Object.assign({}, t), e);
      }
      let Jo = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = r),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              }));
            const o = new m((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              i = new m((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Do.assertNotInAngularZone(),
                      Oo(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Do.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              var s;
              return (
                (s = r) && 'function' == typeof s.schedule
                  ? ((n = t.pop()),
                    t.length > 1 && 'number' == typeof t[t.length - 1] && (e = t.pop()))
                  : 'number' == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof m
                  ? t[0]
                  : (function (t = Number.POSITIVE_INFINITY) {
                      return P(y, t);
                    })(e)(
                      (function (t, e) {
                        return e
                          ? (function (t, e) {
                              return new m((n) => {
                                const r = new h();
                                let s = 0;
                                return (
                                  r.add(
                                    e.schedule(function () {
                                      s !== t.length
                                        ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                                        : n.complete();
                                    })
                                  ),
                                  r
                                );
                              });
                            })(t, e)
                          : new m(S(t));
                      })(t, n)
                    )
              );
            })(
              o,
              i.pipe((t) => {
                return j()(
                  ((e = Z),
                  function (t) {
                    let n;
                    n =
                      'function' == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, V);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
              );
            let n;
            (n = t instanceof ws ? t : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Ks),
              s = n.create(ts.NULL, [], e || n.selector, r),
              o = s.location.nativeElement,
              i = s.injector.get(Fo, null),
              l = i && s.injector.get(Vo);
            return (
              i && l && l.registerApplication(o, i),
              s.onDestroy(() => {
                this.detachView(s.hostView),
                  Ko(this.components, s),
                  l && l.unregisterApplication(o);
              }),
              this._loadComponent(s),
              s
            );
          }
          tick() {
            if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Ko(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(yo, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(Do), bn(ts), bn(An), bn(xs), bn(ao));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      function Ko(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const Yo = Wo(null, 'core', [
          {provide: _o, useValue: 'unknown'},
          {provide: Go, deps: [ts]},
          {provide: Vo, deps: []},
          {provide: mo, deps: []},
        ]),
        Xo = [
          {provide: Jo, useClass: Jo, deps: [Do, ts, An, xs, ao]},
          {
            provide: eo,
            deps: [Do],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          {provide: ao, useClass: ao, deps: [[new xn(), co]]},
          {provide: Io, useClass: Io, deps: []},
          fo,
          {
            provide: $s,
            useFactory: function () {
              return Qs;
            },
            deps: [],
          },
          {
            provide: Us,
            useFactory: function () {
              return Js;
            },
            deps: [],
          },
          {
            provide: bo,
            useFactory: function (t) {
              return vs((t = t || ('undefined' != typeof $localize && $localize.locale) || ms)), t;
            },
            deps: [[new Cn(bo), new xn(), new kn()]],
          },
          {provide: vo, useValue: 'USD'},
        ];
      let ti = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(bn(Jo));
            }),
            (t.ɵmod = Mt({type: t})),
            (t.ɵinj = X({providers: Xo})),
            t
          );
        })(),
        ei = null;
      function ni() {
        return ei;
      }
      const ri = new cn('DocumentToken');
      var si = (() => (
        ((si = si || {})[(si.Zero = 0)] = 'Zero'),
        (si[(si.One = 1)] = 'One'),
        (si[(si.Two = 2)] = 'Two'),
        (si[(si.Few = 3)] = 'Few'),
        (si[(si.Many = 4)] = 'Many'),
        (si[(si.Other = 5)] = 'Other'),
        si
      ))();
      class oi {}
      let ii = (() => {
          class t extends oi {
            constructor(t) {
              super(), (this.locale = t);
            }
            getPluralCategory(t, e) {
              switch (
                (function (t) {
                  return (function (t) {
                    const e = (function (t) {
                      return t.toLowerCase().replace(/_/g, '-');
                    })(t);
                    let n = _s(e);
                    if (n) return n;
                    const r = e.split('-')[0];
                    if (((n = _s(r)), n)) return n;
                    if ('en' === r) return ps;
                    throw new Error(`Missing locale data for the locale "${t}".`);
                  })(t)[ys.PluralCase];
                })(e || this.locale)(t)
              ) {
                case si.Zero:
                  return 'zero';
                case si.One:
                  return 'one';
                case si.Two:
                  return 'two';
                case si.Few:
                  return 'few';
                case si.Many:
                  return 'many';
                default:
                  return 'other';
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(bn(bo));
            }),
            (t.ɵprov = Y({token: t, factory: t.ɵfac})),
            t
          );
        })(),
        li = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = Mt({type: t})),
            (t.ɵinj = X({providers: [{provide: oi, useClass: ii}]})),
            t
          );
        })();
      class ui extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          var t;
          (t = new ui()), ei || (ei = t);
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null;
        }
        getBaseHref(t) {
          const e =
            ((ai = ai || document.querySelector('base')), ai ? ai.getAttribute('href') : null);
          return null == e
            ? null
            : (function (t) {
                (ci = ci || document.createElement('a')), ci.setAttribute('href', t);
                const e = ci.pathname;
                return '/' === e.charAt(0) ? e : `/${e}`;
              })(e);
        }
        resetBaseElement() {
          ai = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(';')) {
              const t = n.indexOf('='),
                [r, s] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let ci,
        ai = null;
      const hi = new cn('TRANSITION_ID'),
        di = [
          {
            provide: co,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ao).donePromise.then(() => {
                  const n = ni();
                  Array.prototype.slice
                    .apply(e.querySelectorAll('style[ng-transition]'))
                    .filter((e) => e.getAttribute('ng-transition') === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [hi, ri, ts],
            multi: !0,
          },
        ];
      class fi {
        static init() {
          var t;
          (t = new fi()), (Bo = t);
        }
        addToWindow(t) {
          (mt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r) throw new Error('Could not find testability for element.');
            return r;
          }),
            (mt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (mt.getAllAngularRootElements = () => t.getAllRootElements()),
            mt.frameworkStabilizers || (mt.frameworkStabilizers = []),
            mt.frameworkStabilizers.push((t) => {
              const e = mt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? ni().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      let pi = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const gi = new cn('EventManagerPlugins');
      let _i = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(gi), bn(Do));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      class yi {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = ni().getGlobalEventTarget(this._doc, t);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let mi = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = Y({token: t, factory: t.ɵfac})),
            t
          );
        })(),
        bi = (() => {
          class t extends mi {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, e, n) {
              t.forEach((t) => {
                const r = this._doc.createElement('style');
                (r.textContent = t), n.push(e.appendChild(r));
              });
            }
            addHost(t) {
              const e = [];
              this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e);
            }
            removeHost(t) {
              const e = this._hostNodes.get(t);
              e && e.forEach(vi), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(vi));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(bn(ri));
            }),
            (t.ɵprov = Y({token: t, factory: t.ɵfac})),
            t
          );
        })();
      function vi(t) {
        ni().remove(t);
      }
      const wi = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        Ci = /%COMP%/g;
      function xi(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? xi(t, s, n) : ((s = s.replace(Ci, t)), n.push(s));
        }
        return n;
      }
      function ki(t) {
        return (e) => {
          if ('__ngUnwrap__' === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Ei = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ti(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case ft.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Si(this.eventManager, this.sharedStylesHost, e, this.appId)),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case ft.ShadowDom:
                return new Ii(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = xi(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(_i), bn(bi), bn(ho));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      class Ti {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(wi[e] || e, t) : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = 'string' == typeof t ? document.querySelector(t) : t;
          if (!n) throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ''), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ':' + e;
            const s = wi[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = wi[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & (Pn.DashCase | Pn.Important)
            ? t.style.setProperty(e, n, r & Pn.Important ? 'important' : '')
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & Pn.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, ki(n))
            : this.eventManager.addEventListener(t, e, ki(n));
        }
      }
      class Si extends Ti {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = xi(r + '-' + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = '_ngcontent-%COMP%'.replace(Ci, r + '-' + n.id)),
            (this.hostAttr = '_nghost-%COMP%'.replace(Ci, r + '-' + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ''), n;
        }
      }
      class Ii extends Ti {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({mode: 'open'})),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = xi(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const t = document.createElement('style');
            (t.textContent = s[o]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
        }
      }
      let Ai = (() => {
        class t extends yi {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n);
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(ri));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const Oi = ['alt', 'control', 'meta', 'shift'],
        Di = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Pi = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        Mi = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Hi = (() => {
        class t extends yi {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              o = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ni().onAndCancel(e, s.domEventName, o));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split('.'),
              r = n.shift();
            if (0 === n.length || ('keydown' !== r && 'keyup' !== r)) return null;
            const s = t._normalizeKey(n.pop());
            let o = '';
            if (
              (Oi.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (o += t + '.'));
              }),
              (o += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const i = {};
            return (i.domEventName = r), (i.fullKey = o), i;
          }
          static getEventFullKey(t) {
            let e = '',
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return 'Unidentified';
                  e.startsWith('U+') &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Pi.hasOwnProperty(e) && (e = Pi[e]));
                }
                return Di[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              ' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
              Oi.forEach((r) => {
                r != n && (0, Mi[r])(t) && (e += r + '.');
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case 'esc':
                return 'escape';
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(ri));
          }),
          (t.ɵprov = Y({token: t, factory: t.ɵfac})),
          t
        );
      })();
      const ji = Wo(Yo, 'browser', [
          {provide: _o, useValue: 'browser'},
          {
            provide: go,
            useValue: function () {
              ui.makeCurrent(), fi.init();
            },
            multi: !0,
          },
          {
            provide: ri,
            useFactory: function () {
              return (
                (function (t) {
                  Qt = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Ri = [
          [],
          {provide: Br, useValue: 'root'},
          {
            provide: An,
            useFactory: function () {
              return new An();
            },
            deps: [],
          },
          {provide: gi, useClass: Ai, multi: !0, deps: [ri, Do, _o]},
          {provide: gi, useClass: Hi, multi: !0, deps: [ri]},
          [],
          {provide: Ei, useClass: Ei, deps: [_i, bi, ho]},
          {provide: Is, useExisting: Ei},
          {provide: mi, useExisting: bi},
          {provide: bi, useClass: bi, deps: [ri]},
          {provide: Fo, useClass: Fo, deps: [Do]},
          {provide: _i, useClass: _i, deps: [gi, Do]},
          {provide: class {}, useClass: pi, deps: []},
          [],
        ];
      let Ni = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [{provide: ho, useValue: e.appId}, {provide: hi, useExisting: ho}, di],
            };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(t, 12));
          }),
          (t.ɵmod = Mt({type: t})),
          (t.ɵinj = X({providers: Ri, imports: [li, ti]})),
          t
        );
      })();
      'undefined' != typeof window && window;
      let Fi = (() => {
          class t {
            constructor() {
              this.title = 'ngx-rime-app';
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = At({
              type: t,
              selectors: [['ngx-rime-root']],
              decls: 61,
              vars: 1,
              consts: [
                [1, 'flex'],
                ['width', '40', 'height', '40', 'viewBox', '0 0 262 163'],
                [
                  'id',
                  'Path',
                  'fill',
                  '#ffffff',
                  'points',
                  '130.68 104.59 97.49 52.71 97.44 96.3 40.24 0 0 0 0 162.57 39.79 162.57 39.92 66.39 96.53 158.26',
                ],
                [
                  'id',
                  'Path',
                  'fill',
                  '#ffffff',
                  'points',
                  '97.5 41.79 137.24 41.79 137.33 41.33 137.33 0 97.54 0 97.49 41.33',
                ],
                [
                  'd',
                  'M198.66,86.86 C189.139872,86.6795216 180.538723,92.516445 177.19,101.43 C182.764789,93.0931021 193.379673,89.7432211 202.73,93.37 C207.05,95.13 212.73,97.97 217.23,96.45 C212.950306,90.4438814 206.034895,86.8725952 198.66,86.86 L198.66,86.86 Z',
                  'id',
                  'Path',
                  'fill',
                  '#96D8E9',
                ],
                [
                  'd',
                  'M243.75,106.42 C243.75,101.55 241.1,100.42 235.6,98.42 C231.52,97 226.89,95.4 223.52,91 C222.86,90.13 222.25,89.15 221.6,88.11 C220.14382,85.4164099 218.169266,83.037429 215.79,81.11 C212.58,78.75 208.37,77.6 202.91,77.6 C191.954261,77.6076705 182.084192,84.2206169 177.91,94.35 C183.186964,87.0278244 191.956716,83.0605026 200.940147,83.9314609 C209.923578,84.8024193 217.767888,90.3805017 221.54,98.58 C223.424615,101.689762 227.141337,103.174819 230.65,102.22 C236.02,101.07 235.65,106.15 243.76,107.87 L243.75,106.42 Z',
                  'id',
                  'Path',
                  'fill',
                  '#48C4E5',
                ],
                [
                  'd',
                  'M261.46,105.38 L261.46,105.27 C261.34,73.03 235.17,45.45 202.91,45.45 C183.207085,45.4363165 164.821777,55.3450614 154,71.81 L153.79,71.45 L137.23,45.45 L97.5,45.4499858 L135.25,104.57 L98.41,162.57 L137,162.57 L153.79,136.78 L170.88,162.57 L209.48,162.57 L174.48,107.49 C173.899005,106.416838 173.583536,105.220114 173.56,104 C173.557346,96.2203871 176.64661,88.7586448 182.147627,83.2576275 C187.648645,77.7566101 195.110387,74.6673462 202.89,74.67 C219.11,74.67 221.82,84.37 225.32,88.93 C232.23,97.93 246.03,93.99 246.03,105.73 L246.03,105.73 C246.071086,108.480945 247.576662,111.001004 249.979593,112.340896 C252.382524,113.680787 255.317747,113.636949 257.679593,112.225896 C260.041438,110.814842 261.471086,108.250945 261.43,105.5 L261.43,105.5 L261.43,105.38 L261.46,105.38 Z',
                  'id',
                  'Path',
                  'fill',
                  '#ffffff',
                ],
                [
                  'd',
                  'M261.5,113.68 C261.892278,116.421801 261.504116,119.218653 260.38,121.75 C258.18,126.84 254.51,125.14 254.51,125.14 C254.51,125.14 251.35,123.6 253.27,120.65 C255.4,117.36 259.61,117.74 261.5,113.68 Z',
                  'id',
                  'Path',
                  'fill',
                  '#022f56',
                ],
                [1, 'flex', 'github-star-container'],
                [
                  'href',
                  'https://github.com/nrwl/nx',
                  'target',
                  '_blank',
                  'rel',
                  'noopener noreferrer',
                ],
                [1, 'github-star-badge'],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '24',
                  'height',
                  '24',
                  'viewBox',
                  '0 0 24 24',
                  1,
                  'material-icons',
                ],
                ['d', 'M0 0h24v24H0z', 'fill', 'none'],
                [
                  'd',
                  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
                ],
                [1, 'resources'],
                [1, 'col-span-2'],
                ['href', 'https://nxplaybook.com/p/nx-workspaces', 1, 'resource', 'flex'],
                [
                  'href',
                  'https://nx.dev/latest/angular/getting-started/intro',
                  1,
                  'resource',
                  'flex',
                ],
                [
                  'href',
                  'https://nx.dev/latest/angular/tutorial/01-create-application',
                  1,
                  'resource',
                  'flex',
                ],
                ['href', 'https://nx.app/', 1, 'resource', 'flex'],
                [
                  'width',
                  '36',
                  'height',
                  '36',
                  'viewBox',
                  '0 0 120 120',
                  'fill',
                  'none',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                ],
                [
                  'd',
                  'M120 15V30C103.44 30 90 43.44 90 60C90 76.56 76.56 90 60 90C43.44 90 30 103.44 30 120H15C6.72 120 0 113.28 0 105V15C0 6.72 6.72 0 15 0H105C113.28 0 120 6.72 120 15Z',
                  'fill',
                  '#0E2039',
                ],
                [
                  'd',
                  'M120 30V105C120 113.28 113.28 120 105 120H30C30 103.44 43.44 90 60 90C76.56 90 90 76.56 90 60C90 43.44 103.44 30 120 30Z',
                  'fill',
                  'white',
                ],
                [1, 'gutter-left'],
                ['open', ''],
              ],
              template: function (t, e) {
                1 & t &&
                  (ls(0, 'header', 0),
                  Ie(),
                  ls(1, 'svg', 1),
                  cs(2, 'polygon', 2),
                  cs(3, 'polygon', 3),
                  cs(4, 'path', 4),
                  cs(5, 'path', 5),
                  cs(6, 'path', 6),
                  cs(7, 'path', 7),
                  us(),
                  Ae(),
                  ls(8, 'h1'),
                  hs(9),
                  us(),
                  us(),
                  ls(10, 'main'),
                  ls(11, 'h2'),
                  hs(12, 'Resources & Tools'),
                  us(),
                  ls(13, 'p'),
                  hs(14, 'Thank you for using and showing some \u2665 for Nx.'),
                  us(),
                  ls(15, 'div', 8),
                  ls(16, 'a', 9),
                  hs(17, ' If you like Nx, please give it a star: '),
                  ls(18, 'div', 10),
                  Ie(),
                  ls(19, 'svg', 11),
                  cs(20, 'path', 12),
                  cs(21, 'path', 13),
                  us(),
                  hs(22, ' Star '),
                  us(),
                  us(),
                  us(),
                  Ae(),
                  ls(23, 'p'),
                  hs(24, 'Here are some links to help you get started.'),
                  us(),
                  ls(25, 'ul', 14),
                  ls(26, 'li', 15),
                  ls(27, 'a', 16),
                  hs(28, ' Nx video course '),
                  us(),
                  us(),
                  ls(29, 'li', 15),
                  ls(30, 'a', 17),
                  hs(31, ' Nx video tutorial '),
                  us(),
                  us(),
                  ls(32, 'li', 15),
                  ls(33, 'a', 18),
                  hs(34, ' Interactive tutorial '),
                  us(),
                  us(),
                  ls(35, 'li', 15),
                  ls(36, 'a', 19),
                  Ie(),
                  ls(37, 'svg', 20),
                  cs(38, 'path', 21),
                  cs(39, 'path', 22),
                  us(),
                  Ae(),
                  ls(40, 'span', 23),
                  hs(41, 'Nx Cloud'),
                  us(),
                  us(),
                  us(),
                  us(),
                  ls(42, 'h2'),
                  hs(43, 'Next Steps'),
                  us(),
                  ls(44, 'p'),
                  hs(45, 'Here are some things you can do with Nx.'),
                  us(),
                  ls(46, 'details', 24),
                  ls(47, 'summary'),
                  hs(48, 'Add UI library'),
                  us(),
                  ls(49, 'pre'),
                  hs(
                    50,
                    '  # Generate UI lib\n  nx g @nrwl/angular:lib ui\n  \n  # Add a component\n  nx g @nrwl/angular:component xyz --project ui'
                  ),
                  us(),
                  us(),
                  ls(51, 'details'),
                  ls(52, 'summary'),
                  hs(53, 'View dependency graph'),
                  us(),
                  ls(54, 'pre'),
                  hs(55, 'nx dep-graph'),
                  us(),
                  us(),
                  ls(56, 'details'),
                  ls(57, 'summary'),
                  hs(58, 'Run affected commands'),
                  us(),
                  ls(59, 'pre'),
                  hs(
                    60,
                    "  # see what's been affected by changes\n  nx affected:dep-graph\n  \n  # run tests for current changes\n  nx affected:test\n  \n  # run e2e tests for current changes\n  nx affected:e2e\n  "
                  ),
                  us(),
                  us(),
                  us()),
                  2 & t && (9, ar(ue(), le(), Te() + 9, fe()), ds('Welcome to ', e.title, '!'));
              },
              styles: [
                '[_nghost-%COMP%]{display:block;font-family:sans-serif;min-width:300px;max-width:600px;margin:50px auto}.gutter-left[_ngcontent-%COMP%]{margin-left:9px}.col-span-2[_ngcontent-%COMP%]{grid-column:span 2}.flex[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}header[_ngcontent-%COMP%]{background-color:#143055;color:#fff;padding:5px;border-radius:3px}main[_ngcontent-%COMP%]{padding:0 36px}h1[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{text-align:center}h1[_ngcontent-%COMP%]{margin-left:18px;font-size:24px}h2[_ngcontent-%COMP%]{font-size:20px;margin:40px 0 10px}.resources[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center}.resources[_ngcontent-%COMP%]{list-style:none;padding:0;display:grid;grid-gap:9px;grid-template-columns:1fr 1fr}.resource[_ngcontent-%COMP%]{color:#0094ba;height:36px;background-color:transparent;border:1px solid rgba(0,0,0,.12);border-radius:4px;padding:3px 9px;text-decoration:none}.resource[_ngcontent-%COMP%]:hover{background-color:rgba(68,138,255,.04)}pre[_ngcontent-%COMP%]{padding:9px;background-color:#000;color:#eee}details[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{border-radius:4px}details[_ngcontent-%COMP%]{color:#333;background-color:transparent;border:1px solid rgba(0,0,0,.12);padding:3px 9px;margin-bottom:9px}summary[_ngcontent-%COMP%]{cursor:pointer;outline:none;height:36px;line-height:36px}.github-star-container[_ngcontent-%COMP%]{margin-top:12px;line-height:20px}.github-star-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;align-items:center;text-decoration:none;color:#333}.github-star-badge[_ngcontent-%COMP%]{color:#24292e;display:flex;align-items:center;font-size:12px;padding:3px 10px;border:1px solid rgba(27,31,35,.2);border-radius:3px;background-image:linear-gradient(-180deg,#fafbfc,#eff3f6 90%);margin-left:4px;font-weight:600}.github-star-badge[_ngcontent-%COMP%]:hover{background-image:linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);border-color:rgba(27,31,35,.35);background-position:-.5em}.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{height:16px;width:16px;margin-right:4px}',
              ],
            })),
            t
          );
        })(),
        Vi = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = Mt({type: t, bootstrap: [Fi]})),
            (t.ɵinj = X({providers: [], imports: [[Ni]]})),
            t
          );
        })();
      (function () {
        if (zo) throw new Error('Cannot enable prod mode after platform setup.');
        $o = !1;
      })(),
        ji()
          .bootstrapModule(Vi)
          .catch((t) => console.error(t));
    },
  },
  (t) => {
    'use strict';
    t((t.s = 99));
  },
]);
