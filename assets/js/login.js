$(function () {
    // 点击 去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui 中获取form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 的函数自定义效验规则
    form.verify({
        // 自定义了一个叫做 pwd 效验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
        //   效验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        var data = { username: $('#form_reg [name="username"]').val(), password: $('#form_reg [name="password"]').val() }
        e.preventDefault()
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录!')
            // 自动跳转到登录
            $('#link_login').click()
        })
    })

    // 监听登录表单提交事件
    $('#from_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功！')
                // 将登陆成功得到的 token 字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
