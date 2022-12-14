$(function () {
    var form = layui.form

    //为密码框定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {

            if (value === $('[name=oldPwd]').val())
                return '新旧密码不能相同!'
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd').val())
                return '两次密码不一致'
        },

    })
    //发起请求实现重置密码的功能
    $('.layui-form').on('submit',function(e){

        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新密码失败！')
                }
                
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
                location.href='/login.html'

            }
        })
    })
})