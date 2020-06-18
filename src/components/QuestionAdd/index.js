import { connect } from 'dva';
import React from 'react';
import { Form, Row, Col, Select, Icon } from 'antd';
import styles from './index.less';
const { Option } = Select;
let i = 0;
const datakey = {
    count: 1,
    position: 'start',
    type: 1,
    key: i

};
function Question(props, disabled) {
    const { typeList = [] } = props;
    return (
        <Select style={{ width: 120 }} disabled={disabled}>
            {
                typeList.map((item) => {
                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)

                })
            }
        </Select>
    );
}
function QuestionOrder(props, disabled) {
    return (
        <Select style={{ width: 120 }} disabled={disabled}>
            <Option value="start">首题</Option>
            <Option value="default">中间</Option>
            <Option value="end">尾题</Option>
        </Select>
    );
}
function QuestionNumber(props, disabled) {
    return (
        <Select style={{ width: 120 }} disabled={disabled}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="6">7</Option>
            <Option value="6">8</Option>
        </Select>
    );
}

@Form.create()

@connect(({ global }) => ({
    ...global
}))
class QuestionAdd extends React.PureComponent {
    constructor(props) {
        super(props);
        this.keylist = []
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.questionType !== nextProps.questionType) {
            nextProps.questionType && nextProps.questionType.forEach((item, index) => {
                i = index;
                this.keylist.push({
                    count: item.count,
                    position: item.position,
                    type: item.type,
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
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { disabled } = this.props;
        getFieldDecorator('keys', { initialValue: this.keylist.length < 1 ? [datakey] : this.keylist });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div className={styles.creatformel} key={k.key}>
                <Row span={24}>
                    <Col span={5}>
                        {
                            getFieldDecorator(`type[${k.key}]`, {
                                initialValue: k.type,
                            })(Question(this.props, disabled))
                        }
                    </Col>
                    <Col span={5} style={{ margin: '0 20px' }}>
                        {
                            getFieldDecorator(`count[${k.key}]`, {
                                initialValue: k.count,
                            })(QuestionNumber(this.props, disabled))
                        }
                    </Col>
                    <Col span={5}>
                        {
                            getFieldDecorator(`position[${k.key}]`, {
                                initialValue: k.position,
                            })(QuestionOrder(this.props, disabled))
                        }
                    </Col>
                    {keys.length > 0 ? (
                        <Col span={4}>
                            {
                                index === keys.length - 1 && disabled === false ? <Icon type="plus-circle" onClick={this.add} style={{ marginRight: '10px' }} /> : null
                            }
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
