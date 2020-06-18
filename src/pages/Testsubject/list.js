import React from 'react';
import { connect, routerRedux } from 'dva';
import { Modal, Table, Button, Tag } from 'antd';
import SearchList from '@/components/Search';
import Actionlist from '@/components/Actionlist';
import TagEditor from '@/components/TagEditor';
import { NewsTips, error } from '@/utils/utils.js';
import styles from './index.less';
// 表格数据
function initData(data) {
    const newData = data.map((item) => {
        item.key = item.id;
        return item;
    });
    return newData;
}

const { confirm } = Modal;

@connect(({ index, loading, editor }) => ({
    ...index,
    ...editor,
    loading: loading.effects['index/getList']
}))
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            list: [],
            taglist: [],
            questionList: [],
            resultList: [],
            typeList: []
        };
        this.pageSize = 10;
        this.pageNumber = 1;
        this.KeyWord = '';
        this.OrderBy = 'creatTime';
    }
    componentDidMount() {
        this.getList();
        this.getTagList();
        this.getQuestions();
        this.getResults();
        this.getQuestionType();
    }
    static getDerivedStateFromProps(props, state) {
        const { list, taglist, questionList, resultList, typeList } = state;
        if (props.list !== list) {
            return {
                list: props.list
            };
        }
        if (props.taglist !== taglist) {
            return {
                taglist: props.taglist
            };
        }
        if (props.typeList !== typeList) {
            sessionStorage.setItem('typeList', JSON.stringify(props.typeList));
        }
        if (props.questionList !== questionList) {
            sessionStorage.setItem('questionList', JSON.stringify(props.questionList));

        }
        if (props.resultList !== resultList) {
            sessionStorage.setItem('resultList', JSON.stringify(props.resultList));
        }
        return null;
    }
    // 多个删除
    onDeleteList = (e) => {
        confirm({
            title: '确定要删除这些主题吗?',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk: () => {
                if (this.state.selectedRowKeys.length > 0) {
                    this.getDeleteTests(this.state.selectedRowKeys);
                } else {
                    error('删除失败', '您未选择测试主题！！！')
                }
            },
            onCancel() {
            }
        });
    };
    // 单个删除
    onDelete = (e) => {
        confirm({
            title: '确定要删除该主题吗?',
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
        this.pageNumber = page;
        this.getList();

    }
    onSearch = (val) => {
        this.KeyWord = val;
        this.pageSize = 10;
        this.pageNumber = 1;
        this.getList();
    }
    handelAdd = () => {
        sessionStorage.setItem('Testid', '');
        sessionStorage.setItem('Save', "新增");
        this.props.dispatch(routerRedux.replace('/Testsubject/editor'));

    }
    handelTags = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = () => {
        this.getSavetag(this.tages.state.tags)
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    // 编辑主题
    handelEditer = (item) => {
        this.props.dispatch(routerRedux.replace('/Testsubject/editor'));
        sessionStorage.setItem('Testid', item.id);
        sessionStorage.setItem('Save', "编辑");
    }
    // 复制主题
    onCopyTest = (item) => {
        this.props.dispatch(routerRedux.replace('/Testsubject/editor'));
        sessionStorage.setItem('Testid', item.id);
        sessionStorage.setItem('Save', "复制");
    }
    // 查看预览主题
    handelDetalis = (item) => {
        this.props.dispatch(routerRedux.replace('/Testsubject/editor'));
    }
    getList = () => {
        this.props.dispatch({
            type: 'index/getList',
            payload: {
                PageIndex: this.pageNumber,
                PageSize: this.pageSize,
                KeyWord: this.KeyWord,
                OrderBy: this.OrderBy
            }
        });
    }
    // 标签管理
    getSavetag = (data) => {
        this.props.dispatch({
            type: 'index/getSavetag',
            payload: {
                Names: data
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips(res.message);
                this.getList();
                this.getTagList();
                setTimeout(() => {
                    this.setState({
                        visible: false,
                    });
                }, 1000)

            } else {
                NewsTips(res.message)
                this.setState({
                    visible: true,
                });
            }
        });
    }
    // 标签列表
    getTagList = () => {
        this.props.dispatch({
            type: 'index/getTagList',
        });
    }
    getQuestionType = () => {
        this.props.dispatch({
            type: 'editor/getQuestionType'
        });
    }
    // 删除接口
    getDeleteTests = (val) => {
        this.props.dispatch({
            type: 'index/getDeleteTests',
            payload: {
                Ids: val,
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips('删除成功');
                this.pageNumber = 1;
                this.getList();
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
    getQuestions = () => {
        this.props.dispatch({
            type: 'index/getQuestions'
        });
    }
    getResults = () => {
        this.props.dispatch({
            type: 'index/getResults'
        });
    }
    render() {
        const { taglist, selectedRowKeys } = this.state;
        sessionStorage.setItem('taglist', taglist);
        const { list = [], allCount = 0 } = this.state.list;
        const pagination = {
            total: allCount,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            showQuickJumper: true,
            current: this.pageNumber,
            showTotal: function () {
                return `当前第${this.pageNumber}页/${allCount}`;
            },
            // itemRender: itemRender,
            onChange: this.onChangepage
        }
        // const current = 1;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text, record) => {
                    const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
                    return (<div>
                        <h1>{record.title}</h1>
                        <div className={styles.timebox}>
                            <span>
                                <em style={{ marginRight: '15px', fontStyle: 'normal' }}>Tag:</em>
                                {
                                    record.tags.map((item, index) => {
                                        return (<Tag color={color[index]} key={item}>{item}</Tag>)
                                    })
                                }
                            </span>
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
                        <Button onClick={() => { this.handelDetalis(record) }} disabled>预览</Button>
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
                    listName="test"
                    handelAll={() => { this.handelAll(list) }}
                />
                <Table
                    columns={columns}
                    showHeader={false}
                    dataSource={initData(list)}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    loading={this.props.loading}
                />
                <Modal
                    title="标签管理"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ right: 0 }}
                >
                    <TagEditor
                        ref={(value) => { this.tages = value; }}
                        data={taglist}
                    />
                </Modal>
            </div>

        );
    }
}

export default Home;