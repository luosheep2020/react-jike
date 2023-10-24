import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/modules/user.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (value) => {
        await dispatch(fetchLogin(value))
        navigate('/')
        message.success('登陆成功')
    }
    return (
        <div>
            <div className="login">
                <Card className="login-container">
                    <img className="login-logo" src={logo} alt=""/>
                    {/* 登录表单 */}
                    <Form onFinish={onFinish} validateTrigger="onBlur">
                        <Form.Item
                            name="mobile"
                            initialValue={'19974970904'}
                            // 多条校验逻辑 先校验第一条 第一条通过之后再校验第二条
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '请输入正确的手机号格式'
                                }
                            ]}>
                            <Input size="large" placeholder="请输入手机号"/>
                        </Form.Item>
                        <Form.Item
                            name="code"
                            initialValue={'246810'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}>
                            <Input size="large" placeholder="请输入验证码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login