abstract class Drawable {
    ctx: CanvasRenderingContext2D;
    constructor() {
        let canvas = <HTMLCanvasElement>document.getElementById("graphs");
        this.ctx = canvas.getContext('2d');
    }
    public abstract draw();
}

class Vertex extends Drawable {
    name: number;
    private x: number;
    private y: number;
    constructor(name: number, x: number, y: number) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public draw() {
        console.log("test");
        this.ctx.fillRect(this.x,this.y,20,20);
    }
}

class Edge extends Drawable{
    private from: Vertex;
    private to: Vertex;
    constructor(from: Vertex, to:Vertex) {
        super();
        this.from = from;
        this.to = to;
    }
    getFrom(): Vertex {
        return this.from;
    }
    getTo(): Vertex {
        return this.to;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.from.getX(),this.from.getY());
        this.ctx.lineTo(this.to.getX(),this.to.getY());
        this.ctx.stroke();
    }

}

class Line {
    begin: Vertex;
    end: Vertex;

    constructor(begin: Vertex, end: Vertex) {
        this.begin = begin;
        this.end = end;
    }
}

class Graph {
    private edges: Array<Edge> = new Array<Edge>();
    constructor() {

    }

    addEdge(from: Vertex, to: Vertex) {
        this.edges.push(new Edge(from, to));
    }

    draw() {
        let tmpVertex = new Set<Vertex>();
        for(let edge of this.edges) {
            edge.draw();
            tmpVertex.add(edge.getFrom());
            tmpVertex.add(edge.getTo());
        }

        tmpVertex.forEach((v)=> {
            v.draw();
        });
    }
}

window.onload = () => {
    let v = Array<Vertex>();
    let g = new Graph();
    const V_NUMBER = 10;

    for (let i = 0; i < V_NUMBER; i++) {
        v.push(new Vertex(i, Math.random() * 450 + 1, Math.random() * 450  + 1));
    }

    let begin = 0;
    let end = V_NUMBER - 1;

    const myVertex = new Vertex(666, 100, 100);

    for (;begin <= V_NUMBER / 2 && end >= V_NUMBER/2; begin++, end--) {
        g.addEdge(v[begin], v[end]);
    }

    g.addEdge(v[0], myVertex);

    g.draw();

    console.log(g);
};