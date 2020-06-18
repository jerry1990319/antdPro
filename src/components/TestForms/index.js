import React from 'react';
import { Form, Input, Row, Col, Checkbox, Button, Select } from 'antd';
import Upload from '@/components/Upload';
import { defaultvalue } from '@/utils/utils.js';
import QuestionAdd from '@/components/QuestionAdd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const datakey = [{
    count: 1,
    position: 'start',
    type: 1

}];
const layoutrows = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
};
function DrawOrder(props) {
    return (
        <Select style={{ width: 120 }} onChange={props.onChange}>
            <Option value={true}>随机出题</Option>
            <Option value={false}>顺序出题</Option>
        </Select>
    );
}
@Form.create()
class TestForms extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            Topicdisabled: false,
            // isRandom: true
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isRandom!== nextProps.isRandom) {
            this.setState({
                Topicdisabled: nextProps.isRandom.toString() === "true" ? false : true
            })
        }
    }
    handleSubmit = (e) => {
        const list = [];
        this.forms.validateFields((err, values) => {
            const { count, position, type, keys } = values;
            const CountList = keys.map((key) => count[key.key]);
            const PositionList = keys.map((key) => position[key.key]);
            const TypeList = keys.map((key) => type[key.key]);
            keys.map((key, index) => {
                list.push({
                    count: CountList[index],
                    position: PositionList[index],
                    type: TypeList[index]
                })

            });
            return list;
        })
        this.props.form.validateFields((err, values) => {
            values.questionType = list;
            values.Questions = this.props.questionId;
            values.Results = this.props.resultId;
            if (!err) {
                this.props.onSaveTest(values, this.files);
                this.setState({
                    disabled: false
                })
            } else {
                return false;
            }
        });
    }
    onBeforeUpload = (files) => {
        this.files = files;
    }
    onChange = (e) => {
        if (e.toString() === 'true') {
            this.setState({
                Topicdisabled: false
            })

        } else {
            this.setState({
                Topicdisabled: true
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { title, tags = [], questionType, imageUrl, description, typeList = [], isRandom, questionId, resultId } = this.props;
        const { disabled, Topicdisabled } = this.state;
        const plainOptions = sessionStorage.getItem('taglist').split(",");
        return (
            <div className={styles.creatform}>
                <div className={styles.rows}>
                    <Button type="primary" onClick={this.props.handelBack}>返回</Button>
                    <Button type="primary" ghost onClick={this.handleSubmit}>保存</Button>
                    <Button type="primary" ghost disabled={disabled}>一键生成</Button>
                </div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <Row>
                            <Col>
                                <FormItem
                                    label="标题:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Title', {
                                            initialValue: title,
                                            rules: [{
                                                required: true,
                                                message: '标题不能为空且不能超过20个字符'
                                            }]
                                        })(<Input
                                            placeholder="请输入标题"
                                            maxLength={20}
                                            size="default"
                                            style={{ width: 300 }}
                                        />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="描述:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Description', {
                                            initialValue: description,

                                        })(<TextArea
                                            placeholder="欢迎你人类，下面我将开启对你2020运势的全方位扫描，请做好准备。"
                                            style={{ width: 532 }}
                                        />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="配图:"
                                    {...layoutrows}
                                >
                                    {getFieldDecorator('imageUrl', {
                                        valuePropName: 'file',
                                    })(
                                        <div>
                                            <Upload
                                                text="upload"
                                                onBeforeUpload={this.onBeforeUpload}
                                                // memberPicurl=''
                                                memberPicurl={!imageUrl ? '' : imageUrl}
                                            />
                                        </div>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="标签:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Tags', {
                                            initialValue: defaultvalue(tags, []),
                                            rules: [{
                                                required: true,
                                                message: '请选择标签'
                                            }]
                                        })(<Checkbox.Group options={!plainOptions ? [] : plainOptions} />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="题库:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Questions', {
                                            initialValue: defaultvalue(questionId, [1]),
                                            rules: [{
                                                required: true,
                                                message: '题库不能为空'
                                            }]
                                        })
                                            (<Button onClick={() => { this.props.ChooseQuestion('题库选择') }}>题库选择</Button>)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="出题顺序:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('isRandom', {
                                            initialValue: isRandom,
                                            rules: [{
                                                required: true,
                                                message: '出题顺序不能为空'
                                            }]
                                        })(DrawOrder(this))
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="题型:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('questionType', {
                                            initialValue: defaultvalue(questionType, datakey),
                                            // rules: [{
                                            //     required: true,
                                            //     message: '请选择题型'
                                            // }]
                                        })(<QuestionAdd ref={(value) => { this.forms = value; }} disabled={Topicdisabled} typeList={typeList} questionType={questionType} />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormItem
                                    label="结果:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Results', {
                                            initialValue: defaultvalue(resultId, [1]),
                                            rules: [{
                                                required: true,
                                                message: '结果集选择不能为空'
                                            }]
                                        })
                                            (<Button onClick={() => { this.props.ChooseQuestion("结果集选择") }}>结果集选择</Button>)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                    </div>

                </Form>
            </div >
        );
    }
}

export default TestForms;
