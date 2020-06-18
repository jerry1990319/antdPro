import { connect } from 'dva';
import React from 'react';
import { Form, Row, Col, Icon, Input } from 'antd';
import Upload from '@/components/Upload';
import styles from './index.less';
// const { Option } = Select;
let i = 0;
const datakey = {
    title: '',
    imageUrl: '',
    num:i,
    key: i
};
@Form.create()
@connect(({ global }) => ({
    ...global
}))
class QuestionAdd extends React.PureComponent {
    constructor(props) {
        super(props);
        this.keylist=[]

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.optionsData !== nextProps.optionsData) {
            nextProps.optionsData && nextProps.optionsData.forEach((item, index) => {
                i=index;
                this.keylist.push({
                    title: item.title,
                    imageUrl: item.imageUrl,
                    // num:item.num,
                    key: index
                })
            });
        }
    }
    //新增
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const data = JSON.parse(JSON.stringify(datakey));
        data.key = ++i;
        alert(data.key)
        keys.push(data);
        form.setFieldsValue({
            keys,
        });
    };
    //删除
    remove = (i) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter((item, index) => index !== i),
        });
    };
    onBeforeUpload = (files) => {
        this.files = files;
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue:  this.keylist.length < 1 ? [datakey] :  this.keylist });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div className={styles.creatformel} key={k.key} style={{ borderTop: '1px solid #ccc', paddingTop: '20px', width: '58%' }}>
                <Row span={24}>
                    <Col span={12}>
                        {
                            getFieldDecorator(`title[${k.key}]`, {
                                initialValue: k.title,
                            })(<Input placeholder="请输入问题" />)
                        }
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={20}>
                        {
                            getFieldDecorator(`imageUrl[${k.key}]`, {
                                initialValue: k.imageUrl,
                            })(
                                <Upload
                                    text="upload"
                                    onBeforeUpload={this.onBeforeUpload}
                                />
                            )
                        }
                    </Col>

                    {keys.length > 0 ? (
                        <Col span={4}>
                            {
                                index === keys.length - 1 ? <Icon type="plus-circle" onClick={this.add} style={{ marginRight: '10px' }} /> : null
                            }
                            {/* <Icon type="plus-circle" onClick={this.add} style={{ marginRight: '10px' }} />  */}
                            {
                                keys.length > 1 ? <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle"
                                    onClick={() => this.remove(index)}
                                /> : null
                            }
                        </Col>) : null
                    }
                </Row>
                {/* <Row>
                    <Col span={0} style={{ display: 'none' }}>
                        {
                            getFieldDecorator(`num[${k.key}]`, {
                                initialValue: k.num,
                            })(
                                <Input />
                            )
                        }
                    </Col>
                </Row> */}
            </div>
        ));
        return (
            <div>
                {formItems}
            </div>

        );
    }
}
export default QuestionAdd;
