import React from 'react';
import { connect, routerRedux } from 'dva';
import { Modal, Table, Button, Tag } from 'antd';
import SearchList from '@/components/Search';
import Actionlist from '@/components/Actionlist';
import { NewsTips, error } from '@/utils/utils.js';
import styles from './index.less';
// 表格数据
function initData(data) {
    const newData = data.map((item) => {
        item.key = item.key;
        return item;
    });
    return newData;
}
const { confirm } = Modal;

@connect(({ index, group }) => ({
    ...index,
    ...group
    // loading: loading.effects['index/getList']
}))
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            pageSize: 10,
            pageNumber: 1,
            resultList: JSON.parse(sessionStorage.getItem('resultList'))[0].children
        };
        this.Type = 'result';
        this.KeyWord = '';
    }
    componentDidMount() {
        this.GetStoreList();
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
            },
            onCancel() {
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
                this.getDeleteTests([e.key]);
            },
            onCancel() {
            }
        });
    };
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onChangepage = (page) => {
        this.setState({
            pageSize: 10,
            pageNumber: page
        })
        // this.getList();

    }
    onSearch = (val) => {
        this.KeyWord = val;
        this.setState({
            pageSize: 10,
            pageNumber: 1,
        })
        this.GetStoreList();
    }
    handelAdd = () => {
        sessionStorage.setItem('ResultId', '');
        sessionStorage.setItem('Save', "新增");
        this.props.dispatch(routerRedux.replace('/Result/editor'));

    }
    handelTags = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = () => {
        // this.getSavetag(this.tages.state.tags)
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    // 编辑主题
    handelEditer = (item) => {
        this.props.dispatch(routerRedux.replace('/Result/editor'));
        sessionStorage.setItem('ResultId', item.key);
        sessionStorage.setItem('Save', "编辑");
    }
    // 复制主题
    // onCopyTest = (item) => {
    //     this.props.dispatch(routerRedux.replace('/Testsubject/editor'));
    //     sessionStorage.setItem('Testid', item.id);
    //     sessionStorage.setItem('Save', "复制");
    // }
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
                this.KeyWord='';
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
    GetStoreList = () => {
        this.props.dispatch({
            type: 'group/GetStoreList',
            payload: {
                Type: this.Type,
                KeyWord: this.KeyWord
            }
        })
    }

    // getSaveStore = () => {
    //     this.props.dispatch({
    //         type: 'group/getSaveStore',
    //         payload: {
    //             IsAdd: this.IsAdd,
    //             Key: this.Key,
    //             Title: this.Title,
    //             Type: this.Type
    //         }
    //     }).then((res) => {
    //         console.log('res', res)
    //         if (res.isSuccess.toString() === 'true') {
    //             NewsTips('新增成功');
    //             this.setState({
    //                 pageNumber: 1,
    //                 visible:false
    //             })
    //             this.GetStoreList();
    //             setTimeout(() => {
    //                 this.props.dispatch(routerRedux.replace('/Question/list'))
    //             }, 1000)
    //         } else {
    //             NewsTips('新增失败');
    //         }
    //         return res;
    //     });
    // }
    render() {
        const { pageSize = 10, pageNumber = 1 } = this.state;
        const { storelist } = this.props;
        const { stores = [] } = storelist;
        const allCount = stores.length;
        const { selectedRowKeys } = this.state;
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
                        {/* <Button onClick={() => { this.onCopyTest(record) }}>复制</Button> */}
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
                    listName='resultText'
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

            </div>

        );
    }
}

export default Home;