CSS 为 code 标签提供了一条属性
{
    margin-right: 0.1px; // 或者也可以是 padding-right: 0.1px;
}

padding 为几都无所谓.

这个是为了防止在 Chrome 下. 通过 getClientRects() 拿到的并非是行数, 而是里面有几个元素就有几个 rects 的情况.
而加上这个 margin 就可以修复...

怀疑是跟边距折叠相关的 bug...
因为 border margin padding 设置任意非0数值都可以修复.  height 相关的无法测试. 因为内联元素不受该属性影响...
