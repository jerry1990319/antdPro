import { connect } from 'dva';
import React from 'react';
import { Form, Row, Col, Icon, Input, Button } from 'antd';
import Upload from '@/components/Upload';
import styles from './index.less';
// const { Option } = Select;
let i = 0;
const datakey = {
    Title: '',
    ImageUrl: '',
    Content: '',
    key: i
};
const { TextArea } = Input
@Form.create()
// @connect(({ global }) => ({
//     ...global
// }))
class QuestionAdd extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log('porps', props)
        this.keylist = [];

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.results !== nextProps.results) {
            nextProps.results && nextProps.results.forEach((item, index) => {
                i = index;
                this.keylist.push({
                    title: item.title,
                    contents: item.contents,
                    imageUrl: item.imageUrl,
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
        getFieldDecorator('keys', { initialValue: this.keylist.length < 1 ? [datakey] : this.keylist });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div className={styles.creatformel} key={k.key} style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
                <Row span={24}>
                    <Col span={10}>
                        {
                            getFieldDecorator(`Title[${k.key}]`, {
                                initialValue: k.title,
                            })(<Input style={{ width: 400 }} />)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
                        {
                            getFieldDecorator(`Content[${k.key}]`, {
                                initialValue: k.contents,
                            })(<TextArea
                                // placeholder="欢迎你人类，下面我将开启对你2020运势的全方位扫描，请做好准备。"
                                style={{ height: 106 }}
                            />)
                        }
                    </Col>
                    {keys.length > 0 ? (
                        <Col span={4}>
                            {/* {
                                index === keys.length - 1 ? <Icon type="plus-circle" onClick={this.add} style={{ marginRight: '10px' }} /> : null
                            } */}
                            {
                                keys.length > 0 ? <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle"
                                    span={5} style={{ margin: '0 20px' }}
                                    onClick={() => this.remove(index)}
                                /> : null
                            }
                        </Col>) : null
                    }
                </Row>
                <Row span={24}>
                    <Col>
                        {
                            getFieldDecorator(`ImageUrl[${k.key}]`, {
                                initialValue: k.imageUrl,
                            })(
                                <Upload
                                    text="upload"
                                    onBeforeUpload={this.onBeforeUpload}
                                />
                            )
                        }
                    </Col>
                </Row>

                {/* <Row>
                <Col span={22} style={{borderBottom:'1px solid #ccc'}}></Col>
                </Row> */}
            </div>
        ));
        return (
            <div>
                <Button>导入</Button>
                {formItems}
                <Button onClick={this.add} className={styles['add-result']}>点击添加</Button>
            </div>

        );
    }
}
export default QuestionAdd;
