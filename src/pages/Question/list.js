import React from 'react';
import { connect, routerRedux } from 'dva';
import { Modal, Button, Select } from 'antd';
import SearchList from '@/components/Search';
import DropTable from '@/components/DropTable';
import Actionlist from '@/components/Actionlist';
import { NewsTips, error } from '@/utils/utils.js';
import styles from './index.less';
const { confirm } = Modal;
const { Option } = Select;
function Questiontype(storelist, obj) {
    return (

        <Select onChange={obj.handleChange} mode="multiple" style={{ width: '100%' }}>
            {
                storelist.map((item) => {
                    return (<Option value={item.key} key={item.key} >{item.title}</Option>)

                })
            }
        </Select>
    );
}

@connect(({ group, loading }) => ({
    ...group,
    loading: loading.effects['group/GetQuestionChildrens']
}))
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            pageSize: 10,
            pageNumber: 1,
            groupId: [],
        };
        this.StoreKey = Number(sessionStorage.getItem('StoreKey'));
        this.KeyWord = "";
        this.OrderBy = "";
        this.pageSize = 10;
        this.pageNumber = 1;
    }
    componentDidMount() {
        console.log('this.StoreKey1111111', this.StoreKey)
        this.GetQuestionChildrens();
    }
    // 多个删除
    onDeleteList = (e) => {
        confirm({
            title: '确定要删除这些问题吗?',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk: () => {
                if (this.state.selectedRowKeys.length > 0) {
                    this.getDeleteTests(this.state.selectedRowKeys);
                } else {
                    error('删除失败', '您未选择问题！！！')
                }
            }
        });
    };
    // 单个删除
    onDelete = (e) => {
        confirm({
            title: '确定要删除该问题吗?',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.getDeleteTests([e.id]);
            },
            onCancel() {
            }
        });
    };
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onChangepage = (page) => {
        // this.setState({
        //     // pageSize: 10,
        //     pageNumber: page
        // });
        this.pageNumber = page;
        this.GetQuestionChildrens();
    }
    onShowSizeChange = (page, pageSize) => {
        // alert(size)
        // this.setState({
        //     pageSize: size,
        //     pageNumber: 1
        // });
        this.pageNumber = 1;
        this.pageSize=pageSize;
        this.GetQuestionChildrens();
    }
    onSearch = (val) => {
        this.KeyWord = val;
        // this.setState({
        //     // pageSize: 10,
        //     pageNumber: 1,
        // });
        this.pageNumber = 1;
        this.GetQuestionChildrens();
    }
    handelAdd = () => {
        sessionStorage.setItem('Questionid', '');
        sessionStorage.setItem('Save', "新增");
        this.props.dispatch(routerRedux.replace('/Question/editor'));
    }
    handelTags = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = () => {
        const { groupId, selectedRowKeys } = this.state;
        this.QuestionCopyTo(selectedRowKeys, groupId)
    };
    handleChange = (value) => {
        this.setState({
            groupId: value
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    // 编辑主题
    handelEditer = (item) => {
        this.props.dispatch(routerRedux.replace('/Question/editor'));
        sessionStorage.setItem('Questionid', item.id);
        sessionStorage.setItem('Save', "编辑");
    }
    // 复制主题
    onCopyTest = (item) => {
        this.props.dispatch(routerRedux.replace('/Question/editor'));
        sessionStorage.setItem('Questionid', item.id);
        sessionStorage.setItem('Save', "复制");
    }
    // 删除接口
    getDeleteTests = (val) => {
        this.props.dispatch({
            type: 'group/DeleteQuestions',
            payload: {
                Ids: val,
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips('删除成功');
                this.KeyWord = '';
                // this.setState({
                //     pageNumber: 1,
                //     pageSize: 10
                // })
                this.pageNumber = 1;
                this.GetQuestionChildrens();
                // this.GetQuestionChildrens(Number(sessionStorage.getItem('StoreKey')));
            } else {
                NewsTips('删除失败');
            }
            return res;
        });
    }
    handelAll = (listdata) => {
        const { selectedRowKeys } = this.state;
        if (listdata.length === selectedRowKeys.length) {
            this.handleRowSelectChange([]);
        } else {
            const index = [];
            listdata.forEach(item => {
                index.push(Number(item.id))
            });
            this.handleRowSelectChange(index, listdata)
        }
    }
    handleRowSelectChange = (selectedRowKeys, listdata) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
        });
    }
    GetQuestionChildrens = () => {
        this.props.dispatch({
            type: 'group/GetQuestionChildrens',
            payload: {
                StoreKey: this.StoreKey,
                PageIndex: this.pageNumber,
                PageSize: this.pageSize,
                OrderBy: this.OrderBy,
                KeyWord: this.KeyWord
            }
        })
    }
    QuestionCopyTo = (QuestionIds, DestStoreIds) => {
        this.props.dispatch({
            type: 'group/QuestionCopyTo',
            payload: {
                QuestionIds,
                DestStoreIds
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips('复制成功');
                this.setState({
                    visible: false,
                });
                setTimeout(() => {
                    this.props.dispatch(routerRedux.replace('/Question'));
                }, 1000)

            } else {
                NewsTips('复制失败');
            }
            return res;
        });
    }
    handelOrder = () => {
        const { state } = this.dataSource
        const { data = [] } = state;
        const Id = [];
        data.forEach(item => {
            console.log('info', item)
            Id.push(Number(item.id));
        });
        this.SaveQuestionOrder(Id);
    }
    SaveQuestionOrder = (Id) => {
        this.props.dispatch({
            type: 'group/SaveQuestionOrder',
            payload: {
                Key: this.StoreKey,
                Id,
                PageIndex:this.pageNumber,
                PageSize:this.pageSize
                // DestStoreIds
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips('保存成功');
                this.pageNumber=1;
                this.GetQuestionChildrens();
            } else {
                NewsTips('保存失败');
            }
            return res;
        });
    }
    render() {
        const {selectedRowKeys } = this.state;
        const { childrenlist } = this.props;
        const { questions = [], allCount = 0 } = childrenlist;
        // const {} = questions.length;
        const storelist = JSON.parse(sessionStorage.getItem('storelist'));
        const pagination = {
            total: allCount,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            showQuickJumper: true,
            current: this.pageNumber,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: function () {
                return `当前第${this.pageNumber}页/${allCount}`;
            },
            onChange: this.onChangepage
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text, record) => {

                    return (<div>
                        <h1>{record.title}</h1>
                        <div className={styles.timebox}>
                            <span className={styles.times}>{record.createTime}</span>
                        </div>
                    </div>)
                },
            },
            {
                title: 'Action',
                align: 'right',
                dataIndex: 'Action',
                render: (text, record) => {
                    return (<div className={styles['button-box']}>
                        <Button type="primary" onClick={() => { this.handelEditer(record) }}>编辑</Button>
                        <Button onClick={() => { this.onCopyTest(record) }}>复制</Button>
                        <Button onClick={() => { this.onDelete(record) }}>删除</Button>
                    </div>)
                },
            },
        ];
        return (
            <div className={styles.container}>
                <SearchList
                    onSearch={this.onSearch}
                />
                <Actionlist
                    handelTags={this.handelTags}
                    handelAdd={this.handelAdd}
                    onDelete={this.onDeleteList}
                    listName="questionsText"
                    handelAll={() => { this.handelAll(questions) }}
                    handelOrder={this.handelOrder}
                />
                <DropTable
                    questions={questions}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    columns={columns}
                    loading={this.props.loading}
                    ref={(e) => { this.dataSource = e; }}

                />
                <Modal
                    title="复制到"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ right: 0 }}
                >
                    {Questiontype(storelist, this)}
                </Modal>
            </div>

        );
    }
}

export default Home;