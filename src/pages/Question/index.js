import React from 'react';
import { connect, routerRedux } from 'dva';
import { Modal, Table, Button, Input } from 'antd';
import SearchList from '@/components/Search';
import Actionlist from '@/components/Actionlist';
import { NewsTips, error } from '@/utils/utils.js';
import styles from './index.less';
// 表格数据
function initData(data) {
    const newData = data.map((item) => {
        item.key = Number(item.key);
        return item;
    });
    return newData;
}
const { confirm } = Modal;

@connect(({ index, group, loading }) => ({
    ...index,
    ...group,
    loading: loading.effects['group/GetStoreList']
}))
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            questionList: [],
            pageSize: 10,
            pageNumber: 1,
        };

        this.KeyWord = '';
        // this.OrderBy = 'creatTime';
        // this.Key = '';
        this.Title = '';
        this.IsAdd = true;
        this.Type = 'question';
        this.Key = 0;

    }
    componentDidMount() {
        this.GetStoreList();
    }
    // 多个删除
    onDeleteList = (e) => {
        confirm({
            title: '确定要删除这些题库吗?',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk: () => {
                if (this.state.selectedRowKeys.length > 0) {
                    this.getDeleteTests(this.state.selectedRowKeys);
                } else {
                    error('删除失败', '您未选择题库！！！')
                }
            }
        });
    };
    // 单个删除
    onDelete = (e) => {
        confirm({
            title: '确定要删除该题库吗?',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.getDeleteTests([e.key]);
            }
        });
    };
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onChangepage = (page) => {
        this.pageNumber = page;
        this.setState({
            pageNumber: page
        })
    }
    onSearch = (val) => {
        this.KeyWord = val;
        this.setState({
            pageSize: 10,
            pageNumber: 1
        })
        this.GetStoreList();
    }
    handelAdd = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = () => {
        this.getSaveStore();

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    // 编辑主题
    handelEditer = (item) => {
        // console.log('item')
        sessionStorage.setItem('StoreKey', item.key);
        this.props.dispatch(routerRedux.replace('/Question/list'));
      
    }

    // 题库列表
    getQuestions = () => {
        this.props.dispatch({
            type: 'index/getQuestions'
        });
    }

    // 删除接口
    getDeleteTests = (val) => {
        this.props.dispatch({
            type: 'group/DeleteStores',
            payload: {
                Keys: val,
                Type: this.Type
            }
        }).then((res) => {
            if (res.isSuccess.toString() === 'true') {
                NewsTips('删除成功');
                this.KeyWord = '';
                this.setState({
                    pageNumber: 1
                })
                this.GetStoreList();
            } else {
                NewsTips('删除失败');
            }
            return res;
        });
    }
    getSaveStore = () => {
        this.props.dispatch({
            type: 'group/getSaveStore',
            payload: {
                IsAdd: this.IsAdd,
                Key: this.Key,
                Title: this.Title
            }
        }).then((res) => {
            console.log('res', res)
            if (res.isSuccess.toString() === 'true') {
                NewsTips('新增成功');
                this.setState({
                    pageNumber: 1,
                    visible:false
                })
                this.GetStoreList();
                setTimeout(() => {
                    this.props.dispatch(routerRedux.replace('/Question/list'))
                }, 1000)
            } else {
                NewsTips('新增失败');
            }
            return res;
        });
    }
    GetStoreList = () => {
        this.props.dispatch({
            type: 'group/GetStoreList',
            payload: {
                Type: this.Type,
                KeyWord:this.KeyWord
            }
        })
    }

    changeInput = (e) => {
        this.Title = e.target.value;
    }
    handelAll = (listdata) => {
        const { selectedRowKeys } = this.state;
        if (listdata.length === selectedRowKeys.length) {
            this.handleRowSelectChange([]);
        } else {
            const index = [];
            listdata.forEach(item => {
                index.push(Number(item.key))
            });
            this.handleRowSelectChange(index, listdata)
        }
    }

    handleRowSelectChange = (selectedRowKeys, listdata) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
        });
    }
    render() {
        const { storelist } = this.props;
        const { stores = [] } = storelist;
        sessionStorage.setItem('storelist',JSON.stringify(stores))
        const allCount = stores.length;
        const { selectedRowKeys, pageNumber, pageSize } = this.state;
        const pagination = {
            total: allCount,
            pageSize: pageSize,
            pageNumber: pageNumber,
            showQuickJumper: true,
            current: pageNumber,
            showTotal: function () {
                return `当前第${pageNumber}页/${allCount}`;
            },
            // itemRender: itemRender,
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

                    return (<div onClick={() => { this.handelEditer(record) }}>
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
                    listName='questionsGroup'
                    handelAll={() => { this.handelAll(stores) }}
                />
                <Table
                    columns={columns}
                    showHeader={false}
                    dataSource={initData(stores)}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    loading={this.props.loading}
                />
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ right: 0 }}
                >
                    <div style={{ marginTop: '20px' }}>
                        <Input placeholder="Basic usage" addonBefore="题库名称:" onChange={this.changeInput} />
                    </div>
                </Modal>

            </div>

        );
    }
}

export default Home;