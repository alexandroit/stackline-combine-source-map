"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js
var require_resolve_uri_umd = __commonJS({
  "node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.resolveURI = factory());
    })(exports2, (function() {
      "use strict";
      const schemeRegex = /^[\w+.-]+:\/\//;
      const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
      const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function isAbsoluteUrl(input) {
        return schemeRegex.test(input);
      }
      function isSchemeRelativeUrl(input) {
        return input.startsWith("//");
      }
      function isAbsolutePath(input) {
        return input.startsWith("/");
      }
      function isFileUrl(input) {
        return input.startsWith("file:");
      }
      function isRelative(input) {
        return /^[.?#]/.test(input);
      }
      function parseAbsoluteUrl(input) {
        const match = urlRegex.exec(input);
        return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
      }
      function parseFileUrl(input) {
        const match = fileRegex.exec(input);
        const path = match[2];
        return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match[3] || "", match[4] || "");
      }
      function makeUrl(scheme, user, host, port, path, query, hash) {
        return {
          scheme,
          user,
          host,
          port,
          path,
          query,
          hash,
          type: 7
        };
      }
      function parseUrl(input) {
        if (isSchemeRelativeUrl(input)) {
          const url2 = parseAbsoluteUrl("http:" + input);
          url2.scheme = "";
          url2.type = 6;
          return url2;
        }
        if (isAbsolutePath(input)) {
          const url2 = parseAbsoluteUrl("http://foo.com" + input);
          url2.scheme = "";
          url2.host = "";
          url2.type = 5;
          return url2;
        }
        if (isFileUrl(input))
          return parseFileUrl(input);
        if (isAbsoluteUrl(input))
          return parseAbsoluteUrl(input);
        const url = parseAbsoluteUrl("http://foo.com/" + input);
        url.scheme = "";
        url.host = "";
        url.type = input ? input.startsWith("?") ? 3 : input.startsWith("#") ? 2 : 4 : 1;
        return url;
      }
      function stripPathFilename(path) {
        if (path.endsWith("/.."))
          return path;
        const index = path.lastIndexOf("/");
        return path.slice(0, index + 1);
      }
      function mergePaths(url, base) {
        normalizePath(base, base.type);
        if (url.path === "/") {
          url.path = base.path;
        } else {
          url.path = stripPathFilename(base.path) + url.path;
        }
      }
      function normalizePath(url, type) {
        const rel = type <= 4;
        const pieces = url.path.split("/");
        let pointer = 1;
        let positive = 0;
        let addTrailingSlash = false;
        for (let i = 1; i < pieces.length; i++) {
          const piece = pieces[i];
          if (!piece) {
            addTrailingSlash = true;
            continue;
          }
          addTrailingSlash = false;
          if (piece === ".")
            continue;
          if (piece === "..") {
            if (positive) {
              addTrailingSlash = true;
              positive--;
              pointer--;
            } else if (rel) {
              pieces[pointer++] = piece;
            }
            continue;
          }
          pieces[pointer++] = piece;
          positive++;
        }
        let path = "";
        for (let i = 1; i < pointer; i++) {
          path += "/" + pieces[i];
        }
        if (!path || addTrailingSlash && !path.endsWith("/..")) {
          path += "/";
        }
        url.path = path;
      }
      function resolve(input, base) {
        if (!input && !base)
          return "";
        const url = parseUrl(input);
        let inputType = url.type;
        if (base && inputType !== 7) {
          const baseUrl = parseUrl(base);
          const baseType = baseUrl.type;
          switch (inputType) {
            case 1:
              url.hash = baseUrl.hash;
            // fall through
            case 2:
              url.query = baseUrl.query;
            // fall through
            case 3:
            case 4:
              mergePaths(url, baseUrl);
            // fall through
            case 5:
              url.user = baseUrl.user;
              url.host = baseUrl.host;
              url.port = baseUrl.port;
            // fall through
            case 6:
              url.scheme = baseUrl.scheme;
          }
          if (baseType > inputType)
            inputType = baseType;
        }
        normalizePath(url, inputType);
        const queryHash = url.query + url.hash;
        switch (inputType) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return queryHash;
          case 4: {
            const path = url.path.slice(1);
            if (!path)
              return queryHash || ".";
            if (isRelative(base || input) && !isRelative(path)) {
              return "./" + path + queryHash;
            }
            return path + queryHash;
          }
          case 5:
            return url.path + queryHash;
          default:
            return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
        }
      }
      return resolve;
    }));
  }
});

// node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js
var require_sourcemap_codec_umd = __commonJS({
  "node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js"(exports2, module2) {
    (function(global, factory) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        factory(module2);
        module2.exports = def(module2);
      } else if (typeof define === "function" && define.amd) {
        define(["module"], function(mod) {
          factory.apply(this, arguments);
          mod.exports = def(mod);
        });
      } else {
        const mod = { exports: {} };
        factory(mod);
        global = typeof globalThis !== "undefined" ? globalThis : global || self;
        global.sourcemapCodec = def(mod);
      }
      function def(m) {
        return "default" in m.exports ? m.exports.default : m.exports;
      }
    })(exports2, (function(module3) {
      "use strict";
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
      var sourcemap_codec_exports = {};
      __export(sourcemap_codec_exports, {
        decode: () => decode,
        decodeGeneratedRanges: () => decodeGeneratedRanges,
        decodeOriginalScopes: () => decodeOriginalScopes,
        encode: () => encode,
        encodeGeneratedRanges: () => encodeGeneratedRanges,
        encodeOriginalScopes: () => encodeOriginalScopes
      });
      module3.exports = __toCommonJS(sourcemap_codec_exports);
      var comma = ",".charCodeAt(0);
      var semicolon = ";".charCodeAt(0);
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var intToChar = new Uint8Array(64);
      var charToInt = new Uint8Array(128);
      for (let i = 0; i < chars.length; i++) {
        const c = chars.charCodeAt(i);
        intToChar[i] = c;
        charToInt[c] = i;
      }
      function decodeInteger(reader, relative) {
        let value = 0;
        let shift = 0;
        let integer = 0;
        do {
          const c = reader.next();
          integer = charToInt[c];
          value |= (integer & 31) << shift;
          shift += 5;
        } while (integer & 32);
        const shouldNegate = value & 1;
        value >>>= 1;
        if (shouldNegate) {
          value = -2147483648 | -value;
        }
        return relative + value;
      }
      function encodeInteger(builder, num, relative) {
        let delta = num - relative;
        delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
        do {
          let clamped = delta & 31;
          delta >>>= 5;
          if (delta > 0) clamped |= 32;
          builder.write(intToChar[clamped]);
        } while (delta > 0);
        return num;
      }
      function hasMoreVlq(reader, max) {
        if (reader.pos >= max) return false;
        return reader.peek() !== comma;
      }
      var bufLength = 1024 * 16;
      var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
        decode(buf) {
          const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
          return out.toString();
        }
      } : {
        decode(buf) {
          let out = "";
          for (let i = 0; i < buf.length; i++) {
            out += String.fromCharCode(buf[i]);
          }
          return out;
        }
      };
      var StringWriter = class {
        constructor() {
          this.pos = 0;
          this.out = "";
          this.buffer = new Uint8Array(bufLength);
        }
        write(v) {
          const { buffer } = this;
          buffer[this.pos++] = v;
          if (this.pos === bufLength) {
            this.out += td.decode(buffer);
            this.pos = 0;
          }
        }
        flush() {
          const { buffer, out, pos } = this;
          return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
        }
      };
      var StringReader = class {
        constructor(buffer) {
          this.pos = 0;
          this.buffer = buffer;
        }
        next() {
          return this.buffer.charCodeAt(this.pos++);
        }
        peek() {
          return this.buffer.charCodeAt(this.pos);
        }
        indexOf(char) {
          const { buffer, pos } = this;
          const idx = buffer.indexOf(char, pos);
          return idx === -1 ? buffer.length : idx;
        }
      };
      var EMPTY = [];
      function decodeOriginalScopes(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const scopes = [];
        const stack = [];
        let line = 0;
        for (; reader.pos < length; reader.pos++) {
          line = decodeInteger(reader, line);
          const column = decodeInteger(reader, 0);
          if (!hasMoreVlq(reader, length)) {
            const last = stack.pop();
            last[2] = line;
            last[3] = column;
            continue;
          }
          const kind = decodeInteger(reader, 0);
          const fields = decodeInteger(reader, 0);
          const hasName = fields & 1;
          const scope = hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind];
          let vars = EMPTY;
          if (hasMoreVlq(reader, length)) {
            vars = [];
            do {
              const varsIndex = decodeInteger(reader, 0);
              vars.push(varsIndex);
            } while (hasMoreVlq(reader, length));
          }
          scope.vars = vars;
          scopes.push(scope);
          stack.push(scope);
        }
        return scopes;
      }
      function encodeOriginalScopes(scopes) {
        const writer = new StringWriter();
        for (let i = 0; i < scopes.length; ) {
          i = _encodeOriginalScopes(scopes, i, writer, [0]);
        }
        return writer.flush();
      }
      function _encodeOriginalScopes(scopes, index, writer, state) {
        const scope = scopes[index];
        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
        if (index > 0) writer.write(comma);
        state[0] = encodeInteger(writer, startLine, state[0]);
        encodeInteger(writer, startColumn, 0);
        encodeInteger(writer, kind, 0);
        const fields = scope.length === 6 ? 1 : 0;
        encodeInteger(writer, fields, 0);
        if (scope.length === 6) encodeInteger(writer, scope[5], 0);
        for (const v of vars) {
          encodeInteger(writer, v, 0);
        }
        for (index++; index < scopes.length; ) {
          const next = scopes[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeOriginalScopes(scopes, index, writer, state);
        }
        writer.write(comma);
        state[0] = encodeInteger(writer, endLine, state[0]);
        encodeInteger(writer, endColumn, 0);
        return index;
      }
      function decodeGeneratedRanges(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const ranges = [];
        const stack = [];
        let genLine = 0;
        let definitionSourcesIndex = 0;
        let definitionScopeIndex = 0;
        let callsiteSourcesIndex = 0;
        let callsiteLine = 0;
        let callsiteColumn = 0;
        let bindingLine = 0;
        let bindingColumn = 0;
        do {
          const semi = reader.indexOf(";");
          let genColumn = 0;
          for (; reader.pos < semi; reader.pos++) {
            genColumn = decodeInteger(reader, genColumn);
            if (!hasMoreVlq(reader, semi)) {
              const last = stack.pop();
              last[2] = genLine;
              last[3] = genColumn;
              continue;
            }
            const fields = decodeInteger(reader, 0);
            const hasDefinition = fields & 1;
            const hasCallsite = fields & 2;
            const hasScope = fields & 4;
            let callsite = null;
            let bindings = EMPTY;
            let range;
            if (hasDefinition) {
              const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
              definitionScopeIndex = decodeInteger(
                reader,
                definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0
              );
              definitionSourcesIndex = defSourcesIndex;
              range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
            } else {
              range = [genLine, genColumn, 0, 0];
            }
            range.isScope = !!hasScope;
            if (hasCallsite) {
              const prevCsi = callsiteSourcesIndex;
              const prevLine = callsiteLine;
              callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
              const sameSource = prevCsi === callsiteSourcesIndex;
              callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
              callsiteColumn = decodeInteger(
                reader,
                sameSource && prevLine === callsiteLine ? callsiteColumn : 0
              );
              callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
            }
            range.callsite = callsite;
            if (hasMoreVlq(reader, semi)) {
              bindings = [];
              do {
                bindingLine = genLine;
                bindingColumn = genColumn;
                const expressionsCount = decodeInteger(reader, 0);
                let expressionRanges;
                if (expressionsCount < -1) {
                  expressionRanges = [[decodeInteger(reader, 0)]];
                  for (let i = -1; i > expressionsCount; i--) {
                    const prevBl = bindingLine;
                    bindingLine = decodeInteger(reader, bindingLine);
                    bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
                    const expression = decodeInteger(reader, 0);
                    expressionRanges.push([expression, bindingLine, bindingColumn]);
                  }
                } else {
                  expressionRanges = [[expressionsCount]];
                }
                bindings.push(expressionRanges);
              } while (hasMoreVlq(reader, semi));
            }
            range.bindings = bindings;
            ranges.push(range);
            stack.push(range);
          }
          genLine++;
          reader.pos = semi + 1;
        } while (reader.pos < length);
        return ranges;
      }
      function encodeGeneratedRanges(ranges) {
        if (ranges.length === 0) return "";
        const writer = new StringWriter();
        for (let i = 0; i < ranges.length; ) {
          i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
        }
        return writer.flush();
      }
      function _encodeGeneratedRanges(ranges, index, writer, state) {
        const range = ranges[index];
        const {
          0: startLine,
          1: startColumn,
          2: endLine,
          3: endColumn,
          isScope,
          callsite,
          bindings
        } = range;
        if (state[0] < startLine) {
          catchupLine(writer, state[0], startLine);
          state[0] = startLine;
          state[1] = 0;
        } else if (index > 0) {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, range[1], state[1]);
        const fields = (range.length === 6 ? 1 : 0) | (callsite ? 2 : 0) | (isScope ? 4 : 0);
        encodeInteger(writer, fields, 0);
        if (range.length === 6) {
          const { 4: sourcesIndex, 5: scopesIndex } = range;
          if (sourcesIndex !== state[2]) {
            state[3] = 0;
          }
          state[2] = encodeInteger(writer, sourcesIndex, state[2]);
          state[3] = encodeInteger(writer, scopesIndex, state[3]);
        }
        if (callsite) {
          const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
          if (sourcesIndex !== state[4]) {
            state[5] = 0;
            state[6] = 0;
          } else if (callLine !== state[5]) {
            state[6] = 0;
          }
          state[4] = encodeInteger(writer, sourcesIndex, state[4]);
          state[5] = encodeInteger(writer, callLine, state[5]);
          state[6] = encodeInteger(writer, callColumn, state[6]);
        }
        if (bindings) {
          for (const binding of bindings) {
            if (binding.length > 1) encodeInteger(writer, -binding.length, 0);
            const expression = binding[0][0];
            encodeInteger(writer, expression, 0);
            let bindingStartLine = startLine;
            let bindingStartColumn = startColumn;
            for (let i = 1; i < binding.length; i++) {
              const expRange = binding[i];
              bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
              bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
              encodeInteger(writer, expRange[0], 0);
            }
          }
        }
        for (index++; index < ranges.length; ) {
          const next = ranges[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeGeneratedRanges(ranges, index, writer, state);
        }
        if (state[0] < endLine) {
          catchupLine(writer, state[0], endLine);
          state[0] = endLine;
          state[1] = 0;
        } else {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, endColumn, state[1]);
        return index;
      }
      function catchupLine(writer, lastLine, line) {
        do {
          writer.write(semicolon);
        } while (++lastLine < line);
      }
      function decode(mappings) {
        const { length } = mappings;
        const reader = new StringReader(mappings);
        const decoded = [];
        let genColumn = 0;
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        do {
          const semi = reader.indexOf(";");
          const line = [];
          let sorted = true;
          let lastCol = 0;
          genColumn = 0;
          while (reader.pos < semi) {
            let seg;
            genColumn = decodeInteger(reader, genColumn);
            if (genColumn < lastCol) sorted = false;
            lastCol = genColumn;
            if (hasMoreVlq(reader, semi)) {
              sourcesIndex = decodeInteger(reader, sourcesIndex);
              sourceLine = decodeInteger(reader, sourceLine);
              sourceColumn = decodeInteger(reader, sourceColumn);
              if (hasMoreVlq(reader, semi)) {
                namesIndex = decodeInteger(reader, namesIndex);
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
              } else {
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
              }
            } else {
              seg = [genColumn];
            }
            line.push(seg);
            reader.pos++;
          }
          if (!sorted) sort(line);
          decoded.push(line);
          reader.pos = semi + 1;
        } while (reader.pos <= length);
        return decoded;
      }
      function sort(line) {
        line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[0] - b[0];
      }
      function encode(decoded) {
        const writer = new StringWriter();
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          if (i > 0) writer.write(semicolon);
          if (line.length === 0) continue;
          let genColumn = 0;
          for (let j = 0; j < line.length; j++) {
            const segment = line[j];
            if (j > 0) writer.write(comma);
            genColumn = encodeInteger(writer, segment[0], genColumn);
            if (segment.length === 1) continue;
            sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
            sourceLine = encodeInteger(writer, segment[2], sourceLine);
            sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
            if (segment.length === 4) continue;
            namesIndex = encodeInteger(writer, segment[4], namesIndex);
          }
        }
        return writer.flush();
      }
    }));
  }
});

// node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js
var require_trace_mapping_umd = __commonJS({
  "node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js"(exports2, module2) {
    (function(global, factory) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        factory(module2, require_resolve_uri_umd(), require_sourcemap_codec_umd());
        module2.exports = def(module2);
      } else if (typeof define === "function" && define.amd) {
        define(["module", "@jridgewell/resolve-uri", "@jridgewell/sourcemap-codec"], function(mod) {
          factory.apply(this, arguments);
          mod.exports = def(mod);
        });
      } else {
        const mod = { exports: {} };
        factory(mod, global.resolveURI, global.sourcemapCodec);
        global = typeof globalThis !== "undefined" ? globalThis : global || self;
        global.traceMapping = def(mod);
      }
      function def(m) {
        return "default" in m.exports ? m.exports.default : m.exports;
      }
    })(exports2, (function(module3, require_resolveURI, require_sourcemapCodec) {
      "use strict";
      var __create = Object.create;
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf = Object.getPrototypeOf;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __commonJS2 = (cb, mod) => function __require() {
        return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __export = (target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
      var require_sourcemap_codec = __commonJS2({
        "umd:@jridgewell/sourcemap-codec"(exports3, module22) {
          module22.exports = require_sourcemapCodec;
        }
      });
      var require_resolve_uri = __commonJS2({
        "umd:@jridgewell/resolve-uri"(exports3, module22) {
          module22.exports = require_resolveURI;
        }
      });
      var trace_mapping_exports = {};
      __export(trace_mapping_exports, {
        AnyMap: () => FlattenMap,
        FlattenMap: () => FlattenMap,
        GREATEST_LOWER_BOUND: () => GREATEST_LOWER_BOUND,
        LEAST_UPPER_BOUND: () => LEAST_UPPER_BOUND,
        TraceMap: () => TraceMap,
        allGeneratedPositionsFor: () => allGeneratedPositionsFor,
        decodedMap: () => decodedMap,
        decodedMappings: () => decodedMappings,
        eachMapping: () => eachMapping,
        encodedMap: () => encodedMap,
        encodedMappings: () => encodedMappings,
        generatedPositionFor: () => generatedPositionFor,
        isIgnored: () => isIgnored,
        originalPositionFor: () => originalPositionFor,
        presortedDecodedMap: () => presortedDecodedMap,
        sourceContentFor: () => sourceContentFor,
        traceSegment: () => traceSegment
      });
      module3.exports = __toCommonJS(trace_mapping_exports);
      var import_sourcemap_codec = __toESM(require_sourcemap_codec());
      var import_resolve_uri = __toESM(require_resolve_uri());
      function stripFilename(path) {
        if (!path) return "";
        const index = path.lastIndexOf("/");
        return path.slice(0, index + 1);
      }
      function resolver(mapUrl, sourceRoot) {
        const from = stripFilename(mapUrl);
        const prefix = sourceRoot ? sourceRoot + "/" : "";
        return (source) => (0, import_resolve_uri.default)(prefix + (source || ""), from);
      }
      var COLUMN = 0;
      var SOURCES_INDEX = 1;
      var SOURCE_LINE = 2;
      var SOURCE_COLUMN = 3;
      var NAMES_INDEX = 4;
      var REV_GENERATED_LINE = 1;
      var REV_GENERATED_COLUMN = 2;
      function maybeSort(mappings, owned) {
        const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
        if (unsortedIndex === mappings.length) return mappings;
        if (!owned) mappings = mappings.slice();
        for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
          mappings[i] = sortSegments(mappings[i], owned);
        }
        return mappings;
      }
      function nextUnsortedSegmentLine(mappings, start) {
        for (let i = start; i < mappings.length; i++) {
          if (!isSorted(mappings[i])) return i;
        }
        return mappings.length;
      }
      function isSorted(line) {
        for (let j = 1; j < line.length; j++) {
          if (line[j][COLUMN] < line[j - 1][COLUMN]) {
            return false;
          }
        }
        return true;
      }
      function sortSegments(line, owned) {
        if (!owned) line = line.slice();
        return line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[COLUMN] - b[COLUMN];
      }
      function buildBySources(decoded, memos) {
        const sources = memos.map(() => []);
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            if (seg.length === 1) continue;
            const sourceIndex2 = seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            const source = sources[sourceIndex2];
            const segs = source[sourceLine] || (source[sourceLine] = []);
            segs.push([sourceColumn, i, seg[COLUMN]]);
          }
        }
        for (let i = 0; i < sources.length; i++) {
          const source = sources[i];
          for (let j = 0; j < source.length; j++) {
            const line = source[j];
            if (line) line.sort(sortComparator);
          }
        }
        return sources;
      }
      var found = false;
      function binarySearch(haystack, needle, low, high) {
        while (low <= high) {
          const mid = low + (high - low >> 1);
          const cmp = haystack[mid][COLUMN] - needle;
          if (cmp === 0) {
            found = true;
            return mid;
          }
          if (cmp < 0) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
        found = false;
        return low - 1;
      }
      function upperBound(haystack, needle, index) {
        for (let i = index + 1; i < haystack.length; index = i++) {
          if (haystack[i][COLUMN] !== needle) break;
        }
        return index;
      }
      function lowerBound(haystack, needle, index) {
        for (let i = index - 1; i >= 0; index = i--) {
          if (haystack[i][COLUMN] !== needle) break;
        }
        return index;
      }
      function memoizedState() {
        return {
          lastKey: -1,
          lastNeedle: -1,
          lastIndex: -1
        };
      }
      function memoizedBinarySearch(haystack, needle, state, key) {
        const { lastKey, lastNeedle, lastIndex } = state;
        let low = 0;
        let high = haystack.length - 1;
        if (key === lastKey) {
          if (needle === lastNeedle) {
            found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
            return lastIndex;
          }
          if (needle >= lastNeedle) {
            low = lastIndex === -1 ? 0 : lastIndex;
          } else {
            high = lastIndex;
          }
        }
        state.lastKey = key;
        state.lastNeedle = needle;
        return state.lastIndex = binarySearch(haystack, needle, low, high);
      }
      function parse(map) {
        return typeof map === "string" ? JSON.parse(map) : map;
      }
      var FlattenMap = function(map, mapUrl) {
        const parsed = parse(map);
        if (!("sections" in parsed)) {
          return new TraceMap(parsed, mapUrl);
        }
        const mappings = [];
        const sources = [];
        const sourcesContent = [];
        const names = [];
        const ignoreList = [];
        recurse(
          parsed,
          mapUrl,
          mappings,
          sources,
          sourcesContent,
          names,
          ignoreList,
          0,
          0,
          Infinity,
          Infinity
        );
        const joined = {
          version: 3,
          file: parsed.file,
          names,
          sources,
          sourcesContent,
          mappings,
          ignoreList
        };
        return presortedDecodedMap(joined);
      };
      function recurse(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
        const { sections } = input;
        for (let i = 0; i < sections.length; i++) {
          const { map, offset } = sections[i];
          let sl = stopLine;
          let sc = stopColumn;
          if (i + 1 < sections.length) {
            const nextOffset = sections[i + 1].offset;
            sl = Math.min(stopLine, lineOffset + nextOffset.line);
            if (sl === stopLine) {
              sc = Math.min(stopColumn, columnOffset + nextOffset.column);
            } else if (sl < stopLine) {
              sc = columnOffset + nextOffset.column;
            }
          }
          addSection(
            map,
            mapUrl,
            mappings,
            sources,
            sourcesContent,
            names,
            ignoreList,
            lineOffset + offset.line,
            columnOffset + offset.column,
            sl,
            sc
          );
        }
      }
      function addSection(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
        const parsed = parse(input);
        if ("sections" in parsed) return recurse(...arguments);
        const map = new TraceMap(parsed, mapUrl);
        const sourcesOffset = sources.length;
        const namesOffset = names.length;
        const decoded = decodedMappings(map);
        const { resolvedSources, sourcesContent: contents, ignoreList: ignores } = map;
        append(sources, resolvedSources);
        append(names, map.names);
        if (contents) append(sourcesContent, contents);
        else for (let i = 0; i < resolvedSources.length; i++) sourcesContent.push(null);
        if (ignores) for (let i = 0; i < ignores.length; i++) ignoreList.push(ignores[i] + sourcesOffset);
        for (let i = 0; i < decoded.length; i++) {
          const lineI = lineOffset + i;
          if (lineI > stopLine) return;
          const out = getLine(mappings, lineI);
          const cOffset = i === 0 ? columnOffset : 0;
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            const column = cOffset + seg[COLUMN];
            if (lineI === stopLine && column >= stopColumn) return;
            if (seg.length === 1) {
              out.push([column]);
              continue;
            }
            const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            out.push(
              seg.length === 4 ? [column, sourcesIndex, sourceLine, sourceColumn] : [column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX]]
            );
          }
        }
      }
      function append(arr, other) {
        for (let i = 0; i < other.length; i++) arr.push(other[i]);
      }
      function getLine(arr, index) {
        for (let i = arr.length; i <= index; i++) arr[i] = [];
        return arr[index];
      }
      var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
      var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
      var LEAST_UPPER_BOUND = -1;
      var GREATEST_LOWER_BOUND = 1;
      var TraceMap = class {
        constructor(map, mapUrl) {
          const isString = typeof map === "string";
          if (!isString && map._decodedMemo) return map;
          const parsed = parse(map);
          const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
          this.version = version;
          this.file = file;
          this.names = names || [];
          this.sourceRoot = sourceRoot;
          this.sources = sources;
          this.sourcesContent = sourcesContent;
          this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
          const resolve = resolver(mapUrl, sourceRoot);
          this.resolvedSources = sources.map(resolve);
          const { mappings } = parsed;
          if (typeof mappings === "string") {
            this._encoded = mappings;
            this._decoded = void 0;
          } else if (Array.isArray(mappings)) {
            this._encoded = void 0;
            this._decoded = maybeSort(mappings, isString);
          } else if (parsed.sections) {
            throw new Error(`TraceMap passed sectioned source map, please use FlattenMap export instead`);
          } else {
            throw new Error(`invalid source map: ${JSON.stringify(parsed)}`);
          }
          this._decodedMemo = memoizedState();
          this._bySources = void 0;
          this._bySourceMemos = void 0;
        }
      };
      function cast(map) {
        return map;
      }
      function encodedMappings(map) {
        var _a, _b;
        return (_b = (_a = cast(map))._encoded) != null ? _b : _a._encoded = (0, import_sourcemap_codec.encode)(cast(map)._decoded);
      }
      function decodedMappings(map) {
        var _a;
        return (_a = cast(map))._decoded || (_a._decoded = (0, import_sourcemap_codec.decode)(cast(map)._encoded));
      }
      function traceSegment(map, line, column) {
        const decoded = decodedMappings(map);
        if (line >= decoded.length) return null;
        const segments = decoded[line];
        const index = traceSegmentInternal(
          segments,
          cast(map)._decodedMemo,
          line,
          column,
          GREATEST_LOWER_BOUND
        );
        return index === -1 ? null : segments[index];
      }
      function originalPositionFor(map, needle) {
        let { line, column, bias } = needle;
        line--;
        if (line < 0) throw new Error(LINE_GTR_ZERO);
        if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
        const decoded = decodedMappings(map);
        if (line >= decoded.length) return OMapping(null, null, null, null);
        const segments = decoded[line];
        const index = traceSegmentInternal(
          segments,
          cast(map)._decodedMemo,
          line,
          column,
          bias || GREATEST_LOWER_BOUND
        );
        if (index === -1) return OMapping(null, null, null, null);
        const segment = segments[index];
        if (segment.length === 1) return OMapping(null, null, null, null);
        const { names, resolvedSources } = map;
        return OMapping(
          resolvedSources[segment[SOURCES_INDEX]],
          segment[SOURCE_LINE] + 1,
          segment[SOURCE_COLUMN],
          segment.length === 5 ? names[segment[NAMES_INDEX]] : null
        );
      }
      function generatedPositionFor(map, needle) {
        const { source, line, column, bias } = needle;
        return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
      }
      function allGeneratedPositionsFor(map, needle) {
        const { source, line, column, bias } = needle;
        return generatedPosition(map, source, line, column, bias || LEAST_UPPER_BOUND, true);
      }
      function eachMapping(map, cb) {
        const decoded = decodedMappings(map);
        const { names, resolvedSources } = map;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            const generatedLine = i + 1;
            const generatedColumn = seg[0];
            let source = null;
            let originalLine = null;
            let originalColumn = null;
            let name = null;
            if (seg.length !== 1) {
              source = resolvedSources[seg[1]];
              originalLine = seg[2] + 1;
              originalColumn = seg[3];
            }
            if (seg.length === 5) name = names[seg[4]];
            cb({
              generatedLine,
              generatedColumn,
              source,
              originalLine,
              originalColumn,
              name
            });
          }
        }
      }
      function sourceIndex(map, source) {
        const { sources, resolvedSources } = map;
        let index = sources.indexOf(source);
        if (index === -1) index = resolvedSources.indexOf(source);
        return index;
      }
      function sourceContentFor(map, source) {
        const { sourcesContent } = map;
        if (sourcesContent == null) return null;
        const index = sourceIndex(map, source);
        return index === -1 ? null : sourcesContent[index];
      }
      function isIgnored(map, source) {
        const { ignoreList } = map;
        if (ignoreList == null) return false;
        const index = sourceIndex(map, source);
        return index === -1 ? false : ignoreList.includes(index);
      }
      function presortedDecodedMap(map, mapUrl) {
        const tracer = new TraceMap(clone(map, []), mapUrl);
        cast(tracer)._decoded = map.mappings;
        return tracer;
      }
      function decodedMap(map) {
        return clone(map, decodedMappings(map));
      }
      function encodedMap(map) {
        return clone(map, encodedMappings(map));
      }
      function clone(map, mappings) {
        return {
          version: map.version,
          file: map.file,
          names: map.names,
          sourceRoot: map.sourceRoot,
          sources: map.sources,
          sourcesContent: map.sourcesContent,
          mappings,
          ignoreList: map.ignoreList || map.x_google_ignoreList
        };
      }
      function OMapping(source, line, column, name) {
        return { source, line, column, name };
      }
      function GMapping(line, column) {
        return { line, column };
      }
      function traceSegmentInternal(segments, memo, line, column, bias) {
        let index = memoizedBinarySearch(segments, column, memo, line);
        if (found) {
          index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
        } else if (bias === LEAST_UPPER_BOUND) index++;
        if (index === -1 || index === segments.length) return -1;
        return index;
      }
      function sliceGeneratedPositions(segments, memo, line, column, bias) {
        let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
        if (!found && bias === LEAST_UPPER_BOUND) min++;
        if (min === -1 || min === segments.length) return [];
        const matchedColumn = found ? column : segments[min][COLUMN];
        if (!found) min = lowerBound(segments, matchedColumn, min);
        const max = upperBound(segments, matchedColumn, min);
        const result = [];
        for (; min <= max; min++) {
          const segment = segments[min];
          result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
        }
        return result;
      }
      function generatedPosition(map, source, line, column, bias, all) {
        var _a, _b;
        line--;
        if (line < 0) throw new Error(LINE_GTR_ZERO);
        if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
        const { sources, resolvedSources } = map;
        let sourceIndex2 = sources.indexOf(source);
        if (sourceIndex2 === -1) sourceIndex2 = resolvedSources.indexOf(source);
        if (sourceIndex2 === -1) return all ? [] : GMapping(null, null);
        const bySourceMemos = (_a = cast(map))._bySourceMemos || (_a._bySourceMemos = sources.map(memoizedState));
        const generated = (_b = cast(map))._bySources || (_b._bySources = buildBySources(decodedMappings(map), bySourceMemos));
        const segments = generated[sourceIndex2][line];
        if (segments == null) return all ? [] : GMapping(null, null);
        const memo = bySourceMemos[sourceIndex2];
        if (all) return sliceGeneratedPositions(segments, memo, line, column, bias);
        const index = traceSegmentInternal(segments, memo, line, column, bias);
        if (index === -1) return GMapping(null, null);
        const segment = segments[index];
        return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
      }
    }));
  }
});

// node_modules/convert-source-map/index.js
var require_convert_source_map = __commonJS({
  "node_modules/convert-source-map/index.js"(exports2) {
    "use strict";
    var hasOwn2 = Object.prototype.hasOwnProperty;
    Object.defineProperty(exports2, "commentRegex", {
      configurable: false,
      enumerable: false,
      get: function getCommentRegex() {
        return /^[ \t\f\v]*\/[\/\*][@#][ \t\f\v]+sourceMappingURL=data:(((?:application|text)\/json)(?:;charset=([^;,\r\n]*))?)?(?:;(base64))?,([^\r\n]*)$/mg;
      }
    });
    Object.defineProperty(exports2, "mapFileCommentRegex", {
      configurable: false,
      enumerable: false,
      get: function getMapFileCommentRegex() {
        return /(?:\/\/[@#][ \t\f\v]+sourceMappingURL=([^\s'"`]+)[ \t\f\v]*$)|(?:\/\*[@#][ \t\f\v]+sourceMappingURL=([^\s*]+)[ \t\f\v]*\*\/[ \t\f\v]*$)/mg;
      }
    });
    function isHorizontalWhitespace(code) {
      return code === 9 || code === 11 || code === 12 || code === 32;
    }
    function trimHorizontalEnd(value, end) {
      while (end > 0 && isHorizontalWhitespace(value.charCodeAt(end - 1))) end--;
      return end;
    }
    function parseComment(comment) {
      if (typeof comment !== "string") return null;
      var start = 0;
      while (start < comment.length && isHorizontalWhitespace(comment.charCodeAt(start))) start++;
      var block = comment.substr(start, 2) === "/*";
      if (!block && comment.substr(start, 2) !== "//") return null;
      var end = trimHorizontalEnd(comment, comment.length);
      if (block) {
        if (end < start + 4 || comment.substr(end - 2, 2) !== "*/") return null;
        end = trimHorizontalEnd(comment, end - 2);
      }
      var cursor = start + 2;
      var marker = comment.charAt(cursor++);
      if (marker !== "#" && marker !== "@") return null;
      if (cursor >= end || !isHorizontalWhitespace(comment.charCodeAt(cursor))) return null;
      while (cursor < end && isHorizontalWhitespace(comment.charCodeAt(cursor))) cursor++;
      var prefix = "sourceMappingURL=";
      if (comment.substr(cursor, prefix.length) !== prefix) return null;
      cursor += prefix.length;
      var url = comment.slice(cursor, end);
      if (!url || url.indexOf("\n") !== -1 || url.indexOf("\r") !== -1) return null;
      return { block, url };
    }
    function parseDataURL(url) {
      if (url.substr(0, 5) !== "data:") return null;
      var comma = url.indexOf(",", 5);
      if (comma === -1) return null;
      var metadata = url.slice(5, comma);
      var parts = metadata.split(";");
      var mime = parts.shift();
      if (mime && mime !== "application/json" && mime !== "text/json") return null;
      var encoding = "uri";
      var charsetSeen = false;
      for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        if (part.substr(0, 8) === "charset=" && !charsetSeen && encoding !== "base64") {
          if (part.indexOf(",") !== -1) return null;
          charsetSeen = true;
        } else if (part === "base64" && encoding !== "base64" && index === parts.length - 1) {
          encoding = "base64";
        } else {
          return null;
        }
      }
      return { data: url.slice(comma + 1), encoding };
    }
    function scanComments(source, visit) {
      if (typeof source !== "string") throw new TypeError("source must be a string");
      var quote = 0;
      var lineStart = 0;
      for (var index = 0; index < source.length; index++) {
        var code = source.charCodeAt(index);
        if (quote) {
          if (code === 92 && index + 1 < source.length) {
            if (source.charCodeAt(index + 1) === 10) lineStart = index + 2;
            index++;
          } else if (code === quote) {
            quote = 0;
          } else if (code === 10) {
            lineStart = index + 1;
            if (quote !== 96) quote = 0;
          }
          continue;
        }
        if (code === 10) {
          lineStart = index + 1;
          continue;
        }
        if (code === 34 || code === 39 || code === 96) {
          quote = code;
          continue;
        }
        if (code !== 47 || index + 1 >= source.length) continue;
        var next = source.charCodeAt(index + 1);
        if (next === 47) {
          var lineEnd = source.indexOf("\n", index + 2);
          if (lineEnd === -1) lineEnd = source.length;
          var lineComment = source.slice(index, lineEnd);
          var parsedLine = parseComment(lineComment);
          if (parsedLine) visit(parsedLine, lineComment, index, lineEnd, lineStart);
          index = lineEnd - 1;
        } else if (next === 42) {
          var close = source.indexOf("*/", index + 2);
          if (close === -1) break;
          var blockEnd = close + 2;
          var blockComment = source.slice(index, blockEnd);
          var parsedBlock = parseComment(blockComment);
          if (parsedBlock) visit(parsedBlock, blockComment, index, blockEnd, lineStart);
          var lastNewline = source.lastIndexOf("\n", blockEnd - 1);
          if (lastNewline >= lineStart) lineStart = lastNewline + 1;
          index = blockEnd - 1;
        }
      }
    }
    function findLastComment(source, inline) {
      var last = null;
      scanComments(source, function(parsed, comment) {
        var dataURL = parseDataURL(parsed.url);
        if (inline && dataURL || !inline && !dataURL) last = comment;
      });
      return last;
    }
    function onlyHorizontalWhitespace(source, start, end) {
      for (var index = start; index < end; index++) {
        if (!isHorizontalWhitespace(source.charCodeAt(index))) return false;
      }
      return true;
    }
    function removeSourceMapComments(source, inline) {
      var ranges = [];
      scanComments(source, function(parsed, _comment, start, end, lineStart) {
        var dataURL = parseDataURL(parsed.url);
        if (inline && dataURL || !inline && !dataURL) {
          if (inline && onlyHorizontalWhitespace(source, lineStart, start)) start = lineStart;
          ranges.push([start, end]);
        }
      });
      if (!ranges.length) return source;
      var chunks = [];
      var cursor = 0;
      for (var index = 0; index < ranges.length; index++) {
        chunks.push(source.slice(cursor, ranges[index][0]));
        cursor = ranges[index][1];
      }
      chunks.push(source.slice(cursor));
      return chunks.join("");
    }
    function decodeBase64(base64) {
      if (typeof base64 === "number") throw new TypeError("The value to decode must not be of type number.");
      if (typeof Buffer !== "undefined") return Buffer.from(base64, "base64").toString("utf8");
      if (typeof atob !== "function") throw new Error("No base64 decoder is available in this environment");
      var binary = atob(base64);
      if (typeof TextDecoder !== "undefined") {
        var bytes = new Uint8Array(binary.length);
        for (var index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
        return new TextDecoder().decode(bytes);
      }
      var encoded = "";
      for (var byteIndex = 0; byteIndex < binary.length; byteIndex++) {
        encoded += "%" + ("0" + binary.charCodeAt(byteIndex).toString(16)).slice(-2);
      }
      return decodeURIComponent(encoded);
    }
    function encodeBase64(value) {
      if (typeof Buffer !== "undefined") return Buffer.from(value, "utf8").toString("base64");
      if (typeof btoa !== "function") throw new Error("No base64 encoder is available in this environment");
      if (typeof TextEncoder !== "undefined") {
        var bytes = new TextEncoder().encode(value);
        var binary = "";
        for (var index = 0; index < bytes.length; index++) binary += String.fromCharCode(bytes[index]);
        return btoa(binary);
      }
      return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function(_match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
      }));
    }
    function Converter(sourceMap, options) {
      options = options || {};
      if (options.encoding === "base64") sourceMap = decodeBase64(sourceMap);
      else if (options.encoding === "uri") sourceMap = decodeURIComponent(sourceMap);
      if (options.isJSON || options.encoding) sourceMap = JSON.parse(sourceMap);
      this.sourcemap = sourceMap;
    }
    Converter.prototype.toJSON = function(space) {
      return JSON.stringify(this.sourcemap, null, space);
    };
    Converter.prototype.toBase64 = function() {
      return encodeBase64(this.toJSON());
    };
    Converter.prototype.toURI = function() {
      return encodeURIComponent(this.toJSON());
    };
    Converter.prototype.toComment = function(options) {
      var uri = options && options.encoding === "uri";
      var data = "sourceMappingURL=data:application/json;charset=utf-8" + (uri ? "," + this.toURI() : ";base64," + this.toBase64());
      return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
    };
    Converter.prototype.toObject = function() {
      return JSON.parse(this.toJSON());
    };
    Converter.prototype.addProperty = function(key, value) {
      if (hasOwn2.call(this.sourcemap, key)) {
        throw new Error('property "' + String(key) + '" already exists on the sourcemap, use set property instead');
      }
      return this.setProperty(key, value);
    };
    Converter.prototype.setProperty = function(key, value) {
      Object.defineProperty(this.sourcemap, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      });
      return this;
    };
    Converter.prototype.getProperty = function(key) {
      return this.sourcemap[key];
    };
    function invalidComment(kind) {
      throw new Error("Invalid " + kind + " source map comment");
    }
    function wrapReadError(error, filename) {
      var detail = error && error.stack ? error.stack : String(error);
      throw new Error("An error occurred while trying to read the map file at " + filename + "\n" + detail);
    }
    function readFromFileMap(comment, read) {
      var parsed = parseComment(comment);
      if (!parsed || parseDataURL(parsed.url)) return invalidComment("external");
      var filename = parsed.url;
      try {
        var sourceMap = read(filename);
        if (sourceMap && typeof sourceMap.then === "function") {
          return sourceMap.then(void 0, function(error) {
            return wrapReadError(error, filename);
          });
        }
        return sourceMap;
      } catch (error) {
        return wrapReadError(error, filename);
      }
    }
    exports2.fromObject = function(object) {
      return new Converter(object);
    };
    exports2.fromJSON = function(json) {
      return new Converter(json, { isJSON: true });
    };
    exports2.fromURI = function(uri) {
      return new Converter(uri, { encoding: "uri" });
    };
    exports2.fromBase64 = function(base64) {
      return new Converter(base64, { encoding: "base64" });
    };
    exports2.fromComment = function(comment) {
      var parsed = parseComment(comment);
      var dataURL = parsed && parseDataURL(parsed.url);
      if (!dataURL) return invalidComment("inline");
      return new Converter(dataURL.data, { encoding: dataURL.encoding });
    };
    function makeConverter(sourceMap) {
      return new Converter(sourceMap, { isJSON: true });
    }
    exports2.fromMapFileComment = function(comment, read) {
      if (typeof read === "string") {
        throw new Error("String directory paths are no longer supported with `fromMapFileComment`\nPlease review the Upgrading documentation at https://github.com/thlorenz/convert-source-map#upgrading");
      }
      if (typeof read !== "function") throw new TypeError("readMap must be a function");
      var sourceMap = readFromFileMap(comment, read);
      return sourceMap && typeof sourceMap.then === "function" ? sourceMap.then(makeConverter) : makeConverter(sourceMap);
    };
    exports2.fromSource = function(content) {
      var comment = findLastComment(content, true);
      return comment ? exports2.fromComment(comment) : null;
    };
    exports2.fromMapFileSource = function(content, read) {
      if (typeof read === "string") {
        throw new Error("String directory paths are no longer supported with `fromMapFileSource`\nPlease review the Upgrading documentation at https://github.com/thlorenz/convert-source-map#upgrading");
      }
      var comment = findLastComment(content, false);
      return comment ? exports2.fromMapFileComment(comment, read) : null;
    };
    exports2.removeComments = function(source) {
      return removeSourceMapComments(source, true);
    };
    exports2.removeMapFileComments = function(source) {
      return removeSourceMapComments(source, false);
    };
    exports2.generateMapFileComment = function(file, options) {
      var data = "sourceMappingURL=" + file;
      return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
    };
  }
});

// node_modules/inline-source-map/dist/browser.cjs
var require_browser = __commonJS({
  "node_modules/inline-source-map/dist/browser.cjs"(exports2, module2) {
    "use strict";
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __commonJS2 = (cb, mod) => function __require() {
      try {
        return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      } catch (e) {
        throw mod = 0, e;
      }
    };
    var require_base64 = __commonJS2({
      "node_modules/source-map/lib/base64.js"(exports22) {
        var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        exports22.encode = function(number) {
          if (0 <= number && number < intToCharMap.length) {
            return intToCharMap[number];
          }
          throw new TypeError("Must be between 0 and 63: " + number);
        };
      }
    });
    var require_base64_vlq = __commonJS2({
      "node_modules/source-map/lib/base64-vlq.js"(exports22) {
        var base64 = require_base64();
        var VLQ_BASE_SHIFT = 5;
        var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
        var VLQ_BASE_MASK = VLQ_BASE - 1;
        var VLQ_CONTINUATION_BIT = VLQ_BASE;
        function toVLQSigned(aValue) {
          return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
        }
        exports22.encode = function base64VLQ_encode(aValue) {
          let encoded = "";
          let digit;
          let vlq = toVLQSigned(aValue);
          do {
            digit = vlq & VLQ_BASE_MASK;
            vlq >>>= VLQ_BASE_SHIFT;
            if (vlq > 0) {
              digit |= VLQ_CONTINUATION_BIT;
            }
            encoded += base64.encode(digit);
          } while (vlq > 0);
          return encoded;
        };
      }
    });
    var require_url_global = __commonJS2({
      "stackline-shim:url-global"(exports22, module22) {
        module22.exports = URL;
        module22.exports.URL = URL;
      }
    });
    var require_url = __commonJS2({
      "node_modules/source-map/lib/url.js"(exports22, module22) {
        "use strict";
        module22.exports = typeof URL === "function" ? URL : require_url_global().URL;
      }
    });
    var require_util = __commonJS2({
      "node_modules/source-map/lib/util.js"(exports22) {
        var URL2 = require_url();
        function getArg(aArgs, aName, aDefaultValue) {
          if (aName in aArgs) {
            return aArgs[aName];
          } else if (arguments.length === 3) {
            return aDefaultValue;
          }
          throw new Error('"' + aName + '" is a required argument.');
        }
        exports22.getArg = getArg;
        var supportsNullProto = (function() {
          const obj = /* @__PURE__ */ Object.create(null);
          return !("__proto__" in obj);
        })();
        function identity(s) {
          return s;
        }
        function toSetString(aStr) {
          if (isProtoString(aStr)) {
            return "$" + aStr;
          }
          return aStr;
        }
        exports22.toSetString = supportsNullProto ? identity : toSetString;
        function fromSetString(aStr) {
          if (isProtoString(aStr)) {
            return aStr.slice(1);
          }
          return aStr;
        }
        exports22.fromSetString = supportsNullProto ? identity : fromSetString;
        function isProtoString(s) {
          if (!s) {
            return false;
          }
          const length = s.length;
          if (length < 9) {
            return false;
          }
          if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
            return false;
          }
          for (let i = length - 10; i >= 0; i--) {
            if (s.charCodeAt(i) !== 36) {
              return false;
            }
          }
          return true;
        }
        function strcmp(aStr1, aStr2) {
          if (aStr1 === aStr2) {
            return 0;
          }
          if (aStr1 === null) {
            return 1;
          }
          if (aStr2 === null) {
            return -1;
          }
          if (aStr1 > aStr2) {
            return 1;
          }
          return -1;
        }
        function compareByGeneratedPositionsInflated(mappingA, mappingB) {
          let cmp = mappingA.generatedLine - mappingB.generatedLine;
          if (cmp !== 0) {
            return cmp;
          }
          cmp = mappingA.generatedColumn - mappingB.generatedColumn;
          if (cmp !== 0) {
            return cmp;
          }
          cmp = strcmp(mappingA.source, mappingB.source);
          if (cmp !== 0) {
            return cmp;
          }
          cmp = mappingA.originalLine - mappingB.originalLine;
          if (cmp !== 0) {
            return cmp;
          }
          cmp = mappingA.originalColumn - mappingB.originalColumn;
          if (cmp !== 0) {
            return cmp;
          }
          return strcmp(mappingA.name, mappingB.name);
        }
        exports22.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
        function parseSourceMapInput(str) {
          return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
        }
        exports22.parseSourceMapInput = parseSourceMapInput;
        var PROTOCOL = "http:";
        var PROTOCOL_AND_HOST = `${PROTOCOL}//host`;
        function createSafeHandler(cb) {
          return (input) => {
            const type = getURLType(input);
            const base = buildSafeBase(input);
            const url = new URL2(input, base);
            cb(url);
            const result = url.toString();
            if (type === "absolute") {
              return result;
            } else if (type === "scheme-relative") {
              return result.slice(PROTOCOL.length);
            } else if (type === "path-absolute") {
              return result.slice(PROTOCOL_AND_HOST.length);
            }
            return computeRelativeURL(base, result);
          };
        }
        function withBase(url, base) {
          return new URL2(url, base).toString();
        }
        function buildUniqueSegment(prefix, str) {
          let id = 0;
          do {
            const ident = prefix + id++;
            if (str.indexOf(ident) === -1) return ident;
          } while (true);
        }
        function buildSafeBase(str) {
          const maxDotParts = str.split("..").length - 1;
          const segment = buildUniqueSegment("p", str);
          let base = `${PROTOCOL_AND_HOST}/`;
          for (let i = 0; i < maxDotParts; i++) {
            base += `${segment}/`;
          }
          return base;
        }
        var ABSOLUTE_SCHEME = /^[A-Za-z0-9\+\-\.]+:/;
        function getURLType(url) {
          if (url[0] === "/") {
            if (url[1] === "/") return "scheme-relative";
            return "path-absolute";
          }
          return ABSOLUTE_SCHEME.test(url) ? "absolute" : "path-relative";
        }
        function computeRelativeURL(rootURL, targetURL) {
          if (typeof rootURL === "string") rootURL = new URL2(rootURL);
          if (typeof targetURL === "string") targetURL = new URL2(targetURL);
          const targetParts = targetURL.pathname.split("/");
          const rootParts = rootURL.pathname.split("/");
          if (rootParts.length > 0 && !rootParts[rootParts.length - 1]) {
            rootParts.pop();
          }
          while (targetParts.length > 0 && rootParts.length > 0 && targetParts[0] === rootParts[0]) {
            targetParts.shift();
            rootParts.shift();
          }
          const relativePath = rootParts.map(() => "..").concat(targetParts).join("/");
          return relativePath + targetURL.search + targetURL.hash;
        }
        var ensureDirectory = createSafeHandler((url) => {
          url.pathname = url.pathname.replace(/\/?$/, "/");
        });
        var trimFilename = createSafeHandler((url) => {
          url.href = new URL2(".", url.toString()).toString();
        });
        var normalize = createSafeHandler((url) => {
        });
        exports22.normalize = normalize;
        function join(aRoot, aPath) {
          const pathType = getURLType(aPath);
          const rootType = getURLType(aRoot);
          aRoot = ensureDirectory(aRoot);
          if (pathType === "absolute") {
            return withBase(aPath, void 0);
          }
          if (rootType === "absolute") {
            return withBase(aPath, aRoot);
          }
          if (pathType === "scheme-relative") {
            return normalize(aPath);
          }
          if (rootType === "scheme-relative") {
            return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
              PROTOCOL.length
            );
          }
          if (pathType === "path-absolute") {
            return normalize(aPath);
          }
          if (rootType === "path-absolute") {
            return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
              PROTOCOL_AND_HOST.length
            );
          }
          const base = buildSafeBase(aPath + aRoot);
          const newPath = withBase(aPath, withBase(aRoot, base));
          return computeRelativeURL(base, newPath);
        }
        exports22.join = join;
        function relative(rootURL, targetURL) {
          const result = relativeIfPossible(rootURL, targetURL);
          return typeof result === "string" ? result : normalize(targetURL);
        }
        exports22.relative = relative;
        function relativeIfPossible(rootURL, targetURL) {
          const urlType = getURLType(rootURL);
          if (urlType !== getURLType(targetURL)) {
            return null;
          }
          const base = buildSafeBase(rootURL + targetURL);
          const root = new URL2(rootURL, base);
          const target = new URL2(targetURL, base);
          try {
            new URL2("", target.toString());
          } catch (err) {
            return null;
          }
          if (target.protocol !== root.protocol || target.user !== root.user || target.password !== root.password || target.hostname !== root.hostname || target.port !== root.port) {
            return null;
          }
          return computeRelativeURL(root, target);
        }
        function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
          if (sourceRoot && getURLType(sourceURL) === "path-absolute") {
            sourceURL = sourceURL.replace(/^\//, "");
          }
          let url = normalize(sourceURL || "");
          if (sourceRoot) url = join(sourceRoot, url);
          if (sourceMapURL) url = join(trimFilename(sourceMapURL), url);
          return url;
        }
        exports22.computeSourceURL = computeSourceURL;
      }
    });
    var require_array_set = __commonJS2({
      "node_modules/source-map/lib/array-set.js"(exports22) {
        var ArraySet = class _ArraySet {
          constructor() {
            this._array = [];
            this._set = /* @__PURE__ */ new Map();
          }
          /**
           * Static method for creating ArraySet instances from an existing array.
           */
          static fromArray(aArray, aAllowDuplicates) {
            const set = new _ArraySet();
            for (let i = 0, len = aArray.length; i < len; i++) {
              set.add(aArray[i], aAllowDuplicates);
            }
            return set;
          }
          /**
           * Return how many unique items are in this ArraySet. If duplicates have been
           * added, than those do not count towards the size.
           *
           * @returns Number
           */
          size() {
            return this._set.size;
          }
          /**
           * Add the given string to this set.
           *
           * @param String aStr
           */
          add(aStr, aAllowDuplicates) {
            const isDuplicate = this.has(aStr);
            const idx = this._array.length;
            if (!isDuplicate || aAllowDuplicates) {
              this._array.push(aStr);
            }
            if (!isDuplicate) {
              this._set.set(aStr, idx);
            }
          }
          /**
           * Is the given string a member of this set?
           *
           * @param String aStr
           */
          has(aStr) {
            return this._set.has(aStr);
          }
          /**
           * What is the index of the given string in the array?
           *
           * @param String aStr
           */
          indexOf(aStr) {
            const idx = this._set.get(aStr);
            if (idx >= 0) {
              return idx;
            }
            throw new Error('"' + aStr + '" is not in the set.');
          }
          /**
           * What is the element at the given index?
           *
           * @param Number aIdx
           */
          at(aIdx) {
            if (aIdx >= 0 && aIdx < this._array.length) {
              return this._array[aIdx];
            }
            throw new Error("No element indexed by " + aIdx);
          }
          /**
           * Returns the array representation of this set (which has the proper indices
           * indicated by indexOf). Note that this is a copy of the internal array used
           * for storing the members so that no one can mess with internal state.
           */
          toArray() {
            return this._array.slice();
          }
        };
        exports22.ArraySet = ArraySet;
      }
    });
    var require_mapping_list = __commonJS2({
      "node_modules/source-map/lib/mapping-list.js"(exports22) {
        var util = require_util();
        function generatedPositionAfter(mappingA, mappingB) {
          const lineA = mappingA.generatedLine;
          const lineB = mappingB.generatedLine;
          const columnA = mappingA.generatedColumn;
          const columnB = mappingB.generatedColumn;
          return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
        }
        var MappingList = class {
          constructor() {
            this._array = [];
            this._sorted = true;
            this._last = { generatedLine: -1, generatedColumn: 0 };
          }
          /**
           * Iterate through internal items. This method takes the same arguments that
           * `Array.prototype.forEach` takes.
           *
           * NOTE: The order of the mappings is NOT guaranteed.
           */
          unsortedForEach(aCallback, aThisArg) {
            this._array.forEach(aCallback, aThisArg);
          }
          /**
           * Add the given source mapping.
           *
           * @param Object aMapping
           */
          add(aMapping) {
            if (generatedPositionAfter(this._last, aMapping)) {
              this._last = aMapping;
              this._array.push(aMapping);
            } else {
              this._sorted = false;
              this._array.push(aMapping);
            }
          }
          /**
           * Returns the flat, sorted array of mappings. The mappings are sorted by
           * generated position.
           *
           * WARNING: This method returns internal data without copying, for
           * performance. The return value must NOT be mutated, and should be treated as
           * an immutable borrow. If you want to take ownership, you must make your own
           * copy.
           */
          toArray() {
            if (!this._sorted) {
              this._array.sort(util.compareByGeneratedPositionsInflated);
              this._sorted = true;
            }
            return this._array;
          }
        };
        exports22.MappingList = MappingList;
      }
    });
    var require_source_map_generator = __commonJS2({
      "node_modules/source-map/lib/source-map-generator.js"(exports22) {
        var base64VLQ = require_base64_vlq();
        var util = require_util();
        var ArraySet = require_array_set().ArraySet;
        var MappingList = require_mapping_list().MappingList;
        var SourceMapGenerator2 = class _SourceMapGenerator {
          constructor(aArgs) {
            if (!aArgs) {
              aArgs = {};
            }
            this._file = util.getArg(aArgs, "file", null);
            this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
            this._skipValidation = util.getArg(aArgs, "skipValidation", false);
            this._sources = new ArraySet();
            this._names = new ArraySet();
            this._mappings = new MappingList();
            this._sourcesContents = null;
          }
          /**
           * Creates a new SourceMapGenerator based on a SourceMapConsumer
           *
           * @param aSourceMapConsumer The SourceMap.
           */
          static fromSourceMap(aSourceMapConsumer) {
            const sourceRoot = aSourceMapConsumer.sourceRoot;
            const generator = new _SourceMapGenerator({
              file: aSourceMapConsumer.file,
              sourceRoot
            });
            aSourceMapConsumer.eachMapping(function(mapping) {
              const newMapping = {
                generated: {
                  line: mapping.generatedLine,
                  column: mapping.generatedColumn
                }
              };
              if (mapping.source != null) {
                newMapping.source = mapping.source;
                if (sourceRoot != null) {
                  newMapping.source = util.relative(sourceRoot, newMapping.source);
                }
                newMapping.original = {
                  line: mapping.originalLine,
                  column: mapping.originalColumn
                };
                if (mapping.name != null) {
                  newMapping.name = mapping.name;
                }
              }
              generator.addMapping(newMapping);
            });
            aSourceMapConsumer.sources.forEach(function(sourceFile) {
              let sourceRelative = sourceFile;
              if (sourceRoot != null) {
                sourceRelative = util.relative(sourceRoot, sourceFile);
              }
              if (!generator._sources.has(sourceRelative)) {
                generator._sources.add(sourceRelative);
              }
              const content = aSourceMapConsumer.sourceContentFor(sourceFile);
              if (content != null) {
                generator.setSourceContent(sourceFile, content);
              }
            });
            return generator;
          }
          /**
           * Add a single mapping from original source line and column to the generated
           * source's line and column for this source map being created. The mapping
           * object should have the following properties:
           *
           *   - generated: An object with the generated line and column positions.
           *   - original: An object with the original line and column positions.
           *   - source: The original source file (relative to the sourceRoot).
           *   - name: An optional original token name for this mapping.
           */
          addMapping(aArgs) {
            const generated = util.getArg(aArgs, "generated");
            const original = util.getArg(aArgs, "original", null);
            let source = util.getArg(aArgs, "source", null);
            let name = util.getArg(aArgs, "name", null);
            if (!this._skipValidation) {
              this._validateMapping(generated, original, source, name);
            }
            if (source != null) {
              source = String(source);
              if (!this._sources.has(source)) {
                this._sources.add(source);
              }
            }
            if (name != null) {
              name = String(name);
              if (!this._names.has(name)) {
                this._names.add(name);
              }
            }
            this._mappings.add({
              generatedLine: generated.line,
              generatedColumn: generated.column,
              originalLine: original && original.line,
              originalColumn: original && original.column,
              source,
              name
            });
          }
          /**
           * Set the source content for a source file.
           */
          setSourceContent(aSourceFile, aSourceContent) {
            let source = aSourceFile;
            if (this._sourceRoot != null) {
              source = util.relative(this._sourceRoot, source);
            }
            if (aSourceContent != null) {
              if (!this._sourcesContents) {
                this._sourcesContents = /* @__PURE__ */ Object.create(null);
              }
              this._sourcesContents[util.toSetString(source)] = aSourceContent;
            } else if (this._sourcesContents) {
              delete this._sourcesContents[util.toSetString(source)];
              if (Object.keys(this._sourcesContents).length === 0) {
                this._sourcesContents = null;
              }
            }
          }
          /**
           * Applies the mappings of a sub-source-map for a specific source file to the
           * source map being generated. Each mapping to the supplied source file is
           * rewritten using the supplied source map. Note: The resolution for the
           * resulting mappings is the minimium of this map and the supplied map.
           *
           * @param aSourceMapConsumer The source map to be applied.
           * @param aSourceFile Optional. The filename of the source file.
           *        If omitted, SourceMapConsumer's file property will be used.
           * @param aSourceMapPath Optional. The dirname of the path to the source map
           *        to be applied. If relative, it is relative to the SourceMapConsumer.
           *        This parameter is needed when the two source maps aren't in the same
           *        directory, and the source map to be applied contains relative source
           *        paths. If so, those relative source paths need to be rewritten
           *        relative to the SourceMapGenerator.
           */
          applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
            let sourceFile = aSourceFile;
            if (aSourceFile == null) {
              if (aSourceMapConsumer.file == null) {
                throw new Error(
                  `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
                );
              }
              sourceFile = aSourceMapConsumer.file;
            }
            const sourceRoot = this._sourceRoot;
            if (sourceRoot != null) {
              sourceFile = util.relative(sourceRoot, sourceFile);
            }
            const newSources = this._mappings.toArray().length > 0 ? new ArraySet() : this._sources;
            const newNames = new ArraySet();
            this._mappings.unsortedForEach(function(mapping) {
              if (mapping.source === sourceFile && mapping.originalLine != null) {
                const original = aSourceMapConsumer.originalPositionFor({
                  line: mapping.originalLine,
                  column: mapping.originalColumn
                });
                if (original.source != null) {
                  mapping.source = original.source;
                  if (aSourceMapPath != null) {
                    mapping.source = util.join(aSourceMapPath, mapping.source);
                  }
                  if (sourceRoot != null) {
                    mapping.source = util.relative(sourceRoot, mapping.source);
                  }
                  mapping.originalLine = original.line;
                  mapping.originalColumn = original.column;
                  if (original.name != null) {
                    mapping.name = original.name;
                  }
                }
              }
              const source = mapping.source;
              if (source != null && !newSources.has(source)) {
                newSources.add(source);
              }
              const name = mapping.name;
              if (name != null && !newNames.has(name)) {
                newNames.add(name);
              }
            }, this);
            this._sources = newSources;
            this._names = newNames;
            aSourceMapConsumer.sources.forEach(function(srcFile) {
              const content = aSourceMapConsumer.sourceContentFor(srcFile);
              if (content != null) {
                if (aSourceMapPath != null) {
                  srcFile = util.join(aSourceMapPath, srcFile);
                }
                if (sourceRoot != null) {
                  srcFile = util.relative(sourceRoot, srcFile);
                }
                this.setSourceContent(srcFile, content);
              }
            }, this);
          }
          /**
           * A mapping can have one of the three levels of data:
           *
           *   1. Just the generated position.
           *   2. The Generated position, original position, and original source.
           *   3. Generated and original position, original source, as well as a name
           *      token.
           *
           * To maintain consistency, we validate that any new mapping being added falls
           * in to one of these categories.
           */
          _validateMapping(aGenerated, aOriginal, aSource, aName) {
            if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
              throw new Error(
                "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
              );
            }
            if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
            } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
            } else {
              throw new Error(
                "Invalid mapping: " + JSON.stringify({
                  generated: aGenerated,
                  source: aSource,
                  original: aOriginal,
                  name: aName
                })
              );
            }
          }
          /**
           * Serialize the accumulated mappings in to the stream of base 64 VLQs
           * specified by the source map format.
           */
          _serializeMappings() {
            let previousGeneratedColumn = 0;
            let previousGeneratedLine = 1;
            let previousOriginalColumn = 0;
            let previousOriginalLine = 0;
            let previousName = 0;
            let previousSource = 0;
            let result = "";
            let next;
            let mapping;
            let nameIdx;
            let sourceIdx;
            const mappings = this._mappings.toArray();
            for (let i = 0, len = mappings.length; i < len; i++) {
              mapping = mappings[i];
              next = "";
              if (mapping.generatedLine !== previousGeneratedLine) {
                previousGeneratedColumn = 0;
                while (mapping.generatedLine !== previousGeneratedLine) {
                  next += ";";
                  previousGeneratedLine++;
                }
              } else if (i > 0) {
                if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                  continue;
                }
                next += ",";
              }
              next += base64VLQ.encode(
                mapping.generatedColumn - previousGeneratedColumn
              );
              previousGeneratedColumn = mapping.generatedColumn;
              if (mapping.source != null) {
                sourceIdx = this._sources.indexOf(mapping.source);
                next += base64VLQ.encode(sourceIdx - previousSource);
                previousSource = sourceIdx;
                next += base64VLQ.encode(
                  mapping.originalLine - 1 - previousOriginalLine
                );
                previousOriginalLine = mapping.originalLine - 1;
                next += base64VLQ.encode(
                  mapping.originalColumn - previousOriginalColumn
                );
                previousOriginalColumn = mapping.originalColumn;
                if (mapping.name != null) {
                  nameIdx = this._names.indexOf(mapping.name);
                  next += base64VLQ.encode(nameIdx - previousName);
                  previousName = nameIdx;
                }
              }
              result += next;
            }
            return result;
          }
          _generateSourcesContent(aSources, aSourceRoot) {
            return aSources.map(function(source) {
              if (!this._sourcesContents) {
                return null;
              }
              if (aSourceRoot != null) {
                source = util.relative(aSourceRoot, source);
              }
              const key = util.toSetString(source);
              return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
            }, this);
          }
          /**
           * Externalize the source map.
           */
          toJSON() {
            const map = {
              version: this._version,
              sources: this._sources.toArray(),
              names: this._names.toArray(),
              mappings: this._serializeMappings()
            };
            if (this._file != null) {
              map.file = this._file;
            }
            if (this._sourceRoot != null) {
              map.sourceRoot = this._sourceRoot;
            }
            if (this._sourcesContents) {
              map.sourcesContent = this._generateSourcesContent(
                map.sources,
                map.sourceRoot
              );
            }
            return map;
          }
          /**
           * Render the source map being generated to a string.
           */
          toString() {
            return JSON.stringify(this.toJSON());
          }
        };
        SourceMapGenerator2.prototype._version = 3;
        exports22.SourceMapGenerator = SourceMapGenerator2;
      }
    });
    var require_binary_search = __commonJS2({
      "node_modules/source-map/lib/binary-search.js"(exports22) {
        exports22.GREATEST_LOWER_BOUND = 1;
        exports22.LEAST_UPPER_BOUND = 2;
        function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
          const mid = Math.floor((aHigh - aLow) / 2) + aLow;
          const cmp = aCompare(aNeedle, aHaystack[mid], true);
          if (cmp === 0) {
            return mid;
          } else if (cmp > 0) {
            if (aHigh - mid > 1) {
              return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
            }
            if (aBias === exports22.LEAST_UPPER_BOUND) {
              return aHigh < aHaystack.length ? aHigh : -1;
            }
            return mid;
          }
          if (mid - aLow > 1) {
            return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports22.LEAST_UPPER_BOUND) {
            return mid;
          }
          return aLow < 0 ? -1 : aLow;
        }
        exports22.search = function search(aNeedle, aHaystack, aCompare, aBias) {
          if (aHaystack.length === 0) {
            return -1;
          }
          let index = recursiveSearch(
            -1,
            aHaystack.length,
            aNeedle,
            aHaystack,
            aCompare,
            aBias || exports22.GREATEST_LOWER_BOUND
          );
          if (index < 0) {
            return -1;
          }
          while (index - 1 >= 0) {
            if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
              break;
            }
            --index;
          }
          return index;
        };
      }
    });
    var require_read_wasm_browser = __commonJS2({
      "node_modules/source-map/lib/read-wasm-browser.js"(exports22, module22) {
        "use strict";
        var mappingsWasm = null;
        module22.exports = function readWasm() {
          if (typeof mappingsWasm === "string") {
            return fetch(mappingsWasm).then((response) => response.arrayBuffer());
          }
          if (mappingsWasm instanceof ArrayBuffer) {
            return Promise.resolve(mappingsWasm);
          }
          throw new Error(
            "You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer"
          );
        };
        module22.exports.initialize = (input) => {
          mappingsWasm = input;
        };
      }
    });
    var require_wasm = __commonJS2({
      "node_modules/source-map/lib/wasm.js"(exports22, module22) {
        var readWasm = require_read_wasm_browser();
        function Mapping() {
          this.generatedLine = 0;
          this.generatedColumn = 0;
          this.lastGeneratedColumn = null;
          this.source = null;
          this.originalLine = null;
          this.originalColumn = null;
          this.name = null;
        }
        var cachedWasm = null;
        module22.exports = function wasm() {
          if (cachedWasm) {
            return cachedWasm;
          }
          const callbackStack = [];
          cachedWasm = readWasm().then((buffer) => {
            return WebAssembly.instantiate(buffer, {
              env: {
                mapping_callback(generatedLine, generatedColumn, hasLastGeneratedColumn, lastGeneratedColumn, hasOriginal, source, originalLine, originalColumn, hasName, name) {
                  const mapping = new Mapping();
                  mapping.generatedLine = generatedLine + 1;
                  mapping.generatedColumn = generatedColumn;
                  if (hasLastGeneratedColumn) {
                    mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
                  }
                  if (hasOriginal) {
                    mapping.source = source;
                    mapping.originalLine = originalLine + 1;
                    mapping.originalColumn = originalColumn;
                    if (hasName) {
                      mapping.name = name;
                    }
                  }
                  callbackStack[callbackStack.length - 1](mapping);
                },
                start_all_generated_locations_for() {
                  console.time("all_generated_locations_for");
                },
                end_all_generated_locations_for() {
                  console.timeEnd("all_generated_locations_for");
                },
                start_compute_column_spans() {
                  console.time("compute_column_spans");
                },
                end_compute_column_spans() {
                  console.timeEnd("compute_column_spans");
                },
                start_generated_location_for() {
                  console.time("generated_location_for");
                },
                end_generated_location_for() {
                  console.timeEnd("generated_location_for");
                },
                start_original_location_for() {
                  console.time("original_location_for");
                },
                end_original_location_for() {
                  console.timeEnd("original_location_for");
                },
                start_parse_mappings() {
                  console.time("parse_mappings");
                },
                end_parse_mappings() {
                  console.timeEnd("parse_mappings");
                },
                start_sort_by_generated_location() {
                  console.time("sort_by_generated_location");
                },
                end_sort_by_generated_location() {
                  console.timeEnd("sort_by_generated_location");
                },
                start_sort_by_original_location() {
                  console.time("sort_by_original_location");
                },
                end_sort_by_original_location() {
                  console.timeEnd("sort_by_original_location");
                }
              }
            });
          }).then((Wasm) => {
            return {
              exports: Wasm.instance.exports,
              withMappingCallback: (mappingCallback, f) => {
                callbackStack.push(mappingCallback);
                try {
                  f();
                } finally {
                  callbackStack.pop();
                }
              }
            };
          }).then(null, (e) => {
            cachedWasm = null;
            throw e;
          });
          return cachedWasm;
        };
      }
    });
    var require_source_map_consumer = __commonJS2({
      "node_modules/source-map/lib/source-map-consumer.js"(exports22) {
        var util = require_util();
        var binarySearch = require_binary_search();
        var ArraySet = require_array_set().ArraySet;
        var base64VLQ = require_base64_vlq();
        var readWasm = require_read_wasm_browser();
        var wasm = require_wasm();
        var INTERNAL = /* @__PURE__ */ Symbol("smcInternal");
        var SourceMapConsumer = class _SourceMapConsumer {
          constructor(aSourceMap, aSourceMapURL) {
            if (aSourceMap == INTERNAL) {
              return Promise.resolve(this);
            }
            return _factory(aSourceMap, aSourceMapURL);
          }
          static initialize(opts) {
            readWasm.initialize(opts["lib/mappings.wasm"]);
          }
          static fromSourceMap(aSourceMap, aSourceMapURL) {
            return _factoryBSM(aSourceMap, aSourceMapURL);
          }
          /**
           * Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
           * (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
           * function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
           * for `f` to complete, call `destroy` on the consumer, and return `f`'s return
           * value.
           *
           * You must not use the consumer after `f` completes!
           *
           * By using `with`, you do not have to remember to manually call `destroy` on
           * the consumer, since it will be called automatically once `f` completes.
           *
           * ```js
           * const xSquared = await SourceMapConsumer.with(
           *   myRawSourceMap,
           *   null,
           *   async function (consumer) {
           *     // Use `consumer` inside here and don't worry about remembering
           *     // to call `destroy`.
           *
           *     const x = await whatever(consumer);
           *     return x * x;
           *   }
           * );
           *
           * // You may not use that `consumer` anymore out here; it has
           * // been destroyed. But you can use `xSquared`.
           * console.log(xSquared);
           * ```
           */
          static async with(rawSourceMap, sourceMapUrl, f) {
            const consumer = await new _SourceMapConsumer(rawSourceMap, sourceMapUrl);
            try {
              return await f(consumer);
            } finally {
              consumer.destroy();
            }
          }
          /**
           * Iterate over each mapping between an original source/line/column and a
           * generated line/column in this source map.
           *
           * @param Function aCallback
           *        The function that is called with each mapping.
           * @param Object aContext
           *        Optional. If specified, this object will be the value of `this` every
           *        time that `aCallback` is called.
           * @param aOrder
           *        Either `SourceMapConsumer.GENERATED_ORDER` or
           *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
           *        iterate over the mappings sorted by the generated file's line/column
           *        order or the original's source/line/column order, respectively. Defaults to
           *        `SourceMapConsumer.GENERATED_ORDER`.
           */
          eachMapping(aCallback, aContext, aOrder) {
            throw new Error("Subclasses must implement eachMapping");
          }
          /**
           * Returns all generated line and column information for the original source,
           * line, and column provided. If no column is provided, returns all mappings
           * corresponding to a either the line we are searching for or the next
           * closest line that has any mappings. Otherwise, returns all mappings
           * corresponding to the given line and either the column we are searching for
           * or the next closest column that has any offsets.
           *
           * The only argument is an object with the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number is 1-based.
           *   - column: Optional. the column number in the original source.
           *    The column number is 0-based.
           *
           * and an array of objects is returned, each with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *    line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *    The column number is 0-based.
           */
          allGeneratedPositionsFor(aArgs) {
            throw new Error("Subclasses must implement allGeneratedPositionsFor");
          }
          destroy() {
            throw new Error("Subclasses must implement destroy");
          }
        };
        SourceMapConsumer.prototype._version = 3;
        SourceMapConsumer.GENERATED_ORDER = 1;
        SourceMapConsumer.ORIGINAL_ORDER = 2;
        SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
        SourceMapConsumer.LEAST_UPPER_BOUND = 2;
        exports22.SourceMapConsumer = SourceMapConsumer;
        var BasicSourceMapConsumer = class _BasicSourceMapConsumer extends SourceMapConsumer {
          constructor(aSourceMap, aSourceMapURL) {
            return super(INTERNAL).then((that) => {
              let sourceMap = aSourceMap;
              if (typeof aSourceMap === "string") {
                sourceMap = util.parseSourceMapInput(aSourceMap);
              }
              const version = util.getArg(sourceMap, "version");
              const sources = util.getArg(sourceMap, "sources").map(String);
              const names = util.getArg(sourceMap, "names", []);
              const sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
              const sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
              const mappings = util.getArg(sourceMap, "mappings");
              const file = util.getArg(sourceMap, "file", null);
              const x_google_ignoreList = util.getArg(
                sourceMap,
                "x_google_ignoreList",
                null
              );
              if (version != that._version) {
                throw new Error("Unsupported version: " + version);
              }
              that._sourceLookupCache = /* @__PURE__ */ new Map();
              that._names = ArraySet.fromArray(names.map(String), true);
              that._sources = ArraySet.fromArray(sources, true);
              that._absoluteSources = ArraySet.fromArray(
                that._sources.toArray().map(function(s) {
                  return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
                }),
                true
              );
              that.sourceRoot = sourceRoot;
              that.sourcesContent = sourcesContent;
              that._mappings = mappings;
              that._sourceMapURL = aSourceMapURL;
              that.file = file;
              that.x_google_ignoreList = x_google_ignoreList;
              that._computedColumnSpans = false;
              that._mappingsPtr = 0;
              that._wasm = null;
              return wasm().then((w) => {
                that._wasm = w;
                return that;
              });
            });
          }
          /**
           * Utility function to find the index of a source.  Returns -1 if not
           * found.
           */
          _findSourceIndex(aSource) {
            const cachedIndex = this._sourceLookupCache.get(aSource);
            if (typeof cachedIndex === "number") {
              return cachedIndex;
            }
            const sourceAsMapRelative = util.computeSourceURL(
              null,
              aSource,
              this._sourceMapURL
            );
            if (this._absoluteSources.has(sourceAsMapRelative)) {
              const index = this._absoluteSources.indexOf(sourceAsMapRelative);
              this._sourceLookupCache.set(aSource, index);
              return index;
            }
            const sourceAsSourceRootRelative = util.computeSourceURL(
              this.sourceRoot,
              aSource,
              this._sourceMapURL
            );
            if (this._absoluteSources.has(sourceAsSourceRootRelative)) {
              const index = this._absoluteSources.indexOf(sourceAsSourceRootRelative);
              this._sourceLookupCache.set(aSource, index);
              return index;
            }
            return -1;
          }
          /**
           * Create a BasicSourceMapConsumer from a SourceMapGenerator.
           *
           * @param SourceMapGenerator aSourceMap
           *        The source map that will be consumed.
           * @param String aSourceMapURL
           *        The URL at which the source map can be found (optional)
           * @returns BasicSourceMapConsumer
           */
          static fromSourceMap(aSourceMap, aSourceMapURL) {
            return new _BasicSourceMapConsumer(aSourceMap.toString());
          }
          get sources() {
            return this._absoluteSources.toArray();
          }
          _getMappingsPtr() {
            if (this._mappingsPtr === 0) {
              this._parseMappings();
            }
            return this._mappingsPtr;
          }
          /**
           * Parse the mappings in a string in to a data structure which we can easily
           * query (the ordered arrays in the `this.__generatedMappings` and
           * `this.__originalMappings` properties).
           */
          _parseMappings() {
            const aStr = this._mappings;
            const size = aStr.length;
            const mappingsBufPtr = this._wasm.exports.allocate_mappings(size) >>> 0;
            const mappingsBuf = new Uint8Array(
              this._wasm.exports.memory.buffer,
              mappingsBufPtr,
              size
            );
            for (let i = 0; i < size; i++) {
              mappingsBuf[i] = aStr.charCodeAt(i);
            }
            const mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);
            if (!mappingsPtr) {
              const error = this._wasm.exports.get_last_error();
              let msg = `Error parsing mappings (code ${error}): `;
              switch (error) {
                case 1:
                  msg += "the mappings contained a negative line, column, source index, or name index";
                  break;
                case 2:
                  msg += "the mappings contained a number larger than 2**32";
                  break;
                case 3:
                  msg += "reached EOF while in the middle of parsing a VLQ";
                  break;
                case 4:
                  msg += "invalid base 64 character while parsing a VLQ";
                  break;
                default:
                  msg += "unknown error code";
                  break;
              }
              throw new Error(msg);
            }
            this._mappingsPtr = mappingsPtr;
          }
          eachMapping(aCallback, aContext, aOrder) {
            const context = aContext || null;
            const order = aOrder || SourceMapConsumer.GENERATED_ORDER;
            this._wasm.withMappingCallback(
              (mapping) => {
                if (mapping.source !== null) {
                  mapping.source = this._absoluteSources.at(mapping.source);
                  if (mapping.name !== null) {
                    mapping.name = this._names.at(mapping.name);
                  }
                }
                if (this._computedColumnSpans && mapping.lastGeneratedColumn === null) {
                  mapping.lastGeneratedColumn = Infinity;
                }
                aCallback.call(context, mapping);
              },
              () => {
                switch (order) {
                  case SourceMapConsumer.GENERATED_ORDER:
                    this._wasm.exports.by_generated_location(this._getMappingsPtr());
                    break;
                  case SourceMapConsumer.ORIGINAL_ORDER:
                    this._wasm.exports.by_original_location(this._getMappingsPtr());
                    break;
                  default:
                    throw new Error("Unknown order of iteration.");
                }
              }
            );
          }
          allGeneratedPositionsFor(aArgs) {
            let source = util.getArg(aArgs, "source");
            const originalLine = util.getArg(aArgs, "line");
            const originalColumn = aArgs.column || 0;
            source = this._findSourceIndex(source);
            if (source < 0) {
              return [];
            }
            if (originalLine < 1) {
              throw new Error("Line numbers must be >= 1");
            }
            if (originalColumn < 0) {
              throw new Error("Column numbers must be >= 0");
            }
            const mappings = [];
            this._wasm.withMappingCallback(
              (m) => {
                let lastColumn = m.lastGeneratedColumn;
                if (this._computedColumnSpans && lastColumn === null) {
                  lastColumn = Infinity;
                }
                mappings.push({
                  line: m.generatedLine,
                  column: m.generatedColumn,
                  lastColumn
                });
              },
              () => {
                this._wasm.exports.all_generated_locations_for(
                  this._getMappingsPtr(),
                  source,
                  originalLine - 1,
                  "column" in aArgs,
                  originalColumn
                );
              }
            );
            return mappings;
          }
          destroy() {
            if (this._mappingsPtr !== 0) {
              this._wasm.exports.free_mappings(this._mappingsPtr);
              this._mappingsPtr = 0;
            }
          }
          /**
           * Compute the last column for each generated mapping. The last column is
           * inclusive.
           */
          computeColumnSpans() {
            if (this._computedColumnSpans) {
              return;
            }
            this._wasm.exports.compute_column_spans(this._getMappingsPtr());
            this._computedColumnSpans = true;
          }
          /**
           * Returns the original source, line, and column information for the generated
           * source's line and column positions provided. The only argument is an object
           * with the following properties:
           *
           *   - line: The line number in the generated source.  The line number
           *     is 1-based.
           *   - column: The column number in the generated source.  The column
           *     number is 0-based.
           *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
           *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
           *
           * and an object is returned with the following properties:
           *
           *   - source: The original source file, or null.
           *   - line: The line number in the original source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the original source, or null.  The
           *     column number is 0-based.
           *   - name: The original identifier, or null.
           */
          originalPositionFor(aArgs) {
            const needle = {
              generatedLine: util.getArg(aArgs, "line"),
              generatedColumn: util.getArg(aArgs, "column")
            };
            if (needle.generatedLine < 1) {
              throw new Error("Line numbers must be >= 1");
            }
            if (needle.generatedColumn < 0) {
              throw new Error("Column numbers must be >= 0");
            }
            let bias = util.getArg(
              aArgs,
              "bias",
              SourceMapConsumer.GREATEST_LOWER_BOUND
            );
            if (bias == null) {
              bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
            }
            let mapping;
            this._wasm.withMappingCallback(
              (m) => mapping = m,
              () => {
                this._wasm.exports.original_location_for(
                  this._getMappingsPtr(),
                  needle.generatedLine - 1,
                  needle.generatedColumn,
                  bias
                );
              }
            );
            if (mapping) {
              if (mapping.generatedLine === needle.generatedLine) {
                let source = util.getArg(mapping, "source", null);
                if (source !== null) {
                  source = this._absoluteSources.at(source);
                }
                let name = util.getArg(mapping, "name", null);
                if (name !== null) {
                  name = this._names.at(name);
                }
                return {
                  source,
                  line: util.getArg(mapping, "originalLine", null),
                  column: util.getArg(mapping, "originalColumn", null),
                  name
                };
              }
            }
            return {
              source: null,
              line: null,
              column: null,
              name: null
            };
          }
          /**
           * Return true if we have the source content for every source in the source
           * map, false otherwise.
           */
          hasContentsOfAllSources() {
            if (!this.sourcesContent) {
              return false;
            }
            return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
              return sc == null;
            });
          }
          /**
           * Returns the original source content. The only argument is the url of the
           * original source file. Returns null if no original source content is
           * available.
           */
          sourceContentFor(aSource, nullOnMissing) {
            if (!this.sourcesContent) {
              return null;
            }
            const index = this._findSourceIndex(aSource);
            if (index >= 0) {
              return this.sourcesContent[index];
            }
            if (nullOnMissing) {
              return null;
            }
            throw new Error('"' + aSource + '" is not in the SourceMap.');
          }
          /**
           * Returns the generated line and column information for the original source,
           * line, and column positions provided. The only argument is an object with
           * the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number
           *     is 1-based.
           *   - column: The column number in the original source.  The column
           *     number is 0-based.
           *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
           *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
           *
           * and an object is returned with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *     The column number is 0-based.
           */
          generatedPositionFor(aArgs) {
            let source = util.getArg(aArgs, "source");
            source = this._findSourceIndex(source);
            if (source < 0) {
              return {
                line: null,
                column: null,
                lastColumn: null
              };
            }
            const needle = {
              source,
              originalLine: util.getArg(aArgs, "line"),
              originalColumn: util.getArg(aArgs, "column")
            };
            if (needle.originalLine < 1) {
              throw new Error("Line numbers must be >= 1");
            }
            if (needle.originalColumn < 0) {
              throw new Error("Column numbers must be >= 0");
            }
            let bias = util.getArg(
              aArgs,
              "bias",
              SourceMapConsumer.GREATEST_LOWER_BOUND
            );
            if (bias == null) {
              bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
            }
            let mapping;
            this._wasm.withMappingCallback(
              (m) => mapping = m,
              () => {
                this._wasm.exports.generated_location_for(
                  this._getMappingsPtr(),
                  needle.source,
                  needle.originalLine - 1,
                  needle.originalColumn,
                  bias
                );
              }
            );
            if (mapping) {
              if (mapping.source === needle.source) {
                let lastColumn = mapping.lastGeneratedColumn;
                if (this._computedColumnSpans && lastColumn === null) {
                  lastColumn = Infinity;
                }
                return {
                  line: util.getArg(mapping, "generatedLine", null),
                  column: util.getArg(mapping, "generatedColumn", null),
                  lastColumn
                };
              }
            }
            return {
              line: null,
              column: null,
              lastColumn: null
            };
          }
        };
        BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
        exports22.BasicSourceMapConsumer = BasicSourceMapConsumer;
        var IndexedSourceMapConsumer = class extends SourceMapConsumer {
          constructor(aSourceMap, aSourceMapURL) {
            return super(INTERNAL).then((that) => {
              let sourceMap = aSourceMap;
              if (typeof aSourceMap === "string") {
                sourceMap = util.parseSourceMapInput(aSourceMap);
              }
              const version = util.getArg(sourceMap, "version");
              const sections = util.getArg(sourceMap, "sections");
              if (version != that._version) {
                throw new Error("Unsupported version: " + version);
              }
              let lastOffset = {
                line: -1,
                column: 0
              };
              return Promise.all(
                sections.map((s) => {
                  if (s.url) {
                    throw new Error(
                      "Support for url field in sections not implemented."
                    );
                  }
                  const offset = util.getArg(s, "offset");
                  const offsetLine = util.getArg(offset, "line");
                  const offsetColumn = util.getArg(offset, "column");
                  if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
                    throw new Error(
                      "Section offsets must be ordered and non-overlapping."
                    );
                  }
                  lastOffset = offset;
                  const cons = new SourceMapConsumer(
                    util.getArg(s, "map"),
                    aSourceMapURL
                  );
                  return cons.then((consumer) => {
                    return {
                      generatedOffset: {
                        // The offset fields are 0-based, but we use 1-based indices when
                        // encoding/decoding from VLQ.
                        generatedLine: offsetLine + 1,
                        generatedColumn: offsetColumn + 1
                      },
                      consumer
                    };
                  });
                })
              ).then((s) => {
                that._sections = s;
                return that;
              });
            });
          }
          /**
           * The list of original sources.
           */
          get sources() {
            const sources = [];
            for (let i = 0; i < this._sections.length; i++) {
              for (let j = 0; j < this._sections[i].consumer.sources.length; j++) {
                sources.push(this._sections[i].consumer.sources[j]);
              }
            }
            return sources;
          }
          /**
           * Returns the original source, line, and column information for the generated
           * source's line and column positions provided. The only argument is an object
           * with the following properties:
           *
           *   - line: The line number in the generated source.  The line number
           *     is 1-based.
           *   - column: The column number in the generated source.  The column
           *     number is 0-based.
           *
           * and an object is returned with the following properties:
           *
           *   - source: The original source file, or null.
           *   - line: The line number in the original source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the original source, or null.  The
           *     column number is 0-based.
           *   - name: The original identifier, or null.
           */
          originalPositionFor(aArgs) {
            const needle = {
              generatedLine: util.getArg(aArgs, "line"),
              generatedColumn: util.getArg(aArgs, "column")
            };
            const sectionIndex = binarySearch.search(
              needle,
              this._sections,
              function(aNeedle, section2) {
                const cmp = aNeedle.generatedLine - section2.generatedOffset.generatedLine;
                if (cmp) {
                  return cmp;
                }
                return aNeedle.generatedColumn - (section2.generatedOffset.generatedColumn - 1);
              }
            );
            const section = this._sections[sectionIndex];
            if (!section) {
              return {
                source: null,
                line: null,
                column: null,
                name: null
              };
            }
            return section.consumer.originalPositionFor({
              line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
              column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
              bias: aArgs.bias
            });
          }
          /**
           * Return true if we have the source content for every source in the source
           * map, false otherwise.
           */
          hasContentsOfAllSources() {
            return this._sections.every(function(s) {
              return s.consumer.hasContentsOfAllSources();
            });
          }
          /**
           * Returns the original source content. The only argument is the url of the
           * original source file. Returns null if no original source content is
           * available.
           */
          sourceContentFor(aSource, nullOnMissing) {
            for (let i = 0; i < this._sections.length; i++) {
              const section = this._sections[i];
              const content = section.consumer.sourceContentFor(aSource, true);
              if (content) {
                return content;
              }
            }
            if (nullOnMissing) {
              return null;
            }
            throw new Error('"' + aSource + '" is not in the SourceMap.');
          }
          _findSectionIndex(source) {
            for (let i = 0; i < this._sections.length; i++) {
              const { consumer } = this._sections[i];
              if (consumer._findSourceIndex(source) !== -1) {
                return i;
              }
            }
            return -1;
          }
          /**
           * Returns the generated line and column information for the original source,
           * line, and column positions provided. The only argument is an object with
           * the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number
           *     is 1-based.
           *   - column: The column number in the original source.  The column
           *     number is 0-based.
           *
           * and an object is returned with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *     The column number is 0-based.
           */
          generatedPositionFor(aArgs) {
            const index = this._findSectionIndex(util.getArg(aArgs, "source"));
            const section = index >= 0 ? this._sections[index] : null;
            const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
            const generatedPosition = section && section.consumer.generatedPositionFor(aArgs);
            if (generatedPosition && generatedPosition.line !== null) {
              const lineShift = section.generatedOffset.generatedLine - 1;
              const columnShift = section.generatedOffset.generatedColumn - 1;
              if (generatedPosition.line === 1) {
                generatedPosition.column += columnShift;
                if (typeof generatedPosition.lastColumn === "number") {
                  generatedPosition.lastColumn += columnShift;
                }
              }
              if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) {
                generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
              }
              generatedPosition.line += lineShift;
              return generatedPosition;
            }
            return {
              line: null,
              column: null,
              lastColumn: null
            };
          }
          allGeneratedPositionsFor(aArgs) {
            const index = this._findSectionIndex(util.getArg(aArgs, "source"));
            const section = index >= 0 ? this._sections[index] : null;
            const nextSection = index >= 0 && index + 1 < this._sections.length ? this._sections[index + 1] : null;
            if (!section) return [];
            return section.consumer.allGeneratedPositionsFor(aArgs).map((generatedPosition) => {
              const lineShift = section.generatedOffset.generatedLine - 1;
              const columnShift = section.generatedOffset.generatedColumn - 1;
              if (generatedPosition.line === 1) {
                generatedPosition.column += columnShift;
                if (typeof generatedPosition.lastColumn === "number") {
                  generatedPosition.lastColumn += columnShift;
                }
              }
              if (generatedPosition.lastColumn === Infinity && nextSection && generatedPosition.line === nextSection.generatedOffset.generatedLine) {
                generatedPosition.lastColumn = nextSection.generatedOffset.generatedColumn - 2;
              }
              generatedPosition.line += lineShift;
              return generatedPosition;
            });
          }
          eachMapping(aCallback, aContext, aOrder) {
            this._sections.forEach((section, index) => {
              const nextSection = index + 1 < this._sections.length ? this._sections[index + 1] : null;
              const { generatedOffset } = section;
              const lineShift = generatedOffset.generatedLine - 1;
              const columnShift = generatedOffset.generatedColumn - 1;
              section.consumer.eachMapping(
                function(mapping) {
                  if (mapping.generatedLine === 1) {
                    mapping.generatedColumn += columnShift;
                    if (typeof mapping.lastGeneratedColumn === "number") {
                      mapping.lastGeneratedColumn += columnShift;
                    }
                  }
                  if (mapping.lastGeneratedColumn === Infinity && nextSection && mapping.generatedLine === nextSection.generatedOffset.generatedLine) {
                    mapping.lastGeneratedColumn = nextSection.generatedOffset.generatedColumn - 2;
                  }
                  mapping.generatedLine += lineShift;
                  aCallback.call(this, mapping);
                },
                aContext,
                aOrder
              );
            });
          }
          computeColumnSpans() {
            for (let i = 0; i < this._sections.length; i++) {
              this._sections[i].consumer.computeColumnSpans();
            }
          }
          destroy() {
            for (let i = 0; i < this._sections.length; i++) {
              this._sections[i].consumer.destroy();
            }
          }
        };
        exports22.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
        function _factory(aSourceMap, aSourceMapURL) {
          let sourceMap = aSourceMap;
          if (typeof aSourceMap === "string") {
            sourceMap = util.parseSourceMapInput(aSourceMap);
          }
          const consumer = sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
          return Promise.resolve(consumer);
        }
        function _factoryBSM(aSourceMap, aSourceMapURL) {
          return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
        }
      }
    });
    var require_source_node = __commonJS2({
      "node_modules/source-map/lib/source-node.js"(exports22) {
        var SourceMapGenerator2 = require_source_map_generator().SourceMapGenerator;
        var util = require_util();
        var REGEX_NEWLINE = /(\r?\n)/;
        var NEWLINE_CODE = 10;
        var isSourceNode = "$$$isSourceNode$$$";
        var SourceNode = class _SourceNode {
          constructor(aLine, aColumn, aSource, aChunks, aName) {
            this.children = [];
            this.sourceContents = /* @__PURE__ */ Object.create(null);
            this.line = aLine == null ? null : aLine;
            this.column = aColumn == null ? null : aColumn;
            this.source = aSource == null ? null : aSource;
            this.name = aName == null ? null : aName;
            this[isSourceNode] = true;
            if (aChunks != null) this.add(aChunks);
          }
          /**
           * Creates a SourceNode from generated code and a SourceMapConsumer.
           *
           * @param aGeneratedCode The generated code
           * @param aSourceMapConsumer The SourceMap for the generated code
           * @param aRelativePath Optional. The path that relative sources in the
           *        SourceMapConsumer should be relative to.
           */
          static fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
            const node = new _SourceNode();
            const remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
            let remainingLinesIndex = 0;
            const shiftNextLine = function() {
              const lineContents = getNextLine();
              const newLine = getNextLine() || "";
              return lineContents + newLine;
              function getNextLine() {
                return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
              }
            };
            let lastGeneratedLine = 1, lastGeneratedColumn = 0;
            let lastMapping = null;
            let nextLine;
            aSourceMapConsumer.eachMapping(function(mapping) {
              if (lastMapping !== null) {
                if (lastGeneratedLine < mapping.generatedLine) {
                  addMappingWithCode(lastMapping, shiftNextLine());
                  lastGeneratedLine++;
                  lastGeneratedColumn = 0;
                } else {
                  nextLine = remainingLines[remainingLinesIndex] || "";
                  const code = nextLine.substr(
                    0,
                    mapping.generatedColumn - lastGeneratedColumn
                  );
                  remainingLines[remainingLinesIndex] = nextLine.substr(
                    mapping.generatedColumn - lastGeneratedColumn
                  );
                  lastGeneratedColumn = mapping.generatedColumn;
                  addMappingWithCode(lastMapping, code);
                  lastMapping = mapping;
                  return;
                }
              }
              while (lastGeneratedLine < mapping.generatedLine) {
                node.add(shiftNextLine());
                lastGeneratedLine++;
              }
              if (lastGeneratedColumn < mapping.generatedColumn) {
                nextLine = remainingLines[remainingLinesIndex] || "";
                node.add(nextLine.substr(0, mapping.generatedColumn));
                remainingLines[remainingLinesIndex] = nextLine.substr(
                  mapping.generatedColumn
                );
                lastGeneratedColumn = mapping.generatedColumn;
              }
              lastMapping = mapping;
            }, this);
            if (remainingLinesIndex < remainingLines.length) {
              if (lastMapping) {
                addMappingWithCode(lastMapping, shiftNextLine());
              }
              node.add(remainingLines.splice(remainingLinesIndex).join(""));
            }
            aSourceMapConsumer.sources.forEach(function(sourceFile) {
              const content = aSourceMapConsumer.sourceContentFor(sourceFile);
              if (content != null) {
                if (aRelativePath != null) {
                  sourceFile = util.join(aRelativePath, sourceFile);
                }
                node.setSourceContent(sourceFile, content);
              }
            });
            return node;
            function addMappingWithCode(mapping, code) {
              if (mapping === null || mapping.source === void 0) {
                node.add(code);
              } else {
                const source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
                node.add(
                  new _SourceNode(
                    mapping.originalLine,
                    mapping.originalColumn,
                    source,
                    code,
                    mapping.name
                  )
                );
              }
            }
          }
          /**
           * Add a chunk of generated JS to this source node.
           *
           * @param aChunk A string snippet of generated JS code, another instance of
           *        SourceNode, or an array where each member is one of those things.
           */
          add(aChunk) {
            if (Array.isArray(aChunk)) {
              aChunk.forEach(function(chunk) {
                this.add(chunk);
              }, this);
            } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
              if (aChunk) {
                this.children.push(aChunk);
              }
            } else {
              throw new TypeError(
                "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
              );
            }
            return this;
          }
          /**
           * Add a chunk of generated JS to the beginning of this source node.
           *
           * @param aChunk A string snippet of generated JS code, another instance of
           *        SourceNode, or an array where each member is one of those things.
           */
          prepend(aChunk) {
            if (Array.isArray(aChunk)) {
              for (let i = aChunk.length - 1; i >= 0; i--) {
                this.prepend(aChunk[i]);
              }
            } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
              this.children.unshift(aChunk);
            } else {
              throw new TypeError(
                "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
              );
            }
            return this;
          }
          /**
           * Walk over the tree of JS snippets in this node and its children. The
           * walking function is called once for each snippet of JS and is passed that
           * snippet and the its original associated source's line/column location.
           *
           * @param aFn The traversal function.
           */
          walk(aFn) {
            let chunk;
            for (let i = 0, len = this.children.length; i < len; i++) {
              chunk = this.children[i];
              if (chunk[isSourceNode]) {
                chunk.walk(aFn);
              } else if (chunk !== "") {
                aFn(chunk, {
                  source: this.source,
                  line: this.line,
                  column: this.column,
                  name: this.name
                });
              }
            }
          }
          /**
           * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
           * each of `this.children`.
           *
           * @param aSep The separator.
           */
          join(aSep) {
            let newChildren;
            let i;
            const len = this.children.length;
            if (len > 0) {
              newChildren = [];
              for (i = 0; i < len - 1; i++) {
                newChildren.push(this.children[i]);
                newChildren.push(aSep);
              }
              newChildren.push(this.children[i]);
              this.children = newChildren;
            }
            return this;
          }
          /**
           * Call String.prototype.replace on the very right-most source snippet. Useful
           * for trimming whitespace from the end of a source node, etc.
           *
           * @param aPattern The pattern to replace.
           * @param aReplacement The thing to replace the pattern with.
           */
          replaceRight(aPattern, aReplacement) {
            const lastChild = this.children[this.children.length - 1];
            if (lastChild[isSourceNode]) {
              lastChild.replaceRight(aPattern, aReplacement);
            } else if (typeof lastChild === "string") {
              this.children[this.children.length - 1] = lastChild.replace(
                aPattern,
                aReplacement
              );
            } else {
              this.children.push("".replace(aPattern, aReplacement));
            }
            return this;
          }
          /**
           * Set the source content for a source file. This will be added to the SourceMapGenerator
           * in the sourcesContent field.
           *
           * @param aSourceFile The filename of the source file
           * @param aSourceContent The content of the source file
           */
          setSourceContent(aSourceFile, aSourceContent) {
            this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
          }
          /**
           * Walk over the tree of SourceNodes. The walking function is called for each
           * source file content and is passed the filename and source content.
           *
           * @param aFn The traversal function.
           */
          walkSourceContents(aFn) {
            for (let i = 0, len = this.children.length; i < len; i++) {
              if (this.children[i][isSourceNode]) {
                this.children[i].walkSourceContents(aFn);
              }
            }
            const sources = Object.keys(this.sourceContents);
            for (let i = 0, len = sources.length; i < len; i++) {
              aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
            }
          }
          /**
           * Return the string representation of this source node. Walks over the tree
           * and concatenates all the various snippets together to one string.
           */
          toString() {
            let str = "";
            this.walk(function(chunk) {
              str += chunk;
            });
            return str;
          }
          /**
           * Returns the string representation of this source node along with a source
           * map.
           */
          toStringWithSourceMap(aArgs) {
            const generated = {
              code: "",
              line: 1,
              column: 0
            };
            const map = new SourceMapGenerator2(aArgs);
            let sourceMappingActive = false;
            let lastOriginalSource = null;
            let lastOriginalLine = null;
            let lastOriginalColumn = null;
            let lastOriginalName = null;
            this.walk(function(chunk, original) {
              generated.code += chunk;
              if (original.source !== null && original.line !== null && original.column !== null) {
                if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
                  map.addMapping({
                    source: original.source,
                    original: {
                      line: original.line,
                      column: original.column
                    },
                    generated: {
                      line: generated.line,
                      column: generated.column
                    },
                    name: original.name
                  });
                }
                lastOriginalSource = original.source;
                lastOriginalLine = original.line;
                lastOriginalColumn = original.column;
                lastOriginalName = original.name;
                sourceMappingActive = true;
              } else if (sourceMappingActive) {
                map.addMapping({
                  generated: {
                    line: generated.line,
                    column: generated.column
                  }
                });
                lastOriginalSource = null;
                sourceMappingActive = false;
              }
              for (let idx = 0, length = chunk.length; idx < length; idx++) {
                if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
                  generated.line++;
                  generated.column = 0;
                  if (idx + 1 === length) {
                    lastOriginalSource = null;
                    sourceMappingActive = false;
                  } else if (sourceMappingActive) {
                    map.addMapping({
                      source: original.source,
                      original: {
                        line: original.line,
                        column: original.column
                      },
                      generated: {
                        line: generated.line,
                        column: generated.column
                      },
                      name: original.name
                    });
                  }
                } else {
                  generated.column++;
                }
              }
            });
            this.walkSourceContents(function(sourceFile, sourceContent) {
              map.setSourceContent(sourceFile, sourceContent);
            });
            return { code: generated.code, map };
          }
        };
        exports22.SourceNode = SourceNode;
      }
    });
    var require_source_map = __commonJS2({
      "node_modules/source-map/source-map.js"(exports22) {
        exports22.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
        exports22.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
        exports22.SourceNode = require_source_node().SourceNode;
      }
    });
    var SourceMapGenerator = require_source_map().SourceMapGenerator;
    var hasOwn2 = Object.prototype.hasOwnProperty;
    function offsetMapping(mapping, offset) {
      return {
        line: offset.line + mapping.line,
        column: offset.column + mapping.column
      };
    }
    function newlinesIn(source) {
      if (!source) return 0;
      var count = 0;
      for (var index = 0; index < source.length; index++) {
        if (source.charCodeAt(index) === 10) count++;
      }
      return count;
    }
    function encodeBase64(value) {
      if (typeof Buffer !== "undefined") {
        return Buffer.from(value).toString("base64");
      }
      if (typeof TextEncoder !== "undefined" && typeof btoa === "function") {
        var bytes = new TextEncoder().encode(value);
        var binary = "";
        for (var index = 0; index < bytes.length; index++) {
          binary += String.fromCharCode(bytes[index]);
        }
        return btoa(binary);
      }
      throw new Error("No UTF-8 base64 encoder is available in this environment");
    }
    function Generator(options) {
      options = options || {};
      this.generator = new SourceMapGenerator({
        file: options.file || "",
        sourceRoot: options.sourceRoot || ""
      });
      this.sourcesContent = void 0;
      this.opts = options;
    }
    Generator.prototype.addMappings = function(sourceFile, mappings, offset) {
      var generator = this.generator;
      offset = offset || {};
      offset.line = hasOwn2.call(offset, "line") ? offset.line : 0;
      offset.column = hasOwn2.call(offset, "column") ? offset.column : 0;
      mappings.forEach(function(mapping) {
        generator.addMapping({
          source: mapping.original ? sourceFile : void 0,
          original: mapping.original,
          generated: offsetMapping(mapping.generated, offset)
        });
      });
      return this;
    };
    Generator.prototype.addGeneratedMappings = function(sourceFile, source, offset) {
      var mappings = [];
      var linesToGenerate = newlinesIn(source) + 1;
      for (var line = 1; line <= linesToGenerate; line++) {
        var location = { line, column: 0 };
        mappings.push({ original: location, generated: location });
      }
      return this.addMappings(sourceFile, mappings, offset);
    };
    Generator.prototype.addSourceContent = function(sourceFile, sourceContent) {
      this.sourcesContent = this.sourcesContent || /* @__PURE__ */ Object.create(null);
      this.sourcesContent[sourceFile] = sourceContent;
      return this;
    };
    Generator.prototype.base64Encode = function() {
      return encodeBase64(this.toString());
    };
    Generator.prototype.inlineMappingUrl = function() {
      var charset = this.opts.charset || "utf-8";
      return "//# sourceMappingURL=data:application/json;charset=" + charset + ";base64," + this.base64Encode();
    };
    Generator.prototype.toJSON = function() {
      var map = this.generator.toJSON();
      if (!this.sourcesContent) return map;
      var sourcesContent = this.sourcesContent;
      map.sourcesContent = map.sources.map(function(source) {
        return typeof sourcesContent[source] === "string" ? sourcesContent[source] : null;
      });
      return map;
    };
    Generator.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Generator.prototype._mappings = function() {
      return this.generator._mappings._array.map(function(mapping) {
        return {
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine === null || typeof mapping.originalLine === "undefined" ? false : mapping.originalLine,
          originalColumn: mapping.originalColumn === null || typeof mapping.originalColumn === "undefined" ? false : mapping.originalColumn,
          source: mapping.source === null || typeof mapping.source === "undefined" ? null : mapping.source,
          name: mapping.name === null || typeof mapping.name === "undefined" ? null : mapping.name
        };
      });
    };
    Generator.prototype.gen = function() {
      return this.generator;
    };
    module2.exports = function createGenerator2(options) {
      return new Generator(options);
    };
    module2.exports.Generator = Generator;
  }
});

// lib/mappings-from-map.js
var require_mappings_from_map = __commonJS({
  "lib/mappings-from-map.js"(exports2, module2) {
    "use strict";
    var traceMapping2 = require_trace_mapping_umd();
    module2.exports = function mappingsFromMap2(map) {
      var tracer = map instanceof traceMapping2.TraceMap ? map : new traceMapping2.AnyMap(map);
      var mappings = [];
      traceMapping2.eachMapping(tracer, function(mapping) {
        var hasOriginal = typeof mapping.originalColumn === "number";
        mappings.push({
          original: hasOriginal ? {
            column: mapping.originalColumn,
            line: mapping.originalLine
          } : void 0,
          generated: {
            column: mapping.generatedColumn,
            line: mapping.generatedLine
          },
          source: hasOriginal ? mapping.source : void 0,
          name: mapping.name
        });
      });
      return mappings;
    };
  }
});

// index.js
var resolveUri = require_resolve_uri_umd();
var traceMapping = require_trace_mapping_umd();
var convert = require_convert_source_map();
var createGenerator = require_browser();
var mappingsFromMap = require_mappings_from_map();
var hasOwn = Object.prototype.hasOwnProperty;
var protocolPattern = /^[A-Za-z][A-Za-z0-9+.-]*:/;
var windowsAbsolutePattern = /^[A-Za-z]:\//;
function normalizeSlashes(value) {
  return value.replace(/\\/g, "/");
}
function isAbsoluteReference(value) {
  return value.charAt(0) === "/" || windowsAbsolutePattern.test(value) || protocolPattern.test(value);
}
function rebaseRelativePath(sourceFile, relativePath) {
  if (!relativePath) return relativePath;
  var normalizedPath = normalizeSlashes(relativePath);
  var normalizedSource = normalizeSlashes(sourceFile);
  if (normalizedSource === normalizedPath || isAbsoluteReference(normalizedPath)) {
    return resolveUri(normalizedPath);
  }
  return resolveUri(normalizedPath, normalizedSource);
}
function resolveMap(source) {
  var converter = convert.fromSource(source);
  return converter ? converter.toObject() : null;
}
function createTracer(map) {
  return new traceMapping.AnyMap(map);
}
function hasInlinedSource(tracer) {
  var contents = tracer.sourcesContent;
  if (!contents) return false;
  for (var index = 0; index < contents.length; index++) {
    if (typeof contents[index] === "string") return true;
  }
  return false;
}
function normalizeOffset(offset) {
  offset = offset || {};
  return {
    line: hasOwn.call(offset, "line") ? offset.line : 0,
    column: hasOwn.call(offset, "column") ? offset.column : 0
  };
}
function Combiner(file, sourceRoot) {
  this.generator = createGenerator({
    file: file || "generated.js",
    sourceRoot
  });
}
Combiner.prototype._addGeneratedMap = function(sourceFile, source, offset) {
  this.generator.addGeneratedMappings(sourceFile, source, offset);
  this.generator.addSourceContent(sourceFile, source);
  return this;
};
Combiner.prototype._addExistingMap = function(sourceFile, source, existingMap, offset) {
  var tracer = createTracer(existingMap);
  var contents = tracer.sourcesContent;
  var sources = tracer.resolvedSources;
  if (contents) {
    for (var index = 0; index < sources.length; index++) {
      if (typeof contents[index] !== "string") continue;
      this.generator.addSourceContent(
        rebaseRelativePath(sourceFile, sources[index]),
        contents[index]
      );
    }
  }
  mappingsFromMap(tracer).forEach(function(mapping) {
    this.generator.addMappings(
      rebaseRelativePath(sourceFile, mapping.source),
      [mapping],
      offset
    );
  }, this);
  return this;
};
Combiner.prototype.addFile = function(options, offset) {
  var normalizedOffset = normalizeOffset(offset);
  var existingMap = resolveMap(options.source);
  if (existingMap) {
    var tracer = createTracer(existingMap);
    if (hasInlinedSource(tracer)) {
      return this._addExistingMap(
        options.sourceFile,
        options.source,
        existingMap,
        normalizedOffset
      );
    }
  }
  return this._addGeneratedMap(options.sourceFile, options.source, normalizedOffset);
};
Combiner.prototype.base64 = function() {
  return this.generator.base64Encode();
};
Combiner.prototype.comment = function() {
  return this.generator.inlineMappingUrl();
};
exports.create = function(file, sourceRoot) {
  return new Combiner(file, sourceRoot);
};
exports.removeComments = function(source) {
  if (!source.replace) return source;
  return convert.removeMapFileComments(convert.removeComments(source));
};
