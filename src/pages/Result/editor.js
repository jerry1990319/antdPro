import React from 'react';
import { connect, routerRedux } from 'dva';
import ResultForm from '@/components/ResultForm';
import { NewsTips } from '@/utils/utils.js';
import styles from './index.less';
@connect(({ group }) => ({
    // ...index,
    ...group
}))
class Testsubject extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            IsAdd: true,
            // choose: '',
            // questionId: [],
            // resultId: [],
            // questionKey: ['0_1'],
            // resultKey: ['0_1']
        };
    }
    componentDidMount() {
        // this.getQuestionType();
        this.GetStoreList();
    }

    handelCancel = () => {
        this.setState({
            isShow: false
        })
    }
    onSaveTest = (value, file) => {
        if (sessionStorage.getItem('Save') === "编辑") {
            this.getSaveTest(value, Number(sessionStorage.getItem('ResultId')), false);
        } else {
            this.getSaveTest(value, 0, true);
        }
    }
    handelBack = () => {
        this.props.dispatch(routerRedux.replace('/Result'));
    }
    getSaveTest = (item, StoreKey, IsAdd) => {
        this.props.dispatch({
            type: 'group/SaveResult',
            payload: {
                ...item,
                StoreKey,
                IsAdd
            }
        }).then((res) => {
            if (res && res.isSuccess.toString() === 'true') {
                NewsTips('保存成功!')
                this.props.dispatch(routerRedux.replace('/Result'));
            } else {
                NewsTips('保存失败!')
            }

        })
    }
    GetStoreList = () => {
        this.props.dispatch({
            type: 'group/GetResultDetail',
            payload: {
                StoreKey: Number(sessionStorage.getItem('ResultId'))
            }
        })
    }
    render() {
        const { resultDetail } = this.props;
        return (
            <div className={styles.Cardgsinformation}>

                <ResultForm
                    {...resultDetail}
                    onSaveTest={this.onSaveTest}
                    handelBack={this.handelBack}
                />
            </div>
        );
    }
}

export default Testsubject;