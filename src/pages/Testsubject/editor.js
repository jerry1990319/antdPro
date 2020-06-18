import React from 'react';
import { connect, routerRedux } from 'dva';
import { Row, Col } from 'antd';
import TestForms from '@/components/TestForms';
import TreesList from '@/components/Trees';
import { NewsTips } from '@/utils/utils.js';
import styles from './index.less';
@connect(({ index, editor }) => ({
    ...index,
    ...editor
}))
class Testsubject extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            choose: '',
            questionId: [],
            resultId: [],
            questionKey: ['0_1'],
            resultKey: ['0_1']
        };
    }
    componentDidMount() {
        // this.getQuestionType();
        this.getTestDetail();
    }
    componentWillReceiveProps(nextPorops) {
        if (this.props.TestDetail !== nextPorops.TestDetail) {
            const { questionId, resultId, questionKey, resultKey } = this.state;
            const { results = [], questions = [] } = nextPorops.TestDetail;
            results && results.forEach(item => {
                resultId.push(item.id);
                resultKey.push(item.key);
            });
            questions && questions.forEach(item => {
                questionId.push(item.id);
                questionKey.push(item.key);
            });
        }

    }
    ChooseQuestion = (key) => {
        this.setState({
            isShow: true,
            choose: key
        })
        if (key === "结果集选择") {
            sessionStorage.setItem('chooselist', this.state.resultKey);
        } else {
            sessionStorage.setItem('chooselist', this.state.questionKey);
        }
    }
    handelBack = () => {
        this.props.dispatch(routerRedux.replace('/Testsubject'));
    }
    handelConfirm = (key, id) => {
        // 结果集选择与题库选择
        if (this.state.choose === "结果集选择") {
            this.setState({
                resultId: id.length > 0 ? id : this.state.resultId,
                isShow: false,
                resultKey: key
            });
            sessionStorage.setItem('chooselist', this.state.resultKey);
        } else {
            this.setState({
                questionId: id.length > 0 ? id : this.state.questionId,
                isShow: false,
                questionKey: key
            });
            sessionStorage.setItem('chooselist', this.state.questionKey);
        }
    }
    handelCancel = () => {
        this.setState({
            isShow: false
        })
    }
    onSaveTest = (value, file) => {
        value.questionType = value.isRandom === false ? [] : value.questionType;
        if (sessionStorage.getItem('Save') === "编辑") {
            this.getSaveTest(value, sessionStorage.getItem('Testid'));
        } else {
            this.getSaveTest(value, 0);
        }
    }
    // getQuestionType = () => {
    //     this.props.dispatch({
    //         type: 'editor/getQuestionType'
    //     });
    // }
    getTestDetail = () => {
        this.props.dispatch({
            type: 'editor/getTestDetail',
            payload: {
                Id: Number(sessionStorage.getItem('Testid'))
            }
        });
    }
    getSaveTest = (item, Id) => {
        this.props.dispatch({
            type: 'editor/getSaveTest',
            payload: {
                ...item,
                Id: Id
            }
        }).then((res) => {
            if (res && res.isSuccess.toString() === 'true') {
                NewsTips('保存成功!')
                this.props.dispatch(routerRedux.replace('/Testsubject'));
            } else {
                NewsTips('保存失败!')
            }

        })
    }
    render() {
        const { isShow, choose, resultId, questionId } = this.state;
        const { TestDetail, typeList } = this.props;
  
        const questionList = JSON.parse(sessionStorage.getItem('questionList'));
        const resultList = JSON.parse(sessionStorage.getItem('resultList'));
        const treeData = choose === '结果集选择' ? resultList : questionList;
        return (
            <div className={styles.Cardgsinformation}>
                <Row style={{ display: '-webkit-box' }}>
                    <Col span={17}>
                        <TestForms
                            ChooseQuestion={this.ChooseQuestion}
                            handelBack={this.handelBack}
                            {...TestDetail}
                            onSaveTest={this.onSaveTest}
                            typeList={JSON.parse(sessionStorage.getItem('typeList'))}
                            resultId={resultId}
                            questionId={questionId}
                        />
                    </Col>
                    {
                        isShow === true ? (
                            <Col span={7} style={{ borderLeft: '1px solid #e3e3e3' }}>
                                <TreesList
                                    handelConfirm={this.handelConfirm}
                                    handelCancel={this.handelCancel}
                                    treeData={treeData}
                                    choose={choose}
                                />
                            </Col>

                        ) : null
                    }
                    {/* <Col span={7} style={{ borderLeft: '1px solid #e3e3e3' }}>
                     <iframe src="https://www.baidu.com/" width="400" height="100%"/>
                    </Col> */}
                </Row>
            </div>
        );
    }
}

export default Testsubject;