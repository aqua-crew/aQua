## Aqua instance
```js
Aqua.prototype.write(asset<Asset>, pos<Cursor | Coord >)
Aqua.prototype.delete(from<Cursor | Coord | Number>, to<Cursor | Coord | Number>)
Aqua.prototype.read(from<Cursor | Coord | Number>, to<Cursor | Coord | Number>)
Aqua.prototype.replace(from<Cursor | Coord | Number>, to<Cursor | Coord | Number>, asset<Asset>)
Aqua.prototype.search(asset)

Aqua.prototype.do(
    fn<Function
        (cursor<Cursor>, index<Number>)
    >
)

Aqua.prototype.rebuild(info<AquaConfigAndStatus>)
```
