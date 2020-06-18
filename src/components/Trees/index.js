import React from 'react';
import { Tree, Button } from 'antd';
import styles from './index.less';
class TreesList extends React.PureComponent {
    state = {
        checkedKeys: sessionStorage.getItem('chooselist').split(","),
        checkeIds: []
    }
    onCheck = (checkedKeys, info) => {
        if (info.checkedNodes) {
            const id = [];
            const key = [];
            info.checkedNodes.forEach(item => {
                id.push(Number(item.props.id));
                key.push(item.key);
            });
            this.handleRowSelectChange(key, id)
        }
    };
    handelConfirm = () => {
        if (this.props.handelConfirm) {
            this.props.handelConfirm(this.state.checkedKeys, this.state.checkeIds)
        }
    }
    handelCancel = () => {
        this.setState({
            checkedKeys: []
        });
        if (this.props.handelCancel) {
            this.props.handelCancel()
        }
    }
    handleRowSelectChange = (selectedRowKeys, selectedRowIds) => {
        const list = selectedRowIds.filter(item => item.toString() !== 'NaN');
        this.setState({
            checkedKeys: selectedRowKeys,
            checkeIds: list
        });
       
    }
    render() {
        const { checkedKeys = [] } = this.state;
        return (
            <div className={styles.treesbox}>
                <Tree
                    checkable
                    onCheck={this.onCheck}
                    treeData={this.props.treeData}
                    defaultExpandedKeys={checkedKeys}
                    defaultCheckedKeys={checkedKeys}
                // checkStrictly={true}
                />
                <div className={styles.btnbox}>
                    <Button type="primary" onClick={this.handelConfirm}>确认</Button>
                    <Button type="primary" ghost onClick={this.handelCancel}>取消</Button>
                </div>

            </div>
        );
    }
}

export default TreesList;