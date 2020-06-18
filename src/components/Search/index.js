import React from 'react';
import { Button, Input, Select } from 'antd';
import styles from './index.less';
const { Option } = Select
class SearchList extends React.PureComponent {
    state = {
        value: ''
    }
    handelChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    onSearch = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value)
        }
    }

    render() {
        return (
            <div className={styles.searchbox}>
                <div className={styles['search-left']}>
                    <Select defaultValue="创建时间" style={{ width: 220 }} disabled>
                        <Option value="创建时间">创建时间</Option>
                    </Select>
                </div>
                <div className={styles['search-right']}>
                    <Input
                        placeholder="请输入关键词"
                        style={{ width: 400 }}
                        onChange={this.handelChange}
                    />
                    <Button style={{ marginLeft: '10px' }} onClick={this.onSearch}>搜索</Button>
                </div>
            </div>
        );
    }
}

export default SearchList;