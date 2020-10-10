# Marine
用来操作 Aqua 的语言, 会解释成 Aqua 环境下的 JS

## 规范 Standard
------

### 语法
------

SELECT line FROM aqua WHERE index < 10
DO
SAVE AS 'nya'
THEN
WRITE 'ayari'


```
- <ObjectList> #高亮这些行
- <ObjectList> DO <ActionList>

- <ObjectList>
    - SELECT <Object> FROM <FileList> WHERE <FilterList>
    - SELECT <Object> WHERE <FilterList>
    - <ObjectList> <LogicExp> <ObjectList>

- <Object>
    - Cursor
    - Line

- <FileList>
    - <File>
    - <File>, <FileList>

- <File>
    - <FileName>.<Extension>

- <FileName>
    - <String>

- <Extension>
    - <String>

- <FilterList>
    - <Filter>
    - <Filter> <LogicExp> <FilterList>

- <Filter>
    - <File>.<Sign>
    - <Sign>
    - <Attribute> <CompareOperator> <Sign>

- <Sign>
    - <Index>
    - <Id>

- <Index>        
    - Number #<Object> 的下标
- <Id>
    - <String> #Object 的 Id

- <Attribute>
    - index
    - id
    - data
    - <FileName>

- <CompareOperator>
    - >
    - ===
    - <
    - >=
    - <=

- <LogicExp>
    - AND
    - OR
    - NOT

- <ActionList>
    - <Action>
    - <Action> THEN <ActionList>

- <Action>
    - Delete
    - Create After
    - Insert <AssetList>

- <AssetList>
    - Asset
    - <Asset> NEXT <AssetList>

- <Asset>
    - <String>
    - <AquaAsset> #在 Aqua 中被注册的 Asset

- <AquaAsset>
    - <AssetType> <AssetDataList>

- <AssetType>
    - <String>

- <AssetDataList>
    - {<AssetData>}
    - {<AssetData>, <AssetDataList>}

- <AssetData>
    - <AssetDataKey>: <AssetDataValue>

- <AssetDataKey>
    - <String>

- <AssetDataValue>
    - <String>

```



### 类型 Type
------
类型系统使用 js 的类型系统
    
#### 特殊类型
Marine 中特化的类型

- Baffle 
    直译为隔板, 附着于物件的上方/左方 或者 下方/右方, 用于划定一块范围

- Asset 
    Aqua 中允许的 Asset 类型

### 语言常量
------

- <File>
    - DocStart<Number>
        - 文档的起始行
    - DocEnd<Number>
        - 文档的末尾行    
    - [Instance.]All<Number>
        - FROM [Instance.]DocStart TO [Instance.]DocEnd
