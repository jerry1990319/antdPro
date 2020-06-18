import React from 'react';
import { Form, Input, Row, Col, Radio, Button, Select } from 'antd';
import Upload from '@/components/Upload';
import { defaultvalue } from '@/utils/utils.js';
import QuestionAdd from '@/components/QuestionAdd/addquestion';
import star from '@/assets/images/star.png';
import bottle from '@/assets/images/bottle.png';
import butterfly from '@/assets/images/butterfly.png';
import cup from '@/assets/images/cup.png';
import flowers from '@/assets/images/flowers.png';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const layoutrows = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
};
function DrawOrder(props) {
    return (
        <Select style={{ width: 120 }} onChange={props.onChange}>
            <Option value='1'>1</Option>
            <Option value='2'>2</Option>
            <Option value='3'>3</Option>
            <Option value='4'>4</Option>
            <Option value='5'>5</Option>
            <Option value='6'>6</Option>
        </Select>
    );
}
function Questiontype(typeList, props) {
    return (

        <Select style={{ width: 120 }} onChange={props.changeQuestiontype}>
            {
                typeList.map((item) => {
                    return (<Option value={item.id} key={item.id} >{item.name}</Option>)

                })
            }
        </Select>
    );
}

@Form.create()
class QuestionForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionType: 1
        };

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.questionType !== nextProps.questionType) {
            this.setState({
                questionType: nextProps.questionType
            })
        }

    }
    handleSubmit = (e) => {
        const { questionType } = this.state;
        const list = [];
        if (questionType === 1) {
            this.forms.validateFields((err, values) => {
                const { title, imageUrl, keys } = values;
                const TitleList = keys.map((key) => title[key.key]);
                const ImageUrlList = keys.map((key) => imageUrl[key.key]);
                keys.map((key, index) => {
                    list.push({
                        Title: TitleList[index],
                        ImageUrl: ImageUrlList[index]
                    })

                });
                return list;
            })

        }
        this.props.form.validateFields((err, values) => {
            values.Options = list;
            const AddtionalData =
            {
                Element: values.Element, Number: values.Number

            };
            values.AddtionalData = JSON.stringify(AddtionalData);
            if (!err) {
                this.props.onSaveTest(values, this.files);
            } else {
                return false
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
            questionType: Number(e)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { questionType } = this.state;
        const { typeList = [], title, imageUrl, options = [], addtionalData } = this.props;
        console.log('questionType22222222222222', Number(sessionStorage.getItem('questionType')));
        const data = {
            Element: '星星',
            Number: 3
        }
        const addtional = !addtionalData ? data : JSON.parse(addtionalData);
        return (
            <div className={styles.creatform}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <Row>
                            <Col>
                                <FormItem
                                    label="问题类型:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('QuestionType', {
                                            initialValue: Number(questionType===0?1:questionType),
                                            // rules: [{
                                            //     required: true,
                                            //     message: '标题不能为空且不能超过20个字符'
                                            // }]
                                        })(Questiontype(typeList, this))
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="问题:"
                                    {...layoutrows}
                                >
                                    {
                                        getFieldDecorator('Title', {
                                            initialValue: title,
                                            // rules: [{
                                            //     required: true,
                                            //     message: '标题不能为空且不能超过20个字符'
                                            // }]
                                        })(<Input
                                            placeholder="问题输入"
                                            style={{ width: 585 }}
                                        />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormItem
                                    label="图片上传:"
                                    {...layoutrows}
                                >
                                    {getFieldDecorator('ImageUrl', {
                                        // valuePropName: 'file',
                                    })(
                                        <div>
                                            <Upload
                                                text="upload"
                                                onBeforeUpload={this.onBeforeUpload}
                                            // memberPicurl=''
                                            // memberPicurl={!imageUrl ? '' : imageUrl}
                                            />
                                        </div>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        {
                            questionType.toString() === '1' ?
                                <Row>
                                    <Col>
                                        <FormItem
                                            label="选项:"
                                            {...layoutrows}
                                        >
                                            {
                                                getFieldDecorator('Options', {
                                                    // initialValue: defaultvalue(questionType, datakey),
                                                    // rules: [{
                                                    //     required: true,
                                                    //     message: '请选择题型'
                                                    // }]
                                                })(<QuestionAdd ref={(value) => { this.forms = value; }} optionsData={options} />)
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                : (questionType.toString() === '2' ? (<div>
                                    <Row>
                                        <Col>
                                            <FormItem
                                                label="选择元素:"
                                                {...layoutrows}
                                            >
                                                {
                                                    getFieldDecorator('Element', {
                                                        initialValue: addtional.Element,
                                                    })(
                                                        <Radio.Group onChange={this.onChange} style={{ marginLeft: '-12px' }}>
                                                            <Radio value='星星'>
                                                                <img className={styles['choose-img']} src={star} />
                                                            </Radio>
                                                            <Radio value='杯子'>
                                                                <img className={styles['choose-img']} src={cup} />
                                                            </Radio>
                                                            <Radio value='瓶子'>
                                                                <img className={styles['choose-img']} src={bottle} />
                                                            </Radio>
                                                            <Radio value='蝴蝶'>
                                                                <img className={styles['choose-img']} src={butterfly} />
                                                            </Radio>
                                                            <Radio value='花朵'>
                                                                <img className={styles['choose-img']} src={flowers} />
                                                            </Radio>
                                                        </Radio.Group>
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem
                                                label="元素个数:"
                                                {...layoutrows}
                                            >
                                                {
                                                    getFieldDecorator('Number', {
                                                        initialValue: addtional.Number,
                                                        // rules: [{
                                                        //     required: true,
                                                        //     message: '请选择题型'
                                                        // }]
                                                    })(DrawOrder(this))
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>

                                </div>) : null)
                        }
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
