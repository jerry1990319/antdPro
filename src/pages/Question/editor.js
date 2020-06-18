import React from 'react';
import { connect, routerRedux } from 'dva';
import QuestionForm from '@/components/QuestionForm';
import { NewsTips } from '@/utils/utils.js';
import styles from './index.less';
@connect(({ index, group }) => ({
    ...index,
    ...group
}))
class Testsubject extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.state = {
        //     questionType:0
        // };
    }
    componentDidMount() {
        this.GetQuestionDetail(Number(sessionStorage.getItem('Questionid')));
    }
    handelCancel = () => {
        this.setState({
            isShow: false
        })
    }
    onSaveTest = (value, file) => {
        if (sessionStorage.getItem('Save') === "编辑") {
            this.SaveQuestion(value, Number(sessionStorage.getItem('Questionid')));
        } else {
            this.SaveQuestion(value, 0);
        }
    }

    getTestDetail = () => {
        this.props.dispatch({
            type: 'editor/getTestDetail',
            payload: {
                Id: Number(sessionStorage.getItem('Testid'))
            }
        });
    }
    SaveQuestion = (item, Id) => {
        this.props.dispatch({
            type: 'group/SaveQuestion',
            payload: {
                ...item,
                Id: Id,
                StoreKey: Number(sessionStorage.getItem('StoreKey')),
            }
        }).then((res) => {
            if (res && res.isSuccess.toString() === 'true') {
                NewsTips('保存成功!')
                this.props.dispatch(routerRedux.replace('/Question/list'));
            } else {
                NewsTips('保存失败!')
            }

        })
    }
    GetQuestionDetail = (Id) => {
        this.props.dispatch({
            type: 'group/GetQuestionDetail',
            payload: {
                Id
            }
        })
    }
    handelBack = () => {
        this.props.dispatch(routerRedux.replace('/Question/list'));
    }
    render() {
        const { questionDetailt } = this.props;
        const typeList = JSON.parse(sessionStorage.getItem('typeList'))

        return (
            <div className={styles.Cardgsinformation}>

                <QuestionForm
                    {...questionDetailt}
                    typeList={typeList}
                    onSaveTest={this.onSaveTest}
                    handelBack={this.handelBack}
                />
            </div>
        );
    }
}

export default Testsubject;