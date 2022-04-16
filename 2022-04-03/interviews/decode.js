var r = this;
var i = function () {
    function e(e) {
        return e.subarray(0, e.byteLength - e[e.byteLength - 1])
    }

    var t = function e(t, r) {
        if (!(t instanceof r)) {
            throw new TypeError("Cannot call a class as a function")
        }
    };
    var i = function () {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                i.enumerable = i.enumerable || false;
                i.configurable = true;
                if ("value" in i) i.writable = true;
                Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, r, i) {
            if (r) e(t.prototype, r);
            if (i) e(t, i);
            return t
        }
    }();
    var n = function e(t, r) {
        if (typeof r !== "function" && r !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof r)
        }
        t.prototype = Object.create(r && r.prototype, {
            constructor: {
                value: t,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (r) Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r
    };
    var a = function e(t, r) {
        if (!t) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        }
        return r && (typeof r === "object" || typeof r === "function") ? r : t
    };
    var s = function e() {
        var t = [[[], [], [], [], []], [[], [], [], [], []]];
        var r = t[0];
        var i = t[1];
        var n = r[4];
        var a = i[4];
        var s = void 0;
        var o = void 0;
        var u = void 0;
        var l = [];
        var d = [];
        var f = void 0;
        var c = void 0;
        var h = void 0;
        var p = void 0;
        var v = void 0;
        var m = void 0;
        for (s = 0; s < 256; s++) {
            d[(l[s] = s << 1 ^ (s >> 7) * 283) ^ s] = s
        }
        for (o = u = 0; !n[o]; o ^= f || 1, u = d[u] || 1) {
            p = u ^ u << 1 ^ u << 2 ^ u << 3 ^ u << 4;
            p = p >> 8 ^ p & 255 ^ 99;
            n[o] = p;
            a[p] = o;
            h = l[c = l[f = l[o]]];
            m = h * 16843009 ^ c * 65537 ^ f * 257 ^ o * 16843008;
            v = l[p] * 257 ^ p * 16843008;
            for (s = 0; s < 4; s++) {
                r[s][o] = v = v << 24 ^ v >>> 8;
                i[s][p] = m = m << 24 ^ m >>> 8
            }
        }
        for (s = 0; s < 5; s++) {
            r[s] = r[s].slice(0);
            i[s] = i[s].slice(0)
        }
        return t
    };
    var o = null;
    var u = function () {
        function e(r) {
            t(this, e);
            if (!o) {
                o = s()
            }
            this._tables = [[o[0][0].slice(), o[0][1].slice(), o[0][2].slice(), o[0][3].slice(), o[0][4].slice()], [o[1][0].slice(), o[1][1].slice(), o[1][2].slice(), o[1][3].slice(), o[1][4].slice()]];
            var i = void 0;
            var n = void 0;
            var a = void 0;
            var u = void 0;
            var l = void 0;
            var d = this._tables[0][4];
            var f = this._tables[1];
            var c = r.length;
            var h = 1;
            if (c !== 4 && c !== 6 && c !== 8) {
                throw new Error("Invalid aes key size")
            }
            u = r.slice(0);
            l = [];
            this._key = [u, l];
            for (i = c; i < 4 * c + 28; i++) {
                a = u[i - 1];
                if (i % c === 0 || c === 8 && i % c === 4) {
                    a = d[a >>> 24] << 24 ^ d[a >> 16 & 255] << 16 ^ d[a >> 8 & 255] << 8 ^ d[a & 255];
                    if (i % c === 0) {
                        a = a << 8 ^ a >>> 24 ^ h << 24;
                        h = h << 1 ^ (h >> 7) * 283
                    }
                }
                u[i] = u[i - c] ^ a
            }
            for (n = 0; i; n++, i--) {
                a = u[n & 3 ? i : i - 4];
                if (i <= 4 || n < 4) {
                    l[n] = a
                } else {
                    l[n] = f[0][d[a >>> 24]] ^ f[1][d[a >> 16 & 255]] ^ f[2][d[a >> 8 & 255]] ^ f[3][d[a & 255]]
                }
            }
        }

        e.prototype.decrypt = function e(t, r, i, n, a, s) {
            var o = this._key[1];
            var u = t ^ o[0];
            var l = n ^ o[1];
            var d = i ^ o[2];
            var f = r ^ o[3];
            var c = void 0;
            var h = void 0;
            var p = void 0;
            var v = o.length / 4 - 2;
            var m = void 0;
            var g = 4;
            var y = this._tables[1];
            var _ = y[0];
            var b = y[1];
            var T = y[2];
            var S = y[3];
            var E = y[4];
            for (m = 0; m < v; m++) {
                c = _[u >>> 24] ^ b[l >> 16 & 255] ^ T[d >> 8 & 255] ^ S[f & 255] ^ o[g];
                h = _[l >>> 24] ^ b[d >> 16 & 255] ^ T[f >> 8 & 255] ^ S[u & 255] ^ o[g + 1];
                p = _[d >>> 24] ^ b[f >> 16 & 255] ^ T[u >> 8 & 255] ^ S[l & 255] ^ o[g + 2];
                f = _[f >>> 24] ^ b[u >> 16 & 255] ^ T[l >> 8 & 255] ^ S[d & 255] ^ o[g + 3];
                g += 4;
                u = c;
                l = h;
                d = p
            }
            for (m = 0; m < 4; m++) {
                a[(3 & -m) + s] = E[u >>> 24] << 24 ^ E[l >> 16 & 255] << 16 ^ E[d >> 8 & 255] << 8 ^ E[f & 255] ^ o[g++];
                c = u;
                u = l;
                l = d;
                d = f;
                f = c
            }
        };
        return e
    }();
    var l = function () {
        function e() {
            t(this, e);
            this.listeners = {}
        }

        e.prototype.on = function e(t, r) {
            if (!this.listeners[t]) {
                this.listeners[t] = []
            }
            this.listeners[t].push(r)
        };
        e.prototype.off = function e(t, r) {
            if (!this.listeners[t]) {
                return false
            }
            var i = this.listeners[t].indexOf(r);
            this.listeners[t].splice(i, 1);
            return i > -1
        };
        e.prototype.trigger = function e(t) {
            var r = this.listeners[t];
            if (!r) {
                return
            }
            if (arguments.length === 2) {
                var i = r.length;
                for (var n = 0; n < i; ++n) {
                    r[n].call(this, arguments[1])
                }
            } else {
                var a = Array.prototype.slice.call(arguments, 1);
                var s = r.length;
                for (var o = 0; o < s; ++o) {
                    r[o].apply(this, a)
                }
            }
        };
        e.prototype.dispose = function e() {
            this.listeners = {}
        };
        e.prototype.pipe = function e(t) {
            this.on("data", (function (e) {
                t.push(e)
            }))
        };
        return e
    }();
    var d = function (e) {
        n(r, e);

        function r() {
            t(this, r);
            var i = a(this, e.call(this, l));
            i.jobs = [];
            i.delay = 1;
            i.timeout_ = null;
            return i
        }

        r.prototype.processJob_ = function e() {
            this.jobs.shift()();
            if (this.jobs.length) {
                this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay)
            } else {
                this.timeout_ = null
            }
        };
        r.prototype.push = function e(t) {
            this.jobs.push(t);
            if (!this.timeout_) {
                this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay)
            }
        };
        return r
    }(l);
    var f = function e(t) {
        return t << 24 | (t & 65280) << 8 | (t & 16711680) >> 8 | t >>> 24
    };
    var c = function e(t, r, i) {
        var n = new Int32Array(t.buffer, t.byteOffset, t.byteLength >> 2);
        var a = new u(Array.prototype.slice.call(r));
        var s = new Uint8Array(t.byteLength);
        var o = new Int32Array(s.buffer);
        var l = void 0;
        var d = void 0;
        var c = void 0;
        var h = void 0;
        var p = void 0;
        var v = void 0;
        var m = void 0;
        var g = void 0;
        var y = void 0;
        l = i[0];
        d = i[1];
        c = i[2];
        h = i[3];
        for (y = 0; y < n.length; y += 4) {
            p = f(n[y]);
            v = f(n[y + 1]);
            m = f(n[y + 2]);
            g = f(n[y + 3]);
            a.decrypt(p, v, m, g, o, y);
            o[y] = f(o[y] ^ l);
            o[y + 1] = f(o[y + 1] ^ d);
            o[y + 2] = f(o[y + 2] ^ c);
            o[y + 3] = f(o[y + 3] ^ h);
            l = p;
            d = v;
            c = m;
            h = g
        }
        return s
    };
    var h = function () {
        function r(i, n, a, s) {
            t(this, r);
            var o = r.STEP;
            var u = new Int32Array(i.buffer);
            var l = new Uint8Array(i.byteLength);
            var c = 0;
            this.asyncStream_ = new d;
            this.asyncStream_.push(this.decryptChunk_(u.subarray(c, c + o), n, a, l));
            for (c = o; c < u.length; c += o) {
                a = new Uint32Array([f(u[c - 4]), f(u[c - 3]), f(u[c - 2]), f(u[c - 1])]);
                this.asyncStream_.push(this.decryptChunk_(u.subarray(c, c + o), n, a, l))
            }
            this.asyncStream_.push((function () {
                s(null, e(l))
            }))
        }

        r.prototype.decryptChunk_ = function e(t, r, i, n) {
            return function () {
                var e = c(t, r, i);
                n.set(e, t.byteOffset)
            }
        };
        i(r, null, [{
            key: "STEP", get: function e() {
                return 32e3
            }
        }]);
        return r
    }();
    var p = function e(t) {
        var r = {};
        Object.keys(t).forEach((function (e) {
            var i = t[e];
            if (ArrayBuffer.isView(i)) {
                r[e] = {bytes: i.buffer, byteOffset: i.byteOffset, byteLength: i.byteLength}
            } else {
                r[e] = i
            }
        }));
        return r
    };
    var v = function e(t) {
        t.onmessage = function (e) {
            var r = e.data;
            var i = new Uint8Array(r.encrypted.bytes, r.encrypted.byteOffset, r.encrypted.byteLength);
            var n = new Uint32Array(r.key.bytes, r.key.byteOffset, r.key.byteLength / 4);
            var a = new Uint32Array(r.iv.bytes, r.iv.byteOffset, r.iv.byteLength / 4);
            new h(i, n, a, (function (e, i) {
                t.postMessage(p({source: r.source, decrypted: i}), [i.buffer])
            }))
        }
    };
    var m = new v(r);
    return m
}()