import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva';
import {
    Form,
    Input,
    Row,
    Col,
    Alert,
    Button
} from 'antd';
import { error } from '@/utils/utils.js';

import styles from './index.less';

const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

@Form.create()
@connect(({ global, loading }) => ({
    ...global,
    loading: loading.effects['global/getLogin']
}))
class LoginLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userName: sessionStorage.getItem('txtName') || '',
            passWord: sessionStorage.getItem('txtPwd') || '',
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const promise = this.props.dispatch({
                    type: 'global/getLogin',
                    payload: {
                        UserName: values.userName,
                        PassWord: values.password,
                    }
                });
                // // 获取登陆结果
                promise.then((login) => {
                    console.log('login', login)
                    if (login) {
                        this.props.dispatch(routerRedux.push('/Testsubject'));
                        sessionStorage.setItem('userName', values.userName)
                    } else {
                        error('登录失败!', '用户名或密码错误,请重新登录');
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            userName,
            passWord,
        } = this.state;
        return (
            <div className={styles['login-container']}>
                <div className={styles.info}>
                    <Form className={styles.form} onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="账号">
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true,
                                    message: '账号不能为空'
                                }],
                                initialValue: userName
                            })(<Input
                                className={styles.uname}
                            />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '密码不能为空'
                                }],
                                initialValue: passWord
                            })(<Input
                                type="password"
                                className={styles.upwd}
                                border={false}
                            />)}
                        </FormItem>
                        <Row>
                            <Col span={12}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.loading}
                                    className={styles.btn}
                                >
                                    登录
                               </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginLayout;
