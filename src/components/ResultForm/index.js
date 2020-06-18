import React from 'react';
import { Form, Input, Row, Col, Radio, Button, Select } from 'antd';
// import Upload from '@/components/Upload';
import { defaultvalue } from '@/utils/utils.js';
import QuestionAdd from '@/components/QuestionAdd/addresult';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const layoutrows = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
};

function ResultType() {
    return (
        <Select style={{ width: 200 }}>
            <Option value="common">文本（图片）</Option>
            <Option value={2}>指数百分比</Option>
        </Select>
    );
}

@Form.create()
class QuestionForm extends React.PureComponent {
    handleSubmit = (e) => {
        const list = [];
        this.forms.validateFields((err, values) => {
            console.log('ellllllll', values)
            const { Content, ImageUrl, Title, keys } = values;
            const ContentList = keys.map((key) => Content[key.key]);
            const ImageUrlList = keys.map((key) => ImageUrl[key.key]);
            const TitleList = keys.map((key) => Title[key.key]);
            keys.map((key, index) => {
                list.push({
                    Content: ContentList[index],
                    ImageUrl: ImageUrlList[index],
                    Title: TitleList[index]
                })

            });
            return list;
        })
        this.props.form.validateFields((err, values) => {
            values.Results = list;
            if (!err) {
                this.props.onSaveTest(values, this.files);
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
    changeQuestiontype = (e) => {
        this.setState({
            nameId: e
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { results = [], storeTitle, type } = this.props;
        console.log('type', this.props.type)
        return (
            <div className={styles.creatform}>

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div style={{ width: '80%', margin: '0 auto' }}>

                        <Row>
                            <Col>
                                <FormItem
                                    label="标题:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('StoreTitle', {
                                            initialValue: storeTitle,
                                            // rules: [{
                                            //     required: true,
                                            //     message: '标题不能为空且不能超过20个字符'
                                            // }]
                                        })(<Input
                                            placeholder="标题输入"
                                            style={{ width: 400 }}
                                        />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="结果类型:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Type', {
                                            initialValue: !type ? 'common' : type,
                                            // rules: [{
                                            //     required: true,
                                            //     message: '标题不能为空且不能超过20个字符'
                                            // }]
                                        })(ResultType())
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
                                            // initialValue: defaultvalue(results, datakey),
                                            // rules: [{
                                            //     required: true,
                                            //     message: '请选择题型'
                                            // }]
                                        })(<QuestionAdd ref={(value) => { this.forms = value; }} results={results} />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>



                    </div>
                </Form>
                <div className={styles.rows}>
                    <Button type="primary" onClick={this.handleSubmit}>确认</Button>
                    <Button type="primary" ghost onClick={this.props.handelBack}>取消</Button>
                </div>
            </div >
        );
    }
}

export default QuestionForm;
