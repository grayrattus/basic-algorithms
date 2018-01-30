var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Drawable = /** @class */ (function () {
    function Drawable() {
        var canvas = document.getElementById("graphs");
        this.ctx = canvas.getContext('2d');
    }
    return Drawable;
}());
var Vertex = /** @class */ (function (_super) {
    __extends(Vertex, _super);
    function Vertex(name, x, y) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Vertex.prototype.getX = function () {
        return this.x;
    };
    Vertex.prototype.getY = function () {
        return this.y;
    };
    Vertex.prototype.draw = function () {
        console.log("test");
        this.ctx.fillRect(this.x, this.y, 20, 20);
    };
    return Vertex;
}(Drawable));
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge(from, to) {
        var _this = _super.call(this) || this;
        _this.from = from;
        _this.to = to;
        return _this;
    }
    Edge.prototype.getFrom = function () {
        return this.from;
    };
    Edge.prototype.getTo = function () {
        return this.to;
    };
    Edge.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.moveTo(this.from.getX(), this.from.getY());
        this.ctx.lineTo(this.to.getX(), this.to.getY());
        this.ctx.stroke();
    };
    return Edge;
}(Drawable));
var Line = /** @class */ (function () {
    function Line(begin, end) {
        this.begin = begin;
        this.end = end;
    }
    return Line;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.edges = new Array();
    }
    Graph.prototype.addEdge = function (from, to) {
        this.edges.push(new Edge(from, to));
    };
    Graph.prototype.draw = function () {
        var tmpVertex = new Set();
        for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {
            var edge = _a[_i];
            edge.draw();
            tmpVertex.add(edge.getFrom());
            tmpVertex.add(edge.getTo());
        }
        tmpVertex.forEach(function (v) {
            v.draw();
        });
    };
    return Graph;
}());
window.onload = function () {
    var v = Array();
    var g = new Graph();
    var V_NUMBER = 10;
    for (var i = 0; i < V_NUMBER; i++) {
        v.push(new Vertex(i, Math.random() * 450 + 1, Math.random() * 450 + 1));
    }
    var begin = 0;
    var end = V_NUMBER - 1;
    var myVertex = new Vertex(666, 100, 100);
    for (; begin <= V_NUMBER / 2 && end >= V_NUMBER / 2; begin++, end--) {
        g.addEdge(v[begin], v[end]);
    }
    g.addEdge(v[0], myVertex);
    g.draw();
    console.log(g);
};
