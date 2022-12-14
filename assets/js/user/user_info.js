$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用 `form.val()` 方法为表单赋值：
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click',function(e){

        e.preventDefault();
        // 阻止表单的默认重置行为
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){

        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起 ajax 数据请求
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
                // 注意：`<iframe>` 中的子页面，
                // 如果想要调用父页面中的方法，使用 `window.parent` 即可
            }
        })
        
    })
})

